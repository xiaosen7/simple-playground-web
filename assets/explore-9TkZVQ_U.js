import{r as x,R as Pe}from"./index-CBqU2yxZ.js";import{c as lt}from"./index-Bl6ORisp.js";import{e as at,j as ct}from"./FileSaver.min-GPj8h9Dk.js";import{u as ut}from"./index-BisR2S7Q.js";import{M as De,N as dt,a as ge,g as he,s as q,_ as k,b as be,O as pt,d as ft,j as v,f as xe,h as ye,q as H,o as Ee,p as Te,u as Oe}from"./subs-Cgx4Eb1R.js";import{T as mt,g as $e,u as It,r as we}from"./utils-DhJlWgJ7.js";import{_ as w}from"./emotion-use-insertion-effect-with-fallbacks.browser.esm-BPGUNDjC.js";import{b as gt,a as re,d as W}from"./TransitionGroupContext-CoLYZPpo.js";import{b as Fe,o as ht,c as je,u as G,r as B}from"./useSlotProps-CeQ2hkUT.js";import{P as ke}from"./index-D3ylJrlI.js";function bt(e,t=0,n=1){return dt(e,t,n)}function xt(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,s)=>s<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Ve(e){if(e.type)return e;if(e.charAt(0)==="#")return Ve(xt(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(De(9,e));let r=e.substring(t+1,e.length-1),s;if(n==="color"){if(r=r.split(" "),s=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(s)===-1)throw new Error(De(10,s))}else r=r.split(",");return r=r.map(d=>parseFloat(d)),{type:n,values:r,colorSpace:s}}function yt(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((s,d)=>d<3?parseInt(s,10):s):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function ne(e,t){return e=Ve(e),t=bt(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,yt(e)}function Et(e){return ge("MuiCollapse",e)}he("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);const Tt=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],wt=e=>{const{orientation:t,classes:n}=e,r={root:["root",`${t}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${t}`],wrapperInner:["wrapperInner",`${t}`]};return ye(r,Et,n)},vt=q("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.orientation],n.state==="entered"&&t.entered,n.state==="exited"&&!n.in&&n.collapsedSize==="0px"&&t.hidden]}})(({theme:e,ownerState:t})=>k({height:0,overflow:"hidden",transition:e.transitions.create("height")},t.orientation==="horizontal"&&{height:"auto",width:0,transition:e.transitions.create("width")},t.state==="entered"&&k({height:"auto",overflow:"visible"},t.orientation==="horizontal"&&{width:"auto"}),t.state==="exited"&&!t.in&&t.collapsedSize==="0px"&&{visibility:"hidden"})),Rt=q("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(e,t)=>t.wrapper})(({ownerState:e})=>k({display:"flex",width:"100%"},e.orientation==="horizontal"&&{width:"auto",height:"100%"})),Ct=q("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(e,t)=>t.wrapperInner})(({ownerState:e})=>k({width:"100%"},e.orientation==="horizontal"&&{width:"auto",height:"100%"})),_e=x.forwardRef(function(t,n){const r=be({props:t,name:"MuiCollapse"}),{addEndListener:s,children:d,className:u,collapsedSize:l="0px",component:m,easing:p,in:I,onEnter:o,onEntered:i,onEntering:y,onExit:g,onExited:a,onExiting:h,orientation:f="vertical",style:c,timeout:b=pt.standard,TransitionComponent:R=mt}=r,C=ft(r,Tt),P=k({},r,{orientation:f,collapsedSize:l}),S=wt(P),Z=Fe(),ae=gt(),j=x.useRef(null),V=x.useRef(),N=typeof l=="number"?`${l}px`:l,A=f==="horizontal",D=A?"width":"height",z=x.useRef(null),J=re(n,z),F=E=>M=>{if(E){const $=z.current;M===void 0?E($):E($,M)}},K=()=>j.current?j.current[A?"clientWidth":"clientHeight"]:0,O=F((E,M)=>{j.current&&A&&(j.current.style.position="absolute"),E.style[D]=N,o&&o(E,M)}),ee=F((E,M)=>{const $=K();j.current&&A&&(j.current.style.position="");const{duration:U,easing:_}=$e({style:c,timeout:b,easing:p},{mode:"enter"});if(b==="auto"){const te=Z.transitions.getAutoHeightDuration($);E.style.transitionDuration=`${te}ms`,V.current=te}else E.style.transitionDuration=typeof U=="string"?U:`${U}ms`;E.style[D]=`${$}px`,E.style.transitionTimingFunction=_,y&&y(E,M)}),ce=F((E,M)=>{E.style[D]="auto",i&&i(E,M)}),Q=F(E=>{E.style[D]=`${K()}px`,g&&g(E)}),ue=F(a),de=F(E=>{const M=K(),{duration:$,easing:U}=$e({style:c,timeout:b,easing:p},{mode:"exit"});if(b==="auto"){const _=Z.transitions.getAutoHeightDuration(M);E.style.transitionDuration=`${_}ms`,V.current=_}else E.style.transitionDuration=typeof $=="string"?$:`${$}ms`;E.style[D]=N,E.style.transitionTimingFunction=U,h&&h(E)}),pe=E=>{b==="auto"&&ae.start(V.current||0,E),s&&s(z.current,E)};return v.jsx(R,k({in:I,onEnter:O,onEntered:ce,onEntering:ee,onExit:Q,onExited:ue,onExiting:de,addEndListener:pe,nodeRef:z,timeout:b==="auto"?null:b},C,{children:(E,M)=>v.jsx(vt,k({as:m,className:xe(S.root,u,{entered:S.entered,exited:!I&&N==="0px"&&S.hidden}[E]),style:k({[A?"minWidth":"minHeight"]:N},c),ref:J},M,{ownerState:k({},P,{state:E}),children:v.jsx(Rt,{ownerState:k({},P,{state:E}),className:S.wrapper,ref:j,children:v.jsx(Ct,{ownerState:k({},P,{state:E}),className:S.wrapperInner,children:d})})}))}))});_e.muiSupportAuto=!0;function St(e){return ge("MuiRichTreeView",e)}he("MuiRichTreeView",["root"]);const Mt=(e,t)=>{const n=x.useRef({}),[r,s]=x.useState(()=>{const u={};return e.forEach(l=>{l.models&&Object.entries(l.models).forEach(([m,p])=>{n.current[m]={isControlled:t[m]!==void 0,getDefaultValue:p.getDefaultValue},u[m]=p.getDefaultValue(t)})}),u});return Object.fromEntries(Object.entries(n.current).map(([u,l])=>{const m=t[u]??r[u];return[u,{value:m,setControlledValue:p=>{l.isControlled||s(I=>w({},I,{[u]:p}))}}]}))};class Pt{constructor(){this.maxListeners=20,this.warnOnce=!1,this.events={}}on(t,n,r={}){let s=this.events[t];s||(s={highPriority:new Map,regular:new Map},this.events[t]=s),r.isFirst?s.highPriority.set(n,!0):s.regular.set(n,!0)}removeListener(t,n){this.events[t]&&(this.events[t].regular.delete(n),this.events[t].highPriority.delete(n))}removeAllListeners(){this.events={}}emit(t,...n){const r=this.events[t];if(!r)return;const s=Array.from(r.highPriority.keys()),d=Array.from(r.regular.keys());for(let u=s.length-1;u>=0;u-=1){const l=s[u];r.highPriority.has(l)&&l.apply(this,n)}for(let u=0;u<d.length;u+=1){const l=d[u];r.regular.has(l)&&l.apply(this,n)}}once(t,n){const r=this;this.on(t,function s(...d){r.removeListener(t,s),n.apply(r,d)})}}const Dt=e=>e.isPropagationStopped!==void 0,Le=()=>{const[e]=x.useState(()=>new Pt),t=x.useCallback((...r)=>{const[s,d,u={}]=r;u.defaultMuiPrevented=!1,!(Dt(u)&&u.isPropagationStopped())&&e.emit(s,d,u)},[e]),n=x.useCallback((r,s)=>(e.on(r,s),()=>{e.removeListener(r,s)}),[e]);return{instance:{$$publishEvent:t,$$subscribeEvent:n}}};Le.params={};const Ot=[Le];function $t(e){const t=x.useRef({});return e?(e.current==null&&(e.current={}),e.current):t.current}const kt=e=>{const t=[...Ot,...e.plugins],n=t.reduce((f,c)=>c.getDefaultizedParams?c.getDefaultizedParams(f):f,e),r=Mt(t,n),d=x.useRef({}).current,u=$t(e.apiRef),l=x.useRef(null),m=re(l,e.rootRef),[p,I]=x.useState(()=>{const f={};return t.forEach(c=>{c.getInitialState&&Object.assign(f,c.getInitialState(n))}),f}),o=[],i={publicAPI:u,instance:d,rootRef:l},y=f=>{const c=f({instance:d,params:n,slots:n.slots,slotProps:n.slotProps,state:p,setState:I,rootRef:l,models:r});c.getRootProps&&o.push(c.getRootProps),c.publicAPI&&Object.assign(u,c.publicAPI),c.instance&&Object.assign(d,c.instance),c.contextValue&&Object.assign(i,c.contextValue)};t.forEach(y),i.runItemPlugins=f=>{let c=null,b=null;return t.forEach(R=>{if(!R.itemPlugin)return;const C=R.itemPlugin({props:f,rootRef:c,contentRef:b});C!=null&&C.rootRef&&(c=C.rootRef),C!=null&&C.contentRef&&(b=C.contentRef)}),{contentRef:b,rootRef:c}};const g=t.map(f=>f.wrapItem).filter(f=>!!f);i.wrapItem=({itemId:f,children:c})=>{let b=c;return g.forEach(R=>{b=R({itemId:f,children:b})}),b};const a=t.map(f=>f.wrapRoot).filter(f=>!!f);return i.wrapRoot=({children:f})=>{let c=f;return a.forEach(b=>{c=b({children:c})}),c},{getRootProps:(f={})=>{const c=w({role:"tree"},f,{ref:m});return o.forEach(b=>{Object.assign(c,b(f))}),c},rootRef:m,contextValue:i,instance:d}},Ne=x.createContext(null);function At(e){const{value:t,children:n}=e;return v.jsx(Ne.Provider,{value:t,children:t.wrapRoot({children:n})})}const ze=({params:e})=>{const t=It(e.id),n=x.useCallback((r,s)=>s??`${t}-${r}`,[t]);return{getRootProps:()=>({id:t}),instance:{getTreeItemIdAttribute:n}}};ze.params={id:!0};const Ft=(e,t,n)=>{e.$$publishEvent(t,n)},Y="__TREE_VIEW_ROOT_PARENT_ID__",jt=e=>{const t={};return e.forEach((n,r)=>{t[n]=r}),t},Ke=({items:e,isItemDisabled:t,getItemLabel:n,getItemId:r})=>{const s={},d={},u={[Y]:[]},l=(p,I)=>{var g,a;const o=r?r(p):p.id;if(o==null)throw new Error(["MUI X: The Tree View component requires all items to have a unique `id` property.","Alternatively, you can use the `getItemId` prop to specify a custom id for each item.","An item was provided without id in the `items` prop:",JSON.stringify(p)].join(`
`));if(s[o]!=null)throw new Error(["MUI X: The Tree View component requires all items to have a unique `id` property.","Alternatively, you can use the `getItemId` prop to specify a custom id for each item.",`Two items were provided with the same id in the \`items\` prop: "${o}"`].join(`
`));const i=n?n(p):p.label;if(i==null)throw new Error(["MUI X: The Tree View component requires all items to have a `label` property.","Alternatively, you can use the `getItemLabel` prop to specify a custom label for each item.","An item was provided without label in the `items` prop:",JSON.stringify(p)].join(`
`));s[o]={id:o,label:i,parentId:I,idAttribute:void 0,expandable:!!((g=p.children)!=null&&g.length),disabled:t?t(p):!1},d[o]=p,u[o]=[];const y=I??Y;u[y]||(u[y]=[]),u[y].push(o),(a=p.children)==null||a.forEach(h=>l(h,o))};e.forEach(p=>l(p,null));const m={};return Object.keys(u).forEach(p=>{m[p]=jt(u[p])}),{itemMetaMap:s,itemMap:d,itemOrderedChildrenIds:u,itemChildrenIndexes:m}},se=({instance:e,params:t,state:n,setState:r})=>{const s=x.useCallback(g=>n.items.itemMetaMap[g],[n.items.itemMetaMap]),d=x.useCallback(g=>n.items.itemMap[g],[n.items.itemMap]),u=x.useCallback(g=>{if(g==null)return!1;let a=e.getItemMeta(g);if(!a)return!1;if(a.disabled)return!0;for(;a.parentId!=null;)if(a=e.getItemMeta(a.parentId),a.disabled)return!0;return!1},[e]),l=x.useCallback(g=>{const a=e.getItemMeta(g).parentId??Y;return n.items.itemChildrenIndexes[a][g]},[e,n.items.itemChildrenIndexes]),m=x.useCallback(g=>n.items.itemOrderedChildrenIds[g??Y]??[],[n.items.itemOrderedChildrenIds]),p=g=>t.disabledItemsFocusable?!0:!e.isItemDisabled(g),I=x.useRef(!1),o=x.useCallback(()=>{I.current=!0},[]),i=x.useCallback(()=>I.current,[]);return x.useEffect(()=>{e.areItemUpdatesPrevented()||r(g=>{const a=Ke({items:t.items,isItemDisabled:t.isItemDisabled,getItemId:t.getItemId,getItemLabel:t.getItemLabel});return Object.values(g.items.itemMetaMap).forEach(h=>{a.itemMetaMap[h.id]||Ft(e,"removeItem",{id:h.id})}),w({},g,{items:a})})},[e,r,t.items,t.isItemDisabled,t.getItemId,t.getItemLabel]),{publicAPI:{getItem:d},instance:{getItemMeta:s,getItem:d,getItemsToRender:()=>{const g=a=>{const h=n.items.itemMetaMap[a];return{label:h.label,itemId:h.id,id:h.idAttribute,children:n.items.itemOrderedChildrenIds[a].map(g)}};return n.items.itemOrderedChildrenIds[Y].map(g)},getItemIndex:l,getItemOrderedChildrenIds:m,isItemDisabled:u,isItemNavigable:p,preventItemUpdates:o,areItemUpdatesPrevented:i},contextValue:{disabledItemsFocusable:t.disabledItemsFocusable}}};se.getInitialState=e=>({items:Ke({items:e.items,isItemDisabled:e.isItemDisabled,getItemId:e.getItemId,getItemLabel:e.getItemLabel})});se.getDefaultizedParams=e=>w({},e,{disabledItemsFocusable:e.disabledItemsFocusable??!1});se.params={disabledItemsFocusable:!0,items:!0,isItemDisabled:!0,getItemLabel:!0,getItemId:!0};const ie=({instance:e,params:t,models:n})=>{const r=x.useMemo(()=>{const I=new Map;return n.expandedItems.value.forEach(o=>{I.set(o,!0)}),I},[n.expandedItems.value]),s=(I,o)=>{var i;(i=t.onExpandedItemsChange)==null||i.call(t,I,o),n.expandedItems.setControlledValue(o)},d=x.useCallback(I=>r.has(I),[r]),u=x.useCallback(I=>{var o;return!!((o=e.getItemMeta(I))!=null&&o.expandable)},[e]),l=W((I,o)=>{const i=e.isItemExpanded(o);e.setItemExpansion(I,o,!i)}),m=W((I,o,i)=>{if(e.isItemExpanded(o)===i)return;let g;i?g=[o].concat(n.expandedItems.value):g=n.expandedItems.value.filter(a=>a!==o),t.onItemExpansionToggle&&t.onItemExpansionToggle(I,o,i),s(I,g)});return{publicAPI:{setItemExpansion:m},instance:{isItemExpanded:d,isItemExpandable:u,setItemExpansion:m,toggleItemExpansion:l,expandAllSiblings:(I,o)=>{const i=e.getItemMeta(o),g=e.getItemOrderedChildrenIds(i.parentId).filter(h=>e.isItemExpandable(h)&&!e.isItemExpanded(h)),a=n.expandedItems.value.concat(g);g.length>0&&(t.onItemExpansionToggle&&g.forEach(h=>{t.onItemExpansionToggle(I,h,!0)}),s(I,a))}}}};ie.models={expandedItems:{getDefaultValue:e=>e.defaultExpandedItems}};const Vt=[];ie.getDefaultizedParams=e=>w({},e,{defaultExpandedItems:e.defaultExpandedItems??Vt});ie.params={expandedItems:!0,defaultExpandedItems:!0,onExpandedItemsChange:!0,onItemExpansionToggle:!0};const Ue=(e,t)=>{let n=t.length-1;for(;n>=0&&!e.isItemNavigable(t[n]);)n-=1;if(n!==-1)return t[n]},_t=(e,t)=>{const n=e.getItemMeta(t),r=e.getItemOrderedChildrenIds(n.parentId),s=e.getItemIndex(t);if(s===0)return n.parentId;let d=r[s-1],u=Ue(e,e.getItemOrderedChildrenIds(d));for(;e.isItemExpanded(d)&&u!=null;)d=u,u=e.getItemOrderedChildrenIds(d).find(e.isItemNavigable);return d},oe=(e,t)=>{if(e.isItemExpanded(t)){const r=e.getItemOrderedChildrenIds(t).find(e.isItemNavigable);if(r!=null)return r}let n=e.getItemMeta(t);for(;n!=null;){const r=e.getItemOrderedChildrenIds(n.parentId),s=e.getItemIndex(n.id);if(s<r.length-1){let d=s+1;for(;!e.isItemNavigable(r[d])&&d<r.length-1;)d+=1;if(e.isItemNavigable(r[d]))return r[d]}n=e.getItemMeta(n.parentId)}return null},We=e=>{let t=null;for(;t==null||e.isItemExpanded(t);){const n=e.getItemOrderedChildrenIds(t),r=Ue(e,n);if(r==null)return t;t=r}return t},X=e=>e.getItemOrderedChildrenIds(null).find(e.isItemNavigable),qe=(e,t,n)=>{if(t===n)return[t,n];const r=e.getItemMeta(t),s=e.getItemMeta(n);if(r.parentId===s.id||s.parentId===r.id)return s.parentId===r.id?[r.id,s.id]:[s.id,r.id];const d=[r.id],u=[s.id];let l=r.parentId,m=s.parentId,p=u.indexOf(l)!==-1,I=d.indexOf(m)!==-1,o=!0,i=!0;for(;!I&&!p;)o&&(d.push(l),p=u.indexOf(l)!==-1,o=l!==null,!p&&o&&(l=e.getItemMeta(l).parentId)),i&&!p&&(u.push(m),I=d.indexOf(m)!==-1,i=m!==null,!I&&i&&(m=e.getItemMeta(m).parentId));const y=p?l:m,g=e.getItemOrderedChildrenIds(y),a=d[d.indexOf(y)-1],h=u[u.indexOf(y)-1];return g.indexOf(a)<g.indexOf(h)?[t,n]:[n,t]},Lt=(e,t,n)=>{const r=m=>{if(e.isItemExpandable(m)&&e.isItemExpanded(m))return e.getItemOrderedChildrenIds(m)[0];let p=e.getItemMeta(m);for(;p!=null;){const I=e.getItemOrderedChildrenIds(p.parentId),o=e.getItemIndex(p.id);if(o<I.length-1)return I[o+1];p=e.getItemMeta(p.parentId)}throw new Error("Invalid range")},[s,d]=qe(e,t,n),u=[s];let l=s;for(;l!==d;)l=r(l),e.isItemDisabled(l)||u.push(l);return u},Nt=e=>{let t=X(e);const n=[];for(;t!=null;)n.push(t),t=oe(e,t);return n},me=e=>Array.isArray(e)?e:e!=null?[e]:[],Ie=e=>{const t={};return e.forEach(n=>{t[n]=!0}),t},le=({instance:e,params:t,models:n})=>{const r=x.useRef(null),s=x.useRef({}),d=x.useMemo(()=>{const a=new Map;return Array.isArray(n.selectedItems.value)?n.selectedItems.value.forEach(h=>{a.set(h,!0)}):n.selectedItems.value!=null&&a.set(n.selectedItems.value,!0),a},[n.selectedItems.value]),u=(a,h)=>{if(t.onItemSelectionToggle)if(t.multiSelect){const f=h.filter(b=>!e.isItemSelected(b)),c=n.selectedItems.value.filter(b=>!h.includes(b));f.forEach(b=>{t.onItemSelectionToggle(a,b,!0)}),c.forEach(b=>{t.onItemSelectionToggle(a,b,!1)})}else h!==n.selectedItems.value&&(n.selectedItems.value!=null&&t.onItemSelectionToggle(a,n.selectedItems.value,!1),h!=null&&t.onItemSelectionToggle(a,h,!0));t.onSelectedItemsChange&&t.onSelectedItemsChange(a,h),n.selectedItems.setControlledValue(h)},l=a=>d.has(a),m=(a,h,f=!1)=>{if(t.disableSelection)return;let c;if(f){const b=me(n.selectedItems.value);e.isItemSelected(h)?c=b.filter(R=>R!==h):c=[h].concat(b)}else c=t.multiSelect?[h]:h;u(a,c),r.current=h,s.current={}},p=(a,[h,f])=>{if(t.disableSelection||!t.multiSelect)return;let c=me(n.selectedItems.value).slice();Object.keys(s.current).length>0&&(c=c.filter(P=>!s.current[P]));const b=Ie(c),R=Lt(e,h,f),C=R.filter(P=>!b[P]);c=c.concat(C),u(a,c),s.current=Ie(R)};return{getRootProps:()=>({"aria-multiselectable":t.multiSelect}),instance:{isItemSelected:l,selectItem:m,selectAllNavigableItems:a=>{if(t.disableSelection||!t.multiSelect)return;const h=Nt(e);u(a,h),s.current=Ie(h)},expandSelectionRange:(a,h)=>{if(r.current!=null){const[f,c]=qe(e,h,r.current);p(a,[f,c])}},selectRangeFromStartToItem:(a,h)=>{p(a,[X(e),h])},selectRangeFromItemToEnd:(a,h)=>{p(a,[h,We(e)])},selectItemFromArrowNavigation:(a,h,f)=>{if(t.disableSelection||!t.multiSelect)return;let c=me(n.selectedItems.value).slice();Object.keys(s.current).length===0?(c.push(f),s.current={[h]:!0,[f]:!0}):(s.current[h]||(s.current={}),s.current[f]?(c=c.filter(b=>b!==h),delete s.current[h]):(c.push(f),s.current[f]=!0)),u(a,c)}},contextValue:{selection:{multiSelect:t.multiSelect}}}};le.models={selectedItems:{getDefaultValue:e=>e.defaultSelectedItems}};const zt=[];le.getDefaultizedParams=e=>w({},e,{disableSelection:e.disableSelection??!1,multiSelect:e.multiSelect??!1,defaultSelectedItems:e.defaultSelectedItems??(e.multiSelect?zt:null)});le.params={disableSelection:!0,multiSelect:!0,defaultSelectedItems:!0,selectedItems:!0,onSelectedItemsChange:!0,onItemSelectionToggle:!0};const Ae=1e3;class Kt{constructor(t=Ae){this.timeouts=new Map,this.cleanupTimeout=Ae,this.cleanupTimeout=t}register(t,n,r){this.timeouts||(this.timeouts=new Map);const s=setTimeout(()=>{typeof n=="function"&&n(),this.timeouts.delete(r.cleanupToken)},this.cleanupTimeout);this.timeouts.set(r.cleanupToken,s)}unregister(t){const n=this.timeouts.get(t.cleanupToken);n&&(this.timeouts.delete(t.cleanupToken),clearTimeout(n))}reset(){this.timeouts&&(this.timeouts.forEach((t,n)=>{this.unregister({cleanupToken:n})}),this.timeouts=void 0)}}class Ut{constructor(){this.registry=new FinalizationRegistry(t=>{typeof t=="function"&&t()})}register(t,n,r){this.registry.register(t,n,r)}unregister(t){this.registry.unregister(t)}reset(){}}class Wt{}function qt(e){let t=0;return function(r,s,d){e.registry===null&&(e.registry=typeof FinalizationRegistry<"u"?new Ut:new Kt);const[u]=x.useState(new Wt),l=x.useRef(null),m=x.useRef();m.current=d;const p=x.useRef(null);if(!l.current&&m.current){const I=(o,i)=>{var y;i.defaultMuiPrevented||(y=m.current)==null||y.call(m,o,i)};l.current=r.$$subscribeEvent(s,I),t+=1,p.current={cleanupToken:t},e.registry.register(u,()=>{var o;(o=l.current)==null||o.call(l),l.current=null,p.current=null},p.current)}else!m.current&&l.current&&(l.current(),l.current=null,p.current&&(e.registry.unregister(p.current),p.current=null));x.useEffect(()=>{if(!l.current&&m.current){const I=(o,i)=>{var y;i.defaultMuiPrevented||(y=m.current)==null||y.call(m,o,i)};l.current=r.$$subscribeEvent(s,I)}return p.current&&e.registry&&(e.registry.unregister(p.current),p.current=null),()=>{var I;(I=l.current)==null||I.call(l),l.current=null}},[r,s])}}const Bt={registry:null},Ht=qt(Bt),Be=(e=document)=>{const t=e.activeElement;return t?t.shadowRoot?Be(t.shadowRoot):t:null},Gt=(e,t)=>{const n=s=>{const d=e.getItemMeta(s);return d&&(d.parentId==null||e.isItemExpanded(d.parentId))};let r;return Array.isArray(t)?r=t.find(n):t!=null&&n(t)&&(r=t),r==null&&(r=X(e)),r},ve=({instance:e,params:t,state:n,setState:r,models:s,rootRef:d})=>{const u=Gt(e,s.selectedItems.value),l=W(f=>{const c=typeof f=="function"?f(n.focusedItemId):f;n.focusedItemId!==c&&r(b=>w({},b,{focusedItemId:c}))}),m=x.useCallback(()=>!!d.current&&d.current.contains(Be(ht(d.current))),[d]),p=x.useCallback(f=>n.focusedItemId===f&&m(),[n.focusedItemId,m]),I=f=>{const c=e.getItemMeta(f);return c&&(c.parentId==null||e.isItemExpanded(c.parentId))},o=(f,c)=>{const b=e.getItemMeta(c),R=document.getElementById(e.getTreeItemIdAttribute(c,b.idAttribute));R&&R.focus(),l(c),t.onItemFocus&&t.onItemFocus(f,c)},i=W((f,c)=>{I(c)&&o(f,c)}),y=W(f=>{let c;Array.isArray(s.selectedItems.value)?c=s.selectedItems.value.find(I):s.selectedItems.value!=null&&I(s.selectedItems.value)&&(c=s.selectedItems.value),c==null&&(c=X(e)),o(f,c)}),g=W(()=>{if(n.focusedItemId==null)return;const f=e.getItemMeta(n.focusedItemId);if(f){const c=document.getElementById(e.getTreeItemIdAttribute(n.focusedItemId,f.idAttribute));c&&c.blur()}l(null)}),a=f=>f===u;Ht(e,"removeItem",({id:f})=>{n.focusedItemId===f&&e.focusDefaultItem(null)});const h=f=>c=>{var b;(b=f.onFocus)==null||b.call(f,c),!c.defaultMuiPrevented&&c.target===c.currentTarget&&e.focusDefaultItem(c)};return{getRootProps:f=>({onFocus:h(f)}),publicAPI:{focusItem:i},instance:{isItemFocused:p,canItemBeTabbed:a,focusItem:i,focusDefaultItem:y,removeFocusedItem:g}}};ve.getInitialState=()=>({focusedItemId:null});ve.params={onItemFocus:!0};function Xt(e){return!!e&&e.length===1&&!!e.match(/\S/)}const He=({instance:e,params:t,state:n})=>{const s=Fe().direction==="rtl",d=x.useRef({}),u=W(o=>{d.current=o(d.current)});x.useEffect(()=>{if(e.areItemUpdatesPrevented())return;const o={},i=y=>{o[y.id]=y.label.substring(0,1).toLowerCase()};Object.values(n.items.itemMetaMap).forEach(i),d.current=o},[n.items.itemMetaMap,t.getItemId,e]);const l=(o,i)=>{const y=i.toLowerCase(),g=c=>{const b=oe(e,c);return b===null?X(e):b};let a=null,h=g(o);const f={};for(;a==null&&!f[h];)d.current[h]===y?a=h:(f[h]=!0,h=g(h));return a},m=o=>!t.disableSelection&&!e.isItemDisabled(o),p=o=>!e.isItemDisabled(o)&&e.isItemExpandable(o);return{instance:{updateFirstCharMap:u,handleItemKeyDown:(o,i)=>{if(o.defaultMuiPrevented||o.altKey||o.currentTarget!==o.target)return;const y=o.ctrlKey||o.metaKey,g=o.key;switch(!0){case(g===" "&&m(i)):{o.preventDefault(),t.multiSelect&&o.shiftKey?e.expandSelectionRange(o,i):t.multiSelect?e.selectItem(o,i,!0):e.selectItem(o,i);break}case g==="Enter":{p(i)?(e.toggleItemExpansion(o,i),o.preventDefault()):m(i)&&(t.multiSelect?(o.preventDefault(),e.selectItem(o,i,!0)):e.isItemSelected(i)||(e.selectItem(o,i),o.preventDefault()));break}case g==="ArrowDown":{const a=oe(e,i);a&&(o.preventDefault(),e.focusItem(o,a),t.multiSelect&&o.shiftKey&&m(a)&&e.selectItemFromArrowNavigation(o,i,a));break}case g==="ArrowUp":{const a=_t(e,i);a&&(o.preventDefault(),e.focusItem(o,a),t.multiSelect&&o.shiftKey&&m(a)&&e.selectItemFromArrowNavigation(o,i,a));break}case(g==="ArrowRight"&&!s||g==="ArrowLeft"&&s):{if(e.isItemExpanded(i)){const a=oe(e,i);a&&(e.focusItem(o,a),o.preventDefault())}else p(i)&&(e.toggleItemExpansion(o,i),o.preventDefault());break}case(g==="ArrowLeft"&&!s||g==="ArrowRight"&&s):{if(p(i)&&e.isItemExpanded(i))e.toggleItemExpansion(o,i),o.preventDefault();else{const a=e.getItemMeta(i).parentId;a&&(e.focusItem(o,a),o.preventDefault())}break}case g==="Home":{m(i)&&t.multiSelect&&y&&o.shiftKey?e.selectRangeFromStartToItem(o,i):e.focusItem(o,X(e)),o.preventDefault();break}case g==="End":{m(i)&&t.multiSelect&&y&&o.shiftKey?e.selectRangeFromItemToEnd(o,i):e.focusItem(o,We(e)),o.preventDefault();break}case g==="*":{e.expandAllSiblings(o,i),o.preventDefault();break}case(g==="a"&&y&&t.multiSelect&&!t.disableSelection):{e.selectAllNavigableItems(o),o.preventDefault();break}case(!y&&!o.shiftKey&&Xt(g)):{const a=l(i,g);a!=null&&(e.focusItem(o,a),o.preventDefault());break}}}}}};He.params={};const Ge=({slots:e,slotProps:t})=>({contextValue:{icons:{slots:{collapseIcon:e.collapseIcon,expandIcon:e.expandIcon,endIcon:e.endIcon},slotProps:{collapseIcon:t.collapseIcon,expandIcon:t.expandIcon,endIcon:t.endIcon}}}});Ge.params={};const Jt=[ze,se,ie,le,ve,He,Ge],Re=()=>{const e=x.useContext(Ne);if(e==null)throw new Error(["MUI X: Could not find the Tree View context.","It looks like you rendered your component outside of a SimpleTreeView or RichTreeView parent component.","This can also happen if you are bundling multiple versions of the Tree View."].join(`
`));return e};function Qt(e){const{instance:t,selection:{multiSelect:n}}=Re(),r=t.isItemExpandable(e),s=t.isItemExpanded(e),d=t.isItemFocused(e),u=t.isItemSelected(e),l=t.isItemDisabled(e);return{disabled:l,expanded:s,selected:u,focused:d,handleExpansion:o=>{if(!l){d||t.focusItem(o,e);const i=n&&(o.shiftKey||o.ctrlKey||o.metaKey);r&&!(i&&t.isItemExpanded(e))&&t.toggleItemExpansion(o,e)}},handleSelection:o=>{l||(d||t.focusItem(o,e),n&&(o.shiftKey||o.ctrlKey||o.metaKey)?o.shiftKey?t.expandSelectionRange(o,e):t.selectItem(o,e,!0):t.selectItem(o,e))},preventSelection:o=>{(o.shiftKey||o.ctrlKey||o.metaKey||l)&&o.preventDefault()}}}const Yt=["classes","className","displayIcon","expansionIcon","icon","label","itemId","onClick","onMouseDown"],Xe=x.forwardRef(function(t,n){const{classes:r,className:s,displayIcon:d,expansionIcon:u,icon:l,label:m,itemId:p,onClick:I,onMouseDown:o}=t,i=H(t,Yt),{disabled:y,expanded:g,selected:a,focused:h,handleExpansion:f,handleSelection:c,preventSelection:b}=Qt(p),R=l||u||d,C=S=>{b(S),o&&o(S)},P=S=>{f(S),c(S),I&&I(S)};return v.jsxs("div",w({},i,{className:xe(s,r.root,g&&r.expanded,a&&r.selected,h&&r.focused,y&&r.disabled),onClick:P,onMouseDown:C,ref:n,children:[v.jsx("div",{className:r.iconContainer,children:R}),v.jsx("div",{className:r.label,children:m})]}))});function Zt(e){return ge("MuiTreeItem",e)}const L=he("MuiTreeItem",["root","groupTransition","content","expanded","selected","focused","disabled","iconContainer","label"]),en=je(v.jsx("path",{d:"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"TreeViewExpandIcon"),tn=je(v.jsx("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"TreeViewCollapseIcon");function Je(e){const{children:t,itemId:n}=e,{wrapItem:r}=Re();return r({children:t,itemId:n})}Je.propTypes={children:ke.node,itemId:ke.string.isRequired};const nn=["children","className","slots","slotProps","ContentComponent","ContentProps","itemId","id","label","onClick","onMouseDown","onFocus","onBlur","onKeyDown"],on=["ownerState"],rn=["ownerState"],sn=["ownerState"],ln=e=>{const{classes:t}=e;return ye({root:["root"],content:["content"],expanded:["expanded"],selected:["selected"],focused:["focused"],disabled:["disabled"],iconContainer:["iconContainer"],label:["label"],groupTransition:["groupTransition"]},Zt,t)},an=q("li",{name:"MuiTreeItem",slot:"Root",overridesResolver:(e,t)=>t.root})({listStyle:"none",margin:0,padding:0,outline:0}),cn=q(Xe,{name:"MuiTreeItem",slot:"Content",overridesResolver:(e,t)=>[t.content,t.iconContainer&&{[`& .${L.iconContainer}`]:t.iconContainer},t.label&&{[`& .${L.label}`]:t.label}]})(({theme:e})=>({padding:e.spacing(.5,1),borderRadius:e.shape.borderRadius,width:"100%",boxSizing:"border-box",display:"flex",alignItems:"center",gap:e.spacing(1),cursor:"pointer",WebkitTapHighlightColor:"transparent","&:hover":{backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${L.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity,backgroundColor:"transparent"},[`&.${L.focused}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${L.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:ne(e.palette.primary.main,e.palette.action.selectedOpacity),"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:ne(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:ne(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${L.focused}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:ne(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`& .${L.iconContainer}`]:{width:16,display:"flex",flexShrink:0,justifyContent:"center","& svg":{fontSize:18}},[`& .${L.label}`]:w({width:"100%",boxSizing:"border-box",minWidth:0,position:"relative"},e.typography.body1)})),un=q(_e,{name:"MuiTreeItem",slot:"GroupTransition",overridesResolver:(e,t)=>t.groupTransition})({margin:0,padding:0,paddingLeft:12}),dn=x.forwardRef(function(t,n){const{icons:r,runItemPlugins:s,selection:{multiSelect:d},disabledItemsFocusable:u,instance:l}=Re(),m=be({props:t,name:"MuiTreeItem"}),{children:p,className:I,slots:o,slotProps:i,ContentComponent:y=Xe,ContentProps:g,itemId:a,id:h,label:f,onClick:c,onMouseDown:b,onBlur:R,onKeyDown:C}=m,P=H(m,nn),{contentRef:S,rootRef:Z}=s(m),ae=re(n,Z),j=re(g==null?void 0:g.ref,S),V={expandIcon:(o==null?void 0:o.expandIcon)??r.slots.expandIcon??en,collapseIcon:(o==null?void 0:o.collapseIcon)??r.slots.collapseIcon??tn,endIcon:(o==null?void 0:o.endIcon)??r.slots.endIcon,icon:o==null?void 0:o.icon,groupTransition:o==null?void 0:o.groupTransition},N=T=>Array.isArray(T)?T.length>0&&T.some(N):!!T,A=N(p),D=l.isItemExpanded(a),z=l.isItemFocused(a),J=l.isItemSelected(a),F=l.isItemDisabled(a),K=w({},m,{expanded:D,focused:z,selected:J,disabled:F}),O=ln(K),ee=V.groupTransition??void 0,ce=G({elementType:ee,ownerState:{},externalSlotProps:i==null?void 0:i.groupTransition,additionalProps:{unmountOnExit:!0,in:D,component:"ul",role:"group"},className:O.groupTransition}),Q=D?V.collapseIcon:V.expandIcon,ue=G({elementType:Q,ownerState:{},externalSlotProps:T=>D?w({},B(r.slotProps.collapseIcon,T),B(i==null?void 0:i.collapseIcon,T)):w({},B(r.slotProps.expandIcon,T),B(i==null?void 0:i.expandIcon,T))}),de=H(ue,on),pe=A&&Q?v.jsx(Q,w({},de)):null,E=A?void 0:V.endIcon,M=G({elementType:E,ownerState:{},externalSlotProps:T=>A?{}:w({},B(r.slotProps.endIcon,T),B(i==null?void 0:i.endIcon,T))}),$=H(M,rn),U=E?v.jsx(E,w({},$)):null,_=V.icon,te=G({elementType:_,ownerState:{},externalSlotProps:i==null?void 0:i.icon}),et=H(te,sn),tt=_?v.jsx(_,w({},et)):null;let fe;d?fe=J:J&&(fe=!0);function nt(T){!z&&(!F||u)&&T.currentTarget===T.target&&l.focusItem(T,a)}function ot(T){R==null||R(T),l.removeFocusedItem()}const rt=T=>{C==null||C(T),l.handleItemKeyDown(T,a)},st=l.getTreeItemIdAttribute(a,h),it=l.canItemBeTabbed(a)?0:-1;return v.jsx(Je,{itemId:a,children:v.jsxs(an,w({className:xe(O.root,I),role:"treeitem","aria-expanded":A?D:void 0,"aria-selected":fe,"aria-disabled":F||void 0,id:st,tabIndex:it},P,{ownerState:K,onFocus:nt,onBlur:ot,onKeyDown:rt,ref:ae,children:[v.jsx(cn,w({as:y,classes:{root:O.content,expanded:O.expanded,selected:O.selected,focused:O.focused,disabled:O.disabled,iconContainer:O.iconContainer,label:O.label},label:f,itemId:a,onClick:c,onMouseDown:b,icon:tt,expansionIcon:pe,displayIcon:U,ownerState:K},g,{ref:j})),p&&v.jsx(un,w({as:ee},ce,{children:p}))]}))})}),pn=["slots","slotProps","apiRef"],fn=e=>{let{props:{slots:t,slotProps:n,apiRef:r},plugins:s,rootRef:d}=e,u=H(e.props,pn);const l={};s.forEach(I=>{Object.assign(l,I.params)});const m={plugins:s,rootRef:d,slots:t??{},slotProps:n??{},apiRef:r},p={};return Object.keys(u).forEach(I=>{const o=u[I];l[I]?m[I]=o:p[I]=o}),{pluginParams:m,slots:t,slotProps:n,otherProps:p}},mn=e=>{const{classes:t}=e;return ye({root:["root"]},St,t)},In=q("ul",{name:"MuiRichTreeView",slot:"Root",overridesResolver:(e,t)=>t.root})({padding:0,margin:0,listStyle:"none",outline:0,position:"relative"});function gn({slots:e,slotProps:t,label:n,id:r,itemId:s,children:d}){const u=(e==null?void 0:e.item)??dn,l=G({elementType:u,externalSlotProps:t==null?void 0:t.item,additionalProps:{itemId:s,id:r,label:n},ownerState:{itemId:s,label:n}});return v.jsx(u,w({},l,{children:d}))}const hn=x.forwardRef(function(t,n){const r=be({props:t,name:"MuiRichTreeView"}),{pluginParams:s,slots:d,slotProps:u,otherProps:l}=fn({props:r,plugins:Jt,rootRef:n}),{getRootProps:m,contextValue:p,instance:I}=kt(s),o=mn(r),i=(d==null?void 0:d.root)??In,y=G({elementType:i,externalSlotProps:u==null?void 0:u.root,externalForwardedProps:l,className:o.root,getSlotProps:m,ownerState:r}),g=I.getItemsToRender(),a=({label:h,itemId:f,id:c,children:b})=>v.jsx(gn,{slots:d,slotProps:u,label:h,id:c,itemId:f,children:b==null?void 0:b.map(a)},f);return v.jsx(At,{value:p,children:v.jsx(i,w({},y,{children:g.map(a)}))})});var Ce={},bn=Te;Object.defineProperty(Ce,"__esModule",{value:!0});var Qe=Ce.default=void 0,xn=bn(we()),yn=Ee();Qe=Ce.default=(0,xn.default)((0,yn.jsx)("path",{d:"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8z"}),"Folder");var Se={},En=Te;Object.defineProperty(Se,"__esModule",{value:!0});var Ye=Se.default=void 0,Tn=En(we()),wn=Ee();Ye=Se.default=(0,Tn.default)((0,wn.jsx)("path",{d:"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m0 12H4V8h16z"}),"FolderOpen");var Me={},vn=Te;Object.defineProperty(Me,"__esModule",{value:!0});var Ze=Me.default=void 0,Rn=vn(we()),Cn=Ee();Ze=Me.default=(0,Rn.default)((0,Cn.jsx)("path",{d:"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-6 10H6v-2h8zm4-4H6v-2h12z"}),"Source");function Sn(e){const{className:t,style:n}=e,r=ut(),s=Oe(r.selectedPath$),d=Oe(r.debouncedFs$,()=>Mn(r.getDirectoryTreePaths(),u=>r.explore.existsSync(u)&&r.explore.isDirectory(u)))??[];return Pe.createElement("div",{className:lt(t,"overflow-auto"),style:n,"aria-label":"explorer"},Pe.createElement(hn,{slots:{collapseIcon:Qe,expandIcon:Ye,endIcon:Ze},getItemId:u=>u.path,className:"overflow-auto",items:d,onSelectedItemsChange:(u,l)=>{l&&l!==s&&r.selectedPath$.next(l)},getItemLabel:u=>u.name,defaultSelectedItems:r.getEntryPathRelativeCwd(),defaultExpandedItems:[at(r.getEntryPathRelativeCwd())]}))}function Mn(e,t){const n=r();return s(n,"").children??[];function r(){const d={children:{},name:""};return e.forEach(u=>{u.split("/").filter(m=>m!=="").reduce((m,p,I)=>{const o=m.children[p];if(o)return o;const i={name:p,children:{}};return m.children[p]=i,i},d)}),d}function s(d,u){const{children:l,name:m}=d,p=ct(u,m),I={name:m,path:p};return t(p)&&(I.children=Object.keys(l).map(o=>{const i=l[o];return s(i,p)})),I}}Sn.__docgenInfo={description:"",methods:[],displayName:"Explore",props:{className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};export{Sn as E};
