var Hn=Object.defineProperty;var Bn=(e,n,t)=>n in e?Hn(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var v=(e,n,t)=>(Bn(e,typeof n!="symbol"?n+"":n,t),t),ye=(e,n,t)=>{if(!n.has(e))throw TypeError("Cannot "+t)};var o=(e,n,t)=>(ye(e,n,"read from private field"),t?t.call(e):n.get(e)),p=(e,n,t)=>{if(n.has(e))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(e):n.set(e,t)},D=(e,n,t,r)=>(ye(e,n,"write to private field"),r?r.call(e,t):n.set(e,t),t);var He=(e,n,t)=>(ye(e,n,"access private method"),t);import{r as F,R as Ee}from"./index-CBqU2yxZ.js";import{_ as he,s as Wn,o as Kn,i as rn,h as H,k as sn,l as Le,n as Ce,q as Me,M as Jn,S as Be,U as We,r as Ke,u as Je,v as Ae,w as k,x as an,y as Z,z as Se,A as Yn,B as Fe,C as ve,D as Xn,E as Pe,F as un,G as Qn,H as Ye,I as Zn,J as zn,K as on,L as Vn,N as jn,O as kn,P as et,Q as nt,R as tt,T as rt,V as it,W as st,e as at,X as A,Y as re,Z as ut,$ as ae,a0 as ge,a1 as ln,a2 as ot,a3 as lt,a4 as R,a5 as fn,a6 as ft,a7 as cn,a8 as pe,a9 as ct,aa as dt,ab as ht,ac as vt,ad as gt,ae as De,af as ee,ag as Xe,ah as yt,p as w,ai as dn,aj as pt,j as K,ak as L,al as hn,am as mt,a as Qe}from"./undomanager-DJF0Esjf.js";const vn=F.createContext(null);function $i(){const e=F.useContext(vn);if(!e)throw new Error("usePlayground must be used within a PlaygroundProvider");return e}function wt(e){var n=F.useRef(e);n.current=F.useMemo(function(){return e},[e]);var t=F.useRef();return t.current||(t.current=function(){for(var r=[],i=0;i<arguments.length;i++)r[i]=arguments[i];return n.current.apply(this,r)}),t.current}var xt=function(){var e=he(F.useState({}),2),n=e[1];return F.useCallback(function(){return n({})},[])};function bt(e,n){return Wn(Kn(e,n,rn),e+"")}function Et(e,n,t){if(!H(t))return!1;var r=typeof n;return(r=="number"?sn(t)&&Le(n,t.length):r=="string"&&n in t)?Ce(t[n],e):!1}function At(e){return bt(function(n,t){var r=-1,i=t.length,s=i>1?t[i-1]:void 0,a=i>2?t[2]:void 0;for(s=e.length>3&&typeof s=="function"?(i--,s):void 0,a&&Et(t[0],t[1],a)&&(s=i<3?void 0:s,i=1),n=Object(n);++r<i;){var u=t[r];u&&e(n,u,r,s)}return n})}function St(e,n,t){var r=e==null?void 0:Me(e,n);return r===void 0?t:r}var Pt="__lodash_hash_undefined__";function $t(e){return this.__data__.set(e,Pt),this}function Tt(e){return this.__data__.has(e)}function ue(e){var n=-1,t=e==null?0:e.length;for(this.__data__=new Jn;++n<t;)this.add(e[n])}ue.prototype.add=ue.prototype.push=$t;ue.prototype.has=Tt;function Ot(e,n){for(var t=-1,r=e==null?0:e.length;++t<r;)if(n(e[t],t,e))return!0;return!1}function _t(e,n){return e.has(n)}var It=1,Rt=2;function gn(e,n,t,r,i,s){var a=t&It,u=e.length,l=n.length;if(u!=l&&!(a&&l>u))return!1;var f=s.get(e),c=s.get(n);if(f&&c)return f==n&&c==e;var d=-1,h=!0,y=t&Rt?new ue:void 0;for(s.set(e,n),s.set(n,e);++d<u;){var g=e[d],x=n[d];if(r)var P=a?r(x,g,d,n,e,s):r(g,x,d,e,n,s);if(P!==void 0){if(P)continue;h=!1;break}if(y){if(!Ot(n,function(E,S){if(!_t(y,S)&&(g===E||i(g,E,t,r,s)))return y.push(S)})){h=!1;break}}else if(!(g===x||i(g,x,t,r,s))){h=!1;break}}return s.delete(e),s.delete(n),h}function Lt(e){var n=-1,t=Array(e.size);return e.forEach(function(r,i){t[++n]=[i,r]}),t}function Ct(e){var n=-1,t=Array(e.size);return e.forEach(function(r){t[++n]=r}),t}var Mt=1,Ft=2,Dt="[object Boolean]",Ut="[object Date]",qt="[object Error]",Gt="[object Map]",Nt="[object Number]",Ht="[object RegExp]",Bt="[object Set]",Wt="[object String]",Kt="[object Symbol]",Jt="[object ArrayBuffer]",Yt="[object DataView]",Ze=Be?Be.prototype:void 0,me=Ze?Ze.valueOf:void 0;function Xt(e,n,t,r,i,s,a){switch(t){case Yt:if(e.byteLength!=n.byteLength||e.byteOffset!=n.byteOffset)return!1;e=e.buffer,n=n.buffer;case Jt:return!(e.byteLength!=n.byteLength||!s(new We(e),new We(n)));case Dt:case Ut:case Nt:return Ce(+e,+n);case qt:return e.name==n.name&&e.message==n.message;case Ht:case Wt:return e==n+"";case Gt:var u=Lt;case Bt:var l=r&Mt;if(u||(u=Ct),e.size!=n.size&&!l)return!1;var f=a.get(e);if(f)return f==n;r|=Ft,a.set(e,n);var c=gn(u(e),u(n),r,i,s,a);return a.delete(e),c;case Kt:if(me)return me.call(e)==me.call(n)}return!1}var Qt=1,Zt=Object.prototype,zt=Zt.hasOwnProperty;function Vt(e,n,t,r,i,s){var a=t&Qt,u=Ke(e),l=u.length,f=Ke(n),c=f.length;if(l!=c&&!a)return!1;for(var d=l;d--;){var h=u[d];if(!(a?h in n:zt.call(n,h)))return!1}var y=s.get(e),g=s.get(n);if(y&&g)return y==n&&g==e;var x=!0;s.set(e,n),s.set(n,e);for(var P=a;++d<l;){h=u[d];var E=e[h],S=n[h];if(r)var ie=a?r(S,E,h,n,e,s):r(E,S,h,e,n,s);if(!(ie===void 0?E===S||i(E,S,t,r,s):ie)){x=!1;break}P||(P=h=="constructor")}if(x&&!P){var W=e.constructor,U=n.constructor;W!=U&&"constructor"in e&&"constructor"in n&&!(typeof W=="function"&&W instanceof W&&typeof U=="function"&&U instanceof U)&&(x=!1)}return s.delete(e),s.delete(n),x}var jt=1,ze="[object Arguments]",Ve="[object Array]",se="[object Object]",kt=Object.prototype,je=kt.hasOwnProperty;function er(e,n,t,r,i,s){var a=Z(e),u=Z(n),l=a?Ve:Je(e),f=u?Ve:Je(n);l=l==ze?se:l,f=f==ze?se:f;var c=l==se,d=f==se,h=l==f;if(h&&Ae(e)){if(!Ae(n))return!1;a=!0,c=!1}if(h&&!c)return s||(s=new k),a||an(e)?gn(e,n,t,r,i,s):Xt(e,n,l,t,r,i,s);if(!(t&jt)){var y=c&&je.call(e,"__wrapped__"),g=d&&je.call(n,"__wrapped__");if(y||g){var x=y?e.value():e,P=g?n.value():n;return s||(s=new k),i(x,P,t,r,s)}}return h?(s||(s=new k),Vt(e,n,t,r,i,s)):!1}function Ue(e,n,t,r,i){return e===n?!0:e==null||n==null||!Se(e)&&!Se(n)?e!==e&&n!==n:er(e,n,t,r,Ue,i)}var nr=1,tr=2;function rr(e,n,t,r){var i=t.length,s=i,a=!r;if(e==null)return!s;for(e=Object(e);i--;){var u=t[i];if(a&&u[2]?u[1]!==e[u[0]]:!(u[0]in e))return!1}for(;++i<s;){u=t[i];var l=u[0],f=e[l],c=u[1];if(a&&u[2]){if(f===void 0&&!(l in e))return!1}else{var d=new k;if(r)var h=r(f,c,l,e,n,d);if(!(h===void 0?Ue(c,f,nr|tr,r,d):h))return!1}}return!0}function yn(e){return e===e&&!H(e)}function ir(e){for(var n=Yn(e),t=n.length;t--;){var r=n[t],i=e[r];n[t]=[r,i,yn(i)]}return n}function pn(e,n){return function(t){return t==null?!1:t[e]===n&&(n!==void 0||e in Object(t))}}function sr(e){var n=ir(e);return n.length==1&&n[0][2]?pn(n[0][0],n[0][1]):function(t){return t===e||rr(t,e,n)}}function ar(e,n){return e!=null&&n in Object(e)}function ur(e,n,t){n=Fe(n,e);for(var r=-1,i=n.length,s=!1;++r<i;){var a=ve(n[r]);if(!(s=e!=null&&t(e,a)))break;e=e[a]}return s||++r!=i?s:(i=e==null?0:e.length,!!i&&Xn(i)&&Le(a,i)&&(Z(e)||Pe(e)))}function or(e,n){return e!=null&&ur(e,n,ar)}var lr=1,fr=2;function cr(e,n){return un(e)&&yn(n)?pn(ve(e),n):function(t){var r=St(t,e);return r===void 0&&r===n?or(t,e):Ue(n,r,lr|fr)}}function dr(e){return function(n){return n==null?void 0:n[e]}}function hr(e){return function(n){return Me(n,e)}}function vr(e){return un(e)?dr(ve(e)):hr(e)}function mn(e){return typeof e=="function"?e:e==null?rn:typeof e=="object"?Z(e)?cr(e[0],e[1]):sr(e):vr(e)}function gr(e){return function(n,t,r){for(var i=-1,s=Object(n),a=r(n),u=a.length;u--;){var l=a[e?u:++i];if(t(s[l],l,s)===!1)break}return n}}var yr=gr(),we=function(){return Qn.Date.now()},pr="Expected a function",mr=Math.max,wr=Math.min;function xr(e,n,t){var r,i,s,a,u,l,f=0,c=!1,d=!1,h=!0;if(typeof e!="function")throw new TypeError(pr);n=Ye(n)||0,H(t)&&(c=!!t.leading,d="maxWait"in t,s=d?mr(Ye(t.maxWait)||0,n):s,h="trailing"in t?!!t.trailing:h);function y(b){var q=r,j=i;return r=i=void 0,f=b,a=e.apply(j,q),a}function g(b){return f=b,u=setTimeout(E,n),c?y(b):a}function x(b){var q=b-l,j=b-f,Ne=n-q;return d?wr(Ne,s-j):Ne}function P(b){var q=b-l,j=b-f;return l===void 0||q>=n||q<0||d&&j>=s}function E(){var b=we();if(P(b))return S(b);u=setTimeout(E,x(b))}function S(b){return u=void 0,h&&r?y(b):(r=i=void 0,a)}function ie(){u!==void 0&&clearTimeout(u),f=0,r=l=i=u=void 0}function W(){return u===void 0?a:S(we())}function U(){var b=we(),q=P(b);if(r=arguments,i=this,l=b,q){if(u===void 0)return g(l);if(d)return clearTimeout(u),u=setTimeout(E,n),y(l)}return u===void 0&&(u=setTimeout(E,n)),a}return U.cancel=ie,U.flush=W,U}function $e(e,n,t){(t!==void 0&&!Ce(e[n],t)||t===void 0&&!(n in e))&&Zn(e,n,t)}function br(e){return Se(e)&&sn(e)}function Te(e,n){if(!(n==="constructor"&&typeof e[n]=="function")&&n!="__proto__")return e[n]}function Er(e){return zn(e,on(e))}function Ar(e,n,t,r,i,s,a){var u=Te(e,t),l=Te(n,t),f=a.get(l);if(f){$e(e,t,f);return}var c=s?s(u,l,t+"",e,n,a):void 0,d=c===void 0;if(d){var h=Z(l),y=!h&&Ae(l),g=!h&&!y&&an(l);c=l,h||y||g?Z(u)?c=u:br(u)?c=Vn(u):y?(d=!1,c=jn(l,!0)):g?(d=!1,c=kn(l,!0)):c=[]:et(l)||Pe(l)?(c=u,Pe(u)?c=Er(u):(!H(u)||nt(u))&&(c=tt(l))):d=!1}d&&(a.set(l,c),i(c,l,r,s,a),a.delete(l)),$e(e,t,c)}function wn(e,n,t,r,i){e!==n&&yr(n,function(s,a){if(i||(i=new k),H(s))Ar(e,n,a,t,wn,r,i);else{var u=r?r(Te(e,a),s,a+"",e,n,i):void 0;u===void 0&&(u=s),$e(e,a,u)}},on)}function Sr(e){return e==null}var Pr=At(function(e,n,t){wn(e,n,t)}),$r="Expected a function";function Tr(e){if(typeof e!="function")throw new TypeError($r);return function(){var n=arguments;switch(n.length){case 0:return!e.call(this);case 1:return!e.call(this,n[0]);case 2:return!e.call(this,n[0],n[1]);case 3:return!e.call(this,n[0],n[1],n[2])}return!e.apply(this,n)}}function xn(e,n,t,r){if(!H(e))return e;n=Fe(n,e);for(var i=-1,s=n.length,a=s-1,u=e;u!=null&&++i<s;){var l=ve(n[i]),f=t;if(l==="__proto__"||l==="constructor"||l==="prototype")return e;if(i!=a){var c=u[l];f=r?r(c,l,u):void 0,f===void 0&&(f=H(c)?c:Le(n[i+1])?[]:{})}rt(u,l,f),u=u[l]}return e}function Or(e,n,t){for(var r=-1,i=n.length,s={};++r<i;){var a=n[r],u=Me(e,a);t(u,a)&&xn(s,Fe(a,e),u)}return s}function _r(e,n){if(e==null)return{};var t=it(st(e),function(r){return[r]});return n=mn(n),Or(e,t,function(r,i){return n(r,i[0])})}function Ir(e,n){return _r(e,Tr(mn(n)))}function ke(e,n,t){return e==null?e:xn(e,n,t)}var Rr=0;function Lr(e){var n=++Rr;return at(e)+n}function bn(e,n){const t=wt(n);F.useEffect(()=>{const r=e.subscribe(t);return()=>r.unsubscribe()},[e])}function Ti(e){const n=xt();bn(e,n)}function Oi(e){const[n,t]=F.useState();return bn(e,xr(t)),n}function Cr(e){return A(e==null?void 0:e.lift)}function V(e){return function(n){if(Cr(n))return n.lift(function(t){try{return e(t,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function z(e,n,t,r,i){return new Mr(e,n,t,r,i)}var Mr=function(e){re(n,e);function n(t,r,i,s,a,u){var l=e.call(this,t)||this;return l.onFinalize=a,l.shouldUnsubscribe=u,l._next=r?function(f){try{r(f)}catch(c){t.error(c)}}:e.prototype._next,l._error=s?function(f){try{s(f)}catch(c){t.error(c)}finally{this.unsubscribe()}}:e.prototype._error,l._complete=i?function(){try{i()}catch(f){t.error(f)}finally{this.unsubscribe()}}:e.prototype._complete,l}return n.prototype.unsubscribe=function(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var r=this.closed;e.prototype.unsubscribe.call(this),!r&&((t=this.onFinalize)===null||t===void 0||t.call(this))}},n}(ut),en=function(e){re(n,e);function n(t){var r=e.call(this)||this;return r._value=t,r}return Object.defineProperty(n.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),n.prototype._subscribe=function(t){var r=e.prototype._subscribe.call(this,t);return!r.closed&&t.next(this._value),r},n.prototype.getValue=function(){var t=this,r=t.hasError,i=t.thrownError,s=t._value;if(r)throw i;return this._throwIfClosed(),s},n.prototype.next=function(t){e.prototype.next.call(this,this._value=t)},n}(ae),Fr=function(e){re(n,e);function n(t,r){return e.call(this)||this}return n.prototype.schedule=function(t,r){return this},n}(ge),Oe={setInterval:function(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];return setInterval.apply(void 0,ln([e,n],he(t)))},clearInterval:function(e){var n=Oe.delegate;return((n==null?void 0:n.clearInterval)||clearInterval)(e)},delegate:void 0},Dr=function(e){re(n,e);function n(t,r){var i=e.call(this,t,r)||this;return i.scheduler=t,i.work=r,i.pending=!1,i}return n.prototype.schedule=function(t,r){var i;if(r===void 0&&(r=0),this.closed)return this;this.state=t;var s=this.id,a=this.scheduler;return s!=null&&(this.id=this.recycleAsyncId(a,s,r)),this.pending=!0,this.delay=r,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(a,this.id,r),this},n.prototype.requestAsyncId=function(t,r,i){return i===void 0&&(i=0),Oe.setInterval(t.flush.bind(t,this),i)},n.prototype.recycleAsyncId=function(t,r,i){if(i===void 0&&(i=0),i!=null&&this.delay===i&&this.pending===!1)return r;r!=null&&Oe.clearInterval(r)},n.prototype.execute=function(t,r){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var i=this._execute(t,r);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},n.prototype._execute=function(t,r){var i=!1,s;try{this.work(t)}catch(a){i=!0,s=a||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),s},n.prototype.unsubscribe=function(){if(!this.closed){var t=this,r=t.id,i=t.scheduler,s=i.actions;this.work=this.state=this.scheduler=null,this.pending=!1,ot(s,this),r!=null&&(this.id=this.recycleAsyncId(i,r,null)),this.delay=null,e.prototype.unsubscribe.call(this)}},n}(Fr),nn=function(){function e(n,t){t===void 0&&(t=e.now),this.schedulerActionCtor=n,this.now=t}return e.prototype.schedule=function(n,t,r){return t===void 0&&(t=0),new this.schedulerActionCtor(this,n).schedule(r,t)},e.now=lt.now,e}(),Ur=function(e){re(n,e);function n(t,r){r===void 0&&(r=nn.now);var i=e.call(this,t,r)||this;return i.actions=[],i._active=!1,i}return n.prototype.flush=function(t){var r=this.actions;if(this._active){r.push(t);return}var i;this._active=!0;do if(i=t.execute(t.state,t.delay))break;while(t=r.shift());if(this._active=!1,i){for(;t=r.shift();)t.unsubscribe();throw i}},n}(nn),qr=new Ur(Dr),Gr=new R(function(e){return e.complete()});function Nr(e){return e&&A(e.schedule)}function En(e){return e[e.length-1]}function Hr(e){return Nr(En(e))?e.pop():void 0}function Br(e,n){return typeof En(e)=="number"?e.pop():n}var qe=function(e){return e&&typeof e.length=="number"&&typeof e!="function"};function An(e){return A(e==null?void 0:e.then)}function Sn(e){return A(e[fn])}function Pn(e){return Symbol.asyncIterator&&A(e==null?void 0:e[Symbol.asyncIterator])}function $n(e){return new TypeError("You provided "+(e!==null&&typeof e=="object"?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function Wr(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Tn=Wr();function On(e){return A(e==null?void 0:e[Tn])}function _n(e){return ft(this,arguments,function(){var t,r,i,s;return cn(this,function(a){switch(a.label){case 0:t=e.getReader(),a.label=1;case 1:a.trys.push([1,,9,10]),a.label=2;case 2:return[4,pe(t.read())];case 3:return r=a.sent(),i=r.value,s=r.done,s?[4,pe(void 0)]:[3,5];case 4:return[2,a.sent()];case 5:return[4,pe(i)];case 6:return[4,a.sent()];case 7:return a.sent(),[3,2];case 8:return[3,10];case 9:return t.releaseLock(),[7];case 10:return[2]}})})}function In(e){return A(e==null?void 0:e.getReader)}function B(e){if(e instanceof R)return e;if(e!=null){if(Sn(e))return Kr(e);if(qe(e))return Jr(e);if(An(e))return Yr(e);if(Pn(e))return Rn(e);if(On(e))return Xr(e);if(In(e))return Qr(e)}throw $n(e)}function Kr(e){return new R(function(n){var t=e[fn]();if(A(t.subscribe))return t.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Jr(e){return new R(function(n){for(var t=0;t<e.length&&!n.closed;t++)n.next(e[t]);n.complete()})}function Yr(e){return new R(function(n){e.then(function(t){n.closed||(n.next(t),n.complete())},function(t){return n.error(t)}).then(null,ct)})}function Xr(e){return new R(function(n){var t,r;try{for(var i=dt(e),s=i.next();!s.done;s=i.next()){var a=s.value;if(n.next(a),n.closed)return}}catch(u){t={error:u}}finally{try{s&&!s.done&&(r=i.return)&&r.call(i)}finally{if(t)throw t.error}}n.complete()})}function Rn(e){return new R(function(n){Zr(e,n).catch(function(t){return n.error(t)})})}function Qr(e){return Rn(_n(e))}function Zr(e,n){var t,r,i,s;return ht(this,void 0,void 0,function(){var a,u;return cn(this,function(l){switch(l.label){case 0:l.trys.push([0,5,6,11]),t=vt(e),l.label=1;case 1:return[4,t.next()];case 2:if(r=l.sent(),!!r.done)return[3,4];if(a=r.value,n.next(a),n.closed)return[2];l.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return u=l.sent(),i={error:u},[3,11];case 6:return l.trys.push([6,,9,10]),r&&!r.done&&(s=t.return)?[4,s.call(t)]:[3,8];case 7:l.sent(),l.label=8;case 8:return[3,10];case 9:if(i)throw i.error;return[7];case 10:return[7];case 11:return n.complete(),[2]}})})}function N(e,n,t,r,i){r===void 0&&(r=0),i===void 0&&(i=!1);var s=n.schedule(function(){t(),i?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(s),!i)return s}function Ln(e,n){return n===void 0&&(n=0),V(function(t,r){t.subscribe(z(r,function(i){return N(r,e,function(){return r.next(i)},n)},function(){return N(r,e,function(){return r.complete()},n)},function(i){return N(r,e,function(){return r.error(i)},n)}))})}function Cn(e,n){return n===void 0&&(n=0),V(function(t,r){r.add(e.schedule(function(){return t.subscribe(r)},n))})}function zr(e,n){return B(e).pipe(Cn(n),Ln(n))}function Vr(e,n){return B(e).pipe(Cn(n),Ln(n))}function jr(e,n){return new R(function(t){var r=0;return n.schedule(function(){r===e.length?t.complete():(t.next(e[r++]),t.closed||this.schedule())})})}function kr(e,n){return new R(function(t){var r;return N(t,n,function(){r=e[Tn](),N(t,n,function(){var i,s,a;try{i=r.next(),s=i.value,a=i.done}catch(u){t.error(u);return}a?t.complete():t.next(s)},0,!0)}),function(){return A(r==null?void 0:r.return)&&r.return()}})}function Mn(e,n){if(!e)throw new Error("Iterable cannot be null");return new R(function(t){N(t,n,function(){var r=e[Symbol.asyncIterator]();N(t,n,function(){r.next().then(function(i){i.done?t.complete():t.next(i.value)})},0,!0)})})}function ei(e,n){return Mn(_n(e),n)}function ni(e,n){if(e!=null){if(Sn(e))return zr(e,n);if(qe(e))return jr(e,n);if(An(e))return Vr(e,n);if(Pn(e))return Mn(e,n);if(On(e))return kr(e,n);if(In(e))return ei(e,n)}throw $n(e)}function ti(e,n){return n?ni(e,n):B(e)}function Fn(e,n){return V(function(t,r){var i=0;t.subscribe(z(r,function(s){r.next(e.call(n,s,i++))}))})}var ri=Array.isArray;function ii(e,n){return ri(n)?e.apply(void 0,ln([],he(n))):e(n)}function si(e){return Fn(function(n){return ii(e,n)})}function ai(e,n,t,r,i,s,a,u){var l=[],f=0,c=0,d=!1,h=function(){d&&!l.length&&!f&&n.complete()},y=function(x){return f<r?g(x):l.push(x)},g=function(x){s&&n.next(x),f++;var P=!1;B(t(x,c++)).subscribe(z(n,function(E){i==null||i(E),s?y(E):n.next(E)},function(){P=!0},void 0,function(){if(P)try{f--;for(var E=function(){var S=l.shift();a?N(n,a,function(){return g(S)}):g(S)};l.length&&f<r;)E();h()}catch(S){n.error(S)}}))};return e.subscribe(z(n,y,function(){d=!0,h()})),function(){u==null||u()}}function Ge(e,n,t){return t===void 0&&(t=1/0),A(n)?Ge(function(r,i){return Fn(function(s,a){return n(r,s,i,a)})(B(e(r,i)))},t):(typeof n=="number"&&(t=n),V(function(r,i){return ai(r,i,e,t)}))}function ui(e){return e===void 0&&(e=1/0),Ge(gt,e)}var oi=["addListener","removeListener"],li=["addEventListener","removeEventListener"],fi=["on","off"];function oe(e,n,t,r){if(A(t)&&(r=t,t=void 0),r)return oe(e,n,t).pipe(si(r));var i=he(hi(e)?li.map(function(u){return function(l){return e[u](n,l,t)}}):ci(e)?oi.map(tn(e,n)):di(e)?fi.map(tn(e,n)):[],2),s=i[0],a=i[1];if(!s&&qe(e))return Ge(function(u){return oe(u,n,t)})(B(e));if(!s)throw new TypeError("Invalid event target");return new R(function(u){var l=function(){for(var f=[],c=0;c<arguments.length;c++)f[c]=arguments[c];return u.next(1<f.length?f:f[0])};return s(l),function(){return a(l)}})}function tn(e,n){return function(t){return function(r){return e[t](n,r)}}}function ci(e){return A(e.addListener)&&A(e.removeListener)}function di(e){return A(e.on)&&A(e.off)}function hi(e){return A(e.addEventListener)&&A(e.removeEventListener)}function vi(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var t=Hr(e),r=Br(e,1/0),i=e;return i.length?i.length===1?B(i[0]):ui(r)(ti(i,t)):Gr}function Dn(e,n){return V(function(t,r){var i=0;t.subscribe(z(r,function(s){return e.call(n,s,i++)&&r.next(s)}))})}function xe(e,n){return n===void 0&&(n=qr),V(function(t,r){var i=null,s=null,a=null,u=function(){if(i){i.unsubscribe(),i=null;var f=s;s=null,r.next(f)}};function l(){var f=a+e,c=n.now();if(c<f){i=this.schedule(void 0,f-c),r.add(i);return}u()}t.subscribe(z(r,function(f){s=f,a=n.now(),i||(i=n.schedule(l,e),r.add(i))},function(){u(),r.complete()},void 0,function(){s=i=null}))})}var Re,$,J,G,Y;class gi{constructor(){p(this,Re,new De("Editor"));p(this,$,void 0);v(this,"contentChange$",new ee);v(this,"id",Lr());p(this,J,void 0);p(this,G,document.createElement("div"));p(this,Y,void 0);v(this,"render",n=>{n.append(o(this,G)),D(this,Y,n),o(this,J)&&this.renderPath(o(this,J))});o(this,G).style.height="100%",D(this,$,Xe.create(o(this,G),Pr({fontSize:14,automaticLayout:!0,minimap:{enabled:!1}}))),o(this,$).onDidChangeModelContent(()=>{var n;this.contentChange$.next([(n=o(this,$).getModel())==null?void 0:n.uri.fsPath,o(this,$).getValue()])})}renderPath(n){var r,i;const t=Xe.getModel(yt.parse(n));t&&((r=o(this,$))==null?void 0:r.getModel())!==t&&((i=o(this,$))==null||i.setModel(t)),D(this,J,n)}remove(){o(this,G).remove()}dispose(){var n;(n=o(this,$))==null||n.dispose()}layout(){o(this,$).layout(),o(this,Y)&&(o(this,G).remove(),requestIdleCallback(()=>{this.render(o(this,Y))},{timeout:1e3}))}getValue(){return o(this,$).getValue()??""}setValue(n){o(this,$).getValue()!==n&&o(this,$).setValue(n)}}Re=new WeakMap,$=new WeakMap,J=new WeakMap,G=new WeakMap,Y=new WeakMap;function yi(e,n="",t=document.body){const r=document.createElement("script");return n&&r.setAttribute("type",n),r.innerHTML=e,t.append(r),r}function pi(e,n="",t=document.body){const r=document.createElement("script");return n&&r.setAttribute("type",n),r.src=e,t.append(r),r}function mi(e,n=document.body){const t=document.createElement("style");return t.type="text/css",t.innerHTML=e,n.append(t),t}function be(e){const n=document.createElement("div");return n.innerHTML=e,n.childNodes[0]}const wi=["log","error"];function xi(){const e=Object.create(window.console);return wi.reduce((n,t)=>(ke(n,`${t}$`,new ee),ke(n,t,(...r)=>{n[`${t}$`].next(r)}),n),e),e}var _e=(e=>(e[e.Loading=0]="Loading",e[e.Loaded=1]="Loaded",e))(_e||{}),C,O,X,_,ne,le;class Un{constructor(){v(this,"EState",_e);v(this,"console",xi());v(this,"state$",new ae);v(this,"error$",new ae);v(this,"load$");v(this,"fullscreenChange$");p(this,C,be('<iframe style="border: none; width: 100%; height: 100%"></iframe>'));p(this,O,null);p(this,X,{scripts:[],styles:[],globals:{},html:'<div id="root"></div>'});p(this,_,{scripts:new Map,styles:new Map,globals:{},html:be("<div id='root'></div>")});p(this,ne,new ge);p(this,le,()=>{if(!o(this,O))return;o(this,O).console=this.console,o(this,O).addEventListener("error",a=>{this.error$.next(a.message)}),o(this,O).addEventListener("unhandledrejection",a=>{this.error$.next(`Unhandledrejection:
${a.reason}`)});const n=o(this,O).document.body;n.style.backgroundColor="white";const{globals:t,scripts:r,styles:i,html:s}=o(this,X);if(o(this,_).html.remove(),s){const a=be(s);n.append(a),o(this,_).html=a}Object.keys(o(this,_).globals).forEach(a=>{delete o(this,O)[a]}),Object.entries(t).forEach(([a,u])=>{o(this,O)[a]=u}),o(this,_).globals=t,i.forEach(a=>{const{id:u,content:l}=a;let f=o(this,_).styles.get(u);f?f.textContent=l:(f=mi(a.content,n),f.setAttribute("data-style-id",u),o(this,_).styles.set(u,f))}),r.forEach(a=>{const{id:u,content:l,type:f,src:c}=a;let d=o(this,_).scripts.get(u);if(d&&d.remove(),c)d=pi(c,f,n);else if(l)d=yi(l,f,n);else throw new Error("script must have src or content");d.setAttribute("data-script-id",u),o(this,_).scripts.set(u,d)})});v(this,"updateSources",n=>{D(this,X,{...o(this,X),...n}),this.reload()});v(this,"render",n=>{n.append(o(this,C))});v(this,"dispose",()=>{o(this,ne).unsubscribe(),o(this,C).remove()});v(this,"requestFullscreen",()=>{if(o(this,C).isConnected)return o(this,C).requestFullscreen()});this.state$.next(0),this.load$=oe(o(this,C),"load"),o(this,ne).add(this.load$.subscribe(()=>{this.state$.next(1),D(this,O,o(this,C).contentWindow),o(this,le).call(this)})),this.fullscreenChange$=oe(o(this,C),"fullscreenchange")}reload(){var n;this.state$.next(0),(n=o(this,O))==null||n.location.reload()}}C=new WeakMap,O=new WeakMap,X=new WeakMap,_=new WeakMap,ne=new WeakMap,le=new WeakMap,v(Un,"EState",_e);var I,fe,te;class bi{constructor(n){v(this,"change$",new ae);v(this,"newFile$",new ee);p(this,I,new pt);p(this,fe,new ge);p(this,te,void 0);this.cwd=n,D(this,te,new De(`explore-${n}`)),o(this,fe).add(w.newFile$.pipe(Dn(t=>dn(t,this.cwd))).subscribe(t=>{o(this,te).log(`new file ${t}`),this.newFile$.next(t)}))}renameSync(n,t){const r=()=>{this.change$.next(),w.fs.renameSync(this.resolve(t),this.resolve(n))},i=()=>{this.change$.next(),w.fs.renameSync(this.resolve(n),this.resolve(t))};o(this,I).add({undo:r,redo:i}),i()}unlinkSync(n){const t=()=>{this.change$.next(),w.fs.unlinkSync(L(this.cwd,n))},r=w.fs.readFileSync(this.resolve(n)),i=()=>{this.change$.next(),w.fs.writeFileSync(this.resolve(n),r)};o(this,I).add({undo:i,redo:t}),t()}rmdirSync(n){const t=()=>{this.change$.next(),w.fs.rmdirSync(L(this.cwd,n))},r=w.fs.getFilesByPattern([K(L(this.cwd,n),"**/*")],{onlyFiles:!0}),i=()=>{this.change$.next(),Object.entries(r).forEach(([s,a])=>{w.fs.writeFileSync(s,a)})};o(this,I).add({undo:i,redo:t}),t()}mkdirSync(n){const t=()=>{this.change$.next(),w.fs.mkdirSync(L(this.cwd,n))},r=()=>{this.change$.next(),w.fs.rmdirSync(L(this.cwd,n))};o(this,I).add({undo:r,redo:t}),t()}writeFileSync(n,t){this.change$.next(),w.fs.writeFileSync(L(this.cwd,n),t)}readFileSync(n,t){return w.fs.readFileSync(L(this.cwd,n),t)}isDirectory(n){return w.fs.statSync(L(this.cwd,n)).isDirectory()}resolve(n){return L(this.cwd,n)}relative(n){return hn(this.cwd,n)}existsSync(n){return w.fs.existsSync(L(this.cwd,n))}undo(){o(this,I).undo()}redo(){o(this,I).redo()}hasUndo(){return o(this,I).hasUndo()}hasRedo(){return o(this,I).hasRedo()}}I=new WeakMap,fe=new WeakMap,te=new WeakMap;var qn=(e=>(e[e.Start=0]="Start",e[e.LoadingEsbuildWasm=1]="LoadingEsbuildWasm",e[e.Building=2]="Building",e[e.Error=3]="Error",e[e.Done=4]="Done",e))(qn||{}),Q,T,M,m,ce,Gn;const de=class de{constructor(n){p(this,ce);v(this,"EBuildState",qn);v(this,"id");v(this,"cwd");v(this,"editor",new gi);v(this,"previewer",new Un);v(this,"explore");v(this,"directoryTreePaths$",new ee);v(this,"buildState$",new en(0));v(this,"selectedPath$",new ee);v(this,"buildResult$",new en(void 0));p(this,T,void 0);p(this,M,new ge);p(this,m,void 0);const t={buildInputPattern:[K(n.cwd,"**/*"),K(n.cwd,"*"),"/node_modules/**/*.js"],buildOptions:{},globalExternals:{},directoryTreePathsPattern:[K(n.cwd,"**/*"),K(n.cwd,"*")]};D(this,m,{...t,...Ir(n,Sr),entry:n.entry?mt(n.entry)?n.entry:K(n.cwd,n.entry):""}),this.explore=new bi(o(this,m).cwd),this.id=o(this,m).cwd,this.cwd=o(this,m).cwd,D(this,T,new De(`playground-${this.id}`));const r=vi(this.explore.newFile$,this.explore.change$);o(this,M).add(this.editor.contentChange$.pipe(xe(500)).subscribe(([i,s])=>{!i||!dn(i,o(this,m).cwd)||(this.explore.writeFileSync(i,s),this.build())})),o(this,M).add(this.explore.newFile$.pipe(Dn(i=>i===o(this,m).entry)).subscribe(()=>{this.editor.renderPath(o(this,m).entry)})),o(this,M).add(this.selectedPath$.subscribe(i=>{o(this,T).log("selectedPath$",i),this.editor.renderPath(this.explore.resolve(i))})),o(this,M).add(r.pipe(xe(200)).subscribe(()=>this.build())),o(this,M).add(r.pipe(xe(200)).subscribe(()=>{const i=w.fs.globSync(o(this,m).directoryTreePathsPattern,{onlyFiles:!1}).map(s=>hn(o(this,m).cwd,s));o(this,T).log("directoryTreePaths$",i),this.directoryTreePaths$.next(i)})),o(this,M).add(this.explore.newFile$.subscribe(i=>{o(this,m).entry||["index.ts","index.tsx","src/index.ts","src/index.tsx"].map(s=>this.explore.resolve(s)).includes(this.explore.resolve(i))&&(o(this,m).entry=this.explore.resolve(i)),o(this,m).entry!==""&&this.explore.resolve(i)===o(this,m).entry&&this.selectedPath$.next(this.getEntryPathRelativeCwd())}))}static create(n){if(o(this,Q).has(n.cwd))return o(this,Q).get(n.cwd);const t=new de(n);return o(this,Q).set(n.cwd,t),t}async build(){o(this,T).timeAsyncFn(()=>He(this,ce,Gn).call(this),"build")}destroy(){o(this,M).unsubscribe(),this.editor.dispose(),this.previewer.dispose()}getEntryPathRelativeCwd(){return this.explore.relative(o(this,m).entry)}};Q=new WeakMap,T=new WeakMap,M=new WeakMap,m=new WeakMap,ce=new WeakSet,Gn=async function(){this.buildState$.next(1),o(this,T).log("loading esbuild.wasm..."),await Qe.load(),this.buildState$.next(2),o(this,T).log("building...");const{globalExternals:n={},buildInputPattern:t,buildOptions:r}=o(this,m),i=Object.entries(w.fs.getFilesByPattern(t)).reduce((s,[a,u])=>(s[this.explore.relative(a)]=u,s),{});if(!w.fs.existsSync(o(this,m).entry)){this.buildState$.next(3),this.buildResult$.next({buildError:new Error(`Entry file "${this.getEntryPathRelativeCwd()}" not found`),css:"",errors:[],hash:"",js:""}),o(this,T).log("build error");return}if(!w.fs.statSync(o(this,m).entry).isFile()){this.buildState$.next(3),this.buildResult$.next({buildError:new Error(`Entry file "${this.getEntryPathRelativeCwd()}" is not a file`),css:"",errors:[],hash:"",js:""}),o(this,T).log("build error");return}return Qe.build({input:i,entry:this.getEntryPathRelativeCwd(),globalExternals:n,...r}).then(s=>{var c;if(s.errors.length>0||s.buildError){this.buildState$.next(3),this.buildResult$.next(s),o(this,T).log("build error");return}if(o(this,T).log("build success"),this.buildState$.next(4),((c=this.buildResult$.getValue())==null?void 0:c.hash)===s.hash){o(this,T).log("hash equals");return}this.buildResult$.next(s);const{css:u,js:l,globalExternals:f}=s;this.previewer.updateSources({scripts:[{id:"externals",content:`var module = {exports: { default: {} }};
          function require (name) {
            var value = module.exports[name] || (module.exports.default ? module.exports.default[name] : null);
            if (value) {
              return value;
            }
          
            throw new Error("module not found: " + name);
          }
          
          ${w.template.externals.cjsCode}
            `},{id:"build",content:l??""}],styles:[{id:"build",content:u??""}],globals:f})})},p(de,Q,new Map);let Ie=de;const Nn=e=>Ee.createElement(vn.Provider,{value:e.value},e.children),Ei=Ee.memo(e=>{const{entry:n,globalExternals:t,buildInputPattern:r,directoryTreePathsPattern:i,cwd:s,buildOptions:a,children:u}=e,l=F.useMemo(()=>Ie.create({cwd:s,entry:n,globalExternals:t,buildInputPattern:r,buildOptions:a,directoryTreePathsPattern:i}),[r,t,n,a,i,s]);return Ee.createElement(Nn,{value:l,children:u})},(e,n)=>{const t=["globalExternals","buildOptions","children"];return Object.keys(e).every(r=>t.includes(r)?e[r]===n[r]:JSON.stringify(e[r])===JSON.stringify(n[r]))});Nn.__docgenInfo={description:"",methods:[],displayName:"PlaygroundProvider",props:{value:{required:!0,tsType:{name:"Playground"},description:""}}};Ei.__docgenInfo={description:"",methods:[],displayName:"PlaygroundProviderBuilder",props:{globalExternals:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"any"}],raw:"Record<string, any>"},description:""},entry:{required:!1,tsType:{name:"string"},description:'The entry file to be built and auto selected, can be absolute path or relative path, if not set, it will be auto resolved from cwd in these files: ["./index.ts", "./index.tsx", "./src/index.ts", "./src.index.tsx"]'},buildInputPattern:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:`The input of esbuild, can be glob pattern
@default  [
        join(options.cwd, "**\\/*"),
        join(options.cwd, "\\/*"),
        "/node_modules\\/**\\/*.js",
      ]`},buildOptions:{required:!1,tsType:{name:"Omit",elements:[{name:"IBuildOptions"},{name:"union",raw:'"entry" | "input" | "globalExternals"',elements:[{name:"literal",value:'"entry"'},{name:"literal",value:'"input"'},{name:"literal",value:'"globalExternals"'}]}],raw:'Omit<IBuildOptions, "entry" | "input" | "globalExternals">'},description:"@default {}"},directoryTreePathsPattern:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:`@default  [
        join(options.cwd, "**\\/*"),
        join(options.cwd, "\\/*"),
      ]`},cwd:{required:!0,tsType:{name:"string"},description:'@default "/"'},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};export{wi as C,Ei as P,bn as a,Ie as b,Nn as c,Oi as d,Dn as e,oe as f,wt as g,xt as h,Et as i,Fn as j,Ti as k,vi as m,$i as u};
