# TTM4100 — temaer og oppgaver du bør mestre (fra gamle eksamener)

Dette dokumentet er utledet fra `eks1.md`, `eks2.md`, `eks3.md`, `eks_4.md`, `eks_5.md` og `eks_info.md`. **Merk:** `eks_info.md` sier at det **ikke** blir Wireshark-spørsmål på eksamen det året notatet gjelder — øv likevel på å lese sekvensnummer og klient/tjener fra spor hvis pensum krever det, men prioriter annet hvis tiden er knapp.

---

## 1. Gjentakende temaer (går igjen på flere eksamener)

| Tema | Hva som testes |
|------|----------------|
| **Internett / arkitektur** | «Nuts-and-bolts» vs tjenesteplattform; Internett som nettverk av nettverk; kapsling (encapsulation); ruting vs videresending (forwarding); lagdeling og protokoller |
| **Protokoll-lagdeling — hvorfor** | Re-bruk og oppdatering av komponenter, struktur, separasjon — *ikke* «gjør nettet raskere» eller «kapsling er mest effektivt» |
| **Forsinkelse og ytelse** | Overføringsforsinkelse \(L/R\), utbredelsesforsinkelse, ende-til-ende-forsinkelse; flaskehals og maks gjennomstrømning; lenkeutnyttelse; «fair share» over delt lenke |
| **Pakke- vs kretskobling** | Garantier, variasjon i forsinkelse, ressursbruk; oppsettstid for krets + L/R for hele filen |
| **HTTP-ytelse (response time)** | Non-persistent (TCP-RTT per objekt), parallelle TCP-forbindelser, persistent uten pipelining — regne minimum responstid for «base + N embedded» |
| **Applikasjonslag** | HTTP (GET, persistent, caching, port 80); sammenligning HTTP vs SMTP; DNS (UDP/TCP, RR-format, hva klienten får); e-postkjede (SMTP, IMAP/POP3, Outlook → webmail-scenario); DNS-hierarki (Root/TLD/autoritativ) og registrar-prosess |
| **P2P-fildistribusjon** | Minimum tid for client-server **og** P2P; hvorfor P2P er raskere ved mange klienter (samlet opplastingskapasitet vokser med N) |
| **Transport (UDP/TCP)** | Hvilke tjenester UDP gir (best effort, ingen flyt-/overbelastningskontroll); hva TCP gir (pålitelighet, flyt, overbelastning); forskjell **flytkontroll** vs **overbelastningskontroll**; 3-veis håndtrykk; sekvens-/ACK-numre i ryggen-til-ryggen segmenter |
| **Flyt vs overbelastning — også andre lag** | Lenkelaget har lignende konsepter (Stop-and-wait, Go-back-N, sliding window) — kjenne til at hopp-for-hopp flytkontroll *finnes* også der |
| **Socket-programmering (konsept)** | `SOCK_STREAM` vs `SOCK_DGRAM`; `accept()` og ny socket per klient (TCP); UDP: samme socket, må angi destinasjon per send; antall sockets i scenarioer (f.eks. flere TCP-tilkoblinger til samme serverport); ServerSocket vs ConnectionSocket |
| **TCP-detaljer** | TCP congestion window / slow start (tolke figur); flytkontroll: begrensning når mottaker leser saktere enn avsender fyller buffer; Go-back-N: avsender kan sende flere pakker uten å vente på ACK |
| **Sjekksum** | Internett-sjekksum over 16-bits ord (addisjon med carry-wrap); TCP og UDP bruker *samme* algoritme |
| **CRC** | Modulo-2-divisjon, legg til G−1 nuller bak D, rest = CRC; mottaker sjekker rest = 0 |
| **Nettverkslag** | Hvor nettverkslaget implementeres (verter, rutere — ikke typisk Ethernet-switch som nettverkslag); subnet-definisjon (felles prefiks); **lengste prefiks-match** i videresendingstabell; CIDR/subnettadresse, gyldige/ugyldige grensesnittadresser; kringkastingsadresse for prefiks; dele adresseblokk i undernett og regne ut **brukbare verter**; IPv4 vs IPv6 headerfelt (f.eks. flow label, ingen header checksum i IPv6); **best effort** — hva som *ikke* garanteres |
| **IP-adresse til binær** | Konvertere desimal punktnotasjon (a.b.c.d) til 32-bits binær — hver oktett uavhengig |
| **NAT** | Lese NAT-tabell: kilde/dest IP og port på «WAN»-siden vs «LAN»-siden |
| **ICMP** | Feil/diagnostikk, i IP-datagram, TTL og traceroute, *ikke* transportprotokoll |
| **DHCP** | Dynamisk IP, ofte også DNS/router; transport (**UDP**, ikke TCP); steg ved oppstart; *kan* faktisk gi samme IP hver gang ved «sticky» lease |
| **Ruterinternt** | Hvor destinasjons-IP slås opp (inngangsport); hva skjer ved full ut-buffer (tap / policy); FIFO-køforsinkelse fra ankomst til oppstart av sending |
| **Lenkelag / MAC** | Tjenester på lenkelaget vs nettverkslag; svitsj (lag 2) vs ruter (lag 3); ARP i kontekst av «første hopp»; linklags-svitsj selvlærende, plug-and-play, transparent (ingen IP/MAC) |
| **Feildeteksjon** | 2D-paritet: enkeltbitfeil, deteksjon vs korreksjon; partitsskjema (even parity) |
| **Multiple access** | Klassifisering: kanalpartisjonering (TDM, FDM, CDMA), tilfeldig tilgang (ALOHA, CSMA, Ethernet CSMA/CD, CSMA/CA), «taking turns» (token ring/FDDI-lignende); **ren CSMA** vs **CSMA/CD** med tidslinje og forplantningsforsinkelse; ren ALOHA vs slotted ALOHA (effektivitet, synkronisering) |
| **Trådløst** | Skjult terminal; **RTS/CTS** (formål, hvem som holder kanalen); CSMA/CA; SNR vs BER vs modulasjon; **adaptiv modulasjon og koding** brukes i WiFi, 4G og 5G |
| **802.11 MAC-elementer** | CSMA/CA, eksplisitt **ACK**, RTS/CTS (valgfritt), **DIFS** (Distributed Inter-Frame Space) — *ikke* CSMA/CD |
| **802.11-topologi** | Overlappende dekning: maksimal hastighet mellom noder via relé, **kombinert** gjennomstrømning for to flyt (A→B og D→C, A→B og C→D), og variant med **ACK** som bruker ekstra tidsluker |
| **Mobilnett (4G/5G)** | 5G gir høyere peak-bitrate enn 4G; *ikke* fysisk lag-kompatibel med 4G; begge støtter mobilitet; begge har **kontroll- og brukerplan-separasjon** i kjernenettet |
| **Sikkerhet** | Konfidensialitet, integritet, tilgjengelighet/operasjon, **autentisering** av endepunkter; symmetriske nøkler: **N(N−1)/2** for N par; Trudy: avlytting, endring, innsetting, sletting |
| **Integritet** | Hash vs sjekksum; hva «message integrity» betyr; *ikke* avhengig av TCP — kan brukes over UDP |
| **Multimedia** | Hvorfor HTTP-streaming ofte foretrekkes fremfor UDP (brannmur, pålitelighet); CDN / geografisk distribusjon; **playout-buffer**: blokk i fra t₀ + iΔ, klient starter avspilling ved t₁ + Δ — hvilke blokker rekker frem i tide |
| **Kryptografi (åpent)** | **Cæsar-chiffer**: beskrive, kode og dekode med gitt k; **symmetrisk vs offentlig nøkkel**; algoritmen er offentlig kjent, sikkerheten ligger i nøkkelen |
| **Digital signatur** | Krypter med privat nøkkel, verifiser med offentlig + sertifikat fra betrodd tredjepart |
| **Brannmur** | Tre mål: kun autorisert trafikk slipper inn/ut, lokal sikkerhetspolicy, motstå selv-kompromittering. Tre kategorier: **traditional (stateless) packet filter** (per pakke isolert), **stateful packet filter** (sporer forbindelse), **application gateway** (per-app, sjekker innhold) |

---

## 2. Konkrete oppgaver du bør kunne løse «i søvne»

### Kapittel 1 — introduksjon og ytelse

- [ ] Forklare forskjellen mellom **ruting** (global banevalg) og **videresending** (lokal flytting av pakke til utport). **Tre nøkkelforskjeller:** (i) tidsskala — forwarding er per pakke i nanosekunder, routing kjører i bakgrunnen i sekunder/minutter; (ii) lokasjon — forwarding skjer i datapath, routing i kontrollplan; (iii) avhengighet — forwarding bruker tabellen routing fyller.
- [ ] Forklare **hvorfor protokoll-lagdeling** brukes: gjør det enkelt å re-bruke og oppdatere komponenter, holder strukturen modulær. *Ikke* «gjør nettet raskere» eller «encapsulation er mest effektiv».
- [ ] Regne **overføringsforsinkelse** = pakkestørrelse / bitrate for én lenke.
- [ ] Regne **ende-til-ende-forsinkelse** langs flere hopp: summere overføring + utbredelse per hopp (når oppgaven sier at kø/prosessering er 0).
- [ ] **Linjesvitsj-tid:** oppsettstid + L/R for hele filen (raten er den samme over hele kretsen, *ikke* L/R per lenke).
- [ ] Finne **flaskehals** og **maks gjennomstrømning** per TCP-økt når minste kapasitet deles «rettferdig» mellom økter; *server-til-klient maks gjennomstrømning = min(R₁, R₂)*.
- [ ] **Store-and-forward** med én bryter: total forsinkelse \(L/R_1 + L/R_2\) når kun overføring teller.
- [ ] **Cut-through** (start sending etter første X byte): regne ut endelig forsinkelse for gitt pakke og hastigheter.
- [ ] **P pakker, N rutere, samme R**: minimum ende-til-ende ved back-to-back: **(N + P − 1) · L/R** (forstå pipelining-intuisjonen).
- [ ] **Lenkeutnyttelse**: gitt R, Rs, Rc og antall økter — utnyttelse på en bestemt lenke (desimal svar).
- [ ] **HTTP responstid:** sett opp på papir for non-persistent, persistent og parallelle TCP-forbindelser. Per objekt under non-persistent: 2·RTT + overføring; med persistent uten pipelining: 1·RTT for første + 1·RTT per ekstra GET.

### Kapittel 2–3 — applikasjon og transport

- [ ] Velge korrekt for **UDP** vs **TCP** tjenester (best effort, pålitelighet, flyt, overbelastning).
- [ ] Kjenne til at **applikasjonslagsprotokoller** inkluderer DNS, SMTP, FTP, HTTP, IMAP, POP3 — *ikke* ICMP eller ARP (de er nettverk/lenke).
- [ ] Forklare **HTTP GET** og fordeler med **web cache** (forsinkelse, båndbredde inn til institusjon).
- [ ] Skille **HTTP** og **SMTP** (push/pull, porter, CRLF, persistent forbindelse der relevant).
- [ ] **Non-persistent HTTP, ingen parallelle:** for base + 5 embedded objekter: **6·(2·RTT + L/R)** + 1·RTT for TCP-oppsett til base. Pluss propageringen for å få første bit hos klient.
- [ ] **Non-persistent HTTP, parallelle:** alle embedded hentes parallelt → bare 2·(2·RTT + L/R) totalt (én for base, én for parallell-batchen).
- [ ] **Persistent HTTP uten pipelining:** 1 TCP-oppsett, så 1·RTT + L/R per objekt sekvensielt — sparer (N−1) TCP-håndtrykk.
- [ ] Minimum antall **UDP-sockets** for flere avsendere til én mottaker med fast port (ofte **én** mottakersocket).
- [ ] **Klient–server filfordeling**: minste tid = max\(\lceil N \rceil \cdot F / u_s, F / d_{\min}\)\)-variant — regne ut med gitt F, N, \(u_s\), \(d_i\).
- [ ] **P2P-fildistribusjon:** minste tid = max(F/u_s, F/d_min, N·F / (u_s + Σu_i)). Med 100 peers, hver 10 Mbps opp/ned, server 100 Mbps, 125 MB-fil → bli flytende i regnestykket.
- [ ] **TCP back-to-back-segmenter:** sekvensnummer i andre segment = sekvensnr i første + lengde på første. Kilde/dest-port byttes *ikke* i samme retning.
- [ ] Tolke **TCP cwnd-graf**: identifisere intervaller med **slow start** vs AIMD / fast recovery.
- [ ] Beskrive **TCP flytkontroll** når applikasjon sender raskere enn mottaker tømmer mottaksbuffer (mottakers annonserede vindu begrenser sendehastighet).
- [ ] **Internet checksum**: to 16-bits ord → sum med carry → ones' complement → 16-bits resultat (match mot flervalg).
- [ ] **Tre forskjeller flyt vs overbelastning:** (i) hvem styres — mottaker vs nettverk; (ii) signal — rwnd-felt vs tap/timeout/ECN; (iii) hva som beskyttes — mottakerbuffer vs ruterkøer. **Andre lag med lignende konsept:** lenkelag (Stop-and-wait, sliding window, ATM-ABR-stil overbelastning).

### Kapittel 4–5 — nettverkslag

- [ ] **IP-adresse til binær:** konvertere hver oktett separat. Eksempel: 193.32.216.9 → 11000001.00100000.11011000.00001001.
- [ ] Gitt IP + prefiks (/28, /29, /30, …): finne **nettverksadresse (subnet address)** med binær «AND» mot maske — og begrunne.
- [ ] Gitt større blokk (f.eks. /22) og krav om **M undernett**: regne **vertsbits**, antall nett, og **brukbare vertsadresser per subnet** (husk minus nett og broadcast der oppgaven krever «usable»). For /23 som skal støtte 250 interfaces → svar er /23 selv (510 verter) eller /24 deler den i to.
- [ ] **Lengste prefiks-match**: for hver destinasjons-IP, velg lengste matchende prefiks i tabellen → ut-interface.
- [ ] I et diagram med /29-nett: peke ut adresser som **ikke** kan tilhøre det undernettet (feil prefiks, broadcast, nettverksadresse, utenfor range).
- [ ] **NAT**: fra tabell + indre vert: fyll inn kilde/dest IP og port på utsiden av NAT (punkt D).
- [ ] **ICMP**: sann/usann — bæres i IP, brukes til feil/diagnose, traceroute/TTL; ikke «transport på port 86».
- [ ] **DHCP**: sann/usann — **UDP**, ikke primært ruting av datapakker; lenkelags-broadcast brukes ved oppstart; en gitt host *kan* faktisk få samme IP hver gang (sticky lease).
- [ ] **IPv4 vs IPv6 header**: f.eks. **flow label** kun i IPv6; IPv4 har header checksum, IPv6 *ikke*; IPv6 tillater *ikke* fragmentering ved mellomliggende rutere; begge er forbindelsesløse.
- [ ] **Best effort**: ingen garanti for levering, rekkefølge, forsinkelse eller minimum båndbredde.
- [ ] **FIFO-kø**: gitt ankomst- og starttider for overføring — regne **gjennomsnittlig køforsinkelse** for utvalgte pakker.
- [ ] **Videresendingstabell og kilde**: forklare om man kan skille ruting basert på **kilde** (ofte: destinasjonsbasert forwarding — begrensninger).

### Kapittel 6–7 — lenke og trådløst

- [ ] Liste tjenester lenkelaget *kan* ha vs hva som hører til **nettverkslag** (IP-lookup, ende-til-ende-rute).
- [ ] **Svitsj vs ruter**: hvilket lag, MAC vs IP.
- [ ] **CSMA (uten CD)**: med gitt tidslinje for seks sendinger og **forplantningstid 0.2**: avgjør hvilke pakker som **lykkes** før t=5 (kan gjentas nesten identisk mellom eksamener).
- [ ] **CSMA/CD**: samme type tidslinjeoppgave med kollisjonsdeteksjon og umiddelbar stopp.
- [ ] **Pure ALOHA vs slotted ALOHA**: effektivitet og når sending må starte.
- [ ] **2D-paritet**: påstander om 1- og 2-bits feil (detektere/korrigere enkeltbit).
- [ ] **RTS/CTS**: redusere kollisjon for skjult terminal; hva CTS gjør for naboer.
- [ ] **802.11 MAC-elementer:** CSMA/CA *(brukes)*, CSMA/CD *(ikke brukt)*, ACK *(brukes)*, RTS/CTS *(valgfritt, brukes)*, DIFS *(brukes som inter-frame space)*.
- [ ] **Fire noder A–D med gitt dekning**: regne maks rat(er) C→A; A→B + D→C; A→B + C→D; og samme med **ACK**-slot per datapakke.
- [ ] **SNR, BER, modulasjon**: for gitt SNR — høyere bitrate-modulasjon gir typisk høyere BER. **Adaptiv modulasjon og koding** brukes i WiFi, 4G *og* 5G.
- [ ] **4G vs 5G:** 5G gir høyere peak bitrate; fysisk lag *ikke* kompatibel med 4G; *begge* støtter mobilitet; *begge* har kontroll-/brukerplan-separasjon i kjernenettet.

### Kapittel 8 (og ev. 9) — sikkerhet og multimedia

- [ ] Liste **ønskede sikkerhetsegenskaper** (konfidensialitet, integritet, autentisering, operasjonell sikkerhet — ikke «bare høy båndbredde», og ikke «public key cryptography» som er et *middel*).
- [ ] **N personer, symmetrisk nøkkel parvis hemmelig**: antall nøkler = **N(N−1)/2**.
- [ ] **Trudy**: hvilke handlinger (lytte, lagre, endre, slette, sette inn).
- [ ] **Meldingintegritet** vs autentisering; hash vs checksum; *trenger ikke* TCP — kan brukes over UDP.
- [ ] **HTTP vs UDP streaming**: brannmur og pålitelighet som typiske grunner.
- [ ] **Playout-buffer (video-streaming):** server sender blokk i ved t₀ + iΔ. Klient starter avspilling ved t₁ + Δ. En blokk «rekker frem» hvis ankomsttid ved klient ≤ planlagt avspillingstid. Tegn linjer på papir, marker hvilke blokker som må droppes.
- [ ] **CDN / video**: mange kopier geografisk spredt vs én sentral server.
- [ ] **Cæsar med k=7** (eller annen k): kode og dekode kort setning — steg for steg i besvarelse.
- [ ] **Symmetrisk kryptografi vs offentlig nøkkel**: én delt hemmelighet vs nøkkelpar og bruk (kort og presist).
- [ ] **Digital signatur:** krypter med privat nøkkel, hvem som helst verifiserer med offentlig — krever betrodd tredjepart for sertifikat.
- [ ] **Brannmur — tre mål:** (1) all trafikk inn/ut må gjennom; (2) bare autorisert trafikk slipper gjennom (lokal sikkerhetspolicy); (3) brannmuren selv må være motstandsdyktig mot kompromittering. **Stateless vs stateful:** stateless ser per pakke isolert (ACL på IP/port/flagg); stateful holder også en forbindelses­tabell og slipper bare gjennom pakker som hører til en etablert eller forventet flyt.

### «Stor» åpen oppgave som går igjen

- [ ] **Protokollkjede fra kontor til mottaker**: koble kabel → **DHCP** (IP, default gateway, DNS) → **DNS** oppslag → e-post: **SMTP** (ev. mellomservere) → mottaker leser via **HTTP(S)** eller **IMAP** avhengig av «webmail»-formulering — nevn lag og hovedprotokoller per steg.

### Del I-«koble»-typer (eks3-stil)

- [ ] Koble **aksessnett** (Ethernet, fiber, kabel, 4G) til typiske **hastighetsordner**.
- [ ] Koble **rammehoder** (H1, H2, H3) til **lag** (fysisk, lenke, nett, transport, applikasjon) — kapsling.
- [ ] Koble **multiple access-protokoller** til klasse: kanalpartisjonering / tilfeldig tilgang / taking turns.
- [ ] Koble **klient TCP-handlinger** til riktige kall (`socket`, `connect`, `send` uten eksplisitt destinasjon etter `connect`, osv.).

---

## 3. Kort sjekkliste før eksamen (15 min)

1. Formler: \(d_{\text{trans}} = L/R\), flaskehals-gjennomstrømning, \((N+P−1)L/R\), CIDR AND, brukbareverter = \(2^{32-x}-2\) for /x med unntak der oppgaven sier noe annet. P2P: max(F/u_s, F/d_min, N·F/(u_s+Σu_i)).
2. UDP vs TCP — ett minutts puggepunkt.  
3. Ruting vs forwarding — én setning hver + tre forskjeller.  
4. Én **CSMA**-tidslinje raskt på tavle/papir (forplantning + kollisjon).  
5. NAT: «utenfor ser de router-IP + oversatt port».  
6. Symmetriske nøkler: \(N(N-1)/2\).  
7. Skriv **protokollstigen** for «send e-post til utenforstående» fra hukommelse.
8. **HTTP responstid:** non-persistent uten parallell = mange RTT-er; med parallell = ~2 RTT for batch; persistent = 1 oppsett + 1 RTT/objekt.
9. **Playout-buffer:** ankomsttid for blokk i ≤ t₁ + (i)·Δ → blokken rekker frem.
10. **4G/5G:** høyere peak-bitrate i 5G, ikke fys-lag-kompatibel, begge har kontroll/brukerplan-separasjon.
11. **Brannmur:** 3 mål (all trafikk gjennom, bare autorisert, motstandsdyktig).

---

*Kilde: `eksamen-prep/eks1.md`, `eks2.md`, `eks3.md`, `eks_4.md`, `eks_5.md`, `eks_info.md`. Juster etter gjeldende eksamensbeskjed fra emnet hvis struktur eller pensum endres.*
