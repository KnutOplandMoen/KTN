PART I – AUTOMATICALLY MARKED QUESTIONS (Multiple Choice, Drag-Drop, True/False,
Text Entry) [40 points]. Each correct answer choice receives one point.
1. How is content (selected from millions of videos) streamed to hundreds of thousands of
simultaneous users?
A) Store/serve multiple copies of videos at multiple geographically distributed sites
B) Store/serve everything at one server
2. We know that DNS service runs over UDP, but can it run over TCP too?
A) Yes
B) No
3. Is this statement correct: Congestion and flow control are the same thing.
A) Yes
B) No
4. Write true or false for each statement
1. On the Internet, packets are sent independently and can use different routes through
the network. _____
2. A protocol is the set of rules that determine the behavior between entities on adjacent
layers, i.e., between entities on (N+1)-layer and (N)-layer. ____
3. Best effort means that the source uses retransmission if necessary. _____
4. Link and network layer are always executed together. ____
5. A machine finds the first hop router and the DNS server address using DHCP.
6. It is the IP network part of the destination address that identifies the receiver within a
subnetwork.
7. Routers use ARP to find the next hop when forwarding packets.
8. Access routers use the whole IP address when forwarding datagrams (towards the
destination).
9. Core routers only use the network part of the IP address when forwarding datagrams.
10. Network layer IP addresses are always globally unique.
11. The Internet Protocol (IP) guarantees that the packets will arrive in the right sequence.
5. Assume that you have been assigned the 208.27.1.0/22 network block and asked to
create at least 12 subnets from it. How many usable hosts can be accommodated in
each of these subnets?
a) 64
b) 62
c) 60
d) 32
6. For each of the following protocols, categorize them into the appropriate multiple access
protocol classes (Channel Partitioning, Random Access, Taking Turns)
Bluetooth ______
Ethernet CSMA/CD _________
CDMA – Code Division Multiple Access ________
Slotted ALOHA ___________
FDDI (Fiber Distributed Data Interface) _________
FDMA ___________
7. Match each description on the left side with one of the terms on the right side (in blue) by
drawing a line. Assume a data string of 101110.
8. Consider the figure below, showing a link-layer frame heading from a host to a
router. There are three header fields shown. Select a layer on the right to match each of
the headers on the left.
9. Match the access network with the approximate speeds that a subscriber might
experience.
Question
items
Match Items Selectable Items
1. Ethernet a. Wired. 100 Mbps to 1 Gbps/link.
2. 4G cellular LTE b. Wireless. Up to 10’s Mbps/device
Question
items
Match Items Selectable Items
1. Header H1 a. Physical layer
2. Header H2 b. Network Layer
3. Header H3 c. Application layer
d. Transport layer
e. Link layer
3. Optical fiber c. Wired. Up to 10’s to 100’s Mbps
downstream/user.
4. Cable access
network
d. Wired. Up to 10’s of Mbps downstream/user.
e. Wireless. 10’s to 100’s Mbps/ device.
f. Wireless, up to 10's Kbps/device.
g. Wired. 1 to 10 Gbps / link.
10. Match the general client-side action stated with the specific TCP socket-related action that
implements it (one action per activity).
Question
Items
(no
translation)
Activities Action
1. Create a socket. a. The client must explicitly include the
server’s IP address, port #, when
sending
2. When sending to a server, this is
how a specific server is identified.
b. Send using a socket not explicitly
created via a call to socket ()
3. Send to server, using this socket. c. Use the call socket
(AF_INET, SOCK_DGRAM)
d. Send using the socket created
using socket (AF_INET, SOCK_STREAM)
e. As the result of an accept(), a new
socket is created, which binds the client
and server together via this new socket
without the need to explicitly specify the
destination IP address and port # when
sending
f. The client uses connect () to explicitly
bind its socket to specific server, and so
the server IP address and port number
need not be explicitly stated in a send
operation.
g. Send using the socket created
using socket (AF_INET, SOCK_DGRAM)
h. Use the call socket
(AF_INET, SOCK_STREAM)
11. Where is transport-layer functionality primarily implemented?
a) Transport layer functions are implemented primarily at the hosts at the “edge” of the
network.
b) Transport layer functions are implemented primarily at the routers and switches in the
network.
c) Transport layer functions are implemented primarily at each end of a physical link
connecting one host/router/switch to another one host/router/switch.
12.What is the broadcast address of prefix 172.18.16.0/21?
a) 172.18.0.255
b) 172.18.23.255
c) 172.18.30.255
d) 172.18.255.255
e) 172.18.25.255
13. When an application uses a UDP socket, which transport service is provided to the
application by UDP?
a) Throughput guarantee. The socket can be configured to provide a minimum
throughput guarantee between sender and receiver.
b) Loss-free data transfer. The service will reliably transfer all data to the receiver,
recovering from packets dropped in the network due to router buffer overflow.
c) Flow Control. The provided service will ensure that the sender does not send so fast
as to overflow receiver buffers.
d) Real-time delivery. The service will guarantee that data will be delivered to the
receiver within a specified time bound.
e) Best effort service. The service will make a best effort to deliver data to the
destination but makes no guarantees that any particular segment of data will actually
get there.
14. What is the primary purpose of a firewall in network security?
a) To encrypt data
b) To block unauthorized access
c) To manage network traffic
d) To provide VPN services
e) To monitor network performance
PART II – ORDINARY QUESTIONS (60 POINTS)
1. (5 points) What is the key difference between forwarding and routing?
2. (5 points) Compare transmission and propagation delay.
3. (15 points) A researcher has just begun at NTNU and got his NTNU user account which he
can use for email as well. So, he plugs in his laptop to the Ethernet port in his office to get
connected to the network. Then, he sends an email to his collaborator in Eindhoven
University of Technology using his NTNU email address and using Outlook desktop
application.
Elaborate the protocols that are used on each step from the moment he plugged in his
laptop, sent the email from his Outlook application to his collaborator’s web-based email
service, and the collaborator read the email.
4. (5 points) Suppose a Web server has five ongoing connections that use TCP receiver port 80,
and assume there are no other TCP connections (open or being opened or closed) at that
server, answer:
1. (2 points) How many TCP sockets are in use at this server?
2. (3 points) Explain how did you come to that result?
5. (15 points) About Caesar cipher.
3. (3 points) Describe how the Caesar cipher works.
4. (6 points) Use the Caesar cipher with an offset of k=7 to encode the message "Protect
your information".
5. (6 points) Use the Caesar cipher with an offset of k=7 to decode this message "Jhlzhy
jpwoly jhu Wyla jvby pvmvyapvu"
6. (5 points) What is the key difference between symmetric key systems and public key systems
in cryptography?
7. (10 points) Consider the figure below, which shows the arrival of 6 packets for transmission
at different multiple access wireless nodes at times t=0.1, 1.4, 1.8, 3.2, 3.3, 4.1. Each
transmission requires exactly one time unit.
For the CSMA protocol (Carrier Sense Multiple Access without Collision Detection), explain
which packets are successfully transmitted within the time scale above. Assuming that it
takes 0.2 time unit for a signal to propagate from one node to each of the other nodes. You can
assume that if a packet experiences a collision or senses the channel busy, then that node will
not attempt a retransmission of that packet until sometime after t=5. 