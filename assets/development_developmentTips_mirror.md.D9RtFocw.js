import{ax as s,q as e,aQ as t,p as i}from"./chunks/framework.YncYQaD9.js";const g=JSON.parse('{"title":"包管理工具配置镜像","description":"","frontmatter":{},"headers":[],"relativePath":"development/developmentTips_mirror.md","filePath":"development/developmentTips_mirror.md"}'),p={name:"development/developmentTips_mirror.md"};function n(l,a,o,r,c,d){return i(),e("div",null,a[0]||(a[0]=[t('<h1 id="包管理工具配置镜像" tabindex="-1">包管理工具配置镜像 <a class="header-anchor" href="#包管理工具配置镜像" aria-label="Permalink to &quot;包管理工具配置镜像&quot;">​</a></h1><h2 id="一、npm" tabindex="-1">一、npm <a class="header-anchor" href="#一、npm" aria-label="Permalink to &quot;一、npm&quot;">​</a></h2><ol><li><p>设置淘宝镜像</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm config set registry https://registry.npmmirror.com/</span></span></code></pre></div></li><li><p>查看源</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm config get registry</span></span></code></pre></div></li><li><p>切回官方镜像</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm config set registry https://registry.npmjs.org/</span></span></code></pre></div></li><li><p>npm临时使用</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm --registry https://registry.npmmirror.com install XXX（模块名）</span></span></code></pre></div></li></ol><h2 id="二、yarn" tabindex="-1">二、yarn <a class="header-anchor" href="#二、yarn" aria-label="Permalink to &quot;二、yarn&quot;">​</a></h2><ol><li><p>设置淘宝镜像</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>yarn config set registry https://registry.npmmirror.com</span></span></code></pre></div></li><li><p>查看源</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>yarn config set registry https://registry.yarnpkg.com</span></span></code></pre></div></li><li><p>切换官方镜像</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>yarn config set registry https://registry.yarnpkg.com</span></span></code></pre></div></li></ol><h2 id="三、pnpm" tabindex="-1">三、pnpm <a class="header-anchor" href="#三、pnpm" aria-label="Permalink to &quot;三、pnpm&quot;">​</a></h2><ol><li><p>设置淘宝镜像</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm config set registry https://registry.npmmirror.com</span></span></code></pre></div></li><li><p>查看源</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm config get registry</span></span></code></pre></div></li><li><p>切换官方镜像</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm config set registry https://registry.npmjs.org</span></span></code></pre></div></li></ol><h2 id="四、常见问题" tabindex="-1">四、常见问题 <a class="header-anchor" href="#四、常见问题" aria-label="Permalink to &quot;四、常见问题&quot;">​</a></h2><p><a href="https://so.csdn.net/so/search?q=npm&amp;spm=1001.2101.3001.7020" target="_blank" rel="noreferrer">npm</a>修改了下载源，仍然是之前的下载源。或者下载失败、下载到某处停止不动。可以进行如下操作。 <strong>（1）清除缓存</strong><strong>（2）将对应项目中的node_modules文件夹以及package-lock.json文件删除。 （3）执行安装 + 需要的下载源。</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm cache clean -f</span></span></code></pre></div>',10)]))}const m=s(p,[["render",n]]);export{g as __pageData,m as default};