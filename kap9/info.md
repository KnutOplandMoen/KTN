# Kapittel 9 (Multimedia networking) — kilder og pensum

Dette dokumentet er **den konsekvente referansen** for hva som gjelder for kapittel 9 på nettstedet og i mappa `kap9/`.

## Primærkilder

| Fil | Rolle |
|-----|--------|
| [`pensum.md`](../pensum.md) | Offisiell pensumliste for emnet (TTM4100). Her står det eksplisitt hva som er pensum fra læreboka og hva som er unntak. |
| [`chapter_9.md`](chapter_9.md) | Tekstutdrag fra **7. utgave** av *Computer Networking: A Top-Down Approach* (Kurose & Ross), kapittel 9 — «Multimedia networking». Dette utdraget er pensumgrunnlaget for multimedia-kapittelet, jf. [`pensum.md`](../pensum.md) (henvisning til Blackboard-kopi fra 7. utgave). |

## Viktig: `KTN_BOK.md` er ikke pensumgrunnlag for dette kapittelet

I repoet ligger også [`KTN_BOK.md`](../KTN_BOK.md) — full tekst/faksimile av læreboken som brukes som referansemateriale for **store deler** av pensum (typisk **8. Global utgave**, jf. [`pensum.md`](../pensum.md)).

**For kapittel 9 (multimedia networking) gjelder dette ikke:** Pensum for dette temaet er **ikke** definert ut fra kapittel 9 i `KTN_BOK.md`. Emnet bygger i stedet på **utdrag fra 7. utgave** samlet i [`chapter_9.md`](chapter_9.md), fordi tilsvarende kapittel ikke følger samme opplegg i 8. utgave slik pensum er formulert.

- **Konsekvens:** Når du leser eller retter innhold under `kap9/`, skal avstemming mot pensum skje mot **`chapter_9.md`** (og [`pensum.md`](../pensum.md)), **ikke** mot multimedia-kapittel i `KTN_BOK.md`.

## Hvilke deler av kapittel 9 som er pensum (jf. [`pensum.md`](../pensum.md))

Fra **7. utgave**, kapittel 9, er **kun** følgende pensum (sitert struktur fra pensumlisten):

1. **9.1** Multimedia Networking Applications  
   (I utdraget inngår bl.a. underavsnitt som **9.1.1** Properties of Video, **9.1.2** Properties of Audio, **9.1.3** Types of Multimedia Network Applications — alt som hører til avsnitt 9.1 i læreboka og finnes i [`chapter_9.md`](chapter_9.md).)

2. **9.2** Streaming Stored Video  
   (Inkl. tema som buffering, prefetching og tilpasning til båndbredde, slik det dekkes i utdraget.)

3. **9.3** Voice-over-IP  
   (Inkl. underavsnitt som i utdraget, f.eks. begrensninger ved best-effort, jitter/playout, pakketap (FEC, interleaving, error concealment), Skype som case — forutsatt at teksten finnes i [`chapter_9.md`](chapter_9.md).)

4. **9.4** Protocols for Real-Time Conversational Applications — **men bare:**  
   - **9.4.1 RTP**

**Uttrykkelig ikke pensum** etter [`pensum.md`](../pensum.md):

- **9.4.2 SIP** (Session Initiation Protocol)

Tekst om SIP kan forekomme helt til slutt i [`chapter_9.md`](chapter_9.md) (OCR/utdrag); det er **ikke** pensum med mindre emnet endrer pensumlisten.

**Merk:** I innledningen til kapittel 9 i **7. utgave** beskrives også **9.5** (mekanismer i nettverket for differensiert tjeneste). Denne finnes **ikke** på pensumlisten for kapittel 9 fra 7. utgave i [`pensum.md`](../pensum.md) (listen stopper ved 9.4.1 RTP). Bruk derfor alltid [`pensum.md`](../pensum.md) som endelig filter dersom utdraget eller andre kilder omtaler avsnitt utover det som er listet der.

## Kort oppsummert

| Spørsmål | Svar |
|----------|------|
| Hva er «boka» for kap. 9 på dette nettstedet? | [`chapter_9.md`](chapter_9.md) (utdrag 7. utgave), i tråd med [`pensum.md`](../pensum.md). |
| Kan jeg bruke `KTN_BOK.md` som sannhet for kap. 9? | **Nei** — pensum for dette kapittelet er ikke knyttet til den fullteksten for kapittel 9; bruk `chapter_9.md` + `pensum.md`. |
| Er SIP pensum? | **Nei** (9.4.2 er ekskludert i `pensum.md`). |

Sist oppdatert i samsvar med pensumformulering for multimedia (kap. 9 fra 7. utgave) slik den står i [`pensum.md`](../pensum.md).
