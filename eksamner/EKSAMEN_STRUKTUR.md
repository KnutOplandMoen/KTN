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
- **Sant/Usant** — to alternativer med forklaring

### Interaksjon
Hvert spørsmål har en **«Vis fasit»**-knapp (native HTML `<details>/<summary>`).
Studenten svarer på egenhånd (mentalt eller på papir), deretter åpner de fasiten og ser:
- Riktig alternativ tydelig merket med grønn `RIKTIG SVAR: X`
- Kort begrunnelse (1–3 setninger)
- Referanse til pensum-kapittel

### Poengnivåer
- 2–3 poeng per spørsmål
- Ca. 12-17 spørsmål per eksamen

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

## 7. Hva som IKKE inkluderes

- Kopier av spørsmål fra V23/V24/V25 PDF-ene
- Oppgaver om stoff utenfor pensum (RSA, BitTorrent, CDMA, Bluetooth, VLAN, SDN, mobilitetsstyring)
- Eksamen-modus med tidtaker eller scoring
- Multiple choice uten forklaring i fasiten

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
