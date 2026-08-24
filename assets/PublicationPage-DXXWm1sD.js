import{h as Sn,R as Dt,a as d,i as jt,j as x,b as Pn,r as te,k as Nn}from"./index-DT2pn1wG.js";const ot=()=>{};let Xe={},Vt={},Ut=null,Wt={mark:ot,measure:ot};try{typeof window<"u"&&(Xe=window),typeof document<"u"&&(Vt=document),typeof MutationObserver<"u"&&(Ut=MutationObserver),typeof performance<"u"&&(Wt=performance)}catch{}const{userAgent:st=""}=Xe.navigator||{},U=Xe,_=Vt,lt=Ut,ue=Wt;U.document;const D=!!_.documentElement&&!!_.head&&typeof _.addEventListener=="function"&&typeof _.createElement=="function",Gt=~st.indexOf("MSIE")||~st.indexOf("Trident/");var y="classic",Ht="duotone",P="sharp",N="sharp-duotone",On=[y,Ht,P,N],En={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds"}},ct={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},Tn=["kit"],Ln=/fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/,In=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,Fn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},Rn={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds"}},Mn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds"}},zn={classic:["fas","far","fal","fat"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds"]},Dn={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid"}},jn={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds"}},Bt={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid"}},Vn=["solid","regular","light","thin","duotone","brands"],Yt=[1,2,3,4,5,6,7,8,9,10],Un=Yt.concat([11,12,13,14,15,16,17,18,19,20]),ne={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Wn=[...Object.keys(zn),...Vn,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",ne.GROUP,ne.SWAP_OPACITY,ne.PRIMARY,ne.SECONDARY].concat(Yt.map(e=>"".concat(e,"x"))).concat(Un.map(e=>"w-".concat(e))),Gn={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Hn={kit:{"fa-kit":"fak"}},Bn={kit:{fak:"fa-kit"}},ut={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}};const M="___FONT_AWESOME___",Le=16,Kt="fa",$t="svg-inline--fa",K="data-fa-i2svg",Ie="data-fa-pseudo-element",Yn="data-fa-pseudo-element-pending",Je="data-prefix",qe="data-icon",ft="fontawesome-i2svg",Kn="async",$n=["HTML","HEAD","STYLE","SCRIPT"],Xt=(()=>{try{return!0}catch{return!1}})(),Jt=[y,P,N];function le(e){return new Proxy(e,{get(t,n){return n in t?t[n]:t[y]}})}const qt={...Bt};qt[y]={...Bt[y],...ct.kit,...ct["kit-duotone"]};const B=le(qt),Fe={...jn};Fe[y]={...Fe[y],...ut.kit,...ut["kit-duotone"]};const oe=le(Fe),Re={...Dn};Re[y]={...Re[y],...Bn.kit};const Y=le(Re),Me={...Mn};Me[y]={...Me[y],...Hn.kit};const Xn=le(Me),Jn=Ln,Qt="fa-layers-text",qn=In,Qn={...En};le(Qn);const Zn=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],we=ne,Q=new Set;Object.keys(oe[y]).map(Q.add.bind(Q));Object.keys(oe[P]).map(Q.add.bind(Q));Object.keys(oe[N]).map(Q.add.bind(Q));const ea=[...Tn,...Wn],re=U.FontAwesomeConfig||{};function ta(e){var t=_.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function na(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}_&&typeof _.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(t=>{let[n,a]=t;const i=na(ta(n));i!=null&&(re[a]=i)});const Zt={styleDefault:"solid",familyDefault:"classic",cssPrefix:Kt,replacementClass:$t,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};re.familyPrefix&&(re.cssPrefix=re.familyPrefix);const Z={...Zt,...re};Z.autoReplaceSvg||(Z.observeMutations=!1);const f={};Object.keys(Zt).forEach(e=>{Object.defineProperty(f,e,{enumerable:!0,set:function(t){Z[e]=t,ie.forEach(n=>n(f))},get:function(){return Z[e]}})});Object.defineProperty(f,"familyPrefix",{enumerable:!0,set:function(e){Z.cssPrefix=e,ie.forEach(t=>t(f))},get:function(){return Z.cssPrefix}});U.FontAwesomeConfig=f;const ie=[];function aa(e){return ie.push(e),()=>{ie.splice(ie.indexOf(e),1)}}const j=Le,L={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function ra(e){if(!e||!D)return;const t=_.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;const n=_.head.childNodes;let a=null;for(let i=n.length-1;i>-1;i--){const r=n[i],o=(r.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(a=r)}return _.head.insertBefore(t,a),e}const ia="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function se(){let e=12,t="";for(;e-- >0;)t+=ia[Math.random()*62|0];return t}function ee(e){const t=[];for(let n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function Qe(e){return e.classList?ee(e.classList):(e.getAttribute("class")||"").split(" ").filter(t=>t)}function en(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function oa(e){return Object.keys(e||{}).reduce((t,n)=>t+"".concat(n,'="').concat(en(e[n]),'" '),"").trim()}function be(e){return Object.keys(e||{}).reduce((t,n)=>t+"".concat(n,": ").concat(e[n].trim(),";"),"")}function Ze(e){return e.size!==L.size||e.x!==L.x||e.y!==L.y||e.rotate!==L.rotate||e.flipX||e.flipY}function sa(e){let{transform:t,containerWidth:n,iconWidth:a}=e;const i={transform:"translate(".concat(n/2," 256)")},r="translate(".concat(t.x*32,", ").concat(t.y*32,") "),o="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),s="rotate(".concat(t.rotate," 0 0)"),c={transform:"".concat(r," ").concat(o," ").concat(s)},l={transform:"translate(".concat(a/2*-1," -256)")};return{outer:i,inner:c,path:l}}function la(e){let{transform:t,width:n=Le,height:a=Le,startCentered:i=!1}=e,r="";return i&&Gt?r+="translate(".concat(t.x/j-n/2,"em, ").concat(t.y/j-a/2,"em) "):i?r+="translate(calc(-50% + ".concat(t.x/j,"em), calc(-50% + ").concat(t.y/j,"em)) "):r+="translate(".concat(t.x/j,"em, ").concat(t.y/j,"em) "),r+="scale(".concat(t.size/j*(t.flipX?-1:1),", ").concat(t.size/j*(t.flipY?-1:1),") "),r+="rotate(".concat(t.rotate,"deg) "),r}var ca=`:root, :host {
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
}`;function tn(){const e=Kt,t=$t,n=f.cssPrefix,a=f.replacementClass;let i=ca;if(n!==e||a!==t){const r=new RegExp("\\.".concat(e,"\\-"),"g"),o=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(t),"g");i=i.replace(r,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(s,".".concat(a))}return i}let pt=!1;function xe(){f.autoAddCss&&!pt&&(ra(tn()),pt=!0)}var ua={mixout(){return{dom:{css:tn,insertCss:xe}}},hooks(){return{beforeDOMElementCreation(){xe()},beforeI2svg(){xe()}}}};const z=U||{};z[M]||(z[M]={});z[M].styles||(z[M].styles={});z[M].hooks||(z[M].hooks={});z[M].shims||(z[M].shims=[]);var I=z[M];const nn=[],an=function(){_.removeEventListener("DOMContentLoaded",an),de=1,nn.map(e=>e())};let de=!1;D&&(de=(_.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(_.readyState),de||_.addEventListener("DOMContentLoaded",an));function fa(e){D&&(de?setTimeout(e,0):nn.push(e))}function ce(e){const{tag:t,attributes:n={},children:a=[]}=e;return typeof e=="string"?en(e):"<".concat(t," ").concat(oa(n),">").concat(a.map(ce).join(""),"</").concat(t,">")}function dt(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var Ae=function(t,n,a,i){var r=Object.keys(t),o=r.length,s=n,c,l,u;for(a===void 0?(c=1,u=t[r[0]]):(c=0,u=a);c<o;c++)l=r[c],u=s(u,t[l],l,t);return u};function pa(e){const t=[];let n=0;const a=e.length;for(;n<a;){const i=e.charCodeAt(n++);if(i>=55296&&i<=56319&&n<a){const r=e.charCodeAt(n++);(r&64512)==56320?t.push(((i&1023)<<10)+(r&1023)+65536):(t.push(i),n--)}else t.push(i)}return t}function ze(e){const t=pa(e);return t.length===1?t[0].toString(16):null}function da(e,t){const n=e.length;let a=e.charCodeAt(t),i;return a>=55296&&a<=56319&&n>t+1&&(i=e.charCodeAt(t+1),i>=56320&&i<=57343)?(a-55296)*1024+i-56320+65536:a}function mt(e){return Object.keys(e).reduce((t,n)=>{const a=e[n];return!!a.icon?t[a.iconName]=a.icon:t[n]=a,t},{})}function De(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,i=mt(t);typeof I.hooks.addPack=="function"&&!a?I.hooks.addPack(e,mt(t)):I.styles[e]={...I.styles[e]||{},...i},e==="fas"&&De("fa",t)}const{styles:H,shims:ma}=I,ha={[y]:Object.values(Y[y]),[P]:Object.values(Y[P]),[N]:Object.values(Y[N])};let et=null,rn={},on={},sn={},ln={},cn={};const ga={[y]:Object.keys(B[y]),[P]:Object.keys(B[P]),[N]:Object.keys(B[N])};function ba(e){return~ea.indexOf(e)}function _a(e,t){const n=t.split("-"),a=n[0],i=n.slice(1).join("-");return a===e&&i!==""&&!ba(i)?i:null}const un=()=>{const e=a=>Ae(H,(i,r,o)=>(i[o]=Ae(r,a,{}),i),{});rn=e((a,i,r)=>(i[3]&&(a[i[3]]=r),i[2]&&i[2].filter(s=>typeof s=="number").forEach(s=>{a[s.toString(16)]=r}),a)),on=e((a,i,r)=>(a[r]=r,i[2]&&i[2].filter(s=>typeof s=="string").forEach(s=>{a[s]=r}),a)),cn=e((a,i,r)=>{const o=i[2];return a[r]=r,o.forEach(s=>{a[s]=r}),a});const t="far"in H||f.autoFetchSvg,n=Ae(ma,(a,i)=>{const r=i[0];let o=i[1];const s=i[2];return o==="far"&&!t&&(o="fas"),typeof r=="string"&&(a.names[r]={prefix:o,iconName:s}),typeof r=="number"&&(a.unicodes[r.toString(16)]={prefix:o,iconName:s}),a},{names:{},unicodes:{}});sn=n.names,ln=n.unicodes,et=_e(f.styleDefault,{family:f.familyDefault})};aa(e=>{et=_e(e.styleDefault,{family:f.familyDefault})});un();function tt(e,t){return(rn[e]||{})[t]}function ya(e,t){return(on[e]||{})[t]}function V(e,t){return(cn[e]||{})[t]}function fn(e){return sn[e]||{prefix:null,iconName:null}}function va(e){const t=ln[e],n=tt("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function W(){return et}const nt=()=>({prefix:null,iconName:null,rest:[]});function _e(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=y}=t,a=B[n][e],i=oe[n][e]||oe[n][a],r=e in I.styles?e:null;return i||r||null}const ka={[y]:Object.keys(Y[y]),[P]:Object.keys(Y[P]),[N]:Object.keys(Y[N])};function ye(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=t,a={[y]:"".concat(f.cssPrefix,"-").concat(y),[P]:"".concat(f.cssPrefix,"-").concat(P),[N]:"".concat(f.cssPrefix,"-").concat(N)};let i=null,r=y;const o=On.filter(c=>c!==Ht);o.forEach(c=>{(e.includes(a[c])||e.some(l=>ka[c].includes(l)))&&(r=c)});const s=e.reduce((c,l)=>{const u=_a(f.cssPrefix,l);if(H[l]?(l=ha[r].includes(l)?Xn[r][l]:l,i=l,c.prefix=l):ga[r].indexOf(l)>-1?(i=l,c.prefix=_e(l,{family:r})):u?c.iconName=u:l!==f.replacementClass&&!o.some(m=>l===a[m])&&c.rest.push(l),!n&&c.prefix&&c.iconName){const m=i==="fa"?fn(c.iconName):{},p=V(c.prefix,c.iconName);m.prefix&&(i=null),c.iconName=m.iconName||p||c.iconName,c.prefix=m.prefix||c.prefix,c.prefix==="far"&&!H.far&&H.fas&&!f.autoFetchSvg&&(c.prefix="fas")}return c},nt());return(e.includes("fa-brands")||e.includes("fab"))&&(s.prefix="fab"),(e.includes("fa-duotone")||e.includes("fad"))&&(s.prefix="fad"),!s.prefix&&r===P&&(H.fass||f.autoFetchSvg)&&(s.prefix="fass",s.iconName=V(s.prefix,s.iconName)||s.iconName),!s.prefix&&r===N&&(H.fasds||f.autoFetchSvg)&&(s.prefix="fasds",s.iconName=V(s.prefix,s.iconName)||s.iconName),(s.prefix==="fa"||i==="fa")&&(s.prefix=W()||"fas"),s}class wa{constructor(){this.definitions={}}add(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];const i=n.reduce(this._pullDefinitions,{});Object.keys(i).forEach(r=>{this.definitions[r]={...this.definitions[r]||{},...i[r]},De(r,i[r]);const o=Y[y][r];o&&De(o,i[r]),un()})}reset(){this.definitions={}}_pullDefinitions(t,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(i=>{const{prefix:r,iconName:o,icon:s}=a[i],c=s[2];t[r]||(t[r]={}),c.length>0&&c.forEach(l=>{typeof l=="string"&&(t[r][l]=s)}),t[r][o]=s}),t}}let ht=[],X={};const q={},xa=Object.keys(q);function Aa(e,t){let{mixoutsTo:n}=t;return ht=e,X={},Object.keys(q).forEach(a=>{xa.indexOf(a)===-1&&delete q[a]}),ht.forEach(a=>{const i=a.mixout?a.mixout():{};if(Object.keys(i).forEach(r=>{typeof i[r]=="function"&&(n[r]=i[r]),typeof i[r]=="object"&&Object.keys(i[r]).forEach(o=>{n[r]||(n[r]={}),n[r][o]=i[r][o]})}),a.hooks){const r=a.hooks();Object.keys(r).forEach(o=>{X[o]||(X[o]=[]),X[o].push(r[o])})}a.provides&&a.provides(q)}),n}function je(e,t){for(var n=arguments.length,a=new Array(n>2?n-2:0),i=2;i<n;i++)a[i-2]=arguments[i];return(X[e]||[]).forEach(o=>{t=o.apply(null,[t,...a])}),t}function $(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];(X[e]||[]).forEach(r=>{r.apply(null,n)})}function G(){const e=arguments[0],t=Array.prototype.slice.call(arguments,1);return q[e]?q[e].apply(null,t):void 0}function Ve(e){e.prefix==="fa"&&(e.prefix="fas");let{iconName:t}=e;const n=e.prefix||W();if(t)return t=V(n,t)||t,dt(pn.definitions,n,t)||dt(I.styles,n,t)}const pn=new wa,Ca=()=>{f.autoReplaceSvg=!1,f.observeMutations=!1,$("noAuto")},Sa={i2svg:function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return D?($("beforeI2svg",e),G("pseudoElements2svg",e),G("i2svg",e)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:t}=e;f.autoReplaceSvg===!1&&(f.autoReplaceSvg=!0),f.observeMutations=!0,fa(()=>{Na({autoReplaceSvgRoot:t}),$("watch",e)})}},Pa={icon:e=>{if(e===null)return null;if(typeof e=="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:V(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){const t=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],n=_e(e[0]);return{prefix:n,iconName:V(n,t)||t}}if(typeof e=="string"&&(e.indexOf("".concat(f.cssPrefix,"-"))>-1||e.match(Jn))){const t=ye(e.split(" "),{skipLookups:!0});return{prefix:t.prefix||W(),iconName:V(t.prefix,t.iconName)||t.iconName}}if(typeof e=="string"){const t=W();return{prefix:t,iconName:V(t,e)||e}}}},O={noAuto:Ca,config:f,dom:Sa,parse:Pa,library:pn,findIconDefinition:Ve,toHtml:ce},Na=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:t=_}=e;(Object.keys(I.styles).length>0||f.autoFetchSvg)&&D&&f.autoReplaceSvg&&O.dom.i2svg({node:t})};function ve(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(n=>ce(n))}}),Object.defineProperty(e,"node",{get:function(){if(!D)return;const n=_.createElement("div");return n.innerHTML=e.html,n.children}}),e}function Oa(e){let{children:t,main:n,mask:a,attributes:i,styles:r,transform:o}=e;if(Ze(o)&&n.found&&!a.found){const{width:s,height:c}=n,l={x:s/c/2,y:.5};i.style=be({...r,"transform-origin":"".concat(l.x+o.x/16,"em ").concat(l.y+o.y/16,"em")})}return[{tag:"svg",attributes:i,children:t}]}function Ea(e){let{prefix:t,iconName:n,children:a,attributes:i,symbol:r}=e;const o=r===!0?"".concat(t,"-").concat(f.cssPrefix,"-").concat(n):r;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:{...i,id:o},children:a}]}]}function at(e){const{icons:{main:t,mask:n},prefix:a,iconName:i,transform:r,symbol:o,title:s,maskId:c,titleId:l,extra:u,watchable:m=!1}=e,{width:p,height:b}=n.found?n:t,w=a==="fak",C=[f.replacementClass,i?"".concat(f.cssPrefix,"-").concat(i):""].filter(E=>u.classes.indexOf(E)===-1).filter(E=>E!==""||!!E).concat(u.classes).join(" ");let g={children:[],attributes:{...u.attributes,"data-prefix":a,"data-icon":i,class:C,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(p," ").concat(b)}};const v=w&&!~u.classes.indexOf("fa-fw")?{width:"".concat(p/b*16*.0625,"em")}:{};m&&(g.attributes[K]=""),s&&(g.children.push({tag:"title",attributes:{id:g.attributes["aria-labelledby"]||"title-".concat(l||se())},children:[s]}),delete g.attributes.title);const k={...g,prefix:a,iconName:i,main:t,mask:n,maskId:c,transform:r,symbol:o,styles:{...v,...u.styles}},{children:A,attributes:R}=n.found&&t.found?G("generateAbstractMask",k)||{children:[],attributes:{}}:G("generateAbstractIcon",k)||{children:[],attributes:{}};return k.children=A,k.attributes=R,o?Ea(k):Oa(k)}function gt(e){const{content:t,width:n,height:a,transform:i,title:r,extra:o,watchable:s=!1}=e,c={...o.attributes,...r?{title:r}:{},class:o.classes.join(" ")};s&&(c[K]="");const l={...o.styles};Ze(i)&&(l.transform=la({transform:i,startCentered:!0,width:n,height:a}),l["-webkit-transform"]=l.transform);const u=be(l);u.length>0&&(c.style=u);const m=[];return m.push({tag:"span",attributes:c,children:[t]}),r&&m.push({tag:"span",attributes:{class:"sr-only"},children:[r]}),m}function Ta(e){const{content:t,title:n,extra:a}=e,i={...a.attributes,...n?{title:n}:{},class:a.classes.join(" ")},r=be(a.styles);r.length>0&&(i.style=r);const o=[];return o.push({tag:"span",attributes:i,children:[t]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}const{styles:Ce}=I;function Ue(e){const t=e[0],n=e[1],[a]=e.slice(4);let i=null;return Array.isArray(a)?i={tag:"g",attributes:{class:"".concat(f.cssPrefix,"-").concat(we.GROUP)},children:[{tag:"path",attributes:{class:"".concat(f.cssPrefix,"-").concat(we.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(f.cssPrefix,"-").concat(we.PRIMARY),fill:"currentColor",d:a[1]}}]}:i={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:t,height:n,icon:i}}const La={found:!1,width:512,height:512};function Ia(e,t){!Xt&&!f.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function We(e,t){let n=t;return t==="fa"&&f.styleDefault!==null&&(t=W()),new Promise((a,i)=>{if(n==="fa"){const r=fn(e)||{};e=r.iconName||e,t=r.prefix||t}if(e&&t&&Ce[t]&&Ce[t][e]){const r=Ce[t][e];return a(Ue(r))}Ia(e,t),a({...La,icon:f.showMissingIcons&&e?G("missingIconAbstract")||{}:{}})})}const bt=()=>{},Ge=f.measurePerformance&&ue&&ue.mark&&ue.measure?ue:{mark:bt,measure:bt},ae='FA "6.6.0"',Fa=e=>(Ge.mark("".concat(ae," ").concat(e," begins")),()=>dn(e)),dn=e=>{Ge.mark("".concat(ae," ").concat(e," ends")),Ge.measure("".concat(ae," ").concat(e),"".concat(ae," ").concat(e," begins"),"".concat(ae," ").concat(e," ends"))};var rt={begin:Fa,end:dn};const fe=()=>{};function _t(e){return typeof(e.getAttribute?e.getAttribute(K):null)=="string"}function Ra(e){const t=e.getAttribute?e.getAttribute(Je):null,n=e.getAttribute?e.getAttribute(qe):null;return t&&n}function Ma(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(f.replacementClass)}function za(){return f.autoReplaceSvg===!0?pe.replace:pe[f.autoReplaceSvg]||pe.replace}function Da(e){return _.createElementNS("http://www.w3.org/2000/svg",e)}function ja(e){return _.createElement(e)}function mn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=e.tag==="svg"?Da:ja}=t;if(typeof e=="string")return _.createTextNode(e);const a=n(e.tag);return Object.keys(e.attributes||[]).forEach(function(r){a.setAttribute(r,e.attributes[r])}),(e.children||[]).forEach(function(r){a.appendChild(mn(r,{ceFn:n}))}),a}function Va(e){let t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}const pe={replace:function(e){const t=e[0];if(t.parentNode)if(e[1].forEach(n=>{t.parentNode.insertBefore(mn(n),t)}),t.getAttribute(K)===null&&f.keepOriginalSource){let n=_.createComment(Va(t));t.parentNode.replaceChild(n,t)}else t.remove()},nest:function(e){const t=e[0],n=e[1];if(~Qe(t).indexOf(f.replacementClass))return pe.replace(e);const a=new RegExp("".concat(f.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const r=n[0].attributes.class.split(" ").reduce((o,s)=>(s===f.replacementClass||s.match(a)?o.toSvg.push(s):o.toNode.push(s),o),{toNode:[],toSvg:[]});n[0].attributes.class=r.toSvg.join(" "),r.toNode.length===0?t.removeAttribute("class"):t.setAttribute("class",r.toNode.join(" "))}const i=n.map(r=>ce(r)).join(`
`);t.setAttribute(K,""),t.innerHTML=i}};function yt(e){e()}function hn(e,t){const n=typeof t=="function"?t:fe;if(e.length===0)n();else{let a=yt;f.mutateApproach===Kn&&(a=U.requestAnimationFrame||yt),a(()=>{const i=za(),r=rt.begin("mutate");e.map(i),r(),n()})}}let it=!1;function gn(){it=!0}function He(){it=!1}let me=null;function vt(e){if(!lt||!f.observeMutations)return;const{treeCallback:t=fe,nodeCallback:n=fe,pseudoElementsCallback:a=fe,observeMutationsRoot:i=_}=e;me=new lt(r=>{if(it)return;const o=W();ee(r).forEach(s=>{if(s.type==="childList"&&s.addedNodes.length>0&&!_t(s.addedNodes[0])&&(f.searchPseudoElements&&a(s.target),t(s.target)),s.type==="attributes"&&s.target.parentNode&&f.searchPseudoElements&&a(s.target.parentNode),s.type==="attributes"&&_t(s.target)&&~Zn.indexOf(s.attributeName))if(s.attributeName==="class"&&Ra(s.target)){const{prefix:c,iconName:l}=ye(Qe(s.target));s.target.setAttribute(Je,c||o),l&&s.target.setAttribute(qe,l)}else Ma(s.target)&&n(s.target)})}),D&&me.observe(i,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function Ua(){me&&me.disconnect()}function Wa(e){const t=e.getAttribute("style");let n=[];return t&&(n=t.split(";").reduce((a,i)=>{const r=i.split(":"),o=r[0],s=r.slice(1);return o&&s.length>0&&(a[o]=s.join(":").trim()),a},{})),n}function Ga(e){const t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),a=e.innerText!==void 0?e.innerText.trim():"";let i=ye(Qe(e));return i.prefix||(i.prefix=W()),t&&n&&(i.prefix=t,i.iconName=n),i.iconName&&i.prefix||(i.prefix&&a.length>0&&(i.iconName=ya(i.prefix,e.innerText)||tt(i.prefix,ze(e.innerText))),!i.iconName&&f.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(i.iconName=e.firstChild.data)),i}function Ha(e){const t=ee(e.attributes).reduce((i,r)=>(i.name!=="class"&&i.name!=="style"&&(i[r.name]=r.value),i),{}),n=e.getAttribute("title"),a=e.getAttribute("data-fa-title-id");return f.autoA11y&&(n?t["aria-labelledby"]="".concat(f.replacementClass,"-title-").concat(a||se()):(t["aria-hidden"]="true",t.focusable="false")),t}function Ba(){return{iconName:null,title:null,titleId:null,prefix:null,transform:L,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function kt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:i}=Ga(e),r=Ha(e),o=je("parseNodeAttributes",{},e);let s=t.styleParser?Wa(e):[];return{iconName:n,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:a,transform:L,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:s,attributes:r},...o}}const{styles:Ya}=I;function bn(e){const t=f.autoReplaceSvg==="nest"?kt(e,{styleParser:!1}):kt(e);return~t.extra.classes.indexOf(Qt)?G("generateLayersText",e,t):G("generateSvgReplacementMutation",e,t)}let F=new Set;Jt.map(e=>{F.add("fa-".concat(e))});Object.keys(B[y]).map(F.add.bind(F));Object.keys(B[P]).map(F.add.bind(F));Object.keys(B[N]).map(F.add.bind(F));F=[...F];function wt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!D)return Promise.resolve();const n=_.documentElement.classList,a=u=>n.add("".concat(ft,"-").concat(u)),i=u=>n.remove("".concat(ft,"-").concat(u)),r=f.autoFetchSvg?F:Jt.map(u=>"fa-".concat(u)).concat(Object.keys(Ya));r.includes("fa")||r.push("fa");const o=[".".concat(Qt,":not([").concat(K,"])")].concat(r.map(u=>".".concat(u,":not([").concat(K,"])"))).join(", ");if(o.length===0)return Promise.resolve();let s=[];try{s=ee(e.querySelectorAll(o))}catch{}if(s.length>0)a("pending"),i("complete");else return Promise.resolve();const c=rt.begin("onTree"),l=s.reduce((u,m)=>{try{const p=bn(m);p&&u.push(p)}catch(p){Xt||p.name==="MissingIcon"&&console.error(p)}return u},[]);return new Promise((u,m)=>{Promise.all(l).then(p=>{hn(p,()=>{a("active"),a("complete"),i("pending"),typeof t=="function"&&t(),c(),u()})}).catch(p=>{c(),m(p)})})}function Ka(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;bn(e).then(n=>{n&&hn([n],t)})}function $a(e){return function(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(t||{}).icon?t:Ve(t||{});let{mask:i}=n;return i&&(i=(i||{}).icon?i:Ve(i||{})),e(a,{...n,mask:i})}}const Xa=function(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=L,symbol:a=!1,mask:i=null,maskId:r=null,title:o=null,titleId:s=null,classes:c=[],attributes:l={},styles:u={}}=t;if(!e)return;const{prefix:m,iconName:p,icon:b}=e;return ve({type:"icon",...e},()=>($("beforeDOMElementCreation",{iconDefinition:e,params:t}),f.autoA11y&&(o?l["aria-labelledby"]="".concat(f.replacementClass,"-title-").concat(s||se()):(l["aria-hidden"]="true",l.focusable="false")),at({icons:{main:Ue(b),mask:i?Ue(i.icon):{found:!1,width:null,height:null,icon:{}}},prefix:m,iconName:p,transform:{...L,...n},symbol:a,title:o,maskId:r,titleId:s,extra:{attributes:l,styles:u,classes:c}})))};var Ja={mixout(){return{icon:$a(Xa)}},hooks(){return{mutationObserverCallbacks(e){return e.treeCallback=wt,e.nodeCallback=Ka,e}}},provides(e){e.i2svg=function(t){const{node:n=_,callback:a=()=>{}}=t;return wt(n,a)},e.generateSvgReplacementMutation=function(t,n){const{iconName:a,title:i,titleId:r,prefix:o,transform:s,symbol:c,mask:l,maskId:u,extra:m}=n;return new Promise((p,b)=>{Promise.all([We(a,o),l.iconName?We(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(w=>{let[C,g]=w;p([t,at({icons:{main:C,mask:g},prefix:o,iconName:a,transform:s,symbol:c,maskId:u,title:i,titleId:r,extra:m,watchable:!0})])}).catch(b)})},e.generateAbstractIcon=function(t){let{children:n,attributes:a,main:i,transform:r,styles:o}=t;const s=be(o);s.length>0&&(a.style=s);let c;return Ze(r)&&(c=G("generateAbstractTransformGrouping",{main:i,transform:r,containerWidth:i.width,iconWidth:i.width})),n.push(c||i.icon),{children:n,attributes:a}}}},qa={mixout(){return{layer(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=t;return ve({type:"layer"},()=>{$("beforeDOMElementCreation",{assembler:e,params:t});let a=[];return e(i=>{Array.isArray(i)?i.map(r=>{a=a.concat(r.abstract)}):a=a.concat(i.abstract)}),[{tag:"span",attributes:{class:["".concat(f.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},Qa={mixout(){return{counter(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:i={},styles:r={}}=t;return ve({type:"counter",content:e},()=>($("beforeDOMElementCreation",{content:e,params:t}),Ta({content:e.toString(),title:n,extra:{attributes:i,styles:r,classes:["".concat(f.cssPrefix,"-layers-counter"),...a]}})))}}}},Za={mixout(){return{text(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=L,title:a=null,classes:i=[],attributes:r={},styles:o={}}=t;return ve({type:"text",content:e},()=>($("beforeDOMElementCreation",{content:e,params:t}),gt({content:e,transform:{...L,...n},title:a,extra:{attributes:r,styles:o,classes:["".concat(f.cssPrefix,"-layers-text"),...i]}})))}}},provides(e){e.generateLayersText=function(t,n){const{title:a,transform:i,extra:r}=n;let o=null,s=null;if(Gt){const c=parseInt(getComputedStyle(t).fontSize,10),l=t.getBoundingClientRect();o=l.width/c,s=l.height/c}return f.autoA11y&&!a&&(r.attributes["aria-hidden"]="true"),Promise.resolve([t,gt({content:t.innerHTML,width:o,height:s,transform:i,title:a,extra:r,watchable:!0})])}}};const er=new RegExp('"',"ug"),xt=[1105920,1112319],At={FontAwesome:{normal:"fas",400:"fas"},...Rn,...Fn,...Gn},Be=Object.keys(At).reduce((e,t)=>(e[t.toLowerCase()]=At[t],e),{}),tr=Object.keys(Be).reduce((e,t)=>{const n=Be[t];return e[t]=n[900]||[...Object.entries(n)][0][1],e},{});function nr(e){const t=e.replace(er,""),n=da(t,0),a=n>=xt[0]&&n<=xt[1],i=t.length===2?t[0]===t[1]:!1;return{value:ze(i?t[0]:t),isSecondary:a||i}}function ar(e,t){const n=e.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(t),i=isNaN(a)?"normal":a;return(Be[n]||{})[i]||tr[n]}function Ct(e,t){const n="".concat(Yn).concat(t.replace(":","-"));return new Promise((a,i)=>{if(e.getAttribute(n)!==null)return a();const o=ee(e.children).filter(p=>p.getAttribute(Ie)===t)[0],s=U.getComputedStyle(e,t),c=s.getPropertyValue("font-family"),l=c.match(qn),u=s.getPropertyValue("font-weight"),m=s.getPropertyValue("content");if(o&&!l)return e.removeChild(o),a();if(l&&m!=="none"&&m!==""){const p=s.getPropertyValue("content");let b=ar(c,u);const{value:w,isSecondary:C}=nr(p),g=l[0].startsWith("FontAwesome");let v=tt(b,w),k=v;if(g){const A=va(w);A.iconName&&A.prefix&&(v=A.iconName,b=A.prefix)}if(v&&!C&&(!o||o.getAttribute(Je)!==b||o.getAttribute(qe)!==k)){e.setAttribute(n,k),o&&e.removeChild(o);const A=Ba(),{extra:R}=A;R.attributes[Ie]=t,We(v,b).then(E=>{const An=at({...A,icons:{main:E,mask:nt()},prefix:b,iconName:k,extra:R,watchable:!0}),ke=_.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(ke,e.firstChild):e.appendChild(ke),ke.outerHTML=An.map(Cn=>ce(Cn)).join(`
`),e.removeAttribute(n),a()}).catch(i)}else a()}else a()})}function rr(e){return Promise.all([Ct(e,"::before"),Ct(e,"::after")])}function ir(e){return e.parentNode!==document.head&&!~$n.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Ie)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function St(e){if(D)return new Promise((t,n)=>{const a=ee(e.querySelectorAll("*")).filter(ir).map(rr),i=rt.begin("searchPseudoElements");gn(),Promise.all(a).then(()=>{i(),He(),t()}).catch(()=>{i(),He(),n()})})}var or={hooks(){return{mutationObserverCallbacks(e){return e.pseudoElementsCallback=St,e}}},provides(e){e.pseudoElements2svg=function(t){const{node:n=_}=t;f.searchPseudoElements&&St(n)}}};let Pt=!1;var sr={mixout(){return{dom:{unwatch(){gn(),Pt=!0}}}},hooks(){return{bootstrap(){vt(je("mutationObserverCallbacks",{}))},noAuto(){Ua()},watch(e){const{observeMutationsRoot:t}=e;Pt?He():vt(je("mutationObserverCallbacks",{observeMutationsRoot:t}))}}}};const Nt=e=>{let t={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce((n,a)=>{const i=a.toLowerCase().split("-"),r=i[0];let o=i.slice(1).join("-");if(r&&o==="h")return n.flipX=!0,n;if(r&&o==="v")return n.flipY=!0,n;if(o=parseFloat(o),isNaN(o))return n;switch(r){case"grow":n.size=n.size+o;break;case"shrink":n.size=n.size-o;break;case"left":n.x=n.x-o;break;case"right":n.x=n.x+o;break;case"up":n.y=n.y-o;break;case"down":n.y=n.y+o;break;case"rotate":n.rotate=n.rotate+o;break}return n},t)};var lr={mixout(){return{parse:{transform:e=>Nt(e)}}},hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-transform");return n&&(e.transform=Nt(n)),e}}},provides(e){e.generateAbstractTransformGrouping=function(t){let{main:n,transform:a,containerWidth:i,iconWidth:r}=t;const o={transform:"translate(".concat(i/2," 256)")},s="translate(".concat(a.x*32,", ").concat(a.y*32,") "),c="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),l="rotate(".concat(a.rotate," 0 0)"),u={transform:"".concat(s," ").concat(c," ").concat(l)},m={transform:"translate(".concat(r/2*-1," -256)")},p={outer:o,inner:u,path:m};return{tag:"g",attributes:{...p.outer},children:[{tag:"g",attributes:{...p.inner},children:[{tag:n.icon.tag,children:n.icon.children,attributes:{...n.icon.attributes,...p.path}}]}]}}}};const Se={x:0,y:0,width:"100%",height:"100%"};function Ot(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function cr(e){return e.tag==="g"?e.children:[e]}var ur={hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-mask"),a=n?ye(n.split(" ").map(i=>i.trim())):nt();return a.prefix||(a.prefix=W()),e.mask=a,e.maskId=t.getAttribute("data-fa-mask-id"),e}}},provides(e){e.generateAbstractMask=function(t){let{children:n,attributes:a,main:i,mask:r,maskId:o,transform:s}=t;const{width:c,icon:l}=i,{width:u,icon:m}=r,p=sa({transform:s,containerWidth:u,iconWidth:c}),b={tag:"rect",attributes:{...Se,fill:"white"}},w=l.children?{children:l.children.map(Ot)}:{},C={tag:"g",attributes:{...p.inner},children:[Ot({tag:l.tag,attributes:{...l.attributes,...p.path},...w})]},g={tag:"g",attributes:{...p.outer},children:[C]},v="mask-".concat(o||se()),k="clip-".concat(o||se()),A={tag:"mask",attributes:{...Se,id:v,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"},children:[b,g]},R={tag:"defs",children:[{tag:"clipPath",attributes:{id:k},children:cr(m)},A]};return n.push(R,{tag:"rect",attributes:{fill:"currentColor","clip-path":"url(#".concat(k,")"),mask:"url(#".concat(v,")"),...Se}}),{children:n,attributes:a}}}},fr={provides(e){let t=!1;U.matchMedia&&(t=U.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:{...a,d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"}});const r={...i,attributeName:"opacity"},o={tag:"circle",attributes:{...a,cx:"256",cy:"364",r:"28"},children:[]};return t||o.children.push({tag:"animate",attributes:{...i,attributeName:"r",values:"28;14;28;28;14;28;"}},{tag:"animate",attributes:{...r,values:"1;0;1;1;0;1;"}}),n.push(o),n.push({tag:"path",attributes:{...a,opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"},children:t?[]:[{tag:"animate",attributes:{...r,values:"1;0;0;0;0;1;"}}]}),t||n.push({tag:"path",attributes:{...a,opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"},children:[{tag:"animate",attributes:{...r,values:"0;0;1;1;0;0;"}}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},pr={hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return e.symbol=a,e}}}},dr=[ua,Ja,qa,Qa,Za,or,sr,lr,ur,fr,pr];Aa(dr,{mixoutsTo:O});O.noAuto;O.config;O.library;O.dom;const Ye=O.parse;O.findIconDefinition;O.toHtml;const mr=O.icon;O.layer;O.text;O.counter;var Pe={exports:{}},Ne,Et;function hr(){if(Et)return Ne;Et=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Ne=e,Ne}var Oe,Tt;function gr(){if(Tt)return Oe;Tt=1;var e=hr();function t(){}function n(){}return n.resetWarningCache=t,Oe=function(){function a(o,s,c,l,u,m){if(m!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}a.isRequired=a;function i(){return a}var r={array:a,bigint:a,bool:a,func:a,number:a,object:a,string:a,symbol:a,any:a,arrayOf:i,element:a,elementType:a,instanceOf:i,node:a,objectOf:i,oneOf:i,oneOfType:i,shape:i,exact:i,checkPropTypes:n,resetWarningCache:t};return r.PropTypes=r,r},Oe}var Lt;function br(){return Lt||(Lt=1,Pe.exports=gr()()),Pe.exports}var _r=br();const h=Sn(_r);function It(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,a)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?It(Object(n),!0).forEach(function(a){J(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):It(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function he(e){"@babel/helpers - typeof";return he=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},he(e)}function J(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function yr(e,t){if(e==null)return{};var n={},a=Object.keys(e),i,r;for(r=0;r<a.length;r++)i=a[r],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}function vr(e,t){if(e==null)return{};var n=yr(e,t),a,i;if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)a=r[i],!(t.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function Ke(e){return kr(e)||wr(e)||xr(e)||Ar()}function kr(e){if(Array.isArray(e))return $e(e)}function wr(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function xr(e,t){if(e){if(typeof e=="string")return $e(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return $e(e,t)}}function $e(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function Ar(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Cr(e){var t,n=e.beat,a=e.fade,i=e.beatFade,r=e.bounce,o=e.shake,s=e.flash,c=e.spin,l=e.spinPulse,u=e.spinReverse,m=e.pulse,p=e.fixedWidth,b=e.inverse,w=e.border,C=e.listItem,g=e.flip,v=e.size,k=e.rotation,A=e.pull,R=(t={"fa-beat":n,"fa-fade":a,"fa-beat-fade":i,"fa-bounce":r,"fa-shake":o,"fa-flash":s,"fa-spin":c,"fa-spin-reverse":u,"fa-spin-pulse":l,"fa-pulse":m,"fa-fw":p,"fa-inverse":b,"fa-border":w,"fa-li":C,"fa-flip":g===!0,"fa-flip-horizontal":g==="horizontal"||g==="both","fa-flip-vertical":g==="vertical"||g==="both"},J(t,"fa-".concat(v),typeof v<"u"&&v!==null),J(t,"fa-rotate-".concat(k),typeof k<"u"&&k!==null&&k!==0),J(t,"fa-pull-".concat(A),typeof A<"u"&&A!==null),J(t,"fa-swap-opacity",e.swapOpacity),t);return Object.keys(R).map(function(E){return R[E]?E:null}).filter(function(E){return E})}function Sr(e){return e=e-0,e===e}function _n(e){return Sr(e)?e:(e=e.replace(/[\-_\s]+(.)?/g,function(t,n){return n?n.toUpperCase():""}),e.substr(0,1).toLowerCase()+e.substr(1))}var Pr=["style"];function Nr(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Or(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var a=n.indexOf(":"),i=_n(n.slice(0,a)),r=n.slice(a+1).trim();return i.startsWith("webkit")?t[Nr(i)]=r:t[i]=r,t},{})}function yn(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="string")return t;var a=(t.children||[]).map(function(c){return yn(e,c)}),i=Object.keys(t.attributes||{}).reduce(function(c,l){var u=t.attributes[l];switch(l){case"class":c.attrs.className=u,delete t.attributes.class;break;case"style":c.attrs.style=Or(u);break;default:l.indexOf("aria-")===0||l.indexOf("data-")===0?c.attrs[l.toLowerCase()]=u:c.attrs[_n(l)]=u}return c},{attrs:{}}),r=n.style,o=r===void 0?{}:r,s=vr(n,Pr);return i.attrs.style=T(T({},i.attrs.style),o),e.apply(void 0,[t.tag,T(T({},i.attrs),s)].concat(Ke(a)))}var vn=!1;try{vn=!0}catch{}function Er(){if(!vn&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function Ft(e){if(e&&he(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(Ye.icon)return Ye.icon(e);if(e===null)return null;if(e&&he(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}function Ee(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?J({},e,t):{}}var Rt={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},ge=Dt.forwardRef(function(e,t){var n=T(T({},Rt),e),a=n.icon,i=n.mask,r=n.symbol,o=n.className,s=n.title,c=n.titleId,l=n.maskId,u=Ft(a),m=Ee("classes",[].concat(Ke(Cr(n)),Ke((o||"").split(" ")))),p=Ee("transform",typeof n.transform=="string"?Ye.transform(n.transform):n.transform),b=Ee("mask",Ft(i)),w=mr(u,T(T(T(T({},m),p),b),{},{symbol:r,title:s,titleId:c,maskId:l}));if(!w)return Er("Could not find icon",u),null;var C=w.abstract,g={ref:t};return Object.keys(n).forEach(function(v){Rt.hasOwnProperty(v)||(g[v]=n[v])}),Tr(C[0],g)});ge.displayName="FontAwesomeIcon";ge.propTypes={beat:h.bool,border:h.bool,beatFade:h.bool,bounce:h.bool,className:h.string,fade:h.bool,flash:h.bool,mask:h.oneOfType([h.object,h.array,h.string]),maskId:h.string,fixedWidth:h.bool,inverse:h.bool,flip:h.oneOf([!0,!1,"horizontal","vertical","both"]),icon:h.oneOfType([h.object,h.array,h.string]),listItem:h.bool,pull:h.oneOf(["right","left"]),pulse:h.bool,rotation:h.oneOf([0,90,180,270]),shake:h.bool,size:h.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:h.bool,spinPulse:h.bool,spinReverse:h.bool,symbol:h.oneOfType([h.bool,h.string]),title:h.string,titleId:h.string,transform:h.oneOfType([h.string,h.object]),swapOpacity:h.bool};var Tr=yn.bind(null,Dt.createElement);const Lr={prefix:"fas",iconName:"atom",icon:[512,512,[9883],"f5d2","M256 398.8c-11.8 5.1-23.4 9.7-34.9 13.5c16.7 33.8 31 35.7 34.9 35.7s18.1-1.9 34.9-35.7c-11.4-3.9-23.1-8.4-34.9-13.5zM446 256c33 45.2 44.3 90.9 23.6 128c-20.2 36.3-62.5 49.3-115.2 43.2c-22 52.1-55.6 84.8-98.4 84.8s-76.4-32.7-98.4-84.8c-52.7 6.1-95-6.8-115.2-43.2C21.7 346.9 33 301.2 66 256c-33-45.2-44.3-90.9-23.6-128c20.2-36.3 62.5-49.3 115.2-43.2C179.6 32.7 213.2 0 256 0s76.4 32.7 98.4 84.8c52.7-6.1 95 6.8 115.2 43.2c20.7 37.1 9.4 82.8-23.6 128zm-65.8 67.4c-1.7 14.2-3.9 28-6.7 41.2c31.8 1.4 38.6-8.7 40.2-11.7c2.3-4.2 7-17.9-11.9-48.1c-6.8 6.3-14 12.5-21.6 18.6zm-6.7-175.9c2.8 13.1 5 26.9 6.7 41.2c7.6 6.1 14.8 12.3 21.6 18.6c18.9-30.2 14.2-44 11.9-48.1c-1.6-2.9-8.4-13-40.2-11.7zM290.9 99.7C274.1 65.9 259.9 64 256 64s-18.1 1.9-34.9 35.7c11.4 3.9 23.1 8.4 34.9 13.5c11.8-5.1 23.4-9.7 34.9-13.5zm-159 88.9c1.7-14.3 3.9-28 6.7-41.2c-31.8-1.4-38.6 8.7-40.2 11.7c-2.3 4.2-7 17.9 11.9 48.1c6.8-6.3 14-12.5 21.6-18.6zM110.2 304.8C91.4 335 96 348.7 98.3 352.9c1.6 2.9 8.4 13 40.2 11.7c-2.8-13.1-5-26.9-6.7-41.2c-7.6-6.1-14.8-12.3-21.6-18.6zM336 256a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zm-80-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]},Ir={prefix:"fas",iconName:"file-pdf",icon:[512,512,[],"f1c1","M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"]},Fr={prefix:"fas",iconName:"diagram-project",icon:[576,512,["project-diagram"],"f542","M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 16 192 0 0-16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-16-192 0 0 16c0 1.7-.1 3.4-.3 5L272 288l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-1.7 .1-3.4 .3-5L144 224l-96 0c-26.5 0-48-21.5-48-48L0 80z"]},Rr={prefix:"fab",iconName:"github",icon:[496,512,[],"f09b","M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"]},Mr=[{key:"pdf",label:"PDF",icon:Ir,metaKey:"pdf_link"},{key:"arxiv",label:"arXiv",icon:Lr,metaKey:"arxiv_link"},{key:"github",label:"GitHub",icon:Rr,metaKey:"github_link"},{key:"project",label:"Project Page",icon:Fr,metaKey:"project_link"}],kn=e=>typeof e=="string"?e.trim():"",wn=e=>{if(!e)return!1;try{const t=new URL(e);return t.protocol==="https:"||t.protocol==="http:"}catch{return!1}},zr=(e={})=>{const t=["pdf_link","arxiv_link","project_link","github_link","paper_link","source_code_link"];for(const n of t){const a=kn(e==null?void 0:e[n]);if(wn(a))return a}return""};function Dr({meta:e={},className:t=""}){const n=`publication-link-icons ${t}`.trim();return d("div",{className:n,"aria-label":"Publication links",children:Mr.map(a=>{const i=kn(e==null?void 0:e[a.metaKey]);return wn(i)?d("a",{href:i,target:"_blank",rel:"noreferrer",className:"publication-link-icons__item is-active",title:a.label,"aria-label":`Open ${a.label}`,children:d(ge,{icon:a.icon,"aria-hidden":"true"})},a.key):d("span",{className:"publication-link-icons__item is-disabled",title:`${a.label} unavailable`,"aria-label":`${a.label} unavailable`,children:d(ge,{icon:a.icon,"aria-hidden":"true"})},a.key)})})}const jr="/assets/style-kd-figure-1-nTmFz4AD.webp",Vr="/assets/spatial-bias-figure-1-DF8ymzzx.webp",Ur="/assets/adnet-figure-2-COsPK7U4.webp",Wr="/assets/cnn-vit-medical-figure-1-Dv2SxvlV.webp",Gr="/assets/ct-asbo-figure-2-IYvg943P.webp",Hr="/assets/ral-figure-2-COxR_DKE.webp",Br="/assets/do-your-best-figure-1-CB7LJkfz.webp",Yr="/assets/channel-propagation-figure-1-BJ3K6t6g.webp",Kr="/assets/map-figure-1-DGTaOsN4.webp",$r="/assets/neural-substitution-figure-1-f3HktlIs.webp",Xr="/assets/hqt-figure-1-CrDsPoTD.webp",Jr="/assets/gen-ssl-figure-2-CZgxUOzm.webp",qr="/assets/cxr-lt-figure-1-DrXN0L2a.webp",Qr="/assets/fg-ssl-figure-1-B54f3kBF.webp",Zr={"biomedical-bapub4-style-kd-class-imbalanced-medical-image":{image:jr,figureLabel:"Figure 1",alt:"Figure 1 from Style-KD showing source and reference retinal images used to balance the APTOS2019 training set.",sourceUrl:"https://ars.els-cdn.com/content/image/1-s2.0-S1746809423013617-gr1_lrg.jpg"},"core-capub0-spatial-bias-for-attention-free-non-local":{image:Vr,figureLabel:"Figure 1",alt:"Figure 1 from Spatial Bias comparing inference time and top-1 accuracy across non-local network variants.",sourceUrl:"https://ars.els-cdn.com/content/image/1-s2.0-S0957417423025551-gr1_lrg.jpg"},"biomedical-bapub2-attentional-decoder-networks-for-chest-x-r":{image:Ur,figureLabel:"Figure 2",alt:"Figure 2 from ADNet comparing a conventional U-Net decoder with the proposed attentional decoder and harmonic magnitude transform.",sourceUrl:"https://ars.els-cdn.com/content/image/1-s2.0-S0169260724001949-gr2_lrg.jpg"},"biomedical-bapub3-analyzing-to-discover-origins-of-cnns-and":{image:Wr,figureLabel:"Figure 1",alt:"Figure 1 from the CNN and ViT analysis paper showing robustness results and corrupted medical image examples.",sourceUrl:"https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41598-024-58382-3/MediaObjects/41598_2024_58382_Fig1_HTML.png"},"biomedical-bapub0-deep-learning-using-computed-tomography-to":{image:Gr,figureLabel:"Figure 2",alt:"Figure 2 from the acute small bowel obstruction study showing the proposed CT diagnosis network workflow.",sourceUrl:"https://cdn.ncbi.nlm.nih.gov/pmc/blobs/72af/10720875/e4ac39b2182c/js9-109-4091-g002.jpg"},"biomedical-bapub1-robust-asymmetric-loss-for-multi-label-lon":{image:Hr,figureLabel:"Figure 2",alt:"Figure 2 from the RAL paper comparing BCE, ASL, and robust asymmetric loss probabilities on multi-label and single-label medical images.",sourceUrl:"https://openaccess.thecvf.com/content/ICCV2023W/CVAMD/papers/Park_Robust_Asymmetric_Loss_for_Multi-Label_Long-Tailed_Learning_ICCVW_2023_paper.pdf"},"core-capub1-do-your-best-and-get-enough-rest-for-continual":{image:Br,figureLabel:"Figure 1",alt:"Figure 1 from the Respacing paper illustrating the forgetting curve and how recall interval affects memory retention decay.",sourceUrl:"https://arxiv.org/abs/2503.18371"},"core-capub2-channel-propagation-networks-for-refreshable":{image:Yr,figureLabel:"Figure 1",alt:"Figure 1 comparing Channel Propagation networks (CP-Swin, CP-PiT) with baseline Swin and PiT across parameter count and top-1 accuracy.",sourceUrl:"https://openaccess.thecvf.com/content/WACV2025/papers/Go_Channel_Propagation_Networks_for_Refreshable_Vision_Transformer_WACV_2025_paper.pdf"},"core-capub3-enriching-local-patterns-with-multi-token":{image:Kr,figureLabel:"Figure 1",alt:"Figure 1 comparing MAP-ConvNeXt and MAP-MaxViT against SOTA networks on throughput versus top-1 accuracy for small and large models.",sourceUrl:"https://openaccess.thecvf.com/content/WACV2025/papers/Kang_Enriching_Local_Patterns_with_Multi-Token_Attention_for_Broad-Sight_Neural_Networks_WACV_2025_paper.pdf"},"core-capub4-neural-substitution-for-branch-level-network":{image:$r,figureLabel:"Figure 1",alt:"Figure 1 illustrating the progression from block-level to branch-level connectivity in the re-parameterization network.",sourceUrl:"https://openaccess.thecvf.com/content/ACCV2024/papers/Oh_Neural_Substitution_for_Branch-level_Network_Re-parameterization_ACCV_2024_paper.pdf"},"core-capub5-unsupervised-hashing-network-with-hyper":{image:Xr,figureLabel:"Figure 1",alt:"Figure 1 comparing clustering results of a traditional hashing algorithm with the proposed Hyper Quantization Tree, plus the HQT training pipeline.",sourceUrl:"https://bmva-archive.org.uk/bmvc/2024/papers/Paper_482/paper.pdf"},"biomedical-bapub5-generative-self-supervised-learning-for":{image:Jr,figureLabel:"Figure 2",alt:"Figure 2 showing the generative self-supervised learning pipeline: LLM-elaborated prompts, diffusion-based image generation, and AdaIN-based reconstruction.",sourceUrl:"https://openaccess.thecvf.com/content/ACCV2024/html/Park_Generative_Self-Supervised_Learning_for_Medical_Image_Classification_ACCV_2024_paper.html"},"biomedical-bapub6-towards-long-tailed-multi-label-disease":{image:qr,figureLabel:"Figure 1",alt:"Figure 1 showing the long-tailed distribution of clinical findings in the CXR-LT 2023 challenge dataset, highlighting newly added versus original labels.",sourceUrl:"https://arxiv.org/abs/2310.16112"},"biomedical-bapub7-fine-grained-self-supervised-learning-with":{image:Qr,figureLabel:"Figure 1",alt:"Figure 1 showing the FG-SSL architecture with shuffled and distorted image branches feeding a shared hierarchical block toward a Barlow Twins style cross-correlation loss.",sourceUrl:"https://www.sciencedirect.com/science/article/abs/pii/S0010482524005444"}},ei=(e="")=>Zr[e]??null;function ti({publicationId:e,className:t,sizes:n}){const a=ei(e);return d("figure",{className:`${t} publication-figure`,"data-publication-figure":(a==null?void 0:a.figureLabel)??void 0,children:a?d("img",{src:a.image,alt:a.alt,loading:"lazy",decoding:"async",sizes:n}):d("div",{className:"publication-figure__placeholder",children:"Figure unavailable"})})}const ni=e=>{if(!e)return!1;try{const t=new URL(e);return t.protocol==="https:"||t.protocol==="http:"}catch{return!1}};function ai({publicationId:e,category:t,meta:n,title:a,revealDelay:i="0ms",revealLoadDelay:r="80"}){var b,w,C;const o=zr(n),s=ni(o),c=jt[t]??t,l=((b=n.author)==null?void 0:b.trim())??"",u=((w=n.published_place)==null?void 0:w.trim())??"",m=((C=n.published_date)==null?void 0:C.trim())??"",p=Array.isArray(n.keywords)?n.keywords:[];return x("article",{"data-reveal":!0,"data-reveal-load-delay":r,style:{"--reveal-delay":i},className:"publication__card",children:[d(ti,{publicationId:e,className:"publication__card-media",sizes:"(max-width: 768px) 13rem, 11.2rem"}),x("div",{className:"publication__card-main",children:[d("div",{className:"publication__card-badges",children:d("p",{className:`publication__card-badge publication__card-badge--${t}`,children:c})}),p.length?d("div",{className:"publication__card-keywords","aria-label":`${a} keywords`,children:p.map((g,v)=>d("span",{className:"publication__card-keyword-chip",children:g},`${a}-${g}-${v}`))}):null,d("h3",{className:"publication__card-title",children:s?d("a",{href:o,target:"_blank",rel:"noreferrer",className:"publication__card-title-link animated-underline",children:a}):d("span",{className:"publication__card-title-link publication__card-title-link--muted",children:a})}),l?d("p",{className:"publication__card-author",children:l}):null,(u||m)&&x("p",{className:"publication__card-meta-line",children:[u?d("span",{className:"publication__card-venue",children:u}):null,m?d("span",{className:"publication__card-date",children:m}):null]})]}),d("div",{className:"publication__card-links",children:d(Dr,{meta:n})})]})}function ri({children:e,areaKey:t="",isSelected:n,onSelect:a}){const i=(t||String(e)).toLowerCase();return d("button",{type:"button",className:`publication__button publication__button--${i} btn btn--secondary btn--sm interactive-button ${n?"is-active":"is-inactive"}`,onClick:a,"aria-pressed":n,children:e})}const ii=JSON.parse('[{"id":"core-capub1-do-your-best-and-get-enough-rest-for-continual","key":"core-capub1-do-your-best-and-get-enough-rest-for-continual","category":"computer_vision_and_learning_algorithms","status":"published","title":"Do Your Best and Get Enough Rest for Continual Learning","summary":"","featured":false,"research_meta":{"author":"Hankyul Kang, Gregor Seifer, Donghyun Lee, Jongbin Ryu","published_place":"Computer Vision and Pattern Recognition (CVPR)","published_date":"2025-06-01","keywords":["Continual Learning","Self-Supervised Learning","Replay Methods"],"pdf_link":"","arxiv_link":"","github_link":"https://github.com/hankyul2/ViewBatchModel","project_link":"https://openaccess.thecvf.com/content/CVPR2025/html/Kang_Do_Your_Best_and_Get_Enough_Rest_for_Continual_Learning_CVPR_2025_paper.html","source_code_link":"https://github.com/hankyul2/ViewBatchModel","paper_link":"https://openaccess.thecvf.com/content/CVPR2025/html/Kang_Do_Your_Best_and_Get_Enough_Rest_for_Continual_Learning_CVPR_2025_paper.html"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"core-capub2-channel-propagation-networks-for-refreshable","key":"core-capub2-channel-propagation-networks-for-refreshable","category":"computer_vision_and_learning_algorithms","status":"published","title":"Channel Propagation Networks for Refreshable Vision Transformer","summary":"","featured":false,"research_meta":{"author":"Junhyung Ko, Jongbin Ryu","published_place":"Winter Conference on Applications of Computer Vision (WACV)","published_date":"2025-01-01","keywords":["Vision Transformer","Channel Propagation","Over-smoothing"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://openaccess.thecvf.com/content/WACV2025/papers/Go_Channel_Propagation_Networks_for_Refreshable_Vision_Transformer_WACV_2025_paper.pdf","source_code_link":"","paper_link":"https://openaccess.thecvf.com/content/WACV2025/papers/Go_Channel_Propagation_Networks_for_Refreshable_Vision_Transformer_WACV_2025_paper.pdf"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"core-capub3-enriching-local-patterns-with-multi-token","key":"core-capub3-enriching-local-patterns-with-multi-token","category":"computer_vision_and_learning_algorithms","status":"published","title":"Enriching Local Patterns with Multi-Token Attention for Broad-Sight Neural Networks","summary":"","featured":false,"research_meta":{"author":"Hankyul Kang, Jongbin Ryu","published_place":"Winter Conference on Applications of Computer Vision (WACV)","published_date":"2025-01-01","keywords":["Attention Pooling","Local Patterns","Feature Representation"],"pdf_link":"","arxiv_link":"","github_link":"https://github.com/hankyul2/MAP","project_link":"https://openaccess.thecvf.com/content/WACV2025/papers/Kang_Enriching_Local_Patterns_with_Multi-Token_Attention_for_Broad-Sight_Neural_Networks_WACV_2025_paper.pdf","source_code_link":"https://github.com/hankyul2/MAP","paper_link":"https://openaccess.thecvf.com/content/WACV2025/papers/Kang_Enriching_Local_Patterns_with_Multi-Token_Attention_for_Broad-Sight_Neural_Networks_WACV_2025_paper.pdf"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub4-style-kd-class-imbalanced-medical-image","key":"biomedical-bapub4-style-kd-class-imbalanced-medical-image","category":"industrial_and_medical_ai","status":"published","title":"Style-KD : Class-Imbalanced Medical Image Classification via Style Knowledge Distillation","summary":"","featured":false,"research_meta":{"author":"Inhyuk Park, Won Hwa Kim, Jongbin Ryu","published_place":"Biomedical Signall Processing and Control","published_date":"2024-12-29","keywords":["Class Imbalance","Knowledge Distillation","Medical Image Classification"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://www.sciencedirect.com/science/article/pii/S1746809423013617","source_code_link":"","paper_link":"https://www.sciencedirect.com/science/article/pii/S1746809423013617"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub5-generative-self-supervised-learning-for","key":"biomedical-bapub5-generative-self-supervised-learning-for","category":"industrial_and_medical_ai","status":"published","title":"Generative Self-Supervised Learning for Medical Image Classification","summary":"","featured":false,"research_meta":{"author":"Inhyuk Park, Sungeun Kim, Jongbin Ryu","published_place":"Asian Conference on Computer Vision (ACCV)","published_date":"2024-12-01","keywords":["Generative Self-Supervised Learning","Medical Image Classification","Diffusion Model"],"pdf_link":"","arxiv_link":"","github_link":"https://github.com/inhyukpark2/gen-ssl","project_link":"https://openaccess.thecvf.com/content/ACCV2024/html/Park_Generative_Self-Supervised_Learning_for_Medical_Image_Classification_ACCV_2024_paper.html","source_code_link":"https://github.com/inhyukpark2/gen-ssl","paper_link":"https://openaccess.thecvf.com/content/ACCV2024/html/Park_Generative_Self-Supervised_Learning_for_Medical_Image_Classification_ACCV_2024_paper.html"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"core-capub4-neural-substitution-for-branch-level-network","key":"core-capub4-neural-substitution-for-branch-level-network","category":"computer_vision_and_learning_algorithms","status":"published","title":"Neural Substitution for Branch-level Network Re-parameterization","summary":"","featured":false,"research_meta":{"author":"Seungmin Oh, Jongbin Ryu","published_place":"Asian Conference on Computer Vision (ACCV)","published_date":"2024-12-01","keywords":["Network Re-parameterization","Branch-level Connectivity","Model Efficiency"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://openaccess.thecvf.com/content/ACCV2024/papers/Oh_Neural_Substitution_for_Branch-level_Network_Re-parameterization_ACCV_2024_paper.pdf","source_code_link":"","paper_link":"https://openaccess.thecvf.com/content/ACCV2024/papers/Oh_Neural_Substitution_for_Branch-level_Network_Re-parameterization_ACCV_2024_paper.pdf"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"core-capub5-unsupervised-hashing-network-with-hyper","key":"core-capub5-unsupervised-hashing-network-with-hyper","category":"computer_vision_and_learning_algorithms","status":"published","title":"Unsupervised Hashing Network with Hyper Quantization Tree","summary":"","featured":false,"research_meta":{"author":"Sungeun Kim, Jongbin Ryu","published_place":"British Machine Vision Conference (BMVC)","published_date":"2024-11-25","keywords":["Unsupervised Hashing","Image Retrieval","Quantization"],"pdf_link":"","arxiv_link":"","github_link":"https://github.com/Lab-LVM/HQT","project_link":"https://bmva-archive.org.uk/bmvc/2024/papers/Paper_482/paper.pdf","source_code_link":"https://github.com/Lab-LVM/HQT","paper_link":"https://bmva-archive.org.uk/bmvc/2024/papers/Paper_482/paper.pdf"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"core-capub0-spatial-bias-for-attention-free-non-local","key":"core-capub0-spatial-bias-for-attention-free-non-local","category":"computer_vision_and_learning_algorithms","status":"published","title":"Spatial Bias for Attention-free Non-local Neural Networks","summary":"","featured":false,"research_meta":{"author":"Junhyung Go, Jonngbin Ryu","published_place":"Expert Systems with applications","published_date":"2024-10-04","keywords":["Non-local Networks","Attention-free Vision","Spatial Bias"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://www.sciencedirect.com/science/article/pii/S0957417423025551","source_code_link":"","paper_link":"https://www.sciencedirect.com/science/article/pii/S0957417423025551"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub2-attentional-decoder-networks-for-chest-x-r","key":"biomedical-bapub2-attentional-decoder-networks-for-chest-x-r","category":"industrial_and_medical_ai","status":"published","title":"Attentional Decoder Networks for Chest X-ray Image Recognition on High-resolution Features","summary":"","featured":false,"research_meta":{"author":"Hankyul Kang, Namkug Kim, Jongbin Ryu","published_place":"Computer Methods and Programs in Biomedicine","published_date":"2024-04-21","keywords":["Chest X-ray","Attention Decoder","High-resolution Features"],"pdf_link":"","arxiv_link":"","github_link":"https://github.com/CVL-Lab/ADNet","project_link":"https://www.sciencedirect.com/science/article/pii/S0169260724001949","source_code_link":"https://github.com/CVL-Lab/ADNet","paper_link":"https://www.sciencedirect.com/science/article/pii/S0169260724001949"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub3-analyzing-to-discover-origins-of-cnns-and","key":"biomedical-bapub3-analyzing-to-discover-origins-of-cnns-and","category":"industrial_and_medical_ai","status":"published","title":"Analyzing to Discover Origins of CNNs and ViT Architectures in Medical Images","summary":"","featured":false,"research_meta":{"author":"Seungmin Oh, Namkug Kim, Jongbin Ryu","published_place":"Scientific Reports","published_date":"2024-04-16","keywords":["Medical Imaging","CNN and ViT Analysis","Model Interpretability"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://www.nature.com/articles/s41598-024-58382-3","source_code_link":"","paper_link":"https://www.nature.com/articles/s41598-024-58382-3"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub6-towards-long-tailed-multi-label-disease","key":"biomedical-bapub6-towards-long-tailed-multi-label-disease","category":"industrial_and_medical_ai","status":"published","title":"Towards long-tailed, multi-label disease classification from chest X-ray: Overview of the CXR-LT challenge","summary":"","featured":false,"research_meta":{"author":"CVAMD participants including Jongbin Ryu","published_place":"Medical Image Analysis (MedIA)","published_date":"2024-01-01","keywords":["Long-tailed Learning","Multi-label Classification","Chest X-ray"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://www.sciencedirect.com/science/article/abs/pii/S136184152400149X","source_code_link":"","paper_link":"https://www.sciencedirect.com/science/article/abs/pii/S136184152400149X"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub7-fine-grained-self-supervised-learning-with","key":"biomedical-bapub7-fine-grained-self-supervised-learning-with","category":"industrial_and_medical_ai","status":"published","title":"Fine-Grained Self-Supervised Learning with Jigsaw puzzles for medical image classification","summary":"","featured":false,"research_meta":{"author":"Wongi Park, Jongbin Ryu","published_place":"Computers in Biology and Medicine","published_date":"2024-01-01","keywords":["Fine-Grained Classification","Self-Supervised Learning","Jigsaw Puzzle"],"pdf_link":"","arxiv_link":"","github_link":"https://github.com/kalelpark/FG-SSL","project_link":"https://www.sciencedirect.com/science/article/abs/pii/S0010482524005444","source_code_link":"https://github.com/kalelpark/FG-SSL","paper_link":"https://www.sciencedirect.com/science/article/abs/pii/S0010482524005444"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub0-deep-learning-using-computed-tomography-to","key":"biomedical-bapub0-deep-learning-using-computed-tomography-to","category":"industrial_and_medical_ai","status":"published","title":"Deep Learning Using Computed Tomography to Identify High-Risk Patients for Acute Small Bowel Obstruction: Development and Validation of a Prediction Model: A Retrospective Cohort Study","summary":"","featured":false,"research_meta":{"author":"Seungmin Oh, Jongbin Ryu, Ho-Jung Shin, Jeong Ho Song, Sang-Yong Son, Hoon Hur, Sang-Uk Han","published_place":"International Journal of Surgery","published_date":"2023-12-01","keywords":["CT Analysis","Risk Prediction","Clinical AI"],"pdf_link":"","arxiv_link":"","github_link":"","project_link":"https://journals.lww.com/international-journal-of-surgery/fulltext/2023/12000/deep_learning_using_computed_tomography_to.39.aspx","source_code_link":"","paper_link":"https://journals.lww.com/international-journal-of-surgery/fulltext/2023/12000/deep_learning_using_computed_tomography_to.39.aspx"},"content":{"problem":"","solve":"","expermental_result":""}},{"id":"biomedical-bapub1-robust-asymmetric-loss-for-multi-label-lon","key":"biomedical-bapub1-robust-asymmetric-loss-for-multi-label-lon","category":"industrial_and_medical_ai","status":"published","title":"Robust Asymmetric Loss for Multi-Label Long-Tailed Learning","summary":"","featured":false,"research_meta":{"author":"Wongi Park, Inhyuk Park, Sungeun Kim, Jongbin Ryu","published_place":"ICCVW","published_date":"2023-08-10","keywords":["Long-tailed Learning","Multi-label Classification","Robust Loss"],"pdf_link":"","arxiv_link":"","github_link":"https://github.com/kalelpark/RAL","project_link":"https://openaccess.thecvf.com/content/ICCV2023W/CVAMD/html/Park_Robust_Asymmetric_Loss_for_Multi-Label_Long-Tailed_Learning_ICCVW_2023_paper.html","source_code_link":"https://github.com/kalelpark/RAL","paper_link":"https://openaccess.thecvf.com/content/ICCV2023W/CVAMD/html/Park_Robust_Asymmetric_Loss_for_Multi-Label_Long-Tailed_Learning_ICCVW_2023_paper.html"},"content":{"problem":"","solve":"","expermental_result":""}}]'),Te={items:ii},oi=e=>{const t=typeof e=="string"?e.trim():"";if(!t)return new Date("1970-01-01T00:00:00");const n=new Date(`${t}T00:00:00`);return Number.isNaN(n.getTime())?new Date("1970-01-01T00:00:00"):n},S=e=>typeof e=="string"?e.trim():"",si=e=>Array.isArray(e)?e.map(t=>S(t)).filter(Boolean):typeof e!="string"?[]:e.split(",").map(t=>t.trim()).filter(Boolean),xn=()=>((Te==null?void 0:Te.items)??[]).map((e,t)=>{const n=S(e==null?void 0:e.id)||`publication-${t+1}`,a=S(e==null?void 0:e.category)||"computer_vision_and_learning_algorithms",i=S(e==null?void 0:e.title)||"Untitled publication",r=(e==null?void 0:e.research_meta)??{},o=S(r==null?void 0:r.published_date)||"1970-01-01";return{...e,id:n,key:S(e==null?void 0:e.key)||n,category:a,title:i,research_meta:{author:S(r==null?void 0:r.author),published_place:S(r==null?void 0:r.published_place),published_date:o,keywords:si(r==null?void 0:r.keywords),pdf_link:S(r==null?void 0:r.pdf_link),arxiv_link:S(r==null?void 0:r.arxiv_link),github_link:S((r==null?void 0:r.github_link)||(r==null?void 0:r.source_code_link)),project_link:S((r==null?void 0:r.project_link)||(r==null?void 0:r.paper_link)),source_code_link:S((r==null?void 0:r.source_code_link)||(r==null?void 0:r.github_link)),paper_link:S((r==null?void 0:r.paper_link)||(r==null?void 0:r.project_link))},_parsedDate:oi(o)}}).sort((e,t)=>t._parsedDate-e._parsedDate).map(e=>{const t={...e};return delete t._parsedDate,t}),li=()=>["all",...Array.from(new Set(xn().map(t=>t.category)))],Mt=li(),ci=xn(),zt=[{key:"title",label:"Title"},{key:"title-authors",label:"Title + Authors"},{key:"title-authors-venue",label:"Title + Authors + Venue"}],ui={title:"Search by title","title-authors":"Search by title or authors","title-authors-venue":"Search by title, authors, or venue"};function fi(){const e=Pn(),[t,n]=te.useState("all"),[a,i]=te.useState(""),[r,o]=te.useState("title"),s=l=>{n(l)};te.useEffect(()=>{var g,v,k;const l=new URLSearchParams(e.search),u=((g=l.get("q"))==null?void 0:g.trim())??"",m=((v=l.get("scope"))==null?void 0:v.trim())??"",p=((k=l.get("area"))==null?void 0:k.trim())??"",b=p==="all"?"all":Nn(p),w=zt.some(A=>A.key===m),C=Mt.includes(b);i(u),o(w?m:u?"title-authors":"title"),n(C?b:"all")},[e.search]);const c=te.useMemo(()=>{const l=a.trim().toLowerCase();return ci.filter(u=>{if(!(t==="all"||t===u.category))return!1;if(!l)return!0;const p=[u.title,u.id];return(r==="title-authors"||r==="title-authors-venue")&&p.push(u.research_meta.author),r==="title-authors-venue"&&(p.push(u.research_meta.published_place),p.push(...u.research_meta.keywords??[])),p.join(" ").toLowerCase().includes(l)})},[a,t,r]);return x("div",{"data-reveal":!0,"data-reveal-load-delay":"60",className:"publication",children:[x("div",{"data-reveal":!0,className:"tab-header page-head page-head--publication",children:[d("h1",{children:"Publication"}),d("p",{className:"page-head__summary",children:"Search and filter the publication archive by research area, title, authors, and venue."})]}),x("div",{"data-reveal":!0,className:"publication__controls page-panel page-panel--compact page-panel--section-start page-controls",children:[x("div",{className:"publication__controls-intro page-controls__intro",children:[d("h2",{id:"publication-controls-title",children:"Filter and search"}),d("p",{children:"Combine category filters and text search to quickly find relevant publications."})]}),x("div",{className:"publication__controls-grid page-controls__grid",children:[x("section",{className:"publication__controls-group page-controls__group",children:[x("div",{className:"publication__controls-head",children:[d("p",{className:"publication__controls-label page-controls__label",children:"Filter by research area"}),d("p",{className:"publication__controls-caption page-controls__caption",children:"Categorical filtering narrows the archive by major research theme."})]}),d("div",{className:"publication__filter page-controls__actions",role:"group","aria-label":"Filter publications by area",children:Mt.map((l,u)=>d(ri,{areaKey:l,isSelected:t===l,onSelect:()=>s(l),children:jt[l]||l.charAt(0).toUpperCase()+l.slice(1)},l+u))})]}),x("section",{className:"publication__controls-group page-controls__group",children:[x("div",{className:"publication__controls-head",children:[d("label",{className:"publication__search-label page-controls__label",htmlFor:"publication-search",children:"Search publications"}),d("p",{className:"publication__controls-caption page-controls__caption",children:"Text search runs on title, authors, and venue based on the selected scope."})]}),x("div",{className:"publication__search-layout",children:[d("div",{className:"publication__search-input-wrap",children:d("input",{id:"publication-search",type:"search",className:"publication__search-input",placeholder:ui[r]||"Search publications",value:a,onChange:l=>i(l.target.value)})}),x("div",{className:"publication__scope-wrap",children:[d("p",{className:"publication__scope-label page-controls__label",children:"Search scope"}),d("div",{className:"publication__scope page-controls__actions",role:"group","aria-label":"Publication search scope",children:zt.map(l=>d("button",{type:"button",className:`publication__scope-btn btn btn--secondary btn--sm interactive-button ${r===l.key?"is-active":""}`,onClick:()=>o(l.key),"aria-pressed":r===l.key,children:l.label},l.key))})]})]})]})]})]}),x("section",{"data-reveal":!0,className:"publication__archive page-panel","aria-labelledby":"publication-archive-title",children:[d("div",{className:"publication__section-head",children:x("div",{children:[d("h2",{id:"publication-archive-title",children:"Publication Archive"}),x("p",{children:[c.length," result",c.length===1?"":"s"," in the current view"]})]})}),x("div",{className:"publication__list",children:[c.map((l,u)=>d(ai,{publicationId:l.id,category:l.category,meta:l.research_meta,title:l.title,revealDelay:`${Math.min(u,5)*60}ms`,revealLoadDelay:`${120+Math.min(u,5)*60}`},`${l.key}-${u}`)),c.length===0&&d("p",{className:"publication__empty",children:"No publications match your selected category and search scope."})]})]})]})}function di(){return d(fi,{})}export{di as default};
