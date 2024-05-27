import{r as R}from"./index-CBqU2yxZ.js";import{z as ke,o as j,t as Oe,A as K,v as Me,B as Pe,D as W,E as L,F as Ue,G as je,H as Ee,e as _e,j as Q,f as X,I as Te,h as ee,g as re,J as Z,a as Fe,s as oe,_ as E,i as H,b as te,d as Le}from"./subs-DO7ypnvk.js";import{_ as f}from"./emotion-use-insertion-effect-with-fallbacks.browser.esm-BPGUNDjC.js";import{c as Ne,d as D}from"./undomanager-CK-6DZh3.js";const Ve=["ownerState"],we=["variants"],De=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Ie(e){return Object.keys(e).length===0}function ze(e){return typeof e=="string"&&e.charCodeAt(0)>96}function N(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const We=K(),Ze=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function P({defaultTheme:e,theme:r,themeId:o}){return Ie(r)?e:r[o]||r}function He(e){return e?(r,o)=>o[e]:null}function U(e,r){let{ownerState:o}=r,t=j(r,Ve);const u=typeof e=="function"?e(f({ownerState:o},t)):e;if(Array.isArray(u))return u.flatMap(n=>U(n,f({ownerState:o},t)));if(u&&typeof u=="object"&&Array.isArray(u.variants)){const{variants:n=[]}=u;let d=j(u,we);return n.forEach(s=>{let a=!0;typeof s.props=="function"?a=s.props(f({ownerState:o},t,o)):Object.keys(s.props).forEach(l=>{(o==null?void 0:o[l])!==s.props[l]&&t[l]!==s.props[l]&&(a=!1)}),a&&(Array.isArray(d)||(d=[d]),d.push(typeof s.style=="function"?s.style(f({ownerState:o},t,o)):s.style))}),d}return u}function Ge(e={}){const{themeId:r,defaultTheme:o=We,rootShouldForwardProp:t=N,slotShouldForwardProp:u=N}=e,n=c=>Me(f({},c,{theme:P(f({},c,{defaultTheme:o,themeId:r}))}));return n.__mui_systemSx=!0,(c,d={})=>{ke(c,i=>i.filter(x=>!(x!=null&&x.__mui_systemSx)));const{name:s,slot:a,skipVariantsResolver:l,skipSx:m,overridesResolver:b=He(Ze(a))}=d,_=j(d,De),T=l!==void 0?l:a&&a!=="Root"&&a!=="root"||!1,$=m||!1;let A,h=N;a==="Root"||a==="root"?h=t:a?h=u:ze(c)&&(h=void 0);const y=Oe(c,f({shouldForwardProp:h,label:A},_)),k=i=>typeof i=="function"&&i.__emotion_real!==i||Pe(i)?x=>U(i,f({},x,{theme:P({theme:x.theme,defaultTheme:o,themeId:r})})):i,O=(i,...x)=>{let F=k(i);const C=x?x.map(k):[];s&&b&&C.push(v=>{const p=P(f({},v,{defaultTheme:o,themeId:r}));if(!p.components||!p.components[s]||!p.components[s].styleOverrides)return null;const S=p.components[s].styleOverrides,M={};return Object.entries(S).forEach(([$e,Ae])=>{M[$e]=U(Ae,f({},v,{theme:p}))}),b(v,M)}),s&&!T&&C.push(v=>{var p;const S=P(f({},v,{defaultTheme:o,themeId:r})),M=S==null||(p=S.components)==null||(p=p[s])==null?void 0:p.variants;return U({variants:M},f({},v,{theme:S}))}),$||C.push(n);const I=C.length-x.length;if(Array.isArray(i)&&I>0){const v=new Array(I).fill("");F=[...i,...v],F.raw=[...i.raw,...v]}const z=y(F,...C);return c.muiName&&(z.muiName=c.muiName),z};return y.withConfig&&(O.withConfig=y.withConfig),O}}const Be=Ge(),Je=R.createContext(),Oo=()=>{const e=R.useContext(Je);return e??!1},qe=["component","direction","spacing","divider","children","className","useFlexGap"],Ye=K(),Ke=Be("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,r)=>r.root});function Qe(e){return Te({props:e,name:"MuiStack",defaultTheme:Ye})}function Xe(e,r){const o=R.Children.toArray(e).filter(Boolean);return o.reduce((t,u,n)=>(t.push(u),n<o.length-1&&t.push(R.cloneElement(r,{key:`separator-${n}`})),t),[])}const er=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],rr=({ownerState:e,theme:r})=>{let o=f({display:"flex",flexDirection:"column"},W({theme:r},L({values:e.direction,breakpoints:r.breakpoints.values}),t=>({flexDirection:t})));if(e.spacing){const t=Ue(r),u=Object.keys(r.breakpoints.values).reduce((s,a)=>((typeof e.spacing=="object"&&e.spacing[a]!=null||typeof e.direction=="object"&&e.direction[a]!=null)&&(s[a]=!0),s),{}),n=L({values:e.direction,base:u}),c=L({values:e.spacing,base:u});typeof n=="object"&&Object.keys(n).forEach((s,a,l)=>{if(!n[s]){const b=a>0?n[l[a-1]]:"column";n[s]=b}}),o=je(o,W({theme:r},c,(s,a)=>e.useFlexGap?{gap:Z(t,s)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${er(a?n[a]:e.direction)}`]:Z(t,s)}}))}return o=Ee(r.breakpoints,o),o};function or(e={}){const{createStyledComponent:r=Ke,useThemeProps:o=Qe,componentName:t="MuiStack"}=e,u=()=>ee({root:["root"]},s=>re(t,s),{}),n=r(rr);return R.forwardRef(function(s,a){const l=o(s),m=_e(l),{component:b="div",direction:_="column",spacing:T=0,divider:$,children:A,className:h,useFlexGap:y=!1}=m,k=j(m,qe),O={direction:_,spacing:T,useFlexGap:y},i=u();return Q.jsx(n,f({as:b,ownerState:O,ref:a,className:X(i.root,h)},k,{children:$?Xe(A,$):A}))})}const G=e=>{let r;return e<1?r=5.11916*e**2:r=4.5*Math.log(e+1)+2,(r/100).toFixed(2)};function tr(e){return re("MuiPaper",e)}Fe("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const sr=["className","component","elevation","square","variant"],ur=e=>{const{square:r,elevation:o,variant:t,classes:u}=e,n={root:["root",t,!r&&"rounded",t==="elevation"&&`elevation${o}`]};return ee(n,tr,u)},nr=oe("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:o}=e;return[r.root,r[o.variant],!o.square&&r.rounded,o.variant==="elevation"&&r[`elevation${o.elevation}`]]}})(({theme:e,ownerState:r})=>{var o;return E({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!r.square&&{borderRadius:e.shape.borderRadius},r.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},r.variant==="elevation"&&E({boxShadow:(e.vars||e).shadows[r.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${H("#fff",G(r.elevation))}, ${H("#fff",G(r.elevation))})`},e.vars&&{backgroundImage:(o=e.vars.overlays)==null?void 0:o[r.elevation]}))}),Mo=R.forwardRef(function(r,o){const t=te({props:r,name:"MuiPaper"}),{className:u,component:n="div",elevation:c=1,square:d=!1,variant:s="elevation"}=t,a=Le(t,sr),l=E({},t,{component:n,elevation:c,square:d,variant:s}),m=ur(l);return Q.jsx(nr,E({as:n,ownerState:l,className:X(m.root,u),ref:o},a))}),Po=or({createStyledComponent:oe("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,r)=>r.root}),useThemeProps:e=>te({props:e,name:"MuiStack"})});function ar(e,r,o){var t=e.length;return o=o===void 0?t:o,!r&&o>=t?e:Ne(e,r,o)}var ir="\\ud800-\\udfff",cr="\\u0300-\\u036f",lr="\\ufe20-\\ufe2f",fr="\\u20d0-\\u20ff",dr=cr+lr+fr,pr="\\ufe0e\\ufe0f",xr="\\u200d",vr=RegExp("["+xr+ir+dr+pr+"]");function se(e){return vr.test(e)}function mr(e){return e.split("")}var ue="\\ud800-\\udfff",br="\\u0300-\\u036f",hr="\\ufe20-\\ufe2f",gr="\\u20d0-\\u20ff",Rr=br+hr+gr,yr="\\ufe0e\\ufe0f",Cr="["+ue+"]",V="["+Rr+"]",w="\\ud83c[\\udffb-\\udfff]",Sr="(?:"+V+"|"+w+")",ne="[^"+ue+"]",ae="(?:\\ud83c[\\udde6-\\uddff]){2}",ie="[\\ud800-\\udbff][\\udc00-\\udfff]",$r="\\u200d",ce=Sr+"?",le="["+yr+"]?",Ar="(?:"+$r+"(?:"+[ne,ae,ie].join("|")+")"+le+ce+")*",kr=le+ce+Ar,Or="(?:"+[ne+V+"?",V,ae,ie,Cr].join("|")+")",Mr=RegExp(w+"(?="+w+")|"+Or+kr,"g");function Pr(e){return e.match(Mr)||[]}function Ur(e){return se(e)?Pr(e):mr(e)}function jr(e){return function(r){r=D(r);var o=se(r)?Ur(r):void 0,t=o?o[0]:r.charAt(0),u=o?ar(o,1).join(""):r.slice(1);return t[e]()+u}}var Er=jr("toUpperCase");function _r(e,r,o,t){for(var u=-1,n=e==null?0:e.length;++u<n;)o=r(o,e[u],u,e);return o}function Tr(e){return function(r){return e==null?void 0:e[r]}}var Fr={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"},Lr=Tr(Fr),Nr=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Vr="\\u0300-\\u036f",wr="\\ufe20-\\ufe2f",Dr="\\u20d0-\\u20ff",Ir=Vr+wr+Dr,zr="["+Ir+"]",Wr=RegExp(zr,"g");function Zr(e){return e=D(e),e&&e.replace(Nr,Lr).replace(Wr,"")}var Hr=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;function Gr(e){return e.match(Hr)||[]}var Br=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;function Jr(e){return Br.test(e)}var fe="\\ud800-\\udfff",qr="\\u0300-\\u036f",Yr="\\ufe20-\\ufe2f",Kr="\\u20d0-\\u20ff",Qr=qr+Yr+Kr,de="\\u2700-\\u27bf",pe="a-z\\xdf-\\xf6\\xf8-\\xff",Xr="\\xac\\xb1\\xd7\\xf7",eo="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",ro="\\u2000-\\u206f",oo=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",xe="A-Z\\xc0-\\xd6\\xd8-\\xde",to="\\ufe0e\\ufe0f",ve=Xr+eo+ro+oo,me="['’]",B="["+ve+"]",so="["+Qr+"]",be="\\d+",uo="["+de+"]",he="["+pe+"]",ge="[^"+fe+ve+be+de+pe+xe+"]",no="\\ud83c[\\udffb-\\udfff]",ao="(?:"+so+"|"+no+")",io="[^"+fe+"]",Re="(?:\\ud83c[\\udde6-\\uddff]){2}",ye="[\\ud800-\\udbff][\\udc00-\\udfff]",g="["+xe+"]",co="\\u200d",J="(?:"+he+"|"+ge+")",lo="(?:"+g+"|"+ge+")",q="(?:"+me+"(?:d|ll|m|re|s|t|ve))?",Y="(?:"+me+"(?:D|LL|M|RE|S|T|VE))?",Ce=ao+"?",Se="["+to+"]?",fo="(?:"+co+"(?:"+[io,Re,ye].join("|")+")"+Se+Ce+")*",po="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",xo="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",vo=Se+Ce+fo,mo="(?:"+[uo,Re,ye].join("|")+")"+vo,bo=RegExp([g+"?"+he+"+"+q+"(?="+[B,g,"$"].join("|")+")",lo+"+"+Y+"(?="+[B,g+J,"$"].join("|")+")",g+"?"+J+"+"+q,g+"+"+Y,xo,po,be,mo].join("|"),"g");function ho(e){return e.match(bo)||[]}function go(e,r,o){return e=D(e),r=r,r===void 0?Jr(e)?ho(e):Gr(e):e.match(r)||[]}var Ro="['’]",yo=RegExp(Ro,"g");function Co(e){return function(r){return _r(go(Zr(r).replace(yo,"")),e,"")}}var Uo=Co(function(e,r,o){return e+(o?" ":"")+Er(r)});export{Mo as P,Po as S,Uo as s,Oo as u};