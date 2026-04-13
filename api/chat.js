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

function findTopChunks(queryEmbedding, allChunks, n = 5) {
  const scored = allChunks
    .filter((c) => c.embedding)
    .map((c) => ({
      text: c.text,
      score: cosineSimilarity(queryEmbedding, c.embedding),
    }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, n);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENROUTER_API_KEY not configured" });
  }

  try {
    const { question, page_context, history } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Missing question" });
    }

    const queryEmbedding = await getEmbedding(question, apiKey);

    const allChunks = loadChunks();
    const topChunks = findTopChunks(queryEmbedding, allChunks, 5);
    const bookContext = topChunks.map((c) => c.text).join("\n\n---\n\n");

    const systemPrompt = `Du er en hjelpsom studieassistent for TTM4100 – Kommunikasjon: Tjenester og nett (NTNU).
Svar på norsk med mindre brukeren skriver på engelsk.
Forklar konsepter tydelig og bruk eksempler fra pensum der det er relevant.
Hvis du ikke finner svaret i konteksten under, si fra i stedet for å finne på noe.

## Kontekst fra læreboken (Kurose & Ross):
${bookContext}

## Kontekst fra nettsiden brukeren leser akkurat nå:
${page_context || "(ingen)"}`;

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
          stream: true,
        }),
      }
    );

    if (!llmResp.ok) {
      const err = await llmResp.text();
      return res.status(502).json({ error: `LLM request failed (${llmResp.status}): ${err}` });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();

    const reader = llmResp.body.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        res.write(text);
      }
    } catch (streamErr) {
      console.error("Stream interrupted:", streamErr.message);
    }

    res.end();
  } catch (err) {
    console.error("Chat API error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    } else {
      res.end();
    }
  }
}
