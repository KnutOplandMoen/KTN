Task 1
Choose one of the following two definitions that makes the correct distinction between
routing versus forwarding.
a) Forwarding is the local action of moving arriving packets from router’s input link to
appropriate router output link, while routing is the global action of determining the
source-destination paths taken by packets.
b) Routing is the local action of moving arriving packets from router’s input link to
appropriate router output link, while forwarding is the global action of determining
the source-destination paths taken by packets.
Task 2
What is the 32-bit binary equivalent of the IP address 173.194.41.129?
a) 10001000 01010001 10110010 11101001
b) 10101101 01000011 10010100 10000001
c) 10101101 11000010 00101001 10000001
d) 10000001 10010100 01000011 10110101
Task 3
Which statement(s) is/are correct regarding the network layer and the IP protocol?
a) IP guarantees that packets arrive at the specified destination and in the correct
sequence.
b) With five routers between a source and destination, an IP datagram will travel over 12
interfaces (ignoring fragmentation).
c) IP is the only network layer protocol
d) NAT has helped with postponing the running out of IPv4 addresses.
e) Centralized routing algorithm uses a complete graph of the network, with all the
nodes and links.
f) Distance Vector routing algorithms are centralized routing algorithms.
Task 4
Consider a datagram network using 32-bit host addresses. A router with four link interfaces
(numbered 0 through 3) forwards packets based on the destination address ranges specified
below:
Destination Address Range Link Interface
11100000 00000000 00000000 00000000
through 0
11100000 00111111 11111111 11111111
11100000 01000000 00000000 00000000
through 1
11100000 01000000 11111111 11111111
11100000 01000001 00000000 00000000
through 2
11100001 01111111 11111111 11111111
otherwise 3
Which of the following forwarding tables, using five entries and longest prefix matching,
correctly forwards packets to the link interfaces as listed above?
a) Prefix Match Link Interface
11000000 10101000 00000000 0
11000000 10101000 00000001 1
11000000 10101000 2
11000000 3
otherwise 3
b) Prefix Match Link Interface
11100000 00 0
11100000 01000000 1
1110000 2
11100001 1 3
otherwise 3
c) Prefix Match Link Interface
11000000 10101000 00000000 0
11000000 10101000 00000001 1
11000000 10101000 00000010 2
11000000 10101 3
otherwise 4
d) Prefix Match Link Interface
11000000 10101000 00000000 0
11000000 10101000 00000001 1
11000000 10101000 11111111 2
11000000 10101111 11111111 3
otherwise 4
Task 5
Consider a router that interconnects three subnets: Subnet 1, Subnet 2, and Subnet 3. Suppose
all of the interfaces in each of these three subnets are required to have the prefix
129.241.56/21. Also suppose that Subnet 1 is required to support up to 1000 interfaces, and
Subnet 2 and 3 are each required to support up to 500 interfaces. Provide three network
addresses (of the form a.b.c.d/x) that satisfy these constraints.
a) 129.241.56.0/21 129.241.60.0/22 129.241.62.0/22
b) 129.241.56.0/22 129.241.60.0/23 129.241.62.0/23
c) 129.241.56.0/21 129.241.56.0/22 129.241.56.0/23
Task 6
Which of the following fields occur only in the IPv6 datagram header (i.e., appear in the IPv6
header but not in the IPv4 header)?
a) 128-bit source and destination IP addresses.
b) The IP version number field.
c) The time-to-live (or hop limit) field.
d) The header checksum field.
e) The flow label field.
f) The header length field.
g) The options field.
h) The upper layer protocol (or next header) field.
Task 7
About DHCP (Dynamic Host Configuration Protocol), which of the following statement(s)
is/are false?
a) When an internet host arrives, it implements 4-step process with a DHCP server for
acquiring a new IP address.
b) DHCP uses TCP (Transmission Control Protocol) as its transport protocol.
c) DHCP provides dynamic IP address assignment to network clients.
d) DHCP is primarily used for routing data packets between networks.
e) DHCP servers can offer additional configuration parameters such as DNS server
addresses and subnet masks.