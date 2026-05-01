# Eksamensstruktur — TTM4100 Øvingseksamener

> Plandokument for NYE øvingseksamener laget for trening.
> Eksamenene er **ikke** basert på eller kopiert fra tidligere eksamener —
> de er nyskrevne spørsmål og oppgaver som dekker pensum.

## 1. Formål

Sidene skal gi studentene mulighet til å øve på eksamensliknende oppgaver med umiddelbar feedback via fasit-dropdown etter hvert spørsmål. Eksamenene er strukturert som ekte TTM4100-eksamener med to deler.

## 2. Generell eksamensstruktur

| Egenskap | Verdi |
|---|---|
| Varighet (simulert) | 4 timer |
| Total poengsum | 100 poeng |
| Deler | Del I (automatisk, ~40p) + Del II (åpen, ~60p) |
| Fasit | Dropdown etter hvert spørsmål — `<details>/<summary>` |

## 3. Del I — Automatisk rettede spørsmål (~40 poeng)

### Spørsmålstyper som brukes
- **Multiple choice** — fire alternativer (A, B, C, D)
- **Sant/Usant (enkelt)** — én påstand med to alternativer og forklaring i fasit
- **Sant/Usant-blokk** — én oppgave med **flere påstander** (typisk 4–6, ofte 5). For hver påstand skal studenten velge **Sant** eller **Usant**. På nettsiden gjøres dette med **klikkbare valg** (radioknapper per påstand — se `EKSAMEN_UTFORMING.md`). Fasiten lister riktig svar per nummer og kort begrunnelse der det trengs.
- **Koble (matching)** — koble elementer i en **oppgaveliste** (nummerert 1, 2, 3 …) til riktig linje i en **svarbank** merket **a, b, c, …** (som i lærebok/eksamen: «Match Items» / «Selectable Items»). Eksempler: aksessnett mot typiske hastigheter; lag i TCP/IP-modellen mot beskrivelse; klienthandlinger mot socket-kall. Svarbanken kan ha **flere linjer enn oppgaver** (ekstra «distraktor»-alternativer som ikke skal brukes). Se HTML-mal i `EKSAMEN_UTFORMING.md`.

### Interaksjon
Hvert spørsmål har en **«Vis fasit»**-knapp (native HTML `<details>/<summary>`).
Studenten svarer på egenhånd (ev. ved å klikke Sant/Usant eller velge bokstav i nedtrekksliste på nett), deretter åpner de fasiten og ser:
- For **flervalg:** riktig alternativ tydelig merket med grønn `Riktig svar: X` (eller tilsvarende)
- For **Sant/Usant-blokk:** for hver nummererte påstand — **Sant** eller **Usant** pluss kort begrunnelse der det hjelper
- For **Koble:** tabell eller liste som viser **riktig bokstav** (a, b, c, …) for hver oppgave, med kort forklaring ved behov
- Kort begrunnelse (1–3 setninger) der det gir verdi
- Referanse til pensum-kapittel

### Poengnivåer
- 2–3 poeng per **vanlig** flervalgsoppgave
- **Sant/Usant-blokk:** typisk **1 poeng per påstand** (summer til én poengsum i header, f.eks. «5 poeng» for fem påstander), eller samlet poeng for hele blokken — vær konsekvent innen én eksamen
- **Koble:** typisk **1 poeng per riktig kobling** når det er like mange par som oppgaver, eller **3–5 poeng samlet** for en tabell med flere rader — angi i oppgavetekst/header hvordan poeng fordeles
- Ca. 12–17 **oppgaver** per eksamen (én «oppgave» kan være én T/F-blokk eller én koble-tabell)

## 4. Del II — Åpne oppgaver (~60 poeng)

### Typiske oppgavetyper som brukes
- **Beregninger** — forsinkelse, subnetting, RTT, gjennomstrømning
- **Protokoll-gjennomgang / scenario** — beskriv protokollkjede fra A til B
- **Definisjons-/sammenligningsoppgaver** — to begreper forklart og sammenlignet
- **Krypto-anvendelse** — Caesar-cipher, kryptering/dekryptering steg for steg
- **Diagramanalyse** — forwarding-tabeller, tidsdiagrammer

### Interaksjon
Hvert spørsmål har en **«Vis fasit»**-dropdown (`<details>/<summary>`) med:
- Modellbesvarelse med full utregning eller forklaring
- Tabeller og strukturerte svar der relevant
- Lenker til riktig pensum-kapittel/seksjon

### Poengnivåer
| Poeng | Type |
|---|---|
| 5–8p | Beregning eller kort forklaring |
| 10–12p | Sammenligning eller flerstegs beregning |
| 14–17p | Subnetting med deloppgaver |
| 15p | Scenario/protokollkjede |

## 5. Pensumdekning — hva som skal dekkes

Temaer som dekkes jevnt over eksamenene:

| Tema | Kapittel |
|---|---|
| Pakkesvitsjing, forsinkelse, gjennomstrømning | 1 |
| DNS, HTTP, e-post (SMTP/IMAP/POP3), applikasjonslaget | 2 |
| TCP, UDP, tre-veis handshake, flow/congestion control | 3 |
| IP-adressering, CIDR, subnetting, forwarding | 4 |
| ICMP | 5 |
| ARP, Ethernet, CSMA/CD, lenkelaget | 6 |
| WiFi og trådløst (802.11, CSMA/CA) | 7 |
| Kryptografi (Caesar, symmetrisk, offentlig nøkkel, TLS, brannmur) | 8 |
| Multimedia-nett (streaming, DASH, CDN) | 9 (utgave 7) |

Husk også å lese pensum.md for å dobbelsjekke hva som er pensum

## 6. Kvalitetskriterier for nye spørsmål

1. **Ikke kopiert fra tidligere eksamener** — spørsmålene er originalskrevne
2. **Ingen gjentakelse på tvers av eksamener** — les gjennom alle eksisterende sett
3. **Riktig vanskelighetsgrad** — heller litt for vanskelig enn for lett
4. **Klare og entydige formuleringer** — ett riktig svar, ikke tvetydige alternativer
5. **Solid fasit** — ikke bare svar, men *hvorfor* og pensum-referanse
6. **Realistisk poengtildeling** — signal til studenten om forventet svarlengde
7. **Variert oppgaveform** — ikke for mange av samme type i ett sett
8. **Multiple choice — balanserte alternativer:**
   - Alle fire alternativer (A–D) skal være **omtrent like lange** (innen ~30 % av hverandre i tegn/ord). Et alternativ som er markant lengre enn de andre er en kjent «tell» — studenter krysser av det lengste når de gjetter, fordi forfattere ofte legger ekstra presisjon i det riktige svaret.
   - **Ingen distraktorer som er åpenbart feil** — feil alternativer skal være plausible og krever at studenten faktisk kan stoffet for å avvise dem. Unngå useriøse svar, åpenbart selvmotsigende formuleringer, eller alternativer som bare en som ikke har lest noe av pensum ville velge.
   - Unngå at det riktige alternativet skiller seg ut på andre måter enn innhold: samme grammatiske form, samme detaljnivå, samme stilnivå. Hvis tre alternativer er korte tekniske termer og det fjerde er en lang setning med forklaring, er det en designfeil — kort ned forklaringen eller utvid de andre.
   - Plasser riktig svar tilfeldig fordelt over A/B/C/D på tvers av eksamenen, ikke konsentrert på ett sted.
9. **Koble-oppgaver:** formulér oppgaver og svarbank klart; ved distraktorer skal det fortsatt finnes én entydig riktig matching per rad; i fasit: tabell med «Oppgave → riktig bokstav» pluss kort forklaring ved behov
10. **Sant/Usant-blokk:** unngå tvetydige påstander; hver påstand skal kunne vurderes uten kontekst fra de andre (med mindre det er eksplisitt en serie om samme scenario)

## 7. Hva som IKKE inkluderes

- Kopier av spørsmål fra V23/V24/V25 PDF-ene
- Oppgaver om stoff utenfor pensum (RSA, BitTorrent, CDMA, Bluetooth, VLAN, SDN, mobilitetsstyring)
- Eksamen-modus med tidtaker eller scoring
- Multiple choice eller andre typer auto retting uten forklaring i fasiten

## 8. Mappestruktur

```
eksamner/
├── index.html              ← Oversiktsside med lenker til eksamener
├── ny1.html                ← Øvingseksamen 1 (ferdig)
├── ny2.html                ← Øvingseksamen 2 (planlagt)
├── EKSAMEN_STRUKTUR.md     ← Dette dokumentet
├── EKSAMEN_UTFORMING.md    ← HTML/CSS-mal og komponentbeskrivelse
└── [PDF-referansefiler]    ← Kun til inspirasjon, ikke kopiert
```
