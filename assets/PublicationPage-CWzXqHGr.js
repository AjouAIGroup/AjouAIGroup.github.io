import{h as An,R as Mt,a as g,i as Rt,j as P,b as kn,r as le,k as wn}from"./index-CHzVAmDx.js";import{b as Pn,c as Nn}from"./publicationData-BC2p-qfL.js";const rt=()=>{};let Xe={},zt={},jt=null,Dt={mark:rt,measure:rt};try{typeof window<"u"&&(Xe=window),typeof document<"u"&&(zt=document),typeof MutationObserver<"u"&&(jt=MutationObserver),typeof performance<"u"&&(Dt=performance)}catch{}const{userAgent:it=""}=Xe.navigator||{},U=Xe,h=zt,st=jt,ce=Dt;U.document;const z=!!h.documentElement&&!!h.head&&typeof h.addEventListener=="function"&&typeof h.createElement=="function",Ut=~it.indexOf("MSIE")||~it.indexOf("Trident/");var y="classic",Gt="duotone",N="sharp",S="sharp-duotone",Sn=[y,Gt,N,S],On={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds"}},ot={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},Cn=["kit"],En=/fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/,Tn=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,In={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},Fn={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds"}},Ln={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds"}},Mn={classic:["fas","far","fal","fat"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds"]},Rn={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid"}},zn={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds"}},Wt={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid"}},jn=["solid","regular","light","thin","duotone","brands"],Yt=[1,2,3,4,5,6,7,8,9,10],Dn=Yt.concat([11,12,13,14,15,16,17,18,19,20]),ee={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Un=[...Object.keys(Mn),...jn,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",ee.GROUP,ee.SWAP_OPACITY,ee.PRIMARY,ee.SECONDARY].concat(Yt.map(e=>"".concat(e,"x"))).concat(Dn.map(e=>"w-".concat(e))),Gn={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Wn={kit:{"fa-kit":"fak"}},Yn={kit:{fak:"fa-kit"}},lt={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}};const M="___FONT_AWESOME___",Ee=16,Ht="fa",Vt="svg-inline--fa",B="data-fa-i2svg",Te="data-fa-pseudo-element",Hn="data-fa-pseudo-element-pending",$e="data-prefix",Ke="data-icon",ct="fontawesome-i2svg",Vn="async",Bn=["HTML","HEAD","STYLE","SCRIPT"],Bt=(()=>{try{return!0}catch{return!1}})(),Xt=[y,N,S];function se(e){return new Proxy(e,{get(t,n){return n in t?t[n]:t[y]}})}const $t={...Wt};$t[y]={...Wt[y],...ot.kit,...ot["kit-duotone"]};const H=se($t),Ie={...zn};Ie[y]={...Ie[y],...lt.kit,...lt["kit-duotone"]};const re=se(Ie),Fe={...Rn};Fe[y]={...Fe[y],...Yn.kit};const V=se(Fe),Le={...Ln};Le[y]={...Le[y],...Wn.kit};const Xn=se(Le),$n=En,Kt="fa-layers-text",Kn=Tn,qn={...On};se(qn);const Qn=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],xe=ee,Q=new Set;Object.keys(re[y]).map(Q.add.bind(Q));Object.keys(re[N]).map(Q.add.bind(Q));Object.keys(re[S]).map(Q.add.bind(Q));const Jn=[...Cn,...Un],ne=U.FontAwesomeConfig||{};function Zn(e){var t=h.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function ea(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}h&&typeof h.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(t=>{let[n,a]=t;const r=ea(Zn(n));r!=null&&(ne[a]=r)});const qt={styleDefault:"solid",familyDefault:"classic",cssPrefix:Ht,replacementClass:Vt,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};ne.familyPrefix&&(ne.cssPrefix=ne.familyPrefix);const J={...qt,...ne};J.autoReplaceSvg||(J.observeMutations=!1);const f={};Object.keys(qt).forEach(e=>{Object.defineProperty(f,e,{enumerable:!0,set:function(t){J[e]=t,ae.forEach(n=>n(f))},get:function(){return J[e]}})});Object.defineProperty(f,"familyPrefix",{enumerable:!0,set:function(e){J.cssPrefix=e,ae.forEach(t=>t(f))},get:function(){return J.cssPrefix}});U.FontAwesomeConfig=f;const ae=[];function ta(e){return ae.push(e),()=>{ae.splice(ae.indexOf(e),1)}}const j=Ee,T={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function na(e){if(!e||!z)return;const t=h.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;const n=h.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const i=n[r],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(a=i)}return h.head.insertBefore(t,a),e}const aa="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function ie(){let e=12,t="";for(;e-- >0;)t+=aa[Math.random()*62|0];return t}function Z(e){const t=[];for(let n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function qe(e){return e.classList?Z(e.classList):(e.getAttribute("class")||"").split(" ").filter(t=>t)}function Qt(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ra(e){return Object.keys(e||{}).reduce((t,n)=>t+"".concat(n,'="').concat(Qt(e[n]),'" '),"").trim()}function he(e){return Object.keys(e||{}).reduce((t,n)=>t+"".concat(n,": ").concat(e[n].trim(),";"),"")}function Qe(e){return e.size!==T.size||e.x!==T.x||e.y!==T.y||e.rotate!==T.rotate||e.flipX||e.flipY}function ia(e){let{transform:t,containerWidth:n,iconWidth:a}=e;const r={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(t.x*32,", ").concat(t.y*32,") "),o="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),s="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},c={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:l,path:c}}function sa(e){let{transform:t,width:n=Ee,height:a=Ee,startCentered:r=!1}=e,i="";return r&&Ut?i+="translate(".concat(t.x/j-n/2,"em, ").concat(t.y/j-a/2,"em) "):r?i+="translate(calc(-50% + ".concat(t.x/j,"em), calc(-50% + ").concat(t.y/j,"em)) "):i+="translate(".concat(t.x/j,"em, ").concat(t.y/j,"em) "),i+="scale(".concat(t.size/j*(t.flipX?-1:1),", ").concat(t.size/j*(t.flipY?-1:1),") "),i+="rotate(".concat(t.rotate,"deg) "),i}var oa=`:root, :host {
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
}`;function Jt(){const e=Ht,t=Vt,n=f.cssPrefix,a=f.replacementClass;let r=oa;if(n!==e||a!==t){const i=new RegExp("\\.".concat(e,"\\-"),"g"),o=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(t),"g");r=r.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(s,".".concat(a))}return r}let ft=!1;function Ae(){f.autoAddCss&&!ft&&(na(Jt()),ft=!0)}var la={mixout(){return{dom:{css:Jt,insertCss:Ae}}},hooks(){return{beforeDOMElementCreation(){Ae()},beforeI2svg(){Ae()}}}};const R=U||{};R[M]||(R[M]={});R[M].styles||(R[M].styles={});R[M].hooks||(R[M].hooks={});R[M].shims||(R[M].shims=[]);var I=R[M];const Zt=[],en=function(){h.removeEventListener("DOMContentLoaded",en),me=1,Zt.map(e=>e())};let me=!1;z&&(me=(h.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(h.readyState),me||h.addEventListener("DOMContentLoaded",en));function ca(e){z&&(me?setTimeout(e,0):Zt.push(e))}function oe(e){const{tag:t,attributes:n={},children:a=[]}=e;return typeof e=="string"?Qt(e):"<".concat(t," ").concat(ra(n),">").concat(a.map(oe).join(""),"</").concat(t,">")}function ut(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var ke=function(t,n,a,r){var i=Object.keys(t),o=i.length,s=n,l,c,u;for(a===void 0?(l=1,u=t[i[0]]):(l=0,u=a);l<o;l++)c=i[l],u=s(u,t[c],c,t);return u};function fa(e){const t=[];let n=0;const a=e.length;for(;n<a;){const r=e.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const i=e.charCodeAt(n++);(i&64512)==56320?t.push(((r&1023)<<10)+(i&1023)+65536):(t.push(r),n--)}else t.push(r)}return t}function Me(e){const t=fa(e);return t.length===1?t[0].toString(16):null}function ua(e,t){const n=e.length;let a=e.charCodeAt(t),r;return a>=55296&&a<=56319&&n>t+1&&(r=e.charCodeAt(t+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function mt(e){return Object.keys(e).reduce((t,n)=>{const a=e[n];return!!a.icon?t[a.iconName]=a.icon:t[n]=a,t},{})}function Re(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=mt(t);typeof I.hooks.addPack=="function"&&!a?I.hooks.addPack(e,mt(t)):I.styles[e]={...I.styles[e]||{},...r},e==="fas"&&Re("fa",t)}const{styles:Y,shims:ma}=I,da={[y]:Object.values(V[y]),[N]:Object.values(V[N]),[S]:Object.values(V[S])};let Je=null,tn={},nn={},an={},rn={},sn={};const pa={[y]:Object.keys(H[y]),[N]:Object.keys(H[N]),[S]:Object.keys(H[S])};function ga(e){return~Jn.indexOf(e)}function ha(e,t){const n=t.split("-"),a=n[0],r=n.slice(1).join("-");return a===e&&r!==""&&!ga(r)?r:null}const on=()=>{const e=a=>ke(Y,(r,i,o)=>(r[o]=ke(i,a,{}),r),{});tn=e((a,r,i)=>(r[3]&&(a[r[3]]=i),r[2]&&r[2].filter(s=>typeof s=="number").forEach(s=>{a[s.toString(16)]=i}),a)),nn=e((a,r,i)=>(a[i]=i,r[2]&&r[2].filter(s=>typeof s=="string").forEach(s=>{a[s]=i}),a)),sn=e((a,r,i)=>{const o=r[2];return a[i]=i,o.forEach(s=>{a[s]=i}),a});const t="far"in Y||f.autoFetchSvg,n=ke(ma,(a,r)=>{const i=r[0];let o=r[1];const s=r[2];return o==="far"&&!t&&(o="fas"),typeof i=="string"&&(a.names[i]={prefix:o,iconName:s}),typeof i=="number"&&(a.unicodes[i.toString(16)]={prefix:o,iconName:s}),a},{names:{},unicodes:{}});an=n.names,rn=n.unicodes,Je=be(f.styleDefault,{family:f.familyDefault})};ta(e=>{Je=be(e.styleDefault,{family:f.familyDefault})});on();function Ze(e,t){return(tn[e]||{})[t]}function ba(e,t){return(nn[e]||{})[t]}function D(e,t){return(sn[e]||{})[t]}function ln(e){return an[e]||{prefix:null,iconName:null}}function ya(e){const t=rn[e],n=Ze("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function G(){return Je}const et=()=>({prefix:null,iconName:null,rest:[]});function be(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=y}=t,a=H[n][e],r=re[n][e]||re[n][a],i=e in I.styles?e:null;return r||i||null}const va={[y]:Object.keys(V[y]),[N]:Object.keys(V[N]),[S]:Object.keys(V[S])};function ye(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=t,a={[y]:"".concat(f.cssPrefix,"-").concat(y),[N]:"".concat(f.cssPrefix,"-").concat(N),[S]:"".concat(f.cssPrefix,"-").concat(S)};let r=null,i=y;const o=Sn.filter(l=>l!==Gt);o.forEach(l=>{(e.includes(a[l])||e.some(c=>va[l].includes(c)))&&(i=l)});const s=e.reduce((l,c)=>{const u=ha(f.cssPrefix,c);if(Y[c]?(c=da[i].includes(c)?Xn[i][c]:c,r=c,l.prefix=c):pa[i].indexOf(c)>-1?(r=c,l.prefix=be(c,{family:i})):u?l.iconName=u:c!==f.replacementClass&&!o.some(d=>c===a[d])&&l.rest.push(c),!n&&l.prefix&&l.iconName){const d=r==="fa"?ln(l.iconName):{},m=D(l.prefix,l.iconName);d.prefix&&(r=null),l.iconName=d.iconName||m||l.iconName,l.prefix=d.prefix||l.prefix,l.prefix==="far"&&!Y.far&&Y.fas&&!f.autoFetchSvg&&(l.prefix="fas")}return l},et());return(e.includes("fa-brands")||e.includes("fab"))&&(s.prefix="fab"),(e.includes("fa-duotone")||e.includes("fad"))&&(s.prefix="fad"),!s.prefix&&i===N&&(Y.fass||f.autoFetchSvg)&&(s.prefix="fass",s.iconName=D(s.prefix,s.iconName)||s.iconName),!s.prefix&&i===S&&(Y.fasds||f.autoFetchSvg)&&(s.prefix="fasds",s.iconName=D(s.prefix,s.iconName)||s.iconName),(s.prefix==="fa"||r==="fa")&&(s.prefix=G()||"fas"),s}class _a{constructor(){this.definitions={}}add(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(i=>{this.definitions[i]={...this.definitions[i]||{},...r[i]},Re(i,r[i]);const o=V[y][i];o&&Re(o,r[i]),on()})}reset(){this.definitions={}}_pullDefinitions(t,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:i,iconName:o,icon:s}=a[r],l=s[2];t[i]||(t[i]={}),l.length>0&&l.forEach(c=>{typeof c=="string"&&(t[i][c]=s)}),t[i][o]=s}),t}}let dt=[],$={};const q={},xa=Object.keys(q);function Aa(e,t){let{mixoutsTo:n}=t;return dt=e,$={},Object.keys(q).forEach(a=>{xa.indexOf(a)===-1&&delete q[a]}),dt.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(i=>{typeof r[i]=="function"&&(n[i]=r[i]),typeof r[i]=="object"&&Object.keys(r[i]).forEach(o=>{n[i]||(n[i]={}),n[i][o]=r[i][o]})}),a.hooks){const i=a.hooks();Object.keys(i).forEach(o=>{$[o]||($[o]=[]),$[o].push(i[o])})}a.provides&&a.provides(q)}),n}function ze(e,t){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return($[e]||[]).forEach(o=>{t=o.apply(null,[t,...a])}),t}function X(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];($[e]||[]).forEach(i=>{i.apply(null,n)})}function W(){const e=arguments[0],t=Array.prototype.slice.call(arguments,1);return q[e]?q[e].apply(null,t):void 0}function je(e){e.prefix==="fa"&&(e.prefix="fas");let{iconName:t}=e;const n=e.prefix||G();if(t)return t=D(n,t)||t,ut(cn.definitions,n,t)||ut(I.styles,n,t)}const cn=new _a,ka=()=>{f.autoReplaceSvg=!1,f.observeMutations=!1,X("noAuto")},wa={i2svg:function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return z?(X("beforeI2svg",e),W("pseudoElements2svg",e),W("i2svg",e)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:t}=e;f.autoReplaceSvg===!1&&(f.autoReplaceSvg=!0),f.observeMutations=!0,ca(()=>{Na({autoReplaceSvgRoot:t}),X("watch",e)})}},Pa={icon:e=>{if(e===null)return null;if(typeof e=="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:D(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){const t=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],n=be(e[0]);return{prefix:n,iconName:D(n,t)||t}}if(typeof e=="string"&&(e.indexOf("".concat(f.cssPrefix,"-"))>-1||e.match($n))){const t=ye(e.split(" "),{skipLookups:!0});return{prefix:t.prefix||G(),iconName:D(t.prefix,t.iconName)||t.iconName}}if(typeof e=="string"){const t=G();return{prefix:t,iconName:D(t,e)||e}}}},O={noAuto:ka,config:f,dom:wa,parse:Pa,library:cn,findIconDefinition:je,toHtml:oe},Na=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:t=h}=e;(Object.keys(I.styles).length>0||f.autoFetchSvg)&&z&&f.autoReplaceSvg&&O.dom.i2svg({node:t})};function ve(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(n=>oe(n))}}),Object.defineProperty(e,"node",{get:function(){if(!z)return;const n=h.createElement("div");return n.innerHTML=e.html,n.children}}),e}function Sa(e){let{children:t,main:n,mask:a,attributes:r,styles:i,transform:o}=e;if(Qe(o)&&n.found&&!a.found){const{width:s,height:l}=n,c={x:s/l/2,y:.5};r.style=he({...i,"transform-origin":"".concat(c.x+o.x/16,"em ").concat(c.y+o.y/16,"em")})}return[{tag:"svg",attributes:r,children:t}]}function Oa(e){let{prefix:t,iconName:n,children:a,attributes:r,symbol:i}=e;const o=i===!0?"".concat(t,"-").concat(f.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:{...r,id:o},children:a}]}]}function tt(e){const{icons:{main:t,mask:n},prefix:a,iconName:r,transform:i,symbol:o,title:s,maskId:l,titleId:c,extra:u,watchable:d=!1}=e,{width:m,height:b}=n.found?n:t,A=a==="fak",w=[f.replacementClass,r?"".concat(f.cssPrefix,"-").concat(r):""].filter(C=>u.classes.indexOf(C)===-1).filter(C=>C!==""||!!C).concat(u.classes).join(" ");let v={children:[],attributes:{...u.attributes,"data-prefix":a,"data-icon":r,class:w,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(m," ").concat(b)}};const x=A&&!~u.classes.indexOf("fa-fw")?{width:"".concat(m/b*16*.0625,"em")}:{};d&&(v.attributes[B]=""),s&&(v.children.push({tag:"title",attributes:{id:v.attributes["aria-labelledby"]||"title-".concat(c||ie())},children:[s]}),delete v.attributes.title);const _={...v,prefix:a,iconName:r,main:t,mask:n,maskId:l,transform:i,symbol:o,styles:{...x,...u.styles}},{children:k,attributes:L}=n.found&&t.found?W("generateAbstractMask",_)||{children:[],attributes:{}}:W("generateAbstractIcon",_)||{children:[],attributes:{}};return _.children=k,_.attributes=L,o?Oa(_):Sa(_)}function pt(e){const{content:t,width:n,height:a,transform:r,title:i,extra:o,watchable:s=!1}=e,l={...o.attributes,...i?{title:i}:{},class:o.classes.join(" ")};s&&(l[B]="");const c={...o.styles};Qe(r)&&(c.transform=sa({transform:r,startCentered:!0,width:n,height:a}),c["-webkit-transform"]=c.transform);const u=he(c);u.length>0&&(l.style=u);const d=[];return d.push({tag:"span",attributes:l,children:[t]}),i&&d.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),d}function Ca(e){const{content:t,title:n,extra:a}=e,r={...a.attributes,...n?{title:n}:{},class:a.classes.join(" ")},i=he(a.styles);i.length>0&&(r.style=i);const o=[];return o.push({tag:"span",attributes:r,children:[t]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}const{styles:we}=I;function De(e){const t=e[0],n=e[1],[a]=e.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(f.cssPrefix,"-").concat(xe.GROUP)},children:[{tag:"path",attributes:{class:"".concat(f.cssPrefix,"-").concat(xe.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(f.cssPrefix,"-").concat(xe.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:t,height:n,icon:r}}const Ea={found:!1,width:512,height:512};function Ta(e,t){!Bt&&!f.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function Ue(e,t){let n=t;return t==="fa"&&f.styleDefault!==null&&(t=G()),new Promise((a,r)=>{if(n==="fa"){const i=ln(e)||{};e=i.iconName||e,t=i.prefix||t}if(e&&t&&we[t]&&we[t][e]){const i=we[t][e];return a(De(i))}Ta(e,t),a({...Ea,icon:f.showMissingIcons&&e?W("missingIconAbstract")||{}:{}})})}const gt=()=>{},Ge=f.measurePerformance&&ce&&ce.mark&&ce.measure?ce:{mark:gt,measure:gt},te='FA "6.6.0"',Ia=e=>(Ge.mark("".concat(te," ").concat(e," begins")),()=>fn(e)),fn=e=>{Ge.mark("".concat(te," ").concat(e," ends")),Ge.measure("".concat(te," ").concat(e),"".concat(te," ").concat(e," begins"),"".concat(te," ").concat(e," ends"))};var nt={begin:Ia,end:fn};const fe=()=>{};function ht(e){return typeof(e.getAttribute?e.getAttribute(B):null)=="string"}function Fa(e){const t=e.getAttribute?e.getAttribute($e):null,n=e.getAttribute?e.getAttribute(Ke):null;return t&&n}function La(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(f.replacementClass)}function Ma(){return f.autoReplaceSvg===!0?ue.replace:ue[f.autoReplaceSvg]||ue.replace}function Ra(e){return h.createElementNS("http://www.w3.org/2000/svg",e)}function za(e){return h.createElement(e)}function un(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=e.tag==="svg"?Ra:za}=t;if(typeof e=="string")return h.createTextNode(e);const a=n(e.tag);return Object.keys(e.attributes||[]).forEach(function(i){a.setAttribute(i,e.attributes[i])}),(e.children||[]).forEach(function(i){a.appendChild(un(i,{ceFn:n}))}),a}function ja(e){let t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}const ue={replace:function(e){const t=e[0];if(t.parentNode)if(e[1].forEach(n=>{t.parentNode.insertBefore(un(n),t)}),t.getAttribute(B)===null&&f.keepOriginalSource){let n=h.createComment(ja(t));t.parentNode.replaceChild(n,t)}else t.remove()},nest:function(e){const t=e[0],n=e[1];if(~qe(t).indexOf(f.replacementClass))return ue.replace(e);const a=new RegExp("".concat(f.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const i=n[0].attributes.class.split(" ").reduce((o,s)=>(s===f.replacementClass||s.match(a)?o.toSvg.push(s):o.toNode.push(s),o),{toNode:[],toSvg:[]});n[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?t.removeAttribute("class"):t.setAttribute("class",i.toNode.join(" "))}const r=n.map(i=>oe(i)).join(`
`);t.setAttribute(B,""),t.innerHTML=r}};function bt(e){e()}function mn(e,t){const n=typeof t=="function"?t:fe;if(e.length===0)n();else{let a=bt;f.mutateApproach===Vn&&(a=U.requestAnimationFrame||bt),a(()=>{const r=Ma(),i=nt.begin("mutate");e.map(r),i(),n()})}}let at=!1;function dn(){at=!0}function We(){at=!1}let de=null;function yt(e){if(!st||!f.observeMutations)return;const{treeCallback:t=fe,nodeCallback:n=fe,pseudoElementsCallback:a=fe,observeMutationsRoot:r=h}=e;de=new st(i=>{if(at)return;const o=G();Z(i).forEach(s=>{if(s.type==="childList"&&s.addedNodes.length>0&&!ht(s.addedNodes[0])&&(f.searchPseudoElements&&a(s.target),t(s.target)),s.type==="attributes"&&s.target.parentNode&&f.searchPseudoElements&&a(s.target.parentNode),s.type==="attributes"&&ht(s.target)&&~Qn.indexOf(s.attributeName))if(s.attributeName==="class"&&Fa(s.target)){const{prefix:l,iconName:c}=ye(qe(s.target));s.target.setAttribute($e,l||o),c&&s.target.setAttribute(Ke,c)}else La(s.target)&&n(s.target)})}),z&&de.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function Da(){de&&de.disconnect()}function Ua(e){const t=e.getAttribute("style");let n=[];return t&&(n=t.split(";").reduce((a,r)=>{const i=r.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(a[o]=s.join(":").trim()),a},{})),n}function Ga(e){const t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),a=e.innerText!==void 0?e.innerText.trim():"";let r=ye(qe(e));return r.prefix||(r.prefix=G()),t&&n&&(r.prefix=t,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=ba(r.prefix,e.innerText)||Ze(r.prefix,Me(e.innerText))),!r.iconName&&f.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=e.firstChild.data)),r}function Wa(e){const t=Z(e.attributes).reduce((r,i)=>(r.name!=="class"&&r.name!=="style"&&(r[i.name]=i.value),r),{}),n=e.getAttribute("title"),a=e.getAttribute("data-fa-title-id");return f.autoA11y&&(n?t["aria-labelledby"]="".concat(f.replacementClass,"-title-").concat(a||ie()):(t["aria-hidden"]="true",t.focusable="false")),t}function Ya(){return{iconName:null,title:null,titleId:null,prefix:null,transform:T,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function vt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=Ga(e),i=Wa(e),o=ze("parseNodeAttributes",{},e);let s=t.styleParser?Ua(e):[];return{iconName:n,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:a,transform:T,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:s,attributes:i},...o}}const{styles:Ha}=I;function pn(e){const t=f.autoReplaceSvg==="nest"?vt(e,{styleParser:!1}):vt(e);return~t.extra.classes.indexOf(Kt)?W("generateLayersText",e,t):W("generateSvgReplacementMutation",e,t)}let F=new Set;Xt.map(e=>{F.add("fa-".concat(e))});Object.keys(H[y]).map(F.add.bind(F));Object.keys(H[N]).map(F.add.bind(F));Object.keys(H[S]).map(F.add.bind(F));F=[...F];function _t(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!z)return Promise.resolve();const n=h.documentElement.classList,a=u=>n.add("".concat(ct,"-").concat(u)),r=u=>n.remove("".concat(ct,"-").concat(u)),i=f.autoFetchSvg?F:Xt.map(u=>"fa-".concat(u)).concat(Object.keys(Ha));i.includes("fa")||i.push("fa");const o=[".".concat(Kt,":not([").concat(B,"])")].concat(i.map(u=>".".concat(u,":not([").concat(B,"])"))).join(", ");if(o.length===0)return Promise.resolve();let s=[];try{s=Z(e.querySelectorAll(o))}catch{}if(s.length>0)a("pending"),r("complete");else return Promise.resolve();const l=nt.begin("onTree"),c=s.reduce((u,d)=>{try{const m=pn(d);m&&u.push(m)}catch(m){Bt||m.name==="MissingIcon"&&console.error(m)}return u},[]);return new Promise((u,d)=>{Promise.all(c).then(m=>{mn(m,()=>{a("active"),a("complete"),r("pending"),typeof t=="function"&&t(),l(),u()})}).catch(m=>{l(),d(m)})})}function Va(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;pn(e).then(n=>{n&&mn([n],t)})}function Ba(e){return function(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(t||{}).icon?t:je(t||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:je(r||{})),e(a,{...n,mask:r})}}const Xa=function(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=T,symbol:a=!1,mask:r=null,maskId:i=null,title:o=null,titleId:s=null,classes:l=[],attributes:c={},styles:u={}}=t;if(!e)return;const{prefix:d,iconName:m,icon:b}=e;return ve({type:"icon",...e},()=>(X("beforeDOMElementCreation",{iconDefinition:e,params:t}),f.autoA11y&&(o?c["aria-labelledby"]="".concat(f.replacementClass,"-title-").concat(s||ie()):(c["aria-hidden"]="true",c.focusable="false")),tt({icons:{main:De(b),mask:r?De(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:d,iconName:m,transform:{...T,...n},symbol:a,title:o,maskId:i,titleId:s,extra:{attributes:c,styles:u,classes:l}})))};var $a={mixout(){return{icon:Ba(Xa)}},hooks(){return{mutationObserverCallbacks(e){return e.treeCallback=_t,e.nodeCallback=Va,e}}},provides(e){e.i2svg=function(t){const{node:n=h,callback:a=()=>{}}=t;return _t(n,a)},e.generateSvgReplacementMutation=function(t,n){const{iconName:a,title:r,titleId:i,prefix:o,transform:s,symbol:l,mask:c,maskId:u,extra:d}=n;return new Promise((m,b)=>{Promise.all([Ue(a,o),c.iconName?Ue(c.iconName,c.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(A=>{let[w,v]=A;m([t,tt({icons:{main:w,mask:v},prefix:o,iconName:a,transform:s,symbol:l,maskId:u,title:r,titleId:i,extra:d,watchable:!0})])}).catch(b)})},e.generateAbstractIcon=function(t){let{children:n,attributes:a,main:r,transform:i,styles:o}=t;const s=he(o);s.length>0&&(a.style=s);let l;return Qe(i)&&(l=W("generateAbstractTransformGrouping",{main:r,transform:i,containerWidth:r.width,iconWidth:r.width})),n.push(l||r.icon),{children:n,attributes:a}}}},Ka={mixout(){return{layer(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=t;return ve({type:"layer"},()=>{X("beforeDOMElementCreation",{assembler:e,params:t});let a=[];return e(r=>{Array.isArray(r)?r.map(i=>{a=a.concat(i.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(f.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},qa={mixout(){return{counter(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:i={}}=t;return ve({type:"counter",content:e},()=>(X("beforeDOMElementCreation",{content:e,params:t}),Ca({content:e.toString(),title:n,extra:{attributes:r,styles:i,classes:["".concat(f.cssPrefix,"-layers-counter"),...a]}})))}}}},Qa={mixout(){return{text(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=T,title:a=null,classes:r=[],attributes:i={},styles:o={}}=t;return ve({type:"text",content:e},()=>(X("beforeDOMElementCreation",{content:e,params:t}),pt({content:e,transform:{...T,...n},title:a,extra:{attributes:i,styles:o,classes:["".concat(f.cssPrefix,"-layers-text"),...r]}})))}}},provides(e){e.generateLayersText=function(t,n){const{title:a,transform:r,extra:i}=n;let o=null,s=null;if(Ut){const l=parseInt(getComputedStyle(t).fontSize,10),c=t.getBoundingClientRect();o=c.width/l,s=c.height/l}return f.autoA11y&&!a&&(i.attributes["aria-hidden"]="true"),Promise.resolve([t,pt({content:t.innerHTML,width:o,height:s,transform:r,title:a,extra:i,watchable:!0})])}}};const Ja=new RegExp('"',"ug"),xt=[1105920,1112319],At={FontAwesome:{normal:"fas",400:"fas"},...Fn,...In,...Gn},Ye=Object.keys(At).reduce((e,t)=>(e[t.toLowerCase()]=At[t],e),{}),Za=Object.keys(Ye).reduce((e,t)=>{const n=Ye[t];return e[t]=n[900]||[...Object.entries(n)][0][1],e},{});function er(e){const t=e.replace(Ja,""),n=ua(t,0),a=n>=xt[0]&&n<=xt[1],r=t.length===2?t[0]===t[1]:!1;return{value:Me(r?t[0]:t),isSecondary:a||r}}function tr(e,t){const n=e.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(t),r=isNaN(a)?"normal":a;return(Ye[n]||{})[r]||Za[n]}function kt(e,t){const n="".concat(Hn).concat(t.replace(":","-"));return new Promise((a,r)=>{if(e.getAttribute(n)!==null)return a();const o=Z(e.children).filter(m=>m.getAttribute(Te)===t)[0],s=U.getComputedStyle(e,t),l=s.getPropertyValue("font-family"),c=l.match(Kn),u=s.getPropertyValue("font-weight"),d=s.getPropertyValue("content");if(o&&!c)return e.removeChild(o),a();if(c&&d!=="none"&&d!==""){const m=s.getPropertyValue("content");let b=tr(l,u);const{value:A,isSecondary:w}=er(m),v=c[0].startsWith("FontAwesome");let x=Ze(b,A),_=x;if(v){const k=ya(A);k.iconName&&k.prefix&&(x=k.iconName,b=k.prefix)}if(x&&!w&&(!o||o.getAttribute($e)!==b||o.getAttribute(Ke)!==_)){e.setAttribute(n,_),o&&e.removeChild(o);const k=Ya(),{extra:L}=k;L.attributes[Te]=t,Ue(x,b).then(C=>{const _n=tt({...k,icons:{main:C,mask:et()},prefix:b,iconName:_,extra:L,watchable:!0}),_e=h.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(_e,e.firstChild):e.appendChild(_e),_e.outerHTML=_n.map(xn=>oe(xn)).join(`
`),e.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function nr(e){return Promise.all([kt(e,"::before"),kt(e,"::after")])}function ar(e){return e.parentNode!==document.head&&!~Bn.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Te)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function wt(e){if(z)return new Promise((t,n)=>{const a=Z(e.querySelectorAll("*")).filter(ar).map(nr),r=nt.begin("searchPseudoElements");dn(),Promise.all(a).then(()=>{r(),We(),t()}).catch(()=>{r(),We(),n()})})}var rr={hooks(){return{mutationObserverCallbacks(e){return e.pseudoElementsCallback=wt,e}}},provides(e){e.pseudoElements2svg=function(t){const{node:n=h}=t;f.searchPseudoElements&&wt(n)}}};let Pt=!1;var ir={mixout(){return{dom:{unwatch(){dn(),Pt=!0}}}},hooks(){return{bootstrap(){yt(ze("mutationObserverCallbacks",{}))},noAuto(){Da()},watch(e){const{observeMutationsRoot:t}=e;Pt?We():yt(ze("mutationObserverCallbacks",{observeMutationsRoot:t}))}}}};const Nt=e=>{let t={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),i=r[0];let o=r.slice(1).join("-");if(i&&o==="h")return n.flipX=!0,n;if(i&&o==="v")return n.flipY=!0,n;if(o=parseFloat(o),isNaN(o))return n;switch(i){case"grow":n.size=n.size+o;break;case"shrink":n.size=n.size-o;break;case"left":n.x=n.x-o;break;case"right":n.x=n.x+o;break;case"up":n.y=n.y-o;break;case"down":n.y=n.y+o;break;case"rotate":n.rotate=n.rotate+o;break}return n},t)};var sr={mixout(){return{parse:{transform:e=>Nt(e)}}},hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-transform");return n&&(e.transform=Nt(n)),e}}},provides(e){e.generateAbstractTransformGrouping=function(t){let{main:n,transform:a,containerWidth:r,iconWidth:i}=t;const o={transform:"translate(".concat(r/2," 256)")},s="translate(".concat(a.x*32,", ").concat(a.y*32,") "),l="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),c="rotate(".concat(a.rotate," 0 0)"),u={transform:"".concat(s," ").concat(l," ").concat(c)},d={transform:"translate(".concat(i/2*-1," -256)")},m={outer:o,inner:u,path:d};return{tag:"g",attributes:{...m.outer},children:[{tag:"g",attributes:{...m.inner},children:[{tag:n.icon.tag,children:n.icon.children,attributes:{...n.icon.attributes,...m.path}}]}]}}}};const Pe={x:0,y:0,width:"100%",height:"100%"};function St(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function or(e){return e.tag==="g"?e.children:[e]}var lr={hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-mask"),a=n?ye(n.split(" ").map(r=>r.trim())):et();return a.prefix||(a.prefix=G()),e.mask=a,e.maskId=t.getAttribute("data-fa-mask-id"),e}}},provides(e){e.generateAbstractMask=function(t){let{children:n,attributes:a,main:r,mask:i,maskId:o,transform:s}=t;const{width:l,icon:c}=r,{width:u,icon:d}=i,m=ia({transform:s,containerWidth:u,iconWidth:l}),b={tag:"rect",attributes:{...Pe,fill:"white"}},A=c.children?{children:c.children.map(St)}:{},w={tag:"g",attributes:{...m.inner},children:[St({tag:c.tag,attributes:{...c.attributes,...m.path},...A})]},v={tag:"g",attributes:{...m.outer},children:[w]},x="mask-".concat(o||ie()),_="clip-".concat(o||ie()),k={tag:"mask",attributes:{...Pe,id:x,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"},children:[b,v]},L={tag:"defs",children:[{tag:"clipPath",attributes:{id:_},children:or(d)},k]};return n.push(L,{tag:"rect",attributes:{fill:"currentColor","clip-path":"url(#".concat(_,")"),mask:"url(#".concat(x,")"),...Pe}}),{children:n,attributes:a}}}},cr={provides(e){let t=!1;U.matchMedia&&(t=U.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:{...a,d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"}});const i={...r,attributeName:"opacity"},o={tag:"circle",attributes:{...a,cx:"256",cy:"364",r:"28"},children:[]};return t||o.children.push({tag:"animate",attributes:{...r,attributeName:"r",values:"28;14;28;28;14;28;"}},{tag:"animate",attributes:{...i,values:"1;0;1;1;0;1;"}}),n.push(o),n.push({tag:"path",attributes:{...a,opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"},children:t?[]:[{tag:"animate",attributes:{...i,values:"1;0;0;0;0;1;"}}]}),t||n.push({tag:"path",attributes:{...a,opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"},children:[{tag:"animate",attributes:{...i,values:"0;0;1;1;0;0;"}}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},fr={hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return e.symbol=a,e}}}},ur=[la,$a,Ka,qa,Qa,rr,ir,sr,lr,cr,fr];Aa(ur,{mixoutsTo:O});O.noAuto;O.config;O.library;O.dom;const He=O.parse;O.findIconDefinition;O.toHtml;const mr=O.icon;O.layer;O.text;O.counter;var Ne={exports:{}},Se,Ot;function dr(){if(Ot)return Se;Ot=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Se=e,Se}var Oe,Ct;function pr(){if(Ct)return Oe;Ct=1;var e=dr();function t(){}function n(){}return n.resetWarningCache=t,Oe=function(){function a(o,s,l,c,u,d){if(d!==e){var m=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw m.name="Invariant Violation",m}}a.isRequired=a;function r(){return a}var i={array:a,bigint:a,bool:a,func:a,number:a,object:a,string:a,symbol:a,any:a,arrayOf:r,element:a,elementType:a,instanceOf:r,node:a,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},Oe}var Et;function gr(){return Et||(Et=1,Ne.exports=pr()()),Ne.exports}var hr=gr();const p=An(hr);function Tt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,a)}return n}function E(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Tt(Object(n),!0).forEach(function(a){K(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Tt(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function pe(e){"@babel/helpers - typeof";return pe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},pe(e)}function K(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function br(e,t){if(e==null)return{};var n={},a=Object.keys(e),r,i;for(i=0;i<a.length;i++)r=a[i],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}function yr(e,t){if(e==null)return{};var n=br(e,t),a,r;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],!(t.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function Ve(e){return vr(e)||_r(e)||xr(e)||Ar()}function vr(e){if(Array.isArray(e))return Be(e)}function _r(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function xr(e,t){if(e){if(typeof e=="string")return Be(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Be(e,t)}}function Be(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function Ar(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function kr(e){var t,n=e.beat,a=e.fade,r=e.beatFade,i=e.bounce,o=e.shake,s=e.flash,l=e.spin,c=e.spinPulse,u=e.spinReverse,d=e.pulse,m=e.fixedWidth,b=e.inverse,A=e.border,w=e.listItem,v=e.flip,x=e.size,_=e.rotation,k=e.pull,L=(t={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":i,"fa-shake":o,"fa-flash":s,"fa-spin":l,"fa-spin-reverse":u,"fa-spin-pulse":c,"fa-pulse":d,"fa-fw":m,"fa-inverse":b,"fa-border":A,"fa-li":w,"fa-flip":v===!0,"fa-flip-horizontal":v==="horizontal"||v==="both","fa-flip-vertical":v==="vertical"||v==="both"},K(t,"fa-".concat(x),typeof x<"u"&&x!==null),K(t,"fa-rotate-".concat(_),typeof _<"u"&&_!==null&&_!==0),K(t,"fa-pull-".concat(k),typeof k<"u"&&k!==null),K(t,"fa-swap-opacity",e.swapOpacity),t);return Object.keys(L).map(function(C){return L[C]?C:null}).filter(function(C){return C})}function wr(e){return e=e-0,e===e}function gn(e){return wr(e)?e:(e=e.replace(/[\-_\s]+(.)?/g,function(t,n){return n?n.toUpperCase():""}),e.substr(0,1).toLowerCase()+e.substr(1))}var Pr=["style"];function Nr(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Sr(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var a=n.indexOf(":"),r=gn(n.slice(0,a)),i=n.slice(a+1).trim();return r.startsWith("webkit")?t[Nr(r)]=i:t[r]=i,t},{})}function hn(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="string")return t;var a=(t.children||[]).map(function(l){return hn(e,l)}),r=Object.keys(t.attributes||{}).reduce(function(l,c){var u=t.attributes[c];switch(c){case"class":l.attrs.className=u,delete t.attributes.class;break;case"style":l.attrs.style=Sr(u);break;default:c.indexOf("aria-")===0||c.indexOf("data-")===0?l.attrs[c.toLowerCase()]=u:l.attrs[gn(c)]=u}return l},{attrs:{}}),i=n.style,o=i===void 0?{}:i,s=yr(n,Pr);return r.attrs.style=E(E({},r.attrs.style),o),e.apply(void 0,[t.tag,E(E({},r.attrs),s)].concat(Ve(a)))}var bn=!1;try{bn=!0}catch{}function Or(){if(!bn&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function It(e){if(e&&pe(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(He.icon)return He.icon(e);if(e===null)return null;if(e&&pe(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}function Ce(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?K({},e,t):{}}var Ft={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},ge=Mt.forwardRef(function(e,t){var n=E(E({},Ft),e),a=n.icon,r=n.mask,i=n.symbol,o=n.className,s=n.title,l=n.titleId,c=n.maskId,u=It(a),d=Ce("classes",[].concat(Ve(kr(n)),Ve((o||"").split(" ")))),m=Ce("transform",typeof n.transform=="string"?He.transform(n.transform):n.transform),b=Ce("mask",It(r)),A=mr(u,E(E(E(E({},d),m),b),{},{symbol:i,title:s,titleId:l,maskId:c}));if(!A)return Or("Could not find icon",u),null;var w=A.abstract,v={ref:t};return Object.keys(n).forEach(function(x){Ft.hasOwnProperty(x)||(v[x]=n[x])}),Cr(w[0],v)});ge.displayName="FontAwesomeIcon";ge.propTypes={beat:p.bool,border:p.bool,beatFade:p.bool,bounce:p.bool,className:p.string,fade:p.bool,flash:p.bool,mask:p.oneOfType([p.object,p.array,p.string]),maskId:p.string,fixedWidth:p.bool,inverse:p.bool,flip:p.oneOf([!0,!1,"horizontal","vertical","both"]),icon:p.oneOfType([p.object,p.array,p.string]),listItem:p.bool,pull:p.oneOf(["right","left"]),pulse:p.bool,rotation:p.oneOf([0,90,180,270]),shake:p.bool,size:p.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:p.bool,spinPulse:p.bool,spinReverse:p.bool,symbol:p.oneOfType([p.bool,p.string]),title:p.string,titleId:p.string,transform:p.oneOfType([p.string,p.object]),swapOpacity:p.bool};var Cr=hn.bind(null,Mt.createElement);const Er={prefix:"fas",iconName:"atom",icon:[512,512,[9883],"f5d2","M256 398.8c-11.8 5.1-23.4 9.7-34.9 13.5c16.7 33.8 31 35.7 34.9 35.7s18.1-1.9 34.9-35.7c-11.4-3.9-23.1-8.4-34.9-13.5zM446 256c33 45.2 44.3 90.9 23.6 128c-20.2 36.3-62.5 49.3-115.2 43.2c-22 52.1-55.6 84.8-98.4 84.8s-76.4-32.7-98.4-84.8c-52.7 6.1-95-6.8-115.2-43.2C21.7 346.9 33 301.2 66 256c-33-45.2-44.3-90.9-23.6-128c20.2-36.3 62.5-49.3 115.2-43.2C179.6 32.7 213.2 0 256 0s76.4 32.7 98.4 84.8c52.7-6.1 95 6.8 115.2 43.2c20.7 37.1 9.4 82.8-23.6 128zm-65.8 67.4c-1.7 14.2-3.9 28-6.7 41.2c31.8 1.4 38.6-8.7 40.2-11.7c2.3-4.2 7-17.9-11.9-48.1c-6.8 6.3-14 12.5-21.6 18.6zm-6.7-175.9c2.8 13.1 5 26.9 6.7 41.2c7.6 6.1 14.8 12.3 21.6 18.6c18.9-30.2 14.2-44 11.9-48.1c-1.6-2.9-8.4-13-40.2-11.7zM290.9 99.7C274.1 65.9 259.9 64 256 64s-18.1 1.9-34.9 35.7c11.4 3.9 23.1 8.4 34.9 13.5c11.8-5.1 23.4-9.7 34.9-13.5zm-159 88.9c1.7-14.3 3.9-28 6.7-41.2c-31.8-1.4-38.6 8.7-40.2 11.7c-2.3 4.2-7 17.9 11.9 48.1c6.8-6.3 14-12.5 21.6-18.6zM110.2 304.8C91.4 335 96 348.7 98.3 352.9c1.6 2.9 8.4 13 40.2 11.7c-2.8-13.1-5-26.9-6.7-41.2c-7.6-6.1-14.8-12.3-21.6-18.6zM336 256a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zm-80-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]},Tr={prefix:"fas",iconName:"file-pdf",icon:[512,512,[],"f1c1","M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"]},Ir={prefix:"fas",iconName:"diagram-project",icon:[576,512,["project-diagram"],"f542","M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 16 192 0 0-16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-16-192 0 0 16c0 1.7-.1 3.4-.3 5L272 288l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-1.7 .1-3.4 .3-5L144 224l-96 0c-26.5 0-48-21.5-48-48L0 80z"]},Fr={prefix:"fab",iconName:"github",icon:[496,512,[],"f09b","M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"]},Lr=[{key:"pdf",label:"PDF",icon:Tr,metaKey:"pdf_link"},{key:"arxiv",label:"arXiv",icon:Er,metaKey:"arxiv_link"},{key:"github",label:"GitHub",icon:Fr,metaKey:"github_link"},{key:"project",label:"Project Page",icon:Ir,metaKey:"project_link"}],yn=e=>typeof e=="string"?e.trim():"",vn=e=>{if(!e)return!1;try{const t=new URL(e);return t.protocol==="https:"||t.protocol==="http:"}catch{return!1}},Mr=(e={})=>{const t=["pdf_link","arxiv_link","project_link","github_link","paper_link","source_code_link"];for(const n of t){const a=yn(e==null?void 0:e[n]);if(vn(a))return a}return""};function Rr({meta:e={},className:t=""}){const n=`publication-link-icons ${t}`.trim();return g("div",{className:n,"aria-label":"Publication links",children:Lr.map(a=>{const r=yn(e==null?void 0:e[a.metaKey]);return vn(r)?g("a",{href:r,target:"_blank",rel:"noreferrer",className:"publication-link-icons__item is-active",title:a.label,"aria-label":`Open ${a.label}`,children:g(ge,{icon:a.icon,"aria-hidden":"true"})},a.key):g("span",{className:"publication-link-icons__item is-disabled",title:`${a.label} unavailable`,"aria-label":`${a.label} unavailable`,children:g(ge,{icon:a.icon,"aria-hidden":"true"})},a.key)})})}const zr="/assets/style-kd-figure-1-nTmFz4AD.webp",jr="/assets/spatial-bias-figure-1-DF8ymzzx.webp",Dr="/assets/adnet-figure-2-COsPK7U4.webp",Ur="/assets/cnn-vit-medical-figure-1-Dv2SxvlV.webp",Gr="/assets/ct-asbo-figure-2-IYvg943P.webp",Wr="/assets/ral-figure-2-COxR_DKE.webp",Yr="/assets/do-your-best-figure-1-CB7LJkfz.webp",Hr="/assets/channel-propagation-figure-1-BJ3K6t6g.webp",Vr="/assets/map-figure-1-DGTaOsN4.webp",Br="/assets/neural-substitution-figure-1-f3HktlIs.webp",Xr="/assets/hqt-figure-1-CrDsPoTD.webp",$r="/assets/gen-ssl-figure-2-CZgxUOzm.webp",Kr="/assets/cxr-lt-figure-1-DrXN0L2a.webp",qr="/assets/fg-ssl-figure-1-B54f3kBF.webp",Qr={"biomedical-bapub4-style-kd-class-imbalanced-medical-image":{image:zr,figureLabel:"Figure 1",alt:"Figure 1 from Style-KD showing source and reference retinal images used to balance the APTOS2019 training set.",sourceUrl:"https://ars.els-cdn.com/content/image/1-s2.0-S1746809423013617-gr1_lrg.jpg"},"core-capub0-spatial-bias-for-attention-free-non-local":{image:jr,figureLabel:"Figure 1",alt:"Figure 1 from Spatial Bias comparing inference time and top-1 accuracy across non-local network variants.",sourceUrl:"https://ars.els-cdn.com/content/image/1-s2.0-S0957417423025551-gr1_lrg.jpg"},"biomedical-bapub2-attentional-decoder-networks-for-chest-x-r":{image:Dr,figureLabel:"Figure 2",alt:"Figure 2 from ADNet comparing a conventional U-Net decoder with the proposed attentional decoder and harmonic magnitude transform.",sourceUrl:"https://ars.els-cdn.com/content/image/1-s2.0-S0169260724001949-gr2_lrg.jpg"},"biomedical-bapub3-analyzing-to-discover-origins-of-cnns-and":{image:Ur,figureLabel:"Figure 1",alt:"Figure 1 from the CNN and ViT analysis paper showing robustness results and corrupted medical image examples.",sourceUrl:"https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41598-024-58382-3/MediaObjects/41598_2024_58382_Fig1_HTML.png"},"biomedical-bapub0-deep-learning-using-computed-tomography-to":{image:Gr,figureLabel:"Figure 2",alt:"Figure 2 from the acute small bowel obstruction study showing the proposed CT diagnosis network workflow.",sourceUrl:"https://cdn.ncbi.nlm.nih.gov/pmc/blobs/72af/10720875/e4ac39b2182c/js9-109-4091-g002.jpg"},"biomedical-bapub1-robust-asymmetric-loss-for-multi-label-lon":{image:Wr,figureLabel:"Figure 2",alt:"Figure 2 from the RAL paper comparing BCE, ASL, and robust asymmetric loss probabilities on multi-label and single-label medical images.",sourceUrl:"https://openaccess.thecvf.com/content/ICCV2023W/CVAMD/papers/Park_Robust_Asymmetric_Loss_for_Multi-Label_Long-Tailed_Learning_ICCVW_2023_paper.pdf"},"core-capub1-do-your-best-and-get-enough-rest-for-continual":{image:Yr,figureLabel:"Figure 1",alt:"Figure 1 from the Respacing paper illustrating the forgetting curve and how recall interval affects memory retention decay.",sourceUrl:"https://arxiv.org/abs/2503.18371"},"core-capub2-channel-propagation-networks-for-refreshable":{image:Hr,figureLabel:"Figure 1",alt:"Figure 1 comparing Channel Propagation networks (CP-Swin, CP-PiT) with baseline Swin and PiT across parameter count and top-1 accuracy.",sourceUrl:"https://openaccess.thecvf.com/content/WACV2025/papers/Go_Channel_Propagation_Networks_for_Refreshable_Vision_Transformer_WACV_2025_paper.pdf"},"core-capub3-enriching-local-patterns-with-multi-token":{image:Vr,figureLabel:"Figure 1",alt:"Figure 1 comparing MAP-ConvNeXt and MAP-MaxViT against SOTA networks on throughput versus top-1 accuracy for small and large models.",sourceUrl:"https://openaccess.thecvf.com/content/WACV2025/papers/Kang_Enriching_Local_Patterns_with_Multi-Token_Attention_for_Broad-Sight_Neural_Networks_WACV_2025_paper.pdf"},"core-capub4-neural-substitution-for-branch-level-network":{image:Br,figureLabel:"Figure 1",alt:"Figure 1 illustrating the progression from block-level to branch-level connectivity in the re-parameterization network.",sourceUrl:"https://openaccess.thecvf.com/content/ACCV2024/papers/Oh_Neural_Substitution_for_Branch-level_Network_Re-parameterization_ACCV_2024_paper.pdf"},"core-capub5-unsupervised-hashing-network-with-hyper":{image:Xr,figureLabel:"Figure 1",alt:"Figure 1 comparing clustering results of a traditional hashing algorithm with the proposed Hyper Quantization Tree, plus the HQT training pipeline.",sourceUrl:"https://bmva-archive.org.uk/bmvc/2024/papers/Paper_482/paper.pdf"},"biomedical-bapub5-generative-self-supervised-learning-for":{image:$r,figureLabel:"Figure 2",alt:"Figure 2 showing the generative self-supervised learning pipeline: LLM-elaborated prompts, diffusion-based image generation, and AdaIN-based reconstruction.",sourceUrl:"https://openaccess.thecvf.com/content/ACCV2024/html/Park_Generative_Self-Supervised_Learning_for_Medical_Image_Classification_ACCV_2024_paper.html"},"biomedical-bapub6-towards-long-tailed-multi-label-disease":{image:Kr,figureLabel:"Figure 1",alt:"Figure 1 showing the long-tailed distribution of clinical findings in the CXR-LT 2023 challenge dataset, highlighting newly added versus original labels.",sourceUrl:"https://arxiv.org/abs/2310.16112"},"biomedical-bapub7-fine-grained-self-supervised-learning-with":{image:qr,figureLabel:"Figure 1",alt:"Figure 1 showing the FG-SSL architecture with shuffled and distorted image branches feeding a shared hierarchical block toward a Barlow Twins style cross-correlation loss.",sourceUrl:"https://www.sciencedirect.com/science/article/abs/pii/S0010482524005444"}},Jr=(e="")=>Qr[e]??null;function Zr({publicationId:e,className:t,sizes:n}){const a=Jr(e);return g("figure",{className:`${t} publication-figure`,"data-publication-figure":(a==null?void 0:a.figureLabel)??void 0,children:a?g("img",{src:a.image,alt:a.alt,loading:"lazy",decoding:"async",sizes:n}):g("div",{className:"publication-figure__placeholder",children:"Figure unavailable"})})}const ei=e=>{if(!e)return!1;try{const t=new URL(e);return t.protocol==="https:"||t.protocol==="http:"}catch{return!1}};function ti({publicationId:e,category:t,meta:n,title:a,revealDelay:r="0ms",revealLoadDelay:i="80"}){var m,b,A;const o=Mr(n),s=ei(o),l=Rt[t]??t,c=((m=n.author)==null?void 0:m.trim())??"",u=((b=n.published_place)==null?void 0:b.trim())??"",d=((A=n.published_date)==null?void 0:A.trim())??"";return P("article",{"data-reveal":!0,"data-reveal-load-delay":i,style:{"--reveal-delay":r},className:"publication__card",children:[g(Zr,{publicationId:e,className:"publication__card-media",sizes:"(max-width: 768px) 13rem, 11.2rem"}),P("div",{className:"publication__card-main",children:[P("div",{className:"publication__card-badges",children:[g("p",{className:`publication__card-badge publication__card-badge--${t}`,children:l}),(n.labs??[]).map(w=>g("p",{className:"publication__card-badge publication__card-badge--lab",children:w},w))]}),g("h3",{className:"publication__card-title",children:s?g("a",{href:o,target:"_blank",rel:"noreferrer",className:"publication__card-title-link animated-underline",children:a}):g("span",{className:"publication__card-title-link publication__card-title-link--muted",children:a})}),c?g("p",{className:"publication__card-author",children:c}):null,(u||d)&&P("p",{className:"publication__card-meta-line",children:[u?g("span",{className:"publication__card-venue",children:u}):null,d?g("span",{className:"publication__card-date",children:d}):null]})]}),g("div",{className:"publication__card-links",children:g(Rr,{meta:n})})]})}function ni({children:e,areaKey:t="",isSelected:n,onSelect:a}){const r=(t||String(e)).toLowerCase();return g("button",{type:"button",className:`publication__button publication__button--${r} btn btn--secondary btn--sm interactive-button ${n?"is-active":"is-inactive"}`,onClick:a,"aria-pressed":n,children:e})}const Lt=Nn(),ai=Pn();function ri(){const e=kn(),[t,n]=le.useState("all"),[a,r]=le.useState(""),i=s=>{n(s)};le.useEffect(()=>{var m,b;const s=new URLSearchParams(e.search),l=((m=s.get("q"))==null?void 0:m.trim())??"",c=((b=s.get("area"))==null?void 0:b.trim())??"",u=c==="all"?"all":wn(c),d=Lt.includes(u);r(l),n(d?u:"all")},[e.search]);const o=le.useMemo(()=>{const s=a.trim().toLowerCase();return ai.filter(l=>t==="all"||t===l.category?s?[l.title,l.research_meta.author,l.research_meta.published_place].join(" ").toLowerCase().includes(s):!0:!1)},[a,t]);return P("div",{"data-reveal":!0,"data-reveal-load-delay":"60",className:"publication",children:[P("div",{"data-reveal":!0,className:"tab-header page-head page-head--publication",children:[g("h1",{children:"Publications"}),g("p",{className:"page-head__summary",children:"Search and filter the publication archive by research area, title, authors, and venue."})]}),g("div",{"data-reveal":!0,className:"publication__controls page-panel page-panel--compact page-panel--section-start page-controls","aria-label":"Filter publications",children:P("div",{className:"publication__controls-grid page-controls__grid",children:[P("section",{className:"publication__controls-group page-controls__group",children:[g("div",{className:"publication__controls-head",children:g("p",{className:"publication__controls-label page-controls__label",children:"Filter by research area"})}),g("div",{className:"publication__filter page-controls__actions",role:"group","aria-label":"Filter publications by area",children:Lt.map((s,l)=>g(ni,{areaKey:s,isSelected:t===s,onSelect:()=>i(s),children:Rt[s]||s.charAt(0).toUpperCase()+s.slice(1)},s+l))})]}),P("section",{className:"publication__controls-group page-controls__group",children:[g("div",{className:"publication__controls-head",children:g("label",{className:"publication__search-label page-controls__label",htmlFor:"publication-search",children:"Search publications"})}),g("div",{className:"publication__search-layout",children:g("div",{className:"publication__search-input-wrap",children:g("input",{id:"publication-search",type:"search",className:"publication__search-input",placeholder:"Search by title, authors, or venue",value:a,onChange:s=>r(s.target.value)})})})]})]})}),P("section",{"data-reveal":!0,className:"publication__archive page-panel","aria-labelledby":"publication-archive-title",children:[g("div",{className:"publication__section-head",children:P("div",{children:[g("h2",{id:"publication-archive-title",children:"Publications Archive"}),P("p",{children:[o.length," result",o.length===1?"":"s"," in the current view"]})]})}),P("div",{className:"publication__list",children:[o.map((s,l)=>g(ti,{publicationId:s.id,category:s.category,meta:s.research_meta,title:s.title,revealDelay:`${Math.min(l,5)*60}ms`,revealLoadDelay:`${120+Math.min(l,5)*60}`},`${s.key}-${l}`)),o.length===0&&g("p",{className:"publication__empty",children:"No publications match your selected category and search query."})]})]})]})}function oi(){return g(ri,{})}export{oi as default};
