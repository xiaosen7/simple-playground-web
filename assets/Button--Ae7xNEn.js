import{a as _,g as V,s as z,r as j,c as i,f as u,h as O,u as G,_ as F,j as b,b as R,d as U}from"./styled-COiZKFch.js";import{_ as r}from"./emotion-use-insertion-effect-with-fallbacks.browser.esm-BPGUNDjC.js";import{r as d}from"./index-CBqU2yxZ.js";import{B as H}from"./ButtonBase-FzN6Indi.js";function A(o){return V("MuiButton",o)}const D=_("MuiButton",["root","text","textInherit","textPrimary","textSecondary","textSuccess","textError","textInfo","textWarning","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","outlinedSuccess","outlinedError","outlinedInfo","outlinedWarning","contained","containedInherit","containedPrimary","containedSecondary","containedSuccess","containedError","containedInfo","containedWarning","disableElevation","focusVisible","disabled","colorInherit","colorPrimary","colorSecondary","colorSuccess","colorError","colorInfo","colorWarning","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","icon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]),v=D,q=d.createContext({}),J=q,K=d.createContext(void 0),Q=K,X=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],Y=o=>{const{color:a,disableElevation:n,fullWidth:s,size:t,variant:l,classes:c}=o,x={root:["root",l,`${l}${i(a)}`,`size${i(t)}`,`${l}Size${i(t)}`,`color${i(a)}`,n&&"disableElevation",s&&"fullWidth"],label:["label"],startIcon:["icon","startIcon",`iconSize${i(t)}`],endIcon:["icon","endIcon",`iconSize${i(t)}`]},g=U(x,A,c);return r({},c,g)},k=o=>r({},o.size==="small"&&{"& > *:nth-of-type(1)":{fontSize:18}},o.size==="medium"&&{"& > *:nth-of-type(1)":{fontSize:20}},o.size==="large"&&{"& > *:nth-of-type(1)":{fontSize:22}}),Z=z(H,{shouldForwardProp:o=>j(o)||o==="classes",name:"MuiButton",slot:"Root",overridesResolver:(o,a)=>{const{ownerState:n}=o;return[a.root,a[n.variant],a[`${n.variant}${i(n.color)}`],a[`size${i(n.size)}`],a[`${n.variant}Size${i(n.size)}`],n.color==="inherit"&&a.colorInherit,n.disableElevation&&a.disableElevation,n.fullWidth&&a.fullWidth]}})(({theme:o,ownerState:a})=>{var n,s;const t=o.palette.mode==="light"?o.palette.grey[300]:o.palette.grey[800],l=o.palette.mode==="light"?o.palette.grey.A100:o.palette.grey[700];return r({},o.typography.button,{minWidth:64,padding:"6px 16px",borderRadius:(o.vars||o).shape.borderRadius,transition:o.transitions.create(["background-color","box-shadow","border-color","color"],{duration:o.transitions.duration.short}),"&:hover":r({textDecoration:"none",backgroundColor:o.vars?`rgba(${o.vars.palette.text.primaryChannel} / ${o.vars.palette.action.hoverOpacity})`:u(o.palette.text.primary,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},a.variant==="text"&&a.color!=="inherit"&&{backgroundColor:o.vars?`rgba(${o.vars.palette[a.color].mainChannel} / ${o.vars.palette.action.hoverOpacity})`:u(o.palette[a.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},a.variant==="outlined"&&a.color!=="inherit"&&{border:`1px solid ${(o.vars||o).palette[a.color].main}`,backgroundColor:o.vars?`rgba(${o.vars.palette[a.color].mainChannel} / ${o.vars.palette.action.hoverOpacity})`:u(o.palette[a.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},a.variant==="contained"&&{backgroundColor:o.vars?o.vars.palette.Button.inheritContainedHoverBg:l,boxShadow:(o.vars||o).shadows[4],"@media (hover: none)":{boxShadow:(o.vars||o).shadows[2],backgroundColor:(o.vars||o).palette.grey[300]}},a.variant==="contained"&&a.color!=="inherit"&&{backgroundColor:(o.vars||o).palette[a.color].dark,"@media (hover: none)":{backgroundColor:(o.vars||o).palette[a.color].main}}),"&:active":r({},a.variant==="contained"&&{boxShadow:(o.vars||o).shadows[8]}),[`&.${v.focusVisible}`]:r({},a.variant==="contained"&&{boxShadow:(o.vars||o).shadows[6]}),[`&.${v.disabled}`]:r({color:(o.vars||o).palette.action.disabled},a.variant==="outlined"&&{border:`1px solid ${(o.vars||o).palette.action.disabledBackground}`},a.variant==="contained"&&{color:(o.vars||o).palette.action.disabled,boxShadow:(o.vars||o).shadows[0],backgroundColor:(o.vars||o).palette.action.disabledBackground})},a.variant==="text"&&{padding:"6px 8px"},a.variant==="text"&&a.color!=="inherit"&&{color:(o.vars||o).palette[a.color].main},a.variant==="outlined"&&{padding:"5px 15px",border:"1px solid currentColor"},a.variant==="outlined"&&a.color!=="inherit"&&{color:(o.vars||o).palette[a.color].main,border:o.vars?`1px solid rgba(${o.vars.palette[a.color].mainChannel} / 0.5)`:`1px solid ${u(o.palette[a.color].main,.5)}`},a.variant==="contained"&&{color:o.vars?o.vars.palette.text.primary:(n=(s=o.palette).getContrastText)==null?void 0:n.call(s,o.palette.grey[300]),backgroundColor:o.vars?o.vars.palette.Button.inheritContainedBg:t,boxShadow:(o.vars||o).shadows[2]},a.variant==="contained"&&a.color!=="inherit"&&{color:(o.vars||o).palette[a.color].contrastText,backgroundColor:(o.vars||o).palette[a.color].main},a.color==="inherit"&&{color:"inherit",borderColor:"currentColor"},a.size==="small"&&a.variant==="text"&&{padding:"4px 5px",fontSize:o.typography.pxToRem(13)},a.size==="large"&&a.variant==="text"&&{padding:"8px 11px",fontSize:o.typography.pxToRem(15)},a.size==="small"&&a.variant==="outlined"&&{padding:"3px 9px",fontSize:o.typography.pxToRem(13)},a.size==="large"&&a.variant==="outlined"&&{padding:"7px 21px",fontSize:o.typography.pxToRem(15)},a.size==="small"&&a.variant==="contained"&&{padding:"4px 10px",fontSize:o.typography.pxToRem(13)},a.size==="large"&&a.variant==="contained"&&{padding:"8px 22px",fontSize:o.typography.pxToRem(15)},a.fullWidth&&{width:"100%"})},({ownerState:o})=>o.disableElevation&&{boxShadow:"none","&:hover":{boxShadow:"none"},[`&.${v.focusVisible}`]:{boxShadow:"none"},"&:active":{boxShadow:"none"},[`&.${v.disabled}`]:{boxShadow:"none"}}),w=z("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:(o,a)=>{const{ownerState:n}=o;return[a.startIcon,a[`iconSize${i(n.size)}`]]}})(({ownerState:o})=>r({display:"inherit",marginRight:8,marginLeft:-4},o.size==="small"&&{marginLeft:-2},k(o))),oo=z("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:(o,a)=>{const{ownerState:n}=o;return[a.endIcon,a[`iconSize${i(n.size)}`]]}})(({ownerState:o})=>r({display:"inherit",marginRight:-4,marginLeft:8},o.size==="small"&&{marginRight:-2},k(o))),ao=d.forwardRef(function(a,n){const s=d.useContext(J),t=d.useContext(Q),l=O(s,a),c=G({props:l,name:"MuiButton"}),{children:x,color:g="primary",component:C="button",className:h,disabled:f=!1,disableElevation:E=!1,disableFocusRipple:y=!1,endIcon:$,focusVisibleClassName:m,fullWidth:P=!1,size:W="medium",startIcon:B,type:I,variant:M="text"}=c,N=F(c,X),p=r({},c,{color:g,component:C,disabled:f,disableElevation:E,disableFocusRipple:y,fullWidth:P,size:W,type:I,variant:M}),e=Y(p),L=B&&b.jsx(w,{className:e.startIcon,ownerState:p,children:B}),S=$&&b.jsx(oo,{className:e.endIcon,ownerState:p,children:$}),T=t||"";return b.jsxs(Z,r({ownerState:p,className:R(s.className,e.root,h,T),component:C,disabled:f,focusRipple:!y,focusVisibleClassName:R(e.focusVisible,m),ref:n,type:I},N,{classes:e,children:[L,x,S]}))}),so=ao;export{so as B};
