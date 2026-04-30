# Utformingsdokument — Øvingseksamener TTM4100

> Teknisk mal og komponentbeskrivelse for eksamensidene.
> Se `EKSAMEN_STRUKTUR.md` for innholdsregler og pensumdekning.

## 1. Mappestruktur og URL-skjema

```
eksamner/
├── index.html          ← Forsiden (oversikt + lenker)
├── ny1.html            ← Øvingseksamen 1
├── ny2.html            ← Øvingseksamen 2
└── ...
```

**URL-skjema:** `/eksamner/`, `/eksamner/ny1.html`, `/eksamner/ny2.html`, osv.

## 2. Sidemal

```html
<!DOCTYPE html>
<html lang="no">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Øvingseksamen 1 — TTM4100</title>
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="stylesheet" href="../style.css">
</head>
<body>
<nav class="site-nav">
  <div class="container">
    <a href="../" class="brand">TTM4100</a>
    <a href="./" class="nav-back">&larr; Alle eksamener</a>
    <!-- nav-search -->
  </div>
</nav>

<main data-chapter="Øvingseksamen 1 — TTM4100">
  <header class="hero">
    <div class="container">
      <div class="eyebrow">Øvingseksamen · TTM4100</div>
      <h1>Øvingseksamen <em>1</em></h1>
      <p class="lede">Del I: X flervalgsoppgaver (Xp). Del II: X åpne oppgaver (Xp). Totalt 100 poeng.</p>
      <div class="learn-box">…nøkkeltemaer…</div>
    </div>
  </header>

  <nav class="chapter-toc">
    <div class="container">
      <ol class="chapter-toc-list">
        <li><span class="toc-num">I</span><a href="#del1">Del I — Flervalg</a></li>
        <li><span class="toc-num">II</span><a href="#del2">Del II — Åpne oppgaver</a></li>
      </ol>
    </div>
  </nav>

  <section id="del1">…</section>
  <section id="del2">…</section>
</main>

<footer>…</footer>
<script src="../chat-widget.js"></script>
<script src="../nav-search.js"></script>
<script defer src="/_vercel/insights/script.js"></script>
<script defer src="/_vercel/speed-insights/script.js"></script>
</body>
</html>
```

## 3. Del-header

Brukes øverst i hver del-seksjon:

```html
<div class="exam-del-header">
  <h2>Del I — Automatisk rettede spørsmål</h2>
  <span class="del-points">14 spørsmål · 3 poeng per spørsmål · 42 poeng totalt</span>
</div>
```

## 4. Komponent: Del I-spørsmål (multiple choice)

```html
<article class="exam-q">
  <header class="exam-q__head">
    <span class="exam-q__num">Spørsmål 1</span>
    <span class="exam-q__points">3 poeng</span>
    <span class="exam-q__topic">Kap. 2</span>
  </header>
  <div class="exam-q__body">
    <p class="q-text">Spørsmålstekst her?</p>
    <ul class="exam-q__opts">
      <li><span class="opt-label">A</span> Alternativ A</li>
      <li><span class="opt-label">B</span> Alternativ B</li>
      <li><span class="opt-label">C</span> Alternativ C</li>
      <li><span class="opt-label">D</span> Alternativ D</li>
    </ul>
    <details class="fasit-details">
      <summary>Vis fasit</summary>
      <div class="fasit-body">
        <span class="fasit-correct">Riktig svar: C</span>
        <p>Forklaring på hvorfor C er riktig, og hvorfor de andre er feil.</p>
        <p class="ref">Pensum: <a href="../kapX/innhold.html">Kap. X — Emne</a></p>
      </div>
    </details>
  </div>
</article>
```

## 5. Komponent: Del II-spørsmål (åpen oppgave)

```html
<article class="exam-q">
  <header class="exam-q__head">
    <span class="exam-q__num">Oppgave 1</span>
    <span class="exam-q__points">10 poeng</span>
    <span class="exam-q__topic">Kap. 3</span>
  </header>
  <div class="exam-q__body">
    <p class="q-text">a) Oppgavetekst… (Xp)</p>
    <p class="q-text">b) Oppgavetekst… (Xp)</p>
    <details class="fasit-details">
      <summary>Vis fasit</summary>
      <div class="fasit-body">
        <p><strong>a)</strong> Modellbesvarelse med full forklaring.</p>
        <p><strong>b)</strong> Utregning steg for steg.</p>
        <p class="ref">Pensum: <a href="../kapX/innhold.html">Kap. X — Emne</a></p>
      </div>
    </details>
  </div>
</article>
```

## 6. CSS-klasser (alle definert i `style.css`)

| Klasse | Beskrivelse |
|---|---|
| `.exam-del-header` | Overskriftsrad med del-tittel og poeng-info |
| `.exam-q` | Ytre ramme for én oppgave |
| `.exam-q__head` | Header-rad med nummer, poeng og kapittel-tag |
| `.exam-q__num` | "Spørsmål 1" / "Oppgave 1" — rust-farget mono |
| `.exam-q__points` | Poengetikk — lys bakgrunn |
| `.exam-q__topic` | Kapittel-etikk — blå kant |
| `.exam-q__body` | Innholdsområdet |
| `.q-text` | Oppgavetekst i Newsreader serif |
| `.exam-q__opts` | Liste med flervalgsalternativer |
| `.opt-label` | A/B/C/D-label i rust mono |
| `.fasit-details` | Native `<details>` wrapper |
| `.fasit-body` | Innhold i fasit-dropdown |
| `.fasit-correct` | "Riktig svar: X" i grønn mono |
| `.ref` | Pensum-referanse-linje nederst i fasit |

## 7. Fasit-dropdown — teknisk

Fasiten er native HTML `<details>/<summary>` — **ingen JavaScript nødvendig**.
CSS i `style.css` styler `summary`-knappen og roterer pilen (▾) når åpen.

```css
/* Åpen tilstand — pilen snur */
.fasit-details[open] summary::after { transform: rotate(-180deg); }
```

## 8. Innholdsregler

### Spørsmålstekst
- Klar og entydig — ett riktig svar
- For beregninger: angi alle parametere eksplisitt (enheter, verdier)
- For scenarioer: gi konkret kontekst

### Fasit-kvalitet
1. Riktig svar klart merket (`.fasit-correct`)
2. Forklaring på *hvorfor* — ikke bare hva
3. Forklar gjerne hvorfor *feil* alternativer er feil (Del I)
4. Vis alle steg for beregninger
5. Pensum-referanse som lenke

### Ikke gjenta
Les gjennom alle eksisterende eksamensfiler og unngå like spørsmål eller for mange av samme type innenfor én eksamen.

## 9. Stilkrav — sjekkliste

- [ ] `data-chapter`-attributt på `<main>` for søkeindeksering
- [ ] Sticky `site-nav` med søk og brand
- [ ] `.hero` med eyebrow, h1 (med `<em>`), lede og `.learn-box`
- [ ] `.chapter-toc` med lenker til Del I og Del II
- [ ] `.exam-del-header` for hver del
- [ ] `<details class="fasit-details">` etter hvert spørsmål
- [ ] Footer med `&#10043; &#10043; &#10043;` og "NTNU · TTM4100 · Vår 2026"
- [ ] `chat-widget.js`, `nav-search.js`
- [ ] Vercel insights/speed-insights scripts
