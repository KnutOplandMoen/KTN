Q1. (There are 45 correct choices out of 128) [65 points]
Q1.1 General (Chapter 1)
Q1.1.1 Circuit switching and packet switching have many differences. Which of the following is/are correct?
a) While a circuit-switched network can guarantee a certain amount of end-to-end bandwidth for the
duration of a call, typically packet-switched networks cannot.
b) Most packet-switched networks today (including the Internet) can make end-to-end guarantees for
bandwidth.
c) Typically, the delay variation among packets/messages in a circuit-switched network is smaller
than that in a packet-switched network.
d) The costs for dedicated resources in packet-switched network are usually higher than the costs for
resources in circuit-switched network.
e) In circuit-switched networks, the bandwidth is shared among the users and allocated only when
data needs to be transmitted. It has a better bandwidth efficiency than in packet-switched
networks.
Q1.1.2 Suppose there is exactly one packet switch between a sending host and a receiving host. The
transmission rates between the sending host and the switch and between the switch and the receiving host are
R1 and R2, respectively. If the switch uses store-and-forward packet switching, what is the total end-to-end
delay to send a packet of length L when queuing, propagation delay, and processing delay are ignored?
a) L/(R1+R2)
b) L/R1+L/R2
c) 2L/Max {R1, R2}
d) 2L/Min {R1, R2}
e) None of the above
Q1.1.3 Consider a client and a server connected through one router. Assume the router can start transmitting
an incoming packet after receiving its first 80 bytes instead of waiting for the whole packet. Suppose that the
link rates are 1000 byte/s and that the client transmits one packet with a size of 3000 bytes to the server. What
is correct for the end-to-end delay?
a) 3,808s
b) 3,800s
c) 3,008s
d) 3,080s
e) None of the above
Q1.1.4 Protocol Layering is commonly used in computer networks because:
a) It prevents network functionalities to be divided into separate layers, each with a
specific purpose.
b) Encapsulation is the most efficient way to transmit data.
c) It provides a simple design for implementation and maintenance but more
complication in network developments.
d) It keeps networks structured and enables them to communicate faster.
e) Protocol layering can accommodate future enhancements and changes.
Q.1.1.5 Consider sending P packets through a packet-switched network from source to destination. There
are N store-and-forward routers between the source and the destination. Each packet has a length of L bits.
4
Assume that all of the links in the network (e.g., the links between the source and the router, between the
routers, and between the router and the destination) have the same transmission rate of R bps. What is the
minimum end-to-end delay of sending P such packets back-to-back over the network? Ignore queuing,
processing, and propagation delays.
a) P*N*L/R
b) (N+P-1)*L/R
c) P*(N+1)*L/R
d) (N+P+2)*L/R
e) None of the above.
Q1.2 Application Layer and Transport Layer (Chapters 2 & 3)
Q1.2.1 Which of the following protocols is/are not an Application-Layer protocol?
a) Telnet (User Data Protocol)
b) TDM (Time Division Multiplexing)
c) SMTP (Simple Mail Transfer Protocol)
d) HTTP (Hypertext Transfer Protocol)
e) IMAP (Internet Message Access Protocol)
Q1.2.2 Web caching is normally set in between the clients (PCs in a university network) and an original
server (e.g., a commercial website server). Which of the following statements is/are correct about Web
caching?
a) It does not reduce the average delay for all objects.
b) Averagely, it reduces the delay only for the objects that are cached.
c) Potentially, it can reduce the average delay for all the objects, even objects that are
not cached.
d) It increases the average traffic on the links (implies the links between a client and the
original server)
e) It has a storage on its own disk, and it prevents from keeping copies of recently
requested objects in this storage.
Q1.2.3 Suppose a process in Host D has a UDP socket with a predefined port. Suppose Host A, Host B, and
Host C each wants to send a UDP segment to Host C. What is minimal number of sockets required for
sending those segments from Host A, B, and C to Host D?
a) One socket
b) Two sockets
c) Three sockets
d) More than three sockets
e) None of the above
Q1.2.4 Which of the following statement(s) is/are true?
a) SMTP uses UDP as its underlying transport protocol.
b) Both UDP and TCP do not provide reliable data transfer service.
c) UDP is a connection-oriented protocol.
d) Internet Telephony application (e.g. SIP) can use UDP or TCP.
e) FDM (Frequency Division Multiplexing) requires more sophisticated analog hardware to shift
5
signal into appropriate frequency bands than what TDM (Time Division Multiplexing) does.
Q1.2.5 Consider distributing a file of F=10 Gbits to N=100 peers using Client-Server architecture. The
server has an upload rate of us=1Gbps. Each peer has a download rate of di=200Mbps. What is the minimum
time to distribute this file to all the peers:
a) 50s
b) 5000s
c) 500s
d) 1000s
e) None of the above
Q1.3 Network Layer (Chapters 4&5)
Q1.3.1 Assign network addresses from 214.97.250/23 to a subnet that should have enough addresses to
support 250 interfaces. The assignment takes the form a.b.c/x. Which of the following is/are possible
correct subnet(s)?
a) 214.97.245/24
b) 214.97.251/24
c) 214.97.253/24
d) 214.97.254/24
e) 214.97.254/25
Q1.3.2 About DHCP (Dynamic Host Configuration Protocol), which of the following statement(s)
is/are false?
a) When an internet host arrives, it implements 4-step process with a DHCP server for
acquiring a new IP address.
b) DHCP uses TCP (Transmission Control Protocol) as its transport protocol.
c) DHCP provides dynamic IP address assignment to network clients.
d) DHCP is primarily used for routing data packets between networks.
e) DHCP servers can offer additional configuration parameters such as DNS server
addresses and subnet masks.
Q1.3.3 What is/are false about the Internet Control Message Protocol (ICMP)?
a) ICMP is not primarily used in the network layer.
b) ICMP is a supporting protocol in the Internet protocol suite.
c) ICMP provides functions like error reporting and network diagnosis.
d) ICMP messages are used not only for signaling error conditions.
e) ICMP is a transport protocol used for data exchange between devices on the network.
Q1.3.4 In FIFO (First Input First Output) service below, the upper timeline shows arrival times of packets,
and the lower timeline shows the start of timeslots where a packet is transmitted. Queuing delay for a packet
is the period between its arrival time and the beginning of the slot in which the packet is transmitted. One
example, packet 1 will be transmitted at the time of t=1, hence its delay is also 1. What is the average delay
6
for the next three packets (packets 2, 3, and 4)?
What is the average of this delay for the next 3 packets (packets 2, 3,4)?
a) 8/3s
b) 7/3s
c) 2s
d) 5/3s
e) Nove of the above
Q1.3.5 Consider the network below. Which of the following statements is/are true?
a) It is possible to configure forwarding table in router A, such that all traffic destined to host
H3 is forwarded through interface 3.
b) It is not possible to configure forwarding table in router A, such that all traffic destined to
host H3 is forwarded through interface 3.
c) It is possible to configure a forwarding table in router A, such that all traffic from H1
destined to host H3 is forwarded through interface 3, while all traffic from H2 destined to
host H3 is forwarded through interface 4.
d) It is not possible to configure a forwarding table in router A, such that all traffic from H1
destined to host H3 is forwarded through interface 3, while all traffic from H2 destined to
host H3 is forwarded through interface 4
e) None of the above
Q1.4 Link Layer, Wireless and Mobile Networks (Chapters 6&7)
Q1.4.1 What is/are false when comparing between switches and routers?
a) Both routers and switches are the connecting devices in networking.
7
b) Routers operate at the Data link layer and switches operate at the Network layer.
c) Switches operate at the Data link layer and routers operate at the Network layer.
d) Switches connect various networks together while a router connects devices within a
network.
e) In operation, routers rely on IP addresses while switches rely on MAC addresses.
Q1.4.2 Which of the following alternatives show(s) correct implementation(s) of a two- dimensional
even parity scheme?
Q1.4.3 About wireless physical-layer characteristics, which of the following statement(s) is/are
correct regarding the relations between SNR (Signal-to-noise ratio), BER (Bit Error Rate), and
Modulation schemes?
a) For a given a modulation scheme, the lower the SNR, the higher the BER.
b) For a given modulation scheme, the lower the SNR, the lower the BER.
c) For a given SNR, a modulation technique with a higher bit transmission rate has a
lower BER.
d) For a given SNR, a modulation technique with a higher bit transmission rate has a
higher BER.
e) None of the above is correct.
Q1.4.4 What is/are correct about CSMA/CA (Carrier Sense Multiple Access with Collision
Avoidance) protocol and RTS (Request to Send)/CTS (Clear to Send) message exchange?
a) Hidden node issue still physically happens with systems use CSMA/CA
b) In CSMA/CA, when a node wants to transmit, it sends a RTS to the AP (Access
Point). The AP responds with a CTS, granting permission for the node to transmit
c) During the RTS/CTS exchange, hidden nodes can not overhear these frames.
d) The RTS/CTS mechanism completely solves the exposed node problem.
e) The RTS/CTS mechanism is used in CSMA/CA to improve channel access.
Q.1.4.5 This question considers two access protocols: ALOHA (pure ALOHA) and slotted
ALOHA. What of the following statements is/are true?
8
a) Pure ALOHA has lower efficiency compared to slotted ALOHA.
b) Maximum efficiency achievable in slotted ALOHA is two times higher than that in
pure ALOHA.
c) Slotted ALOHA reduces the number of collisions compared to pure ALOHA.
d) In Slotted ALOHA, any station can transmit data at any time without synchronization.
e) In pure ALOHA, stations must wait for the beginning of the next time slot to transmit
data.
Q1.5 Security and Multimedia Networking (Chapter 8, and Edition 7 - Chapter 9 )
Q1.5.1 Which of the following are desirable properties of secure communication:
a) Network reliability.
b) Confidentiality
c) Message integrity.
d) Operational security
e) High bandwidth to transmit the message quickly.
Q1.5.2 Suppose N people want to communicate with each other using symmetric key encryption. All
communication between any two people is visible to all other people in this group and no other person in this
group should be able to decode their communication. How many keys are required in the system as a whole?
a) N*N
b) 2*N-1
c) N*(N-1)
d) N*(N-1)/2
e) None of the above
Q1.5.3 For message integrity, which of the following statement(s) is/are correct?
a) Message integrity is the property that the identity of the sender can be confirmed to be
who or what they claim to be.
b) Message integrity is the property that the receiver can detect whether the message
sent was altered in transit.
c) Both checksumming and hashing techniques may be used.
d) Generally, a hash provides a better message integrity check than a checksum.
e) To ensure message integrity, the transport layer protocol used to communication the
message has to be TCP.
Q1.5.4 In video streaming applications, HTTP streaming (over TCP) is more popular than UDP
streaming. The major reasons include:
a) UDP is connectionless.
b) UDP lacks retransmission, ordering, and error-checking mechanism result in higher
error rate.
c) UDP streaming lacks handshakes and acknowledgement results in lower latency.
d) Many firewalls are often configured to block most UDP traffic but to allow most
HTTP traffic.
e) None of the above
9
Q1.5.5 Considering information transmission between Alice and Bob through a network with the existence
of an intruder (Trudy). Choose which of these statements is/are correct regarding what kinds of information
the intruder can access and what kinds of action can be taken:
a) Sniffing and recording control messages on the channel
b) Recording data messages on the channel
c) Modifying or insertion of messages
d) Deletion of message or message content
e) None of the above
10
Ordinary Questions (Q2-Q6) [35 points]

Q2: Flow control [6 points]
There are two hosts, Host A and B are directly connected with a 10 Gbps link. There is one TCP connection
between the two hosts, and Host A is sending to Host B an enormous file over this connection. Host A can send
its application data into its TCP socket at a rate as high as 1 Gbps, but Host B can read out of its TCP receive
buffer at a maximum rate of 600 Mbps.
Describe the effect of TCP flow control in this TCP connection.
Q3. Consider the Wireshark output below for a portion of an SSL (Secured Socket Layer) session.
Answer these questions [5 points]
Q3.1 Was Wireshark packet 112 sent by the client or server?
Q3.2 What is the server’s IP address and port number?
Q3.3 Assuming no loss and no retransmissions, what will be the sequence number of the next TCP segment
sent by the client? Explain how you got this number.
11
Q3.4 How many SSL records does Wireshark packet 112 contain?
Q3.5 Does packet 112 contain a Master Secret or an Encrypted Master Secret or neither?
Q.4 IP addressing [8 points]

An IP address consists of a subnet part and a host part. To determine which the subnet an IP address belongs to,
you must know the subnet mask. Answer these questions:
Q.4.1. How to find out the subnet based on the IP address and the subnet mask?
Q.4.2 Given an IP address of 192.168.1.108 and the subnet mask /30 (255.255.255.252), what is the subnet
address? Justify your answer.
Q.4.3 Given an IP address of 192.168.2.108 and the subnet mask /29 (255.255.255.248), what is the
subnet address? Justify your answer.
Q.4.4 Given an IP address of 192.168.3.108 and the subnet mask /28 (255.255.255.240), what is the
subnet address? Justify your answer.
Q.5 Multiple Access Mechanism [12 points]

In the Figure below, there are four wireless nodes, A, B, C, and D. The radio coverages of these nodes are
shown as the shaded ovals; all nodes share the same frequency. When A transmits, it can only be heard/received
by B; when B transmits, both A and C can hear/ receive from B; when C transmits, both B and D can hear/receive
from C; when D transmits, only C can hear/receive from D. Suppose now that each node has an infinite supply of
messages that it wants to send to each of the other nodes. If a message’s destination is not an immediate neighbor,
then the message must be relayed via intermediate node(s).
Time is slotted and it take exactly one time slot for one message transmission. During a slot, a node can do
one of the following: (i) send a message, (ii) receive a message, (iii) remain silent. As always, if a node hears two
or more simultaneous transmissions, a collision occurs and none of the transmitted messages are received
successfully. Assume that when one message is sent, it will be received correctly by other nodes within the
transmission radius of the sender if no collision occurred at those nodes.
Assume a message has a length of L (bits) and a time slot of T (second). Provide answers to these questions:
12
Q.5.1 Suppose now that A sends messages to B, and D sends messages to C.
What is the combined maximum rate at which data messages can flow from A to B and from D to C?
Justify your answer.
Q.5.2 Suppose now that A sends messages to B, and C sends messages to D.
What is the combined maximum rate at which data messages can flow from A to B and from C to D?
Justify your answer.
Q.5.3. In this scenario, suppose that for every data message sent from source to destination, the destination
will send an ACK message back to the source (e.g., as in TCP). Also suppose that each ACK message
takes up one time slot.
Q.5.3.1 Repeat the question Q.5.1 for this scenario.
Q.5.3.2 Repeat the question Q.5.2. for this scenario.
Q.6 Answer following questions relate to DNS (Domain name service) [4 points]
Q.6.1 Describe the format of a Resource Record (RR) in DNS.
Q.6.2 What kind of information can be communicated to a client when it sends a DNS query?