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

function findTopChunks(queryEmbedding, allChunks, n = 5, chapterHint = null) {
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

    const queryEmbedding = await getEmbedding(searchQuery, apiKey);

    const allChunks = loadChunks();
    const chapterHint = page_context?.chapter || null;
    const topChunks = findTopChunks(queryEmbedding, allChunks, 5, chapterHint);
    const bookContext = topChunks.map((c) => c.text).join("\n\n---\n\n");

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
          model: "nvidia/nemotron-3-super-120b-a12b:free",
          messages,
          stream: false,
        }),
      }
    );

    if (!llmResp.ok) {
      const err = await llmResp.text();
      return jsonResponse({ error: `LLM request failed (${llmResp.status}): ${err}` }, 502);
    }

    const data = await llmResp.json();
    const content = data.choices?.[0]?.message?.content || "";
    return jsonResponse({ content });
  } catch (err) {
    console.error("Chat API error:", err);
    return jsonResponse({ error: err.message }, 500);
  }
}
