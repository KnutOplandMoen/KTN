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

## 5. Komponent: Sant/Usant-blokk (flere påstander, klikk Sant / Usant)

Én oppgave = flere nummererte påstander. Studenten skal for **hver** påstand velge **Sant** eller **Usant**. På nett brukes **radioknapper** (`<input type="radio">`): ett `name` per påstand (slik at Sant og Usant er gjensidig utelukkende innen samme rad), og felles `name`-prefiks for oppgaven (f.eks. `tf-q3-1` … `tf-q3-5`) for å unngå kollisjon med andre spørsmål på siden.

**Tilgjengelighet:** pakk hver rad i `<fieldset>` med `<legend>` som er synlig eller assosiert med påstandsteksten (`aria-labelledby`). Radioene er da «klikkbare» både som knapp og etikett.

**Eksempel (5 påstander, 5 poeng totalt):**

```html
<article class="exam-q">
  <header class="exam-q__head">
    <span class="exam-q__num">Spørsmål 3</span>
    <span class="exam-q__points">5 poeng</span>
    <span class="exam-q__topic">Kap. 1</span>
  </header>
  <div class="exam-q__body">
    <p class="q-text">Avgjør om påstandene er sanne eller usanne.</p>
    <ul class="exam-q__tf">
      <li>
        <fieldset class="exam-q__tf-field">
          <legend class="exam-q__tf-legend"><span class="tf-num">1.</span> Pakkesvitsjing bruker dedikerte kretser mellom hver par av verter.</legend>
          <div class="exam-q__tf-choices" role="presentation">
            <label class="exam-q__tf-label"><input type="radio" name="tf-ex1-s1" value="true"> Sant</label>
            <label class="exam-q__tf-label"><input type="radio" name="tf-ex1-s1" value="false"> Usant</label>
          </div>
        </fieldset>
      </li>
      <li>
        <fieldset class="exam-q__tf-field">
          <legend class="exam-q__tf-legend"><span class="tf-num">2.</span> Ende-til-ende-forsinkelse er summen av behandlings-, kø-, overførings- og propagasjonsforsinkelser.</legend>
          <div class="exam-q__tf-choices" role="presentation">
            <label class="exam-q__tf-label"><input type="radio" name="tf-ex1-s2" value="true"> Sant</label>
            <label class="exam-q__tf-label"><input type="radio" name="tf-ex1-s2" value="false"> Usant</label>
          </div>
        </fieldset>
      </li>
      <!-- … tilsvarende for påstand 3–5 … -->
    </ul>
    <details class="fasit-details">
      <summary>Vis fasit</summary>
      <div class="fasit-body">
        <p><span class="fasit-correct">Riktige svar</span></p>
        <ol>
          <li><strong>Usant</strong> — pakkesvitsjing er ikke dedikert ende-til-ende; pakker deles om lenker.</li>
          <li><strong>Sant</strong> — jfr. definisjon av ende-til-ende-forsinkelse.</li>
          <!-- … -->
        </ol>
        <p class="ref">Pensum: <a href="../kap1/innhold.html">Kap. 1 — …</a></p>
      </div>
    </details>
  </div>
</article>
```

**Variant uten fieldset (kortere):** én `<p>` per påstand og `role="radiogroup"` med `aria-label` på et omsluttende `<div>` — men `fieldset`/`legend` er ofte enklest for skjermleser.

---

## 6. Komponent: Koble-oppgave (matching)

**Pedagogisk form:** Som i læreboka / klassiske eksamener: en kolonne **«Items» / oppgaver** (nummerert liste) og en **svarbank** **«Selectable Items»** med bokstav **a, b, c, …**. Studenten skal matche hver oppgave til **nøyaktig én** riktig linje i banken. Banken kan være **lengre enn oppgavelisten** — da er noen bokstaver distraktorer (ikke brukt).

**På nettsiden (statisk HTML):** Vanlig praksis er én av disse:

1. **Svarbank + tabell:** Vis svarbanken samlet (nummerert med små bokstaver). Under: tabell med kolonnene «#», «Oppgave», «Velg svar» der «Velg svar» er en `<select>` med `<option value="">—</option>` og `<option value="a">a</option>` … Alternativt tom celle og instruks om å skrive på papir — men `<select>` gir samme «koble»-følelse som eksamen på datamaskin.
2. **To kolonner (kun lesing):** Kun visuell layout: venstre liste, høyre bank — studenten noterer «1 → c» på papir (ingen interaksjon).

Anbefaling for øvingssider: **(1)** med `<select>` per rad, pluss full fasit som tabell.

**Eksempel — aksessnett og hastigheter (forkortet):**

```html
<article class="exam-q">
  <header class="exam-q__head">
    <span class="exam-q__num">Spørsmål 4</span>
    <span class="exam-q__points">4 poeng</span>
    <span class="exam-q__topic">Kap. 1</span>
  </header>
  <div class="exam-q__body">
    <p class="q-text">Koble hvert aksessnett med den omtrentlige hastigheten en abonnent typisk kan oppleve. Velg én bokstav per rad.</p>

    <div class="exam-q__match-bank" aria-label="Svarbank">
      <div class="exam-q__match-bank-title">Selectable Items</div>
      <ol class="exam-q__match-bank-list" type="a">
        <li>Wired. 100 Mbps til 1 Gbps per lenke.</li>
        <li>Wireless. Opptil ti-talls Mbps per enhet.</li>
        <li>Wired. Ti til hundrevis Mbps nedstrøms per bruker.</li>
        <li>Wired. Ti-talls Mbps nedstrøms per bruker.</li>
        <!-- … evt. flere linjer (distraktorer) … -->
      </ol>
    </div>

    <table class="exam-q__match-table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Match Items</th>
          <th scope="col">Ditt valg</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Ethernet</td>
          <td>
            <label class="sr-only" for="m-q4-1">Kobling for Ethernet</label>
            <select id="m-q4-1" class="exam-q__match-select" name="m-q4-1">
              <option value="">—</option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
              <option value="d">d</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>4G cellular LTE</td>
          <td>
            <label class="sr-only" for="m-q4-2">Kobling for 4G</label>
            <select id="m-q4-2" class="exam-q__match-select" name="m-q4-2">
              <option value="">—</option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
              <option value="d">d</option>
            </select>
          </td>
        </tr>
        <!-- … flere rader … -->
      </tbody>
    </table>

    <details class="fasit-details">
      <summary>Vis fasit</summary>
      <div class="fasit-body">
        <span class="fasit-correct">Riktige koblinger</span>
        <table>
          <thead><tr><th>Oppgave</th><th>Riktig</th></tr></thead>
          <tbody>
            <tr><td>1 Ethernet</td><td>a</td></tr>
            <tr><td>2 4G LTE</td><td>b</td></tr>
          </tbody>
        </table>
        <p>Kort forklaring hvis noen distraktorer er lett å velge feil.</p>
        <p class="ref">Pensum: <a href="../kap1/innhold.html">Kap. 1 — …</a></p>
      </div>
    </details>
  </div>
</article>
```

**Eksempel — TCP/socket (aktivitet → handling):** Samme mønster: venstre kolonne «Activities» / handlinger, svarbank med `socket()`, `connect()`, `send` osv. Hold **én riktig bokstav per aktivitet** i fasiten.

**Merk:** Klassen `sr-only` er «screen reader only» — skjul visuelt med CSS (se under) hvis den ikke finnes fra før.

---

## 7. Komponent: Del II-spørsmål (åpen oppgave)

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

## 8. CSS-klasser (alle definert i `style.css`)

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
| `.exam-q__tf` | Ytre liste for Sant/Usant-blokk |
| `.exam-q__tf-field` | `fieldset` per påstand |
| `.exam-q__tf-legend` | Påstandstekst (inkl. nummer) |
| `.exam-q__tf-choices` | Rad med Sant/Usant-radioer |
| `.exam-q__tf-label` | Klikkbart etikett rundt hver radio |
| `.tf-num` | Nummer foran påstand (valgfri utheving) |
| `.exam-q__match-bank` | Ramme for svarbank (a, b, c, …) |
| `.exam-q__match-bank-title` | Tittel «Selectable Items» e.l. |
| `.exam-q__match-bank-list` | `ol type="a"` for banken |
| `.exam-q__match-table` | Tabell for oppgave → nedtrekk |
| `.exam-q__match-select` | `<select>` for valgt bokstav |
| `.sr-only` | Kun for skjermleser (visuelt skjult) |

## 9. Fasit-dropdown — teknisk

Fasiten er native HTML `<details>/<summary>` — **ingen JavaScript nødvendig**.
CSS i `style.css` styler `summary`-knappen og roterer pilen (▾) når åpen.

```css
/* Åpen tilstand — pilen snur */
.fasit-details[open] summary::after { transform: rotate(-180deg); }
```

## 10. Innholdsregler

### Spørsmålstekst
- Klar og entydig — for flervalg og koble: **ett** riktig svar per deloppgave; for Sant/Usant-blokk: hver påstand skal vurderes uavhengig
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

### Sant/Usant-blokk og koble-oppgaver
- **T/F:** Hver påstand skal avgjøres entydig; fasit rad for rad (Sant/Usant + kort begrunnelse ved behov).
- **Koble:** Fasit som tabell «oppgave → bokstav»; ved distraktorer, forklar kort hvorfor de forkerte passet dårlig.

## 11. Stilkrav — sjekkliste

- [ ] `data-chapter`-attributt på `<main>` for søkeindeksering
- [ ] Sticky `site-nav` med søk og brand
- [ ] `.hero` med eyebrow, h1 (med `<em>`), lede og `.learn-box`
- [ ] `.chapter-toc` med lenker til Del I og Del II
- [ ] `.exam-del-header` for hver del
- [ ] `<details class="fasit-details">` etter hvert spørsmål
- [ ] I **Sant/Usant-blokker:** unike `name` på radio (én per påstand), etikett koblet til inndata
- [ ] I **Koble-oppgaver:** svarbank `ol type="a"` og `<select>`-valg som dekker alle bokstaver i banken
- [ ] Footer med `&#10043; &#10043; &#10043;` og "NTNU · TTM4100 · Vår 2026"
- [ ] `chat-widget.js`, `nav-search.js`
- [ ] Vercel insights/speed-insights scripts
