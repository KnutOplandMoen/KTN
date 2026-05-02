Task 1
Circuit switching and packet switching have many differences. Which of the following is/are
correct regarding packet switching and circuit switching?
a) While a circuit-switched network can guarantee a certain amount of end-to-end
bandwidth for the duration of a call, typically packet-switched networks cannot.
b) Most packet-switched networks today (including the Internet) can make end-to-end
guarantees for bandwidth.
c) Typically, the delay variation among packets/messages in a circuit-switched network
is smaller than that in a packet-switched network.
d) The costs for dedicated resources in packet-switched network are usually higher than
the costs for resources in circuit-switched network.
e) In circuit-switched networks, the bandwidth is shared among the users and allocated
only when data needs to be transmitted. It has a better bandwidth efficiency than in
packet-switched networks.
Task 2
Protocol Layering is commonly used in computer networks because:
a) It prevents network functionalities to be divided into separate layers, each with a
specific purpose.
b) Encapsulation is the most efficient way to transmit data.
c) It provides a simple design for implementation and maintenance but more
complication in network developments.
d) It keeps networks structured and enables them to communicate faster.
e) Protocol layering can accommodate future enhancements and changes.
Task 3
Consider a packet of length L that starts at end system A, travels over a link to a packet
switch, and then travels from the packet switch over a second link to the destination end
system. Let 𝑑 , , and represent the length, propagation speed, and transmission rate of
𝑖
𝑠
𝑖
𝑅
𝑖
link i, for i = 1, 2. The packet switch introduces a processing delay 𝑑 for each packet.
𝑝𝑟𝑜𝑐
Assuming no queuing delays, what is the total end-to-end delay for the packet, expressed in
terms of 𝑑 , , and (for i = 1, 2), and L?
𝑖
𝑠
𝑖
𝑅
𝑖
a) 𝑑
𝑒𝑛𝑑−𝑒𝑛𝑑 =
𝐿
𝑅1 +
𝐿
𝑅2 +
𝑑
1
𝑠
1
+
𝑑
2
𝑠
2
+ 𝑑
𝑝𝑟𝑜𝑐
b) 𝑑
𝑒𝑛𝑑−𝑒𝑛𝑑 =
𝐿
𝑅1 +
𝐿
𝑅2 +
𝑑
1
𝑠
1
+
𝑑
2
𝑠
2
c) 𝑑
𝑒𝑛𝑑−𝑒𝑛𝑑 =
𝐿
𝑅1 +
𝑑
1
𝑠
1
+ 𝑑
𝑝𝑟𝑜𝑐
d) 𝑑
𝑒𝑛𝑑−𝑒𝑛𝑑 =
𝑑
1
𝑠
1
+
𝑑
2
𝑠
2
+ 𝑑
𝑝𝑟𝑜𝑐
Task 4
Which statement(s) is/are correct, regarding the protocols at the application layer?
a) A user requests a Web page that consists of some text and two images. For this page,
the client will send one request message and receive three response messages.
b) Two distinct Web pages can be sent over the same persistent connection.
c) With non-persistent connections between browser and origin server, it is possible for a
single TCP segment to carry two distinct HTTP request messages.
d) The Date: header in the HTTP response message indicates when the object in the
response was last modified.
Task 5
What would be the key challenges of designing a DNS system with a single server instead of
a distributed and hierarchical structure?
a) Single point of failure: If the server crashes, the entire Internet is affected.
b) Traffic overload: One server must handle all DNS queries globally, causing
bottlenecks.
c) Distance issues: Queries from distant locations face long delays and slow responses.
d) Maintenance burden: Managing records for all Internet hosts is impractical and
error-prone.
Task 6
Suppose you have the following three 16-bit words: 10001000 10001000; 00001111
00001111; 11111111 11111111. What is the 1s complement of the sum of these 16-bit bytes?
Task 7
Host A and Host B have established a connection using TCP. Host A sends two segments of
data to Host B. The first has sequence number 81 and the second has sequence number 121.
How many bytes of data was in the first segment?
Task 8
Which statement(s) is/are correct, regarding the TCP and UDP protocol?
a) Applications can only have reliable data transfer if the transport-layer protocol used
provide it.
b) UDP does not establish a connection between endpoints.
c) Suppose Host A has a UDP socket with port number 25565, and Hosts B and C both
send a UDP segment with destination port number 25565 to Host A. Host A cannot
know that these segments came from two different hosts.
d) Host A is sending a large file to Host B over TCP. Host A cannot send more
unacknowledged data than what fits in the receive window of Host B.