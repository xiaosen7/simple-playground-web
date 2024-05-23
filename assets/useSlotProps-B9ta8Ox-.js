import{_ as a}from"./emotion-use-insertion-effect-with-fallbacks.browser.esm-BPGUNDjC.js";import{r as S}from"./index-CBqU2yxZ.js";import{g as P,a as z,s as R,c as y,u as T,_ as C,j as g,b as x,d as I,l as E,T as k,m as b}from"./styled-COiZKFch.js";import{a as A}from"./TransitionGroupContext-B0DYWRHX.js";function K(e,t=166){let o;function n(...l){const r=()=>{e.apply(this,l)};clearTimeout(o),o=setTimeout(r,t)}return n.clear=()=>{clearTimeout(o)},n}function H(e){return e&&e.ownerDocument||document}function Q(e){return H(e).defaultView||window}function j(e){return P("MuiSvgIcon",e)}z("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const M=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],B=e=>{const{color:t,fontSize:o,classes:n}=e,l={root:["root",t!=="inherit"&&`color${y(t)}`,`fontSize${y(o)}`]};return I(l,j,n)},O=R("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.color!=="inherit"&&t[`color${y(o.color)}`],t[`fontSize${y(o.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var o,n,l,r,m,i,v,s,p,c,u,f,d;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(o=e.transitions)==null||(n=o.create)==null?void 0:n.call(o,"fill",{duration:(l=e.transitions)==null||(l=l.duration)==null?void 0:l.shorter}),fontSize:{inherit:"inherit",small:((r=e.typography)==null||(m=r.pxToRem)==null?void 0:m.call(r,20))||"1.25rem",medium:((i=e.typography)==null||(v=i.pxToRem)==null?void 0:v.call(i,24))||"1.5rem",large:((s=e.typography)==null||(p=s.pxToRem)==null?void 0:p.call(s,35))||"2.1875rem"}[t.fontSize],color:(c=(u=(e.vars||e).palette)==null||(u=u[t.color])==null?void 0:u.main)!=null?c:{action:(f=(e.vars||e).palette)==null||(f=f.action)==null?void 0:f.active,disabled:(d=(e.vars||e).palette)==null||(d=d.action)==null?void 0:d.disabled,inherit:void 0}[t.color]}}),$=S.forwardRef(function(t,o){const n=T({props:t,name:"MuiSvgIcon"}),{children:l,className:r,color:m="inherit",component:i="svg",fontSize:v="medium",htmlColor:s,inheritViewBox:p=!1,titleAccess:c,viewBox:u="0 0 24 24"}=n,f=C(n,M),d=S.isValidElement(l)&&l.type==="svg",h=a({},n,{color:m,component:i,fontSize:v,instanceFontSize:t.fontSize,inheritViewBox:p,viewBox:u,hasSvgAsChild:d}),w={};p||(w.viewBox=u);const N=B(h);return g.jsxs(O,a({as:i,className:x(N.root,r),focusable:"false",color:s,"aria-hidden":c?void 0:!0,role:c?"img":void 0,ref:o},w,f,d&&l.props,{ownerState:h,children:[d?l.props.children:l,c?g.jsx("title",{children:c}):null]}))});$.muiName="SvgIcon";function X(e,t){function o(n,l){return g.jsx($,a({"data-testid":`${t}Icon`,ref:l},n,{children:e}))}return o.muiName=$.muiName,S.memo(S.forwardRef(o))}function Y(){const e=E(b);return e[k]||e}function D(e){return typeof e=="string"}function U(e,t,o){return e===void 0||D(e)?t:a({},t,{ownerState:a({},t.ownerState,o)})}function V(e,t=[]){if(e===void 0)return{};const o={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!t.includes(n)).forEach(n=>{o[n]=e[n]}),o}function W(e,t,o){return typeof e=="function"?e(t,o):e}function _(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(o=>!(o.match(/^on[A-Z]/)&&typeof e[o]=="function")).forEach(o=>{t[o]=e[o]}),t}function F(e){const{getSlotProps:t,additionalProps:o,externalSlotProps:n,externalForwardedProps:l,className:r}=e;if(!t){const f=x(o==null?void 0:o.className,r,l==null?void 0:l.className,n==null?void 0:n.className),d=a({},o==null?void 0:o.style,l==null?void 0:l.style,n==null?void 0:n.style),h=a({},o,l,n);return f.length>0&&(h.className=f),Object.keys(d).length>0&&(h.style=d),{props:h,internalRef:void 0}}const m=V(a({},l,n)),i=_(n),v=_(l),s=t(m),p=x(s==null?void 0:s.className,o==null?void 0:o.className,r,l==null?void 0:l.className,n==null?void 0:n.className),c=a({},s==null?void 0:s.style,o==null?void 0:o.style,l==null?void 0:l.style,n==null?void 0:n.style),u=a({},s,o,v,i);return p.length>0&&(u.className=p),Object.keys(c).length>0&&(u.style=c),{props:u,internalRef:s.ref}}const L=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function ee(e){var t;const{elementType:o,externalSlotProps:n,ownerState:l,skipResolvingSlotProps:r=!1}=e,m=C(e,L),i=r?{}:W(n,l),{props:v,internalRef:s}=F(a({},m,{externalSlotProps:i})),p=A(s,i==null?void 0:i.ref,(t=e.additionalProps)==null?void 0:t.ref);return U(o,a({},v,{ref:p}),l)}export{Q as a,Y as b,X as c,K as d,V as e,D as i,H as o,W as r,ee as u};