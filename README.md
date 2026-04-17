# TTM4100 — Kommunikasjon: Tjenester og nett

Statisk nettsted med fagstoff for emnet. Forsiden ligger i `index.html`.

## Innhold

- **Kapittel** (`kap1/`–`kap9/`): HTML-sider per kapittel (oversikt i `index.html`, emneinnhold i `innhold.html` der det finnes, pluss tematiske sider som TCP, UDP, HTTP, kryptografi osv.).
- **Reisen** (`reisen/`): Egen del med tilhørende sider.
- **Engelsk** (`en/`): Speil av strukturen over med engelsk tekst (samme kapittel- og filnavn som i rotkatalogen der det finnes oversettelse).

## Felles filer

- `style.css` — felles stilark
- `quiz.js` — quiz på sidene
- `lang-switch.js` — språkveksling

## Studieassistent (AI-chat)

På sidene er det en **innebygd studieassistent** — en AI-chat som svarer som faglig hjelp for TTM4100 (pensum etter Kurose & Ross). Den får med **kontekst om hvor man er på siden** (blant annet URL-sti, kapittel, hvilket avsnitt som er i nærheten av leseposisjonen og synlig tekst på skjermen), og bruker **RAG** til å hente inn relevante utdrag fra boka som grunnlag for svaret. `chat-widget.js` er grensesnittet i nettleseren; `api/chat.js` er serverless-endepunktet som håndterer meldingene (konfigurert for Vercel i `vercel.json`).

## Annet i repoet

- `pensum.md` og `course_description.md` — tekstlig kursbeskrivelse/pensum
- `tools/generate_chapter_quizzes.py` — skript relatert til kapittel-quizzer
