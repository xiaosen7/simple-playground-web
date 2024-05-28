import{g as P,d as z,e as S,u as R,j as C,f as i,k as y,l as x,m as I,n as E,T,G as k}from"./styled-DlxMxt4f.js";import{r as g}from"./index-CBqU2yxZ.js";import{g as A}from"./subs-8t1mNJT2.js";import{a as H}from"./TransitionGroupContext-CXdPbAh_.js";function J(e){return e&&e.ownerDocument||document}function j(e){return P("MuiSvgIcon",e)}A("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const M=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],B=e=>{const{color:t,fontSize:o,classes:n}=e,l={root:["root",t!=="inherit"&&`color${S(t)}`,`fontSize${S(o)}`]};return I(l,j,n)},O=z("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.color!=="inherit"&&t[`color${S(o.color)}`],t[`fontSize${S(o.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var o,n,l,d,m,r,v,s,p,a,c,f,u;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(o=e.transitions)==null||(n=o.create)==null?void 0:n.call(o,"fill",{duration:(l=e.transitions)==null||(l=l.duration)==null?void 0:l.shorter}),fontSize:{inherit:"inherit",small:((d=e.typography)==null||(m=d.pxToRem)==null?void 0:m.call(d,20))||"1.25rem",medium:((r=e.typography)==null||(v=r.pxToRem)==null?void 0:v.call(r,24))||"1.5rem",large:((s=e.typography)==null||(p=s.pxToRem)==null?void 0:p.call(s,35))||"2.1875rem"}[t.fontSize],color:(a=(c=(e.vars||e).palette)==null||(c=c[t.color])==null?void 0:c.main)!=null?a:{action:(f=(e.vars||e).palette)==null||(f=f.action)==null?void 0:f.active,disabled:(u=(e.vars||e).palette)==null||(u=u.action)==null?void 0:u.disabled,inherit:void 0}[t.color]}}),$=g.forwardRef(function(t,o){const n=R({props:t,name:"MuiSvgIcon"}),{children:l,className:d,color:m="inherit",component:r="svg",fontSize:v="medium",htmlColor:s,inheritViewBox:p=!1,titleAccess:a,viewBox:c="0 0 24 24"}=n,f=C(n,M),u=g.isValidElement(l)&&l.type==="svg",h=i({},n,{color:m,component:r,fontSize:v,instanceFontSize:t.fontSize,inheritViewBox:p,viewBox:c,hasSvgAsChild:u}),_={};p||(_.viewBox=c);const N=B(h);return y.jsxs(O,i({as:r,className:x(N.root,d),focusable:"false",color:s,"aria-hidden":a?void 0:!0,role:a?"img":void 0,ref:o},_,f,u&&l.props,{ownerState:h,children:[u?l.props.children:l,a?y.jsx("title",{children:a}):null]}))});$.muiName="SvgIcon";function K(e,t){function o(n,l){return y.jsx($,i({"data-testid":`${t}Icon`,ref:l},n,{children:e}))}return o.muiName=$.muiName,g.memo(g.forwardRef(o))}function Q(){const e=E(k);return e[T]||e}function b(e){return typeof e=="string"}function D(e,t,o){return e===void 0||b(e)?t:i({},t,{ownerState:i({},t.ownerState,o)})}function U(e,t=[]){if(e===void 0)return{};const o={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!t.includes(n)).forEach(n=>{o[n]=e[n]}),o}function F(e,t,o){return typeof e=="function"?e(t,o):e}function w(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(o=>!(o.match(/^on[A-Z]/)&&typeof e[o]=="function")).forEach(o=>{t[o]=e[o]}),t}function V(e){const{getSlotProps:t,additionalProps:o,externalSlotProps:n,externalForwardedProps:l,className:d}=e;if(!t){const f=x(o==null?void 0:o.className,d,l==null?void 0:l.className,n==null?void 0:n.className),u=i({},o==null?void 0:o.style,l==null?void 0:l.style,n==null?void 0:n.style),h=i({},o,l,n);return f.length>0&&(h.className=f),Object.keys(u).length>0&&(h.style=u),{props:h,internalRef:void 0}}const m=U(i({},l,n)),r=w(n),v=w(l),s=t(m),p=x(s==null?void 0:s.className,o==null?void 0:o.className,d,l==null?void 0:l.className,n==null?void 0:n.className),a=i({},s==null?void 0:s.style,o==null?void 0:o.style,l==null?void 0:l.style,n==null?void 0:n.style),c=i({},s,o,v,r);return p.length>0&&(c.className=p),Object.keys(a).length>0&&(c.style=a),{props:c,internalRef:s.ref}}const W=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function X(e){var t;const{elementType:o,externalSlotProps:n,ownerState:l,skipResolvingSlotProps:d=!1}=e,m=C(e,W),r=d?{}:F(n,l),{props:v,internalRef:s}=V(i({},m,{externalSlotProps:r})),p=H(s,r==null?void 0:r.ref,(t=e.additionalProps)==null?void 0:t.ref);return D(o,i({},v,{ref:p}),l)}export{Q as a,K as c,U as e,b as i,J as o,F as r,X as u};
