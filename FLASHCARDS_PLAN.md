# Flashcards — Plandokument

> Designdokument for nytt flashcard-element som legges over "Test deg selv"-quizen
> på hver kapittelside. Inspirert av Anki/Quizlet, men holdt i nettstedets papir-stil.

---

## 1. Formål

Flashcards skal være et **raskt repetisjonsverktøy** som studenten møter
*før* den mer omfattende quizen. De skal:

- Trene **aktiv gjenkalling** — studenten må selv formulere svaret før forsiden flipper.
- Bestå av **åpne spørsmål** (ikke flervalg) — i samme stil som Del II på eksamen.
- Gi **forklaringer som peker på *hvorfor*** noe er riktig, ikke bare *hva* det er.
  Dette matcher fasit-stilen i [eksamner/EKSAMEN_STRUKTUR.md](eksamner/EKSAMEN_STRUKTUR.md).
- Komme i **tilfeldig rekkefølge** ved hver sidelasting, slik at studenten ikke
  pugger rekkefølge i stedet for innhold.

---

## 2. Plassering

På hver kapittelside som har en `Test deg selv`-seksjon (alle `kap*/index.html`
og enkelte underpages som har en `<div class="quiz">`-blokk), legges en ny
seksjon **rett over** quizen:

```
┌────────────────────────┐
│  Faglig innhold        │
│  (sections, figures…)  │
├────────────────────────┤
│  📇 Flashcards          │  ← ny seksjon
├────────────────────────┤
│  Test deg selv (quiz)  │
└────────────────────────┘
```

Flashcards skal være en **stand-alone widget** — ingen scrolling for å se
neste kort. Hele opplevelsen foregår i én `<section>` på ca. 380 px høyde.

---

## 3. Interaksjon (UX)

### Navigasjon — kun horisontalt

| Handling | Effekt |
|---|---|
| `←` / `→` (piltastene) | Forrige / neste kort |
| Klikk på `&larr;` / `&rarr;`-knapp | Samme |
| Klikk på selve kortet | Flip mellom spørsmål og svar |
| `Mellomrom` / `Enter` | Flip mellom spørsmål og svar |
| `R` | Shuffle bunken på nytt |

**Eksplisitt: ingen vertikal scroll mellom kort.** En helt annen UX enn quizen,
som er en lang vertikal liste. Et flashcard-sett oppfører seg som en *bunke* —
du blar gjennom én og én med pilene.

Piltastene fanges opp **kun når flashcard-widgeten er i viewport** (via
`IntersectionObserver`), slik at de ikke konkurrerer med browserens egen
scroll-håndtering når studenten leser teori lenger oppe på siden.

### Visuelt

- Ett kort vises av gangen, med fast min-høyde (~ 280 px) for å unngå at
  layouten hopper når kort flipper eller skifter.
- Spørsmålssiden er på **papir-bakgrunn** (`var(--paper)`) med rust-aksent.
- Svarsiden er på **mørkere papir** (`var(--paper-dark)`) med grønn venstre-kant
  (samme som `.quiz .answer` — visuell kontinuitet).
- Flip-animasjon: 0.3 s `transform: rotateY` for taktil følelse.
- Teller: `3 / 14` i mono-font under kortet.
- Progressionsindikator (tynn linje) under telleren.

---

## 4. Innholdskvalitet

### Spørsmål
- **Åpent format.** Aldri "hvilket av disse..." eller ja/nei.
- Begynner gjerne med *Hva*, *Hvorfor*, *Forklar*, *Sammenlign*, *Beregn*.
- Én ting av gangen — ikke flerstegs-spørsmål med a/b/c.

### Svar — eksamensformat
Svaret skal:

1. **Levere fasiten først** (1 setning).
2. **Forklare hvorfor**, ikke bare gjenta hva. Det er denne `Why:`-delen som
   gjør at studenten husker neste gang.
3. Inkludere **konkret eksempel/tall** der relevant.
4. Dersom flere konsepter blandes lett, **kontrastere** dem
   (f.eks. "ikke å forveksle med transmisjonsforsinkelse, som ...").

**Mal:**
> **Svar:** [direkte fakta i én setning].
> **Hvorfor:** [det underliggende prinsippet — hva gjør dette riktig?].
> [Eksempel/tall hvis relevant.] [Kontrast mot lignende begrep hvis nyttig.]

### Eksempel — bra vs. dårlig svar

**Dårlig (kun *hva*):**
> Transmisjonsforsinkelse er L/R.

**Bra (*hva* + *hvorfor*):**
> Transmisjonsforsinkelse er tiden det tar å skyve alle bits i en pakke ut på
> linken: `d_trans = L/R`. Den oppstår fordi en link har endelig kapasitet
> (R bits/s), så en pakke med L bits trenger L/R sekunder for å komme seg ut.
> En 1500-byte pakke på 1 Gbps tar 12 µs; samme pakke på 1 Mbps tar 12 ms —
> tusen ganger mer. Ikke å forveksle med propageringsforsinkelse, som er
> uavhengig av pakkestørrelsen og bare avhenger av fysisk avstand.

---

## 5. Teknisk arkitektur

### Filer som påvirkes

| Fil | Endring |
|---|---|
| `style.css` | Ny `/* ---------- FLASHCARDS ---------- */`-blokk |
| `flashcards.js` | Ny fil (på linje med `quiz.js`) |
| `kap*/index.html` (og enkelte underpages) | Ny `<section class="flashcards-section">` over quizen, og `<script src="../flashcards.js">` |

### HTML-struktur

```html
<section class="flashcards-section" id="flashcards">
  <div class="container">
    <div class="section-badge">Flashcards</div>
    <h2>Rask <em>repetisjon</em></h2>
    <p class="section-intro">Klikk på kortet for å snu — bruk piltastene for å bla.</p>

    <div class="flashcards" data-flashcards>
      <!-- Selve kort-stagen -->
      <div class="fc-stage">
        <article class="fc-card" tabindex="0">
          <div class="fc-face fc-front">
            <div class="fc-label">Spørsmål</div>
            <p class="fc-text" data-fc-front></p>
            <div class="fc-hint">Klikk eller trykk mellomrom for å vise svar</div>
          </div>
          <div class="fc-face fc-back">
            <div class="fc-label">Svar</div>
            <div class="fc-text" data-fc-back></div>
          </div>
        </article>
      </div>

      <!-- Kontroller -->
      <div class="fc-controls">
        <button class="fc-btn fc-prev" aria-label="Forrige kort">&larr;</button>
        <div class="fc-progress">
          <span class="fc-counter">1 / 1</span>
          <div class="fc-bar"><div class="fc-bar-fill"></div></div>
        </div>
        <button class="fc-btn fc-next" aria-label="Neste kort">&rarr;</button>
        <button class="fc-btn fc-shuffle" aria-label="Shuffle"
                title="Shuffle (R)">↻</button>
      </div>

      <!-- Bunken med kortdata. Skjules visuelt; leses av JS -->
      <ol class="fc-deck" hidden>
        <li data-card>
          <div data-fc-front>Spørsmålstekst …</div>
          <div data-fc-back>
            <strong>Svar:</strong> …
            <br><strong>Hvorfor:</strong> …
          </div>
        </li>
        <!-- … flere <li data-card> … -->
      </ol>
    </div>
  </div>
</section>
```

Kortdata holdes som rene `<li>`-elementer i `<ol class="fc-deck" hidden>` — det
er semantisk renslig, fungerer uten JS (alle kort vises som en liste hvis
JavaScript er av), og lar HTML-kilden være enkel å vedlikeholde.

### JavaScript

`flashcards.js` (~80 linjer) gjør:

```text
1. for hver [data-flashcards]:
   a. les inn alle [data-card]-elementer som { front, back }-objekter
   b. shuffle (Fisher–Yates)
   c. render kort 0
2. registrer event-listeners:
   - klikk på kort      → flip
   - klikk på .fc-prev   → forrige (med wrap-around)
   - klikk på .fc-next   → neste (med wrap-around)
   - klikk på .fc-shuffle → shuffle på nytt + render
   - keydown på document → ←/→/space/enter/r, men kun hvis widget er i viewport
3. oppdater teller og progress-bar ved hver render
```

Wrap-around: når du står på siste kort og trykker →, går du til kort 0.
Forventet oppførsel for et "deck", og hindrer at brukeren tror knappen er ødelagt.

### CSS — viktigste klasser

```css
.flashcards-section { padding: 60px 0 40px; }

.fc-stage {
  perspective: 1200px;
  height: 320px;
  margin: 24px 0;
}

.fc-card {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.4s cubic-bezier(.2,.7,.2,1);
}
.fc-card.flipped { transform: rotateY(180deg); }

.fc-face {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  border: 1px solid var(--line);
  padding: 36px 40px;
  display: flex; flex-direction: column; justify-content: center;
}
.fc-front { background: var(--paper); }
.fc-back  { background: var(--paper-dark); transform: rotateY(180deg);
            border-left: 4px solid var(--green); }

.fc-controls { display:flex; align-items:center; gap:18px;
               justify-content:center; }
.fc-btn { /* mono, rust outline, transparent */ }
.fc-counter { font-family: var(--mono); font-size: 12px; }
.fc-bar { width: 140px; height: 2px; background: var(--line); }
.fc-bar-fill { height: 100%; background: var(--rust);
               transition: width 0.25s; }
```

Detaljer (hover, focus-ring, disabled, mobil-stack) implementeres i `style.css`
under `/* ---------- FLASHCARDS ---------- */`.

---

## 6. Tilgjengelighet

- `<article>` med `tabindex="0"` slik at kortet er fokuserbart — keyboard-only
  brukere kan flippe med space/enter.
- `aria-label` på alle ikonknapper (`Forrige kort`, `Neste kort`, `Shuffle`).
- `aria-live="polite"` på den synlige tekstcontaineren, slik at skjermlesere
  annonserer kortskifte.
- `prefers-reduced-motion`: deaktiverer flip-animasjonen (cross-fade i stedet).
- Når JS ikke er tilgjengelig: `.fc-deck` får `hidden` fjernet via CSS-fallback,
  og kortene rendres som en lesbar definisjonsliste (graceful degradation).

---

## 7. Innholdsplan per kapittel

Antall flashcards per side bør ligge på **12–18**. For mange og det blir en
quiz; for få og kortet repeteres for ofte.

| Side | Forslag |
|---|---|
| `kap1/index.html` | 15 — protokollag, pakke-/linjesvitsjing, forsinkelse, sikkerhet (eksempel under) |
| `kap2/http-og-web.html` | 14 — HTTP, persistent vs ikke-persistent, statuskoder, cookies, web caching |
| `kap2/epost-dns-sockets.html` | 14 — SMTP/IMAP/POP3, DNS-hierarkiet, iterativ vs rekursiv, sockets |
| `kap2/p2p-video-cdn.html` | 10 — DASH, CDN, P2P-egenskaper |
| `kap3/transport-udp.html` | 10 — multiplexing/demultiplexing, UDP-checksum |
| `kap3/palitelig-dataoverforing.html` | 12 — RDT-evolusjon, GBN, SR, ARQ |
| `kap3/tcp.html` | 16 — TCP segment, three-way handshake, RTT-estimering, fast retransmit |
| `kap3/congestion.html` | 12 — slow start, AIMD, congestion avoidance, fairness |
| `kap4/ip-adressering.html` | 16 — CIDR, subnetting, NAT, DHCP |
| `kap4/rutere-videresending.html` | 12 — forwarding tables, longest prefix match |
| `kap5/innhold.html` | 10 — routing algorithms (LS, DV), ICMP types |
| `kap6/grunnleggende-tilgang.html` | 12 — multiple access, CSMA/CD, Aloha |
| `kap6/ethernet-svitsjer.html` | 14 — Ethernet frame, switches vs hubs, ARP, switch learning |
| `kap7/innhold.html` | 14 — 802.11, CSMA/CA, hidden terminal, BSS/AP, association |
| `kap8/kryptografi.html` | 14 — Caesar, symmetric vs asymmetric, hash, MAC, digital signatures |
| `kap8/protokoller-brannmur.html` | 14 — TLS handshake, IPSec, firewalls, WPA |
| `kap9/innhold.html` | 10 — DASH, RTP, VoIP-utfordringer |

---

## 8. Implementasjonsrekkefølge

1. **Eksempel** — bygg flashcards på `kap1/index.html` (denne PRen).
   - Skriv `flashcards.js`.
   - Legg til CSS-blokk i `style.css`.
   - Skriv 15 kort for kap. 1 (over).
   - Test piltaster, shuffle, flip, viewport-detection.
2. **Iterer** — vurder layout, kort-høyde, lesbarhet på mobil.
3. **Roll-out** — én kapittelside av gangen. Kortene skrives manuelt for å
   sikre eksamenskvalitet på fasitene; det er IKKE en automatisk konvertering
   fra eksisterende quiz-svar (de er for korte og forklarer ikke *hvorfor*).
4. **Søkeindeksering** — `nav-search.js` indekserer på `data-chapter`-attributtet
   og overskrifter; flashcards trenger ingen ekstra integrasjon der.

---

## 9. Designprinsipp — kontrast med quizen

| Egenskap | Flashcards | Quiz (Test deg selv) |
|---|---|---|
| Format | Åpen — du formulerer svaret selv | Åpent + reveal-knapp |
| Layout | Én og én, horisontal navigering | Lang vertikal liste |
| Mengde | 12–18 kort | 20–30 spørsmål |
| Mål | Rask gjenkalling, repetisjon | Bredere selvtest |
| Rekkefølge | Tilfeldig hver sidelasting | Fast |
| Tastatur | `←`/`→`/`space` styrer alt | Klikk knapp |
| Forklaringskvalitet | **Eksamensformat (*hvorfor*)** | Kort fasit |

De to verktøyene utfyller hverandre: flashcards for *aktiv repetisjon*, quizen
for *bredere oversikt*.
