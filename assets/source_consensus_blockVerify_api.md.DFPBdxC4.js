import{_ as a,c as t,a2 as n,o as p}from"./chunks/framework.Dz7_3PEu.js";const u=JSON.parse('{"title":"接口说明","description":"","frontmatter":{},"headers":[],"relativePath":"source/consensus/blockVerify/api.md","filePath":"source/consensus/blockVerify/api.md","lastUpdated":1736756758000}'),i={name:"source/consensus/blockVerify/api.md"};function e(l,s,d,o,r,c){return p(),t("div",null,s[0]||(s[0]=[n(`<h1 id="接口说明" tabindex="-1">接口说明 <a class="header-anchor" href="#接口说明" aria-label="Permalink to &quot;接口说明&quot;">​</a></h1><h3 id="latc-getdblockproof" tabindex="-1">latc_getDBlockProof <a class="header-anchor" href="#latc-getdblockproof" aria-label="Permalink to &quot;latc_getDBlockProof&quot;">​</a></h3><p>获取守护区块的证明</p><p>入参：</p><p><code>int</code></p><p>请求示例：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;http://192.168.1.185:41001&#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">--header </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Content-Type: application/json&#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">--data </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;jsonrpc&quot;: &quot;2.0&quot;,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;method&quot;: &quot;latc_getDBlockProof&quot;,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;params&quot;: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">       151</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    ],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;id&quot;: 481</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}&#39;</span></span></code></pre></div><p>返回值：</p><table tabindex="0"><thead><tr><th>参数名</th><th></th><th>含义</th></tr></thead><tbody><tr><td>Hash</td><td></td><td>对该hash签名</td></tr><tr><td>Owner</td><td></td><td>签名的所有者</td></tr><tr><td>DaemonHash</td><td></td><td>守护区块的hash</td></tr><tr><td>Number</td><td></td><td></td></tr><tr><td>EndNumber</td><td></td><td></td></tr><tr><td>Expect</td><td></td><td>预料中有其证明的DBlock高度</td></tr><tr><td>Signers</td><td></td><td>区块见证的签名者</td></tr><tr><td>VerifySigners</td><td></td><td>区块验证的签名者</td></tr></tbody></table><p>示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;jsonRpc&quot;: &quot;2.0&quot;,</span></span>
<span class="line"><span>    &quot;id&quot;: 481,</span></span>
<span class="line"><span>    &quot;result&quot;: {</span></span>
<span class="line"><span>        &quot;Hash&quot;: &quot;0x69c5cd625d241581f4128ab751b18591a058926293e500cb06e5b950d78c166b&quot;,</span></span>
<span class="line"><span>        &quot;Owner&quot;: &quot;zltc_RTUbadrrZ9tGSnKtP74JeFHwJ8sWWkBik&quot;,</span></span>
<span class="line"><span>        &quot;DaemonHash&quot;: &quot;0x165312fd573fb9655062a02d435db06e1635025ce5eb85937944fd5925c56085&quot;,</span></span>
<span class="line"><span>        &quot;Number&quot;: 151,</span></span>
<span class="line"><span>        &quot;EndNumber&quot;: 151,</span></span>
<span class="line"><span>        &quot;Expect&quot;: null,</span></span>
<span class="line"><span>        &quot;Signers&quot;: [</span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span>        &quot;VerifySigners&quot;: [</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,11)]))}const k=a(i,[["render",e]]);export{u as __pageData,k as default};
