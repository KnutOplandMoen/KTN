CHAРTER
Multimedia
Networking
While lounging in bed or riding buses and subways, people in all corners of the world
are currently using the Internet to watch movies and television shows on demand.
Internet movie and television distribution companies such as Netflix and Amazon niet ovo o
in North America and Youku and Kankan in China have practically become household names. But people are not only watching Internet videos, they are using sites
like YouTube to upload and distribute their own user-generated content, becoming
Internet Internet video vi producers АР as well as consumers. Moreover, network applications such
as Skype, Googie faik, and wechat (enormously popular in China) allow people as Skype, Google Talk, and WeChat (enormously popular in China) allow people
to not only make "telephone calls" over the Internet, but to also enhance those calls
with video and multi-person conferencing. In fact, we predict that by the end of the
current decade most of the video consumption and voice conversations will take
pae and tothvolce conversations wi take place end-to-end over the Internet, more typically to wireless devices connected to
the Internet via cellular and WiFi access networks. Traditional telephony and broadcast television are quickly becoming obsolete.
We begin this chapter with a taxonomy of multimedia applications in Sec- a
tion 9.1. We'll see thata multimedia application can be classified as either stream- 1 e i see tat ained appneao ean be classired as enner stream- ing stored audio/video, conversational voice/video-over-IP, or streaming live audio/
video. We'll see that each of these classes of applications has its own unique service
requirements that differ significantly from those of traditional elastic applications such as email Web hrownanta loein Ia t ap such as e-mail, Web browsing, and remote login. In Section 9.2, we'll examine video
streaming in some detail. We'll explore many of the underlying principles behind
675
676 CHAPTER 9 MULTIMEDIA NETWORKING video streaming, including chient buffering, prefetehing, and adapting video qual- video streaming, including client buffering, prefetching, and adapting video quality to available bandwidth. In Section 9.3, we investigate conversational voice and
video, which, unlike elastic applications, are highly sensitive to end-to-end delay
but can tolerate occasional loss of data. Here we'll examine how techniques such ssot nto
as adaptive playout, forward error correction, and error concealment can mitigate
against network-induced packet loss and delay. We'll also examine Skype as a case against network-induced packet loss and delay. We'll also examine Skype as a case
study. In Section 9.4, we'll study RTP and SIP, two popular protocols for real-time
conversational voice and video applications. In Section 9.5, we'll investigate mechanisms within the network that can be used to distinguish one class of traffic (e.g.. msims wimn the hetwork that can be used to distinguis one crass of traffe (e.g, delay-sensitive applications such as conversational voice) from another (e.g., elastic
applications such as browsing Web pages), and provide differentiated service among
multiple classes of traffic.
9.1 Multimedia Networking Applications
We define a multimedia network application as any network application that employs
andio or video. In this secnon, we provide a taxonomy of mmea appreattons. audio or video. In this section, we provide ataxonomy of multimedia applications.
We'll see that each class of applications in the taxonomy has its own unique set of
service requirements and design issues. But before diving into an in-depth discussion
of Internet multimedia applications, it is useful to consider the intrinsic characteris- or neiet
tics of the audio and video media themselves.
9.1.1 Properties of Video
Perhaps the most salient characteristic of video is its high bit rate. Video distributed remaps thhe mostsalet charaetenist o s ts
over the Internet typically ranges from 100 kbps for low-quality video conferencing
to over 3 Mbns for streaming high-definition movies. To get a sense of how video to over 3 Mbps for streaming high-definition movies. To get a sense of how video
bandwidth demands compare with those of other Internet applications, let's briefly
cin differnt Intemet annliestion Our Fis consider three different users, each using a different Internet application. Our first
user, Frank, is going quickly through photos posted on his friends' Facebook pages. user, Frank, is going quickly through photos posted on his friends Facebook pages.
Let's assume that Frank is looking at a new photo every 10 seconds, and that photos
are on average 200 Kbytes in size. (As usual, throughout this discussion we make
the simplifying assumption that 1 Kbyte = 8,000 bits.) Our second user, Martha, the simphrying assumpion that IR.byte8,0 bls.) Our second
is streaming music from the Internet ("the cloud") to her smartphone. Let's assume
Martha is using a service such as Spotify to listen to many MP3 songs, one after the
other, each encoded at a rate of 128 kbps. Our third user, Victor, is watching a video
that has been encoded at 2 Mbps. Finally, let's suppose that the session length for all that hae heen encoded at 2 Mhre Finolly let's unnose that the sescion lenoth for all
three users is 4,000 seconds (approximately 67minutes). Table 9.1 compares the b three users is 4,000 seconds (approximately 67 minutes). Table 9.1 compares the bit
rates and the total bytes transferred for these three users. We see that video streaming
consumes by far the most bandwidth, having a bit rate of more than ten times greater
than that of the Facebook and music-streaming applications. Therefore, when design
9.1 MULTIMEDIA NETWORKING APPLICATIONS 677
Bit rate Bytes transferred in 67 min Facebook Frank 160 kbps 80 Mbytes Martha Music 128 kbps 64 Mbvtes Victor Video 2 Mbos 1 Gbyte Table 9.1 Comparison of bittate requirements of three Internet applications ing networked video applications, the first thing we must keep in mind is the high bit-rate requirements of video. Given the popularity of video and its high bit rate, it is perhaps not surprising that Cisco predicts [Cisco 2015] that streaming and stored ZOIS Streaming and stored video will be approximately 80 percent of global consumer Internet traffic by 2019. Another important characteristic of video is that it can be compressed, thereby Anotner important characteristic of video is that it can be compressed, thereby trading off video quality with bit rate. A video is a sequence of images, typically being displaved at a constant rate. for example at 24 or 30 imas being displayed at a constant rate, for example, at 24 or 30 images per second. An uncompressed, digitally encoded image consists of an array of pixels, with each ge consisis of an array of pixeis, with each pixel encoded into a number of bits to represent luminance and color. There are two types of redundancy in video, both of which can be exploited by video compression. Spatial redundancy is the redundancy within a given image. Intuitively, an image that consists of mostly white space has a high degree of redundancy and can be efficiently consiste of mostly white ee hae a compressed without signinicantly sacrificing image quality. Temporal redundancy compressed without significantly sacrificing image quality. Temporal redundancy reflects repetition from image to subsequent image. If, for example, an image and the subsequent image are exactly the same, there is no reason to re-encode the subsequent subseguent image are exactly the same there is no reason to re-encode the subsequent image; it is instead more efficient simply to indicate during encoding that the subse- e sply toceate during eneoding that the subse- quent image is exactly the same. Today's off-the-shelf compression algorithms can compress a video to essentially any bit rate desired. Of course, the higher the bit rate, a the better the image quality and the better the overall user viewing experience. We can also use commression to create multiple versions of the sae vide We can also use compression to create multiple versions of the same video, eaen at a different quanty level. For example, we can use compression to create, each at a different quality level. For example, we can use compression to create. say, three versions of the same video, at rates of 300 kbps, 1 Mbps, and 3 Mbps. Users can then decide which version they want to watch as a function of their current available bandwidth. Users with high-speed Internet connections might choose the es u tigu-sdeeer conecions mignt ehoose the 3 Mbps version; users watching the video over 3G with a smartphone might choose the 300 kbps version. Similarly, the video in a video conference application can the 300 kbps version. Similarly, the video in a video conference application can be compressed "on-the-fly" to provide the best video quality given the available end-to-end bandwidth between conversing users. 9.1.2 Properties of Audio Digital audio (including digitized speech and music) has significantly lower band- haeits width requirements than video. Digital audio, however, has its own unique prop- erties that must be considered when designing multimedia network applications.
678 CHAPTER 9 MULTIMEDIA NETWORKING To understand these properties, let's first consider how analog audio (which humans
and musical instruments generate) is converted converted to a digital signal:
The analog audio signal is sampled at some fixed rate, for example, at 8,000
sampies per seeond. he vau of samples per second. The value of each sample will be some real number.
Each of the samples is then rounded to one of a finite number of values. This
aen of the sampies is meantafion The puber of such finite valnes called operation is referred to as quantization. The number of such finite values-called
quantization values-is typically a power of two, for example, 256 quantization
values.
Each of the quantization values is represented by a fixed number of bits. For
example, if there are 256 quantization values, then each value-and hence each
audio sample-is represented by one byte. The epresetaonso audio sample-is represented by one byte. The bit representations of all the samples are then concatenated together to form the digital representation of the signal. As an example. if an analog audio signal is sampled at 8,000 samples per second As an example, if an analog audio signal is sampled at 8,000 samples per second
and each sample is quantized and represented by 8 bits, then the resulting digital
signal will have a rate of 64,000 bits per second. For playback through audio sonal will have a ate of 64 000 bits per second. For playback throueh audio
speakers, the digital signal can then be converted back-that is, decoded-to an speakers, the digital signal can then be converted back-that is, decoded-to an
analog signal. However, the decoded analog signal is only an approximation of
the original signal, and the sound quality may be noticeably degraded (for example, high-frequency sounds may be missing in the decoded signal). By increasing ple, hign-irequeney sounds may be missing in the decoded sig). by e the sampling rate and the number of quantization values, the decoded signal can
better approximate the original analog signal. Thus (as with video), there is a better approximate the original analog signal. Thus (as with video), there is a
trade-off between the quality of the decoded signal and the bit-rate and storage
requirements of the digital signal.
The basic encoding technique that we just described is called pulse code modulation
(PCM). Speech encoding often uses PCM, with a sampling rate of 8,000 samples per
second and 8 bits per sample, resulting in a rate of 64 kbps. The audio compact disk
(CD) also uses PCM, with a sampling rate of 44,100 samples per second with 16
bits per sample;
s

PCM
this gives
 with
 a

 rate of 705.6 kbps for mono and 1.411 Mbps for stereo.
PCM-encoded speech and music, however, are rarely used in the Internet.
Instead, as with video, compression techniques are used to reduce the bit rates of
the stream. Human speech can be compressed to less than 10 kbps and still be intelligible. A popular compression technique for near CD-quality stereo music is MPEG
1 layer 3, more commonly known as MP3. MP3 encoders can compress to many
different rates; 128 kbps is the most common encoding rate and produces very little
sound degradation. A related standard is Advanced Audio Coding (AAC), which is
has been popularized by Apple. As with video, multiple versions of a prerecorded
audio stream can be created, each at a different bit rate.
Although Althouch audio bit b rates r are a generally generally much less l than than those ofof video,ideo. users are
generally much more sensitive to audio glitches than video glitches. Consider, for
example, a video conference taking place over the Internet. If, from time to time, generany much more senstive to adioget If from time to time
the video signal is lost for a few seconds, the video conference can likely proceed

9.1 MULTIMEDIA NETWORKING APPLICATIONS 679
without too much user frustration. If, however, the audio signal is frequently lost, the
users may have to terminate the session.
9.1.3 Туpes of Multimedia Network Applications
The Internet supports a large variety of useful and entertaining multimedia applications. In this subsection, we classify multimedia applications into three broad categories: rie)ored (i) streaming stored audio/video, (ii) conversational voice/video-over-IP,
and (iii) streaming live audio/video. As we will soon see, each of these application
categories has its own set of service requirements and design issues.
Streaming Stored Audio and Video
To keep the discussion concrate, we focus here on streaming stored video, which typically combines video and audio components. Streaming stored audio (such as Spotify's streaming music service) is very similar to streaming stored video, although the very to
bit rates are typically much lower. bitrates are typically mucn lower.
In this class of applications, the underlying medium is prerecorded video, such
as a movie, a television show, a prerecorded sporting event, or a prerecorded usergenerated video (such as those commonly seen on YouTube). These prerecorded
videos are placed on servers, and users send requests to the servers to view the videos on demand. Many Internet companies today provide streaming video, including eos on demand. Many Internet companies today provide streaming video, including YouTube (Google), Netflix, Amazon, and Hulu. Streaming stored video has three
key distinguishing features.
Streaming. In a streaming stored video application, the client typically begins
video playout within a few seconds after it begins receiving the video from the video plavout within a few seconds after it begins receiving the video from the
server. This means that the client will be playing out from one location in the
video while at the same time recelvine loter norts of the viden foom the video while at the same time receiving later parts of the video from the server.
This technique, known as streaming, avoids having to download the entire video
file (and incurring a potentially long delay) before playout begins.
Interactivity. Because the media is prerecorded, the user may pause, reposition
forward, forward. reposition reposition backward. backward, fast-forward, and a so on through throush the video vid content content.
The time from when the user makes such a request until the action manifests itself a
at the client should be less than a few seconds for acceptable responsiveness.
Continuous playout. Once playout of the video begins, it should proceed accord- plavoutof viderechold
ing to the original timing of the recording. Therefore, data must be received from ing to the original timing of the recording. Therefore, data must be received from
the server in time for its playout at the client; otherwise, users experience video frame freezing (when the client waits for the del frame freezing (when the client waits for the delayed frames) or frame skipping
(when the client skips over delayed frames).
By far, the most important performance measure for streaming video is average
throughput. In order to provide vide continuous continuous playout, the network must provide an
680 CHAPTER 9 MULTIMEDIA NETWORKING average throughput to the streaming application that is at least as large the bit rate of
the video itself. As we will see in Section 9.2, by using buffering and prefetching,
eeihle evout even when it is possible to provide continuous playout even when the throughput fluctuates,
as long as the average throughput (averaged over 5-10 seconds) remains above the
video rate [Wang 2008].
For many streaming video applications, prerecorded video is stored on, and
streamed from, a CDN rather than from a single data center. There are also many steaned fro, N aer t f
P2P video streaming applications for which the video is stored on users' hosts
(peers), with different chunks of video arriving from different peers that may
spread around the globe. Given the prominence of Internet video streaming, we
will explore video streaming in some depth in Section 9.2, paying particular atten- willernlore in soe
tion to client buffering, prefetching, adapting quality to bandwidth availability, and
CDN distribution.
Conversational Voice- and Video-over-IP
Real-time conversational voice over the Internet is often referred to as Internet Real-пme conversanonal volce over the teet is oen ree telephony, since, from the user's perspective, it is similar to the traditional circuitswitched telephone service. It is also commonly called Voice-over-IP (VoIP). Conversational video is similar, except that it includes the video of the participants as
well as their voices. Most of today's voice and video conversational systems allow well as their voines Most of today's voice and video conversational systemse allo
users users toto create create conferences conferences with with three three oror more more participants. participants. Conversational voice and Conversational voice and
video are widely used in the Internet today, with the Internet companies Skype, QQ.
and Google Talk boasting hundreds of millions of daily users.
In our discussion of application service requirements in Chapter 2 (Figure 2.4), ousessto of appieto servc
we identified a number of axes along which application requirements can be classified. Two of these axes timing considerations and tolerance of data loss-are sified. Two of these axes-timing considerations and tolerance of data loss-are
particularly important for conversational voice and video applications. Timing considerations are important because audio and video conversational applications are
highly delay-sensitive. For a conversation with two or more interacting speakers, the the
delay from when a user speaks or moves until the action is manifested at the other
end should be less than a few hundred milliseconds. For voice, delavs smaller than end should be less than a few hundred milliseconds. For voice, delays smaller than
150 milliseconds are not perceived by a human listener, delays between 150 and 400
milliseconds can be acceptable, and delays exceeding 400 milliseconds can result in
frustrating, if not completely unintelligible, voice conversations.
On the other hand, conversational multimedia applications are loss-tolerantoccasional loss only causes occasional glitches in audio/video playback, and these casional loss only causes occasional elitches in audio/video playback, and these
losses can often be partially or fully concealed. These delay-sensitive but loss-tolerant losses can often be partany or fuly concealed. hese deray-sesiise
characteristics are clearly different from those of elastic data applications such as
Web browsing, e-mail, social networks, and remote login. For elastic applications,
long delays are annoying but not particularly harmful; the completeness and integrity
are of the transferred data, however, are of paramount importance. We will explore conversational voice and video in more depth in Section 9.3, paying particular attention

9.2 STREAMING STORED VIDEO 681
to how adaptive playout, forward error correction, and error concealment can mitigate against network-induced packet loss and delay.
Streaming Live Audio and Video
This third class of applications is similar to traditional broadcast radio and television, This third class of applications is similar to traditional broadcast radio and television.
except that transmission takes place over the Internet. These applications allow a
user to receive a live radio or television transmission-such as a live sporting event
or an ongoing news event-transmitted from any corner of the world. Today, thousands cande ofof radio radioand and television televicio stations around the world are broadcasting content over
the Internet. nternet. Live, broadcast-like applications often have many users who receive the same
audio/video program at the same time. In the Internet today, this is typically done audio/video program at the same time. In the Internet today this is tynically done
with CDNs (Section 2.6). As with streaming stored multimedia, the network must NS (sectio 2.0). w streaing stored muiimedia, the network must provide each live multimedia flow with an average throughput that is larger than
the video consumption rate. Because the event is live, delay can also be an issue the video consumption rate. Because the event is live, delay can also be an issue,
although the timing constraints are much less stringent than those for conversational
voice. Delays of up to ten seconds or so from when the user chooses to view a live
transmission transmission toto when when playout playout begins begins can can bebe tolerated. tolerated. We will not cover stream- We will not cover streaming live media in this book because many of the techniques used for streaming live
media-initial buffering delay, adaptive bandwidth use, and CDN distribution-are
similar to those for streaming stored media.
9.2 Streaming Stored Video
For streaming video applications, prerecorded videos are placed on servers, and or streamng vied appreations, prerecodvideos are placed on servers, and
users send requests to these servers to view the videos on demand. The user may
watch the video from beginning to end without interruption. may stop watchins the wateh the video from beginning to end without interruption, may stop watching the
video well before it ends, or interact with the video by pausing or repositioning to a future or past scene Streaming viden sveteme can be classified intothr future or past scene. Streaming video systems can be classified into three categories:
UDP streaming, HTTP streaming, and adaptive HTTP streaming (see Section streaming, ir streaming, and adaptive HrTP streaming (see Section 2.6). Although all three types of systems are used in practice, the majority of today's
systems employ HTTP streaming and adaptive HTTP streaming.
A common characteristic of all three forms of video streaming is the extensive
of client eida annlinatioiig is thhe exterisive use of client-side application buffering to mitigate the effects of varying end-to-end
delays and varying amounts of available bandwidth between server and client. For delays and varying amounts of available bandwidth between server and client. For
streaming video (both stored and live), users generally can tolerate a small severalsecond initial delay between when the client requests a video and when video playout a
begins at the client. Consequently, when the video starts to arrive at the client, the cli- begs at me .squeny, when thevideo starts to arrive at the chent, the client need not immediately begin playout, but can instead build up areserve of video
in an application buffer. Once the client has built upa reserve of several seconds of
682 CHAPTER 9 MULTIMEDIA NETWORKING buffered-but-not-yet-played video, the client can then begin video playout. There
are two important advantages provided by such client buffering. First, client-side are two important advantages provided by such client buffering. First, chent-side buffering can absorb variations in server-to-client delay. If a particular piece of video
data is delayed, as long as it arrives before the reserve of received-but-not-yet-played
video is exhausted, this long delay will not be noticed. Second, if the server-to-client
bandwidth briefly drops below the video consumption rate, a user can continue to bandwirdth hriafl done aw th
enjoy continuous playback, again as long as the client application buffer does not
become completely drained.
Figure 9.1 illustrates client-sid Figure 9.1 illustrates client-side buffering. In this simple example, suppose that
video ts encoed a xed bil late, and mus eacn video bloek contains video frames video is encoded at a fixed bit rate, and thus each video block contains video frames
that are to be played out over the same fixed amount of time, A. The server transmits
the first video block at fo, the second block at to+A, the third block at to + 2Д, the first video block at fo. the second block at to+A the third block at + 2
and so on. Once the client begins playout, each block should be played out A
time units after the previous block in order to reproduce the timing of the original
recorded video. Beeause of the variable end-to-end network delays, different video recorded video. Because of the variable end-to-end network delays, different video
blocks experience different delays. The first video block arrives at the client at 1, and
the second block arrives at h. The network delay for the ith block is the horizontal
distance between the time the block was transmitted by the server and the time it is e k was tsi yte server ee S received at the client; note that the network delay varies from one video block to
another. In this example, if the client were to begin playout as soon as the first block
arrived at , then the second block would not have arrived in time to be played out
at out at + A. In this case, video playout would either have to stall (waiting for at out at+A Inthis cue video plavont woud either haoll
block block 22 toto afive) arrive) oror block bloek 22 couid be skipped-botn resuiing in undesirable playon could be skipped-both resulting in undesirable playout impairments. Instead, if the client were to delay the start of playout until f, when
blocks 1 through 6 have all arrived, periodic playout can proceed with all blocks having been received before their playout time.
Video block number 210987654321 Constant bit rate video transmission ideo Constant bit Variable Client ayout
+24 t t
3+A
rate Video
by client
Time
Figure 9.1 Client playout delay in video streaming
9.2 STREAMING STORED VIDEO 683
9.2.1 UDP Streaming
We only briefly discuss UDP streaming here, referring the reader to more in-depth
discussions of the protocols behind these systems where appropriate. With UDP diseussions of the protocols benind these systems wnere appropriate. With UDP streaming, the server transmits video at a rate that matches the client's video consumption rate by clocking out the video chunks over UDP at a steady rate. For example, if the video consumption rate is 2 Mbps and each UDP packet carries 8,000 hits of viden then the serdm e UP acet ntet cafies 6,0 bits of video, then the server would transmit one UDP packet into its socket every
(8000 bits)/(2 Mbps) = 4 msec. As we learned in Chapter 3. because UDP does (8000 Bs)/2 Mops( =# msec. As we learned in Chapter 3, because UDP does
not employ a congestion-control mechanism, the server can push packets into the
network at the consumption rate of the video without the rate-control restrictions of
TCP. UDP streaming typically uses a small oclient-side buffer,big enough to hold less
than a second of video.
Before passing the video chunks to UDP, the server will encapsulate the
video chunks within transport packets specially designed for transporting audio
and video, using the Real-Time Transport Protocol (RTP) [RFC 3550] or a similar (possibly proprietary) scheme. We delay our coverage of RTP until Section ar (possiory proprietury) seneme. we delay our coverage of RIP until Section 9.3, where we discuss RTP in the context of conversational voice and video
systems.
Another distinguishing property of UDP streaming is that in addition to the
server-to-client video stream, the client and server also maintain, in parallel, ter-to-client video stream the elent and server slin allel
a separate control connection over which the client sends commands regard- a separate control connection over which the chient sends commands regarding session state changes (such as pause, resume, reposition, and so on). The
Real-Time Streaming Protocol (RTSP) [RFC 2326], explained in some detail
in in the web Web site for for this textbook, is a popular open protocol for suchch aa control
connection.
n Although UDP streaming has been employed in many open-source systems and
proprietary products, it suffers from three significant drawbacks. First, due to the uoendiotabls. st, de tome unpredictable and varying amount of available bandwidth between server and client,
constant-rate UDP streaming can fail to provide continuous playout. For example. constant-rate ODP streaming can fail to provide continuous playout. For example,
consider the scenario where the video consumption rate is 1 Mbps and the server-toclient available bandwidth is usually more than 1 Mbps, but every few minutes the
available аops bandwidth drops below 1 Mbps for several seconds. In such a scenario, a owods tor ser secoS sceoa UDP streaming system that transmits video ata constant rate of 1 Mbps over RTР/
UDP would likely provide a poor user experience. with freezing or skipped frames ODP Would hkely providea poor user experience, with freezing or skipped frames
soon after the available bandwidth falls below 1 Mbps. The second drawback of
UDP streaming is that it requires a media control server, such as an RTSP server, to a server to
process enent-to-server interactivity requests and to track chent state (e.g., the cli- process client-to-server interactivity requests and to track client state (e.g., the client's playout point in the video, whether the video is being paused or played, and so
on) for each ongoing client session. This increases the overall cost and complexity of on) for each ongoing client session. This increases the overall cost and complexity of
deploying a large-scale video-on-demand system. The third drawback is that many firewalls are confired toock i i ay firewalls are configured to block UDP traffic, preventing the users behind these firewalls from receiving UDP video.
684 CHAPTER 9 MULTIMEDIA NETWORKING 9.2.2 HTTP Streaming cang
In HTTP streaming, the video is simply stored in an HTTP server as an ordinary
file with a specific URL. When a user wants to see the video, the client establishes
a TCP connection with the server and issues an HTTP GET request for that URL.
The server then sends the video file, within an HTTP response message, as quickly he server then sends the vided the, wiin a response message, as quicy
as possible, that is, as quickly as TCP congestion control and flow control will allow.
On the client side, the bytes are collected in aa client application buffer. Once the
number of bytes in this buffer exceeds apredetermined threshold, the client application begins playback-specifically, it periodically grabs video frames from the client tion hegins nlauhack enecifically it neriodically orabe video frames from the client
application buffer, decompresses the frames, and displays them on the user's screen.
We learned in Chapter 3 that when transferring a file over TCP, the serverto-client transmission rate can vary significantly due to TCP's congestion control
mechanism. In particular, it is not uncommon for the transmission rate to vary in a
"saw-tooth" manner associated with TCP congestion control. Furthermore, packets
can also be significantly delaved due to TCP's retransmission mechanism. Because
of these characteristics of TCP, the conventional wisdom in the 1990s was that
video streaming would never work well over TCP. Over time, however, designers
of streaming video systems learned that TCP's congestion control and reliable-data of seainng vided systens leadt erscongesio conrer art- transfer mechanisms do not necessarily preclude continuous playout when client
buffering and prefetching (discussed in the next section) are used. buffering and prefetching (discussed in the next section) are used
The use of HTTP over TCP also allows the video to traverse firewalls and NATs
more easily (which are often configured to block most UDP traffic but to allow easily (which are often confionred to block most IDP traffe bt to allow
most HT IP trame). Streaming over HTIP also obviates the need for a media con- most HTTP traffic). Streaming over HTTP also obviates the need for a media control server, such as an RTSP server, reducing the cost of a large-scale deployment
over the Internet. Due to all of these advantages, most video streaming applications
today-including YouTube and Netflix-use HTTP streaming (over TCP) as its
underlying streaming protocol.
Prefetching Video
As we just learned, client-side buffering can be used to mitigate the effects of varying end-to-end derays and varying avaabre bandwictn. in our eaer examdie ing end-to-end delays and varying available bandwidth. In our earlier example in
Figure 9.1, the server transmits video at the rate at which the video is to be played
out. However, for streaming stored video, the client can attempt to download the
video at a rate higher than the consumption rate, thereby prefetching video frames that a to d in the fe is that are to be consumed in the future. This prefetched video is naturally stored in
the chient application buffer. Such pretetching occurs naturally with ICP streaming, the client application buffer. Such prefetching occurs naturally with TCP streaming,
since TCP's congestion avoidance mechanism will attempt to use all of the available
bandwidth between server and client.
To gain some insight into prefetching, let's take a look at a simple example. Sup- ga ome mmsignt hto preltcn, ttte a at a siple e pose the video consumption rate is 1 Mbps but the network is capable of delivering
the video from server to client at a constant rate of 1.5 Mbps. Then the client will

9.2 STREAMING STORED VIDEO 685
not only be able to play out the video with aa very small playout delay, but will also
be able to increase the amount of buffered video data by 500 Kbits its every second
In In this manner, if in the future the client receives data at a rate of les less than 1 Mbn Mbps
for a brief period of time, the client will be able to continue to provide continuous playback due to the mere in iteu20081onmnons playback due to the reserve in its buffer. [Wang 2008] shows that when the average
TCP throughput is roughly twice the media bit rate, streaming over TCP results in
minimal starvation and low buffering delays.
Client Application Buffer and TCP Buffers
Figure Figure 9.2 9.2 illustrates illustrates the the interaction interaction betw between client and server for HTTP streaming.
At the server side, the portibn of the video file in white has already been sent into the
server's socket, while the darkened portion is what remains to be sent. After "pass- cr' oket while the darkened nortion i what remins to he sent After "
ing through the socket doof," the bytes are placed in the TCP send buffer before ing through the socket door, the bytes are placed in the ICP send buffer before
being transmitted into the Internet, as described in Chapter 3. In Figure 9.2, because
the TCP send buffer at the server side is shown to be full, the server is momentarily
prevented from sending more bytes from the video file into the socket. On the client side the clie Ret. O the cen side, the client application (media player) reads bytes from the TCP receive buffer
(through its chent socket) and places the bytes into the client application buffer. At (through its client socket) and places the bytes into the client application buffer. At
the same time, the client application periodically grabs video frames from the client
application buffer, decompresses the frames and displavs them on the neer' application buffer, decompresses the frames, and displays them on the user's screen.
Note that if the client application buffer is larger than the video file, then the whole Note i the cnent appileation bufter is farger than the video file, then the whole
process of moving bytes from the server's storage to the client's application buffer
is equivalent to an ordinary file download over HTTP-the client simply pulls the
video off the server as fast as TCP will allow!
TCP send TCP receive buffer Video file
Web server
Figure 9.2 Streaming stored video over HTTР/ТСР
TCP application
buffer
Frames read
out periodically from buffer Trom burre decompressed,
and displayed
on screen
Client
686 CHAPTER 9 MULTIMEDIA NETWORKING  Consider now what happens when the user pauses the video during the streaming process. During the pause period, bits are not removed from the client application
buffer, even though bits continue to enter the buffer from the server. If the client buffer. even though bits continue to enter the buffer from the server. If the client
application buffer is finite, it may eventually become full, which will cause "back r iss a eveethe ie pressure" all the way back to the server. Specifically, once the client application
bufter becomes full, bytes can no longer be removed from the chent CP receive buffer becomes full, bytes can no longer be removed from the client TCP receive
buffer, so it too becomes full. Once the client receive TCP buffer becomes full, bytes
can no longer be removed from the server TCP send buffer, so it also becomes full.
Once the TCP becomes full, the server cannot send any more bytes into the socket. er becoes uthe server canior send any ore yes o me socket Thus, if the user pauses the video, the server may be forced to stop transmitting, in
which case the server will be blocked until the user resumes the video. which case the server will be blocked until the user resumes the video.
In fact, even during regular playback (that is, without pausing), if the client
application buffer becomes full, back pressure will cause the TCP buffers to become application buffer becomes fall hack nressure will conse the TCP huffers to bcoe
full, which will force the server to reduce its rate. To determine the resulting rate, un, wien will force the server to reduce its rate. 1o determine the resuiting rate,
note that when the client application removes f bits, it creates room for f bits in the
client application buffer, which in turn allows the server to send f additional bits.
Thus, the server send rate can be no higher than the video consumption rate at the
cliant The client. Therefore, a full client application buffer indirectly imposes a limit on the rate
that video can be sent from server to client when streaming over HTTР.
Analysis of Video Streaming
Some simple modeling will provide more insight into initial playout delay and freezing due to application buffer depletion. As shown in Figure 9.3, let B denote the size
Video
server
В
Fill rate = X Depletion rate =r
Internet
Client application buffer
Figure 9.3 Analysis of client-side buffering for video streaming

9.2 STREAMING STORED VIDEO 687
(in bits) of the client's application buffer, and let denote the number of bits that
must be buffered before the client application begins playout. (Of course, < B.)
Let r denote the video consumption rate-the rate at which the client draws bits out Let r denote the video consumption rate the rate at which the client de hac
of the client application buffer during playback. So, for example, if the video's frame erng pауаск. 5o, tor exampie, if the video's frame
rate is 30 frames/sec, and each (compressed) frame is 100,000 bits, then r= 3 Mbps.
 To see the forest through the trees, we'll ignore TCP's send and receive buffers. buffes
Let's assume that the server sends bits at a constant rate x whenever the client sendeve th ee
buffer is not full. (This is a gross simplification, since TCP's send rate varies due
to congestion contror; wa ii examine more realistic time-dependent rates x(t) in the to congestion control; wa'll examine more realistic time-dependent rates x() in the
problems at the end of this chapter.) Suppose at time = 0, the application buffer is
empty and video begins arriving to the client application buffer. Wenow ask at what
umdes time 1=4 does playout begin? And while we are at it, at what time t = t does the client application buffer become full?
rirst, let s determine the time when bits have entered the application buffer First, let's determine he time when O bits have entered the application buffe
and playout begins. Recall that bits arrive to the client application buffer at rate x and
no bits are removed from this buffer before playout begins. Thus, the amount of time the ofti
required rred to build up Q bits (the initial buffering delay) ist = Q/x. d up bns (the tna burfering delay) 1s 2/х.
Now let's determine t, the point in time when the client application buffer
becomes full. We first observe that if x <r(that is, if the server send rate is less than becomes full. We first observe that if x<r (that is, if the server send rate is less than
the video consumption rate), then the client buffer will never become full! Indeed,
startine at fime the buffer will be derleted at rat and ill cd, starting at time t, the buffer will be depleted at rate r and will only be filled at rate
x < r. Eventually the client buffer will empty out entirely, at which time the video xEvenitally the enent buffer will empty out entirely, at which time the video
will freeze on the screen while the client buffer waits another t, seconds to build up
O bits of video. Thus, when the available rate in the network is less than the video
rate, playout will alternate between periods of continuous playout and periods of mяm atte peiween pertoas of conttnuous playout and periods of freezing. In a homework problem, you will be asked to determine the length of each
continuous playout and freezing period as a function of O., r. and x. Now let's deter- Q, r, x.
mine t for when x > r. In this case, starting at time to, the buffer increases from
to B atratesince hiue ter ncreases from to B at rate x-r since bits are being depleted at rate r but are arriving at rate x, as
showin i Pigure 9.3. Given these hints, you will be asked in a homework problem shown in Figure 9.3. Given these hints, you will be asked in a homework problem
to determine t, the time the client buffer becomes full. Note that when the available
rate in the network is more than the video rate, after the initial buffering delay, the
user will enjoy continuous playout until the video ends.
Early Termination and Repositioning the Video
HTTP streaming systems often make use of the HTTP byte-range header in the
HTTP GET request message, which specifies the specific range of bytes the client
currently wants loto the This th cet retrieve from the desired video.This is particularly usefulwhen the
user wants to reposition (that is, jump) to a future point in time in the video. When the user wants to reposition (tmat is, Jump) to a future point in time in the video. When the
user repositions to a new position, the client sends a new HTTP request, indicating with
the byte-range header from which byie in the file should the comar cand the byte-range header from which byte in the file should the server send data. When
the server receives the new HTTP request, itit can can forget aboutanye a earlier request and instead send bytes beginning with the byte indicated in the byte-range request.
688 CHAPTER 9 MULTIMEDIA MU NETWORKING While we are on the subject of repositioning, we briefly mention that when a While we are on the subject of repositioning, we briefly mention that when a
user repositions to a future point in the video or terminates the video early, some
refetched-but-not-vet viewed data transmitted by the server will go unwatched
a waste of network bandwidth and server resources. For example, suppose that
the client huffer ir full with R hite attm into the vide an ot thie fim the client buffer is full with B bits at some time to into the video, and at this time
the user repositions to some instant To + Bir into the video, and then watenes the user repositions to some instant t> to + B/r into the video, and then watches
the video to completion from that point on. In this case, all B bits in the buffer will be
unwatched and the bandwidth and server resources that were used to transmit those
B bits have been completely wasted. There is significant wasted bandwidth in the ben comleere is sigi Internet due to early termination, which can be quite costly, particularly for wireless
links [Ihm 2011]. For this reason, many streaming systems use only a moderate-size
client application buffer, or will limit the amount of prefetched video using the byte- nount of preret
range header in HTTP requests [Rao 2011].
Repositioning and early termination are analogous to cooking a large meal, eat- Kepositioning and early termination are analogous to cooking a large meai, cating only a portion of it, and throwing the rest away, thereby wasting food. So the next
time your parents criticize you for wasting food by not eating all your dinner, you can time your parents criticize vou for wasting food by not eating all vour dinner. vou can
quickly retort by saying they are wasting bandwidth and server resources when they
reposition while watching movies over the Internet! But, of course, two wrongs do sonneitin we the atrt Rut of cou
not make a right-both food and bandwidth are not to be wasted!
In Sections 9.2.1 and 9.2.2, we covered UDP streaming and HTTP streaming,
respectively. A third type of streaming is Dynamic Adaptive Streaming over HTTPТР
(DASH), which uses multiple versions of the video, each compressed at a different
rate. DASH is discussed in detail in Section 2.6.2. CDNs are often used to distribute
stored and live video. CDNs are discussed in detail in Section 2.6.3.
9.3 Voice-over-IP
Real-time conversational voice over the Internet is often referred to as Internet
telephony, since, from the user's perspective, it is similar to the traditional circuitswitched telephone service. It is also commonly called Voice-over-IP (VoIP). In Itisaso commly
this section we describe the principles and protocols underlying VoIP. Conversational video is similar in many respects to VoIP, except that it includes the video
of the participants as well as their voices. To keep the discussion focused and
concrete, we focus here only on voice in this section rather than combined voice
and video.
9.3.1 Limitations of the Best-Effort IP Service
The Internet's network-layer protocol, IP, provides best-effort service. That is to say
the service makes its best effort to move each datagram from source to destination
as quickly as possible but makes no promises whatsoever about getting the packet

9.3 VOICE-OVER-IP 689
to the destination within some delay bound or about a limit on the percentage of
packets lost. The lack of such guarantees poses significant challenges to the design
of real-time conversational applications, which are acutely sensitive to packet delav.
jitter, and loss.
In this section, we'll cover several ways in which the performance of VolP over
a best-effort network can be enhanced. Our focus will be on application-laver techniques, that is, approaches that do not require any changes in the network core or
even in the transport laver at the end hoste To baen the die even in the transport layer at the end hosts. To keep the discussion concrete, we'll
discuss the limitations af best-effort IP service in the context of a specific VolP s or best-efror if service in the context of a specific VolP
example. The sender generates bytes at a rate of 8,000 bytes per second; every
20 msecs the sender gathers these bytes into a chunk. A chunk and a special header
(discussed below) are encapsulated in a UDP segment, via a call to the socket interface.
Thus, the number of bytes in a chunk is (20 msecs) (8,000 bytes/sec) = 160 bytes, Thus the number of bytes in a chumk is (20 mece)8000enace.
and a UDP segment is sent every 20 msees, and a UDP segment is sent very 20 msecs.
If each packet makes it to the receiver with a constant end-to-end delay, then
packets arrive at the receiver periodically every 20 msecs. In these ideal conditions,
the receiver can simply play back each chunk as soon as it arrives. But unfortunately. yka soo as i afives. but untortunatery,
some packets can be lost and most packets will not have the same end-to-end delay,
even in a lightly congested Internet. For this reason. the receiver must take more care. even in a lightly congested Internet. For this reason, the receiver must take more care
in determining (1) when to play back a chunk, and (2) what to do with a missing chunk.
Packet Loss
Consider one of the UDP segments generated by our VolP application. The UDP
segment is encapsulated in an IP datagram. As the datagram wanders through the
network, it passes through router buffers (that is, queues) while waiting for transmission on outbound links. It is possible that one or more of the buffers in the path from it is possiole that one of more of the burrers in the path from
sender to receiver is full, in which case the arriving IP datagram may be discarded,
never to arrive at the receiving application.
Loss could be eliminated by sending the packets over TCP (which provides for
reliable data transfer) rather than over UDP. However, retransmission mechanisms liable data transfer) rather than ver IIDP Howeve
are onen considered unacceptable ror conversational real-time audio applications are often considered unacceptable for conversational real-time audio applications
such as VoIP, because they increase end-to-end delay [Bolot 1996]. Furthermore,
due to TCP congestion control, packet loss may result in a reduction of the TСР due to TCP congestion control. packet loss may result in a reduction of the TCP
sender's transmission rate to a rate that is lower than the receiver's drain rate, possi- blelendineat s ower thaf the reeeivers drain rate, possi- bly leading to buffer starvation. This can have a severe impact on voice intelligibility
at the receiver. For these reasons, most existing VolP applications run over UDP by at the receiver. For these reasons, most existing VoIP applications run over UDP bv
default. [Baset 2006] reports that UDP is used by Skype unless a user is behind a
NAT or firewall that blocks UDP segments seemype (in which case TCP is used). uesa user is benine
bit losing packets is not necessarly as disastrous as one might think. Indeed, But losing packets is not necessarily as disastrous as one might think. Indeed.
packet loss rates between 1 and 20 percent can be tolerated, depending on how voice
is encoded and transmitted, and on how the loss is concealed at the receiver. For
example, forward error correction (FEC) can help conceal packet loss. We'll see
690 CHAPTER 9 MULTIMEDIA NETWORKING below that with FEC, redundant information is transmitted along with the original
information so that some of the lost original data can be recovered from the redundant
information. Nevertheless, if one or more of the links between sender and receiver is
severely congested, and packet loss exceeds 10 to 20 percent (for example, on a wireless link), then there is really nothing that can be done to achieve acceptable audio
quality. Clearly, best-effort service has its limitations.
End-to-End Delay
End-to-end delay is the accumulation of transmission, processing, and queuing
delays in routers; propagation delays in links; and end-system processing delays.
For real-time conversational applications, such as VoIP, end-to-end delays smaller
than 150 msecs are not perceived by a human listener; delays between 150 and 400 are not
msees can be acceptable but are not ideal; and delays exceeding 400 msecs can seri- msecs can be acceptable but are not ideal: and delays exceeding 400 msecs can seri- ously hinder the interactivity in voice conversations. The receiving side of a VoIP
application will typically disregard any packets that are delayed more than a certain
threshold, for example, more than 400 msecs. Thus, packets that are delayed by more
than the threshold are effectively lost.
Packet Jitter
AA crucial component of end-to-end delay is the varying queuing delays that a packet
experiences in the network's routers. Because of these varying delays, the time from
when a packet is generated at the source until it is received at the receiver can fluc- when a packet is generated at the source until it is received at the receiver can fluctuate from packet to packet, as shown in Figure 9.1. This phenomenon is called
jitter. As an example, consider two consecutive packets in our VoIP application.
The
itter
 sender
 A onl
 sends the second packet 20 msees after sending the first packet. But at The sender sends the second packet 20 msecs after sending the first packet. But at
the receiver, the spacing between these packets can become greater than 20 msecs.
To see this, suppose the first packet arrives at a nearly empty queue at a router, but
Just belore the second packet arrives at the queue a large number of packets frоm just before the second packet arrives at the queue a large number of packets from
other sources arrive at the same queue. Because the first packet experiences a small
queuing queuing delay and the t second packet suffers suffers aa large large queuing queuing delay delay ata this this router, router.
the first and second packets become spaced by more than 20 msecs. The spacing
between comsecutive nackete can als become leee than 20 m between consecutive packets can also become less than 20 msecs. To see this, again
consider two consecutive packets. Suppose the first packet joins the end of a queue
with a large number of packets, and the second packet arrives at the queue before
this first packet is transmitted and before any packets from other sources arrive at
the queue. In this case, our two packets find themselves one right after the other in he s da e two packes d meserves ohe riit aitetho the queue. If the time it takes to transmita packet on the router's outbound link is
less than 20 msecs, then the spacing between first and a second packets becomes less
than 20 msecs.
Thaci The situation is analogous to driving cars on roads. Suppose you and your friend
are each driving in your own cars from San Diego to Phoenix. Suppose you and your

9.3 VOICE-OVER-IP 691
friend have similar driving styles, and that you both drive at 100 km/hour, traffic permitting. If your friend starts out one hour before you, depending on intervening
traffic, you may arrive at Phoenix more or less than one hour after your friend. traffic, vou may arrive at Phoenix more or lese than one bote aftar you fend
If the receiver ignores the presence of jitter and plays out chunks as soon tarrive, then tresence or iter and plays out chunks as soon as they arrive, then the resulting audio quality can easily become unintelligible at the
receiver. Fortunately, jitter can often be removed by using sequence numbers, timestamps, and a playout delay, as discussed below.
9.3.2 Removing Jitter at the Receiver for Audio
For our VolP application, where packets are being generated periodically, the receiver should attempt to provide periodic playout of voice chunks in the presence
of random network jitter. This is typically done by combining the following two
mechanisms:
Prepending each chunk with a timestamp. The sender stamps each chunk with the
time at which the chunk was generated.
Delaying playout of chunks at the receiver. As we saw in our earlier discussion of received chunscussion or Figure 9.1, the playout delay of the received audio chunks must be long enough
so that most of the packets are received before their scheduled plavout times. This most the
playout delay can either be fixed throughout the duration of the audio session or
vary adaptively during the audio session lifetime.
We now discuss how these three mechanisms, when combined, can alleviate or even
eliminate the effects of jitter. We examine two playback strategies: fixed playout delay and adaptive playout delay.
Fixed Playout Delay
With the fixed-delay strategy, the receiver attempts to play out each chunk exactly q msecs after the chunk is generated. receiver So if a chunk is timestamped atat the the sender at time at time
1, the receiver plays out the chunk at time 1 + 4,q, assuming the chunk has arrived by
that time. Packets that arrive after their scheduled playout times aare discarded and considered lost. considered lost.
What is aa good choice for q? VoIP can support delays up to about 400 msecs although a more satisfying conversational experience is achieved with smaller values ues ofof q.q. OnOn the the other other hand, hand, ifif gq isis made made much much smaller smaller than than 400 msecs, then many 400 msecs, then many packets may miss their scheduled playback times due to the network-induced packet
jitter. Roughly speaking, if large variations in end-to-end delay are typical, it is preferable toto use use a large q; on the other hand, if delay is small and variations in delay are
also small, it is preferable to use a small q, perhaps less than 150 msecs.
The trade-off between the playback delay and packet loss is illustrated in is
Figure 9.4. The figure shows the times at which packets are generated and played
692 CHAPTER 9 MULTIMEDIA NETWORKING Packets
Playout chedule
Playout lavout
schedule Missed p'-r playout
Packets Packets
generated- received
me
Figure 9.4 Packet loss for different fixed playout delays
out for a single talk spurt. Two distinct initial playout delays are considered. As
shown by the leftmost staircase, the sender generates packets at regular intervals-
 every in enurt say, every 20 msecs. The first packet in this talk spurt is received at time r. As shown
in the figure, the arrivals of subsequent packets are not evenly spaced due to the
network jitter.
For the first playout schedule, the fixed initial playout delay is set to p-r.
With this schedule, the fourth packet does not arrive by its scheduled playout time, e by tsscne and the receiver considers it lost. For the second playout schedule, the fixed initial
playout delay is set to p-p' - r. For this schedule, all packets arrive before their scheduled playout times, and there is therefore no loss.
Adaptive Playout Delay
The previous example demonstrates an important delay-loss trade-off that arises
when designing a playout strategy with fixed playout delays. By making the initial ot delove Ry makine the initial
playout delay large, most packets will make their deadlines and there will therefore playout delay large, most packets will make their deadnnes and there wil thererore
be negligible loss; however, for conversational services such as VoIP, long delays
can become bothersome if not intolerable. Ideally, we would like the playout delay to
bebe minimized mininized The natural subjeet subject way tototo deal the the constratat constraint with this trade-off that the the loss loss is to bebe estimate below lowa athe few ew network percent percent. delay and
the variance of the network delay, and to adjust the playout delay accordingly at the
beginning of each talk spurt. This adaptive adjustment of playout delays at the beginning of the talk spurts will cause the sender's silent periods to be compressed and
elongated; however, compression and elongation of silence by a small amount is not
noticeable in speech.

9.3 VOICE-OVER-IP 693
Following [Ramjee 1994], we now describe a generic algorithm that the receiver
can use to adaptively adjust its playout delays. To this end, let Tothis
1= the timestamp of the ith packet the time the packet was generated by the sender
r= the time packet i is received by receiver
p₁ = the time packet i is played at receiver
The end-to-end network delay of the ith packet is r;-f. Due to network jitter,
this delay will vary from packet to packet. Let d denote an estimate of the average denote an estimate of the average network delay upon reception of the ith packet. This estimate is constructed from the
timestamps as follows:
d= (1u) d-1+ u (r-t)
where u is a fixed constant (for example, u = 0.01). Thus d, is a smoothed average
ofthe observed network delays r 1,- The estimate places more weight
on the recently observed network delays than on the observed network delays of the on the recently observed network delays than on the ohserved network delays of the
distant past. This form of estimate should not be completely unfamiliar; a similar
idea is used to estimate round-trip times in TCP, as discussed in Chapter 3. Let v ides is used to ostimste oin TCP
denote an estimate of the average deviation of the delay from the estimated average
delay. This estimate is also constructed from the timestamps:
v= (1u) v1 + u -4-d
The estimates d, and v, are calculated for every packet received, although they are
used only to determine the playout point for the first packet in any talk spurt.
Once having calculated the receiver employs the following
gorithm for the playout of packets. If packet i is the first packet of a talk spurt, its
playout time, p, is computed as:
p=1+d+ Kv
where K is a positive constant (for example, K = 4). The purpose of the Ky, term
is to set the playout time far enough into the future so that only a small fraс- only
tion of the arriving packets in the talk spurt will be lost due to late arrivals. The
playout point for any subsequent packet in a talk spurt is computed as an offset
from the point in time when the first packet in the talk spurt was played out. In
particular, let
=b 4-d
694 CHAPTER 9 MULTIMEDIA NETWORKING be the length of time from when the first packet in the talk spurt is generated until it
is played out. If packet j also belongs to this talk spurt, it is played out at time falso
p=1+qi
The algorithm just described makes perfect sense assuming that the receiver can
tell whether a packet is the first packet in the talk spurt. This can be done by examin- aigonncket the can
ing the signal energy in each received packet.
9.3.3 Recovering from Packet Loss
We have discussed in some detail how a VoIP application can deal with packet
jitter. We now briefly describe several schemes that attempt to preserve accept- jitter. We now briefly describe several schemes that attempt to preserve accentable audio quality in the presence of packet loss. Such schemes are called loss
recovery schemes Here we define nakat lose in a brood c aket ie lot recovery schemes. Here we define packet loss in a broad sense: A packet is lost
eithernne ifif itit never arrives at the t receiver receiver or ifi it arrives arrives after its its scheduled scheduled playout
time. Our VoIP example will again serve as a context for describing loss recovery schemes.
As mentioned at the beginning of this section, retransmitting lost packets may
not be feasible in a real-time conversational application such as VoIP. Indeed,
retransmitting a packet that has missed its playout deadline serves absolutely no
purpose. And retransmitting a packet that overflowed a router queue cannot normally
be accomplished quickly enough. Recause Because of these considerations, VoIP applica
tions often use some type of loss anticipation scheme. Two types of loss anticipation
schemes are forward error correction (FEC) and interleaving.
Forward Error Correction (FEC)
The basic idea of FEC is to add redundant information to the original packet Thhe Basie de of e is to add redundant iиноаноп to the oigiar packt
stream. For the cost of marginally increasing the transmission rate, the redundant
information can be used to reconstruct approximations or exact versions of some of or
the lost packets. Following [Bolot 1996] and [Perkins 1998], we now outline two
simple FEC mechanieme The firint anended chuk simple FEC mechanisms. The first mechanism sends a redundant encoded chunk
anter every n chunks, The redundant chunk is obtained by exclusive OR-ing the after every n chunks. The redundant chunk is obtained by exclusive OR-ing the n
original chunks [Shacham 1990]. In this manner if any one packet of the group of
nn + 11 packets packets isis lost lo, the receiver receiver can fully ful reconstruct reconstruct the lost los packet. packet. But if two
or more packets in a group are lost, the receiver cannot reconstruct the lost packets. oe packets i a group are fost, the recerver canotreconstet te fost packe
By keeping n + 1, the group size, small, a large fraction of the lost packets can
be recovered recovered when loss isis not excessive. excessive. However, However, the smaller smaller the the group size, s the
greater the relative increase of the transmission rate. In particular, the transmission rate increaces bya factor of Un o that if 3 then the tranemiesionte sion rate increases by a factor of 1/n, so that, if n = 3, then the transmission rate
increases by 33 percent. Furthermore, this simple scheme increases the playout
delay, as the receiver must wait to receive the entire group of packets before it can

9.3 VOICE-OVER-IP 695
begin playout. For more practical details about how FEC works for multimedia transport see [RFC 5109].
The second FEC mechanism is to send a lower-resolution audio stream as the
redddantiniormation. For example, the sender might create a nominal audio stream redundant information. For example, the sender might create a nominal audio stream
and a corresponding low-resolution, low-bit rate audio stream. (The nominal stream
could be a PCM encoding at 64 kbps, and the lower-quality stream could beea a GSM encoding at 13 kbps.) The low-bit rate stream is referred to as the redundant stream. Ae choun in FiouseS thdtsteam As shown in Figure 9.5, the sender constructs the nth packet by taking the nth chunk from the nominal stream and appending to it the (n 1)st chunk from the redundant iromthe nominai streamend appending to it the (n- 1)st chunk from the redundant
stream. In this manner, whenever there is nonconsecutive packet loss, the receiver
can conceal the loss by plaving out the low-bit rate encoded chuk that aivith can conceal the loss by playing out the low-bit rate encoded chunk that arrives with
the subsequent packet. Of course, low-bit rate chunks give lower quality than the
nominal chut ks give lower quanty than the nominal chunks. However, a stream of mostly high-quality chunks, occasional low- quality chunks, and no missing chunks gives good overall audio quality. Note that in quality chunks, and no missing chunks gives good overall audio quality. Note that in
this scheme, the receiver only has to receive two packets before playback, so that the
increased playout delay is small. Furthermore, if the low-bit rate encoding is much rate dine
less than the nominal encoding, then the marginal increase in the transmission rate
will be small.
In order to cope with consecutive loss, we can use a simple variation. Instead of
appending just the (n - 1)st low-bit rate chunk to the nth nominal chunk, the sender thal th oina ehunk, the sender
can append the (n- 1)st and (n 2)nd low-bit rate chunk, or append the (n 1)st
RUD)Srd low-bif rate chunk, and so on. By appending more low-bit rate chunks and (n- 3)rd low-bit rate chunk, and so on. By appending more low-bit rate chunks
to each nominal chunk, the audio quality at the receiver becomes acceptable for a wider variety of harsh best-effort environments On the other hand the wider variety of harsh best-effort environments. On the other hand, the additional
chunks increase the transmission bandwidth and the playout delay.
Original tream
3 4 Redundancy
2 loss 3 Recelved eived
3 Reconstructed
Figure 9.5 Piggybacking lower-quality redundant information
696 CHAPTER 9 MULTIMEDIA NETWORKING Interleaving
As an alternative to redundant transmission, a VoIP application can send interleaved
audio. As shown in Figure 9.6, the sender resequences units of audio data before
transmission, so that originally adjacent units are separated by a certain distance in
the transmitted stream. Interleaving can mitigate the effect of packet losses. If, for
example. units are 5 msecs in length and chunks are 20 msecs (that is. four units per
chunk), then the first chunk could contain units 1, 5, 9, and 13; the second chunk could
contain units and 14; and so on. Figure 9.6 shows that the loss of a single 2. 6. 10.
packet from an interleaved stream results in multiple small gaps in the reconstructed
stream, as opposed to the single large gap that would occur in a noninterleaved stream.
Interieaving Interleaving can significantly improve the perceived quality of an audio stream can significantly improve the perceived quality of an audio stream
[Perkins 1998]. It also has low overhead. The obvious disadvantage of interleaving
is that it increases latency. This limits its use for conversational applications such as
VoIP, although it can perform well for streaming stored audio. A major advantage gtcpeo we tor aoage
of interleaving is that it does not increase the bandwidth requirements of a stream.
Error Concealment
Error error conceaiment concealment schemes senemes attempt attempt toto produce produce a replacement for a lost packet that a replacement tor lost pack is similar to the original. As discussed in [Perkins 1998], this is possible since audio
2 3 4 5 67 8 9 10 11 12 13 14 15 16 Original stream
Interleaved 15 16 stream
Received 5 13 2 loss stream
Reconstructed 12 4 56 8 9 10 12 14 16 stream
Figure 9.6 Sending interleaved audio

9.3 VOICE-OVER-IP 697
signals, and in particular speech, exhibit large amounts of short-term self-similarity. signais, and in particutar speech, exhibit large amounts of short-term self-similarity.
As such, these techniques work for relatively small loss rates (less than 15 percent),
and for small packets (4-40 msecs). When the loss length approaches the length of
a phoneme (5-100 msecs) these techniques break down, since whole phonemes may
be missed by the listener.
Perhaps the simplest form of receiver-based recovery is packet repetition. Packet
repetition replaces lost packets with copies of the packets that arrived immediately
before the loss. It has low computational complexity and performe reaconably well before the loss. It has low computational complexity and performs reasonably well.
Another form of receiver-based recovery is interpolation, which uses audio before andsr thl-ased ecovery is erpoiation, whien uses audio berore and after the loss to interpolate a suitable packet to cover the loss. Interpolation performs somewhat better than packet repetition but is significantly more computationally intensive [Perkins 1998].
9.3.4 Case Study: VoIP with Skype
Skype is an immensely popular VolP applcation with over 50 million accounts ular VoIP application with over 50 million account
active on a daily basis. In addition to providing host-to-host VoIP service, Skype
offers host-to-phone services phone-to-host services and multi narty hoetto hoet offers host-to-phone services, phone-to-host services, and multi-party host-to-host
video conferencing services. (Here, a host is again any Internet connected IP device. ecing services, (rhere, a nost is again any nternet connected if device, including PCs, tablets, and smartphones.) Skype was acquired by Microsoft in 2011.
Because the Skype protocol is proprietary, and because all Skype's control and
media packets are encrypted, it is difficult to precisely determine how Skype operates.
Nevertheless, from the Skype Web site and several measurement studies, researchers Nevertheloes from the Skine Weh cite and so
nave learned now skype generailly works [Baset 2006; Guha 2006; Chen 2006; Suh have learned how Skype generally works [Baset 2006: Guha 2006: Chen 2006: Suh
2006; Ren 2006; Zhang X 2012]. For both voice and video, the Skype clients have
at their disposal many different codecs, which are capable of encoding the media at
a wide range of rates and qualities. For example, video rates for Skype have been
measured to be as low as 30 kbps for a low-quality session up to almost 1 Mbps for a
high quality session [Zhang X 2012]. Typically. Skype's audio quality is better than
the "POTS" (Plain Old Telephone Service) quality provided by the wire-line phone
system. (Skype codecs typically sample voice at 16,000 samples/sec or higher, which
provides richer tones than POTS, which samples at 8,000/sec.) By default, Skype provides cner fones ta POs, whien samples at 8,000/see.) By deraut, Skyре sends audio and video packets over UDP. However, control packets are sent over
TCP. and media packets are also sent over TCP when firewalls block UDP streams TCP, and media packets are also sent over TCP when firewalls block UDP streams.
Skype uses FEC for loss recovery for both voice and video streams sent over UDP.
The Skype client also adapts the audio and video streams it sends to current network The Skyne client aleo dante the adin and vid
conditions, by changing video quality and FEC overhead [Zhang X 2012].
Skype uses P2P techniques in a number of innovative ways, nicely illustrating
how P2P can be used in applications that go beyond content distribution and file how P2P can be used in applications that eo bevond content distrihution and fi
sharing. As with instant messaging, host-to-host Internet telephony is inherently P2Р ESessaging, ost-1o-nost iternet telephony is innerentiy PZP since, at the heart of the application, pairs of users (that is, peers) communicate with
each other in real time. But Skype also employs P2P techniques for two other important functions, namely, for user location and for NAT traversal.
698 CHAPTER 9 MULTIMEDIA NETWORKING Figure 9.7 Skype peers
Skype
Caner
Skype
Callee
neer Relay Deer
As shown in Figure 9.7, the peers (hosts) in Skype are organized into a hierarchical overlay network, with each peer classified as a super peer or an ordinary peer
Skype maintains an index that maps Skype usernames to current IP addresses (and
port numbers). This index is distributed over the super peers. When Alice wants to port numbers). This index is distributed over the super peers. When Alice wants to
call Bob, her Skype client searches the distributed index to determine Bob's current
IP address. Because the Skype protocol isis proprietary, it is currently not known how
the index mappings are are organized across the super peers, although some form of
DHT organization is very possible.
P2P techniques are also used in Skype relays, which are useful for establishing
calls between hosts in home networks. Many home network configurations provide
access to the Internet through NATs, as discussed in Chapter 4. Recall that a NAT access to the Internet thronch NATe se diceuced in Chanter d. Racall that NAT
prevents a host from outside the home network from initiating a connection to a prevents a nost from outside the nome network from initiating a connection to a
host within the home network. If both Skype callers have NATs, then there is a
problem-neither can accept a call initiated by the other making a call seeminoly problem-neither can accept a call initiated by the other, making a call seemingly
impossible. The clever use of super peers and relays nicely solves this problem. use of super peers ad retays icery sorves this proie Suppose that when Alice signs in, she is assigned to a non-NATed super peer and
initiatesa session to that super peer. (Since Alice is initiating the session, her NAT her
permits this session.) This session allows Alice and her super peer to exchange

9.3 VOICE-OVER-IP 999
control messages. The same happens for Bob when he signs in. Now. when Alice when Allce
wants to call Bob, she informs her super peer, who in turn informss Bob's super
peer, who in turn informs Bob of Alice's incoming call. If Bob accent Bob of Alice's incoming call. If Bob accepts Lots the call the
two super peepeers select a thir hird non-NATed super peer-the relay peer-whohose job
will be to re will he to relay data betweenen Alice and Bob. Alice's and Bob's super peers ce'e and Ro then
instruct Alice AI and Bob respecti stetAce and bob respect ectively to initiate a session with the relay. As shownwn inin
Figure 9.7. .7 Alice then sends voic oice packets to the relay over the Alice-to-relayy connect necti was ackets ction (which was initiated by A by Alice). and the relay then forwards these nac Alice), and the relay then forwards these pacackets
ver the relay-to-Bob connection( on (which was initiated by Bob); packets from BBob
too Alice flow over these same two two relay connections in reverse. And voila!-Bob andAlice have an end-to-end conr Al onnection even though neither can accept a session
origina inating from outside.
Un fo owur discuss Up to now, our discussiono on Skype has focused on calls involving two persons.
Now let's examine multi-pafty ym mt patty fty audio conference calls. With N > 2 participants, if nterence cas participants, I
each user were to send a copyby of its audio stream to each of the N - 1 other users,
then a tota otal of N(N - 1) aud then a totatal of N(N-1) aud audio streams would need to be sent into the network to
support the t audio conference.e. To reduce this bandwidth usage, Skype employs a
clever dist clever distril tribution technique.. Specifically, each user sends its andstre audio stream to the
conference initiator. i The confe comerence i uator. he come aerence iiator combines the audio streams into one nference initiator combines the audio streams into one
stream (basica illy by adding all all the audio signals together) and then sends a copу
of each each of the other N - 1 participants. In this manner, of each combi nhined stream to N-1
the number of streams is reduced to 2(N 1). For ordinary two-person video convereatione Sie the the oll versations, Skype routes the call peer-to-peer, unless NAT traversal is required,
in which case the call is relayed through a non-NATed peer, as described earlier. in which case the call is relayed through a non-NATed peer, as described earlier.
For a video conference call involving N > 2 participants, due to the nature of the
video medium, Skype does not combine the call into one stream at one location and
ten edst h stea to a he partcipans, as it tes o oecas. nstea then redistribute the stream to all the participants, as it does for voice calls. Instead,
each participant's video stream is routed to a server cluster (located in Estonia as of
2011), which in turn relays to each participant the N - 1 streams of the N - 1 other N- Nparticipants [Zhang X 2012]. You may be wondering why each participant sends a
copy to a server rather than directly sending a copy of its video stream to each of rvar rather than diraethy
the other N - 1 participants? Indeed, for both approaches, N(N - 1) video streams the otner IN partucipants? ndeed, lor both approaches, V(N- 1) Video streams
are being collectively received by the N participants in the conference. The reason
is. because unstream link bandwidths are significantly lower than downstream link is, because upstream link bandwidths are significantly lower than downstream link
bandwidths in most access links, the upstream links may not be able to support the
- 1 streams with the P2P approach.
VolP systems such as Skype, WeChat, and Google Talk introduce new privacy
concerns. Specifically, when Alice and Bob communicate over VoIP, Alice can sniff
Bob's IP address and then use geo-location services [MaxMind 2016; Quova 2016]
toto determine determine Bob's sob s current current location location and ISP (for example, his work or home ISP). In and ISP (for example, his work or home ISP). In fact, with Skype it is possible for Alice to block the transmission of certain packets
during call establishment so that she obtains Bob's current IP address, say every
hour, without Bob knowing that he is being tracked and without being on Bob's
700 CHAPTER 9 MULTIMEDIA NETWORKING cont st. rurtnermore, the ir address discovereа пот экурe can be correlated contact list. Furthermore, the IP address discovered from Skype can be correlated
with IP addresses found in BitTorrent, so that Alice can determine the files that Bob
is downloading [LeBlond 2011]. Moreover, it is possible to partially decrypta Skype
call by doing a traffic analysis of the packet sizes in a stream [White 2011].
9.4 Protocols for Real-Time Conversational
Applications
Real-time conversational applications, including VoIP and video conferencing, are
compelling and very popular. It is therefore not surprising that standards bodies, such
asa the IETF and ITU, have been busy for many years (and continue to be busy!) at e sy or ay years (and o tobe usy:) at hammering out standards for this class of applications. With the appropriate standards in place for real-time conversational applications, independent companies are
creating new products that interoperate with each other. In this section we examine
RTP and SIP for real-time conversational applications. Both standards are enjoying
widespread implementation in industry products.
9.4.1 RTP
In the previous section, we learned that the sender side of a VolP application appends
header fields to the audio chunks before passing them to the transport layer. These
header fields include sequence numbers and timestamps. Since most multimedia net- heoder fielde inelude c
working applications can make use of sequence numbers and timestamps, it is convenient to have a standardized packet structure that includes fields for audio/video
data. sequence number. and timestamp, as well as other potentially useful fields data, sequence number, and timestamp, as well as other potentially useful fields.
RTP, defined in RFC 3550, is such a standard. RTP can be used for transporting
common formats such as PCM, ACC, and MP3 for sound and MPEG and H.263
for video. It can also be used for transporting proprietary sound and video formats. for video. It can also be used for transporting proprietary sound and video formats.
Today, RTP enjoys widespread implementation in many products and research prototynes It is also complementary to other important rmaltime interactive no totypes. It is also complementary to other important real-time interactive protocols,
such as SIP. sucn as sir.
In this section, we provide an introduction to RTP. We also encourage you to
visit Henning Schulzrinne's RTP site [Schulzrinne-RTP 2012], which provides a
00101 9oraton on the suoject. Atso, you may want tovisit wealth of information on the subject. Also, you may want to visit the RAT site [RAT 2012], which documents VoIP application that uses RTP.
RTP Basics
RTP typically runs on top of UDP. The sending side encapsulates a media chunk
within an RTP packet, then encapsulates the packet in a UDP segment, and then

9.4 PROTOCOLS FOR REAL-TIME CONVERSATIONALAL APPLICATIONS 701
hands the segment to IP. The receiving side extracts the RTP packet from the UDP
segment, then extracts the media chunk from the RTP packet, and then passes the
chunk to the media player for decoding and rendering.
As an example, consider the use of RTP to transport volce. Suppose the voice
source is PCM-encoded (that is, sampled, quantized, and digitized) at 64 kbps. Fur- ther ther suppose that the application collects the encoded data in 20-msec chunks, that
is, 160 bytes in a chunk. The sending sidedine a seonence number. is, 160 bytes in a chunk. The sending side precedes each chunk of the audio data with an RTP header that includes the type of audio encoding, a sequence number, and a timestamp. The RTP header is normally 12 bytes. The audio chunk along with
the RTP header form the RTP packet. The RTP packet is then sent into the UDP
socket interface. At the receiver side, the application receives the RTP packet from ace At the mnriver side theolication receives the RTP nacket from
its socket interface. The application extracts the audio chunk from the RTP packet its socket interface. The application extracts the audio chunk from the RTP packet
and uses the header fields of the RTP packet to properly decode and play back the
audio chunk.
If an application incorporates RTP-instead of a proprietary scheme to provide far appicaоп ооhe annicatinn will more a payload type, sequence numbers, or timestamps--then the application will more easilv interoperate with other networked multimedia applications. For example, if two ily interoperate with other networked muinimedia appilcations. ror exampie, if two
different companies develop VolP software and they both incorporate RTP into their
product there may he some hone that a user using one of the YolP products will product, there may be some hope that a user using one of the VolP products will
be able to communicate with a user using the otner or produet. in section 6'47 be able to communicate with a user using the other VoIP product. In Section 9.4.2,
we'll see that RTP is often used in conjunction with SIP standard for
Internet telephony.
an important
It should be emphasized that RTP does not provide any mechanism to ensure
timaly dalisof dt ovide other ualitf (oS) uarantees it timely delivery of data or provide other quality-of-service (QoS) guarantees; it
does not even guarantee delnvery of packets or prevent out-or-order denvery of does not even guarantee delivery of packets or prevent out-of-order delivery of
packets. Indeed, RTP encapsulation is seen only at the end systems. Routers do
not distinguish between IP datagrams that carry RTP packets and IP datagrams
that don't.
RTP allows each source (for example, a camera or a microphone) to be assigned
its own independent RTP stream of packets. For example, for a video conference a
between two participants, four RTP streams could be opened-two streams for
transmitting the audio (one in each direction) and two streams for transmitting the tranemitting the audio (one in each direction) and two streame fortrpemittine the
video (again, (again, one inin each each direction). However, manyy popular popular encoding encoding techniques techniques
including MPEG 1 and MPEG 2-bundle the audio and video into a single stream
during the encoding process. When the audio and video are bundled by the encoder,
then only one RTP stream is generated in each direction. then ony one RF stream is generated in each direcion. RTP packets are not limited to unicast applications. They can also be sent over
one-to-many -to-many and many-to-many many-to-many multicast multicast trees. For aa many-to-many many-to-many multicast multicast ses-es
sion, all of the session's senders and sources typically use the same multicast group
as for sending their RTP streams. RTP multicast streams belonging together, such as
audio and video streams emanating from multiple senders in a video conference
application, belong to an RTP session.
702 CHAPTER 9 MULTIMEDIA NETWORKING Figure 9.8 RTP header fields
RTP Packet Header Fields
Payload Payload
type
Sequence Seque Synchronization Miscellaneous Timestamp numbe field As shown in Figure 9.8, the four main RTP packet header fields are the payload type,
sequence number, timestamp, and source identifier fields.
The payload type field in the RTP packet is 7 bits long. For an audio stream, the
payload type field is used to indicate the type of audio encoding (for example, PCM,
adaptive delta modulation, linear predictive encoding) that is being used. If a sender аарае ел donear prengy tat is being used i a sender
decides to change the encoding in the middle of a session, the sender can inform the
receiver of the change through this pavload type field. The sender may want to change receiver of the change through this payload type field. The sender may want to change
the encoding in order to increase the audio quality or to decrease the RTP stream bit
rate. Table 9.2 lists some of the audio payload types currently supported by RTP. rate Table 62 liste some of the audio pavload tynes curently sunnorted b RTP
For a video stream, the payload type is used to indicate the type of video encoding For a video stream, the payload type is used to indicate the type of video encoding (for example, motion JPEG, MPEG 1, MPEG 2, H.261). Again, the sender can change
video encoding on the fly during a session. Table 9.3 lists some of the video payload
types currently supported by RTP. The other important fields are the following:
Sequence number field. The sequence number field is 16 bits long. The sequence
number increments by one for each RTP packet sent, and may be used by the the
receiver to detect packet loss and to restore packet sequence. For example, if
the receiver side of the application receives a stream of RTP packets with a the receiver side of the application receives a stream of RTP packets with a gap
between sequence numbers 86 and 89, then the receiver knows that packets 87
and 88 are missing. The receiver can then attempt to conceal the lost data.
Timestamp field. The timestamp field is 32 bits long. It reflects the sampling
instant of the first byte in the RTP data packet. As we saw in the preceding instant of the first byte in the RTP data packet. As we saw in the preceding
section, the receiver can use timestamps to remove packet jitter introduced in
the network and to powide synchronue ot at the receiver The ti the network and to provide synchronous playout at the receiver. The timestamp
is derived from a sampling clock at the sender. As an example, for audio the is deived from a sampng clock a the sender. As an example, for audio te timestamp clock increments by one for each sampling period (for example, each
125 µsec for an 8 kHz sampling clock); if the audio application generates chunks
consisting of 160 encoded samples, then the timestamp increases by 160 for each
RTP oacket when the RTP packet when the source is active. The timestamp clock continues to increase
at a constant rate even if the source is inactive.
Synchronization source identifier (SSRC). The SSRC field is 32 bits long. It identifies the source of the RTP stream. Typically, each stream in an RTP session
has a distinct SSRC. The SSRC is not the IP address of the sender, but instead is
a number that the source assigns randomly when the new stream is started. The a nunber that the source assigns randonly when the new stream is started. Ihe probability that two streams get assigned the same SSRC is very small. Should
this happen, the two sources pick a new SSRC value.

9.4 PROTOCOLS FOR REAL-TIME CONVERSATIONAL APPLICATIONS
Payload-Type Number Audio Format Sampling Rate Rate PCM μ-law 8 kHz 64 kbps
1 1016 8 kHz 4.8 kbps
3 GSM 8 kHz 13 kbps
7 IPC 8 kHz 2.4 kbps
9 G.22 16 kHz 48-64 kbps
14 MPEG Audio 90 kHz
15 G.728 8 kHz 16 kbps
Table 9.2 Audioo payload types supported by RTP
Payload-Type Number Video Format
26 Motion JPEG
31 H.261
32 MPEG 1 video
33 MPEG 2 video
Table 9.3 + Some video payload types supported by RTP
9.4.2 SIP
The Session Initiation Protocol (SIP), defined in [RFC 3261; RFC 5411], is an open
and lightweight protocol that does the following:
It provides mechanisms for establishing calls betweena a caller and a callee over
an IP network. It allows the caller to notify the callee that it wants to start a call.
It allows the participants to agree on media encodings. It also allows participants
toto end end calls. eans.
It provides mechanisms for the caller to determine the current IP address of the it provides meenanists tor the eaer to deternine the cuffent ir address of the
callee. Users do not have a single, fixed IP address because they may be assigned
addresses dynamically (using DHCP) and because they may have multiple IP
devices, each with a different IP address
It provides mechanisms for call management, such as adding new media streams drine the eall chaeine during the call, changing the encoding during the call, inviting new participants
during the call, call transfer, and call holding.
703