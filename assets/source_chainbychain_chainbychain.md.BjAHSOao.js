import{_ as a,c as t,a2 as n,o as i}from"./chunks/framework.Dz7_3PEu.js";const p="/assets/image-20240508102428780.CN3fehix.png",l="/assets/image-20240508102817461.CY-wkgkH.png",e="/assets/image-20240508102830735.CWzfBVi3.png",h="/assets/image-20240508112552120.By_PC7ad.png",g=JSON.parse('{"title":"什么是以链建链？","description":"","frontmatter":{},"headers":[],"relativePath":"source/chainbychain/chainbychain.md","filePath":"source/chainbychain/chainbychain.md","lastUpdated":1736756758000}'),d={name:"source/chainbychain/chainbychain.md"};function o(r,s,c,k,u,q){return i(),t("div",null,s[0]||(s[0]=[n('<h1 id="什么是以链建链" tabindex="-1">什么是以链建链？ <a class="header-anchor" href="#什么是以链建链" aria-label="Permalink to &quot;什么是以链建链？&quot;">​</a></h1><p>如果你正在运行一条2.0版本以上的晶格区块链，现有业务产生的数据较多，但与主体业务无关，或需要与其他业务数据隔离。那么你就可以通过<strong>以链建链</strong>新建一个账本来为这类业务提供区块链支持。</p><p><img src="'+p+'" alt="image-20240508102428780"></p><h1 id="功能介绍" tabindex="-1">功能介绍 <a class="header-anchor" href="#功能介绍" aria-label="Permalink to &quot;功能介绍&quot;">​</a></h1><h2 id="使用说明" tabindex="-1">使用说明 <a class="header-anchor" href="#使用说明" aria-label="Permalink to &quot;使用说明&quot;">​</a></h2><p>通过<a href="#attachmentABI">附件的合约ABI</a>向你运行的晶格链发起相关交易</p><p>以链建链合约提供的服务以及参数说明</p><table tabindex="0"><thead><tr><th></th><th>ABI</th><th></th></tr></thead><tbody><tr><td>新建链</td><td>newChain</td><td></td></tr><tr><td>加入链</td><td>oldChain</td><td></td></tr><tr><td>停止链</td><td>stopChain</td><td></td></tr><tr><td>启动链</td><td>startChain</td><td></td></tr><tr><td>删除链</td><td>delChain</td><td></td></tr></tbody></table><h2 id="新建链" tabindex="-1">新建链 <a class="header-anchor" href="#新建链" aria-label="Permalink to &quot;新建链&quot;">​</a></h2><p>发起新建链时的参数如下：</p><table tabindex="0"><thead><tr><th>参数名</th><th>类型</th><th>备注</th><th></th><th></th><th>默认值</th></tr></thead><tbody><tr><td>consensus</td><td>uint8</td><td>0:继承主链1: poa 2:pbft 3:raft 默认</td><td></td><td>&gt;0</td><td>继承主链</td></tr><tr><td>tokenless</td><td>bool</td><td>是否有币</td><td></td><td></td><td>继承主链</td></tr><tr><td>godAmount</td><td>uint256</td><td>盟主初始余额</td><td></td><td></td><td>继承主链</td></tr><tr><td>period</td><td>uint64</td><td>出块间隔，单位：ms</td><td></td><td></td><td>继承主链</td></tr><tr><td>noEmptyAnchor</td><td>bool</td><td>不允许快速出空块</td><td></td><td></td><td>继承主链</td></tr><tr><td>emptyAnchorPeriodMul</td><td>uint64</td><td>空块等待次数</td><td></td><td></td><td>继承主链</td></tr><tr><td>isContractVote</td><td>bool</td><td>开启生命周期</td><td></td><td></td><td>继承主链</td></tr><tr><td>isDictatorship</td><td>bool</td><td>开启盟主独裁</td><td></td><td></td><td>继承主链</td></tr><tr><td>deployRule</td><td>uint8</td><td>合约部署规则</td><td></td><td></td><td>继承主链</td></tr><tr><td>name</td><td>string</td><td>链名称</td><td></td><td></td><td>主链name_child_子链id</td></tr><tr><td>chainId</td><td>uint256</td><td>链Id</td><td></td><td></td><td>1000-&gt;10001</td></tr><tr><td>chainMemberGroup</td><td>Member</td><td>[]chainMemberGroup</td><td>Address</td><td>节点地址</td><td>必填</td></tr><tr><td></td><td>MemberType</td><td></td><td>uint8</td><td>0: 见证1：共识</td><td></td></tr><tr><td>preacher</td><td>Address</td><td>创世节点地址,不做特殊指定时preacher也是共识节点</td><td></td><td></td><td>必填</td></tr><tr><td>bootStrap</td><td>string</td><td>创世节点Inode</td><td></td><td></td><td>不可为空</td></tr><tr><td>contractPermission</td><td>bool</td><td>合约内部管理开关</td><td></td><td></td><td>继承主链</td></tr><tr><td>chainByChainVote</td><td>uint8</td><td>以链建链投票开关</td><td></td><td></td><td>继承主链</td></tr><tr><td>proposalExpireTime</td><td>uint</td><td>提案过期时间（天）</td><td></td><td></td><td>继承主链</td></tr><tr><td>desc</td><td>string</td><td>链描述</td><td></td><td></td><td>空</td></tr><tr><td>configModifyRule</td><td>uint8</td><td>链配置更改规则</td><td></td><td>1: 盟主独裁；2：共识投票</td><td>继承主链</td></tr></tbody></table><p>建链的时序图（如果有投票，这个过程在投票通过后才出发）：</p><p><img src="'+l+'" alt="image-20240508102817461"></p><h2 id="加入链" tabindex="-1">加入链 <a class="header-anchor" href="#加入链" aria-label="Permalink to &quot;加入链&quot;">​</a></h2><p>加入链的参数说明</p><table tabindex="0"><thead><tr><th>参数名</th><th>类型</th><th>备注</th></tr></thead><tbody><tr><td>chainId</td><td>uint</td><td>需要加入的链ID</td></tr><tr><td>networkId</td><td>uint</td><td>需要假如的链所在的网络ID</td></tr><tr><td>nodeInfo</td><td>string</td><td>指定一个已经加入该链的节点地址</td></tr><tr><td>accessMembers</td><td>[]address</td><td>指定哪些节点加入该链</td></tr></tbody></table><p>加入其他链的时序图：</p><p><img src="'+e+'" alt="image-20240508102830735"></p><h2 id="停止链" tabindex="-1">停止链 <a class="header-anchor" href="#停止链" aria-label="Permalink to &quot;停止链&quot;">​</a></h2><p>停止的链不能是 <code>$ConfigsDir</code>/genesis.json的链</p><p>停止链的交易可以发给任意一个正在运行的链 <code>cbyc_chainStatus</code>=start</p><p>链成功停止后，不会在继续出块，不能再对链做任何写入操作，只能做读取操作。</p><h2 id="启动链" tabindex="-1">启动链 <a class="header-anchor" href="#启动链" aria-label="Permalink to &quot;启动链&quot;">​</a></h2><p>重新启动已经停止的链。</p><h2 id="删除链" tabindex="-1">删除链 <a class="header-anchor" href="#删除链" aria-label="Permalink to &quot;删除链&quot;">​</a></h2><p>删除已经停止的链，对正在运行的链发起删除的操作不会执行。</p><h2 id="链的生命周期" tabindex="-1">链的生命周期 <a class="header-anchor" href="#链的生命周期" aria-label="Permalink to &quot;链的生命周期&quot;">​</a></h2><p><img src="'+h+`" alt="image-20240508112552120"></p><h1 id="附件" tabindex="-1">附件 <a class="header-anchor" href="#附件" aria-label="Permalink to &quot;附件&quot;">​</a></h1><h2 id="以链建链合约" tabindex="-1"><span id="attachmentContract">以链建链合约</span> <a class="header-anchor" href="#以链建链合约" aria-label="Permalink to &quot;&lt;span id=&quot;attachmentContract&quot;&gt;以链建链合约&lt;/span&gt;&quot;">​</a></h2><p>合约地址：zltc_ZDfqCd4ZbBi4WA7uG4cGpFWRyTFqzyHUn</p><h3 id="合约abi" tabindex="-1"><span id="attachmentABI"> 合约ABI </span> <a class="header-anchor" href="#合约abi" aria-label="Permalink to &quot;&lt;span id=&quot;attachmentABI&quot;&gt; 合约ABI &lt;/span&gt;&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		&quot;inputs&quot;: [</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				&quot;internalType&quot;: &quot;uint256&quot;,</span></span>
<span class="line"><span>				&quot;name&quot;: &quot;chainId&quot;,</span></span>
<span class="line"><span>				&quot;type&quot;: &quot;uint256&quot;</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		],</span></span>
<span class="line"><span>		&quot;name&quot;: &quot;delChain&quot;,</span></span>
<span class="line"><span>		&quot;outputs&quot;: [],</span></span>
<span class="line"><span>		&quot;stateMutability&quot;: &quot;nonpayable&quot;,</span></span>
<span class="line"><span>		&quot;type&quot;: &quot;function&quot;</span></span>
<span class="line"><span>	},</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		&quot;inputs&quot;: [</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				&quot;internalType&quot;: &quot;string&quot;,</span></span>
<span class="line"><span>				&quot;name&quot;: &quot;jsonMap&quot;,	</span></span>
<span class="line"><span>				&quot;type&quot;: &quot;string&quot;</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		],</span></span>
<span class="line"><span>		&quot;name&quot;: &quot;newChain&quot;,</span></span>
<span class="line"><span>		&quot;outputs&quot;: [],</span></span>
<span class="line"><span>		&quot;stateMutability&quot;: &quot;nonpayable&quot;,</span></span>
<span class="line"><span>		&quot;type&quot;: &quot;function&quot;</span></span>
<span class="line"><span>	},</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		&quot;inputs&quot;: [</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				&quot;internalType&quot;: &quot;uint256&quot;,</span></span>
<span class="line"><span>				&quot;name&quot;: &quot;chainId&quot;,</span></span>
<span class="line"><span>				&quot;type&quot;: &quot;uint256&quot;</span></span>
<span class="line"><span>			},</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				&quot;internalType&quot;: &quot;uint64&quot;,</span></span>
<span class="line"><span>				&quot;name&quot;: &quot;networkId&quot;,</span></span>
<span class="line"><span>				&quot;type&quot;: &quot;uint64&quot;</span></span>
<span class="line"><span>			},</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				&quot;internalType&quot;: &quot;string&quot;,</span></span>
<span class="line"><span>				&quot;name&quot;: &quot;nodeInfo&quot;,</span></span>
<span class="line"><span>				&quot;type&quot;: &quot;string&quot;</span></span>
<span class="line"><span>			},</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				&quot;internalType&quot;: &quot;address[]&quot;,</span></span>
<span class="line"><span>				&quot;name&quot;: &quot;accessMembers&quot;,</span></span>
<span class="line"><span>				&quot;type&quot;: &quot;address[]&quot;</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		],</span></span>
<span class="line"><span>		&quot;name&quot;: &quot;oldChain&quot;,</span></span>
<span class="line"><span>		&quot;outputs&quot;: [],</span></span>
<span class="line"><span>		&quot;stateMutability&quot;: &quot;nonpayable&quot;,</span></span>
<span class="line"><span>		&quot;type&quot;: &quot;function&quot;</span></span>
<span class="line"><span>	},</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		&quot;inputs&quot;: [</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				&quot;internalType&quot;: &quot;uint256&quot;,</span></span>
<span class="line"><span>				&quot;name&quot;: &quot;chainId&quot;,</span></span>
<span class="line"><span>				&quot;type&quot;: &quot;uint256&quot;</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		],</span></span>
<span class="line"><span>		&quot;name&quot;: &quot;stopChain&quot;,</span></span>
<span class="line"><span>		&quot;outputs&quot;: [],</span></span>
<span class="line"><span>		&quot;stateMutability&quot;: &quot;nonpayable&quot;,</span></span>
<span class="line"><span>		&quot;type&quot;: &quot;function&quot;</span></span>
<span class="line"><span>	},</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		&quot;inputs&quot;: [</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				&quot;internalType&quot;: &quot;uint256&quot;,</span></span>
<span class="line"><span>				&quot;name&quot;: &quot;chainId&quot;,</span></span>
<span class="line"><span>				&quot;type&quot;: &quot;uint256&quot;</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		],</span></span>
<span class="line"><span>		&quot;name&quot;: &quot;startChain&quot;,</span></span>
<span class="line"><span>		&quot;outputs&quot;: [],</span></span>
<span class="line"><span>		&quot;stateMutability&quot;: &quot;nonpayable&quot;,</span></span>
<span class="line"><span>		&quot;type&quot;: &quot;function&quot;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>]</span></span></code></pre></div><h2 id="晶格api" tabindex="-1">晶格API <a class="header-anchor" href="#晶格api" aria-label="Permalink to &quot;晶格API&quot;">​</a></h2><h3 id="cbyc-getchildchainid" tabindex="-1"><strong>cbyc_getChildChainId</strong> <a class="header-anchor" href="#cbyc-getchildchainid" aria-label="Permalink to &quot;**cbyc_getChildChainId**&quot;">​</a></h3><h4 id="获取已有子链的id" tabindex="-1">获取已有子链的ID <a class="header-anchor" href="#获取已有子链的id" aria-label="Permalink to &quot;获取已有子链的ID&quot;">​</a></h4><p>示例</p><p><code>cbyc17_getChildChainId</code>, 查询链Id为17的所有子链</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &quot;jsonrpc&quot;: &quot;2.0&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &quot;method&quot;: &quot;cbyc17_getChildChainId&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &quot;params&quot;: [ </span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &quot;id&quot;: 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="cbyc-getchainstatus" tabindex="-1"><strong>cbyc_getChainStatus</strong> <a class="header-anchor" href="#cbyc-getchainstatus" aria-label="Permalink to &quot;**cbyc_getChainStatus**&quot;">​</a></h3><h4 id="获取链运行状态-running-stop" tabindex="-1">获取链运行状态 （running/stop） <a class="header-anchor" href="#获取链运行状态-running-stop" aria-label="Permalink to &quot;获取链运行状态 （running/stop）&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;jsonrpc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;method&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cbyc17_getChainStatus&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;params&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [ </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>返回值: running/stop</p><h3 id="cbyc-getcreatedallchains" tabindex="-1">cbyc_getCreatedAllChains <a class="header-anchor" href="#cbyc-getcreatedallchains" aria-label="Permalink to &quot;cbyc_getCreatedAllChains&quot;">​</a></h3><h4 id="获取当前链创建的所有子链" tabindex="-1">获取当前链创建的所有子链 <a class="header-anchor" href="#获取当前链创建的所有子链" aria-label="Permalink to &quot;获取当前链创建的所有子链&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;jsonrpc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;method&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;latc_getProtocols&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;params&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="cbyc-selfjoinchain" tabindex="-1">cbyc_selfJoinChain <a class="header-anchor" href="#cbyc-selfjoinchain" aria-label="Permalink to &quot;cbyc_selfJoinChain&quot;">​</a></h3><h4 id="让当前节点加入某条链" tabindex="-1">让当前节点加入某条链 <a class="header-anchor" href="#让当前节点加入某条链" aria-label="Permalink to &quot;让当前节点加入某条链&quot;">​</a></h4><p>参数：</p><ul><li>链id</li><li>网络id</li><li>已知已经有该链的节点的Inode</li></ul><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;jsonrpc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;method&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cbyc_selfJoinChain&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;params&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        1213</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        12</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;xxxx&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>返回值：成功或错误信息</p><h3 id="cbyc-stopselfchain" tabindex="-1">cbyc_stopSelfChain <a class="header-anchor" href="#cbyc-stopselfchain" aria-label="Permalink to &quot;cbyc_stopSelfChain&quot;">​</a></h3><h4 id="停止当前节点的链服务" tabindex="-1">停止当前节点的链服务 <a class="header-anchor" href="#停止当前节点的链服务" aria-label="Permalink to &quot;停止当前节点的链服务&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;jsonrpc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;method&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cbyc_stopSelfChain&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;params&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>返回值：成功或错误信息</p><h3 id="cbyc-startselfchain" tabindex="-1">cbyc_startSelfChain <a class="header-anchor" href="#cbyc-startselfchain" aria-label="Permalink to &quot;cbyc_startSelfChain&quot;">​</a></h3><h4 id="开启当前节点的链服务" tabindex="-1">开启当前节点的链服务 <a class="header-anchor" href="#开启当前节点的链服务" aria-label="Permalink to &quot;开启当前节点的链服务&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;jsonrpc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;method&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cbyc_startSelfChain&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;params&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>返回值：成功或错误信息</p><h3 id="cbyc-restartselfchain" tabindex="-1">cbyc_restartSelfChain <a class="header-anchor" href="#cbyc-restartselfchain" aria-label="Permalink to &quot;cbyc_restartSelfChain&quot;">​</a></h3><h4 id="重启当前节点的链服务" tabindex="-1">重启当前节点的链服务 <a class="header-anchor" href="#重启当前节点的链服务" aria-label="Permalink to &quot;重启当前节点的链服务&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;jsonrpc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;method&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cbyc_restartSelfChain&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;params&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>返回值：成功或错误信息</p><h3 id="cbyc-delselfchain" tabindex="-1">cbyc_delSelfChain <a class="header-anchor" href="#cbyc-delselfchain" aria-label="Permalink to &quot;cbyc_delSelfChain&quot;">​</a></h3><h4 id="删除当前节点的链服务及数据" tabindex="-1">删除当前节点的链服务及数据 <a class="header-anchor" href="#删除当前节点的链服务及数据" aria-label="Permalink to &quot;删除当前节点的链服务及数据&quot;">​</a></h4><blockquote><p>不能撤销，成功请求后，节点关与此链的链账本会被删除。</p></blockquote><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;jsonrpc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;method&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cbyc_delSelfChain&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;params&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>返回值：成功或错误信息</p><h3 id="node-getallchainid" tabindex="-1">node_getAllChainId <a class="header-anchor" href="#node-getallchainid" aria-label="Permalink to &quot;node_getAllChainId&quot;">​</a></h3><h4 id="返回该节点维护的链id" tabindex="-1">返回该节点维护的链ID <a class="header-anchor" href="#返回该节点维护的链id" aria-label="Permalink to &quot;返回该节点维护的链ID&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;jsonrpc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;method&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;node_getAllChainId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;params&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="latc-latcinfo" tabindex="-1">latc_latcInfo <a class="header-anchor" href="#latc-latcinfo" aria-label="Permalink to &quot;latc_latcInfo&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;jsonrpc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;method&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;latc_latcInfo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;params&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">481</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,74)]))}const y=a(d,[["render",o]]);export{g as __pageData,y as default};
