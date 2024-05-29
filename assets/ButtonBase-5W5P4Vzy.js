import{_ as Ke,l as x,k as N,B as ie,d as re,u as ge,j as Re,f as H,g as Oe,m as ze}from"./styled-DlxMxt4f.js";import{r as a,R as X}from"./index-CBqU2yxZ.js";import{g as ye}from"./subs-up_klfSl.js";import{b as Ae,T as pe,c as We,a as fe,d as Y}from"./TransitionGroupContext-CXdPbAh_.js";import{_ as Xe}from"./emotion-use-insertion-effect-with-fallbacks.browser.esm-BPGUNDjC.js";import{_ as Ye}from"./assertThisInitialized-B9jnkVVz.js";import{_ as He}from"./inheritsLoose-B7h9gheN.js";let G=!0,te=!1;const Ge=new Ae,qe={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Je(e){const{type:t,tagName:r}=e;return!!(r==="INPUT"&&qe[t]&&!e.readOnly||r==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Qe(e){e.metaKey||e.altKey||e.ctrlKey||(G=!0)}function ee(){G=!1}function Ze(){this.visibilityState==="hidden"&&te&&(G=!0)}function et(e){e.addEventListener("keydown",Qe,!0),e.addEventListener("mousedown",ee,!0),e.addEventListener("pointerdown",ee,!0),e.addEventListener("touchstart",ee,!0),e.addEventListener("visibilitychange",Ze,!0)}function tt(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return G||Je(t)}function nt(){const e=a.useCallback(n=>{n!=null&&et(n.ownerDocument)},[]),t=a.useRef(!1);function r(){return t.current?(te=!0,Ge.start(100,()=>{te=!1}),t.current=!1,!0):!1}function l(n){return tt(n)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:l,onBlur:r,ref:e}}function oe(e,t){var r=function(i){return t&&a.isValidElement(i)?t(i):i},l=Object.create(null);return e&&a.Children.map(e,function(n){return n}).forEach(function(n){l[n.key]=r(n)}),l}function it(e,t){e=e||{},t=t||{};function r(d){return d in t?t[d]:e[d]}var l=Object.create(null),n=[];for(var i in e)i in t?n.length&&(l[i]=n,n=[]):n.push(i);var o,c={};for(var u in t){if(l[u])for(o=0;o<l[u].length;o++){var p=l[u][o];c[l[u][o]]=r(p)}c[u]=r(u)}for(o=0;o<n.length;o++)c[n[o]]=r(n[o]);return c}function S(e,t,r){return r[t]!=null?r[t]:e.props[t]}function rt(e,t){return oe(e.children,function(r){return a.cloneElement(r,{onExited:t.bind(null,r),in:!0,appear:S(r,"appear",e),enter:S(r,"enter",e),exit:S(r,"exit",e)})})}function ot(e,t,r){var l=oe(e.children),n=it(t,l);return Object.keys(n).forEach(function(i){var o=n[i];if(a.isValidElement(o)){var c=i in t,u=i in l,p=t[i],d=a.isValidElement(p)&&!p.props.in;u&&(!c||d)?n[i]=a.cloneElement(o,{onExited:r.bind(null,o),in:!0,exit:S(o,"exit",e),enter:S(o,"enter",e)}):!u&&c&&!d?n[i]=a.cloneElement(o,{in:!1}):u&&c&&a.isValidElement(p)&&(n[i]=a.cloneElement(o,{onExited:r.bind(null,o),in:p.props.in,exit:S(o,"exit",e),enter:S(o,"enter",e)}))}}),n}var st=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},at={component:"div",childFactory:function(t){return t}},se=function(e){He(t,e);function t(l,n){var i;i=e.call(this,l,n)||this;var o=i.handleExited.bind(Ye(i));return i.state={contextValue:{isMounting:!0},handleExited:o,firstRender:!0},i}var r=t.prototype;return r.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},r.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(n,i){var o=i.children,c=i.handleExited,u=i.firstRender;return{children:u?rt(n,c):ot(n,o,c),firstRender:!1}},r.handleExited=function(n,i){var o=oe(this.props.children);n.key in o||(n.props.onExited&&n.props.onExited(i),this.mounted&&this.setState(function(c){var u=Xe({},c.children);return delete u[n.key],{children:u}}))},r.render=function(){var n=this.props,i=n.component,o=n.childFactory,c=Ke(n,["component","childFactory"]),u=this.state.contextValue,p=st(this.state.children).map(o);return delete c.appear,delete c.enter,delete c.exit,i===null?X.createElement(pe.Provider,{value:u},p):X.createElement(pe.Provider,{value:u},X.createElement(i,c,p))},t}(X.Component);se.propTypes={};se.defaultProps=at;function lt(e){const{className:t,classes:r,pulsate:l=!1,rippleX:n,rippleY:i,rippleSize:o,in:c,onExited:u,timeout:p}=e,[d,g]=a.useState(!1),b=x(t,r.ripple,r.rippleVisible,l&&r.ripplePulsate),C={width:o,height:o,top:-(o/2)+i,left:-(o/2)+n},h=x(r.child,d&&r.childLeaving,l&&r.childPulsate);return!c&&!d&&g(!0),a.useEffect(()=>{if(!c&&u!=null){const R=setTimeout(u,p);return()=>{clearTimeout(R)}}},[u,c,p]),N.jsx("span",{className:b,style:C,children:N.jsx("span",{className:h})})}const m=ye("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),ut=["center","classes","className"];let q=e=>e,de,he,me,be;const ne=550,ct=80,pt=ie(de||(de=q`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),ft=ie(he||(he=q`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),dt=ie(me||(me=q`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),ht=re("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),mt=re(lt,{name:"MuiTouchRipple",slot:"Ripple"})(be||(be=q`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),m.rippleVisible,pt,ne,({theme:e})=>e.transitions.easing.easeInOut,m.ripplePulsate,({theme:e})=>e.transitions.duration.shorter,m.child,m.childLeaving,ft,ne,({theme:e})=>e.transitions.easing.easeInOut,m.childPulsate,dt,({theme:e})=>e.transitions.easing.easeInOut),bt=a.forwardRef(function(t,r){const l=ge({props:t,name:"MuiTouchRipple"}),{center:n=!1,classes:i={},className:o}=l,c=Re(l,ut),[u,p]=a.useState([]),d=a.useRef(0),g=a.useRef(null);a.useEffect(()=>{g.current&&(g.current(),g.current=null)},[u]);const b=a.useRef(!1),C=We(),h=a.useRef(null),R=a.useRef(null),I=a.useCallback(f=>{const{pulsate:y,rippleX:M,rippleY:D,rippleSize:j,cb:K}=f;p(E=>[...E,N.jsx(mt,{classes:{ripple:x(i.ripple,m.ripple),rippleVisible:x(i.rippleVisible,m.rippleVisible),ripplePulsate:x(i.ripplePulsate,m.ripplePulsate),child:x(i.child,m.child),childLeaving:x(i.childLeaving,m.childLeaving),childPulsate:x(i.childPulsate,m.childPulsate)},timeout:ne,pulsate:y,rippleX:M,rippleY:D,rippleSize:j},d.current)]),d.current+=1,g.current=K},[i]),$=a.useCallback((f={},y={},M=()=>{})=>{const{pulsate:D=!1,center:j=n||y.pulsate,fakeElement:K=!1}=y;if((f==null?void 0:f.type)==="mousedown"&&b.current){b.current=!1;return}(f==null?void 0:f.type)==="touchstart"&&(b.current=!0);const E=K?null:R.current,w=E?E.getBoundingClientRect():{width:0,height:0,left:0,top:0};let v,B,L;if(j||f===void 0||f.clientX===0&&f.clientY===0||!f.clientX&&!f.touches)v=Math.round(w.width/2),B=Math.round(w.height/2);else{const{clientX:F,clientY:V}=f.touches&&f.touches.length>0?f.touches[0]:f;v=Math.round(F-w.left),B=Math.round(V-w.top)}if(j)L=Math.sqrt((2*w.width**2+w.height**2)/3),L%2===0&&(L+=1);else{const F=Math.max(Math.abs((E?E.clientWidth:0)-v),v)*2+2,V=Math.max(Math.abs((E?E.clientHeight:0)-B),B)*2+2;L=Math.sqrt(F**2+V**2)}f!=null&&f.touches?h.current===null&&(h.current=()=>{I({pulsate:D,rippleX:v,rippleY:B,rippleSize:L,cb:M})},C.start(ct,()=>{h.current&&(h.current(),h.current=null)})):I({pulsate:D,rippleX:v,rippleY:B,rippleSize:L,cb:M})},[n,I,C]),U=a.useCallback(()=>{$({},{pulsate:!0})},[$]),_=a.useCallback((f,y)=>{if(C.clear(),(f==null?void 0:f.type)==="touchend"&&h.current){h.current(),h.current=null,C.start(0,()=>{_(f,y)});return}h.current=null,p(M=>M.length>0?M.slice(1):M),g.current=y},[C]);return a.useImperativeHandle(r,()=>({pulsate:U,start:$,stop:_}),[U,$,_]),N.jsx(ht,H({className:x(m.root,i.root,o),ref:R},c,{children:N.jsx(se,{component:null,exit:!0,children:u})}))});function gt(e){return Oe("MuiButtonBase",e)}const Rt=ye("MuiButtonBase",["root","disabled","focusVisible"]),yt=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],Mt=e=>{const{disabled:t,focusVisible:r,focusVisibleClassName:l,classes:n}=e,o=ze({root:["root",t&&"disabled",r&&"focusVisible"]},gt,n);return r&&l&&(o.root+=` ${l}`),o},Et=re("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${Rt.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),Lt=a.forwardRef(function(t,r){const l=ge({props:t,name:"MuiButtonBase"}),{action:n,centerRipple:i=!1,children:o,className:c,component:u="button",disabled:p=!1,disableRipple:d=!1,disableTouchRipple:g=!1,focusRipple:b=!1,LinkComponent:C="a",onBlur:h,onClick:R,onContextMenu:I,onDragLeave:$,onFocus:U,onFocusVisible:_,onKeyDown:f,onKeyUp:y,onMouseDown:M,onMouseLeave:D,onMouseUp:j,onTouchEnd:K,onTouchMove:E,onTouchStart:w,tabIndex:v=0,TouchRippleProps:B,touchRippleRef:L,type:F}=l,V=Re(l,yt),O=a.useRef(null),T=a.useRef(null),Me=fe(T,L),{isFocusVisibleRef:ae,onFocus:Ee,onBlur:Te,ref:xe}=nt(),[k,A]=a.useState(!1);p&&k&&A(!1),a.useImperativeHandle(n,()=>({focusVisible:()=>{A(!0),O.current.focus()}}),[]);const[J,Ce]=a.useState(!1);a.useEffect(()=>{Ce(!0)},[]);const ve=J&&!d&&!p;a.useEffect(()=>{k&&b&&!d&&J&&T.current.pulsate()},[d,b,k,J]);function P(s,ue,Ue=g){return Y(ce=>(ue&&ue(ce),!Ue&&T.current&&T.current[s](ce),!0))}const Ve=P("start",M),Pe=P("stop",I),we=P("stop",$),Be=P("stop",j),Le=P("stop",s=>{k&&s.preventDefault(),D&&D(s)}),De=P("start",w),Fe=P("stop",K),ke=P("stop",E),Se=P("stop",s=>{Te(s),ae.current===!1&&A(!1),h&&h(s)},!1),Ne=Y(s=>{O.current||(O.current=s.currentTarget),Ee(s),ae.current===!0&&(A(!0),_&&_(s)),U&&U(s)}),Q=()=>{const s=O.current;return u&&u!=="button"&&!(s.tagName==="A"&&s.href)},Z=a.useRef(!1),$e=Y(s=>{b&&!Z.current&&k&&T.current&&s.key===" "&&(Z.current=!0,T.current.stop(s,()=>{T.current.start(s)})),s.target===s.currentTarget&&Q()&&s.key===" "&&s.preventDefault(),f&&f(s),s.target===s.currentTarget&&Q()&&s.key==="Enter"&&!p&&(s.preventDefault(),R&&R(s))}),_e=Y(s=>{b&&s.key===" "&&T.current&&k&&!s.defaultPrevented&&(Z.current=!1,T.current.stop(s,()=>{T.current.pulsate(s)})),y&&y(s),R&&s.target===s.currentTarget&&Q()&&s.key===" "&&!s.defaultPrevented&&R(s)});let W=u;W==="button"&&(V.href||V.to)&&(W=C);const z={};W==="button"?(z.type=F===void 0?"button":F,z.disabled=p):(!V.href&&!V.to&&(z.role="button"),p&&(z["aria-disabled"]=p));const je=fe(r,xe,O),le=H({},l,{centerRipple:i,component:u,disabled:p,disableRipple:d,disableTouchRipple:g,focusRipple:b,tabIndex:v,focusVisible:k}),Ie=Mt(le);return N.jsxs(Et,H({as:W,className:x(Ie.root,c),ownerState:le,onBlur:Se,onClick:R,onContextMenu:Pe,onFocus:Ne,onKeyDown:$e,onKeyUp:_e,onMouseDown:Ve,onMouseLeave:Le,onMouseUp:Be,onDragLeave:we,onTouchEnd:Fe,onTouchMove:ke,onTouchStart:De,ref:je,tabIndex:p?-1:v,type:F},z,V,{children:[o,ve?N.jsx(bt,H({ref:Me,center:i},B)):null]}))});export{Lt as B,nt as u};
