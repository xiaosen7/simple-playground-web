import{r as n,R as f}from"./index-CBqU2yxZ.js";function d(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const h=typeof window<"u"?n.useLayoutEffect:n.useEffect;function L(e){const t=n.useRef(e);return h(()=>{t.current=e}),n.useRef((...r)=>(0,t.current)(...r)).current}function V(...e){return n.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(r=>{d(r,t)})},e)}const o={};function y(e,t){const r=n.useRef(o);return r.current===o&&(r.current=e(t)),r}const E=[];function m(e){n.useEffect(e,E)}class s{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new s}start(t,r){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,r()},t)}}function g(){const e=y(s.create).current;return m(e.disposeEffect),e}let i=!0,a=!1;const b=new s,p={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function R(e){const{type:t,tagName:r}=e;return!!(r==="INPUT"&&p[t]&&!e.readOnly||r==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function T(e){e.metaKey||e.altKey||e.ctrlKey||(i=!0)}function c(){i=!1}function w(){this.visibilityState==="hidden"&&a&&(i=!0)}function I(e){e.addEventListener("keydown",T,!0),e.addEventListener("mousedown",c,!0),e.addEventListener("pointerdown",c,!0),e.addEventListener("touchstart",c,!0),e.addEventListener("visibilitychange",w,!0)}function v(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return i||R(t)}function C(){const e=n.useCallback(u=>{u!=null&&I(u.ownerDocument)},[]),t=n.useRef(!1);function r(){return t.current?(a=!0,b.start(100,()=>{a=!1}),t.current=!1,!0):!1}function l(u){return v(u)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:l,onBlur:r,ref:e}}const K=f.createContext(null);export{K as T,V as a,C as b,L as c,h as d,d as s,g as u};
