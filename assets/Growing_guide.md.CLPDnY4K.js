import{ax as t,q as a,aQ as i,p as n}from"./chunks/framework.YncYQaD9.js";const o="/vitepress-demo-mondaylab/assets/vue8.DU1DMuci.png",s="/vitepress-demo-mondaylab/assets/vue9.D923D7m-.png",h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Growing/guide.md","filePath":"Growing/guide.md"}'),l={name:"Growing/guide.md"};function r(d,e,c,p,m,g){return n(),a("div",null,e[0]||(e[0]=[i('<h2 id="描述" tabindex="-1">描述 <a class="header-anchor" href="#描述" aria-label="Permalink to &quot;描述&quot;">​</a></h2><p>​ 一个月之前我研究博客搭建，然后申请了一个有效期为一个月的token，在这一个月期间没有什么问题。直到昨天我token过期，发现自动部署失效，于是研究了几个小时，有了这篇文章。</p><h2 id="解决方法" tabindex="-1">解决方法 <a class="header-anchor" href="#解决方法" aria-label="Permalink to &quot;解决方法&quot;">​</a></h2><ol><li>点击github个人头像，选择setting</li><li>跳转页面后选取左侧Developer setting菜单（最后一个）</li><li>跳转后选择 Psonal access token 菜单下面的最后一个 Tokens</li><li>点击右侧Gennerate new token 如图 <img src="'+o+'" alt="vue8.png"></li><li>选择过期时间的时候选择一个合适的，我是直接选择了一年</li><li>创建完以后复制这个token</li><li>回到你部署项目的页面点击Settings</li><li>点击左侧Secrets and variables =&gt; Action 然后看到这样的页面 设置完以后重新提交即可自动部署 <img src="'+s+'" alt="vue9.png"></li></ol>',4)]))}const _=t(l,[["render",r]]);export{h as __pageData,_ as default};