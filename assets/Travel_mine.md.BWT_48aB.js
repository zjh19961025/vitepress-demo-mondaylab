import{ax as w,a as m,o as T,n as C,P as x,al as E,p as i,q as l,aR as V,ai as f,u as W,U as p,O as _,F as g,a8 as k,M as I,t as d,T as M}from"./chunks/framework.YncYQaD9.js";const $={__name:"password",emits:["change"],setup(t,{emit:a}){const e=m(null),n=m("");T(()=>{C(()=>{e.value.focus()})});const o=a,s=()=>{o("change",V(n))};return(r,c)=>x((i(),l("input",{ref_key:"inputRef",ref:e,type:"password",onInput:s,"onUpdate:modelValue":c[0]||(c[0]=u=>n.value=u),placeholder:"Password",name:"text",class:"input"},null,544)),[[E,n.value]])}},q=w($,[["__scopeId","data-v-0b7f3921"]]),B=[{name:"镜头下两只睡觉的猫咪",src:"https://raw.githubusercontent.com/zjh19961025/vitepress-demo-mondaylab/master/docs/public/img/myCat/cat-1.png"},{name:"一条三戈",src:"https://raw.githubusercontent.com/zjh19961025/vitepress-demo-mondaylab/master/docs/public/img/myCat/cat-2.png"},{name:"上下床猫咪",src:"https://raw.githubusercontent.com/zjh19961025/vitepress-demo-mondaylab/master/docs/public/img/myCat/cat-3.png"},{name:"就爱黏在一起",src:"https://raw.githubusercontent.com/zjh19961025/vitepress-demo-mondaylab/master/docs/public/img/myCat/cat-4.png"}],D=[{name:"宿舍所有人",src:"https://raw.githubusercontent.com/zjh19961025/vitepress-demo-mondaylab/master/docs/public/img/school/allPeople.png"},{name:"宿舍大酒量",src:"https://raw.githubusercontent.com/zjh19961025/vitepress-demo-mondaylab/master/docs/public/img/school/dfc.png"},{name:"宿舍小渣渣",src:"https://raw.githubusercontent.com/zjh19961025/vitepress-demo-mondaylab/master/docs/public/img/school/zzm.png"},{name:"我和学霸",src:"https://raw.githubusercontent.com/zjh19961025/vitepress-demo-mondaylab/master/docs/public/img/school/iandjm.png"}],L=[{name:"小可爱",src:"https://raw.githubusercontent.com/zjh19961025/vitepress-demo-mondaylab/master/docs/public/img/family/gilrFrend.png"},{name:"摩天轮",src:"https://raw.githubusercontent.com/zjh19961025/vitepress-demo-mondaylab/master/docs/public/img/family/FerrisWheel.png"},{name:"海洋馆",src:"https://raw.githubusercontent.com/zjh19961025/vitepress-demo-mondaylab/master/docs/public/img/family/ocean-1.png"}],h={cat:B,school:D,family:L},N={mounted(t,a){b(t,a.value.text)},updated(t,a){var e;F(t,((e=a.value)==null?void 0:e.text)||"")},unmounted(t){j(t)}};async function b(t,a){const e=t.querySelector("canvas")||document.createElement("canvas"),n=!t.querySelector("canvas");if(e.dataset.rendText=a,!t.dataset.mutationObserverParent){const r=new MutationObserver(c=>U(c,t,a));r.observe(t,{childList:!0}),t.dataset.mutationObserverParent=r}if(e.id="watermark-canvas",e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.zIndex="99",e.style.pointerEvents="none",["display","opacity","visible","transform","clip-path"].forEach(r=>{e.style[r]="revert"}),n){const r=new MutationObserver(()=>J(t,a));r.observe(e,{attributes:!0}),t.dataset.mutationObserverCanvas=r}n&&t.appendChild(e),e.width=window.screen.width*.9,e.height=window.screen.height*.9;const s=e.getContext("2d");if(s){s.rotate(-20*Math.PI/180),s.font="24px serif",s.fillStyle="rgba(180, 180, 180, 1)",s.textAlign="left",s.textBaseline="middle";for(let r=-e.width/100;r<e.width/100;r++)for(let c=-e.height/200;c<e.height/200;c++)s.fillText(a,r*300,c*300)}}async function F(t,a){const e=t.querySelector("#watermark-canvas");e&&e.dataset.rendText===a||(e&&e.dataset.rendText!==a&&j(t),b(t,a))}async function U(t,a,e){if(a.dataset.focusRemove)return;const n=t[0].removedNodes;let o=!1;n.forEach(s=>{s.id==="watermark-canvas"&&(o=!0)}),o&&b(a,e)}async function J(t,a){t.dataset.canvasRending||(t.dataset.canvasRending="rending",await b(t,a),t.dataset.canvasRending="")}async function j(t){var e,n,o,s;t.dataset.focusRemove=!0,(n=(e=t.dataset.mutationObserverParent)==null?void 0:e.disconnect)==null||n.call(e),await C();const a=t.querySelector("#watermark-canvas");a&&((s=(o=a.dataset.mutationObserverCanvas)==null?void 0:o.disconnect)==null||s.call(o),a.remove())}const A={class:"photo-wall"},H={class:"img-list"},Z={class:"imgTitle"},G=["src","onClickCapture"],K=["src"],Q={__name:"photo",setup(t){const a={text:"ZJH"},e=m([]);Object.keys(h).forEach(c=>{h[c].forEach(u=>{e.value.push(u.src)})});const n=m(!1),o=m(""),s=c=>{o.value=c,n.value=!0},r=m([{time:"我的猫",listSrc:[],list:h.cat},{time:"大学时光",listSrc:[],list:h.school},{time:"家人时光",listSrc:[],list:h.family}]);return(c,u)=>{const z=f("el-card"),O=f("el-timeline-item"),S=f("el-timeline"),P=f("el-dialog");return i(),l(g,null,[x((i(),l("div",A,[p(S,null,{default:_(()=>[(i(!0),l(g,null,k(r.value,(v,ne)=>(i(),I(O,{timestamp:v.time,type:"primary",placement:"top"},{default:_(()=>[p(z,null,{default:_(()=>[d("div",H,[(i(!0),l(g,null,k(v.list,(y,R)=>(i(),l("div",{key:R,class:"img-item-con"},[d("div",Z,M(y.name),1),d("img",{src:y.src,class:"avatar",alt:"",onClickCapture:oe=>s(y.src)},null,40,G)]))),128))])]),_:2},1024)]),_:2},1032,["timestamp"]))),256))]),_:1})])),[[W(N),a]]),p(P,{modelValue:n.value,"onUpdate:modelValue":u[0]||(u[0]=v=>n.value=v),width:"500"},{default:_(()=>[d("div",null,[d("img",{src:o.value,class:"avatar",alt:""},null,8,K)])]),_:1},8,["modelValue"])],64)}}},X=w(Q,[["__scopeId","data-v-7c587917"]]),Y={id:"mineContent"},ee={key:1},te={__name:"mine",setup(t){const a=m(!0),e=m(null),n=o=>{o==="zjh"&&(a.value=!1)};return(o,s)=>(i(),l("div",Y,[a.value?(i(),l(g,{key:0},[s[0]||(s[0]=d("i",{class:"iconfont suoshui lockIcon"},null,-1)),s[1]||(s[1]=d("div",{class:"overlay"},null,-1)),p(q,{class:"dialog",onChange:n})],64)):(i(),l("div",ee,[p(X,{ref_key:"photoRef",ref:e},null,512)]))]))}},ae=w(te,[["__scopeId","data-v-70b72272"]]),ce=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Travel/mine.md","filePath":"Travel/mine.md"}'),se={name:"Travel/mine.md"},ie=Object.assign(se,{setup(t){return(a,e)=>(i(),l("div",null,[p(ae)]))}});export{ce as __pageData,ie as default};