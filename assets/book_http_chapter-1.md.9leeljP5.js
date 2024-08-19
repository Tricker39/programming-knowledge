import{M as t}from"./chunks/MTag.1c3HeCmR.js";import{c as o,m as e,a,J as r,w as p,a7 as l,o as i}from"./chunks/framework.BVPdqVqB.js";const P=e("h1",{id:"第一章-了解-web-及网络基础",tabindex:"-1"},[a("第一章 了解 Web 及网络基础 "),e("a",{class:"header-anchor",href:"#第一章-了解-web-及网络基础","aria-label":'Permalink to "第一章 了解 Web 及网络基础"'},"​")],-1),h=e("h2",{id:"_1-1-使用-http-协议访问-web",tabindex:"-1"},[a("1.1 使用 HTTP 协议访问 Web "),e("a",{class:"header-anchor",href:"#_1-1-使用-http-协议访问-web","aria-label":'Permalink to "1.1 使用 HTTP 协议访问 Web"'},"​")],-1),T=e("code",null,"HTTP",-1),n=l('<h2 id="_1-2-http-的诞生" tabindex="-1">1.2 HTTP 的诞生 <a class="header-anchor" href="#_1-2-http-的诞生" aria-label="Permalink to &quot;1.2 HTTP 的诞生&quot;">​</a></h2><h3 id="_1-2-1-为知识共享而规划-web" tabindex="-1">1.2.1 为知识共享而规划 Web <a class="header-anchor" href="#_1-2-1-为知识共享而规划-web" aria-label="Permalink to &quot;1.2.1 为知识共享而规划 Web&quot;">​</a></h3><p>1989 年 3 月，HTTP 诞生，最初设想的基本理念是：借助多文档之间相互关联形成的超文本（<code>HyperText</code>），连成可相互参阅的 WWW（World Wide Web，万维网）。</p><p>WWW 的 3 项构建技术：</p><ul><li>HTML</li><li>HTTP</li><li>URL</li></ul><h3 id="_1-2-2-web-成长时代" tabindex="-1">1.2.2 Web 成长时代 <a class="header-anchor" href="#_1-2-2-web-成长时代" aria-label="Permalink to &quot;1.2.2 Web 成长时代&quot;">​</a></h3><ul><li>1990 年 11 月，CERN 研发了世界第一台 Web 服务器和 Web 浏览器</li><li>1990 年，HTML 1.0 草案被废除</li><li>1993 年，NCSA 研发的 Mosaic 问世</li><li>1994 年，网景通信公司发布 Netscape Navigator 1.0</li><li>1995 年，微软发布 IE 1.0 和 IE 2.0</li><li>2000 年，Mozilla 发布 Firefox 浏览器</li><li>至今，Chrome、Opera、Safari 纷纷抢占市场份额</li></ul><h3 id="_1-2-3-驻足不前的-http" tabindex="-1">1.2.3 驻足不前的 HTTP <a class="header-anchor" href="#_1-2-3-驻足不前的-http" aria-label="Permalink to &quot;1.2.3 驻足不前的 HTTP&quot;">​</a></h3><h4 id="http-0-9" tabindex="-1">HTTP/0.9 <a class="header-anchor" href="#http-0-9" aria-label="Permalink to &quot;HTTP/0.9&quot;">​</a></h4><p>HTTP 于 1990 问世，那是没有正式的标准，因此成为 HTTP/0.9（意指 HTTP/1.0 之前）。</p><h4 id="http-1-0" tabindex="-1">HTTP/1.0 <a class="header-anchor" href="#http-1-0" aria-label="Permalink to &quot;HTTP/1.0&quot;">​</a></h4><p>1996 年 5 月，HTTP/1.0 作为正式标准被公布，并记载于 RFC1945。</p><h4 id="http-1-1" tabindex="-1">HTTP/1.1 <a class="header-anchor" href="#http-1-1" aria-label="Permalink to &quot;HTTP/1.1&quot;">​</a></h4><p>1997 年 1 月，HTTP/1.1 发布，是现在主流的 HTTP 协议版本。新一代 HTTP/2.O 正在制作中，但要达到较高的覆盖率，仍需假以时日。</p><h2 id="_1-3-网络基础-tcp-ip" tabindex="-1">1.3 网络基础 TCP/IP <a class="header-anchor" href="#_1-3-网络基础-tcp-ip" aria-label="Permalink to &quot;1.3 网络基础 TCP/IP&quot;">​</a></h2><p>通常使用的网络（包括互联网）是在 TCP/IP 协议族的基础上运作的。而 HTTP 属于它内部的一个子集。</p><h3 id="_1-3-1-tcp-ip-协议族" tabindex="-1">1.3.1 TCP/IP 协议族 <a class="header-anchor" href="#_1-3-1-tcp-ip-协议族" aria-label="Permalink to &quot;1.3.1 TCP/IP 协议族&quot;">​</a></h3><p>不同的硬件、操作系统之间的通信，所有的这一切都需要一种规则。我们把这种规则成为协议（<code>protocol</code>）。</p><p>TCP/IP 协议有两种说法：</p><ul><li>TCP/IP 是指 TCP 和 IP 这两种协议</li><li>TCP/IP 是指通信过程中协议族的统称</li></ul><h3 id="_1-3-2-tcp-ip-的分层管理" tabindex="-1">1.3.2 TCP/IP 的分层管理 <a class="header-anchor" href="#_1-3-2-tcp-ip-的分层管理" aria-label="Permalink to &quot;1.3.2 TCP/IP 的分层管理&quot;">​</a></h3><p>TCP/IP 协议族里重要的一点就是分层。TCP/IP 协议族按层次分为 4 层：应用层、传输层、网络层、数据链路层。</p><p>TCP/IP 协议族各层的作用如下</p><p><strong>应用层</strong></p><p>应用层决定了向用户提供应用服务时通信的活动。</p><p>比如，FTP（File Transfer Protocol，文件传输协议）和 DNS（Domain Name System，域名系统）服务就是其中两类。HTTP 协议也处于该层。</p><p><strong>传输层</strong></p><p>传输层对上层应用层，提供处于网络连接中的两台计算机之间的数据传输。</p><p>在传输层有两个性质不同的协议：TCP（Transmission Control Protocol，传输控制协议）和 UDP（User Data Protocol，用户数据报协议）。</p><p><strong>网络层（又名网络互连层）</strong></p><p>网络层用来处理在网络上流动的数据包。该层规定了通过怎样的路径（所谓的传输路线）到达对方计算机，并把数据包传送给对方。</p><p>网络层所起的作用就是在众多的选项内选择一条传输路线。</p><p><strong>链路层（又名数据链路层，网络接口层）</strong></p><p>用来处理连接网络的硬件部分。包括控制操作系统、硬件的设备驱动、NIC（Network Interface Card，网络适配器，即网卡），及光纤等物理可见部分（还包括连接器等一切传输媒介）。<code>硬件上的范畴均在链路层的作用范围之内</code>。</p><h3 id="_1-3-3-tcp-ip-通信传输流" tabindex="-1">1.3.3 TCP/IP 通信传输流 <a class="header-anchor" href="#_1-3-3-tcp-ip-通信传输流" aria-label="Permalink to &quot;1.3.3 TCP/IP 通信传输流&quot;">​</a></h3><p><img src="https://s21.ax1x.com/2024/07/09/pkfrGnI.png" alt="pkfrGnI.png" loading="lazy"></p><p>利用 TCP/IP 协议族进行网络通信时，会通过分层顺序与对方进行通信。发送端从应用层往下走，接收端则往应用层往上走。</p><p><strong>TCP/IP 通信过程</strong></p><p>首先作为发送端的客户端在应用层（HTTP 协议）发出一个想看某个 Web 页面的 HTTP 请求。</p><p>接着在传输层（TCP 协议）把从应用层处收到的数据（HTTP 请求报文）进行分割，并在各个报文上打上标记序号及端口号后转发给网络层。</p><p>在网络层（IP 协议），增加作为通信目的地的 MAC 地址后转发给链路层。</p><p>这样一来，发往网络的通信请求就准备齐全了。接收端的服务器在链路层接收到数据，按序往上层发送，一直到应用层。当传输到应用层，才能算真正接收到由客户端发送过来的 HTTP 请求。</p><p><img src="https://s21.ax1x.com/2024/07/11/pkhsfA0.png" alt="TCP/IP 通信过程.png" loading="lazy"></p><p>发送端在层与层之间传输数据时，每经过一层时必定会被打上一个该层所属的首部信息。反之，接收端在层与层传输数据时，每经过一层时会把对应的首部消去。</p><p>这种把数据信息包装起来的做法称为<code>封装</code>（<code>encapsulate</code>）。</p><h2 id="_1-4-与-http-关系密切的协议-ip、tcp-和-dns" tabindex="-1">1.4 与 HTTP 关系密切的协议：IP、TCP 和 DNS <a class="header-anchor" href="#_1-4-与-http-关系密切的协议-ip、tcp-和-dns" aria-label="Permalink to &quot;1.4 与 HTTP 关系密切的协议：IP、TCP 和 DNS&quot;">​</a></h2><h3 id="_1-4-1-负责传输的-ip-协议" tabindex="-1">1.4.1 负责传输的 IP 协议 <a class="header-anchor" href="#_1-4-1-负责传输的-ip-协议" aria-label="Permalink to &quot;1.4.1 负责传输的 IP 协议&quot;">​</a></h3><p>IP（Internet Protocol）网际协议位于网络层。Internet Protocol 这个名称可能听起来有点夸张，但事实正是如此，因为几乎所有使用网络的系统都会用到 IP 协议。TCP/IP 协议族中的 IP 指的就是网际协议，协议名称中占据了一半位置，其重要性可见一斑。</p><p>IP 协议的作用是把各种数据包传送给对方。而要保证确实传送到对方那里，则需要满足各类条件。其中两个重要的条件是 <code>IP 地址</code>和<code> MAC 地址</code>（Media Access Control Address）。</p><ul><li>IP 地址指明了节点被分配到的地址</li><li>MAC 地址是指网卡所属的固定地址</li></ul><p>IP 地址可以和 MAC 地址进行配对。IP 地址可变换，但 MAC 地址基本上不会更改。</p><p>IP 间的通信依赖 MAC 地址。在通信过程中，会利用下一站中转设备的 MAC 地址来搜索下一个中转目标。这时，会采用 ARP 协议（Address Resolution Protocol）。ARP 是一种用以解析地址的协议，根据通信方的 IP 地址就可以反查出对应的 MAC 地址。</p><p>在到达通信目标前的中转过程中，那些计算机和路由器等网络设备只能获悉很粗略的传输路线。</p><p>这种机制称为路由选择（routing），有点像快递公司的送货过程。</p><h3 id="_1-4-2-确保可靠性的-tcp-协议" tabindex="-1">1.4.2 确保可靠性的 TCP 协议 <a class="header-anchor" href="#_1-4-2-确保可靠性的-tcp-协议" aria-label="Permalink to &quot;1.4.2 确保可靠性的 TCP 协议&quot;">​</a></h3><p>TCP 位于传输层，提供可靠的字节流服务。</p><p>所谓的字节流服务（Byte Stream Service）是指，为了方便传输，将大块数据分割成以<code>报文段</code>（<code>segment</code>）为单位的数据包进行管理。而可靠的传输服务是指，能够把数据准确可靠地传给对方。一言以蔽之， TCP 协议为了更容易传送大数据才把数据分割，而且 TCP 协议能够确认数据最终是否送达到对方。</p><p>TCP 协议采用了三次握手（three-way handshaking）策略。用 TCP 协议把数据包送出去后，TCP 不会对传送后的情况置之不理，它一定会向对方确认是否成功送达。握手过程中使用了 TCP 的标志（flag） —— SYN（synchronize） 和 ACK（acknowledgement）。</p><p>发送端首先发送一个带 SYN 标志的数据包给对方。接收端收到后，回传一个带有 SYN/ACK 标志的数据包以示传达确认信息。最后，发送端再回传一个带 ACK 标志的数据包，代表“握手”结束。若在握手过程中某个阶段莫名中断，TCP 协议会再次以相同的顺序发送相同的数据包。</p>',59),u=JSON.parse('{"title":"第一章 了解 Web 及网络基础","description":"","frontmatter":{},"headers":[],"relativePath":"book/http/chapter-1.md","filePath":"book/http/chapter-1.md","lastUpdated":1724075374000}'),c={name:"book/http/chapter-1.md"},I=Object.assign(c,{setup(s){return(d,b)=>(i(),o("div",null,[P,h,e("p",null,[a("Web 使用一种 "),T,a(" ("),r(t,null,{default:p(()=>[a("Hypertext Transfer Protocol")]),_:1}),a(" ，超文本传输协议)的协议作为规范，完成从客户端到服务器端等一系列运作流程。而协议是指规则的约定。可以说，Web 是建立在 HTTP 协议上通信的。")]),n]))}});export{u as __pageData,I as default};
