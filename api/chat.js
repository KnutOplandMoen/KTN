import { readFileSync } from "fs";
import { join } from "path";

let chunks = null;

function loadChunks() {
  if (chunks) return chunks;
  const raw = readFileSync(join(process.cwd(), "public", "chunks.json"), "utf-8");
  chunks = JSON.parse(raw);
  return chunks;
}

function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

async function getEmbedding(text, apiKey) {
  const resp = await fetch("https://openrouter.ai/api/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "nvidia/llama-nemotron-embed-vl-1b-v2:free",
      input: [text],
      encoding_format: "float",
    }),
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Embedding request failed (${resp.status}): ${err}`);
  }
  const data = await resp.json();
  return data.data[0].embedding;
}

/** Max characters from retrieved chunks into the system prompt (speed + cost). */
const MAX_BOOK_CONTEXT_CHARS = 12000;

function findTopChunks(queryEmbedding, allChunks, n = 3, chapterHint = null) {
  const CHAPTER_BOOST = 0.03;
  const scored = allChunks
    .filter((c) => c.embedding)
    .map((c) => {
      let score = cosineSimilarity(queryEmbedding, c.embedding);
      if (chapterHint && c.chapter && c.chapter.toLowerCase().includes(chapterHint.toLowerCase())) {
        score += CHAPTER_BOOST;
      }
      return { text: c.text, chapter: c.chapter, score };
    });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, n);
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const NDJSON_HEADERS = {
  "Content-Type": "application/x-ndjson; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Accel-Buffering": "no",
};

/**
 * Reads OpenAI-compatible SSE from upstream and writes NDJSON lines:
 * {"t":"..."} text deltas, {"e":"..."} error, {"d":true} done.
 */
function openRouterSseToNdjsonStream(upstreamBody) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      const reader = upstreamBody.getReader();
      let sseBuffer = "";

      const writeLine = (obj) => {
        controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          sseBuffer += decoder.decode(value ?? new Uint8Array(), { stream: !done });
          if (done) {
            sseBuffer += decoder.decode();
            break;
          }

          // Normalize CRLF so "\n\n" reliably separates SSE events
          sseBuffer = sseBuffer.replace(/\r\n/g, "\n");

          while (true) {
            const sep = sseBuffer.indexOf("\n\n");
            if (sep === -1) break;
            const block = sseBuffer.slice(0, sep);
            sseBuffer = sseBuffer.slice(sep + 2);

            for (const line of block.split("\n")) {
              if (!line.startsWith("data:")) continue;
              const raw = line.slice(5).trimStart();
              if (raw === "[DONE]") continue;

              let json;
              try {
                json = JSON.parse(raw);
              } catch {
                continue;
              }

              if (json.error) {
                const msg =
                  typeof json.error === "string"
                    ? json.error
                    : json.error?.message || JSON.stringify(json.error);
                writeLine({ e: msg });
                controller.close();
                return;
              }

              const piece = json.choices?.[0]?.delta?.content;
              if (typeof piece === "string" && piece.length > 0) {
                writeLine({ t: piece });
              }
            }
          }
        }

        sseBuffer = sseBuffer.replace(/\r\n/g, "\n");
        if (sseBuffer.trim()) {
          for (const part of sseBuffer.split("\n\n")) {
            for (const line of part.split("\n")) {
              if (!line.startsWith("data:")) continue;
              const raw = line.slice(5).trimStart();
              if (raw === "[DONE]" || !raw) continue;
              try {
                const json = JSON.parse(raw);
                if (json.error) {
                  const msg =
                    typeof json.error === "string"
                      ? json.error
                      : json.error?.message || JSON.stringify(json.error);
                  writeLine({ e: msg });
                  controller.close();
                  return;
                }
                const piece = json.choices?.[0]?.delta?.content;
                if (typeof piece === "string" && piece.length > 0) {
                  writeLine({ t: piece });
                }
              } catch {
                /* ignore trailing garbage */
              }
            }
          }
        }

        writeLine({ d: true });
        controller.close();
      } catch (err) {
        try {
          writeLine({ e: err.message || String(err) });
        } catch {
          /* ignore */
        }
        controller.close();
      }
    },
  });
}

export async function POST(request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return jsonResponse({ error: "OPENROUTER_API_KEY not configured" }, 500);
  }

  try {
    const { question, page_context, history } = await request.json();

    if (!question || typeof question !== "string") {
      return jsonResponse({ error: "Missing question" }, 400);
    }

    let searchQuery = question;
    if (page_context?.section?.title) {
      searchQuery = `[${page_context.chapter} – ${page_context.section.title}] ${question}`;
    } else if (page_context?.chapter) {
      searchQuery = `[${page_context.chapter}] ${question}`;
    }

    // Overlap network (embedding) with local work (load + parse chunks).
    const embeddingPromise = getEmbedding(searchQuery, apiKey);
    const allChunks = loadChunks();
    const queryEmbedding = await embeddingPromise;

    const chapterHint = page_context?.chapter || null;
    const topChunks = findTopChunks(queryEmbedding, allChunks, 3, chapterHint);
    let bookContext = topChunks.map((c) => c.text).join("\n\n---\n\n");
    if (bookContext.length > MAX_BOOK_CONTEXT_CHARS) {
      bookContext = bookContext.slice(0, MAX_BOOK_CONTEXT_CHARS) + "\n\n[…kontekst forkortet for hastighet…]";
    }

    let locationInfo = "";
    if (page_context?.chapter) {
      locationInfo = `\nBrukeren leser: ${page_context.chapter}`;
      if (page_context.section?.title) {
        locationInfo += ` — seksjon: «${page_context.section.title}»`;
      }
    }

    const systemPrompt = `Du er en hjelpsom studieassistent for TTM4100 – Kommunikasjon: Tjenester og nett (NTNU).
Svar på norsk med mindre brukeren skriver på engelsk.
Forklar konsepter tydelig og bruk eksempler fra pensum der det er relevant.
Hvis du ikke finner svaret i konteksten under, si fra i stedet for å finne på noe.
${locationInfo}

## Kontekst fra læreboken (Kurose & Ross):
${bookContext}

## Synlig tekst fra nettsiden brukeren leser akkurat nå:
${page_context?.visible_text || "(ingen)"}`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []),
      { role: "user", content: question },
    ];

    const llmResp = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Default: small free model (much lower latency than 120B free tier).
          // Override on Vercel: OPENROUTER_CHAT_MODEL=nvidia/nemotron-3-super-120b-a12b:free
          model: process.env.OPENROUTER_CHAT_MODEL || "liquid/lfm-2.5-1.2b-thinking:free",
          messages,
          stream: true,
        }),
      }
    );

    if (!llmResp.ok) {
      const err = await llmResp.text();
      return jsonResponse({ error: `LLM request failed (${llmResp.status}): ${err}` }, 502);
    }

    if (!llmResp.body) {
      return jsonResponse({ error: "LLM response had no body" }, 502);
    }

    const out = openRouterSseToNdjsonStream(llmResp.body);
    return new Response(out, { status: 200, headers: NDJSON_HEADERS });
  } catch (err) {
    console.error("Chat API error:", err);
    return jsonResponse({ error: err.message }, 500);
  }
}
