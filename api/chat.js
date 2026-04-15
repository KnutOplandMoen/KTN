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

/** Allowlisted chat presets → OpenRouter slugs (free tier). Override per tier with env on Vercel. */
const PRESET_MODEL_DEFAULTS = {
  fast: "liquid/lfm-2.5-1.2b-instruct:free",
  balanced: "google/gemma-4-26b-a4b-it:free",
  quality: "nvidia/nemotron-3-super-120b-a12b:free",
  quality_alt: "openai/gpt-oss-120b:free",
};

const DEFAULT_PRESET = "balanced";

/** Returns DEFAULT_PRESET if missing/empty; valid id; or null if string is not a known preset. */
function normalizePreset(raw) {
  if (raw == null || typeof raw !== "string") return DEFAULT_PRESET;
  const id = raw.trim();
  if (!id) return DEFAULT_PRESET;
  return id in PRESET_MODEL_DEFAULTS ? id : null;
}

function resolveModelForPreset(presetId) {
  const envKeys = {
    fast: process.env.OPENROUTER_CHAT_MODEL_FAST,
    balanced: process.env.OPENROUTER_CHAT_MODEL_BALANCED,
    quality: process.env.OPENROUTER_CHAT_MODEL_QUALITY,
    quality_alt: process.env.OPENROUTER_CHAT_MODEL_QUALITY_ALT,
  };
  const slug = envKeys[presetId] || PRESET_MODEL_DEFAULTS[presetId];
  return slug;
}

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
    const { question, page_context, history, preset: presetRaw } = await request.json();

    if (!question || typeof question !== "string") {
      return jsonResponse({ error: "Missing question" }, 400);
    }

    const effectivePreset = normalizePreset(presetRaw);
    if (effectivePreset === null) {
      return jsonResponse(
        { error: `Unknown preset. Use one of: ${Object.keys(PRESET_MODEL_DEFAULTS).join(", ")}` },
        400
      );
    }
    const model = resolveModelForPreset(effectivePreset);

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
    const localeRaw = (page_context?.locale || "no").toLowerCase();
    const locale = localeRaw.startsWith("en") ? "en" : "no";

    let bookContext = topChunks.map((c) => c.text).join("\n\n---\n\n");
    if (bookContext.length > MAX_BOOK_CONTEXT_CHARS) {
      const truncNote =
        locale === "en"
          ? "\n\n[… textbook context truncated for length …]"
          : "\n\n[…kontekst forkortet for hastighet…]";
      bookContext = bookContext.slice(0, MAX_BOOK_CONTEXT_CHARS) + truncNote;
    }

    let locationInfo = "";
    if (page_context?.chapter) {
      if (locale === "en") {
        locationInfo = `\nThe user is reading: ${page_context.chapter}`;
        if (page_context.section?.title) {
          locationInfo += ` — section: “${page_context.section.title}”`;
        }
      } else {
        locationInfo = `\nBrukeren leser: ${page_context.chapter}`;
        if (page_context.section?.title) {
          locationInfo += ` — seksjon: «${page_context.section.title}»`;
        }
      }
    }

    const visibleBlock = page_context?.visible_text || (locale === "en" ? "(none)" : "(ingen)");

    const sharedRules =
      locale === "en"
        ? `Output language: English only (British or American spelling is fine). Do not reply in Norwegian unless the user explicitly writes Norwegian.
Tone: helpful course tutor for networking — clear and concrete, not a generic essay.
If the user asks what they are looking at on this page, or what this section is about, ground your answer primarily in "Visible text from the page" below, then the textbook excerpts.
If the answer is not supported by the context below, say so instead of inventing facts.
Never end with meta word counts or labels like "(99 words)" or "Word count:". No "thinking out loud" preambles — answer directly.`
        : `Språk: Svar alltid på norsk (bokmål). Ikke bytt til engelsk med mindre brukeren uttrykkelig skriver på engelsk.
Tone: hjelpsom studieassistent — tydelig og konkret, ikke et generisk sammendrag av hele pensum.
Hvis brukeren spør hva de ser på siden nå, eller hva teksten handler om, bygg svaret først og fremst på «Synlig tekst fra nettsiden» under, deretter utdragene fra boka.
Hvis du ikke finner svaret i konteksten under, si fra i stedet for å finne på noe.
Ikke avslutt med ordtelling eller etiketter som «(99 ord)» eller «Antall ord:». Ikke «tenker høyt»-innledning — svar rett på spørsmålet.`;

    const intro =
      locale === "en"
        ? `You are a helpful study assistant for TTM4100 – Communication: Services and Networks (NTNU). The course follows Kurose & Ross (the textbook excerpts below).`
        : `Du er en hjelpsom studieassistent for TTM4100 – Kommunikasjon: Tjenester og nett (NTNU). Pensum følger Kurose & Ross (utdrag under).`;

    const bookHeading =
      locale === "en" ? "## Textbook excerpts (Kurose & Ross):" : "## Kontekst fra læreboken (Kurose & Ross):";
    const visibleHeading =
      locale === "en"
        ? "## Visible text from the page the user is viewing:"
        : "## Synlig tekst fra nettsiden brukeren leser akkurat nå:";

    const systemPrompt = `${intro}
${sharedRules}
${locationInfo}

${visibleHeading}
${visibleBlock}

${bookHeading}
${bookContext}`;

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
          model,
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
