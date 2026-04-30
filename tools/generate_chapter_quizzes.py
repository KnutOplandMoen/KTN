import html
import re
from pathlib import Path


DIFF_SEQUENCE = [
    "L",
    "M",
    "H",
    "M",
    "L",
    "H",
    "M",
    "H",
    "L",
    "H",
    "M",
    "H",
    "L",
    "M",
    "H",
    "M",
    "L",
    "H",
    "M",
    "H",
    "M",
    "H",
    "L",
    "M",
    "H",
]

NO_TAG = {"L": "Lett", "M": "Middels", "H": "Vanskelig"}
EN_TAG = {"L": "Easy", "M": "Medium", "H": "Hard"}


def chapter_facts():
    return {
        1: [
            {
                "topic_no": "forskjellen mellom pakkesvitsjing og linjesvitsjing",
                "topic_en": "the difference between packet switching and circuit switching",
                "answer_no": "Pakkesvitsjing deler kapasitet dynamisk mellom brukere, mens linjesvitsjing reserverer kapasitet per forbindelse.",
                "answer_en": "Packet switching shares capacity dynamically among users, while circuit switching reserves capacity per connection.",
            },
            {
                "topic_no": "hva en nettverksprotokoll faktisk definerer",
                "topic_en": "what a network protocol actually defines",
                "answer_no": "En protokoll definerer meldingsformat, rekkefølge og handlinger ved sending og mottak.",
                "answer_en": "A protocol defines message format, ordering, and the actions performed on send and receive.",
            },
            {
                "topic_no": "rollen til endesystemer i Internett",
                "topic_en": "the role of end systems in the Internet",
                "answer_no": "Endesystemer kjører applikasjoner og er kilder/mål for data, mens rutere bare videresender pakker.",
                "answer_en": "End systems run applications and act as data sources/destinations, while routers only forward packets.",
            },
            {
                "topic_no": "store-and-forward-prinsippet",
                "topic_en": "the store-and-forward principle",
                "answer_no": "En ruter må motta hele pakken før den kan sende den videre på neste lenke.",
                "answer_en": "A router must receive the full packet before it can forward it on the next link.",
            },
            {
                "topic_no": "hvordan transmisjonsforsinkelse beregnes",
                "topic_en": "how transmission delay is computed",
                "answer_no": "Transmisjonsforsinkelsen er L/R, altså pakkestørrelse i bits delt på linkhastighet.",
                "answer_en": "Transmission delay is L/R, i.e. packet size in bits divided by link rate.",
            },
            {
                "topic_no": "hvordan propageringsforsinkelse beregnes",
                "topic_en": "how propagation delay is computed",
                "answer_no": "Propageringsforsinkelsen er avstand delt på signalhastigheten i mediet.",
                "answer_en": "Propagation delay is distance divided by signal speed in the medium.",
            },
            {
                "topic_no": "hvorfor køforsinkelse er vanskelig å forutsi",
                "topic_en": "why queueing delay is hard to predict",
                "answer_no": "Køforsinkelse varierer med momentan trafikkbelastning og antall pakker som allerede venter.",
                "answer_en": "Queueing delay varies with instantaneous traffic load and the number of packets already waiting.",
            },
            {
                "topic_no": "hva trafikkintensitet La/R forteller",
                "topic_en": "what traffic intensity La/R tells you",
                "answer_no": "La/R måler hvor hardt en lenke belastes; når verdien nærmer seg 1, vokser køene kraftig.",
                "answer_en": "La/R measures link load; when it approaches 1, queues grow sharply.",
            },
            {
                "topic_no": "hva som er en flaskehalslenke",
                "topic_en": "what a bottleneck link is",
                "answer_no": "Flaskehalslenken er den med lavest kapasitet på ruten og begrenser ende-til-ende-gjennomstrømning.",
                "answer_en": "The bottleneck link has the lowest capacity on the path and limits end-to-end throughput.",
            },
            {
                "topic_no": "statistisk multipleksing",
                "topic_en": "statistical multiplexing",
                "answer_no": "Statistisk multipleksing utnytter at brukere er aktive til ulike tider, så kapasitet kan deles effektivt.",
                "answer_en": "Statistical multiplexing exploits users being active at different times so capacity can be shared efficiently.",
            },
            {
                "topic_no": "hvorfor pakkedropp skjer i rutere",
                "topic_en": "why packet drops happen in routers",
                "answer_no": "Pakker droppes når bufferen er full og nye pakker ankommer raskere enn de kan sendes ut.",
                "answer_en": "Packets are dropped when buffers are full and arrivals exceed the outgoing service rate.",
            },
            {
                "topic_no": "hvordan traceroute avdekker rutehopp",
                "topic_en": "how traceroute reveals path hops",
                "answer_no": "Traceroute øker TTL trinnvis slik at hver mellomruter svarer med ICMP time exceeded.",
                "answer_en": "Traceroute increases TTL step by step so each intermediate router returns ICMP time exceeded.",
            },
            {
                "topic_no": "hva ping faktisk måler",
                "topic_en": "what ping actually measures",
                "answer_no": "Ping måler rundturstid (RTT) mellom ICMP echo request og echo reply.",
                "answer_en": "Ping measures round-trip time (RTT) between ICMP echo request and echo reply.",
            },
            {
                "topic_no": "hvorfor lagdeling brukes i nettverk",
                "topic_en": "why layering is used in networking",
                "answer_no": "Lagdeling isolerer kompleksitet, gjør design modulært og lar lag utvikles uavhengig.",
                "answer_en": "Layering isolates complexity, makes design modular, and allows layers to evolve independently.",
            },
            {
                "topic_no": "enkapsulering i protokollstakken",
                "topic_en": "encapsulation in the protocol stack",
                "answer_no": "Hvert lag legger til sin egen header rundt data fra laget over.",
                "answer_en": "Each layer adds its own header around data from the layer above.",
            },
            {
                "topic_no": "hva et aksessnett er",
                "topic_en": "what an access network is",
                "answer_no": "Aksessnettet kobler endesystemet til første ruter hos ISP-en.",
                "answer_en": "The access network connects an end system to the ISP's first router.",
            },
            {
                "topic_no": "hvorfor DSL ofte er asymmetrisk",
                "topic_en": "why DSL is often asymmetric",
                "answer_no": "DSL tildeler typisk mer kapasitet nedstrøms enn oppstrøms fordi brukertrafikk ofte er nedlastningstung.",
                "answer_en": "DSL typically allocates more downstream than upstream capacity because user traffic is download-heavy.",
            },
            {
                "topic_no": "hva det betyr at kabelnett er delt medium",
                "topic_en": "what it means that cable access is a shared medium",
                "answer_no": "Flere hus deler samme kanal, så brukerhastighet varierer med naboenes aktivitet.",
                "answer_en": "Multiple homes share the same channel, so user rate varies with neighbors' activity.",
            },
            {
                "topic_no": "hvorfor fiber brukes i kjernen av Internett",
                "topic_en": "why fiber is used in the Internet core",
                "answer_no": "Fiber gir høy kapasitet, lav demping og god robusthet mot elektromagnetisk støy.",
                "answer_en": "Fiber provides high capacity, low attenuation, and strong immunity to electromagnetic noise.",
            },
            {
                "topic_no": "hvordan ISP-hierarkiet er organisert",
                "topic_en": "how the ISP hierarchy is organized",
                "answer_no": "Aksess-ISP-er kobles mot regionale/tier-1-nett og utveksler trafikk via peering og transitt.",
                "answer_en": "Access ISPs connect to regional/tier-1 networks and exchange traffic via peering and transit.",
            },
            {
                "topic_no": "rollen til IXP-er",
                "topic_en": "the role of IXPs",
                "answer_no": "IXP-er lar nettverk utveksle trafikk direkte, noe som reduserer kostnad og ofte forsinkelse.",
                "answer_en": "IXPs let networks exchange traffic directly, reducing cost and often delay.",
            },
            {
                "topic_no": "hva et botnet gjør i et DDoS-angrep",
                "topic_en": "what a botnet does in a DDoS attack",
                "answer_no": "Et botnet koordinerer mange kompromitterte maskiner for å oversvømme et mål med trafikk.",
                "answer_en": "A botnet coordinates many compromised machines to flood a target with traffic.",
            },
            {
                "topic_no": "hva IP-spoofing innebærer",
                "topic_en": "what IP spoofing means",
                "answer_no": "IP-spoofing er å sende pakker med forfalsket kildeadresse for å skjule eller forvirre avsenderidentitet.",
                "answer_en": "IP spoofing is sending packets with a forged source address to hide or mislead sender identity.",
            },
            {
                "topic_no": "hvorfor kjerneutstyr holdes enkelt",
                "topic_en": "why core network devices are kept simple",
                "answer_no": "Enkle dataplane-operasjoner i kjernen gir bedre skalerbarhet og høyere videresendingshastighet.",
                "answer_en": "Simple core data-plane operations improve scalability and forwarding speed.",
            },
            {
                "topic_no": "hva socket-grensesnittet gir applikasjoner",
                "topic_en": "what the socket interface gives applications",
                "answer_no": "Socket-grensesnittet lar applikasjoner sende/motta data over nett uten å implementere ruting selv.",
                "answer_en": "The socket interface lets applications send/receive network data without implementing routing themselves.",
            },
        ],
        2: [
            {
                "topic_no": "klient–server-arkitektur",
                "topic_en": "client-server architecture",
                "answer_no": "Klient–server samler tjenestelogikk i alltid-tilgjengelige servere som betjener mange klienter.",
                "answer_en": "Client-server centralizes service logic in always-on servers that serve many clients.",
            },
            {
                "topic_no": "selv-skalering i P2P",
                "topic_en": "self-scaling in P2P",
                "answer_no": "I P2P bidrar hver ny peer med både etterspørsel og opplastingskapasitet.",
                "answer_en": "In P2P, every new peer contributes both demand and upload capacity.",
            },
            {
                "topic_no": "socketens rolle i applikasjonslaget",
                "topic_en": "the role of sockets in the application layer",
                "answer_no": "Socketen er API-et mellom applikasjon og transportlag for sending/mottak av data.",
                "answer_en": "A socket is the API between the application and transport layer for data send/receive.",
            },
            {
                "topic_no": "hva TCP tilbyr applikasjoner",
                "topic_en": "what TCP offers applications",
                "answer_no": "TCP tilbyr pålitelig, ordnet byte-strøm med flyt- og overbelastningskontroll, men med mer overhead.",
                "answer_en": "TCP provides reliable, ordered byte-stream delivery with flow and congestion control, but with more overhead.",
            },
            {
                "topic_no": "hva UDP tilbyr applikasjoner",
                "topic_en": "what UDP offers applications",
                "answer_no": "UDP tilbyr lav latens og enkel datagramtransport uten leveringsgarantier.",
                "answer_en": "UDP offers low-latency, simple datagram transport without delivery guarantees.",
            },
            {
                "topic_no": "HTTP request–response-modellen",
                "topic_en": "the HTTP request-response model",
                "answer_no": "I HTTP initierer klienten forespørselen, og serveren svarer med statuslinje, headere og eventuelt innhold.",
                "answer_en": "In HTTP, the client initiates a request, and the server replies with status line, headers, and optional content.",
            },
            {
                "topic_no": "hva det betyr at HTTP er stateless",
                "topic_en": "what it means that HTTP is stateless",
                "answer_no": "HTTP-serveren behandler hver forespørsel uavhengig av tidligere forespørsler.",
                "answer_en": "An HTTP server treats each request independently of earlier requests.",
            },
            {
                "topic_no": "cookies i webapplikasjoner",
                "topic_en": "cookies in web applications",
                "answer_no": "Cookies legger en klient-ID i forespørsler slik at serveren kan knytte handlinger til en sesjon.",
                "answer_en": "Cookies place a client identifier in requests so the server can associate actions with a session.",
            },
            {
                "topic_no": "persistent HTTP-forbindelser",
                "topic_en": "persistent HTTP connections",
                "answer_no": "Persistent HTTP reduserer antall TCP-oppsett og RTT-kostnad ved flere objekter.",
                "answer_en": "Persistent HTTP reduces TCP setup and RTT overhead when transferring multiple objects.",
            },
            {
                "topic_no": "betinget GET og 304 Not Modified",
                "topic_en": "conditional GET and 304 Not Modified",
                "answer_no": "Betinget GET sparer båndbredde ved å hente objektet kun når det faktisk er endret.",
                "answer_en": "Conditional GET saves bandwidth by transferring the object only when it has changed.",
            },
            {
                "topic_no": "webcache/proxy",
                "topic_en": "web caching/proxies",
                "answer_no": "En webcache kan svare lokalt på populære objekter og redusere både forsinkelse og backbone-trafikk.",
                "answer_en": "A web cache can serve popular objects locally, reducing both delay and backbone traffic.",
            },
            {
                "topic_no": "CDN-strategi",
                "topic_en": "CDN strategy",
                "answer_no": "CDN-er flytter innhold nær brukeren med edge-servere for lavere latenstid og høyere skalerbarhet.",
                "answer_en": "CDNs move content close to users using edge servers for lower latency and higher scalability.",
            },
            {
                "topic_no": "DASH-adaptiv strømming",
                "topic_en": "DASH adaptive streaming",
                "answer_no": "I DASH velger klienten bitrate per segment basert på målt throughput og bufferstatus.",
                "answer_en": "In DASH, the client selects bitrate per segment based on measured throughput and buffer state.",
            },
            {
                "topic_no": "segmentering av videostrøm",
                "topic_en": "video segmentation",
                "answer_no": "Video deles i korte segmenter i flere kvaliteter for dynamisk tilpasning under avspilling.",
                "answer_en": "Video is split into short segments at multiple qualities for dynamic adaptation during playback.",
            },
            {
                "topic_no": "SMTP som push-protokoll",
                "topic_en": "SMTP as a push protocol",
                "answer_no": "SMTP dytter e-post mellom servere og bruker kølagring når mottakerserver ikke er umiddelbart tilgjengelig.",
                "answer_en": "SMTP pushes email between servers and uses queued storage when the destination server is not immediately available.",
            },
            {
                "topic_no": "IMAP i moderne e-post",
                "topic_en": "IMAP in modern email",
                "answer_no": "IMAP lar klienter synkronisere mapper og meldingsstatus mens e-posten forblir på serveren.",
                "answer_en": "IMAP lets clients synchronize folders and message state while keeping mail on the server.",
            },
            {
                "topic_no": "DNS sin kjernefunksjon",
                "topic_en": "DNS core function",
                "answer_no": "DNS oversetter domenenavn til IP-adresser slik at applikasjoner kan kontakte riktig vert.",
                "answer_en": "DNS maps domain names to IP addresses so applications can contact the correct host.",
            },
            {
                "topic_no": "DNS-hierarkiet",
                "topic_en": "the DNS hierarchy",
                "answer_no": "DNS er hierarkisk med root-, TLD- og autoritative navneservere for skalerbar navneoppløsning.",
                "answer_en": "DNS is hierarchical with root, TLD, and authoritative name servers for scalable name resolution.",
            },
            {
                "topic_no": "iterativ DNS-oppslag",
                "topic_en": "iterative DNS resolution",
                "answer_no": "I iterativ oppslag gir hver server henvisning videre i stedet for å fullføre hele oppslaget selv.",
                "answer_en": "In iterative resolution, each server returns the next referral instead of completing the whole lookup itself.",
            },
            {
                "topic_no": "DNS-caching og TTL",
                "topic_en": "DNS caching and TTL",
                "answer_no": "Caching reduserer oppslagstid og belastning, mens TTL begrenser hvor lenge et svar kan gjenbrukes.",
                "answer_en": "Caching reduces lookup delay and load, while TTL limits how long a response can be reused.",
            },
            {
                "topic_no": "MX-poster i DNS",
                "topic_en": "MX records in DNS",
                "answer_no": "MX-poster peker til hvilke mailservere som mottar e-post for et domene.",
                "answer_en": "MX records indicate which mail servers receive email for a domain.",
            },
            {
                "topic_no": "TCP-serverens velkomstsokkel",
                "topic_en": "the TCP server welcome socket",
                "answer_no": "Velkomstsokkelen aksepterer nye forbindelser, og OS oppretter en egen forbindelsessokkel per klient.",
                "answer_en": "The welcome socket accepts new connections, and the OS creates a dedicated connection socket per client.",
            },
            {
                "topic_no": "hvorfor UDP-servere ofte bruker én sokkel",
                "topic_en": "why UDP servers often use one socket",
                "answer_no": "UDP har ikke forbindelser; samme sokkel håndterer datagrammer fra mange klienter.",
                "answer_en": "UDP has no connections; one socket handles datagrams from many clients.",
            },
            {
                "topic_no": "HTTP-metoder i REST-lignende API-er",
                "topic_en": "HTTP methods in REST-like APIs",
                "answer_no": "GET leser ressurser, POST oppretter/trigger handlinger, og PUT/PATCH brukes for oppdatering.",
                "answer_en": "GET reads resources, POST creates/triggers actions, and PUT/PATCH are used for updates.",
            },
            {
                "topic_no": "HTTPS i praksis",
                "topic_en": "HTTPS in practice",
                "answer_no": "HTTPS er HTTP over TLS og gir konfidensialitet, integritet og serverautentisering.",
                "answer_en": "HTTPS is HTTP over TLS and provides confidentiality, integrity, and server authentication.",
            },
        ],
        3: [
            {
                "topic_no": "multiplexing og demultiplexing i transportlaget",
                "topic_en": "transport-layer multiplexing and demultiplexing",
                "answer_no": "Portnumre brukes til å levere data til riktig prosess på riktig vert.",
                "answer_en": "Port numbers are used to deliver data to the correct process on the correct host.",
            },
            {
                "topic_no": "størrelsen på UDP-headeren",
                "topic_en": "the UDP header size",
                "answer_no": "UDP-headeren er 8 byte, noe som gir lav protokolloverhead.",
                "answer_en": "The UDP header is 8 bytes, giving low protocol overhead.",
            },
            {
                "topic_no": "begrensningen til enkel sjekksumdeteksjon",
                "topic_en": "the limitation of simple checksum error detection",
                "answer_no": "Sjekksum oppdager mange feil, men kan i sjeldne tilfeller overse bestemte bitmønstre.",
                "answer_en": "Checksums detect many errors, but can rarely miss certain bit patterns.",
            },
            {
                "topic_no": "stop-and-wait-overføring",
                "topic_en": "stop-and-wait transmission",
                "answer_no": "Stop-and-wait tillater kun én utestående pakke før avsender må vente på ACK.",
                "answer_en": "Stop-and-wait allows only one outstanding packet before the sender waits for an ACK.",
            },
            {
                "topic_no": "hvorfor pipelining øker effektivitet",
                "topic_en": "why pipelining improves efficiency",
                "answer_no": "Pipelining holder flere pakker i flyt samtidig og reduserer tomgang mellom RTT-er.",
                "answer_en": "Pipelining keeps multiple packets in flight and reduces idle time between RTTs.",
            },
            {
                "topic_no": "Go-Back-N-oppførsel ved tap",
                "topic_en": "Go-Back-N behavior on loss",
                "answer_no": "Go-Back-N sender den tapte pakken og alle etterfølgende pakker i vinduet på nytt.",
                "answer_en": "Go-Back-N retransmits the lost packet and all subsequent packets in the window.",
            },
            {
                "topic_no": "Selective Repeat-oppførsel ved tap",
                "topic_en": "Selective Repeat behavior on loss",
                "answer_no": "Selective Repeat retransmitterer kun de manglende pakkene og bufferer resten.",
                "answer_en": "Selective Repeat retransmits only missing packets and buffers the rest.",
            },
            {
                "topic_no": "sekvensnumre i pålitelig overføring",
                "topic_en": "sequence numbers in reliable transfer",
                "answer_no": "Sekvensnumre gjør det mulig å oppdage duplikater og rekonstruere riktig rekkefølge.",
                "answer_en": "Sequence numbers allow duplicate detection and correct ordering at the receiver.",
            },
            {
                "topic_no": "kumulative ACK-er i TCP",
                "topic_en": "cumulative ACKs in TCP",
                "answer_no": "Et ACK-nummer bekrefter at alle bytes før nummeret er mottatt korrekt.",
                "answer_en": "An ACK number confirms that all bytes before that number were received correctly.",
            },
            {
                "topic_no": "treveis håndtrykk i TCP",
                "topic_en": "the TCP three-way handshake",
                "answer_no": "Treveis håndtrykk synkroniserer sekvensnumre og etablerer forbindelsestilstand i begge ender.",
                "answer_en": "The three-way handshake synchronizes sequence numbers and establishes state at both ends.",
            },
            {
                "topic_no": "flytkontroll med rwnd",
                "topic_en": "flow control with rwnd",
                "answer_no": "Mottakeren annonserer rwnd for å hindre at avsender oversvømmer mottaksbufferen.",
                "answer_en": "The receiver advertises rwnd to prevent the sender from overrunning the receive buffer.",
            },
            {
                "topic_no": "overbelastningskontroll med cwnd",
                "topic_en": "congestion control with cwnd",
                "answer_no": "Avsender begrenser sendevindu med cwnd for å unngå overbelastning i nettverket.",
                "answer_en": "The sender limits its send window with cwnd to avoid overloading the network.",
            },
            {
                "topic_no": "slow start",
                "topic_en": "slow start",
                "answer_no": "I slow start vokser cwnd omtrent eksponentielt, typisk en dobling per RTT.",
                "answer_en": "In slow start, cwnd grows roughly exponentially, typically doubling per RTT.",
            },
            {
                "topic_no": "congestion avoidance",
                "topic_en": "congestion avoidance",
                "answer_no": "I congestion avoidance øker cwnd lineært, omtrent 1 MSS per RTT.",
                "answer_en": "In congestion avoidance, cwnd increases linearly, about 1 MSS per RTT.",
            },
            {
                "topic_no": "AIMD-prinsippet",
                "topic_en": "the AIMD principle",
                "answer_no": "TCP bruker additiv økning og multiplikativ reduksjon for stabil og rettferdig deling.",
                "answer_en": "TCP uses additive increase and multiplicative decrease for stable and fair sharing.",
            },
            {
                "topic_no": "reaksjon på timeout i klassisk TCP Reno",
                "topic_en": "response to timeout in classic TCP Reno",
                "answer_no": "Ved timeout settes cwnd lavt igjen og forbindelsen går tilbake til forsiktig oppstart.",
                "answer_en": "On timeout, cwnd is reduced sharply and the connection returns to cautious startup behavior.",
            },
            {
                "topic_no": "tre duplikat-ACK-er",
                "topic_en": "three duplicate ACKs",
                "answer_no": "Tre duplikat-ACK-er tolkes som sannsynlig tap og utløser fast retransmit før timeout.",
                "answer_en": "Three duplicate ACKs are treated as likely loss and trigger fast retransmit before timeout.",
            },
            {
                "topic_no": "fast recovery i Reno",
                "topic_en": "fast recovery in Reno",
                "answer_no": "Reno holder forbindelsen i gang etter fast retransmit i stedet for å starte helt fra null.",
                "answer_en": "Reno keeps data flowing after fast retransmit instead of restarting from scratch.",
            },
            {
                "topic_no": "forholdet mellom MTU og MSS",
                "topic_en": "the relation between MTU and MSS",
                "answer_no": "MSS er nyttelaststørrelsen TCP kan sende uten IP-fragmentering gitt aktuell MTU.",
                "answer_en": "MSS is the TCP payload size that avoids IP fragmentation for the current MTU.",
            },
            {
                "topic_no": "RTT-estimering i TCP",
                "topic_en": "RTT estimation in TCP",
                "answer_no": "TCP bruker glattet RTT og varians for å sette en robust retransmisjonstimer.",
                "answer_en": "TCP uses smoothed RTT and variance to set a robust retransmission timer.",
            },
            {
                "topic_no": "TCP-sekvensnumre er byte-orienterte",
                "topic_en": "TCP sequence numbers are byte-oriented",
                "answer_no": "Sekvensnummeret peker på første byte i segmentets nyttelast, ikke på pakketeller.",
                "answer_en": "The sequence number identifies the first payload byte in the segment, not a packet counter.",
            },
            {
                "topic_no": "head-of-line blocking i TCP",
                "topic_en": "head-of-line blocking in TCP",
                "answer_no": "Tap av ett segment kan blokkere levering av senere data selv om de allerede er mottatt.",
                "answer_en": "Loss of one segment can block delivery of later data even if they have already arrived.",
            },
            {
                "topic_no": "hvorfor QUIC reduserer HOL-problemer",
                "topic_en": "why QUIC reduces HOL problems",
                "answer_no": "QUIC bruker uavhengige strømmer slik at tap i én strøm ikke stopper alle andre.",
                "answer_en": "QUIC uses independent streams so loss in one stream does not block all others.",
            },
            {
                "topic_no": "well-known og ephemeral porter",
                "topic_en": "well-known and ephemeral ports",
                "answer_no": "Servere lytter ofte på velkjente porter, mens klienter bruker midlertidige ephemeral porter.",
                "answer_en": "Servers often listen on well-known ports, while clients use temporary ephemeral ports.",
            },
            {
                "topic_no": "pseudo-header i transport-sjekksum",
                "topic_en": "the pseudo-header in transport checksums",
                "answer_no": "Pseudo-headeren binder kontrollsummen til IP-adressene og protokollfeltet for ekstra beskyttelse.",
                "answer_en": "The pseudo-header binds the checksum to IP addresses and protocol fields for extra protection.",
            },
        ],
        4: [
            {
                "topic_no": "forwarding i dataplanet",
                "topic_en": "data-plane forwarding",
                "answer_no": "Forwarding er den raske per-pakke-operasjonen som sender en pakke til riktig utport.",
                "answer_en": "Forwarding is the fast per-packet operation that sends a packet to the correct output port.",
            },
            {
                "topic_no": "longest-prefix matching",
                "topic_en": "longest-prefix matching",
                "answer_no": "Når flere ruter matcher, velges den med lengst og mest spesifikt prefiks.",
                "answer_en": "When multiple routes match, the one with the longest, most specific prefix is selected.",
            },
            {
                "topic_no": "CIDR-prefikser",
                "topic_en": "CIDR prefixes",
                "answer_no": "CIDR skriver nett med adresse/prefikslengde og muliggjør fleksibel adresseallokering.",
                "answer_en": "CIDR expresses networks as address/prefix-length and enables flexible address allocation.",
            },
            {
                "topic_no": "default-rute",
                "topic_en": "the default route",
                "answer_no": "Default-ruten brukes når ingen mer spesifikk oppføring matcher destinasjonsadressen.",
                "answer_en": "The default route is used when no more specific entry matches the destination address.",
            },
            {
                "topic_no": "subnettmaske",
                "topic_en": "subnet masks",
                "answer_no": "Subnettmasken skiller nettverksdel fra hostdel i en IPv4-adresse.",
                "answer_en": "A subnet mask separates the network part from the host part of an IPv4 address.",
            },
            {
                "topic_no": "vert som sender til annet subnett",
                "topic_en": "a host sending to another subnet",
                "answer_no": "Verten sender rammen til default gateway når målet ligger utenfor eget subnett.",
                "answer_en": "The host sends the frame to the default gateway when the destination is outside its subnet.",
            },
            {
                "topic_no": "ARP-oppslag",
                "topic_en": "ARP resolution",
                "answer_no": "ARP oversetter lokal IP-adresse til lokal MAC-adresse på samme lenke.",
                "answer_en": "ARP maps a local IP address to a local MAC address on the same link.",
            },
            {
                "topic_no": "DHCP DORA-sekvensen",
                "topic_en": "the DHCP DORA sequence",
                "answer_no": "Typisk DHCP-forløp er Discover, Offer, Request og Ack.",
                "answer_en": "A typical DHCP flow is Discover, Offer, Request, and Ack.",
            },
            {
                "topic_no": "NAT med portoversettelse",
                "topic_en": "NAT with port translation",
                "answer_no": "NAT mapper mange interne adresser til én offentlig adresse ved hjelp av portnumre.",
                "answer_en": "NAT maps many internal addresses to one public address using port numbers.",
            },
            {
                "topic_no": "private IPv4-adresser",
                "topic_en": "private IPv4 addresses",
                "answer_no": "Private adresser er ikke globalt rutbare og brukes bak NAT i lokale nett.",
                "answer_en": "Private addresses are not globally routable and are used behind NAT in local networks.",
            },
            {
                "topic_no": "TTL-feltet i IPv4",
                "topic_en": "the IPv4 TTL field",
                "answer_no": "TTL reduseres per hopp for å hindre at pakker sirkulerer uendelig ved rutingfeil.",
                "answer_en": "TTL is decremented per hop to prevent packets from looping forever during routing failures.",
            },
            {
                "topic_no": "IPv4-headerchecksum",
                "topic_en": "the IPv4 header checksum",
                "answer_no": "IPv4-headerchecksum må oppdateres i hver ruter fordi headerfelter som TTL endres.",
                "answer_en": "The IPv4 header checksum must be recomputed at each router because header fields like TTL change.",
            },
            {
                "topic_no": "IP-fragmentering",
                "topic_en": "IP fragmentation",
                "answer_no": "Hvis et datagram er større enn linkens MTU og DF=0, kan det fragmenteres i flere biter.",
                "answer_en": "If a datagram exceeds link MTU and DF=0, it may be fragmented into multiple pieces.",
            },
            {
                "topic_no": "DF-bit satt til 1",
                "topic_en": "the DF bit set to 1",
                "answer_no": "Med DF=1 droppes for store pakker, og avsender må normalt redusere pakkestørrelse.",
                "answer_en": "With DF=1, oversized packets are dropped, and the sender typically must reduce packet size.",
            },
            {
                "topic_no": "IPv6 fast header",
                "topic_en": "the fixed IPv6 header",
                "answer_no": "IPv6 bruker en fast 40-byte basisheader som forenkler rask forwarding.",
                "answer_en": "IPv6 uses a fixed 40-byte base header, simplifying fast forwarding.",
            },
            {
                "topic_no": "hvorfor IPv6 fjernet headerchecksum",
                "topic_en": "why IPv6 removed the header checksum",
                "answer_no": "IPv6 fjernet headerchecksum for å redusere arbeid per hopp siden andre lag allerede har feilkontroll.",
                "answer_en": "IPv6 removed the header checksum to reduce per-hop work since other layers already provide error checks.",
            },
            {
                "topic_no": "utgående kø i ruter",
                "topic_en": "router output queues",
                "answer_no": "Når utgående lenke er fullbooket, bygges kø; ved full buffer må pakker droppes.",
                "answer_en": "When the outgoing link is saturated, queues build up; if buffers fill, packets must be dropped.",
            },
            {
                "topic_no": "oppslag i forwarding-tabell",
                "topic_en": "forwarding-table lookups",
                "answer_no": "Ruteren gjør prefiksoppslag på destinasjonsadresse for å velge riktig neste hopp.",
                "answer_en": "The router performs prefix lookup on destination address to choose the next hop.",
            },
            {
                "topic_no": "switching fabric i en ruter",
                "topic_en": "the switching fabric inside a router",
                "answer_no": "Switching fabric flytter pakker fra valgt inngangsport til valgt utgangsport internt i ruteren.",
                "answer_en": "The switching fabric moves packets from selected input ports to selected output ports inside the router.",
            },
            {
                "topic_no": "ruteaggregering",
                "topic_en": "route aggregation",
                "answer_no": "Aggregering slår sammen prefikser for å redusere tabellstørrelse og kontrollplane-belastning.",
                "answer_en": "Aggregation combines prefixes to reduce table size and control-plane load.",
            },
            {
                "topic_no": "best-effort i IP",
                "topic_en": "best-effort in IP",
                "answer_no": "IP lover ikke levering, rekkefølge eller båndbreddegaranti; det håndteres i endesystemene.",
                "answer_en": "IP does not guarantee delivery, ordering, or bandwidth; that is handled by end systems.",
            },
            {
                "topic_no": "hvordan MAC-adresser endres hop-for-hop",
                "topic_en": "how MAC addresses change hop-by-hop",
                "answer_no": "MAC-adresser er lokale per lenke og byttes for hvert hopp, mens IP-destinasjonen er ende-til-ende.",
                "answer_en": "MAC addresses are link-local and change each hop, while the IP destination remains end-to-end.",
            },
            {
                "topic_no": "NAT og innkommende forbindelser",
                "topic_en": "NAT and incoming connections",
                "answer_no": "NAT skjuler interne verter og krever port forwarding eller lignende for å nå interne tjenester utenfra.",
                "answer_en": "NAT hides internal hosts and requires port forwarding or similar mechanisms for inbound access.",
            },
            {
                "topic_no": "CIDR og variabel subnetting",
                "topic_en": "CIDR and variable subnetting",
                "answer_no": "CIDR gjør det mulig å tilpasse subnettstørrelse etter faktisk behov i stedet for faste klasser.",
                "answer_en": "CIDR allows subnet sizing to fit actual needs instead of fixed address classes.",
            },
            {
                "topic_no": "når default-rute er en god strategi",
                "topic_en": "when a default route is useful",
                "answer_no": "Små nett bruker ofte default-rute for å sende ukjent trafikk mot en upstream-ruter.",
                "answer_en": "Small networks often use a default route to send unknown traffic to an upstream router.",
            },
        ],
        5: [
            {
                "topic_no": "hva kontrollplanet gjør",
                "topic_en": "what the control plane does",
                "answer_no": "Kontrollplanet beregner ruter og fyller forwarding-tabeller som dataplanet bruker.",
                "answer_en": "The control plane computes routes and populates forwarding tables used by the data plane.",
            },
            {
                "topic_no": "link-state-prinsippet",
                "topic_en": "the link-state principle",
                "answer_no": "I link-state kjenner rutere hele topologien og beregner egne korteste veier lokalt.",
                "answer_en": "In link-state, routers know the full topology and compute shortest paths locally.",
            },
            {
                "topic_no": "Dijkstra i ruting",
                "topic_en": "Dijkstra in routing",
                "answer_no": "Dijkstra bygger et korteste-veier-tre fra én kilde gitt kjente linkkostnader.",
                "answer_en": "Dijkstra builds a shortest-path tree from one source given known link costs.",
            },
            {
                "topic_no": "distance-vector-prinsippet",
                "topic_en": "the distance-vector principle",
                "answer_no": "Distance-vector utveksler kostnadsestimater nabo-til-nabo og oppdaterer iterativt.",
                "answer_en": "Distance-vector exchanges cost estimates neighbor-to-neighbor and updates iteratively.",
            },
            {
                "topic_no": "Bellman-Ford i DV",
                "topic_en": "Bellman-Ford in DV",
                "answer_no": "Bellman-Ford oppdaterer beste rute via minimering over naboers annonserte kostnader.",
                "answer_en": "Bellman-Ford updates best routes by minimizing over neighbors' advertised costs.",
            },
            {
                "topic_no": "count-to-infinity-problemet",
                "topic_en": "the count-to-infinity problem",
                "answer_no": "I DV kan feil informasjon om utilgjengelige ruter leve lenge og øke metrikk gradvis.",
                "answer_en": "In DV, incorrect reachability info can persist and metrics can climb gradually.",
            },
            {
                "topic_no": "poison reverse",
                "topic_en": "poison reverse",
                "answer_no": "Poison reverse annonserer uendelig kost via naboen som ga ruten, for å dempe enkle løkker.",
                "answer_en": "Poison reverse advertises infinity back to the neighbor that supplied a route to mitigate simple loops.",
            },
            {
                "topic_no": "konvergens i rutingprotokoller",
                "topic_en": "convergence in routing protocols",
                "answer_no": "Rask og stabil konvergens reduserer perioder med tap, løkker og suboptimale ruter.",
                "answer_en": "Fast, stable convergence reduces periods of loss, loops, and suboptimal routing.",
            },
            {
                "topic_no": "OSPF",
                "topic_en": "OSPF",
                "answer_no": "OSPF er en link-state IGP som bruker kostnadsmetrikker og flooding av LSAs.",
                "answer_en": "OSPF is a link-state IGP using cost metrics and LSA flooding.",
            },
            {
                "topic_no": "RIP",
                "topic_en": "RIP",
                "answer_no": "RIP er en enkel distance-vector-protokoll med hop count som metrikk.",
                "answer_en": "RIP is a simple distance-vector protocol using hop count as metric.",
            },
            {
                "topic_no": "BGP som inter-AS-protokoll",
                "topic_en": "BGP as the inter-AS protocol",
                "answer_no": "BGP annonserer AS-path og policy-attributter mellom autonome systemer.",
                "answer_en": "BGP advertises AS paths and policy attributes between autonomous systems.",
            },
            {
                "topic_no": "policy i BGP",
                "topic_en": "policy in BGP",
                "answer_no": "BGP velger ofte ruter etter økonomi og policy, ikke bare teknisk korteste vei.",
                "answer_en": "BGP often selects routes by business policy and economics, not only shortest path.",
            },
            {
                "topic_no": "eBGP versus iBGP",
                "topic_en": "eBGP versus iBGP",
                "answer_no": "eBGP brukes mellom AS-er, mens iBGP distribuerer eksterne ruter internt i et AS.",
                "answer_en": "eBGP runs between ASes, while iBGP distributes external routes inside an AS.",
            },
            {
                "topic_no": "SDN-kontroller",
                "topic_en": "an SDN controller",
                "answer_no": "I SDN flyttes kontrolllogikk til en logisk sentral kontroller som programmerer nettutstyr.",
                "answer_en": "In SDN, control logic moves to a logically centralized controller that programs network devices.",
            },
            {
                "topic_no": "match-action-tabeller",
                "topic_en": "match-action tables",
                "answer_no": "Match-action-regler bestemmer hvordan pakker behandles basert på headerfelter.",
                "answer_en": "Match-action rules determine packet handling based on header fields.",
            },
            {
                "topic_no": "OpenFlow-lignende southbound API",
                "topic_en": "an OpenFlow-like southbound API",
                "answer_no": "Southbound-grensesnitt lar kontrolleren installere og oppdatere regler i svitsjer/rutere.",
                "answer_en": "A southbound interface lets the controller install and update rules in switches/routers.",
            },
            {
                "topic_no": "dataplan versus kontrollplan",
                "topic_en": "data plane versus control plane",
                "answer_no": "Dataplanet videresender pakker, mens kontrollplanet beregner reglene dataplanet følger.",
                "answer_en": "The data plane forwards packets, while the control plane computes the rules it follows.",
            },
            {
                "topic_no": "ping og ICMP echo",
                "topic_en": "ping and ICMP echo",
                "answer_no": "Ping tester nåbarhet ved å sende ICMP echo request og måle tiden til echo reply.",
                "answer_en": "Ping tests reachability by sending ICMP echo requests and timing echo replies.",
            },
            {
                "topic_no": "traceroute og TTL",
                "topic_en": "traceroute and TTL",
                "answer_no": "Traceroute bruker stigende TTL for å få svar fra hver ruter langs veien.",
                "answer_en": "Traceroute uses increasing TTL values to elicit replies from each hop along the path.",
            },
            {
                "topic_no": "flooding av link-state annonser",
                "topic_en": "flooding of link-state advertisements",
                "answer_no": "Flooding sprer topologiendringer raskt slik at alle rutere kan rekalkulere konsekvent.",
                "answer_en": "Flooding distributes topology changes quickly so all routers can recompute consistently.",
            },
            {
                "topic_no": "sekvensnummer i LSAs",
                "topic_en": "LSA sequence numbers",
                "answer_no": "Sekvensnummer og alder hindrer at gamle link-state-meldinger overskriver nye.",
                "answer_en": "Sequence numbers and age prevent stale link-state messages from overriding fresh ones.",
            },
            {
                "topic_no": "hierarkisk ruting",
                "topic_en": "hierarchical routing",
                "answer_no": "Hierarki reduserer kontrollplane-skala ved å dele nettet i administrative områder.",
                "answer_en": "Hierarchy improves control-plane scalability by dividing networks into administrative regions.",
            },
            {
                "topic_no": "hot-potato-ruting",
                "topic_en": "hot-potato routing",
                "answer_no": "Et AS sender ofte trafikk ut ved nærmeste utgang for å minimere intern transportkostnad.",
                "answer_en": "An AS often exits traffic at the nearest egress to minimize internal transport cost.",
            },
            {
                "topic_no": "rutinginstabilitet",
                "topic_en": "routing instability",
                "answer_no": "Konfliktende policyer og raske endringer kan gi oscillering og midlertidig ustabile ruter.",
                "answer_en": "Conflicting policies and rapid changes can cause oscillations and temporary route instability.",
            },
            {
                "topic_no": "rask feilrespons i kontrollplanet",
                "topic_en": "fast failure response in the control plane",
                "answer_no": "Hurtig deteksjon og rekonvergens etter feil reduserer nedetid og pakketap.",
                "answer_en": "Fast failure detection and reconvergence reduce downtime and packet loss.",
            },
        ],
        6: [
            {
                "topic_no": "framing i lenkelaget",
                "topic_en": "link-layer framing",
                "answer_no": "Lenkelaget kapsler nettverkslagspakker i rammer med lokale adresse- og kontrollfelt.",
                "answer_en": "The link layer encapsulates network-layer packets into frames with local address and control fields.",
            },
            {
                "topic_no": "medietilgang på delt kanal",
                "topic_en": "medium access on a shared channel",
                "answer_no": "MAC-protokoller bestemmer hvem som får sende når flere noder deler samme medium.",
                "answer_en": "MAC protocols determine who may transmit when multiple nodes share the medium.",
            },
            {
                "topic_no": "CRC-feildeteksjon",
                "topic_en": "CRC error detection",
                "answer_no": "CRC oppdager enkeltfeil og mange burstfeil med høy sannsynlighet.",
                "answer_en": "CRC detects single-bit and many burst errors with high probability.",
            },
            {
                "topic_no": "MAC-adresser",
                "topic_en": "MAC addresses",
                "answer_no": "MAC-adresser er 48-bit identifikatorer brukt for lokal levering på lenken.",
                "answer_en": "MAC addresses are 48-bit identifiers used for local link delivery.",
            },
            {
                "topic_no": "ARP-request",
                "topic_en": "an ARP request",
                "answer_no": "ARP-request sendes som broadcast når avsender mangler MAC-adressen til målet.",
                "answer_en": "An ARP request is broadcast when the sender lacks the destination MAC address.",
            },
            {
                "topic_no": "svitsjens læringstabell",
                "topic_en": "a switch learning table",
                "answer_no": "Svitsjen lærer kilde-MAC mot inngangsport ved å observere innkommende rammer.",
                "answer_en": "A switch learns source-MAC-to-port mappings by observing incoming frames.",
            },
            {
                "topic_no": "flooding ved ukjent destinasjon",
                "topic_en": "flooding for unknown destinations",
                "answer_no": "Når destinasjons-MAC er ukjent, kopierer svitsjen rammen til alle andre porter.",
                "answer_en": "When destination MAC is unknown, the switch floods the frame out all other ports.",
            },
            {
                "topic_no": "hub versus svitsj",
                "topic_en": "a hub versus a switch",
                "answer_no": "En hub gjentar signal til alle porter, mens en svitsj videresender selektivt.",
                "answer_en": "A hub repeats signals to all ports, while a switch forwards selectively.",
            },
            {
                "topic_no": "kollisjonsdomener",
                "topic_en": "collision domains",
                "answer_no": "Svitsjer splitter kollisjonsdomener per port, noe som øker effektiv kapasitet.",
                "answer_en": "Switches split collision domains per port, increasing effective capacity.",
            },
            {
                "topic_no": "CSMA/CD",
                "topic_en": "CSMA/CD",
                "answer_no": "CSMA/CD lytter før sending, oppdager kollisjon, stopper og prøver igjen senere.",
                "answer_en": "CSMA/CD senses before transmit, detects collisions, stops, and retries later.",
            },
            {
                "topic_no": "jam-signal ved Ethernet-kollisjon",
                "topic_en": "the jam signal on Ethernet collision",
                "answer_no": "Jam-signalet varsler andre noder om kollisjonen slik at alle avbryter sending.",
                "answer_en": "The jam signal informs other nodes of the collision so all transmitters abort.",
            },
            {
                "topic_no": "binary exponential backoff",
                "topic_en": "binary exponential backoff",
                "answer_no": "Etter hver kollisjon velges ventetid tilfeldig fra et større tidsvindu for å spre forsøk.",
                "answer_en": "After each collision, waiting time is chosen from a growing random window to spread retries.",
            },
            {
                "topic_no": "minimum Ethernet-rammestørrelse",
                "topic_en": "the minimum Ethernet frame size",
                "answer_no": "Minimum 64 byte sikrer at kollisjon kan oppdages før en ramme er ferdig sendt.",
                "answer_en": "A 64-byte minimum ensures collisions can be detected before a frame finishes transmission.",
            },
            {
                "topic_no": "full-dupleks Ethernet",
                "topic_en": "full-duplex Ethernet",
                "answer_no": "I full-dupleks punkt-til-punkt Ethernet oppstår ikke kollisjoner, så CSMA/CD er unødvendig.",
                "answer_en": "In full-duplex point-to-point Ethernet, collisions do not occur, so CSMA/CD is unnecessary.",
            },
            {
                "topic_no": "VLAN",
                "topic_en": "VLANs",
                "answer_no": "VLAN deler ett fysisk svitsjenett i flere logiske broadcast-domener.",
                "answer_en": "VLANs divide one physical switched network into multiple logical broadcast domains.",
            },
            {
                "topic_no": "hvorfor WiFi bruker CSMA/CA",
                "topic_en": "why WiFi uses CSMA/CA",
                "answer_no": "WiFi kan ikke pålitelig oppdage kollisjoner under sending og prøver derfor å unngå dem.",
                "answer_en": "WiFi cannot reliably detect collisions while transmitting and therefore tries to avoid them.",
            },
            {
                "topic_no": "ACK i 802.11",
                "topic_en": "802.11 link-layer ACKs",
                "answer_no": "WiFi bruker linklags-ACK og retransmisjon for å håndtere høyere radiofeilrate.",
                "answer_en": "WiFi uses link-layer ACKs and retransmissions to handle higher radio error rates.",
            },
            {
                "topic_no": "slotted ALOHA-effektivitet",
                "topic_en": "slotted ALOHA efficiency",
                "answer_no": "Maksimal gjennomstrømningsandel i slotted ALOHA er 1/e under ideelle antakelser.",
                "answer_en": "Maximum throughput fraction for slotted ALOHA is 1/e under ideal assumptions.",
            },
            {
                "topic_no": "pure ALOHA-effektivitet",
                "topic_en": "pure ALOHA efficiency",
                "answer_no": "Pure ALOHA har lavere maksimal effektivitet (1/2e) enn slotted ALOHA.",
                "answer_en": "Pure ALOHA has lower maximum efficiency (1/2e) than slotted ALOHA.",
            },
            {
                "topic_no": "broadcast-MAC-adressen",
                "topic_en": "the broadcast MAC address",
                "answer_no": "ff:ff:ff:ff:ff:ff betyr at rammen skal leveres til alle noder på lokal lenke.",
                "answer_en": "ff:ff:ff:ff:ff:ff means the frame should be delivered to all nodes on the local link.",
            },
            {
                "topic_no": "aging i svitsjtabeller",
                "topic_en": "switch table aging",
                "answer_no": "Lærte MAC-oppføringer utløper etter inaktivitet for å håndtere topologiske endringer.",
                "answer_en": "Learned MAC entries age out after inactivity to handle topology changes.",
            },
            {
                "topic_no": "Spanning Tree i Ethernet",
                "topic_en": "Spanning Tree in Ethernet",
                "answer_no": "Spanning Tree blokkerer utvalgte lenker logisk for å hindre lag-2-løkker.",
                "answer_en": "Spanning Tree logically blocks selected links to prevent layer-2 loops.",
            },
            {
                "topic_no": "Ethernet-rammens felt",
                "topic_en": "Ethernet frame fields",
                "answer_no": "En Ethernet-ramme inneholder blant annet destinasjon, kilde, type/length, payload og FCS.",
                "answer_en": "An Ethernet frame includes destination, source, type/length, payload, and FCS.",
            },
            {
                "topic_no": "Ethernet MTU",
                "topic_en": "Ethernet MTU",
                "answer_no": "Standard Ethernet MTU er typisk 1500 byte IP-payload før fragmentering vurderes.",
                "answer_en": "Standard Ethernet MTU is typically 1500 bytes of IP payload before fragmentation is considered.",
            },
            {
                "topic_no": "lokal retransmisjon i lenkelaget",
                "topic_en": "local retransmission at the link layer",
                "answer_no": "Lenkelagsretransmisjon kan skjule enkelte feil fra transportlaget og forbedre opplevd ytelse.",
                "answer_en": "Link-layer retransmissions can hide some losses from transport and improve perceived performance.",
            },
        ],
        7: [
            {
                "topic_no": "forholdet mellom trådløshet og mobilitet",
                "topic_en": "the relation between wireless and mobility",
                "answer_no": "Trådløshet beskriver overføringsmedium, mens mobilitet beskriver bevegelse mellom tilgangspunkter.",
                "answer_en": "Wireless describes the transmission medium, while mobility describes movement across attachment points.",
            },
            {
                "topic_no": "støy og fading i radiolinker",
                "topic_en": "noise and fading in radio links",
                "answer_no": "Interferens, fading og lav SNR øker bitfeilrate og krever robuste MAC-/PHY-mekanismer.",
                "answer_en": "Interference, fading, and low SNR increase bit error rate and require robust MAC/PHY mechanisms.",
            },
            {
                "topic_no": "skjult terminal-problemet",
                "topic_en": "the hidden terminal problem",
                "answer_no": "To sendere kan være utenfor hverandres rekkevidde, men kollidere hos samme mottaker.",
                "answer_en": "Two transmitters may be out of range of each other yet collide at the same receiver.",
            },
            {
                "topic_no": "eksponert terminal-problemet",
                "topic_en": "the exposed terminal problem",
                "answer_no": "En node kan unødvendig tie fordi den hører en sender som ikke faktisk forstyrrer dens egen mottaker.",
                "answer_en": "A node may stay silent unnecessarily after hearing a transmitter that would not interfere at its receiver.",
            },
            {
                "topic_no": "RTS/CTS",
                "topic_en": "RTS/CTS",
                "answer_no": "RTS/CTS reserverer kanal før datasending og reduserer kollisjoner fra skjulte terminaler.",
                "answer_en": "RTS/CTS reserves the channel before data transmission and reduces hidden-terminal collisions.",
            },
            {
                "topic_no": "802.11-assosiering",
                "topic_en": "802.11 association",
                "answer_no": "En klient må assosiere med et access point før normal datatrafikk kan sendes.",
                "answer_en": "A client must associate with an access point before regular data transfer can begin.",
            },
            {
                "topic_no": "beacon-rammer",
                "topic_en": "beacon frames",
                "answer_no": "Access points sender beacons som annonserer SSID, kanal og timing-informasjon.",
                "answer_en": "Access points send beacons advertising SSID, channel, and timing information.",
            },
            {
                "topic_no": "tilfeldig backoff i WiFi",
                "topic_en": "random backoff in WiFi",
                "answer_no": "CSMA/CA bruker tilfeldig backoff for å redusere sannsynlighet for samtidig sending.",
                "answer_en": "CSMA/CA uses random backoff to reduce the probability of simultaneous transmission.",
            },
            {
                "topic_no": "kanalplan i 2.4 GHz WiFi",
                "topic_en": "channel planning in 2.4 GHz WiFi",
                "answer_no": "Kanalene 1, 6 og 11 brukes ofte for minimal overlapp og mindre interferens.",
                "answer_en": "Channels 1, 6, and 11 are commonly used to minimize overlap and interference.",
            },
            {
                "topic_no": "WiFi-handover",
                "topic_en": "WiFi handover",
                "answer_no": "Handover innebærer skanning, valg av nytt AP og re-assosiering med minst mulig avbrudd.",
                "answer_en": "Handover involves scanning, selecting a new AP, and reassociating with minimal interruption.",
            },
            {
                "topic_no": "cellestruktur i mobilnett",
                "topic_en": "cell structure in cellular networks",
                "answer_no": "Mobilnett deler dekning i celler for frekvensgjenbruk og høyere total kapasitet.",
                "answer_en": "Cellular systems divide coverage into cells to enable frequency reuse and higher total capacity.",
            },
            {
                "topic_no": "planlagt tilgang i mobil uplink",
                "topic_en": "scheduled access in cellular uplink",
                "answer_no": "Basestasjonen planlegger ressurser slik at terminaler får koordinerte tids-/frekvensblokker.",
                "answer_en": "The base station schedules resources so user devices transmit in coordinated time/frequency blocks.",
            },
            {
                "topic_no": "arkitektur i 4G/5G-kjernenett",
                "topic_en": "4G/5G core architecture",
                "answer_no": "Kjernenett skiller brukerplan og kontrollplan for skalerbar mobilitet og tjenestestyring.",
                "answer_en": "The core separates user and control planes for scalable mobility and service control.",
            },
            {
                "topic_no": "FR1 kontra FR2",
                "topic_en": "FR1 versus FR2",
                "answer_no": "FR1 gir bedre dekning, mens FR2 (mmWave) gir høyere kapasitet men kortere rekkevidde.",
                "answer_en": "FR1 offers better coverage, while FR2 (mmWave) offers higher capacity but shorter range.",
            },
            {
                "topic_no": "mmWave-utfordringer",
                "topic_en": "mmWave challenges",
                "answer_no": "mmWave blokkeres lett av objekter og krever tett nett av småceller og stråleforming.",
                "answer_en": "mmWave is easily blocked and requires dense small-cell deployment and beamforming.",
            },
            {
                "topic_no": "MIMO og beamforming",
                "topic_en": "MIMO and beamforming",
                "answer_no": "Flere antenner muliggjør spatial multiplexing og målrettede stråler for høyere spektral effektivitet.",
                "answer_en": "Multiple antennas enable spatial multiplexing and directed beams for higher spectral efficiency.",
            },
            {
                "topic_no": "mobilitetshåndtering",
                "topic_en": "mobility management",
                "answer_no": "Mobilitetshåndtering flytter tilkobling mellom basestasjoner uten å bryte aktive sesjoner unødig.",
                "answer_en": "Mobility management moves connections between base stations without unnecessarily breaking sessions.",
            },
            {
                "topic_no": "GTP-tunneler",
                "topic_en": "GTP tunnels",
                "answer_no": "GTP kapsler brukertrafikk mellom mobilnoder slik at enhetens IP kan holdes stabil under handover.",
                "answer_en": "GTP encapsulates user traffic between mobile nodes so device IP can remain stable during handover.",
            },
            {
                "topic_no": "roaming mellom operatører",
                "topic_en": "roaming between operators",
                "answer_no": "Roaming krever autentisering, policy og avregning mellom besøkt og hjemmenett.",
                "answer_en": "Roaming requires authentication, policy, and billing coordination between visited and home networks.",
            },
            {
                "topic_no": "effekten av sendeeffektkontroll",
                "topic_en": "the effect of transmit power control",
                "answer_no": "Effektkontroll reduserer interferens, forbedrer kapasitet og sparer batteri i terminalen.",
                "answer_en": "Power control reduces interference, improves capacity, and saves device battery.",
            },
            {
                "topic_no": "hvorfor kollisjonsdeteksjon er vanskelig i radio",
                "topic_en": "why collision detection is hard in radio",
                "answer_no": "Eget sendesignal dominerer mottakskjeden, så samtidige kollisjoner er vanskelige å høre direkte.",
                "answer_en": "A transmitter's own signal dominates its receiver, making direct collision detection difficult.",
            },
            {
                "topic_no": "småceller og kapasitetsøkning",
                "topic_en": "small cells and capacity growth",
                "answer_no": "Småceller øker kapasitet gjennom tettere frekvensgjenbruk over mindre geografiske områder.",
                "answer_en": "Small cells increase capacity via denser frequency reuse over smaller areas.",
            },
            {
                "topic_no": "latenskrav ved handover",
                "topic_en": "handover latency requirements",
                "answer_no": "Lav handover-latens er kritisk for tale, gaming og andre sanntidsapplikasjoner.",
                "answer_en": "Low handover latency is critical for voice, gaming, and other real-time applications.",
            },
            {
                "topic_no": "WiFi kontra mobilnett tilgangsstyring",
                "topic_en": "WiFi versus cellular access control",
                "answer_no": "WiFi er mer distribuert og konkurransebasert, mens mobilnett i større grad er sentralt planlagt.",
                "answer_en": "WiFi is more distributed and contention-based, while cellular access is more centrally scheduled.",
            },
            {
                "topic_no": "tap på radiolink",
                "topic_en": "loss behavior on radio links",
                "answer_no": "Radiotap kommer ofte i burst, noe som påvirker kodingsvalg, interleaving og retransmisjonsstrategi.",
                "answer_en": "Radio losses are often bursty, affecting coding choices, interleaving, and retransmission strategy.",
            },
        ],
        8: [
            {
                "topic_no": "CIA-triaden",
                "topic_en": "the CIA triad",
                "answer_no": "Konfidensialitet, integritet og tilgjengelighet er grunnmålene i informasjonssikkerhet.",
                "answer_en": "Confidentiality, integrity, and availability are the foundational goals of information security.",
            },
            {
                "topic_no": "symmetrisk kryptering",
                "topic_en": "symmetric encryption",
                "answer_no": "Symmetrisk kryptering er rask og egnet for store datamengder med delt hemmelig nøkkel.",
                "answer_en": "Symmetric encryption is fast and suitable for bulk data with a shared secret key.",
            },
            {
                "topic_no": "asymmetrisk kryptering",
                "topic_en": "asymmetric encryption",
                "answer_no": "Asymmetrisk kryptografi bruker nøkkelpar og er nyttig for nøkkeldeling og signaturer.",
                "answer_en": "Asymmetric cryptography uses key pairs and is useful for key exchange and signatures.",
            },
            {
                "topic_no": "hybrid kryptering",
                "topic_en": "hybrid encryption",
                "answer_no": "Hybridoppsett bruker asymmetri til nøkkelutveksling og symmetri til selve datakrypteringen.",
                "answer_en": "Hybrid schemes use asymmetric methods for key exchange and symmetric methods for data encryption.",
            },
            {
                "topic_no": "AES",
                "topic_en": "AES",
                "answer_no": "AES er en symmetrisk blokk-krypteringsalgoritme som brukes bredt i moderne protokoller.",
                "answer_en": "AES is a symmetric block cipher used widely in modern protocols.",
            },
            {
                "topic_no": "RSA/ECC-nøkler",
                "topic_en": "RSA/ECC keys",
                "answer_no": "Private nøkkel holdes hemmelig, mens offentlig nøkkel kan deles for verifisering og nøkkelavtale.",
                "answer_en": "The private key remains secret, while the public key can be shared for verification and key agreement.",
            },
            {
                "topic_no": "hashfunksjoner",
                "topic_en": "hash functions",
                "answer_no": "En kryptografisk hash gir et kort fingeravtrykk som endres dramatisk ved små inputendringer.",
                "answer_en": "A cryptographic hash gives a short fingerprint that changes dramatically with tiny input changes.",
            },
            {
                "topic_no": "MAC (Message Authentication Code)",
                "topic_en": "a Message Authentication Code (MAC)",
                "answer_no": "MAC gir integritet og autentisering mellom parter som deler en hemmelig nøkkel.",
                "answer_en": "A MAC provides integrity and authentication between parties sharing a secret key.",
            },
            {
                "topic_no": "digitale signaturer",
                "topic_en": "digital signatures",
                "answer_no": "Digitale signaturer gir verifiserbar avsenderautentisering og ikke-benektbarhet.",
                "answer_en": "Digital signatures provide verifiable sender authentication and non-repudiation.",
            },
            {
                "topic_no": "sertifikater og CA",
                "topic_en": "certificates and CAs",
                "answer_no": "Et sertifikat binder identitet til offentlig nøkkel via en signatur fra en betrodd CA.",
                "answer_en": "A certificate binds identity to a public key through a signature from a trusted CA.",
            },
            {
                "topic_no": "TLS-handshake",
                "topic_en": "the TLS handshake",
                "answer_no": "TLS-handshake etablerer kryptoparametre og felles sesjonsnøkler før applikasjonsdata sendes.",
                "answer_en": "The TLS handshake establishes crypto parameters and shared session keys before application data is sent.",
            },
            {
                "topic_no": "sesjonsnøkler",
                "topic_en": "session keys",
                "answer_no": "Sesjonsnøkler er kortlivede nøkler brukt for effektiv kryptering av en enkelt forbindelse.",
                "answer_en": "Session keys are short-lived keys used for efficient encryption of one connection.",
            },
            {
                "topic_no": "Perfect Forward Secrecy",
                "topic_en": "Perfect Forward Secrecy",
                "answer_no": "PFS gjør at kompromittering av langsiktig nøkkel ikke avslører gamle sesjoner.",
                "answer_en": "PFS ensures compromise of long-term keys does not reveal past sessions.",
            },
            {
                "topic_no": "saltede passordhasher",
                "topic_en": "salted password hashes",
                "answer_no": "Salt hindrer at like passord får lik hash og svekker effekt av precomputed tabeller.",
                "answer_en": "Salts prevent equal passwords from producing equal hashes and weaken precomputed-table attacks.",
            },
            {
                "topic_no": "stateless pakkefiltrering",
                "topic_en": "stateless packet filtering",
                "answer_no": "Stateless filtrering matcher pakker mot regler uten kontekst om tidligere pakker i flyten.",
                "answer_en": "Stateless filtering matches packets against rules without flow history context.",
            },
            {
                "topic_no": "stateful brannmur",
                "topic_en": "stateful firewalls",
                "answer_no": "Stateful brannmur holder tilstand på forbindelser og kan tillate returtrafikk dynamisk.",
                "answer_en": "A stateful firewall tracks connection state and can dynamically permit return traffic.",
            },
            {
                "topic_no": "IDS kontra IPS",
                "topic_en": "IDS versus IPS",
                "answer_no": "IDS detekterer og varsler, mens IPS kan gripe inn og blokkere mistenkelig trafikk.",
                "answer_en": "IDS detects and alerts, while IPS can actively block suspicious traffic.",
            },
            {
                "topic_no": "DDoS-mekanismen",
                "topic_en": "the DDoS mechanism",
                "answer_no": "DDoS bruker mange distribuerte kilder for å overbelaste mål og vanskeliggjøre filtrering.",
                "answer_en": "DDoS uses many distributed sources to overload targets and make filtering harder.",
            },
            {
                "topic_no": "phishing",
                "topic_en": "phishing",
                "answer_no": "Phishing manipulerer brukere til å avsløre hemmeligheter via troverdige, men falske meldinger/sider.",
                "answer_en": "Phishing manipulates users into revealing secrets via convincing but fake messages/sites.",
            },
            {
                "topic_no": "man-in-the-middle-angrep",
                "topic_en": "man-in-the-middle attacks",
                "answer_no": "MITM plasserer angriper i trafikkbanen for avlytting, endring eller injeksjon av data.",
                "answer_en": "MITM places an attacker in the traffic path for eavesdropping, modification, or injection.",
            },
            {
                "topic_no": "replay-angrep",
                "topic_en": "replay attacks",
                "answer_no": "I replay gjenbrukes gyldige meldinger senere for å lure systemet til å akseptere gammel handling.",
                "answer_en": "Replay attacks reuse valid messages later to trick systems into accepting stale actions.",
            },
            {
                "topic_no": "nonces og tidsstempler",
                "topic_en": "nonces and timestamps",
                "answer_no": "Unike nonces/tidsstempler gjør meldinger ferske og reduserer replay-risiko.",
                "answer_en": "Unique nonces/timestamps provide freshness and reduce replay risk.",
            },
            {
                "topic_no": "DNS-spoofing",
                "topic_en": "DNS spoofing",
                "answer_no": "DNS-spoofing forsøker å få klienter til å slå opp feil IP og dermed kontakte angriperstyrte mål.",
                "answer_en": "DNS spoofing tries to make clients resolve wrong IPs and contact attacker-controlled targets.",
            },
            {
                "topic_no": "minste privilegium",
                "topic_en": "least privilege",
                "answer_no": "Minste privilegium begrenser tilgang til det som er nødvendig og reduserer skadeomfang ved kompromiss.",
                "answer_en": "Least privilege restricts access to what is necessary and limits blast radius on compromise.",
            },
            {
                "topic_no": "defense in depth",
                "topic_en": "defense in depth",
                "answer_no": "Flere uavhengige sikkerhetslag gjør systemet robust selv om ett kontrollpunkt svikter.",
                "answer_en": "Multiple independent security layers keep systems resilient even if one control fails.",
            },
        ],
        9: [
            {
                "topic_no": "forskjellen mellom streaming og full nedlasting",
                "topic_en": "the difference between streaming and full download",
                "answer_no": "Streaming starter avspilling før hele filen er mottatt ved å bruke fortløpende buffring.",
                "answer_en": "Streaming starts playback before the full file is received by using continuous buffering.",
            },
            {
                "topic_no": "playout-bufferens rolle",
                "topic_en": "the role of the playout buffer",
                "answer_no": "Playout-buffer glatter ut ujevn pakkeankomst slik at avspilling blir jevnere.",
                "answer_en": "The playout buffer smooths uneven packet arrivals to keep playback steady.",
            },
            {
                "topic_no": "tradeoff ved større buffer",
                "topic_en": "the tradeoff of a larger buffer",
                "answer_no": "Større buffer tåler mer jitter, men øker opplevd ende-til-ende-forsinkelse.",
                "answer_en": "A larger buffer tolerates more jitter but increases end-to-end delay.",
            },
            {
                "topic_no": "hva jitter betyr",
                "topic_en": "what jitter means",
                "answer_no": "Jitter er variasjon i pakkeforsinkelse, ikke nødvendigvis høy gjennomsnittsforsinkelse.",
                "answer_en": "Jitter is variation in packet delay, not necessarily high average delay.",
            },
            {
                "topic_no": "DASH-klientens bitratevalg",
                "topic_en": "DASH client bitrate selection",
                "answer_no": "DASH-klienten velger segmentkvalitet dynamisk basert på nettmålinger og bufferfylling.",
                "answer_en": "A DASH client selects segment quality dynamically based on network measurements and buffer level.",
            },
            {
                "topic_no": "segmentlengde i adaptiv video",
                "topic_en": "segment length in adaptive video",
                "answer_no": "Kortere segmenter gir raskere tilpasning, men høyere protokoll- og request-overhead.",
                "answer_en": "Shorter segments adapt faster but increase protocol and request overhead.",
            },
            {
                "topic_no": "CDN for multimedia",
                "topic_en": "CDNs for multimedia",
                "answer_no": "CDN reduserer forsinkelse og backbone-belastning ved å servere media fra nære edge-noder.",
                "answer_en": "A CDN reduces delay and backbone load by serving media from nearby edge nodes.",
            },
            {
                "topic_no": "RTP-sekvensnummer",
                "topic_en": "RTP sequence numbers",
                "answer_no": "RTP-sekvensnumre brukes til å oppdage tap og håndtere omrekkefølge i mottakeren.",
                "answer_en": "RTP sequence numbers are used to detect loss and handle reordering at the receiver.",
            },
            {
                "topic_no": "RTP-tidsstempel",
                "topic_en": "RTP timestamps",
                "answer_no": "RTP-tidsstempel hjelper mottakeren å plassere mediedata riktig i tidslinjen.",
                "answer_en": "RTP timestamps help receivers place media correctly on the playback timeline.",
            },
            {
                "topic_no": "RTCP-tilbakemelding",
                "topic_en": "RTCP feedback",
                "answer_no": "RTCP rapporterer kvalitetsmål som tap og jitter for adaptiv styring av strømmen.",
                "answer_en": "RTCP reports quality metrics such as loss and jitter for adaptive stream control.",
            },
            {
                "topic_no": "forsinkelsesgrense for naturlig tale",
                "topic_en": "delay bounds for natural voice conversation",
                "answer_no": "Rundt under 150 ms oppleves samtale som naturlig; større forsinkelse gjør dialog vanskeligere.",
                "answer_en": "Roughly below 150 ms feels natural for conversation; higher delay makes dialogue harder.",
            },
            {
                "topic_no": "hva som skjer over 400 ms taleforsinkelse",
                "topic_en": "what happens beyond 400 ms voice delay",
                "answer_no": "Ved svært høy forsinkelse begynner deltakere å snakke i munnen på hverandre og opplever dårlig flyt.",
                "answer_en": "At very high delay, participants talk over each other and conversation flow degrades.",
            },
            {
                "topic_no": "hvorfor UDP ofte brukes for sanntidsmedia",
                "topic_en": "why UDP is often used for real-time media",
                "answer_no": "UDP unngår retransmisjonslatens og lar applikasjonen styre taps- og tidsstrategi direkte.",
                "answer_en": "UDP avoids retransmission latency and lets applications directly control loss-time tradeoffs.",
            },
            {
                "topic_no": "ulempe med TCP for live media",
                "topic_en": "a drawback of TCP for live media",
                "answer_no": "TCP-retransmisjoner og head-of-line blocking kan øke latenstid uakseptabelt for liveinnhold.",
                "answer_en": "TCP retransmissions and head-of-line blocking can add unacceptable delay to live media.",
            },
            {
                "topic_no": "FEC i mediestrømmer",
                "topic_en": "FEC in media streams",
                "answer_no": "FEC legger til redundans slik at mottaker kan rekonstruere tapte pakker uten retransmisjon.",
                "answer_en": "FEC adds redundancy so receivers can recover losses without retransmission.",
            },
            {
                "topic_no": "interleaving",
                "topic_en": "interleaving",
                "answer_no": "Interleaving sprer bursttap over tid slik at feil blir mindre hørbare/synlige.",
                "answer_en": "Interleaving spreads burst losses over time so impairments are less noticeable.",
            },
            {
                "topic_no": "QoE-faktorer i video",
                "topic_en": "video QoE factors",
                "answer_no": "Oppstartstid, rebuffering, bildekvalitet og kvalitetsbytter påvirker brukeropplevelse mest.",
                "answer_en": "Startup time, rebuffering, visual quality, and quality switches strongly affect user experience.",
            },
            {
                "topic_no": "adaptiv bitrate ved dårlig nett",
                "topic_en": "adaptive bitrate under poor networks",
                "answer_no": "Ved redusert kapasitet bør klienten senke bitrate tidlig for å unngå avspillingsstopp.",
                "answer_en": "When capacity drops, the client should lower bitrate early to avoid playback stalls.",
            },
            {
                "topic_no": "lavlatens live-streaming",
                "topic_en": "low-latency live streaming",
                "answer_no": "Lavlatensoppsett bruker mindre buffere og kortere segmenter, men tåler mindre nettverksvariasjon.",
                "answer_en": "Low-latency setups use smaller buffers and shorter segments but tolerate less network variation.",
            },
            {
                "topic_no": "I/P/B-rammer i videokoding",
                "topic_en": "I/P/B frames in video coding",
                "answer_no": "I-rammer gir referansepunkter, mens P/B-rammer øker komprimering ved prediksjon over tid.",
                "answer_en": "I-frames provide reference points, while P/B-frames improve compression via temporal prediction.",
            },
            {
                "topic_no": "keyframe-intervall",
                "topic_en": "keyframe interval",
                "answer_no": "Kortere keyframe-intervall forbedrer seek og robusthet, men krever mer bitrate.",
                "answer_en": "A shorter keyframe interval improves seeking and robustness but requires more bitrate.",
            },
            {
                "topic_no": "lip-sync",
                "topic_en": "lip-sync",
                "answer_no": "Lyd og bilde må synkroniseres med tidsstempler og klokkehåndtering for naturlig avspilling.",
                "answer_en": "Audio and video must be synchronized with timestamps and clock handling for natural playback.",
            },
            {
                "topic_no": "multicast i distribusjonsnett",
                "topic_en": "multicast in distribution networks",
                "answer_no": "Multicast kan skalere én-til-mange effektivt der infrastrukturen støtter det.",
                "answer_en": "Multicast can scale one-to-many efficiently where infrastructure supports it.",
            },
            {
                "topic_no": "hvorfor OTT ofte bruker unicast",
                "topic_en": "why OTT often uses unicast",
                "answer_no": "Unicast fungerer over dagens internett uten global multicast-støtte i mellomnett.",
                "answer_en": "Unicast works across today's Internet without requiring global multicast support.",
            },
            {
                "topic_no": "pacing og overbelastningskontroll i medieavspilling",
                "topic_en": "pacing and congestion control in media delivery",
                "answer_no": "Jevn utsending og købevisst styring reduserer burst, tap og varians i mottak.",
                "answer_en": "Smooth pacing and congestion-aware control reduce bursts, loss, and arrival variance.",
            },
        ],
    }


def prompt_for(lang, diff, topic):
    if lang == "no":
        templates = {
            "L": "Hva beskriver best {}?",
            "M": "Hvilken påstand er mest korrekt om {} i praksis?",
            "H": "I et større nettverk, hvilken vurdering om {} er faglig best?",
        }
    else:
        templates = {
            "L": "Which statement best describes {}?",
            "M": "In practice, which statement about {} is most correct?",
            "H": "In a larger network setting, which evaluation of {} is most accurate?",
        }
    return templates[diff].format(topic)


def pick_distractor_indices(n, i):
    offsets = [7, 13, 19, 5, 11, 17, 3]
    picked = []
    for off in offsets:
        idx = (i + off) % n
        if idx != i and idx not in picked:
            picked.append(idx)
        if len(picked) == 3:
            break
    if len(picked) < 3:
        for idx in range(n):
            if idx != i and idx not in picked:
                picked.append(idx)
            if len(picked) == 3:
                break
    return picked


def render_quiz_section(chapter_num, lang, facts):
    if lang == "no":
        title = "Test deg selv"
        intro = "Sjekk om du har forstått de viktigste konseptene fra dette kapittelet."
        tag_map = NO_TAG
        q_label_prefix = "Spørsmål"
        reveal_label = "Se svar"
    else:
        title = "Test yourself"
        intro = "Check whether you have understood the most important concepts from this chapter."
        tag_map = EN_TAG
        q_label_prefix = "Question"
        reveal_label = "Show answer"

    n = len(facts)
    if n != 25:
        raise ValueError(f"Chapter {chapter_num} has {n} facts, expected 25.")

    blocks = []
    for i, fact in enumerate(facts):
        diff = DIFF_SEQUENCE[i]
        topic = fact["topic_no"] if lang == "no" else fact["topic_en"]
        correct = fact["answer_no"] if lang == "no" else fact["answer_en"]
        q_text = prompt_for(lang, diff, topic)
        q_label = f"{q_label_prefix} {i + 1} · {tag_map[diff]}"

        block = [
            '  <div class="quiz" data-quiz>',
            f'    <div class="q-label">{html.escape(q_label)}</div>',
            f'    <div class="q-text">{html.escape(q_text)}</div>',
            '    <div class="quiz-reveal">',
            f'      <button class="reveal-btn">{html.escape(reveal_label)}</button>',
            f'      <div class="answer">{html.escape(correct)}</div>',
            "    </div>",
            "  </div>",
            "",
        ]
        blocks.append("\n".join(block))

    section = (
        '<section id="quiz">\n'
        '<div class="container">\n'
        f"  <h2>{html.escape(title)}</h2>\n"
        f'  <p class="section-intro">{html.escape(intro)}</p>\n\n'
        + "\n".join(blocks)
        + "</div>\n"
        "</section>"
    )
    return section


def replace_quiz_section(path, new_section):
    text = path.read_text(encoding="utf-8")
    pattern = re.compile(r"<section id=\"quiz\">.*?</section>", re.DOTALL)
    if not pattern.search(text):
        raise ValueError(f"No quiz section found in {path}")
    updated = pattern.sub(new_section, text, count=1)
    path.write_text(updated, encoding="utf-8", newline="\n")


def main():
    root = Path(__file__).resolve().parents[1]
    facts_by_chapter = chapter_facts()

    no_files = sorted(root.glob("kap*/index.html"))
    en_files = sorted(root.glob("en/kap*/index.html"))

    for path in no_files:
        chapter_num = int(path.parent.name.replace("kap", ""))
        if chapter_num not in facts_by_chapter:
            continue
        section = render_quiz_section(chapter_num, "no", facts_by_chapter[chapter_num])
        replace_quiz_section(path, section)

    for path in en_files:
        chapter_num = int(path.parent.name.replace("kap", ""))
        if chapter_num not in facts_by_chapter:
            continue
        section = render_quiz_section(chapter_num, "en", facts_by_chapter[chapter_num])
        replace_quiz_section(path, section)

    print("Quiz sections regenerated for configured chapters.")


if __name__ == "__main__":
    main()
