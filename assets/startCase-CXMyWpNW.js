import{r as g}from"./index-CBqU2yxZ.js";import{q as Ae,_ as $,n as ke,t as Y,o as Oe,v as Me,w as z,x as w,y as Pe,z as Ue,A as je,e as Ee,j as K,b as Q,B as Te,d as X,g as ee,D as Z,a as _e,s as re,f as W,u as oe}from"./styled-COiZKFch.js";import{_ as i}from"./emotion-use-insertion-effect-with-fallbacks.browser.esm-BPGUNDjC.js";import{d as we,e as F}from"./undomanager-DgycbOGT.js";const Le=["ownerState"],Ne=["variants"],Ve=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Fe(e){return Object.keys(e).length===0}function De(e){return typeof e=="string"&&e.charCodeAt(0)>96}function L(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Ie=Y(),ze=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function U({defaultTheme:e,theme:r,themeId:o}){return Fe(r)?e:r[o]||r}function Ze(e){return e?(r,o)=>o[e]:null}function j(e,r){let{ownerState:o}=r,t=$(r,Le);const n=typeof e=="function"?e(i({ownerState:o},t)):e;if(Array.isArray(n))return n.flatMap(u=>j(u,i({ownerState:o},t)));if(n&&typeof n=="object"&&Array.isArray(n.variants)){const{variants:u=[]}=n;let d=$(n,Ne);return u.forEach(s=>{let a=!0;typeof s.props=="function"?a=s.props(i({ownerState:o},t,o)):Object.keys(s.props).forEach(f=>{(o==null?void 0:o[f])!==s.props[f]&&t[f]!==s.props[f]&&(a=!1)}),a&&(Array.isArray(d)||(d=[d]),d.push(typeof s.style=="function"?s.style(i({ownerState:o},t,o)):s.style))}),d}return n}function We(e={}){const{themeId:r,defaultTheme:o=Ie,rootShouldForwardProp:t=L,slotShouldForwardProp:n=L}=e,u=l=>Oe(i({},l,{theme:U(i({},l,{defaultTheme:o,themeId:r}))}));return u.__mui_systemSx=!0,(l,d={})=>{Ae(l,c=>c.filter(x=>!(x!=null&&x.__mui_systemSx)));const{name:s,slot:a,skipVariantsResolver:f,skipSx:m,overridesResolver:b=Ze(ze(a))}=d,E=$(d,Ve),T=f!==void 0?f:a&&a!=="Root"&&a!=="root"||!1,A=m||!1;let k,h=L;a==="Root"||a==="root"?h=t:a?h=n:De(l)&&(h=void 0);const y=ke(l,i({shouldForwardProp:h,label:k},E)),O=c=>typeof c=="function"&&c.__emotion_real!==c||Me(c)?x=>j(c,i({},x,{theme:U({theme:x.theme,defaultTheme:o,themeId:r})})):c,M=(c,...x)=>{let _=O(c);const C=x?x.map(O):[];s&&b&&C.push(v=>{const p=U(i({},v,{defaultTheme:o,themeId:r}));if(!p.components||!p.components[s]||!p.components[s].styleOverrides)return null;const S=p.components[s].styleOverrides,P={};return Object.entries(S).forEach(([Se,$e])=>{P[Se]=j($e,i({},v,{theme:p}))}),b(v,P)}),s&&!T&&C.push(v=>{var p;const S=U(i({},v,{defaultTheme:o,themeId:r})),P=S==null||(p=S.components)==null||(p=p[s])==null?void 0:p.variants;return j({variants:P},i({},v,{theme:S}))}),A||C.push(u);const D=C.length-x.length;if(Array.isArray(c)&&D>0){const v=new Array(D).fill("");_=[...c,...v],_.raw=[...c.raw,...v]}const I=y(_,...C);return l.muiName&&(I.muiName=l.muiName),I};return y.withConfig&&(M.withConfig=y.withConfig),M}}const He=We(),qe=g.createContext(),Mo=()=>{const e=g.useContext(qe);return e??!1},Be=["component","direction","spacing","divider","children","className","useFlexGap"],Ge=Y(),Je=He("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,r)=>r.root});function Ye(e){return Te({props:e,name:"MuiStack",defaultTheme:Ge})}function Ke(e,r){const o=g.Children.toArray(e).filter(Boolean);return o.reduce((t,n,u)=>(t.push(n),u<o.length-1&&t.push(g.cloneElement(r,{key:`separator-${u}`})),t),[])}const Qe=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],Xe=({ownerState:e,theme:r})=>{let o=i({display:"flex",flexDirection:"column"},z({theme:r},w({values:e.direction,breakpoints:r.breakpoints.values}),t=>({flexDirection:t})));if(e.spacing){const t=Pe(r),n=Object.keys(r.breakpoints.values).reduce((s,a)=>((typeof e.spacing=="object"&&e.spacing[a]!=null||typeof e.direction=="object"&&e.direction[a]!=null)&&(s[a]=!0),s),{}),u=w({values:e.direction,base:n}),l=w({values:e.spacing,base:n});typeof u=="object"&&Object.keys(u).forEach((s,a,f)=>{if(!u[s]){const b=a>0?u[f[a-1]]:"column";u[s]=b}}),o=Ue(o,z({theme:r},l,(s,a)=>e.useFlexGap?{gap:Z(t,s)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${Qe(a?u[a]:e.direction)}`]:Z(t,s)}}))}return o=je(r.breakpoints,o),o};function er(e={}){const{createStyledComponent:r=Je,useThemeProps:o=Ye,componentName:t="MuiStack"}=e,n=()=>X({root:["root"]},s=>ee(t,s),{}),u=r(Xe);return g.forwardRef(function(s,a){const f=o(s),m=Ee(f),{component:b="div",direction:E="column",spacing:T=0,divider:A,children:k,className:h,useFlexGap:y=!1}=m,O=$(m,Be),M={direction:E,spacing:T,useFlexGap:y},c=n();return K.jsx(u,i({as:b,ownerState:M,ref:a,className:Q(c.root,h)},O,{children:A?Ke(k,A):k}))})}const H=e=>{let r;return e<1?r=5.11916*e**2:r=4.5*Math.log(e+1)+2,(r/100).toFixed(2)};function rr(e){return ee("MuiPaper",e)}_e("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const or=["className","component","elevation","square","variant"],tr=e=>{const{square:r,elevation:o,variant:t,classes:n}=e,u={root:["root",t,!r&&"rounded",t==="elevation"&&`elevation${o}`]};return X(u,rr,n)},sr=re("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:o}=e;return[r.root,r[o.variant],!o.square&&r.rounded,o.variant==="elevation"&&r[`elevation${o.elevation}`]]}})(({theme:e,ownerState:r})=>{var o;return i({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!r.square&&{borderRadius:e.shape.borderRadius},r.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},r.variant==="elevation"&&i({boxShadow:(e.vars||e).shadows[r.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${W("#fff",H(r.elevation))}, ${W("#fff",H(r.elevation))})`},e.vars&&{backgroundImage:(o=e.vars.overlays)==null?void 0:o[r.elevation]}))}),nr=g.forwardRef(function(r,o){const t=oe({props:r,name:"MuiPaper"}),{className:n,component:u="div",elevation:l=1,square:d=!1,variant:s="elevation"}=t,a=$(t,or),f=i({},t,{component:u,elevation:l,square:d,variant:s}),m=tr(f);return K.jsx(sr,i({as:u,ownerState:f,className:Q(m.root,n),ref:o},a))}),Po=nr,ur=er({createStyledComponent:re("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,r)=>r.root}),useThemeProps:e=>oe({props:e,name:"MuiStack"})}),Uo=ur;function ar(e,r,o){var t=e.length;return o=o===void 0?t:o,!r&&o>=t?e:we(e,r,o)}var ir="\\ud800-\\udfff",cr="\\u0300-\\u036f",lr="\\ufe20-\\ufe2f",fr="\\u20d0-\\u20ff",dr=cr+lr+fr,pr="\\ufe0e\\ufe0f",xr="\\u200d",vr=RegExp("["+xr+ir+dr+pr+"]");function te(e){return vr.test(e)}function mr(e){return e.split("")}var se="\\ud800-\\udfff",br="\\u0300-\\u036f",hr="\\ufe20-\\ufe2f",Rr="\\u20d0-\\u20ff",gr=br+hr+Rr,yr="\\ufe0e\\ufe0f",Cr="["+se+"]",N="["+gr+"]",V="\\ud83c[\\udffb-\\udfff]",Sr="(?:"+N+"|"+V+")",ne="[^"+se+"]",ue="(?:\\ud83c[\\udde6-\\uddff]){2}",ae="[\\ud800-\\udbff][\\udc00-\\udfff]",$r="\\u200d",ie=Sr+"?",ce="["+yr+"]?",Ar="(?:"+$r+"(?:"+[ne,ue,ae].join("|")+")"+ce+ie+")*",kr=ce+ie+Ar,Or="(?:"+[ne+N+"?",N,ue,ae,Cr].join("|")+")",Mr=RegExp(V+"(?="+V+")|"+Or+kr,"g");function Pr(e){return e.match(Mr)||[]}function Ur(e){return te(e)?Pr(e):mr(e)}function jr(e){return function(r){r=F(r);var o=te(r)?Ur(r):void 0,t=o?o[0]:r.charAt(0),n=o?ar(o,1).join(""):r.slice(1);return t[e]()+n}}var Er=jr("toUpperCase");function Tr(e,r,o,t){var n=-1,u=e==null?0:e.length;for(t&&u&&(o=e[++n]);++n<u;)o=r(o,e[n],n,e);return o}function _r(e){return function(r){return e==null?void 0:e[r]}}var wr={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"},Lr=_r(wr);const Nr=Lr;var Vr=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Fr="\\u0300-\\u036f",Dr="\\ufe20-\\ufe2f",Ir="\\u20d0-\\u20ff",zr=Fr+Dr+Ir,Zr="["+zr+"]",Wr=RegExp(Zr,"g");function Hr(e){return e=F(e),e&&e.replace(Vr,Nr).replace(Wr,"")}var qr=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;function Br(e){return e.match(qr)||[]}var Gr=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;function Jr(e){return Gr.test(e)}var le="\\ud800-\\udfff",Yr="\\u0300-\\u036f",Kr="\\ufe20-\\ufe2f",Qr="\\u20d0-\\u20ff",Xr=Yr+Kr+Qr,fe="\\u2700-\\u27bf",de="a-z\\xdf-\\xf6\\xf8-\\xff",eo="\\xac\\xb1\\xd7\\xf7",ro="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",oo="\\u2000-\\u206f",to=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",pe="A-Z\\xc0-\\xd6\\xd8-\\xde",so="\\ufe0e\\ufe0f",xe=eo+ro+oo+to,ve="['’]",q="["+xe+"]",no="["+Xr+"]",me="\\d+",uo="["+fe+"]",be="["+de+"]",he="[^"+le+xe+me+fe+de+pe+"]",ao="\\ud83c[\\udffb-\\udfff]",io="(?:"+no+"|"+ao+")",co="[^"+le+"]",Re="(?:\\ud83c[\\udde6-\\uddff]){2}",ge="[\\ud800-\\udbff][\\udc00-\\udfff]",R="["+pe+"]",lo="\\u200d",B="(?:"+be+"|"+he+")",fo="(?:"+R+"|"+he+")",G="(?:"+ve+"(?:d|ll|m|re|s|t|ve))?",J="(?:"+ve+"(?:D|LL|M|RE|S|T|VE))?",ye=io+"?",Ce="["+so+"]?",po="(?:"+lo+"(?:"+[co,Re,ge].join("|")+")"+Ce+ye+")*",xo="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",vo="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",mo=Ce+ye+po,bo="(?:"+[uo,Re,ge].join("|")+")"+mo,ho=RegExp([R+"?"+be+"+"+G+"(?="+[q,R,"$"].join("|")+")",fo+"+"+J+"(?="+[q,R+B,"$"].join("|")+")",R+"?"+B+"+"+G,R+"+"+J,vo,xo,me,bo].join("|"),"g");function Ro(e){return e.match(ho)||[]}function go(e,r,o){return e=F(e),r=o?void 0:r,r===void 0?Jr(e)?Ro(e):Br(e):e.match(r)||[]}var yo="['’]",Co=RegExp(yo,"g");function So(e){return function(r){return Tr(go(Hr(r).replace(Co,"")),e,"")}}var jo=So(function(e,r,o){return e+(o?" ":"")+Er(r)});export{Po as P,Uo as S,jo as s,Mo as u};