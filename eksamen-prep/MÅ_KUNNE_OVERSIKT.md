# TTM4100 — temaer og oppgaver du bør mestre (fra gamle eksamener)

Dette dokumentet er utledet fra `eks1.md`, `eks2.md`, `eks3.md` og `eks_info.md`. **Merk:** `eks_info.md` sier at det **ikke** blir Wireshark-spørsmål på eksamen det året notatet gjelder — øv likevel på å lese sekvensnummer og klient/tjener fra spor hvis pensum krever det, men prioriter annet hvis tiden er knapp.

---

## 1. Gjentakende temaer (går igjen på flere eksamener)

| Tema | Hva som testes |
|------|----------------|
| **Internett / arkitektur** | «Nuts-and-bolts» vs tjenesteplattform; Internett som nettverk av nettverk; kapsling (encapsulation); ruting vs videresending (forwarding); lagdeling og protokoller |
| **Forsinkelse og ytelse** | Overføringsforsinkelse \(L/R\), utbredelsesforsinkelse, ende-til-ende-forsinkelse; flaskehals og maks gjennomstrømning; lenkeutnyttelse; «fair share» over delt lenke |
| **Pakke- vs kretskobling** | Garantier, variasjon i forsinkelse, ressursbruk |
| **Applikasjonslag** | HTTP (GET, persistent, caching, port 80); sammenligning HTTP vs SMTP; DNS (UDP/TCP, RR-format, hva klienten får); e-postkjede (SMTP, IMAP/POP3, Outlook → webmail-scenario) |
| **Transport (UDP/TCP)** | Hvilke tjenester UDP gir (best effort, ingen flyt-/overbelastningskontroll); hva TCP gir (pålitelighet, flyt, overbelastning); forskjell **flytkontroll** vs **overbelastningskontroll** |
| **Socket-programmering (konsept)** | `SOCK_STREAM` vs `SOCK_DGRAM`; `accept()` og ny socket per klient (TCP); UDP: samme socket, må angi destinasjon per send; antall sockets i scenarioer (f.eks. flere TCP-tilkoblinger til samme serverport) |
| **TCP-detaljer** | TCP congestion window / slow start (tolke figur); flytkontroll: begrensning når mottaker leser saktere enn avsender fyller buffer |
| **Sjekksum** | Internett-sjekksum over 16-bits ord (addisjon med carry-wrap) |
| **Nettverkslag** | Hvor nettverkslaget implementeres (verter, rutere — ikke typisk Ethernet-switch som nettverkslag); subnet-definisjon (felles prefiks); **lengste prefiks-match** i videresendingstabell; CIDR/subnettadresse, gyldige/ugyldige grensesnittadresser; kringkastingsadresse for prefiks; dele adresseblokk i undernett og regne ut **brukbare verter**; IPv4 vs IPv6 headerfelt (f.eks. flow label); **best effort** — hva som *ikke* garanteres |
| **NAT** | Lese NAT-tabell: kilde/dest IP og port på «WAN»-siden vs «LAN»-siden |
| **ICMP** | Feil/diagnostikk, i IP-datagram, TTL og traceroute, *ikke* transportprotokoll |
| **DHCP** | Dynamisk IP, ofte også DNS/router; transport (**UDP**, ikke TCP); steg ved oppstart |
| **Ruterinternt** | Hvor destinasjons-IP slås opp (inngangsport); hva skjer ved full ut-buffer (tap / policy) |
| **Lenkelag / MAC** | Tjenester på lenkelaget vs nettverkslag; svitsj (lag 2) vs ruter (lag 3); ARP i kontekst av «første hopp» |
| **Feildeteksjon** | 2D-paritet: enkeltbitfeil, deteksjon vs korreksjon; partitsskjema (even parity) |
| **Multiple access** | Klassifisering: kanalpartisjonering (TDM, FDM, CDMA), tilfeldig tilgang (ALOHA, CSMA, Ethernet CSMA/CD, CSMA/CA), «taking turns» (token ring/FDDI-lignende); **ren CSMA** vs **CSMA/CD** med tidslinje og forplantningsforsinkelse; ren ALOHA vs slotted ALOHA (effektivitet, synkronisering) |
| **Trådløst** | Skjult terminal; **RTS/CTS** (formål, hvem som holder kanalen); CSMA/CA; SNR vs BER vs modulasjon |
| **802.11-topologi** | Overlappende dekning: maksimal hastighet mellom noder via relé, **kombinert** gjennomstrømning for to flyt (A→B og D→C, A→B og C→D), og variant med **ACK** som bruker ekstra tidsluker |
| **Sikkerhet** | Konfidensialitet, integritet, tilgjengelighet/operasjon; symmetriske nøkler: **N(N−1)/2** for N par; Trudy: avlytting, endring, innsetting, sletting |
| **Integritet** | Hash vs sjekksum; hva «message integrity» betyr |
| **Multimedia** | Hvorfor HTTP-streaming ofte foretrekkes fremfor UDP (brannmur, pålitelighet); CDN / geografisk distribusjon |
| **Kryptografi (åpent)** | **Cæsar-chiffer**: beskrive, kode og dekode med gitt k; **symmetrisk vs offentlig nøkkel** |
| **Brannmur** | Primært: blokkere uautorisert tilgang (ikke «krypter alt» som hoveddefinisjon) |

---

## 2. Konkrete oppgaver du bør kunne løse «i søvne»

### Kapittel 1 — introduksjon og ytelse

- [ ] Forklare forskjellen mellom **ruting** (global banevalg) og **videresending** (lokal flytting av pakke til utport).
- [ ] Regne **overføringsforsinkelse** = pakkestørrelse / bitrate for én lenke.
- [ ] Regne **ende-til-ende-forsinkelse** langs flere hopp: summere overføring + utbredelse per hopp (når oppgaven sier at kø/prosessering er 0).
- [ ] Finne **flaskehals** og **maks gjennomstrømning** per TCP-økt når minste kapasitet deles «rettferdig» mellom økter.
- [ ] **Store-and-forward** med én bryter: total forsinkelse \(L/R_1 + L/R_2\) når kun overføring teller.
- [ ] **Cut-through** (start sending etter første X byte): regne ut endelig forsinkelse for gitt pakke og hastigheter.
- [ ] **P pakker, N rutere, samme R**: minimum ende-til-ende ved back-to-back: **(N + P − 1) · L/R** (forstå pipelining-intuisjonen).
- [ ] **Lenkeutnyttelse**: gitt R, Rs, Rc og antall økter — utnyttelse på en bestemt lenke (desimal svar).

### Kapittel 2–3 — applikasjon og transport

- [ ] Velge korrekt for **UDP** vs **TCP** tjenester (best effort, pålitelighet, flyt, overbelastning).
- [ ] Forklare **HTTP GET** og fordeler med **web cache** (forsinkelse, båndbredde inn til institusjon).
- [ ] Skille **HTTP** og **SMTP** (push/pull, porter, CRLF, persistent forbindelse der relevant).
- [ ] Minimum antall **UDP-sockets** for flere avsendere til én mottaker med fast port (ofte **én** mottakersocket).
- [ ] **Klient–server filfordeling**: minste tid = max\(\lceil N \rceil \cdot F / u_s, F / d_{\min}\)\)-variant — regne ut med gitt F, N, \(u_s\), \(d_i\).
- [ ] Tolke **TCP cwnd-graf**: identifisere intervaller med **slow start** vs AIMD / fast recovery.
- [ ] Beskrive **TCP flytkontroll** når applikasjon sender raskere enn mottaker tømmer mottaksbuffer (mottakers annonserede vindu begrenser sendehastighet).
- [ ] **Internet checksum**: to 16-bits ord → sum med carry → ones’ complement → 16-bits resultat (match mot flervalg).

### Kapittel 4–5 — nettverkslag

- [ ] Gitt IP + prefiks (/28, /29, /30, …): finne **nettverksadresse (subnet address)** med binær «AND» mot maske — og begrunne.
- [ ] Gitt større blokk (f.eks. /22) og krav om **M undernett**: regne **vertsbits**, antall nett, og **brukbare vertsadresser per subnet** (husk minus nett og broadcast der oppgaven krever «usable»).
- [ ] **Lengste prefiks-match**: for hver destinasjons-IP, velg lengste matchende prefiks i tabellen → ut-interface.
- [ ] I et diagram med /29-nett: peke ut adresser som **ikke** kan tilhøre det undernettet (feil prefiks, broadcast, nettverksadresse, utenfor range).
- [ ] **NAT**: fra tabell + indre vert: fyll inn kilde/dest IP og port på utsiden av NAT (punkt D).
- [ ] **ICMP**: sann/usann — bæres i IP, brukes til feil/diagnostikk, traceroute/TTL; ikke «transport på port 86».
- [ ] **DHCP**: sann/usann — **UDP**, ikke primært ruting av datapakker.
- [ ] **IPv4 vs IPv6 header**: f.eks. **flow label** kun i IPv6; checksum/header length/options der relevant.
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
- [ ] **Fire noder A–D med gitt dekning**: regne maks rat(er) C→A; A→B + D→C; A→B + C→D; og samme med **ACK**-slot per datapakke.
- [ ] **SNR, BER, modulasjon**: for gitt SNR — høyere bitrate-modulasjon gir typisk høyere BER.

### Kapittel 8 (og ev. 9) — sikkerhet og multimedia

- [ ] Liste **ønskede sikkerhetsegenskaper** (konfidensialitet, integritet, … — ikke «bare høy båndbredde»).
- [ ] **N personer, symmetrisk nøkkel parvis hemmelig**: antall nøkler = **N(N−1)/2**.
- [ ] **Trudy**: hvilke handlinger (lytte, lagre, endre, slette, sette inn).
- [ ] **Meldingintegritet** vs autentisering; hash vs checksum.
- [ ] **HTTP vs UDP streaming**: brannmur og pålitelighet som typiske grunner.
- [ ] **CDN / video**: mange kopier geografisk spredt vs én sentral server.
- [ ] **Cæsar med k=7** (eller annen k): kode og dekode kort setning — steg for steg i besvarelse.
- [ ] **Symmetrisk kryptografi vs offentlig nøkkel**: én delt hemmelighet vs nøkkelpar og bruk (kort og presist).
- [ ] **Brannmur**: hovedformål (blokkere uautorisert tilgang).

### «Stor» åpen oppgave som går igjen

- [ ] **Protokollkjede fra kontor til mottaker**: koble kabel → **DHCP** (IP, default gateway, DNS) → **DNS** oppslag → e-post: **SMTP** (ev. mellomservere) → mottaker leser via **HTTP(S)** eller **IMAP** avhengig av «webmail»-formulering — nevn lag og hovedprotokoller per steg.

### Del I-«koble»-typer (eks3-stil)

- [ ] Koble **aksessnett** (Ethernet, fiber, kabel, 4G) til typiske **hastighetsordner**.
- [ ] Koble **rammehoder** (H1, H2, H3) til **lag** (fysisk, lenke, nett, transport, applikasjon) — kapsling.
- [ ] Koble **multiple access-protokoller** til klasse: kanalpartisjonering / tilfeldig tilgang / taking turns.
- [ ] Koble **klient TCP-handlinger** til riktige kall (`socket`, `connect`, `send` uten eksplisitt destinasjon etter `connect`, osv.).

---

## 3. Kort sjekkliste før eksamen (15 min)

1. Formler: \(d_{\text{trans}} = L/R\), flaskehals-gjennomstrømning, \((N+P-1)L/R\), CIDR AND, brukbareverter = \(2^{32-x}-2\) for /x med unntak der oppgaven sier noe annet.  
2. UDP vs TCP — ett minutts puggepunkt.  
3. Ruting vs forwarding — én setning hver.  
4. Én **CSMA**-tidslinje raskt på tavle/papir (forplantning + kollisjon).  
5. NAT: «utenfor ser de router-IP + oversatt port».  
6. Symmetriske nøkler: \(N(N-1)/2\).  
7. Skriv **protokollstigen** for «send e-post til utenforstående» fra hukommelse.

---

*Kilde: `eksamen-prep/eks1.md`, `eks2.md`, `eks3.md`, `eks_info.md`. Juster etter gjeldende eksamensbeskjed fra emnet hvis struktur eller pensum endres.*
