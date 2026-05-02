# Eksamensinfo og «må kunne»-oversikt

> **Viktig beskjed:** Det blir **ingen Wireshark-spørsmål** på årets eksamen. Hopp over Wireshark-oppgavene i [eks2.md](eks2.md) (Q3) hvis tiden er knapp.

Dette dokumentet er bygget fra [eks1.md](eks1.md), [eks2.md](eks2.md), [eks3.md](eks3.md) og [eks_4.md](eks_4.md). Temaer som dukker opp på **2 eller flere** av eksamenene er markert med ★ — de er høyest prioritert.

---

## 1. Temaer som går igjen (frekvens på tvers av eks1/eks2/eks3/eks4)

| Tema | eks1 | eks2 | eks3 | eks4 | Prioritet |
|---|:---:|:---:|:---:|:---:|:---:|
| Ruting vs videresending | x | | x | | ★★ |
| Overførings-/utbredelses-/ende-til-ende-forsinkelse | x | x | x | x | ★★★★ |
| Pakke- vs kretskobling, store-and-forward | x | x | | x | ★★★ |
| Kapsling og lagdeling | x | x | x | x | ★★★★ |
| HTTP / web-cache | x | x | | | ★★ |
| HTTP vs SMTP (sammenligning) | x | | | | ★ |
| E-post-kjede (DHCP→DNS→SMTP→IMAP/HTTP, NTNU-scenario) | | | x | | ★ (15 poeng på eks3) |
| DNS (UDP/TCP, RR-format) | | x | x | x | ★★★ |
| **DNS-hierarki + registrering** (root/TLD/auth) | | | | x | ★ |
| UDP vs TCP-tjenester | x | x | x | x | ★★★★ |
| **UDP-fordeler / bruksområder** | | | | x | ★ |
| Sockets (TCP `SOCK_STREAM` vs UDP `SOCK_DGRAM`, `accept`, `connect`) | x | x | x | x | ★★★★ |
| **ServerSocket vs ConnectionSocket** | | | | x | ★ |
| **TCP 3-veis håndtrykk** (SYN/SYN-ACK/ACK) | | | | x | ★ |
| TCP flytkontroll | | x | | x | ★★ |
| TCP slow start / cwnd-graf | x | | | | ★ |
| Internet checksum (TCP/UDP samme) | x | | | x | ★★ |
| **Pakketap i nettet** (4 årsaker) | | | | x | ★ |
| **CRC-beregning** | | | | x | ★ |
| Subnetting + CIDR (subnet-adresse, broadcast, brukbare verter) | x | x | x | | ★★★ |
| Lengste prefiks-match | x | | | | ★ |
| NAT-tabell-lesing | x | | | | ★ |
| ICMP (sann/usann) | x | x | | | ★★ |
| DHCP (UDP, 4-stegs, oppstart) | | x | x | | ★★ |
| IPv4 vs IPv6 header-felt | x | | | | ★ |
| Best effort-tjenestemodell | x | | x | | ★★ |
| FIFO køforsinkelse | | x | | | ★ |
| Svitsj (lag 2) vs ruter (lag 3) | | x | x | x | ★★★ |
| **Linklags-svitsj — virkemåte (self-learning)** | | | | x | ★ |
| **ARP — formål og virkemåte** | | | | x | ★ |
| Multiple access-klassifisering (partition / random / taking turns) | | | x | | ★ |
| CSMA / CSMA/CD tidslinje (t=0..5, prop=0.2) | x | | x | | ★★ |
| **CSMA/CD vs CSMA/CA + WiFi ACK** | | | | x | ★ |
| **Infrastructure vs ad hoc (802.11)** | | | | x | ★ |
| Pure ALOHA vs slotted ALOHA | | x | | | ★ |
| 2D-paritet | x | x | | | ★★ |
| RTS/CTS, skjult terminal, CSMA/CA | x | x | | x | ★★★ |
| 4-noder A-B-C-D wireless (rate, kombinert flow, ACK-variant) | x | x | | | ★★ |
| SNR vs BER vs modulasjon | | x | | | ★ |
| Sikkerhetsegenskaper (konfidensialitet, integritet, …) | x | x | | | ★★ |
| Symmetriske nøkler: N(N−1)/2 | x | x | | | ★★ |
| Trudy: lytte / endre / slette / sette inn | x | x | | | ★★ |
| Meldingintegritet (hash vs checksum) | | x | | | ★ |
| HTTP-streaming vs UDP, CDN | | x | x | | ★★ |
| Cæsar-chiffer (kode/dekode med gitt k) | | | x | | ★ |
| Symmetrisk vs offentlig nøkkel | | | x | x | ★★ |
| **Digital signatur (med public key + sertifikat)** | | | | x | ★ |
| Brannmur — hovedformål | | | x | x | ★★ |
| **Tre brannmur-kategorier** (traditional / stateful / app gateway) | | | | x | ★ |

---

## 2. Oppgaver du «bare må kunne» (sortert etter sannsynlighet)

### Aller høyest sannsynlighet (★★★+ — har vært på 3 eller alle 4 eksamener)

- [ ] **Forsinkelsesregning**
  - Overføringsforsinkelse: `d_trans = L / R`
  - Ende-til-ende over N hopp: summer overføring + utbredelse per hopp (når kø/prosessering = 0)
  - Store-and-forward med 1 svitsj: `L/R1 + L/R2`
  - Cut-through (start sending etter første k byte): klare å regne ut hybridforsinkelse
  - **P pakker, N rutere, lik R**: minimum ende-til-ende = `(N + P − 1) · L/R` (forstå pipelining)

- [ ] **UDP vs TCP-tjenester** (best effort, pålitelighet, flytkontroll, overbelastningskontroll, ingen sanntidsgaranti, ingen båndbreddegaranti)

- [ ] **Sockets**
  - `socket(AF_INET, SOCK_STREAM)` = TCP, `SOCK_DGRAM` = UDP
  - TCP: `accept()` lager *ny* socket per klient; UDP: én socket, må angi destinasjon per send
  - Klient TCP: `connect()` binder så send ikke trenger eksplisitt IP/port
  - Telle sockets: 1 lyttesocket + 1 per åpen tilkobling (5 tilkoblinger på port 80 → **6 sockets**)

- [ ] **Subnetting / CIDR**
  - Gitt IP + maske /x: regne **subnet-adresse** med binær AND
  - Regne **broadcast-adresse** for /x (siste adresse i blokken)
  - Dele en /22 i M undernett: vertsbits, antall nett, **brukbare verter** = `2^(32−x) − 2`
  - Eks: /22 → 12 subnett krever 4 ekstra bit → /26 → **62 brukbare verter**
  - Identifisere hvilke adresser som **ikke** kan brukes i et /29 (utenfor range, network-adresse, broadcast)

- [ ] **Kapsling og lagdeling**: koble rammehoder H1/H2/H3 til riktig lag (fysisk → lenke → nettverk → transport → applikasjon); forklare hva «encapsulation» betyr (legg til header på data fra lag over)

### Veldig høy sannsynlighet (★★ — på 2 av 4 eksamener)

- [ ] **Ruting vs videresending** (1 setning hver — videresending er *lokal*, ruting er *global* banevalg)

- [ ] **HTTP / web-cache**: hva HTTP GET er; hvorfor cache (lavere klientforsinkelse, mindre båndbredde inn til institusjon, kan redusere snittforsinkelse for *alle* objekter)

- [ ] **HTTP vs SMTP**: pull vs push, port 80 vs 25, persistente forbindelser, CRLF-bruk

- [ ] **DNS**: kjører over UDP, men **kan også over TCP**; RR-format `(name, value, type, TTL)`; query-svar inneholder addresse, alias, mailserver, m.m.

- [ ] **NTNU-scenario / e-postkjede** (eks3 Q3, 15 poeng): plugg inn kabel → **DHCP** for IP, gateway, DNS → **ARP** for første hopp → **DNS** for å finne mailserver → **SMTP** klient til server, server til server til mottakers domene → mottaker leser via **HTTP(S)** (webmail) eller **IMAP/POP3** (klient). Nevn lag og protokoll per steg.

- [ ] **DHCP**: 4-stegs handshake (discover, offer, request, ack), kjører over **UDP** (ikke TCP), gir IP + subnetmaske + default gateway + DNS-server

- [ ] **ICMP**: bæres direkte i **IP-datagram** (ikke i UDP/TCP), brukes til feilrapportering og diagnose, **TTL-expired** brukes av `traceroute`. *Ikke* en transportprotokoll, *ikke* port 86.

- [ ] **Best effort-tjeneste**: ingen garanti for levering, rekkefølge, forsinkelse eller minimum båndbredde

- [ ] **CSMA / CSMA/CD-tidslinje** (eks1 Q1.4.3-4, eks3 Q7): gitt 6 ankomsttider og prop-tid 0.2 — avgjør hvilke pakker som lykkes før t=5
  - **CSMA uten CD**: kolliderer dersom annen sender begynner innen prop-tid; kolliderende noder fullfører hele frame
  - **CSMA/CD**: stopper umiddelbart ved kollisjon, men siste bit bruker fortsatt 0.2 på å nå alle noder

- [ ] **2D-paritet**: kan **detektere og korrigere** enkeltbits-feil; kan detektere (ikke korrigere) noen 2-bits-feil

- [ ] **RTS/CTS**: løser **skjult terminal**-problemet; CTS får naboer til å være stille slik at sender kan sende uten kollisjon. CSMA/CA bruker dette i WiFi.

- [ ] **4-noder A↔B↔C↔D wireless** (eks1 Q1.4.7, eks2 Q5):
  - **C → A** alene: **0.5 msg/slot** (må gå C→B, så B→A; B kan ikke sende mens han mottar)
  - **A → B og D → C** parallelt: **2 msg/slot** (begge sendinger uten interferens, A hører ikke D)
  - **A → B og C → D** parallelt: **1 msg/slot** (B og C kan ikke sende samtidig — interferens)
  - **Med ACK-slot per datapakke**: halverer ratene over

- [ ] **Sikkerhetsegenskaper**: konfidensialitet, meldingintegritet, autentisering, tilgjengelighet/operasjon (IKKE «høy båndbredde»)

- [ ] **Symmetriske nøkler i N-personers gruppe**, parvis hemmelig: **N(N−1)/2** nøkler

- [ ] **Trudy** (passiv/aktiv inntrenger): kan lytte/lagre kontroll- og datameldinger, **endre, sette inn, slette** meldinger

- [ ] **HTTP-streaming foretrekkes over UDP-streaming**: brannmurer blokkerer ofte UDP, HTTP gir pålitelighet via TCP

### Middels sannsynlighet (★ — på 1 av 4 eksamener)

> **Les denne seksjonen kritisk:** Disse oppgavene har dukket opp én gang. De er sortert under i to grupper — *fundamentale konsepter* (verdt å forstå uansett, gjenbrukes i andre tema) og *spesifikk/niche* (lavere prioritet — pugg svaret hvis du har overskudd, ellers hopp).

**Fundamentale konsepter (lærebok-sentrale, kan komme i ny innpakning):**

- [ ] **Svitsj (lag 2, MAC) vs ruter (lag 3, IP)** — fundamental skillelinje, dukker opp som påstander overalt
- [ ] **TCP cwnd-graf**: identifisere intervaller med **slow start** (eksponentiell vekst fra 1 eller etter timeout) vs **AIMD/congestion avoidance** (lineær vekst etter triple dup ACK)
- [ ] **TCP flytkontroll**: når app sender raskere enn mottaker leser → mottakers `rwnd` krymper → sender blir bremset
- [ ] **Lengste prefiks-match**: gitt forwarding-tabell, finn korrekt utport per destinasjons-IP
- [ ] **NAT-tabell**: fyll inn kilde/dest IP og port i de 4 punktene rundt NAT-ruteren
- [ ] **Multiple access-klassifisering**:
  - Channel partitioning: TDM, FDM, CDMA, FDMA
  - Random access: Slotted ALOHA, Pure ALOHA, CSMA/CD (Ethernet), CSMA/CA (WiFi)
  - Taking turns: Bluetooth (polling), FDDI/Token Ring
- [ ] **Cæsar-chiffer med k=7**: «Protect your information» → shift hver bokstav 7 plasser frem (a→h, b→i, …); for dekoding shift 7 plasser tilbake. *Var 15 poeng på eks3 — hvis denne kommer på din eksamen er det stort utbytte for liten innsats*
- [ ] **Symmetrisk vs offentlig nøkkel**: én delt hemmelig nøkkel vs **nøkkelpar** (offentlig + privat); offentlig krypterer, privat dekrypterer
- [ ] **Brannmur**: hovedformål er **å blokkere uautorisert tilgang** (ikke å kryptere data)

**Spesifikk/niche (pugg som flashcards hvis tid, ellers hopp):**

- [ ] **Internet checksum**: legg sammen 16-bits ord, wrap carry tilbake, ta ones' complement. **TCP og UDP bruker samme algoritme.**
- [ ] **IPv4 vs IPv6 header**: **flow label** finnes kun i IPv6; IPv4 har checksum, header length, options som IPv6 ikke har
- [ ] **FIFO køforsinkelse**: gitt ankomst- og slot-starter, regne snitt køforsinkelse for valgte pakker
- [ ] **Klient-server filfordeling**: minste tid = `max(N·F/u_s, F/d_min)` (eks2 Q1.2.5: 10 Gbit, 100 peers, u_s=1Gbps, d_i=200Mbps → max(1000s, 50s) = **1000s**)
- [ ] **Pure ALOHA vs slotted ALOHA**: slotted dobler effektiviteten (~37% vs ~18%); slotted krever synkronisering, pure gjør det ikke
- [ ] **SNR vs BER vs modulasjon**: lavere SNR → høyere BER; for samme SNR gir høyere bitrate-modulasjon høyere BER

**Eks4-spesifikt (nytt på 4. eksamen, ikke sett ellers):**

- [ ] **TCP 3-veis håndtrykk**: SYN (seq=A) → SYN-ACK (seq=B, ack=A+1, server allokerer buffere) → ACK (ack=B+1, klient allokerer)
- [ ] **DNS-hovedoppgave + 2 komponenter**: directory service (hostnames → IP). To komponenter = (1) distribuert database i hierarki av DNS-tjenere, (2) applikasjons­lags-protokoll
- [ ] **DNS-hierarki**: Root (13) → TLD (com/no/uk…) → autoritative (per organisasjon, primary + secondary)
- [ ] **DNS-registrering**: registrar sjekker unikhet → du oppgir primary+secondary autoritative DNS → registrar legger NS+A i TLD → du legger A (web) og MX (mail) i autoritativ tjener
- [ ] **ServerSocket vs ConnectionSocket** (TCP): lytte-port for alle vs ny socket per spesifikk forbindelse
- [ ] **Linjesvitsjet nett**: oppsetts­tid + L/R (delay over én lenke, ikke per lenke fordi det er en dedikert ende-til-ende-krets)
- [ ] **TCP-segment har IKKE IP-adresser i payload**: payload kommer fra applikasjonslaget; IP legges til i nettverkslaget der TCP-segmentet selv er payload
- [ ] **Pakketap i nettet — 4 mekanismer**: bitfeil oppdaget i ruter, bufferoverflyt ved kø, lenke/node-feil, kollisjon i delt media
- [ ] **CRC**: legg til length(G)−1 nuller bak D, modulo-2-divisjon med G, rest = CRC. Send D + CRC. Mottaker deler hele med G, rest=0 ⇒ ok
- [ ] **Linklags-svitsj virkemåte**: switch-tabell, self-learning fra kilde-MAC, ukjent → broadcast, samme port → drop, plug-and-play, transparent (ingen IP/MAC selv), bare innen subnett
- [ ] **ARP**: oversetter IP ↔ MAC i lokalt subnett. ARP-tabell i hver host og ruter
- [ ] **Infrastructure vs ad hoc (802.11)**: med basestasjon (gir DNS/DHCP/ruting) vs uten — ad hoc krever at hostene gjør det selv
- [ ] **Hvorfor ikke CSMA/CD i WiFi**: (1) signal-asymmetri (mottatt << sendt) → kostbart å oppdage kollisjon, (2) skjult terminal + fading
- [ ] **WiFi eksplisitt ACK**: hver vellykket dataramme får eksplisitt ACK tilbake; manglende ACK ⇒ retransmisjon
- [ ] **CSMA/CD vs CSMA/CA**: CD = send straks ledig + avbryt ved kollisjon. CA = random back-off-teller før sending + IFS (gir prioritet til ACK/RTS/CTS). CA ≠ unngår kollisjoner fullt ut, men reduserer dem
- [ ] **Symmetrisk vs offentlig nøkkel — algoritme/nøkkel**: algoritme alltid kjent (i moderne crypto); sikkerhet ligger i nøkkelen. Offentlig kan brukes til konfidensialitet, integritet OG digital signatur
- [ ] **Digital signatur prinsipp**: Krypter med privat nøkkel, verifiser med offentlig. Krever betrodd tredjepart (sertifikat) som binder offentlig nøkkel til identitet. For store meldinger: signer hash istedet
- [ ] **Tre brannmur-kategorier**: (1) traditional packet filter (per pakke, ACL på adresse+port), (2) stateful packet filter (sporer forbindelse via connection table), (3) application gateway (per applikasjon, ser på applikasjonsdata)

---

## 3. Kjappe formler og «one-liners»

| Spørsmål | Svar |
|---|---|
| Overføringsforsinkelse | `L / R` |
| Store-and-forward over N hopp, samme R | `N · L / R` |
| Pipelining: P pakker, N rutere | `(N + P − 1) · L / R` |
| Brukbare verter i /x subnet | `2^(32−x) − 2` |
| Symmetriske nøkler N personer parvis | `N(N−1)/2` |
| Slotted ALOHA maks effektivitet | `1/e ≈ 0.37` |
| Pure ALOHA maks effektivitet | `1/(2e) ≈ 0.18` |
| Antall TCP-sockets på server med K åpne tilkoblinger | `K + 1` (1 lytte + K aktive) |
| HTTP-port / SMTP-port | 80 / 25 |

---

## 4. Sjekkliste de siste 15 minuttene før eksamen

1. Skriv «UDP gir best effort, TCP gir pålitelig + flyt + congestion» på arket
2. Skriv `(N+P−1)·L/R`, `2^(32−x)−2`, `N(N−1)/2` synlig
3. Tegn én CSMA-tidslinje med prop=0.2 raskt på kladdepapir
4. Pugge protokollkjeden for «send e-post fra kontor»: DHCP → ARP → DNS → SMTP → IMAP/HTTP
5. Subnetting: AND mellom IP og maske gir nettverksadresse; siste IP i blokken er broadcast
6. Cæsar k=7: a→h, b→i, c→j, …
7. NAT: utenfor ser bare ruter-IP + oversatt portnummer
8. Sockets: TCP `accept()` lager NY socket; UDP server har én socket for alle klienter

---

*Kilde: [eks1.md](eks1.md), [eks2.md](eks2.md), [eks3.md](eks3.md), [eks_4.md](eks_4.md). Se også [MÅ_KUNNE_OVERSIKT.md](MÅ_KUNNE_OVERSIKT.md) for utvidet versjon.*