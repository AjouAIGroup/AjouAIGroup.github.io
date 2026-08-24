import{h as Sn,R as jt,a as g,i as Dt,j as S,b as Ln,r as ce,k as Pn}from"./index-CmGal128.js";const ot=()=>{};let $e={},Vt={},Ut=null,Wt={mark:ot,measure:ot};try{typeof window<"u"&&($e=window),typeof document<"u"&&(Vt=document),typeof MutationObserver<"u"&&(Ut=MutationObserver),typeof performance<"u"&&(Wt=performance)}catch{}const{userAgent:st=""}=$e.navigator||{},U=$e,h=Vt,lt=Ut,ue=Wt;U.document;const j=!!h.documentElement&&!!h.head&&typeof h.addEventListener=="function"&&typeof h.createElement=="function",Gt=~st.indexOf("MSIE")||~st.indexOf("Trident/");var _="classic",Bt="duotone",L="sharp",P="sharp-duotone",Nn=[_,Bt,L,P],Tn={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds"}},ct={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},En=["kit"],On=/fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/,In=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,Rn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},Fn={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds"}},Mn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds"}},zn={classic:["fas","far","fal","fat"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds"]},jn={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid"}},Dn={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds"}},Ht={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid"}},Vn=["solid","regular","light","thin","duotone","brands"],Kt=[1,2,3,4,5,6,7,8,9,10],Un=Kt.concat([11,12,13,14,15,16,17,18,19,20]),te={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Wn=[...Object.keys(zn),...Vn,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",te.GROUP,te.SWAP_OPACITY,te.PRIMARY,te.SECONDARY].concat(Kt.map(e=>"".concat(e,"x"))).concat(Un.map(e=>"w-".concat(e))),Gn={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Bn={kit:{"fa-kit":"fak"}},Hn={kit:{fak:"fa-kit"}},ut={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}};const M="___FONT_AWESOME___",Oe=16,Yt="fa",Xt="svg-inline--fa",Y="data-fa-i2svg",Ie="data-fa-pseudo-element",Kn="data-fa-pseudo-element-pending",Je="data-prefix",qe="data-icon",ft="fontawesome-i2svg",Yn="async",Xn=["HTML","HEAD","STYLE","SCRIPT"],$t=(()=>{try{return!0}catch{return!1}})(),Jt=[_,L,P];function se(e){return new Proxy(e,{get(t,n){return n in t?t[n]:t[_]}})}const qt={...Ht};qt[_]={...Ht[_],...ct.kit,...ct["kit-duotone"]};const H=se(qt),Re={...Dn};Re[_]={...Re[_],...ut.kit,...ut["kit-duotone"]};const ie=se(Re),Fe={...jn};Fe[_]={...Fe[_],...Hn.kit};const K=se(Fe),Me={...Mn};Me[_]={...Me[_],...Bn.kit};const $n=se(Me),Jn=On,Qt="fa-layers-text",qn=In,Qn={...Tn};se(Qn);const Zn=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],we=te,Q=new Set;Object.keys(ie[_]).map(Q.add.bind(Q));Object.keys(ie[L]).map(Q.add.bind(Q));Object.keys(ie[P]).map(Q.add.bind(Q));const ea=[...En,...Wn],ae=U.FontAwesomeConfig||{};function ta(e){var t=h.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function na(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}h&&typeof h.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(t=>{let[n,a]=t;const r=na(ta(n));r!=null&&(ae[a]=r)});const Zt={styleDefault:"solid",familyDefault:"classic",cssPrefix:Yt,replacementClass:Xt,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};ae.familyPrefix&&(ae.cssPrefix=ae.familyPrefix);const Z={...Zt,...ae};Z.autoReplaceSvg||(Z.observeMutations=!1);const u={};Object.keys(Zt).forEach(e=>{Object.defineProperty(u,e,{enumerable:!0,set:function(t){Z[e]=t,re.forEach(n=>n(u))},get:function(){return Z[e]}})});Object.defineProperty(u,"familyPrefix",{enumerable:!0,set:function(e){Z.cssPrefix=e,re.forEach(t=>t(u))},get:function(){return Z.cssPrefix}});U.FontAwesomeConfig=u;const re=[];function aa(e){return re.push(e),()=>{re.splice(re.indexOf(e),1)}}const D=Oe,O={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function ra(e){if(!e||!j)return;const t=h.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;const n=h.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const i=n[r],s=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(a=i)}return h.head.insertBefore(t,a),e}const ia="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function oe(){let e=12,t="";for(;e-- >0;)t+=ia[Math.random()*62|0];return t}function ee(e){const t=[];for(let n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function Qe(e){return e.classList?ee(e.classList):(e.getAttribute("class")||"").split(" ").filter(t=>t)}function en(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function oa(e){return Object.keys(e||{}).reduce((t,n)=>t+"".concat(n,'="').concat(en(e[n]),'" '),"").trim()}function be(e){return Object.keys(e||{}).reduce((t,n)=>t+"".concat(n,": ").concat(e[n].trim(),";"),"")}function Ze(e){return e.size!==O.size||e.x!==O.x||e.y!==O.y||e.rotate!==O.rotate||e.flipX||e.flipY}function sa(e){let{transform:t,containerWidth:n,iconWidth:a}=e;const r={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(t.x*32,", ").concat(t.y*32,") "),s="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),o="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(i," ").concat(s," ").concat(o)},c={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:l,path:c}}function la(e){let{transform:t,width:n=Oe,height:a=Oe,startCentered:r=!1}=e,i="";return r&&Gt?i+="translate(".concat(t.x/D-n/2,"em, ").concat(t.y/D-a/2,"em) "):r?i+="translate(calc(-50% + ".concat(t.x/D,"em), calc(-50% + ").concat(t.y/D,"em)) "):i+="translate(".concat(t.x/D,"em, ").concat(t.y/D,"em) "),i+="scale(".concat(t.size/D*(t.flipX?-1:1),", ").concat(t.size/D*(t.flipY?-1:1),") "),i+="rotate(".concat(t.rotate,"deg) "),i}var ca=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function tn(){const e=Yt,t=Xt,n=u.cssPrefix,a=u.replacementClass;let r=ca;if(n!==e||a!==t){const i=new RegExp("\\.".concat(e,"\\-"),"g"),s=new RegExp("\\--".concat(e,"\\-"),"g"),o=new RegExp("\\.".concat(t),"g");r=r.replace(i,".".concat(n,"-")).replace(s,"--".concat(n,"-")).replace(o,".".concat(a))}return r}let pt=!1;function xe(){u.autoAddCss&&!pt&&(ra(tn()),pt=!0)}var ua={mixout(){return{dom:{css:tn,insertCss:xe}}},hooks(){return{beforeDOMElementCreation(){xe()},beforeI2svg(){xe()}}}};const z=U||{};z[M]||(z[M]={});z[M].styles||(z[M].styles={});z[M].hooks||(z[M].hooks={});z[M].shims||(z[M].shims=[]);var I=z[M];const nn=[],an=function(){h.removeEventListener("DOMContentLoaded",an),de=1,nn.map(e=>e())};let de=!1;j&&(de=(h.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(h.readyState),de||h.addEventListener("DOMContentLoaded",an));function fa(e){j&&(de?setTimeout(e,0):nn.push(e))}function le(e){const{tag:t,attributes:n={},children:a=[]}=e;return typeof e=="string"?en(e):"<".concat(t," ").concat(oa(n),">").concat(a.map(le).join(""),"</").concat(t,">")}function dt(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var Ae=function(t,n,a,r){var i=Object.keys(t),s=i.length,o=n,l,c,f;for(a===void 0?(l=1,f=t[i[0]]):(l=0,f=a);l<s;l++)c=i[l],f=o(f,t[c],c,t);return f};function pa(e){const t=[];let n=0;const a=e.length;for(;n<a;){const r=e.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const i=e.charCodeAt(n++);(i&64512)==56320?t.push(((r&1023)<<10)+(i&1023)+65536):(t.push(r),n--)}else t.push(r)}return t}function ze(e){const t=pa(e);return t.length===1?t[0].toString(16):null}function da(e,t){const n=e.length;let a=e.charCodeAt(t),r;return a>=55296&&a<=56319&&n>t+1&&(r=e.charCodeAt(t+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function mt(e){return Object.keys(e).reduce((t,n)=>{const a=e[n];return!!a.icon?t[a.iconName]=a.icon:t[n]=a,t},{})}function je(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=mt(t);typeof I.hooks.addPack=="function"&&!a?I.hooks.addPack(e,mt(t)):I.styles[e]={...I.styles[e]||{},...r},e==="fas"&&je("fa",t)}const{styles:B,shims:ma}=I,ga={[_]:Object.values(K[_]),[L]:Object.values(K[L]),[P]:Object.values(K[P])};let et=null,rn={},on={},sn={},ln={},cn={};const ha={[_]:Object.keys(H[_]),[L]:Object.keys(H[L]),[P]:Object.keys(H[P])};function ba(e){return~ea.indexOf(e)}function _a(e,t){const n=t.split("-"),a=n[0],r=n.slice(1).join("-");return a===e&&r!==""&&!ba(r)?r:null}const un=()=>{const e=a=>Ae(B,(r,i,s)=>(r[s]=Ae(i,a,{}),r),{});rn=e((a,r,i)=>(r[3]&&(a[r[3]]=i),r[2]&&r[2].filter(o=>typeof o=="number").forEach(o=>{a[o.toString(16)]=i}),a)),on=e((a,r,i)=>(a[i]=i,r[2]&&r[2].filter(o=>typeof o=="string").forEach(o=>{a[o]=i}),a)),cn=e((a,r,i)=>{const s=r[2];return a[i]=i,s.forEach(o=>{a[o]=i}),a});const t="far"in B||u.autoFetchSvg,n=Ae(ma,(a,r)=>{const i=r[0];let s=r[1];const o=r[2];return s==="far"&&!t&&(s="fas"),typeof i=="string"&&(a.names[i]={prefix:s,iconName:o}),typeof i=="number"&&(a.unicodes[i.toString(16)]={prefix:s,iconName:o}),a},{names:{},unicodes:{}});sn=n.names,ln=n.unicodes,et=_e(u.styleDefault,{family:u.familyDefault})};aa(e=>{et=_e(e.styleDefault,{family:u.familyDefault})});un();function tt(e,t){return(rn[e]||{})[t]}function ya(e,t){return(on[e]||{})[t]}function V(e,t){return(cn[e]||{})[t]}function fn(e){return sn[e]||{prefix:null,iconName:null}}function va(e){const t=ln[e],n=tt("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function W(){return et}const nt=()=>({prefix:null,iconName:null,rest:[]});function _e(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=_}=t,a=H[n][e],r=ie[n][e]||ie[n][a],i=e in I.styles?e:null;return r||i||null}const ka={[_]:Object.keys(K[_]),[L]:Object.keys(K[L]),[P]:Object.keys(K[P])};function ye(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=t,a={[_]:"".concat(u.cssPrefix,"-").concat(_),[L]:"".concat(u.cssPrefix,"-").concat(L),[P]:"".concat(u.cssPrefix,"-").concat(P)};let r=null,i=_;const s=Nn.filter(l=>l!==Bt);s.forEach(l=>{(e.includes(a[l])||e.some(c=>ka[l].includes(c)))&&(i=l)});const o=e.reduce((l,c)=>{const f=_a(u.cssPrefix,c);if(B[c]?(c=ga[i].includes(c)?$n[i][c]:c,r=c,l.prefix=c):ha[i].indexOf(c)>-1?(r=c,l.prefix=_e(c,{family:i})):f?l.iconName=f:c!==u.replacementClass&&!s.some(d=>c===a[d])&&l.rest.push(c),!n&&l.prefix&&l.iconName){const d=r==="fa"?fn(l.iconName):{},p=V(l.prefix,l.iconName);d.prefix&&(r=null),l.iconName=d.iconName||p||l.iconName,l.prefix=d.prefix||l.prefix,l.prefix==="far"&&!B.far&&B.fas&&!u.autoFetchSvg&&(l.prefix="fas")}return l},nt());return(e.includes("fa-brands")||e.includes("fab"))&&(o.prefix="fab"),(e.includes("fa-duotone")||e.includes("fad"))&&(o.prefix="fad"),!o.prefix&&i===L&&(B.fass||u.autoFetchSvg)&&(o.prefix="fass",o.iconName=V(o.prefix,o.iconName)||o.iconName),!o.prefix&&i===P&&(B.fasds||u.autoFetchSvg)&&(o.prefix="fasds",o.iconName=V(o.prefix,o.iconName)||o.iconName),(o.prefix==="fa"||r==="fa")&&(o.prefix=W()||"fas"),o}class wa{constructor(){this.definitions={}}add(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(i=>{this.definitions[i]={...this.definitions[i]||{},...r[i]},je(i,r[i]);const s=K[_][i];s&&je(s,r[i]),un()})}reset(){this.definitions={}}_pullDefinitions(t,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:i,iconName:s,icon:o}=a[r],l=o[2];t[i]||(t[i]={}),l.length>0&&l.forEach(c=>{typeof c=="string"&&(t[i][c]=o)}),t[i][s]=o}),t}}let gt=[],$={};const q={},xa=Object.keys(q);function Aa(e,t){let{mixoutsTo:n}=t;return gt=e,$={},Object.keys(q).forEach(a=>{xa.indexOf(a)===-1&&delete q[a]}),gt.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(i=>{typeof r[i]=="function"&&(n[i]=r[i]),typeof r[i]=="object"&&Object.keys(r[i]).forEach(s=>{n[i]||(n[i]={}),n[i][s]=r[i][s]})}),a.hooks){const i=a.hooks();Object.keys(i).forEach(s=>{$[s]||($[s]=[]),$[s].push(i[s])})}a.provides&&a.provides(q)}),n}function De(e,t){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return($[e]||[]).forEach(s=>{t=s.apply(null,[t,...a])}),t}function X(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];($[e]||[]).forEach(i=>{i.apply(null,n)})}function G(){const e=arguments[0],t=Array.prototype.slice.call(arguments,1);return q[e]?q[e].apply(null,t):void 0}function Ve(e){e.prefix==="fa"&&(e.prefix="fas");let{iconName:t}=e;const n=e.prefix||W();if(t)return t=V(n,t)||t,dt(pn.definitions,n,t)||dt(I.styles,n,t)}const pn=new wa,Ca=()=>{u.autoReplaceSvg=!1,u.observeMutations=!1,X("noAuto")},Sa={i2svg:function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return j?(X("beforeI2svg",e),G("pseudoElements2svg",e),G("i2svg",e)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:t}=e;u.autoReplaceSvg===!1&&(u.autoReplaceSvg=!0),u.observeMutations=!0,fa(()=>{Pa({autoReplaceSvgRoot:t}),X("watch",e)})}},La={icon:e=>{if(e===null)return null;if(typeof e=="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:V(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){const t=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],n=_e(e[0]);return{prefix:n,iconName:V(n,t)||t}}if(typeof e=="string"&&(e.indexOf("".concat(u.cssPrefix,"-"))>-1||e.match(Jn))){const t=ye(e.split(" "),{skipLookups:!0});return{prefix:t.prefix||W(),iconName:V(t.prefix,t.iconName)||t.iconName}}if(typeof e=="string"){const t=W();return{prefix:t,iconName:V(t,e)||e}}}},N={noAuto:Ca,config:u,dom:Sa,parse:La,library:pn,findIconDefinition:Ve,toHtml:le},Pa=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:t=h}=e;(Object.keys(I.styles).length>0||u.autoFetchSvg)&&j&&u.autoReplaceSvg&&N.dom.i2svg({node:t})};function ve(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(n=>le(n))}}),Object.defineProperty(e,"node",{get:function(){if(!j)return;const n=h.createElement("div");return n.innerHTML=e.html,n.children}}),e}function Na(e){let{children:t,main:n,mask:a,attributes:r,styles:i,transform:s}=e;if(Ze(s)&&n.found&&!a.found){const{width:o,height:l}=n,c={x:o/l/2,y:.5};r.style=be({...i,"transform-origin":"".concat(c.x+s.x/16,"em ").concat(c.y+s.y/16,"em")})}return[{tag:"svg",attributes:r,children:t}]}function Ta(e){let{prefix:t,iconName:n,children:a,attributes:r,symbol:i}=e;const s=i===!0?"".concat(t,"-").concat(u.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:{...r,id:s},children:a}]}]}function at(e){const{icons:{main:t,mask:n},prefix:a,iconName:r,transform:i,symbol:s,title:o,maskId:l,titleId:c,extra:f,watchable:d=!1}=e,{width:p,height:b}=n.found?n:t,w=a==="fak",A=[u.replacementClass,r?"".concat(u.cssPrefix,"-").concat(r):""].filter(T=>f.classes.indexOf(T)===-1).filter(T=>T!==""||!!T).concat(f.classes).join(" ");let y={children:[],attributes:{...f.attributes,"data-prefix":a,"data-icon":r,class:A,role:f.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(p," ").concat(b)}};const k=w&&!~f.classes.indexOf("fa-fw")?{width:"".concat(p/b*16*.0625,"em")}:{};d&&(y.attributes[Y]=""),o&&(y.children.push({tag:"title",attributes:{id:y.attributes["aria-labelledby"]||"title-".concat(c||oe())},children:[o]}),delete y.attributes.title);const v={...y,prefix:a,iconName:r,main:t,mask:n,maskId:l,transform:i,symbol:s,styles:{...k,...f.styles}},{children:x,attributes:F}=n.found&&t.found?G("generateAbstractMask",v)||{children:[],attributes:{}}:G("generateAbstractIcon",v)||{children:[],attributes:{}};return v.children=x,v.attributes=F,s?Ta(v):Na(v)}function ht(e){const{content:t,width:n,height:a,transform:r,title:i,extra:s,watchable:o=!1}=e,l={...s.attributes,...i?{title:i}:{},class:s.classes.join(" ")};o&&(l[Y]="");const c={...s.styles};Ze(r)&&(c.transform=la({transform:r,startCentered:!0,width:n,height:a}),c["-webkit-transform"]=c.transform);const f=be(c);f.length>0&&(l.style=f);const d=[];return d.push({tag:"span",attributes:l,children:[t]}),i&&d.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),d}function Ea(e){const{content:t,title:n,extra:a}=e,r={...a.attributes,...n?{title:n}:{},class:a.classes.join(" ")},i=be(a.styles);i.length>0&&(r.style=i);const s=[];return s.push({tag:"span",attributes:r,children:[t]}),n&&s.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),s}const{styles:Ce}=I;function Ue(e){const t=e[0],n=e[1],[a]=e.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(u.cssPrefix,"-").concat(we.GROUP)},children:[{tag:"path",attributes:{class:"".concat(u.cssPrefix,"-").concat(we.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(u.cssPrefix,"-").concat(we.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:t,height:n,icon:r}}const Oa={found:!1,width:512,height:512};function Ia(e,t){!$t&&!u.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function We(e,t){let n=t;return t==="fa"&&u.styleDefault!==null&&(t=W()),new Promise((a,r)=>{if(n==="fa"){const i=fn(e)||{};e=i.iconName||e,t=i.prefix||t}if(e&&t&&Ce[t]&&Ce[t][e]){const i=Ce[t][e];return a(Ue(i))}Ia(e,t),a({...Oa,icon:u.showMissingIcons&&e?G("missingIconAbstract")||{}:{}})})}const bt=()=>{},Ge=u.measurePerformance&&ue&&ue.mark&&ue.measure?ue:{mark:bt,measure:bt},ne='FA "6.6.0"',Ra=e=>(Ge.mark("".concat(ne," ").concat(e," begins")),()=>dn(e)),dn=e=>{Ge.mark("".concat(ne," ").concat(e," ends")),Ge.measure("".concat(ne," ").concat(e),"".concat(ne," ").concat(e," begins"),"".concat(ne," ").concat(e," ends"))};var rt={begin:Ra,end:dn};const fe=()=>{};function _t(e){return typeof(e.getAttribute?e.getAttribute(Y):null)=="string"}function Fa(e){const t=e.getAttribute?e.getAttribute(Je):null,n=e.getAttribute?e.getAttribute(qe):null;return t&&n}function Ma(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(u.replacementClass)}function za(){return u.autoReplaceSvg===!0?pe.replace:pe[u.autoReplaceSvg]||pe.replace}function ja(e){return h.createElementNS("http://www.w3.org/2000/svg",e)}function Da(e){return h.createElement(e)}function mn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=e.tag==="svg"?ja:Da}=t;if(typeof e=="string")return h.createTextNode(e);const a=n(e.tag);return Object.keys(e.attributes||[]).forEach(function(i){a.setAttribute(i,e.attributes[i])}),(e.children||[]).forEach(function(i){a.appendChild(mn(i,{ceFn:n}))}),a}function Va(e){let t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}const pe={replace:function(e){const t=e[0];if(t.parentNode)if(e[1].forEach(n=>{t.parentNode.insertBefore(mn(n),t)}),t.getAttribute(Y)===null&&u.keepOriginalSource){let n=h.createComment(Va(t));t.parentNode.replaceChild(n,t)}else t.remove()},nest:function(e){const t=e[0],n=e[1];if(~Qe(t).indexOf(u.replacementClass))return pe.replace(e);const a=new RegExp("".concat(u.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const i=n[0].attributes.class.split(" ").reduce((s,o)=>(o===u.replacementClass||o.match(a)?s.toSvg.push(o):s.toNode.push(o),s),{toNode:[],toSvg:[]});n[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?t.removeAttribute("class"):t.setAttribute("class",i.toNode.join(" "))}const r=n.map(i=>le(i)).join(`
`);t.setAttribute(Y,""),t.innerHTML=r}};function yt(e){e()}function gn(e,t){const n=typeof t=="function"?t:fe;if(e.length===0)n();else{let a=yt;u.mutateApproach===Yn&&(a=U.requestAnimationFrame||yt),a(()=>{const r=za(),i=rt.begin("mutate");e.map(r),i(),n()})}}let it=!1;function hn(){it=!0}function Be(){it=!1}let me=null;function vt(e){if(!lt||!u.observeMutations)return;const{treeCallback:t=fe,nodeCallback:n=fe,pseudoElementsCallback:a=fe,observeMutationsRoot:r=h}=e;me=new lt(i=>{if(it)return;const s=W();ee(i).forEach(o=>{if(o.type==="childList"&&o.addedNodes.length>0&&!_t(o.addedNodes[0])&&(u.searchPseudoElements&&a(o.target),t(o.target)),o.type==="attributes"&&o.target.parentNode&&u.searchPseudoElements&&a(o.target.parentNode),o.type==="attributes"&&_t(o.target)&&~Zn.indexOf(o.attributeName))if(o.attributeName==="class"&&Fa(o.target)){const{prefix:l,iconName:c}=ye(Qe(o.target));o.target.setAttribute(Je,l||s),c&&o.target.setAttribute(qe,c)}else Ma(o.target)&&n(o.target)})}),j&&me.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function Ua(){me&&me.disconnect()}function Wa(e){const t=e.getAttribute("style");let n=[];return t&&(n=t.split(";").reduce((a,r)=>{const i=r.split(":"),s=i[0],o=i.slice(1);return s&&o.length>0&&(a[s]=o.join(":").trim()),a},{})),n}function Ga(e){const t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),a=e.innerText!==void 0?e.innerText.trim():"";let r=ye(Qe(e));return r.prefix||(r.prefix=W()),t&&n&&(r.prefix=t,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=ya(r.prefix,e.innerText)||tt(r.prefix,ze(e.innerText))),!r.iconName&&u.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=e.firstChild.data)),r}function Ba(e){const t=ee(e.attributes).reduce((r,i)=>(r.name!=="class"&&r.name!=="style"&&(r[i.name]=i.value),r),{}),n=e.getAttribute("title"),a=e.getAttribute("data-fa-title-id");return u.autoA11y&&(n?t["aria-labelledby"]="".concat(u.replacementClass,"-title-").concat(a||oe()):(t["aria-hidden"]="true",t.focusable="false")),t}function Ha(){return{iconName:null,title:null,titleId:null,prefix:null,transform:O,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function kt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=Ga(e),i=Ba(e),s=De("parseNodeAttributes",{},e);let o=t.styleParser?Wa(e):[];return{iconName:n,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:a,transform:O,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:o,attributes:i},...s}}const{styles:Ka}=I;function bn(e){const t=u.autoReplaceSvg==="nest"?kt(e,{styleParser:!1}):kt(e);return~t.extra.classes.indexOf(Qt)?G("generateLayersText",e,t):G("generateSvgReplacementMutation",e,t)}let R=new Set;Jt.map(e=>{R.add("fa-".concat(e))});Object.keys(H[_]).map(R.add.bind(R));Object.keys(H[L]).map(R.add.bind(R));Object.keys(H[P]).map(R.add.bind(R));R=[...R];function wt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!j)return Promise.resolve();const n=h.documentElement.classList,a=f=>n.add("".concat(ft,"-").concat(f)),r=f=>n.remove("".concat(ft,"-").concat(f)),i=u.autoFetchSvg?R:Jt.map(f=>"fa-".concat(f)).concat(Object.keys(Ka));i.includes("fa")||i.push("fa");const s=[".".concat(Qt,":not([").concat(Y,"])")].concat(i.map(f=>".".concat(f,":not([").concat(Y,"])"))).join(", ");if(s.length===0)return Promise.resolve();let o=[];try{o=ee(e.querySelectorAll(s))}catch{}if(o.length>0)a("pending"),r("complete");else return Promise.resolve();const l=rt.begin("onTree"),c=o.reduce((f,d)=>{try{const p=bn(d);p&&f.push(p)}catch(p){$t||p.name==="MissingIcon"&&console.error(p)}return f},[]);return new Promise((f,d)=>{Promise.all(c).then(p=>{gn(p,()=>{a("active"),a("complete"),r("pending"),typeof t=="function"&&t(),l(),f()})}).catch(p=>{l(),d(p)})})}function Ya(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;bn(e).then(n=>{n&&gn([n],t)})}function Xa(e){return function(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(t||{}).icon?t:Ve(t||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:Ve(r||{})),e(a,{...n,mask:r})}}const $a=function(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=O,symbol:a=!1,mask:r=null,maskId:i=null,title:s=null,titleId:o=null,classes:l=[],attributes:c={},styles:f={}}=t;if(!e)return;const{prefix:d,iconName:p,icon:b}=e;return ve({type:"icon",...e},()=>(X("beforeDOMElementCreation",{iconDefinition:e,params:t}),u.autoA11y&&(s?c["aria-labelledby"]="".concat(u.replacementClass,"-title-").concat(o||oe()):(c["aria-hidden"]="true",c.focusable="false")),at({icons:{main:Ue(b),mask:r?Ue(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:d,iconName:p,transform:{...O,...n},symbol:a,title:s,maskId:i,titleId:o,extra:{attributes:c,styles:f,classes:l}})))};var Ja={mixout(){return{icon:Xa($a)}},hooks(){return{mutationObserverCallbacks(e){return e.treeCallback=wt,e.nodeCallback=Ya,e}}},provides(e){e.i2svg=function(t){const{node:n=h,callback:a=()=>{}}=t;return wt(n,a)},e.generateSvgReplacementMutation=function(t,n){const{iconName:a,title:r,titleId:i,prefix:s,transform:o,symbol:l,mask:c,maskId:f,extra:d}=n;return new Promise((p,b)=>{Promise.all([We(a,s),c.iconName?We(c.iconName,c.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(w=>{let[A,y]=w;p([t,at({icons:{main:A,mask:y},prefix:s,iconName:a,transform:o,symbol:l,maskId:f,title:r,titleId:i,extra:d,watchable:!0})])}).catch(b)})},e.generateAbstractIcon=function(t){let{children:n,attributes:a,main:r,transform:i,styles:s}=t;const o=be(s);o.length>0&&(a.style=o);let l;return Ze(i)&&(l=G("generateAbstractTransformGrouping",{main:r,transform:i,containerWidth:r.width,iconWidth:r.width})),n.push(l||r.icon),{children:n,attributes:a}}}},qa={mixout(){return{layer(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=t;return ve({type:"layer"},()=>{X("beforeDOMElementCreation",{assembler:e,params:t});let a=[];return e(r=>{Array.isArray(r)?r.map(i=>{a=a.concat(i.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(u.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},Qa={mixout(){return{counter(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:i={}}=t;return ve({type:"counter",content:e},()=>(X("beforeDOMElementCreation",{content:e,params:t}),Ea({content:e.toString(),title:n,extra:{attributes:r,styles:i,classes:["".concat(u.cssPrefix,"-layers-counter"),...a]}})))}}}},Za={mixout(){return{text(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=O,title:a=null,classes:r=[],attributes:i={},styles:s={}}=t;return ve({type:"text",content:e},()=>(X("beforeDOMElementCreation",{content:e,params:t}),ht({content:e,transform:{...O,...n},title:a,extra:{attributes:i,styles:s,classes:["".concat(u.cssPrefix,"-layers-text"),...r]}})))}}},provides(e){e.generateLayersText=function(t,n){const{title:a,transform:r,extra:i}=n;let s=null,o=null;if(Gt){const l=parseInt(getComputedStyle(t).fontSize,10),c=t.getBoundingClientRect();s=c.width/l,o=c.height/l}return u.autoA11y&&!a&&(i.attributes["aria-hidden"]="true"),Promise.resolve([t,ht({content:t.innerHTML,width:s,height:o,transform:r,title:a,extra:i,watchable:!0})])}}};const er=new RegExp('"',"ug"),xt=[1105920,1112319],At={FontAwesome:{normal:"fas",400:"fas"},...Fn,...Rn,...Gn},He=Object.keys(At).reduce((e,t)=>(e[t.toLowerCase()]=At[t],e),{}),tr=Object.keys(He).reduce((e,t)=>{const n=He[t];return e[t]=n[900]||[...Object.entries(n)][0][1],e},{});function nr(e){const t=e.replace(er,""),n=da(t,0),a=n>=xt[0]&&n<=xt[1],r=t.length===2?t[0]===t[1]:!1;return{value:ze(r?t[0]:t),isSecondary:a||r}}function ar(e,t){const n=e.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(t),r=isNaN(a)?"normal":a;return(He[n]||{})[r]||tr[n]}function Ct(e,t){const n="".concat(Kn).concat(t.replace(":","-"));return new Promise((a,r)=>{if(e.getAttribute(n)!==null)return a();const s=ee(e.children).filter(p=>p.getAttribute(Ie)===t)[0],o=U.getComputedStyle(e,t),l=o.getPropertyValue("font-family"),c=l.match(qn),f=o.getPropertyValue("font-weight"),d=o.getPropertyValue("content");if(s&&!c)return e.removeChild(s),a();if(c&&d!=="none"&&d!==""){const p=o.getPropertyValue("content");let b=ar(l,f);const{value:w,isSecondary:A}=nr(p),y=c[0].startsWith("FontAwesome");let k=tt(b,w),v=k;if(y){const x=va(w);x.iconName&&x.prefix&&(k=x.iconName,b=x.prefix)}if(k&&!A&&(!s||s.getAttribute(Je)!==b||s.getAttribute(qe)!==v)){e.setAttribute(n,v),s&&e.removeChild(s);const x=Ha(),{extra:F}=x;F.attributes[Ie]=t,We(k,b).then(T=>{const An=at({...x,icons:{main:T,mask:nt()},prefix:b,iconName:v,extra:F,watchable:!0}),ke=h.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(ke,e.firstChild):e.appendChild(ke),ke.outerHTML=An.map(Cn=>le(Cn)).join(`
`),e.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function rr(e){return Promise.all([Ct(e,"::before"),Ct(e,"::after")])}function ir(e){return e.parentNode!==document.head&&!~Xn.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Ie)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function St(e){if(j)return new Promise((t,n)=>{const a=ee(e.querySelectorAll("*")).filter(ir).map(rr),r=rt.begin("searchPseudoElements");hn(),Promise.all(a).then(()=>{r(),Be(),t()}).catch(()=>{r(),Be(),n()})})}var or={hooks(){return{mutationObserverCallbacks(e){return e.pseudoElementsCallback=St,e}}},provides(e){e.pseudoElements2svg=function(t){const{node:n=h}=t;u.searchPseudoElements&&St(n)}}};let Lt=!1;var sr={mixout(){return{dom:{unwatch(){hn(),Lt=!0}}}},hooks(){return{bootstrap(){vt(De("mutationObserverCallbacks",{}))},noAuto(){Ua()},watch(e){const{observeMutationsRoot:t}=e;Lt?Be():vt(De("mutationObserverCallbacks",{observeMutationsRoot:t}))}}}};const Pt=e=>{let t={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),i=r[0];let s=r.slice(1).join("-");if(i&&s==="h")return n.flipX=!0,n;if(i&&s==="v")return n.flipY=!0,n;if(s=parseFloat(s),isNaN(s))return n;switch(i){case"grow":n.size=n.size+s;break;case"shrink":n.size=n.size-s;break;case"left":n.x=n.x-s;break;case"right":n.x=n.x+s;break;case"up":n.y=n.y-s;break;case"down":n.y=n.y+s;break;case"rotate":n.rotate=n.rotate+s;break}return n},t)};var lr={mixout(){return{parse:{transform:e=>Pt(e)}}},hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-transform");return n&&(e.transform=Pt(n)),e}}},provides(e){e.generateAbstractTransformGrouping=function(t){let{main:n,transform:a,containerWidth:r,iconWidth:i}=t;const s={transform:"translate(".concat(r/2," 256)")},o="translate(".concat(a.x*32,", ").concat(a.y*32,") "),l="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),c="rotate(".concat(a.rotate," 0 0)"),f={transform:"".concat(o," ").concat(l," ").concat(c)},d={transform:"translate(".concat(i/2*-1," -256)")},p={outer:s,inner:f,path:d};return{tag:"g",attributes:{...p.outer},children:[{tag:"g",attributes:{...p.inner},children:[{tag:n.icon.tag,children:n.icon.children,attributes:{...n.icon.attributes,...p.path}}]}]}}}};const Se={x:0,y:0,width:"100%",height:"100%"};function Nt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function cr(e){return e.tag==="g"?e.children:[e]}var ur={hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-mask"),a=n?ye(n.split(" ").map(r=>r.trim())):nt();return a.prefix||(a.prefix=W()),e.mask=a,e.maskId=t.getAttribute("data-fa-mask-id"),e}}},provides(e){e.generateAbstractMask=function(t){let{children:n,attributes:a,main:r,mask:i,maskId:s,transform:o}=t;const{width:l,icon:c}=r,{width:f,icon:d}=i,p=sa({transform:o,containerWidth:f,iconWidth:l}),b={tag:"rect",attributes:{...Se,fill:"white"}},w=c.children?{children:c.children.map(Nt)}:{},A={tag:"g",attributes:{...p.inner},children:[Nt({tag:c.tag,attributes:{...c.attributes,...p.path},...w})]},y={tag:"g",attributes:{...p.outer},children:[A]},k="mask-".concat(s||oe()),v="clip-".concat(s||oe()),x={tag:"mask",attributes:{...Se,id:k,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"},children:[b,y]},F={tag:"defs",children:[{tag:"clipPath",attributes:{id:v},children:cr(d)},x]};return n.push(F,{tag:"rect",attributes:{fill:"currentColor","clip-path":"url(#".concat(v,")"),mask:"url(#".concat(k,")"),...Se}}),{children:n,attributes:a}}}},fr={provides(e){let t=!1;U.matchMedia&&(t=U.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:{...a,d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"}});const i={...r,attributeName:"opacity"},s={tag:"circle",attributes:{...a,cx:"256",cy:"364",r:"28"},children:[]};return t||s.children.push({tag:"animate",attributes:{...r,attributeName:"r",values:"28;14;28;28;14;28;"}},{tag:"animate",attributes:{...i,values:"1;0;1;1;0;1;"}}),n.push(s),n.push({tag:"path",attributes:{...a,opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"},children:t?[]:[{tag:"animate",attributes:{...i,values:"1;0;0;0;0;1;"}}]}),t||n.push({tag:"path",attributes:{...a,opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"},children:[{tag:"animate",attributes:{...i,values:"0;0;1;1;0;0;"}}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},pr={hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return e.symbol=a,e}}}},dr=[ua,Ja,qa,Qa,Za,or,sr,lr,ur,fr,pr];Aa(dr,{mixoutsTo:N});N.noAuto;N.config;N.library;N.dom;const Ke=N.parse;N.findIconDefinition;N.toHtml;const mr=N.icon;N.layer;N.text;N.counter;var Le={exports:{}},Pe,Tt;function gr(){if(Tt)return Pe;Tt=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Pe=e,Pe}var Ne,Et;function hr(){if(Et)return Ne;Et=1;var e=gr();function t(){}function n(){}return n.resetWarningCache=t,Ne=function(){function a(s,o,l,c,f,d){if(d!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}a.isRequired=a;function r(){return a}var i={array:a,bigint:a,bool:a,func:a,number:a,object:a,string:a,symbol:a,any:a,arrayOf:r,element:a,elementType:a,instanceOf:r,node:a,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},Ne}var Ot;function br(){return Ot||(Ot=1,Le.exports=hr()()),Le.exports}var _r=br();const m=Sn(_r);function It(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,a)}return n}function E(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?It(Object(n),!0).forEach(function(a){J(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):It(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function ge(e){"@babel/helpers - typeof";return ge=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ge(e)}function J(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function yr(e,t){if(e==null)return{};var n={},a=Object.keys(e),r,i;for(i=0;i<a.length;i++)r=a[i],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}function vr(e,t){if(e==null)return{};var n=yr(e,t),a,r;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],!(t.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function Ye(e){return kr(e)||wr(e)||xr(e)||Ar()}function kr(e){if(Array.isArray(e))return Xe(e)}function wr(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function xr(e,t){if(e){if(typeof e=="string")return Xe(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Xe(e,t)}}function Xe(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function Ar(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Cr(e){var t,n=e.beat,a=e.fade,r=e.beatFade,i=e.bounce,s=e.shake,o=e.flash,l=e.spin,c=e.spinPulse,f=e.spinReverse,d=e.pulse,p=e.fixedWidth,b=e.inverse,w=e.border,A=e.listItem,y=e.flip,k=e.size,v=e.rotation,x=e.pull,F=(t={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":i,"fa-shake":s,"fa-flash":o,"fa-spin":l,"fa-spin-reverse":f,"fa-spin-pulse":c,"fa-pulse":d,"fa-fw":p,"fa-inverse":b,"fa-border":w,"fa-li":A,"fa-flip":y===!0,"fa-flip-horizontal":y==="horizontal"||y==="both","fa-flip-vertical":y==="vertical"||y==="both"},J(t,"fa-".concat(k),typeof k<"u"&&k!==null),J(t,"fa-rotate-".concat(v),typeof v<"u"&&v!==null&&v!==0),J(t,"fa-pull-".concat(x),typeof x<"u"&&x!==null),J(t,"fa-swap-opacity",e.swapOpacity),t);return Object.keys(F).map(function(T){return F[T]?T:null}).filter(function(T){return T})}function Sr(e){return e=e-0,e===e}function _n(e){return Sr(e)?e:(e=e.replace(/[\-_\s]+(.)?/g,function(t,n){return n?n.toUpperCase():""}),e.substr(0,1).toLowerCase()+e.substr(1))}var Lr=["style"];function Pr(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Nr(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var a=n.indexOf(":"),r=_n(n.slice(0,a)),i=n.slice(a+1).trim();return r.startsWith("webkit")?t[Pr(r)]=i:t[r]=i,t},{})}function yn(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="string")return t;var a=(t.children||[]).map(function(l){return yn(e,l)}),r=Object.keys(t.attributes||{}).reduce(function(l,c){var f=t.attributes[c];switch(c){case"class":l.attrs.className=f,delete t.attributes.class;break;case"style":l.attrs.style=Nr(f);break;default:c.indexOf("aria-")===0||c.indexOf("data-")===0?l.attrs[c.toLowerCase()]=f:l.attrs[_n(c)]=f}return l},{attrs:{}}),i=n.style,s=i===void 0?{}:i,o=vr(n,Lr);return r.attrs.style=E(E({},r.attrs.style),s),e.apply(void 0,[t.tag,E(E({},r.attrs),o)].concat(Ye(a)))}var vn=!1;try{vn=!0}catch{}function Tr(){if(!vn&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function Rt(e){if(e&&ge(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(Ke.icon)return Ke.icon(e);if(e===null)return null;if(e&&ge(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}function Te(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?J({},e,t):{}}var Ft={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},he=jt.forwardRef(function(e,t){var n=E(E({},Ft),e),a=n.icon,r=n.mask,i=n.symbol,s=n.className,o=n.title,l=n.titleId,c=n.maskId,f=Rt(a),d=Te("classes",[].concat(Ye(Cr(n)),Ye((s||"").split(" ")))),p=Te("transform",typeof n.transform=="string"?Ke.transform(n.transform):n.transform),b=Te("mask",Rt(r)),w=mr(f,E(E(E(E({},d),p),b),{},{symbol:i,title:o,titleId:l,maskId:c}));if(!w)return Tr("Could not find icon",f),null;var A=w.abstract,y={ref:t};return Object.keys(n).forEach(function(k){Ft.hasOwnProperty(k)||(y[k]=n[k])}),Er(A[0],y)});he.displayName="FontAwesomeIcon";he.propTypes={beat:m.bool,border:m.bool,beatFade:m.bool,bounce:m.bool,className:m.string,fade:m.bool,flash:m.bool,mask:m.oneOfType([m.object,m.array,m.string]),maskId:m.string,fixedWidth:m.bool,inverse:m.bool,flip:m.oneOf([!0,!1,"horizontal","vertical","both"]),icon:m.oneOfType([m.object,m.array,m.string]),listItem:m.bool,pull:m.oneOf(["right","left"]),pulse:m.bool,rotation:m.oneOf([0,90,180,270]),shake:m.bool,size:m.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:m.bool,spinPulse:m.bool,spinReverse:m.bool,symbol:m.oneOfType([m.bool,m.string]),title:m.string,titleId:m.string,transform:m.oneOfType([m.string,m.object]),swapOpacity:m.bool};var Er=yn.bind(null,jt.createElement);const Or={prefix:"fas",iconName:"atom",icon:[512,512,[9883],"f5d2","M256 398.8c-11.8 5.1-23.4 9.7-34.9 13.5c16.7 33.8 31 35.7 34.9 35.7s18.1-1.9 34.9-35.7c-11.4-3.9-23.1-8.4-34.9-13.5zM446 256c33 45.2 44.3 90.9 23.6 128c-20.2 36.3-62.5 49.3-115.2 43.2c-22 52.1-55.6 84.8-98.4 84.8s-76.4-32.7-98.4-84.8c-52.7 6.1-95-6.8-115.2-43.2C21.7 346.9 33 301.2 66 256c-33-45.2-44.3-90.9-23.6-128c20.2-36.3 62.5-49.3 115.2-43.2C179.6 32.7 213.2 0 256 0s76.4 32.7 98.4 84.8c52.7-6.1 95 6.8 115.2 43.2c20.7 37.1 9.4 82.8-23.6 128zm-65.8 67.4c-1.7 14.2-3.9 28-6.7 41.2c31.8 1.4 38.6-8.7 40.2-11.7c2.3-4.2 7-17.9-11.9-48.1c-6.8 6.3-14 12.5-21.6 18.6zm-6.7-175.9c2.8 13.1 5 26.9 6.7 41.2c7.6 6.1 14.8 12.3 21.6 18.6c18.9-30.2 14.2-44 11.9-48.1c-1.6-2.9-8.4-13-40.2-11.7zM290.9 99.7C274.1 65.9 259.9 64 256 64s-18.1 1.9-34.9 35.7c11.4 3.9 23.1 8.4 34.9 13.5c11.8-5.1 23.4-9.7 34.9-13.5zm-159 88.9c1.7-14.3 3.9-28 6.7-41.2c-31.8-1.4-38.6 8.7-40.2 11.7c-2.3 4.2-7 17.9 11.9 48.1c6.8-6.3 14-12.5 21.6-18.6zM110.2 304.8C91.4 335 96 348.7 98.3 352.9c1.6 2.9 8.4 13 40.2 11.7c-2.8-13.1-5-26.9-6.7-41.2c-7.6-6.1-14.8-12.3-21.6-18.6zM336 256a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zm-80-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]},Ir={prefix:"fas",iconName:"file-pdf",icon:[512,512,[],"f1c1","M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"]},Rr={prefix:"fas",iconName:"diagram-project",icon:[576,512,["project-diagram"],"f542","M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 16 192 0 0-16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-16-192 0 0 16c0 1.7-.1 3.4-.3 5L272 288l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-1.7 .1-3.4 .3-5L144 224l-96 0c-26.5 0-48-21.5-48-48L0 80z"]},Fr={prefix:"fab",iconName:"github",icon:[496,512,[],"f09b","M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"]},Mr=[{key:"pdf",label:"PDF",icon:Ir,metaKey:"pdf_link"},{key:"arxiv",label:"arXiv",icon:Or,metaKey:"arxiv_link"},{key:"github",label:"GitHub",icon:Fr,metaKey:"github_link"},{key:"project",label:"Project Page",icon:Rr,metaKey:"project_link"}],kn=e=>typeof e=="string"?e.trim():"",wn=e=>{if(!e)return!1;try{const t=new URL(e);return t.protocol==="https:"||t.protocol==="http:"}catch{return!1}},zr=(e={})=>{const t=["pdf_link","arxiv_link","project_link","github_link","paper_link","source_code_link"];for(const n of t){const a=kn(e==null?void 0:e[n]);if(wn(a))return a}return""};function jr({meta:e={},className:t=""}){const n=`publication-link-icons ${t}`.trim();return g("div",{className:n,"aria-label":"Publication links",children:Mr.map(a=>{const r=kn(e==null?void 0:e[a.metaKey]);return wn(r)?g("a",{href:r,target:"_blank",rel:"noreferrer",className:"publication-link-icons__item is-active",title:a.label,"aria-label":`Open ${a.label}`,children:g(he,{icon:a.icon,"aria-hidden":"true"})},a.key):g("span",{className:"publication-link-icons__item is-disabled",title:`${a.label} unavailable`,"aria-label":`${a.label} unavailable`,children:g(he,{icon:a.icon,"aria-hidden":"true"})},a.key)})})}const Dr="/assets/style-kd-figure-1-nTmFz4AD.webp",Vr="/assets/spatial-bias-figure-1-DF8ymzzx.webp",Ur="/assets/adnet-figure-2-COsPK7U4.webp",Wr="/assets/cnn-vit-medical-figure-1-Dv2SxvlV.webp",Gr="/assets/ct-asbo-figure-2-IYvg943P.webp",Br="/assets/ral-figure-2-COxR_DKE.webp",Hr="/assets/do-your-best-figure-1-CB7LJkfz.webp",Kr="/assets/channel-propagation-figure-1-BJ3K6t6g.webp",Yr="/assets/map-figure-1-DGTaOsN4.webp",Xr="/assets/neural-substitution-figure-1-f3HktlIs.webp",$r="/assets/hqt-figure-1-CrDsPoTD.webp",Jr="/assets/gen-ssl-figure-2-CZgxUOzm.webp",qr="/assets/cxr-lt-figure-1-DrXN0L2a.webp",Qr="/assets/fg-ssl-figure-1-B54f3kBF.webp",Zr={"biomedical-bapub4-style-kd-class-imbalanced-medical-image":{image:Dr,figureLabel:"Figure 1",alt:"Figure 1 from Style-KD showing source and reference retinal images used to balance the APTOS2019 training set.",sourceUrl:"https://ars.els-cdn.com/content/image/1-s2.0-S1746809423013617-gr1_lrg.jpg"},"core-capub0-spatial-bias-for-attention-free-non-local":{image:Vr,figureLabel:"Figure 1",alt:"Figure 1 from Spatial Bias comparing inference time and top-1 accuracy across non-local network variants.",sourceUrl:"https://ars.els-cdn.com/content/image/1-s2.0-S0957417423025551-gr1_lrg.jpg"},"biomedical-bapub2-attentional-decoder-networks-for-chest-x-r":{image:Ur,figureLabel:"Figure 2",alt:"Figure 2 from ADNet comparing a conventional U-Net decoder with the proposed attentional decoder and harmonic magnitude transform.",sourceUrl:"https://ars.els-cdn.com/content/image/1-s2.0-S0169260724001949-gr2_lrg.jpg"},"biomedical-bapub3-analyzing-to-discover-origins-of-cnns-and":{image:Wr,figureLabel:"Figure 1",alt:"Figure 1 from the CNN and ViT analysis paper showing robustness results and corrupted medical image examples.",sourceUrl:"https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41598-024-58382-3/MediaObjects/41598_2024_58382_Fig1_HTML.png"},"biomedical-bapub0-deep-learning-using-computed-tomography-to":{image:Gr,figureLabel:"Figure 2",alt:"Figure 2 from the acute small bowel obstruction study showing the proposed CT diagnosis network workflow.",sourceUrl:"https://cdn.ncbi.nlm.nih.gov/pmc/blobs/72af/10720875/e4ac39b2182c/js9-109-4091-g002.jpg"},"biomedical-bapub1-robust-asymmetric-loss-for-multi-label-lon":{image:Br,figureLabel:"Figure 2",alt:"Figure 2 from the RAL paper comparing BCE, ASL, and robust asymmetric loss probabilities on multi-label and single-label medical images.",sourceUrl:"https://openaccess.thecvf.com/content/ICCV2023W/CVAMD/papers/Park_Robust_Asymmetric_Loss_for_Multi-Label_Long-Tailed_Learning_ICCVW_2023_paper.pdf"},"core-capub1-do-your-best-and-get-enough-rest-for-continual":{image:Hr,figureLabel:"Figure 1",alt:"Figure 1 from the Respacing paper illustrating the forgetting curve and how recall interval affects memory retention decay.",sourceUrl:"https://arxiv.org/abs/2503.18371"},"core-capub2-channel-propagation-networks-for-refreshable":{image:Kr,figureLabel:"Figure 1",alt:"Figure 1 comparing Channel Propagation networks (CP-Swin, CP-PiT) with baseline Swin and PiT across parameter count and top-1 accuracy.",sourceUrl:"https://openaccess.thecvf.com/content/WACV2025/papers/Go_Channel_Propagation_Networks_for_Refreshable_Vision_Transformer_WACV_2025_paper.pdf"},"core-capub3-enriching-local-patterns-with-multi-token":{image:Yr,figureLabel:"Figure 1",alt:"Figure 1 comparing MAP-ConvNeXt and MAP-MaxViT against SOTA networks on throughput versus top-1 accuracy for small and large models.",sourceUrl:"https://openaccess.thecvf.com/content/WACV2025/papers/Kang_Enriching_Local_Patterns_with_Multi-Token_Attention_for_Broad-Sight_Neural_Networks_WACV_2025_paper.pdf"},"core-capub4-neural-substitution-for-branch-level-network":{image:Xr,figureLabel:"Figure 1",alt:"Figure 1 illustrating the progression from block-level to branch-level connectivity in the re-parameterization network.",sourceUrl:"https://openaccess.thecvf.com/content/ACCV2024/papers/Oh_Neural_Substitution_for_Branch-level_Network_Re-parameterization_ACCV_2024_paper.pdf"},"core-capub5-unsupervised-hashing-network-with-hyper":{image:$r,figureLabel:"Figure 1",alt:"Figure 1 comparing clustering results of a traditional hashing algorithm with the proposed Hyper Quantization Tree, plus the HQT training pipeline.",sourceUrl:"https://bmva-archive.org.uk/bmvc/2024/papers/Paper_482/paper.pdf"},"biomedical-bapub5-generative-self-supervised-learning-for":{image:Jr,figureLabel:"Figure 2",alt:"Figure 2 showing the generative self-supervised learning pipeline: LLM-elaborated prompts, diffusion-based image generation, and AdaIN-based reconstruction.",sourceUrl:"https://openaccess.thecvf.com/content/ACCV2024/html/Park_Generative_Self-Supervised_Learning_for_Medical_Image_Classification_ACCV_2024_paper.html"},"biomedical-bapub6-towards-long-tailed-multi-label-disease":{image:qr,figureLabel:"Figure 1",alt:"Figure 1 showing the long-tailed distribution of clinical findings in the CXR-LT 2023 challenge dataset, highlighting newly added versus original labels.",sourceUrl:"https://arxiv.org/abs/2310.16112"},"biomedical-bapub7-fine-grained-self-supervised-learning-with":{image:Qr,figureLabel:"Figure 1",alt:"Figure 1 showing the FG-SSL architecture with shuffled and distorted image branches feeding a shared hierarchical block toward a Barlow Twins style cross-correlation loss.",sourceUrl:"https://www.sciencedirect.com/science/article/abs/pii/S0010482524005444"}},ei=(e="")=>Zr[e]??null;function ti({publicationId:e,className:t,sizes:n}){const a=ei(e);return g("figure",{className:`${t} publication-figure`,"data-publication-figure":(a==null?void 0:a.figureLabel)??void 0,children:a?g("img",{src:a.image,alt:a.alt,loading:"lazy",decoding:"async",sizes:n}):g("div",{className:"publication-figure__placeholder",children:"Figure unavailable"})})}const ni=e=>{if(!e)return!1;try{const t=new URL(e);return t.protocol==="https:"||t.protocol==="http:"}catch{return!1}};function ai({publicationId:e,category:t,meta:n,title:a,revealDelay:r="0ms",revealLoadDelay:i="80"}){var p,b,w;const s=zr(n),o=ni(s),l=Dt[t]??t,c=((p=n.author)==null?void 0:p.trim())??"",f=((b=n.published_place)==null?void 0:b.trim())??"",d=((w=n.published_date)==null?void 0:w.trim())??"";return S("article",{"data-reveal":!0,"data-reveal-load-delay":i,style:{"--reveal-delay":r},className:"publication__card",children:[g(ti,{publicationId:e,className:"publication__card-media",sizes:"(max-width: 768px) 13rem, 11.2rem"}),S("div",{className:"publication__card-main",children:[S("div",{className:"publication__card-badges",children:[g("p",{className:`publication__card-badge publication__card-badge--${t}`,children:l}),(n.labs??[]).map(A=>g("p",{className:"publication__card-badge publication__card-badge--lab",children:A},A))]}),g("h3",{className:"publication__card-title",children:o?g("a",{href:s,target:"_blank",rel:"noreferrer",className:"publication__card-title-link animated-underline",children:a}):g("span",{className:"publication__card-title-link publication__card-title-link--muted",children:a})}),c?g("p",{className:"publication__card-author",children:c}):null,(f||d)&&S("p",{className:"publication__card-meta-line",children:[f?g("span",{className:"publication__card-venue",children:f}):null,d?g("span",{className:"publication__card-date",children:d}):null]})]}),g("div",{className:"publication__card-links",children:g(jr,{meta:n})})]})}function ri({children:e,areaKey:t="",isSelected:n,onSelect:a}){const r=(t||String(e)).toLowerCase();return g("button",{type:"button",className:`publication__button publication__button--${r} btn btn--secondary btn--sm interactive-button ${n?"is-active":"is-inactive"}`,onClick:a,"aria-pressed":n,children:e})}const ii=JSON.parse('[{"id":"hei-2026-microvla","key":"hei-2026-microvla","category":"robot_learning","status":"published","title":"MicroVLA: Edge-Deployable Vision Language Action at 10M Parameters","summary":"An edge-deployable vision-language-action model for robot learning.","featured":false,"research_meta":{"author":"Ngseo Kim, Junghyun Kim, Gi-Cheon Kang, Youngjae Yu, Byoung-Tak Zhang","published_place":"RSS 2026 Workshop on L2P","published_date":"2026-01-01","keywords":["Vision-Language-Action","Edge Robotics","Robot Learning"],"labs":["HEI Lab"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://heilaboratory.github.io/publications/","source_code_link":"","paper_link":"https://heilaboratory.github.io/publications/"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"iknow-2026-learning-sample-wise","key":"iknow-2026-learning-sample-wise","category":"efficient_learning_for_llms","status":"published","title":"Learning Sample-wise Rank-Aware Interpolation Weights for Composed Visual Data Retrieval","summary":"Rank-aware interpolation for composed visual data retrieval.","featured":false,"research_meta":{"author":"Boseung Jeong, Taegyu Park, Donghyeon Kwon, Hyunsouk Cho, Suha Kwak","published_place":"ECCV 2026","published_date":"2026-01-01","keywords":["Visual Retrieval","Multimodal Learning","Rank-Aware Learning"],"labs":["iKnow Lab"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://iknow.ajou.ac.kr/publications/","source_code_link":"","paper_link":"https://iknow.ajou.ac.kr/publications/"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"iknow-2026-textme","key":"iknow-2026-textme","category":"efficient_learning_for_llms","status":"published","title":"TextME: Bridging Unseen Modalities Through Text Descriptions","summary":"Text-guided representations that bridge unseen modalities.","featured":false,"research_meta":{"author":"Soyeon Hong, Jinchan Kim, Jaegook You, Seungtaek Choi, Suha Kwak, Hyunsouk Cho","published_place":"ICML 2026","published_date":"2026-01-01","keywords":["Multimodal Learning","Text Descriptions","Representation Learning"],"labs":["iKnow Lab"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://iknow.ajou.ac.kr/publications/","source_code_link":"","paper_link":"https://iknow.ajou.ac.kr/publications/"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"core-capub1-do-your-best-and-get-enough-rest-for-continual","key":"core-capub1-do-your-best-and-get-enough-rest-for-continual","category":"computer_vision_and_learning_algorithms","status":"published","title":"Do Your Best and Get Enough Rest for Continual Learning","summary":"","featured":false,"research_meta":{"author":"Hankyul Kang, Gregor Seifer, Donghyun Lee, Jongbin Ryu","published_place":"Computer Vision and Pattern Recognition (CVPR)","published_date":"2025-06-01","keywords":["Continual Learning","Self-Supervised Learning","Replay Methods"],"labs":["CVL Lab"],"pdf_link":"","arxiv_link":"","github_link":"https://github.com/hankyul2/ViewBatchModel","project_link":"https://openaccess.thecvf.com/content/CVPR2025/html/Kang_Do_Your_Best_and_Get_Enough_Rest_for_Continual_Learning_CVPR_2025_paper.html","source_code_link":"https://github.com/hankyul2/ViewBatchModel","paper_link":"https://openaccess.thecvf.com/content/CVPR2025/html/Kang_Do_Your_Best_and_Get_Enough_Rest_for_Continual_Learning_CVPR_2025_paper.html"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"hei-2025-clip-rt","key":"hei-2025-clip-rt","category":"robot_learning","status":"published","title":"CLIP-RT: Learning Language-Conditioned Robotic Policies from Natural Language Supervision","summary":"Language-supervised robotic policies that make collecting robot demonstrations more accessible.","featured":true,"research_meta":{"author":"Gi-Cheon Kang, Junghyun Kim, Kyuhwan Shim, Jun Ki Lee, Byoung-Tak Zhang","published_place":"Robotics: Science and Systems (RSS) 2025","published_date":"2025-06-01","keywords":["Vision-Language-Action","Natural Language Supervision","Robot Learning"],"labs":["HEI Lab"],"pdf_link":"https://www.roboticsproceedings.org/rss21/p016.pdf","arxiv_link":"","github_link":"https://github.com/clip-rt/clip-rt","project_link":"https://clip-rt.github.io/","source_code_link":"https://github.com/clip-rt/clip-rt","paper_link":"https://clip-rt.github.io/"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"core-capub2-channel-propagation-networks-for-refreshable","key":"core-capub2-channel-propagation-networks-for-refreshable","category":"computer_vision_and_learning_algorithms","status":"published","title":"Channel Propagation Networks for Refreshable Vision Transformer","summary":"","featured":false,"research_meta":{"author":"Junhyung Ko, Jongbin Ryu","published_place":"Winter Conference on Applications of Computer Vision (WACV)","published_date":"2025-01-01","keywords":["Vision Transformer","Channel Propagation","Over-smoothing"],"labs":["CVL Lab"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://openaccess.thecvf.com/content/WACV2025/papers/Go_Channel_Propagation_Networks_for_Refreshable_Vision_Transformer_WACV_2025_paper.pdf","source_code_link":"","paper_link":"https://openaccess.thecvf.com/content/WACV2025/papers/Go_Channel_Propagation_Networks_for_Refreshable_Vision_Transformer_WACV_2025_paper.pdf"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"core-capub3-enriching-local-patterns-with-multi-token","key":"core-capub3-enriching-local-patterns-with-multi-token","category":"computer_vision_and_learning_algorithms","status":"published","title":"Enriching Local Patterns with Multi-Token Attention for Broad-Sight Neural Networks","summary":"","featured":false,"research_meta":{"author":"Hankyul Kang, Jongbin Ryu","published_place":"Winter Conference on Applications of Computer Vision (WACV)","published_date":"2025-01-01","keywords":["Attention Pooling","Local Patterns","Feature Representation"],"labs":["CVL Lab"],"pdf_link":"","arxiv_link":"","github_link":"https://github.com/hankyul2/MAP","project_link":"https://openaccess.thecvf.com/content/WACV2025/papers/Kang_Enriching_Local_Patterns_with_Multi-Token_Attention_for_Broad-Sight_Neural_Networks_WACV_2025_paper.pdf","source_code_link":"https://github.com/hankyul2/MAP","paper_link":"https://openaccess.thecvf.com/content/WACV2025/papers/Kang_Enriching_Local_Patterns_with_Multi-Token_Attention_for_Broad-Sight_Neural_Networks_WACV_2025_paper.pdf"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"hei-2025-continual-vln","key":"hei-2025-continual-vln","category":"robot_learning","status":"published","title":"Continual Vision-and-Language Navigation","summary":"A continual learning formulation for vision-and-language navigation agents adapting to new scene domains.","featured":false,"research_meta":{"author":"Seongjun Jeong, Gi-Cheon Kang, Seongho Choi, Joochan Kim, Byoung-Tak Zhang","published_place":"BMVC 2025","published_date":"2025-01-01","keywords":["Vision-Language Navigation","Continual Learning","Embodied AI"],"labs":["HEI Lab"],"pdf_link":"","arxiv_link":"https://arxiv.org/abs/2403.15049","github_link":"","project_link":"https://heilaboratory.github.io/publications/","source_code_link":"","paper_link":"https://heilaboratory.github.io/publications/"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"iknow-2025-flex","key":"iknow-2025-flex","category":"efficient_learning_for_llms","status":"published","title":"FLEX: Expert-level False-Less EXecution Metric for Reliable Text-to-SQL Benchmark","summary":"An execution metric for assessing reliable Text-to-SQL systems.","featured":false,"research_meta":{"author":"Heegyu Kim, Taeyang Jeon, Seunghwan Choi, Seungtaek Choi, Hyunsouk Cho","published_place":"NAACL 2025","published_date":"2025-01-01","keywords":["Text-to-SQL","Evaluation Metric","Language Models"],"labs":["iKnow Lab"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://iknow.ajou.ac.kr/publications/","source_code_link":"","paper_link":"https://iknow.ajou.ac.kr/publications/"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub4-style-kd-class-imbalanced-medical-image","key":"biomedical-bapub4-style-kd-class-imbalanced-medical-image","category":"industrial_and_medical_ai","status":"published","title":"Style-KD : Class-Imbalanced Medical Image Classification via Style Knowledge Distillation","summary":"","featured":false,"research_meta":{"author":"Inhyuk Park, Won Hwa Kim, Jongbin Ryu","published_place":"Biomedical Signall Processing and Control","published_date":"2024-12-29","keywords":["Class Imbalance","Knowledge Distillation","Medical Image Classification"],"labs":["CVL Lab"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://www.sciencedirect.com/science/article/pii/S1746809423013617","source_code_link":"","paper_link":"https://www.sciencedirect.com/science/article/pii/S1746809423013617"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub5-generative-self-supervised-learning-for","key":"biomedical-bapub5-generative-self-supervised-learning-for","category":"industrial_and_medical_ai","status":"published","title":"Generative Self-Supervised Learning for Medical Image Classification","summary":"","featured":false,"research_meta":{"author":"Inhyuk Park, Sungeun Kim, Jongbin Ryu","published_place":"Asian Conference on Computer Vision (ACCV)","published_date":"2024-12-01","keywords":["Generative Self-Supervised Learning","Medical Image Classification","Diffusion Model"],"labs":["CVL Lab"],"pdf_link":"","arxiv_link":"","github_link":"https://github.com/inhyukpark2/gen-ssl","project_link":"https://openaccess.thecvf.com/content/ACCV2024/html/Park_Generative_Self-Supervised_Learning_for_Medical_Image_Classification_ACCV_2024_paper.html","source_code_link":"https://github.com/inhyukpark2/gen-ssl","paper_link":"https://openaccess.thecvf.com/content/ACCV2024/html/Park_Generative_Self-Supervised_Learning_for_Medical_Image_Classification_ACCV_2024_paper.html"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"core-capub4-neural-substitution-for-branch-level-network","key":"core-capub4-neural-substitution-for-branch-level-network","category":"computer_vision_and_learning_algorithms","status":"published","title":"Neural Substitution for Branch-level Network Re-parameterization","summary":"","featured":false,"research_meta":{"author":"Seungmin Oh, Jongbin Ryu","published_place":"Asian Conference on Computer Vision (ACCV)","published_date":"2024-12-01","keywords":["Network Re-parameterization","Branch-level Connectivity","Model Efficiency"],"labs":["CVL Lab"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://openaccess.thecvf.com/content/ACCV2024/papers/Oh_Neural_Substitution_for_Branch-level_Network_Re-parameterization_ACCV_2024_paper.pdf","source_code_link":"","paper_link":"https://openaccess.thecvf.com/content/ACCV2024/papers/Oh_Neural_Substitution_for_Branch-level_Network_Re-parameterization_ACCV_2024_paper.pdf"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"core-capub5-unsupervised-hashing-network-with-hyper","key":"core-capub5-unsupervised-hashing-network-with-hyper","category":"computer_vision_and_learning_algorithms","status":"published","title":"Unsupervised Hashing Network with Hyper Quantization Tree","summary":"","featured":false,"research_meta":{"author":"Sungeun Kim, Jongbin Ryu","published_place":"British Machine Vision Conference (BMVC)","published_date":"2024-11-25","keywords":["Unsupervised Hashing","Image Retrieval","Quantization"],"labs":["CVL Lab"],"pdf_link":"","arxiv_link":"","github_link":"https://github.com/Lab-LVM/HQT","project_link":"https://bmva-archive.org.uk/bmvc/2024/papers/Paper_482/paper.pdf","source_code_link":"https://github.com/Lab-LVM/HQT","paper_link":"https://bmva-archive.org.uk/bmvc/2024/papers/Paper_482/paper.pdf"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"core-capub0-spatial-bias-for-attention-free-non-local","key":"core-capub0-spatial-bias-for-attention-free-non-local","category":"computer_vision_and_learning_algorithms","status":"published","title":"Spatial Bias for Attention-free Non-local Neural Networks","summary":"","featured":false,"research_meta":{"author":"Junhyung Go, Jonngbin Ryu","published_place":"Expert Systems with applications","published_date":"2024-10-04","keywords":["Non-local Networks","Attention-free Vision","Spatial Bias"],"labs":["CVL Lab"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://www.sciencedirect.com/science/article/pii/S0957417423025551","source_code_link":"","paper_link":"https://www.sciencedirect.com/science/article/pii/S0957417423025551"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub2-attentional-decoder-networks-for-chest-x-r","key":"biomedical-bapub2-attentional-decoder-networks-for-chest-x-r","category":"industrial_and_medical_ai","status":"published","title":"Attentional Decoder Networks for Chest X-ray Image Recognition on High-resolution Features","summary":"","featured":false,"research_meta":{"author":"Hankyul Kang, Namkug Kim, Jongbin Ryu","published_place":"Computer Methods and Programs in Biomedicine","published_date":"2024-04-21","keywords":["Chest X-ray","Attention Decoder","High-resolution Features"],"labs":["CVL Lab"],"pdf_link":"","arxiv_link":"","github_link":"https://github.com/CVL-Lab/ADNet","project_link":"https://www.sciencedirect.com/science/article/pii/S0169260724001949","source_code_link":"https://github.com/CVL-Lab/ADNet","paper_link":"https://www.sciencedirect.com/science/article/pii/S0169260724001949"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub3-analyzing-to-discover-origins-of-cnns-and","key":"biomedical-bapub3-analyzing-to-discover-origins-of-cnns-and","category":"industrial_and_medical_ai","status":"published","title":"Analyzing to Discover Origins of CNNs and ViT Architectures in Medical Images","summary":"","featured":false,"research_meta":{"author":"Seungmin Oh, Namkug Kim, Jongbin Ryu","published_place":"Scientific Reports","published_date":"2024-04-16","keywords":["Medical Imaging","CNN and ViT Analysis","Model Interpretability"],"labs":["CVL Lab"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://www.nature.com/articles/s41598-024-58382-3","source_code_link":"","paper_link":"https://www.nature.com/articles/s41598-024-58382-3"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub6-towards-long-tailed-multi-label-disease","key":"biomedical-bapub6-towards-long-tailed-multi-label-disease","category":"industrial_and_medical_ai","status":"published","title":"Towards long-tailed, multi-label disease classification from chest X-ray: Overview of the CXR-LT challenge","summary":"","featured":false,"research_meta":{"author":"CVAMD participants including Jongbin Ryu","published_place":"Medical Image Analysis (MedIA)","published_date":"2024-01-01","keywords":["Long-tailed Learning","Multi-label Classification","Chest X-ray"],"labs":["CVL Lab"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://www.sciencedirect.com/science/article/abs/pii/S136184152400149X","source_code_link":"","paper_link":"https://www.sciencedirect.com/science/article/abs/pii/S136184152400149X"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub7-fine-grained-self-supervised-learning-with","key":"biomedical-bapub7-fine-grained-self-supervised-learning-with","category":"industrial_and_medical_ai","status":"published","title":"Fine-Grained Self-Supervised Learning with Jigsaw puzzles for medical image classification","summary":"","featured":false,"research_meta":{"author":"Wongi Park, Jongbin Ryu","published_place":"Computers in Biology and Medicine","published_date":"2024-01-01","keywords":["Fine-Grained Classification","Self-Supervised Learning","Jigsaw Puzzle"],"labs":["CVL Lab"],"pdf_link":"","arxiv_link":"","github_link":"https://github.com/kalelpark/FG-SSL","project_link":"https://www.sciencedirect.com/science/article/abs/pii/S0010482524005444","source_code_link":"https://github.com/kalelpark/FG-SSL","paper_link":"https://www.sciencedirect.com/science/article/abs/pii/S0010482524005444"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub0-deep-learning-using-computed-tomography-to","key":"biomedical-bapub0-deep-learning-using-computed-tomography-to","category":"industrial_and_medical_ai","status":"published","title":"Deep Learning Using Computed Tomography to Identify High-Risk Patients for Acute Small Bowel Obstruction: Development and Validation of a Prediction Model: A Retrospective Cohort Study","summary":"","featured":false,"research_meta":{"author":"Seungmin Oh, Jongbin Ryu, Ho-Jung Shin, Jeong Ho Song, Sang-Yong Son, Hoon Hur, Sang-Uk Han","published_place":"International Journal of Surgery","published_date":"2023-12-01","keywords":["CT Analysis","Risk Prediction","Clinical AI"],"labs":["CVL Lab"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://journals.lww.com/international-journal-of-surgery/fulltext/2023/12000/deep_learning_using_computed_tomography_to.39.aspx","source_code_link":"","paper_link":"https://journals.lww.com/international-journal-of-surgery/fulltext/2023/12000/deep_learning_using_computed_tomography_to.39.aspx"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub1-robust-asymmetric-loss-for-multi-label-lon","key":"biomedical-bapub1-robust-asymmetric-loss-for-multi-label-lon","category":"industrial_and_medical_ai","status":"published","title":"Robust Asymmetric Loss for Multi-Label Long-Tailed Learning","summary":"","featured":false,"research_meta":{"author":"Wongi Park, Inhyuk Park, Sungeun Kim, Jongbin Ryu","published_place":"ICCVW","published_date":"2023-08-10","keywords":["Long-tailed Learning","Multi-label Classification","Robust Loss"],"labs":["CVL Lab"],"pdf_link":"","arxiv_link":"","github_link":"https://github.com/kalelpark/RAL","project_link":"https://openaccess.thecvf.com/content/ICCV2023W/CVAMD/html/Park_Robust_Asymmetric_Loss_for_Multi-Label_Long-Tailed_Learning_ICCVW_2023_paper.html","source_code_link":"https://github.com/kalelpark/RAL","paper_link":"https://openaccess.thecvf.com/content/ICCV2023W/CVAMD/html/Park_Robust_Asymmetric_Loss_for_Multi-Label_Long-Tailed_Learning_ICCVW_2023_paper.html"},"content":{"problem":"","solve":"","expermental_result":""}}]'),Ee={items:ii},oi=e=>{const t=typeof e=="string"?e.trim():"";if(!t)return new Date("1970-01-01T00:00:00");const n=new Date(`${t}T00:00:00`);return Number.isNaN(n.getTime())?new Date("1970-01-01T00:00:00"):n},C=e=>typeof e=="string"?e.trim():"",Mt=e=>Array.isArray(e)?e.map(t=>C(t)).filter(Boolean):typeof e!="string"?[]:e.split(",").map(t=>t.trim()).filter(Boolean),xn=()=>((Ee==null?void 0:Ee.items)??[]).map((e,t)=>{const n=C(e==null?void 0:e.id)||`publication-${t+1}`,a=C(e==null?void 0:e.category)||"computer_vision_and_learning_algorithms",r=C(e==null?void 0:e.title)||"Untitled publication",i=(e==null?void 0:e.research_meta)??{},s=C(i==null?void 0:i.published_date)||"1970-01-01";return{...e,id:n,key:C(e==null?void 0:e.key)||n,category:a,title:r,research_meta:{author:C(i==null?void 0:i.author),published_place:C(i==null?void 0:i.published_place),published_date:s,keywords:Mt(i==null?void 0:i.keywords),labs:Mt(i==null?void 0:i.labs),pdf_link:C(i==null?void 0:i.pdf_link),arxiv_link:C(i==null?void 0:i.arxiv_link),github_link:C((i==null?void 0:i.github_link)||(i==null?void 0:i.source_code_link)),project_link:C((i==null?void 0:i.project_link)||(i==null?void 0:i.paper_link)),source_code_link:C((i==null?void 0:i.source_code_link)||(i==null?void 0:i.github_link)),paper_link:C((i==null?void 0:i.paper_link)||(i==null?void 0:i.project_link))},_parsedDate:oi(s)}}).sort((e,t)=>t._parsedDate-e._parsedDate).map(e=>{const t={...e};return delete t._parsedDate,t}),si=()=>["all",...Array.from(new Set(xn().map(t=>t.category)))],zt=si(),li=xn();function ci(){const e=Ln(),[t,n]=ce.useState("all"),[a,r]=ce.useState(""),i=o=>{n(o)};ce.useEffect(()=>{var p,b;const o=new URLSearchParams(e.search),l=((p=o.get("q"))==null?void 0:p.trim())??"",c=((b=o.get("area"))==null?void 0:b.trim())??"",f=c==="all"?"all":Pn(c),d=zt.includes(f);r(l),n(d?f:"all")},[e.search]);const s=ce.useMemo(()=>{const o=a.trim().toLowerCase();return li.filter(l=>t==="all"||t===l.category?o?[l.title,l.research_meta.author,l.research_meta.published_place].join(" ").toLowerCase().includes(o):!0:!1)},[a,t]);return S("div",{"data-reveal":!0,"data-reveal-load-delay":"60",className:"publication",children:[S("div",{"data-reveal":!0,className:"tab-header page-head page-head--publication",children:[g("h1",{children:"Publications"}),g("p",{className:"page-head__summary",children:"Search and filter the publication archive by research area, title, authors, and venue."})]}),g("div",{"data-reveal":!0,className:"publication__controls page-panel page-panel--compact page-panel--section-start page-controls","aria-label":"Filter publications",children:S("div",{className:"publication__controls-grid page-controls__grid",children:[S("section",{className:"publication__controls-group page-controls__group",children:[g("div",{className:"publication__controls-head",children:g("p",{className:"publication__controls-label page-controls__label",children:"Filter by research area"})}),g("div",{className:"publication__filter page-controls__actions",role:"group","aria-label":"Filter publications by area",children:zt.map((o,l)=>g(ri,{areaKey:o,isSelected:t===o,onSelect:()=>i(o),children:Dt[o]||o.charAt(0).toUpperCase()+o.slice(1)},o+l))})]}),S("section",{className:"publication__controls-group page-controls__group",children:[g("div",{className:"publication__controls-head",children:g("label",{className:"publication__search-label page-controls__label",htmlFor:"publication-search",children:"Search publications"})}),g("div",{className:"publication__search-layout",children:g("div",{className:"publication__search-input-wrap",children:g("input",{id:"publication-search",type:"search",className:"publication__search-input",placeholder:"Search by title, authors, or venue",value:a,onChange:o=>r(o.target.value)})})})]})]})}),S("section",{"data-reveal":!0,className:"publication__archive page-panel","aria-labelledby":"publication-archive-title",children:[g("div",{className:"publication__section-head",children:S("div",{children:[g("h2",{id:"publication-archive-title",children:"Publications Archive"}),S("p",{children:[s.length," result",s.length===1?"":"s"," in the current view"]})]})}),S("div",{className:"publication__list",children:[s.map((o,l)=>g(ai,{publicationId:o.id,category:o.category,meta:o.research_meta,title:o.title,revealDelay:`${Math.min(l,5)*60}ms`,revealLoadDelay:`${120+Math.min(l,5)*60}`},`${o.key}-${l}`)),s.length===0&&g("p",{className:"publication__empty",children:"No publications match your selected category and search query."})]})]})]})}function fi(){return g(ci,{})}export{fi as default};
