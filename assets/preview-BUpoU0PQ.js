const __vite__fileDeps=["./DocsRenderer-K4EAMTCU-CuKR8rLC.js","./iframe-BZCXwl5t.js","./index-CBqU2yxZ.js","./_commonjsHelpers-BosuxZz1.js","./react-18-D8cruF67.js","./index-BtM5VmRH.js","./emotion-use-insertion-effect-with-fallbacks.browser.esm-BPGUNDjC.js","./index-DYADbu9O.js","./assertThisInitialized-B9jnkVVz.js","./inheritsLoose-B7h9gheN.js","./isNativeReflectConstruct-CnNQtDHK.js","./index-BvKuCN9r.js","./isSymbol-DB5r9LRl.js","./index-DrFu-skq.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{_ as a}from"./iframe-BZCXwl5t.js";import"../sb-preview/runtime.js";const{global:s}=__STORYBOOK_MODULE_GLOBAL__;var _=Object.entries(s.TAGS_OPTIONS??{}).reduce((e,r)=>{let[t,o]=r;return o.excludeFromDocsStories&&(e[t]=!0),e},{}),n={docs:{renderer:async()=>{let{DocsRenderer:e}=await a(()=>import("./DocsRenderer-K4EAMTCU-CuKR8rLC.js").then(r=>r.D),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13]),import.meta.url);return new e},stories:{filter:e=>{var r;return(e.tags||[]).filter(t=>_[t]).length===0&&!((r=e.parameters.docs)!=null&&r.disable)}}}};export{n as parameters};
