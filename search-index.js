var SEARCH_INDEX = [
  // ===== KAP 1 =====
  {
    title: "Hva er Internett?",
    chapter: "Kap 1",
    url: "kap1/#intro",
    keywords: "internett endesystemer hosts pakker ISP protokoller TCP IP socket tjenestebeskrivelse mutterne-og-boltene",
    body: "Internett er et nettverk av milliarder av endesystemer koblet sammen via kommunikasjonslinker og pakkesvitsjer. To måter å forstå det: mutterne-og-boltene (fysisk oppbygning) og tjenestebeskrivelsen (infrastruktur for distribuerte applikasjoner). Protokoller definerer format og rekkefølge av meldinger."
  },
  {
    title: "Nettverkets ytterkant",
    chapter: "Kap 1",
    url: "kap1/#edge",
    keywords: "aksessnett DSL kabel FTTH WiFi 4G 5G satelitt fiber koaksial fysiske medier guidede medier",
    body: "Nettverkets ytterkant er der endesystemene bor. Aksessnettet er linken mellom endesystemet og den første ruteren. Teknologier: DSL, kabel/HFC, FTTH, WiFi, 4G/5G, satellitt. Fysiske medier deles i guidede (kobber, koaksial, fiber) og ikke-guidede (radio)."
  },
  {
    title: "Nettverkskjernen",
    chapter: "Kap 1",
    url: "kap1/#core",
    keywords: "pakkesvitsjing linjesvitsjing store-and-forward FDM TDM statistisk multipleksing ISP IXP Tier 1",
    body: "Kjernen av Internett bruker pakkesvitsjing med store-and-forward. Linjesvitsjing reserverer dedikerte forbindelser med FDM eller TDM. Pakkesvitsjing vinner fordi statistisk multipleksing lar mange brukere dele kapasiteten. Internett er et nettverk av nettverk med aksess-ISP-er, regionale ISP-er og Tier 1-ISP-er."
  },
  {
    title: "Forsinkelse, tap og gjennomstrømning",
    chapter: "Kap 1",
    url: "kap1/#delay",
    keywords: "forsinkelse prosessering kø transmisjon propagering d_proc d_queue d_trans d_prop pakketap gjennomstrømning throughput flaskehals bottleneck trafikk-intensitet",
    body: "Fire forsinkelseskomponenter: prosessering, kø, transmisjon (L/R) og propagering (d/v). Trafikk-intensitet La/R nærmer seg 1 betyr eksploderende køforsinkelse. Gjennomstrømning begrenses av den trangeste linken (flaskehalsen). Total ende-til-ende-forsinkelse er N × (d_proc + d_queue + d_trans + d_prop)."
  },
  {
    title: "Protokollag og tjenestemodeller",
    chapter: "Kap 1",
    url: "kap1/#layers",
    keywords: "protokollag lag applikasjonslaget transportlaget nettverkslaget lenkelaget fysisk lag OSI enkapsulering header femlagsmodellen",
    body: "Internettets fem lag: applikasjon (HTTP, SMTP, DNS), transport (TCP, UDP), nettverk (IP), lenke (Ethernet, WiFi), fysisk. OSI-modellen har syv lag. Enkapsulering betyr at hvert lag pakker inn data fra laget over med sin egen header. Lagene er uavhengige som legoklosser."
  },
  {
    title: "Nettverk under angrep",
    chapter: "Kap 1",
    url: "kap1/#security",
    keywords: "malware virus ormer botnett DoS DDoS pakkesniffing IP-spoofing sikkerhet angrep",
    body: "Sikkerhetstrusler: malware (virus, ormer, botnett), tjenestenektangrep (DoS/DDoS med båndbreddeflom, tilkoblingsflom, SYN flooding), pakkesniffing på delte medier, og IP-spoofing med falske avsenderadresser."
  },
  {
    title: "Internettets historie",
    chapter: "Kap 1",
    url: "kap1/#history",
    keywords: "ARPANET Vinton Cerf Bob Kahn TCP/IP DNS World Wide Web Tim Berners-Lee Mosaic Netscape historie",
    body: "1960-tallet: pakkesvitsjing og ARPANET. 1970-tallet: TCP/IP av Cerf og Kahn. 1983: flag day, TCP/IP standard. 1989-91: Tim Berners-Lee oppfinner World Wide Web. 1990-tallet: kommersialisering og dot-com-boom. 2000-tallet: bredbånd, WiFi, smarttelefoner, IoT."
  },

  // ===== KAP 2 =====
  {
    title: "Prinsipper for nettverksapplikasjoner",
    chapter: "Kap 2",
    url: "kap2/http-og-web.html#prinsipper",
    keywords: "prosesser socket portnummer IP-adresse applikasjonsprotokoll RFC klient server endesystem",
    body: "Nettverksapper kjører bare på endesystemer. Prosesser kommuniserer via sockets. Identifikator = IP-adresse + portnummer. Applikasjonsprotokoller definerer meldingstyper, syntaks, semantikk og regler. Åpne protokoller (HTTP, SMTP) vs. proprietære."
  },
  {
    title: "Klient-server vs. peer-to-peer",
    chapter: "Kap 2",
    url: "kap2/http-og-web.html#paradigmer",
    keywords: "klient-server P2P peer-to-peer selv-skalering BitTorrent Skype hybrid",
    body: "Klient-server: tjener alltid på, fast IP, klienter kobler til. P2P: ingen sentral tjener, peers snakker direkte, selv-skalering. De fleste systemer er hybrider. P2P skalerer bedre fordi hver ny peer bringer egen opplastningskapasitet."
  },
  {
    title: "Transportlagets tjenester for apper",
    chapter: "Kap 2",
    url: "kap2/http-og-web.html#transport",
    keywords: "TCP UDP pålitelighet tidskrav gjennomstrømning sikkerhet TLS kryptering flytkontroll overbelastningskontroll",
    body: "Fire dimensjoner: datapålitelighet, tidskrav, gjennomstrømning, sikkerhet. TCP gir pålitelig overføring, flytkontroll og overbelastningskontroll. UDP gir ingenting av dette men er enklere og raskere. TLS legger kryptering oppå TCP."
  },
  {
    title: "Web og HTTP",
    chapter: "Kap 2",
    url: "kap2/http-og-web.html#http",
    keywords: "HTTP HyperText Transfer Protocol web tilstandsløs persistent ikke-persistent forbindelse RTT responstid port 80",
    body: "HTTP er webens applikasjonsprotokoll, klient-server, tilstandsløs, over TCP port 80. Ikke-persistent: én forbindelse per objekt (2·RTT + overføringstid). Persistent (HTTP/1.1): gjenbruk av forbindelse for mange objekter. Pipelining lar klienten sende flere forespørsler uten å vente."
  },
  {
    title: "HTTP-meldinger og metoder",
    chapter: "Kap 2",
    url: "kap2/http-og-web.html#meldinger",
    keywords: "GET POST HEAD PUT request response statuskode 200 OK 301 404 ASCII header body forespørsel svar",
    body: "HTTP-meldinger er ASCII-tekst. Forespørsel: request line (METODE URL VERSJON), hodelinjer, tom linje, valgfri body. Svar: statuskode (200 OK, 301, 404, 505). Metoder: GET (hent), POST (send data), HEAD (bare hode), PUT (last opp)."
  },
  {
    title: "Cookies",
    chapter: "Kap 2",
    url: "kap2/http-og-web.html#cookies",
    keywords: "cookies Set-Cookie tilstand sesjon handlekurv sporing tredjeparts persistente cookie GDPR samtykke",
    body: "Cookies gir tilstand i tilstandsløs HTTP. Serveren setter en unik ID via Set-Cookie, nettleseren sender den tilbake. Fire deler: Set-Cookie-hode, Cookie-hode, cookie-fil, serverdatabase. Brukes til autorisasjon, handlekurver, anbefalinger. Tredjeparts cookies muliggjør sporing."
  },
  {
    title: "Web-cache og betinget GET",
    chapter: "Kap 2",
    url: "kap2/http-og-web.html#cache",
    keywords: "web-cache proxy betinget GET If-Modified-Since 304 Not Modified caching responstid båndbredde",
    body: "En web-cache lagrer kopier av tidligere svar. Fordeler: kortere responstid og mindre trafikk. Betinget GET med If-Modified-Since sjekker om innholdet er endret. 304 Not Modified betyr at cachen kan bruke sin versjon."
  },
  {
    title: "HTTP/2 og HOL-blokkering",
    chapter: "Kap 2",
    url: "kap2/http-og-web.html#http2",
    keywords: "HTTP/2 HTTP/3 head-of-line HOL blokkering frames framing FCFS multipleksing prioritering QUIC",
    body: "HTTP/1.1 har head-of-line-blokkering: store objekter blokkerer små. HTTP/2 løser dette ved å dele objekter i frames og flette dem. HTTP/3 bruker QUIC over UDP for uavhengig feilhåndtering per objekt."
  },
  {
    title: "P2P-fildistribusjon",
    chapter: "Kap 2",
    url: "kap2/p2p-video-cdn.html#p2p",
    keywords: "P2P fildistribusjon selv-skalering opplastningskapasitet distribusjonstid BitTorrent klient-server",
    body: "Klient-server: distribusjonstid vokser lineært med N (NF/u_s). P2P: selv-skalering fordi hver ny peer bringer egen opplastningskapasitet. D_P2P >= max{F/u_s, F/d_min, NF/(u_s + Σu_i)}. BitTorrent skalerer til millioner av nedlastere."
  },
  {
    title: "Videostrømming og DASH",
    chapter: "Kap 2",
    url: "kap2/p2p-video-cdn.html#video",
    keywords: "video strømming DASH streaming HTTP buffer playout CBR VBR komprimering chunks manifest adaptiv",
    body: "Video komprimeres med romlig og tidsmessig redundans (MPEG-4). CBR vs VBR. DASH: del video i chunks med ulike bithastigheter, klienten velger kvalitet basert på målt båndbredde. Avspillingsbuffer håndterer varierende nettverk."
  },
  {
    title: "CDN — Innholdsleveransenettverk",
    chapter: "Kap 2",
    url: "kap2/p2p-video-cdn.html#cdn",
    keywords: "CDN Content Distribution Network Netflix enter deep bring home CNAME DNS OTT Akamai innholdsleveranse",
    body: "CDN distribuerer innhold på mange servere geografisk. Enter deep: tjenere inne i aksessnett (Akamai). Bring home: større klynger nær aksessnett. DNS med CNAME dirigerer brukere til nærmeste node. OTT: innholdsleverandør bygger overbygning over Internett."
  },
  {
    title: "E-post og SMTP",
    chapter: "Kap 2",
    url: "kap2/epost-dns-sockets.html",
    keywords: "e-post SMTP mailserver user agent push pull IMAP MIME RFC 822 port 25 HELO DATA QUIT 7-bit ASCII",
    body: "E-postsystemet: user agent, mailservere og SMTP. SMTP er push-protokoll på port 25, ASCII-basert. Tre faser: HELO, DATA, QUIT. SMTP vs HTTP: push vs pull, 7-bit ASCII vs binært. Meldingsformat RFC 822 med headere og body. Moderne webmail bruker HTTPS til server, SMTP mellom servere."
  },
  {
    title: "DNS — Domain Name System",
    chapter: "Kap 2",
    url: "kap2/epost-dns-sockets.html",
    keywords: "DNS domenenavn IP-adresse hierarki root TLD autoritativ lokal navneserver iterativ rekursiv caching TTL A NS CNAME MX DNSSEC port 53 UDP",
    body: "DNS oversetter domenenavn til IP-adresser. Distribuert og hierarkisk: root-servere, TLD-servere (.com, .no), autoritative servere. Lokale navneservere cacher svar. Iterativ vs rekursiv oppslag. Resource records: A (IP), NS (navneserver), CNAME (alias), MX (mailserver). DNS bruker UDP port 53. Caching med TTL. Sikkerhet: DDoS, DNS-poisoning, DNSSEC."
  },
  {
    title: "Socket-programmering",
    chapter: "Kap 2",
    url: "kap2/epost-dns-sockets.html",
    keywords: "socket programmering UDP TCP SOCK_DGRAM SOCK_STREAM Python sendto recvfrom connect accept bind listen velkomstsokkel forbindelsessokkel",
    body: "Socket er døren mellom prosess og transportlag. UDP: SOCK_DGRAM, sendto med adresse, ingen forbindelse. TCP: SOCK_STREAM, connect/accept for forbindelse, send/recv uten adresse. TCP-server har velkomstsokkel og forbindelsessokler (én per klient)."
  },

  // ===== KAP 3 =====
  {
    title: "Transportlagets tjenester",
    chapter: "Kap 3",
    url: "kap3/transport-udp.html#services",
    keywords: "transportlaget nettverkslaget prosesser verter segmenter multipleksing demultipleksing best-effort",
    body: "Nettverkslaget gir logisk kommunikasjon mellom verter (IP-adresser). Transportlaget gir logisk kommunikasjon mellom prosesser (portnumre). TCP gir pålitelig ordnet levering, UDP gir upålitelig uordnet levering. Ingen av dem kan garantere forsinkelse eller båndbredde."
  },
  {
    title: "Multipleksing og demultipleksing",
    chapter: "Kap 3",
    url: "kap3/transport-udp.html#muxdemux",
    keywords: "multipleksing demultipleksing portnummer kilde-port destinasjons-port 4-tuppel UDP TCP socket",
    body: "Multipleksing: samle data fra sockets og legge på headere. Demultipleksing: levere til riktig socket. UDP: identifisert av destinasjons-IP og -port (2-tuppel). TCP: identifisert av kilde-IP, kilde-port, dest-IP, dest-port (4-tuppel). Derfor kan en webserver ha hundrevis av forbindelser på port 80."
  },
  {
    title: "UDP — forbindelsesløs transport",
    chapter: "Kap 3",
    url: "kap3/transport-udp.html#udp",
    keywords: "UDP User Datagram Protocol forbindelsesløs header 8 bytes source port dest port length checksum DNS SNMP HTTP/3",
    body: "UDP gjør nesten ingenting utover IP. Ingen håndtrykk, ingen tilstand, ingen garanti. Header: bare 8 bytes (source port, dest port, length, checksum). Brukes av DNS, SNMP, strømming, HTTP/3 (via QUIC). Fordeler: ingen RTT-overhead, kan håndtere mange klienter."
  },
  {
    title: "UDP-sjekksummen",
    chapter: "Kap 3",
    url: "kap3/transport-udp.html#checksum",
    keywords: "sjekksum checksum one's complement wraparound feildeteksjon bitfeil",
    body: "Sjekksummen beregnes med one's complement-addisjon av alle 16-bits ord, deretter inverteres. Oppdager de fleste enkle bitfeil, men to komplementære feil kan gå uoppdaget. Svak men bedre enn ingenting."
  },
  {
    title: "Pålitelig dataoverføring — problemet",
    chapter: "Kap 3",
    url: "kap3/palitelig-dataoverforing.html#intro",
    keywords: "pålitelig dataoverføring rdt upålitelig kanal rdt_send udt_send rdt_rcv deliver_data",
    body: "Applikasjoner vil ha pålitelig kanal, men nettverket kan flippe bits, miste pakker og endre rekkefølge. Fire grensesnitt: rdt_send, udt_send, rdt_rcv, deliver_data. Protokollen bygges steg for steg fra perfekt kanal til realistisk verden."
  },
  {
    title: "rdt 1.0 — perfekt kanal",
    chapter: "Kap 3",
    url: "kap3/palitelig-dataoverforing.html#rdt10",
    keywords: "rdt 1.0 perfekt kanal triviell make_pkt extract",
    body: "rdt 1.0: perfekt kanal uten feil eller tap. Sender lager pakke og sender, mottaker pakker ut og leverer. Ingen feilhåndtering nødvendig. Grunnlinje for resten."
  },
  {
    title: "rdt 2.0 — ACK og NAK",
    chapter: "Kap 3",
    url: "kap3/palitelig-dataoverforing.html#rdt20",
    keywords: "rdt 2.0 ACK NAK sjekksum retransmisjon stop-and-wait bitfeil feildeteksjon",
    body: "rdt 2.0: kanal med bitfeil. Sjekksumm oppdager feil, mottaker svarer ACK (ok) eller NAK (feil, send på nytt). Stop-and-wait. Fatalt problem: korrupt ACK/NAK gir ubestemt tilstand."
  },
  {
    title: "rdt 2.1 — sekvensnummer",
    chapter: "Kap 3",
    url: "kap3/palitelig-dataoverforing.html#rdt21",
    keywords: "rdt 2.1 sekvensnummer duplikat 0 1 alternating-bit",
    body: "rdt 2.1 løser korrupt-ACK-problemet med sekvensnummer (0 og 1). Mottaker sjekker seq#: riktig → lever data, duplikat → kast. Dobbelt så mange tilstander som rdt 2.0."
  },
  {
    title: "rdt 2.2 — NAK-fri",
    chapter: "Kap 3",
    url: "kap3/palitelig-dataoverforing.html#rdt22",
    keywords: "rdt 2.2 NAK-fri duplikat-ACK bare ACK TCP",
    body: "rdt 2.2 dropper NAK. Mottaker sender alltid ACK med sekvensnummer til sist korrekt mottatte pakke. Duplikat-ACK fungerer som NAK. TCP bruker dette prinsippet."
  },
  {
    title: "rdt 3.0 — tap og timeout",
    chapter: "Kap 3",
    url: "kap3/palitelig-dataoverforing.html#rdt30",
    keywords: "rdt 3.0 timeout timer pakketap retransmisjon alternating-bit protocol stop-and-wait",
    body: "rdt 3.0 håndterer pakketap med countdown timer. Hvis ACK ikke kommer i tide, retransmitter. Sekvensnummer håndterer duplikater fra for tidlig timeout. Alternating-bit protocol: korrekt men katastrofalt treg."
  },
  {
    title: "Stop-and-wait utnyttelse",
    chapter: "Kap 3",
    url: "kap3/palitelig-dataoverforing.html#utilization",
    keywords: "utnyttelse utilization stop-and-wait sender throughput L/R RTT",
    body: "Stop-and-wait gir forferdelig utnyttelse: U_sender = L/R ÷ (RTT + L/R). Eksempel: 1 Gbps link, 30ms RTT → 0.027% utnyttelse. Gigabit-link oppfører seg som 267 kbps."
  },
  {
    title: "Pipelining",
    chapter: "Kap 3",
    url: "kap3/palitelig-dataoverforing.html#pipelining",
    keywords: "pipelining vindu sekvensnummerrom buffer samlebånd utnyttelse",
    body: "Pipelining: send flere pakker uten å vente på ACK. Krever større sekvensnummerrom, buffere, og nye regler for tap. Tredobler utnyttelse med 3 pakker. To tilnærminger: Go-Back-N og Selective Repeat."
  },
  {
    title: "Go-Back-N",
    chapter: "Kap 3",
    url: "kap3/palitelig-dataoverforing.html#gbn",
    keywords: "Go-Back-N GBN kumulativ ACK vindu timer retransmisjon out-of-order kast",
    body: "GBN: sendevindu av størrelse N, kumulativ ACK, én timer for eldste. Ved timeout: retransmitter alle fra eldste ubekreftede. Mottaker godtar bare neste forventede, kaster out-of-order. Enkelt men sløsete ved tap."
  },
  {
    title: "Selective Repeat",
    chapter: "Kap 3",
    url: "kap3/palitelig-dataoverforing.html#sr",
    keywords: "Selective Repeat SR individuell ACK buffer timer per pakke retransmisjon vinduestørrelse sekvensnummerrom",
    body: "SR: individuell ACK per pakke, mottaker buffrer out-of-order, sender retransmitterer bare tapte pakker. Timer per uACK-et pakke. Vinduestørrelse: N ≤ 2^(k-1). Mer effektiv enn GBN men mer kompleks."
  },
  {
    title: "TCP — hva den lover",
    chapter: "Kap 3",
    url: "kap3/tcp.html#intro",
    keywords: "TCP pålitelig ordnet flytkontroll forbindelsesorientert bytestrøm meldingsgrenser",
    body: "TCP gir pålitelig, ordnet levering med flytkontroll og forbindelsesstyring. Bytestrøm uten meldingsgrenser. Skjuler IPs upålitelighet. Kombinerer alle mekanismer fra rdt-protokollene."
  },
  {
    title: "TCP-segmentstruktur",
    chapter: "Kap 3",
    url: "kap3/tcp.html#segment",
    keywords: "TCP segment header source port dest port sequence number ACK number flags SYN FIN receive window checksum MSS MTU options 20 bytes",
    body: "TCP-header: minst 20 bytes. Felt: source/dest port, sequence number (byte-posisjon), ACK number (neste forventede byte), flags (SYN, FIN, ACK), receive window (rwnd), checksum. MSS typisk 1460 bytes (MTU 1500 - 40 bytes header)."
  },
  {
    title: "TCP sekvensnummer og ACK",
    chapter: "Kap 3",
    url: "kap3/tcp.html#seq",
    keywords: "sekvensnummer bytestrøm kumulativ ACK byte-posisjon",
    body: "Sekvensnummer peker inn i bytestrømmen (byte-nummer, ikke segmentnummer). ACK-nummer = neste byte mottaker forventer. Kumulative ACKs: ACK=1000 bekrefter alt opp til byte 1000. Tapt ACK reddes av neste ACK."
  },
  {
    title: "RTT-estimering og timeout",
    chapter: "Kap 3",
    url: "kap3/tcp.html#rtt",
    keywords: "RTT timeout EWMA EstimatedRTT DevRTT SampleRTT TimeoutInterval alpha beta",
    body: "RTT varierer, så TCP bruker EWMA: EstimatedRTT = (1-α)×EstimatedRTT + α×SampleRTT (α=0.125). DevRTT estimerer variansen. TimeoutInterval = EstimatedRTT + 4×DevRTT. Stabil RTT → kort margin, variabel RTT → bred margin."
  },
  {
    title: "TCP senderlogikk",
    chapter: "Kap 3",
    url: "kap3/tcp.html#sender",
    keywords: "sender timer SendBase NextSeqNum retransmisjon én timer per forbindelse",
    body: "TCP bruker én timer per forbindelse for eldste ubekreftede segment. Tre hendelser: data fra app (send, start timer), timeout (resend eldste), ACK mottatt (flytt SendBase, restart timer). SendBase er venstre kant av vinduet."
  },
  {
    title: "TCP retransmisjonsscenarier",
    chapter: "Kap 3",
    url: "kap3/tcp.html#retransmit",
    keywords: "retransmisjon tapt ACK premature timeout duplikat kumulativ",
    body: "Tre scenarier: tapt ACK (timeout, resend), premature timeout (duplikat kastes av mottaker, kumulative ACK-er redder), tapt ACK reddet av senere kumulativ ACK uten retransmisjon."
  },
  {
    title: "Fast retransmit",
    chapter: "Kap 3",
    url: "kap3/tcp.html#fast",
    keywords: "fast retransmit tre duplikat-ACK duplikat ACK pakketap omorganisering",
    body: "Tre duplikat-ACKs utløser umiddelbar retransmisjon uten å vente på timeout. Tre er valgt fordi nettverket kan omorganisere pakker — én duplikat-ACK kan bare bety forsinkelse, ikke tap."
  },
  {
    title: "Flow control",
    chapter: "Kap 3",
    url: "kap3/tcp.html#flow",
    keywords: "flow control flytkontroll receive window rwnd mottakerbuffer overvelme window scale 16 bit",
    body: "Receive window (rwnd) i hver ACK forteller senderen hvor mye plass mottaker har. Senderen har aldri mer enn rwnd bytes in flight. Window Scale option utvider fra 16-bit (64KB) til ~1GB for raske lenker."
  },
  {
    title: "Tre-veis håndtrykk",
    chapter: "Kap 3",
    url: "kap3/tcp.html#handshake",
    keywords: "tre-veis håndtrykk 3-way handshake SYN SYN-ACK ACK forbindelsesetablering sekvensnummer halvåpne SYN flooding",
    body: "TCP bruker tre meldinger: SYN (klient velger x), SYN+ACK (server velger y, bekrefter x+1), ACK (klient bekrefter y+1). Tre trengs for å verifisere at begge parter er aktive og enige om sekvensnummer. Beskytter mot halvåpne forbindelser."
  },
  {
    title: "Lukke TCP-forbindelse",
    chapter: "Kap 3",
    url: "kap3/tcp.html#close",
    keywords: "FIN ACK TIME_WAIT lukke forbindelse full duplex fire meldinger",
    body: "Lukking med FIN/ACK i begge retninger (fire meldinger). TCP er full duplex så hver retning stenges separat. TIME_WAIT (~30s) etter siste ACK i tilfelle den gikk tapt."
  },
  {
    title: "Metningskontroll — hvorfor",
    chapter: "Kap 3",
    url: "kap3/congestion.html#intro",
    keywords: "metningskontroll congestion control cwnd rwnd congestion window bottleneck senderrate",
    body: "Flow control beskytter mottaker, metningskontroll beskytter nettverket. cwnd (congestion window) vedlikeholdt lokalt, rwnd i headeren. Senderen begrenses av min(cwnd, rwnd). Rate ≈ cwnd/RTT. Bottleneck-lenken metning gir pakketap og høyere RTT."
  },
  {
    title: "Slow start",
    chapter: "Kap 3",
    url: "kap3/congestion.html#slowstart",
    keywords: "slow start eksponentiell vekst cwnd MSS ssthresh dobling",
    body: "Start med cwnd = 1 MSS. For hver ACK: cwnd += MSS. Effekt: dobling per RTT (eksponentiell). Slutter ved timeout (cwnd→1, ssthresh=cwnd/2), cwnd≥ssthresh (→ congestion avoidance), eller 3 dup-ACKs (→ fast recovery)."
  },
  {
    title: "AIMD og congestion avoidance",
    chapter: "Kap 3",
    url: "kap3/congestion.html#aimd",
    keywords: "AIMD additive increase multiplicative decrease congestion avoidance lineær vekst sagtann halvering",
    body: "Congestion avoidance: +1 MSS per RTT (lineær). Per ACK: cwnd += MSS×(MSS/cwnd). Ved tap: ssthresh = cwnd/2. Sagtannmønster: lineær oppgang, brå halvering. AIMD gir stabilitet og rettferdighet."
  },
  {
    title: "Fast recovery og Reno vs. Tahoe",
    chapter: "Kap 3",
    url: "kap3/congestion.html#fastrecovery",
    keywords: "fast recovery TCP Reno TCP Tahoe 3 duplikat-ACK timeout ssthresh",
    body: "Tahoe: alle tap → cwnd=1, slow start. Reno: 3 dup-ACKs → ssthresh=cwnd/2, cwnd=ssthresh+3, fast recovery. Timeout → cwnd=1, slow start (begge). Fast recovery: cwnd+=MSS per dup-ACK, ny ACK → cwnd=ssthresh, congestion avoidance."
  },
  {
    title: "TCP CUBIC",
    chapter: "Kap 3",
    url: "kap3/congestion.html#cubic",
    keywords: "TCP CUBIC kubisk funksjon W_max K Linux standard vekst sonderer",
    body: "CUBIC bruker kubisk vekstkurve basert på tid siden tap. Rask vekst langt fra W_max, forsiktig nær W_max, sonderer forbi. Tidbasert (ikke RTT-basert). Standard i Linux. Utnytter kapasitet raskere enn lineær AIMD."
  },
  {
    title: "Rettferdighet i TCP",
    chapter: "Kap 3",
    url: "kap3/congestion.html#fairness",
    keywords: "rettferdighet fairness AIMD konvergens lik fordeling UDP parallelle forbindelser RTT",
    body: "AIMD konvergerer mot lik fordeling under idealiserte antakelser (samme RTT, faste sesjoner). Forbindelser med lavere RTT får mer i praksis. UDP deltar ikke i metningskontroll. Parallelle TCP-forbindelser gir mer enn rettferdig andel."
  },
  {
    title: "QUIC",
    chapter: "Kap 3",
    url: "kap3/congestion.html#quic",
    keywords: "QUIC HTTP/3 UDP 1-RTT håndtrykk per-strøm HOL-blocking brukerrom kryptering multipleksing",
    body: "QUIC bygger pålitelighet, metningskontroll, kryptering og multipleksing over UDP. 1-RTT håndtrykk vs TCP+TLS 2 RTT. Per-strøm pålitelighet eliminerer HOL-blocking. Oppdateres i brukerrom uten OS-endringer. Grunnlaget for HTTP/3."
  },

  // ===== KAP 4 =====
  {
    title: "Hva nettverkslaget gjør",
    chapter: "Kap 4",
    url: "kap4/rutere-videresending.html#overview",
    keywords: "nettverkslaget datagrammer IP videresending ruting",
    body: "Nettverkslaget flytter datagrammer mellom verter. IP er den sentrale protokollen. Hvert endesystem og ruter kjører nettverkslagets protokoller."
  },
  {
    title: "Forwarding vs. routing",
    chapter: "Kap 4",
    url: "kap4/rutere-videresending.html#fwd-routing",
    keywords: "forwarding routing videresending forwarding-tabell ruting",
    body: "Forwarding: flytt pakke fra innport til riktig utport (lokalt, i dataplanet). Routing: bestem ruter gjennom nettverket (globalt, i kontrollplanet). Forwarding-tabellen kobler dem sammen."
  },
  {
    title: "Dataplanet og kontrollplanet",
    chapter: "Kap 4",
    url: "kap4/rutere-videresending.html#planes",
    keywords: "data plane control plane per-router SDN Software Defined Networking sentralisert",
    body: "Dataplanet: videresending per pakke (nanosekunder). Kontrollplanet: bestemmer ruter. To tilnærminger: per-ruter kontroll (tradisjonell, distribuert) og SDN (logisk sentralisert kontroller)."
  },
  {
    title: "Best effort — Internetts tjenestemodell",
    chapter: "Kap 4",
    url: "kap4/rutere-videresending.html#service",
    keywords: "best effort tjenestemodell ingen garantier",
    body: "Internett tilbyr best-effort: ingen garantier for levering, rekkefølge, forsinkelse eller båndbredde. Enkelhet som har muliggjort enorm skalering."
  },
  {
    title: "Anatomien til en router",
    chapter: "Kap 4",
    url: "kap4/rutere-videresending.html#router",
    keywords: "router ruter linjeavslutning link-lag forwarding-tabell oppslag match plus action innport utport",
    body: "Routerarkitektur: linjeavslutning (link-lag-prosessering, oppslag i forwarding-tabell), switching fabric (kobler innporter til utporter), output buffere. Match plus action: match destinasjonsadresse, action videresend."
  },
  {
    title: "Longest prefix matching",
    chapter: "Kap 4",
    url: "kap4/rutere-videresending.html#lpm",
    keywords: "longest prefix matching LPM TCAM prefiks forwarding-tabell oppslag",
    body: "Longest prefix matching (LPM): flere prefiks kan matche, det lengste vinner. Implementeres ofte med TCAM (ternary content-addressable memory) som sjekker alle oppføringer parallelt."
  },
  {
    title: "Switching fabric",
    chapter: "Kap 4",
    url: "kap4/rutere-videresending.html#fabric",
    keywords: "switching fabric minne buss sammenkoblingsnettverk crossbar generasjoner",
    body: "Tre generasjoner: via minne (CPU kopierer), via buss (bus contention), sammenkoblingsnettverk (crossbar, parallelle fabric planes). Moderne rutere bruker sammenkoblingsnettverk for høy hastighet."
  },
  {
    title: "Køhåndtering i rutere",
    chapter: "Kap 4",
    url: "kap4/rutere-videresending.html#queueing",
    keywords: "kø buffer HOL head-of-line blocking tail drop RED ECN bufferbloat WFQ scheduling",
    body: "Pakker venter i køer ved inn- og utporter. HOL-blocking: pakke foran blokkerer pakker bak. Bufferstørrelse: tommelregel RTT×C. Tail drop: forkast nyeste. RED: tilfeldig forkasting. ECN: merkering i stedet for forkasting. WFQ: vektet rettferdig køing."
  },
  {
    title: "IP-datagrammets format",
    chapter: "Kap 4",
    url: "kap4/ip-adressering.html#ip",
    keywords: "IP datagram header TTL protokoll kilde-IP destinasjons-IP fragmentering",
    body: "IPv4-datagrammet har header med versjon, TTL, protokoll, kilde-IP, destinasjons-IP, og payload. Header typisk 20 bytes. TTL dekrementeres ved hver ruter."
  },
  {
    title: "IP-adressering og subnett",
    chapter: "Kap 4",
    url: "kap4/ip-adressering.html#addressing",
    keywords: "IP-adresse grensesnitt interface subnett nettverksdel vertsdel dotted decimal 32-bit",
    body: "IP-adresser er 32-bit, knyttet til grensesnitt (ikke verter). Subnett: gruppe av grensesnitt som kan nå hverandre uten ruter. Nettverksdel (høyorden bits) + vertsdel (lavorden bits). Dotted decimal notasjon."
  },
  {
    title: "CIDR — klasseløs adressering",
    chapter: "Kap 4",
    url: "kap4/ip-adressering.html#cidr",
    keywords: "CIDR klasseløs adressering prefikslengde hierarkisk adressering rute-aggregering ICANN",
    body: "CIDR (Classless Inter-Domain Routing): fleksibel prefikslengde (f.eks. /23). Muliggjør hierarkisk adressering og rute-aggregering. ICANN tildeler adresseblokker til regionale registre."
  },
  {
    title: "DHCP — automatisk adressetildeling",
    chapter: "Kap 4",
    url: "kap4/ip-adressering.html#dhcp",
    keywords: "DHCP Dynamic Host Configuration Protocol automatisk IP-adresse subnet-maske første-hop-ruter DNS-server lease",
    body: "DHCP tildeler IP-adresser automatisk. Klienten sender discover (broadcast), server tilbyr adresse, klient aksepterer, server bekrefter. Gir også subnet-maske, første-hop-ruter og DNS-server."
  },
  {
    title: "NAT — Network Address Translation",
    chapter: "Kap 4",
    url: "kap4/ip-adressering.html#nat",
    keywords: "NAT Network Address Translation privat IP portnummer NAT-tabell end-to-end 10.0.0.0 192.168.0.0",
    body: "NAT lar hele hjemmenettet dele én offentlig IP. Oversetter private adresser (10.0.0.0/8, 192.168.0.0/16) til offentlig IP med ulike portnumre. NAT-tabell mapper (intern IP:port) ↔ (ekstern port). Bryter end-to-end-prinsippet."
  },
  {
    title: "IPv6",
    chapter: "Kap 4",
    url: "kap4/ip-adressering.html#ipv6",
    keywords: "IPv6 128-bit adresser fast 40-byte header flow labels tunneling",
    body: "IPv6: 128-bit adresser (vs 32-bit IPv4), fast 40-byte header (enklere prosessering), flow labels for QoS. Overgang via tunneling (IPv6 pakket inn i IPv4)."
  },
  {
    title: "Internetts arkitekturprinsipper",
    chapter: "Kap 4",
    url: "kap4/ip-adressering.html#hourglass",
    keywords: "timeglass IP smal midje intelligens i kantene enkel konnektivitet ende-til-ende",
    body: "IP er den smale midjen i timeglasset: én nettverkslagsprotokoll som alt bygger oppå. Prinsipper: enkel konnektivitet, intelligens i kantene (endesystemene), nettverket er bevisst enkelt."
  },

  // ===== KAP 5 =====
  {
    title: "Kontrollplanet — rutingalgoritmer",
    chapter: "Kap 5",
    url: "kap5/",
    keywords: "kontrollplanet ruting rutingalgoritmer link-state distance-vector OSPF BGP SDN Dijkstra Bellman-Ford LSA",
    body: "Kontrollplanet bestemmer ruter i nettverket. To tilnærminger: per-ruter (distribuert) og SDN (sentralisert). Link-state (global, Dijkstra) vs distance-vector (desentralisert, Bellman-Ford). Statiske vs dynamiske ruter."
  },
  {
    title: "ICMP og traceroute",
    chapter: "Kap 5",
    url: "kap5/",
    keywords: "ICMP Internet Control Message Protocol feilrapportering ping traceroute TTL expired echo request reply",
    body: "ICMP brukes til feilrapportering og diagnostikk. Ping bruker echo request/reply. Traceroute bruker TTL: sender pakker med økende TTL, får TTL expired-meldinger fra hver ruter. Kartlegger ruten gjennom nettverket."
  },

  // ===== KAP 6 =====
  {
    title: "Hva lenkelaget gjør",
    chapter: "Kap 6",
    url: "kap6/grunnleggende-tilgang.html#intro",
    keywords: "lenkelaget noder lenker ramme frame nettverkskort NIC hopp link",
    body: "Lenkelaget overfører rammer mellom nabonoder (ett hopp). Noder er verter og rutere, lenker er kobber, fiber, radio. Data pakkes i rammer. Implementert i nettverkskortet (NIC)."
  },
  {
    title: "Feildeteksjon og CRC",
    chapter: "Kap 6",
    url: "kap6/grunnleggende-tilgang.html#errors",
    keywords: "feildeteksjon CRC Cyclic Redundancy Check bitfeil redundans polynom generator burst-feil",
    body: "CRC (Cyclic Redundancy Check): robust feildeteksjon med generatorpolynom. Sender beregner rest R, legger ved. Mottaker sjekker. Oppdager alle burst-feil kortere enn r+1 bits. Mye sterkere enn enkel sjekksum."
  },
  {
    title: "Medietilgangsprotkoller",
    chapter: "Kap 6",
    url: "kap6/grunnleggende-tilgang.html#mac",
    keywords: "MAC medietilgang CSMA/CD CSMA/CA TDMA FDMA kollisjon broadcast punkt-til-punkt backoff binær eksponentiell",
    body: "Punkt-til-punkt vs broadcast-lenker. Kollisjoner på delt medium. TDMA og FDMA deler kanalen statisk. CSMA: lytt før sending. CSMA/CD: oppdager kollisjon og stopper (Ethernet). Binær eksponentiell backoff etter kollisjon."
  },
  {
    title: "MAC-adresser og ARP",
    chapter: "Kap 6",
    url: "kap6/ethernet-svitsjer.html#addressing",
    keywords: "MAC-adresse ARP Address Resolution Protocol 48-bit flat broadcast FF-FF-FF-FF-FF-FF IP-til-MAC",
    body: "MAC-adresser er 48-bit, flat (ikke hierarkisk), brent inn i NIC. ARP oversetter IP til MAC-adresse: sender broadcast ARP-forespørsel, mottaker svarer med sin MAC. ARP-tabell cacher mappinger med TTL."
  },
  {
    title: "Ethernet",
    chapter: "Kap 6",
    url: "kap6/ethernet-svitsjer.html#ethernet",
    keywords: "Ethernet IEEE 802.3 ramme preamble MTU 1500 kollisjonsdomene upålitelig forbindelsesløs",
    body: "Ethernet er dominerende LAN-teknologi. Rammeformat: preamble, dest MAC, src MAC, type, data, CRC. MTU 1500 bytes. Upålitelig og forbindelsesløs. Enkelhet og billig pris har gjort den til vinneren."
  },
  {
    title: "Lenkelagssvitsjer",
    chapter: "Kap 6",
    url: "kap6/ethernet-svitsjer.html#switches",
    keywords: "svitsj switch forwarding-tabell selvlærende plug-and-play transparent MAC-adresse port",
    body: "Svitsjer er selvlærende og plug-and-play. Forwarding-tabell: (MAC-adresse, port, tidsstempel). Læringsalgoritme: observerer kilde-MAC og innport. Transparent for verter. Eliminerer kollisjoner."
  },
  {
    title: "En dag i livet til en web-forespørsel",
    chapter: "Kap 6",
    url: "kap6/ethernet-svitsjer.html#day",
    keywords: "DHCP ARP DNS TCP HTTP SYN SYNACK GET web-forespørsel hele stakken",
    body: "Komplett eksempel: laptop kobler til, DHCP gir IP, ARP finner ruters MAC, DNS slår opp google.com, TCP 3-veis håndtrykk, HTTP GET. Viser hele nettverksstakken i aksjon fra lenkelag til applikasjon."
  },

  // ===== KAP 7 =====
  {
    title: "Trådløse utfordringer",
    chapter: "Kap 7",
    url: "kap7/#intro",
    keywords: "trådløst mobilt signaltap interferens flerveispropagering utfordringer",
    body: "Trådløst er vanskelig: signaltap, interferens, flerveispropagering. Trådløst betyr ikke automatisk mobilt. Ti ganger flere mobilabonnement enn fasttelefoner."
  },
  {
    title: "Trådløse linker og SNR",
    chapter: "Kap 7",
    url: "kap7/#links",
    keywords: "SNR Signal-to-Noise Ratio BER Bit Error Rate rate-tilpasning trådløs link",
    body: "Trådløse linker: signaltap, interferens, flerveispropagering. SNR (Signal-to-Noise Ratio) bestemmer BER (Bit Error Rate). Rate-tilpasning: høy SNR → høy rate, lav SNR → robustere koding med lavere rate."
  },
  {
    title: "Skjulte terminaler og CSMA/CA",
    chapter: "Kap 7",
    url: "kap7/#hidden",
    keywords: "skjulte terminaler hidden terminal fading CSMA/CA RTS CTS kollisjonsunngåelse",
    body: "Skjult terminal-problem: to sendere kan ikke høre hverandre men kolliderer ved mottaker. CSMA/CA: kollisjonsunngåelse (ikke deteksjon). RTS/CTS-utveksling reserverer kanalen."
  },
  {
    title: "WiFi 802.11",
    chapter: "Kap 7",
    url: "kap7/#wifi",
    keywords: "WiFi 802.11 BSS aksesspunkt AP ad hoc SSID kanal beacon",
    body: "WiFi (802.11): åpen, billig. BSS (Basic Service Set) med aksesspunkt (AP). AP sender beacons med SSID. Autentisering og assossiering. Ad hoc-modus uten AP."
  },
  {
    title: "CSMA/CA-protokollen",
    chapter: "Kap 7",
    url: "kap7/#csmaca",
    keywords: "CSMA/CA DIFS SIFS backoff eksponentiell ACK kollisjonsunngåelse trådløs",
    body: "CSMA/CA: lytt, vent DIFS, velg tilfeldig backoff-tid. Hvis opptatt: vent. Etter sending: mottaker sender ACK etter SIFS. Ved kollisjon: eksponentiell backoff. Kan ikke detektere kollisjon under sending (ulikt CSMA/CD)."
  },
  {
    title: "WiFi rammeformat",
    chapter: "Kap 7",
    url: "kap7/#frame",
    keywords: "WiFi ramme fire adresser adresse 1 2 3 4 mottaker sender AP destinasjon",
    body: "WiFi-rammer har fire adressefelt: mottaker (AP/STA), sender, endelig destinasjon, og valgfri fjerde. Nødvendig fordi AP må videresende mellom trådløst og kablet nett."
  },
  {
    title: "Mobilitet mellom AP-er",
    chapter: "Kap 7",
    url: "kap7/#mobility-wifi",
    keywords: "mobilitet handover AP roaming subnett",
    body: "Mobilitet innenfor samme IP-subnett: klienten kan flytte mellom AP-er uten å endre IP-adresse. Svitsjen oppdaterer forwarding-tabell."
  },
  {
    title: "4G LTE-arkitektur",
    chapter: "Kap 7",
    url: "kap7/#cellular",
    keywords: "4G LTE mobilnett eNode-B EPC MME HSS S-GW P-GW UE radio access network",
    body: "4G LTE: radio access network med eNode-B basestasjoner, Evolved Packet Core (EPC) med MME (mobility management), HSS (abonnentdata), S-GW og P-GW (gateways). UE er brukerenheten."
  },
  {
    title: "LTE datatransport og tunneler",
    chapter: "Kap 7",
    url: "kap7/#lte-data",
    keywords: "GTP tunneling OFDM PDCP RLC MAC LTE datatransport",
    body: "LTE bruker OFDM for radiotilgang. Protokollstabel: PDCP (kryptering), RLC (pålitelighet), MAC (scheduling). GTP-tunneler mellom eNode-B og P-GW. All IP-trafikk tunnelleres."
  },
  {
    title: "5G",
    chapter: "Kap 7",
    url: "kap7/#5g",
    keywords: "5G FR1 FR2 mmWave MIMO millimeterbølger pico-celler høyere bitrate lavere latens",
    body: "5G: 10x høyere maks-bitrate, 10x lavere latens, 100x mer kapasitet. FR1 (sub-6 GHz) og FR2 (mmWave 24-52 GHz). Massiv MIMO med mange antenner. Pico-celler for tett dekning."
  },

  // ===== KAP 8 =====
  {
    title: "Nettverkssikkerhet — grunnprinsipper",
    chapter: "Kap 8",
    url: "kap8/kryptografi.html#sikkerhet",
    keywords: "nettverkssikkerhet konfidensialitet integritet autentisering tilgjengelighet Alice Bob Trudy angriper",
    body: "Nettverkssikkerhet: konfidensialitet (bare sender/mottaker forstår), integritet (ikke endret underveis), autentisering (verifisere identitet), tilgjengelighet. Alice og Bob kommuniserer, Trudy angriper."
  },
  {
    title: "Symmetrisk kryptografi",
    chapter: "Kap 8",
    url: "kap8/kryptografi.html#symmetrisk",
    keywords: "symmetrisk kryptografi nøkkel klartekst chiffertekst DES 3DES AES blokkchiffer substitusjonschiffer monoalfabetisk polyalfabetisk",
    body: "Symmetrisk: samme nøkkel for kryptering og dekryptering. Monoalfabetisk og polyalfabetisk substitusjonschiffer. Moderne: DES (56-bit, knekt), 3DES, AES (128/192/256-bit, standard). Blokkchiffer med CBC-modus."
  },
  {
    title: "Offentlig nøkkelkryptografi",
    chapter: "Kap 8",
    url: "kap8/kryptografi.html#offentlig",
    keywords: "offentlig nøkkel privat nøkkel asymmetrisk RSA Diffie-Hellman sesjonsnøkkel nøkkelutveksling",
    body: "Asymmetrisk kryptografi: offentlig nøkkel (alle kjenner) og privat nøkkel (hemmelig). Kryptert med offentlig → dekryptert med privat. Brukes til nøkkelutveksling av symmetrisk sesjonsnøkkel. RSA basert på faktorisering av store tall."
  },
  {
    title: "Meldingsintegritet og digitale signaturer",
    chapter: "Kap 8",
    url: "kap8/kryptografi.html#integritet",
    keywords: "meldingsintegritet digital signatur hashfunksjon message digest MAC HMAC SHA sertifikat CA Certification Authority non-repudiation",
    body: "Meldingsintegritet: verifisere at melding ikke er endret. Hashfunksjon H(m) gir message digest. Digital signatur: krypter hash med privat nøkkel. Sertifikat fra CA (Certification Authority) binder offentlig nøkkel til identitet. Non-repudiation."
  },
  {
    title: "Sikker e-post",
    chapter: "Kap 8",
    url: "kap8/protokoller-brannmur.html#epost",
    keywords: "sikker e-post hybridkryptering sesjonsnøkkel digital signatur konfidensialitet",
    body: "Sikker e-post: hybridkryptering — krypter melding med symmetrisk sesjonsnøkkel, krypter sesjonsnøkkelen med mottakers offentlige nøkkel. Digital signatur med senders private nøkkel for autentisering."
  },
  {
    title: "TLS — Transport Layer Security",
    chapter: "Kap 8",
    url: "kap8/protokoller-brannmur.html#tls",
    keywords: "TLS Transport Layer Security HTTPS SSL håndtrykk sertifikat sesjonsnøkkel kryptering integritet records",
    body: "TLS sikrer TCP-forbindelser: konfidensialitet, integritet, autentisering. Håndtrykk: utveksle nonce, sertifikat, enig om algoritmer, generer fire nøkler (kryptering og MAC i begge retninger). Data sendes som records."
  },
  {
    title: "IPsec og VPN",
    chapter: "Kap 8",
    url: "kap8/protokoller-brannmur.html#ipsec",
    keywords: "IPsec VPN Virtual Private Network AH ESP tunnelmodus transportmodus nettverkslag sikkerhet",
    body: "IPsec gir sikkerhet på nettverkslaget. VPN: kobler fjernkontor sikkert over Internett. AH (autentisering) og ESP (kryptering + autentisering). Tunnelmodus pakker hele IP-pakken inn i ny IPsec-pakke."
  },
  {
    title: "Trådløs sikkerhet",
    chapter: "Kap 8",
    url: "kap8/protokoller-brannmur.html#tradlos",
    keywords: "trådløs sikkerhet WPA WiFi 802.11 SIM-kort mobilnett autentisering HSS",
    body: "WiFi-sikkerhet: WPA2/WPA3 med AES-kryptering og autentisering. Mobilnett: SIM-kort med delt hemmelighet med HSS. Gjensidig autentisering mellom mobil og nettverk."
  },
  {
    title: "Brannmurer",
    chapter: "Kap 8",
    url: "kap8/protokoller-brannmur.html#brannmur",
    keywords: "brannmur firewall ACL Access Control List tilstandsfull pakkefiltrering IDS gateway",
    body: "Brannmur isolerer internt nett fra Internett. Access Control List (ACL) med regler for tillatt/blokkert trafikk. Tilstandsløs (sjekk enkeltpakker) vs tilstandsfull (spor forbindelser). IDS (Intrusion Detection System)."
  },

  // ===== KAP 9 =====
  {
    title: "Lyd og video som bits",
    chapter: "Kap 9",
    url: "kap9/#intro",
    keywords: "multimedia sampling kvantisering CBR VBR lyd video bits analog-til-digital",
    body: "Analog lyd og video digitaliseres med sampling og kvantisering. CBR (constant bit rate) vs VBR (variable bit rate). Høyere sampling og flere bits gir bedre kvalitet men mer data."
  },
  {
    title: "Tre typer multimedia-applikasjoner",
    chapter: "Kap 9",
    url: "kap9/#apptypes",
    keywords: "streaming lagret live interaktiv multimedia-applikasjoner tidssensitiv",
    body: "Tre typer: streaming av lagret video (Netflix), live streaming (direktesending), interaktiv sanntid (VoIP, videomøte). Alle er tidssensitive men med ulik toleranse."
  },
  {
    title: "Streaming av lagret video",
    chapter: "Kap 9",
    url: "kap9/#streaming",
    keywords: "streaming lagret video jitter buffer playout DASH continuous playout constraint",
    body: "Streaming: kontinuerlig avspillingskrav. Jitter (variasjon i forsinkelse) håndteres med avspillingsbuffer. Klient buffrer data før avspilling starter. DASH for adaptiv kvalitet."
  },
  {
    title: "UDP vs HTTP-streaming",
    chapter: "Kap 9",
    url: "kap9/#udphttp",
    keywords: "UDP streaming HTTP streaming TCP RTP brannmur",
    body: "UDP-streaming: lavere latens, ingen metningskontroll, men blokkeres av brannmurer. HTTP/TCP-streaming: pålitelig, passerer brannmurer, bruker chunk-basert overføring. De fleste tjenester bruker HTTP/TCP i dag."
  },
  {
    title: "Voice-over-IP (VoIP)",
    chapter: "Kap 9",
    url: "kap9/#voip",
    keywords: "VoIP Voice-over-IP IP-telefoni samtale pakketap forsinkelse 150ms 64kbps 20ms",
    body: "VoIP: tale over pakkenett. 64 kbps (PCM), 20 ms biter. Forsinkelseskrav: <150ms bra, 150-400ms akseptabelt, >400ms ubrukelig. Tolererer noe pakketap (1-5%). Veksler mellom snakke- og stilleperioder."
  },
  {
    title: "Jitter og playout-forsinkelse",
    chapter: "Kap 9",
    url: "kap9/#jitter",
    keywords: "jitter playout-forsinkelse playout-buffer variabel forsinkelse EWMA adaptiv",
    body: "Jitter: variasjon i ende-til-ende-forsinkelse. Fast playout-forsinkelse: alle pakker venter til tidspunkt q+forsinkelse. Adaptiv playout: EWMA-estimat av forsinkelse og varianse, justert mellom taleperioder."
  },
  {
    title: "FEC og interleaving",
    chapter: "Kap 9",
    url: "kap9/#fec",
    keywords: "FEC Forward Error Correction interleaving redundans XOR feilretting pakketap",
    body: "FEC (Forward Error Correction): send redundans slik at mottaker kan reparere tap. Enkel FEC: XOR av n pakker gir redundanspakke. Interleaving: spre bitene utover flere pakker, tap av én pakke gir bare små hull i mange."
  },
  {
    title: "RTP — Real-Time Protocol",
    chapter: "Kap 9",
    url: "kap9/#rtp",
    keywords: "RTP Real-Time Protocol sanntid payload-type sekvensnummer tidsstempling SSRC UDP",
    body: "RTP kjører over UDP og gir payload-type-identifikasjon, sekvensnummerering, tidsstempling og kildeidentifikasjon (SSRC). Brukes av VoIP og videokonferanse. Gir ikke garanti for levering eller QoS."
  }
];
