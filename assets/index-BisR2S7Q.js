var Mn=Object.defineProperty;var Dn=(e,n,t)=>n in e?Mn(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var h=(e,n,t)=>(Dn(e,typeof n!="symbol"?n+"":n,t),t),de=(e,n,t)=>{if(!n.has(e))throw TypeError("Cannot "+t)};var o=(e,n,t)=>(de(e,n,"read from private field"),t?t.call(e):n.get(e)),y=(e,n,t)=>{if(n.has(e))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(e):n.set(e,t)},F=(e,n,t,r)=>(de(e,n,"write to private field"),r?r.call(e,t):n.set(e,t),t);var De=(e,n,t)=>(de(e,n,"access private method"),t);import{r as Pe,R as ge}from"./index-CBqU2yxZ.js";import{s as qn,o as Un,i as je,g as K,h as ke,k as _e,l as Oe,n as Te,M as Gn,S as qe,U as Ue,q as Ge,r as Ne,u as pe,v as Q,w as en,x as J,y as we,z as Nn,A as Ie,B as le,C as Bn,D as me,E as nn,F as Hn,G as Kn,H as tn,I as Jn,J as Yn,K as Wn,L as Qn,N as Xn,O as Zn,P as zn,Q as Vn,R as jn,d as kn,T as m,_ as V,V as et,W as X,X as ce,Y as rn,Z as Le,$ as nt,a0 as tt,a1 as I,a2 as sn,a3 as rt,a4 as an,a5 as he,a6 as it,a7 as st,a8 as at,a9 as ot,aa as ut,ab as fe,ac as ne,ad as Be,ae as lt,p,af as on,ag as ct,j as U,ah as L,ai as un,aj as ft,b as He,ak as dt,al as ht}from"./FileSaver.min-GPj8h9Dk.js";const ln=Pe.createContext(null);function yi(){const e=Pe.useContext(ln);if(!e)throw new Error("usePlayground must be used within a PlaygroundProvider");return e}function vt(e,n){return qn(Un(e,n,je),e+"")}function yt(e,n,t){if(!K(t))return!1;var r=typeof n;return(r=="number"?ke(t)&&_e(n,t.length):r=="string"&&n in t)?Oe(t[n],e):!1}function gt(e){return vt(function(n,t){var r=-1,i=t.length,s=i>1?t[i-1]:void 0,a=i>2?t[2]:void 0;for(s=e.length>3&&typeof s=="function"?(i--,s):void 0,a&&yt(t[0],t[1],a)&&(s=i<3?void 0:s,i=1),n=Object(n);++r<i;){var u=t[r];u&&e(n,u,r,s)}return n})}function pt(e,n,t){var r=e==null?void 0:Te(e,n);return r===void 0?t:r}var wt="__lodash_hash_undefined__";function mt(e){return this.__data__.set(e,wt),this}function bt(e){return this.__data__.has(e)}function te(e){var n=-1,t=e==null?0:e.length;for(this.__data__=new Gn;++n<t;)this.add(e[n])}te.prototype.add=te.prototype.push=mt;te.prototype.has=bt;function xt(e,n){for(var t=-1,r=e==null?0:e.length;++t<r;)if(n(e[t],t,e))return!0;return!1}function At(e,n){return e.has(n)}var Et=1,St=2;function cn(e,n,t,r,i,s){var a=t&Et,u=e.length,l=n.length;if(u!=l&&!(a&&l>u))return!1;var c=s.get(e),f=s.get(n);if(c&&f)return c==n&&f==e;var d=-1,v=!0,x=t&St?new te:void 0;for(s.set(e,n),s.set(n,e);++d<u;){var w=e[d],b=n[d];if(r)var $=a?r(b,w,d,n,e,s):r(w,b,d,e,n,s);if($!==void 0){if($)continue;v=!1;break}if(x){if(!xt(n,function(P,_){if(!At(x,_)&&(w===P||i(w,P,t,r,s)))return x.push(_)})){v=!1;break}}else if(!(w===b||i(w,b,t,r,s))){v=!1;break}}return s.delete(e),s.delete(n),v}function $t(e){var n=-1,t=Array(e.size);return e.forEach(function(r,i){t[++n]=[i,r]}),t}function Pt(e){var n=-1,t=Array(e.size);return e.forEach(function(r){t[++n]=r}),t}var _t=1,Ot=2,Tt="[object Boolean]",It="[object Date]",Lt="[object Error]",Rt="[object Map]",Ct="[object Number]",Ft="[object RegExp]",Mt="[object Set]",Dt="[object String]",qt="[object Symbol]",Ut="[object ArrayBuffer]",Gt="[object DataView]",Ke=qe?qe.prototype:void 0,ve=Ke?Ke.valueOf:void 0;function Nt(e,n,t,r,i,s,a){switch(t){case Gt:if(e.byteLength!=n.byteLength||e.byteOffset!=n.byteOffset)return!1;e=e.buffer,n=n.buffer;case Ut:return!(e.byteLength!=n.byteLength||!s(new Ue(e),new Ue(n)));case Tt:case It:case Ct:return Oe(+e,+n);case Lt:return e.name==n.name&&e.message==n.message;case Ft:case Dt:return e==n+"";case Rt:var u=$t;case Mt:var l=r&_t;if(u||(u=Pt),e.size!=n.size&&!l)return!1;var c=a.get(e);if(c)return c==n;r|=Ot,a.set(e,n);var f=cn(u(e),u(n),r,i,s,a);return a.delete(e),f;case qt:if(ve)return ve.call(e)==ve.call(n)}return!1}var Bt=1,Ht=Object.prototype,Kt=Ht.hasOwnProperty;function Jt(e,n,t,r,i,s){var a=t&Bt,u=Ge(e),l=u.length,c=Ge(n),f=c.length;if(l!=f&&!a)return!1;for(var d=l;d--;){var v=u[d];if(!(a?v in n:Kt.call(n,v)))return!1}var x=s.get(e),w=s.get(n);if(x&&w)return x==n&&w==e;var b=!0;s.set(e,n),s.set(n,e);for(var $=a;++d<l;){v=u[d];var P=e[v],_=n[v];if(r)var Me=a?r(_,P,v,n,e,s):r(P,_,v,e,n,s);if(!(Me===void 0?P===_||i(P,_,t,r,s):Me)){b=!1;break}$||($=v=="constructor")}if(b&&!$){var j=e.constructor,k=n.constructor;j!=k&&"constructor"in e&&"constructor"in n&&!(typeof j=="function"&&j instanceof j&&typeof k=="function"&&k instanceof k)&&(b=!1)}return s.delete(e),s.delete(n),b}var Yt=1,Je="[object Arguments]",Ye="[object Array]",ee="[object Object]",Wt=Object.prototype,We=Wt.hasOwnProperty;function Qt(e,n,t,r,i,s){var a=J(e),u=J(n),l=a?Ye:Ne(e),c=u?Ye:Ne(n);l=l==Je?ee:l,c=c==Je?ee:c;var f=l==ee,d=c==ee,v=l==c;if(v&&pe(e)){if(!pe(n))return!1;a=!0,f=!1}if(v&&!f)return s||(s=new Q),a||en(e)?cn(e,n,t,r,i,s):Nt(e,n,l,t,r,i,s);if(!(t&Yt)){var x=f&&We.call(e,"__wrapped__"),w=d&&We.call(n,"__wrapped__");if(x||w){var b=x?e.value():e,$=w?n.value():n;return s||(s=new Q),i(b,$,t,r,s)}}return v?(s||(s=new Q),Jt(e,n,t,r,i,s)):!1}function Re(e,n,t,r,i){return e===n?!0:e==null||n==null||!we(e)&&!we(n)?e!==e&&n!==n:Qt(e,n,t,r,Re,i)}var Xt=1,Zt=2;function zt(e,n,t,r){var i=t.length,s=i;if(e==null)return!s;for(e=Object(e);i--;){var a=t[i];if(a[2]?a[1]!==e[a[0]]:!(a[0]in e))return!1}for(;++i<s;){a=t[i];var u=a[0],l=e[u],c=a[1];if(a[2]){if(l===void 0&&!(u in e))return!1}else{var f=new Q,d;if(!(d===void 0?Re(c,l,Xt|Zt,r,f):d))return!1}}return!0}function fn(e){return e===e&&!K(e)}function Vt(e){for(var n=Nn(e),t=n.length;t--;){var r=n[t],i=e[r];n[t]=[r,i,fn(i)]}return n}function dn(e,n){return function(t){return t==null?!1:t[e]===n&&(n!==void 0||e in Object(t))}}function jt(e){var n=Vt(e);return n.length==1&&n[0][2]?dn(n[0][0],n[0][1]):function(t){return t===e||zt(t,e,n)}}function kt(e,n){return e!=null&&n in Object(e)}function er(e,n,t){n=Ie(n,e);for(var r=-1,i=n.length,s=!1;++r<i;){var a=le(n[r]);if(!(s=e!=null&&t(e,a)))break;e=e[a]}return s||++r!=i?s:(i=e==null?0:e.length,!!i&&Bn(i)&&_e(a,i)&&(J(e)||me(e)))}function nr(e,n){return e!=null&&er(e,n,kt)}var tr=1,rr=2;function ir(e,n){return nn(e)&&fn(n)?dn(le(e),n):function(t){var r=pt(t,e);return r===void 0&&r===n?nr(t,e):Re(n,r,tr|rr)}}function sr(e){return function(n){return n==null?void 0:n[e]}}function ar(e){return function(n){return Te(n,e)}}function or(e){return nn(e)?sr(le(e)):ar(e)}function hn(e){return typeof e=="function"?e:e==null?je:typeof e=="object"?J(e)?ir(e[0],e[1]):jt(e):or(e)}function ur(e){return function(n,t,r){for(var i=-1,s=Object(n),a=r(n),u=a.length;u--;){var l=a[++i];if(t(s[l],l,s)===!1)break}return n}}var lr=ur();function be(e,n,t){(t!==void 0&&!Oe(e[n],t)||t===void 0&&!(n in e))&&Hn(e,n,t)}function cr(e){return we(e)&&ke(e)}function xe(e,n){if(!(n==="constructor"&&typeof e[n]=="function")&&n!="__proto__")return e[n]}function fr(e){return Kn(e,tn(e))}function dr(e,n,t,r,i,s,a){var u=xe(e,t),l=xe(n,t),c=a.get(l);if(c){be(e,t,c);return}var f=s?s(u,l,t+"",e,n,a):void 0,d=f===void 0;if(d){var v=J(l),x=!v&&pe(l),w=!v&&!x&&en(l);f=l,v||x||w?J(u)?f=u:cr(u)?f=Jn(u):x?(d=!1,f=Yn(l,!0)):w?(d=!1,f=Wn(l,!0)):f=[]:Qn(l)||me(l)?(f=u,me(u)?f=fr(u):(!K(u)||Xn(u))&&(f=Zn(l))):d=!1}d&&(a.set(l,f),i(f,l,r,s,a),a.delete(l)),be(e,t,f)}function vn(e,n,t,r,i){e!==n&&lr(n,function(s,a){if(i||(i=new Q),K(s))dr(e,n,a,t,vn,r,i);else{var u=r?r(xe(e,a),s,a+"",e,n,i):void 0;u===void 0&&(u=s),be(e,a,u)}},tn)}function hr(e){return e==null}var vr=gt(function(e,n,t){vn(e,n,t)}),yr="Expected a function";function gr(e){if(typeof e!="function")throw new TypeError(yr);return function(){var n=arguments;switch(n.length){case 0:return!e.call(this);case 1:return!e.call(this,n[0]);case 2:return!e.call(this,n[0],n[1]);case 3:return!e.call(this,n[0],n[1],n[2])}return!e.apply(this,n)}}function yn(e,n,t,r){if(!K(e))return e;n=Ie(n,e);for(var i=-1,s=n.length,a=s-1,u=e;u!=null&&++i<s;){var l=le(n[i]),c=t;if(l==="__proto__"||l==="constructor"||l==="prototype")return e;if(i!=a){var f=u[l];c=void 0,c===void 0&&(c=K(f)?f:_e(n[i+1])?[]:{})}zn(u,l,c),u=u[l]}return e}function pr(e,n,t){for(var r=-1,i=n.length,s={};++r<i;){var a=n[r],u=Te(e,a);t(u,a)&&yn(s,Ie(a,e),u)}return s}function wr(e,n){if(e==null)return{};var t=Vn(jn(e),function(r){return[r]});return n=hn(n),pr(e,t,function(r,i){return n(r,i[0])})}function mr(e,n){return wr(e,gr(hn(n)))}function Qe(e,n,t){return e==null?e:yn(e,n,t)}var br=0;function xr(e){var n=++br;return kn(e)+n}function Ar(e){return m(e==null?void 0:e.lift)}function W(e){return function(n){if(Ar(n))return n.lift(function(t){try{return e(t,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function Y(e,n,t,r,i){return new Er(e,n,t,r,i)}var Er=function(e){V(n,e);function n(t,r,i,s,a,u){var l=e.call(this,t)||this;return l.onFinalize=a,l.shouldUnsubscribe=u,l._next=r?function(c){try{r(c)}catch(f){t.error(f)}}:e.prototype._next,l._error=s?function(c){try{s(c)}catch(f){t.error(f)}finally{this.unsubscribe()}}:e.prototype._error,l._complete=i?function(){try{i()}catch(c){t.error(c)}finally{this.unsubscribe()}}:e.prototype._complete,l}return n.prototype.unsubscribe=function(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var r=this.closed;e.prototype.unsubscribe.call(this),!r&&((t=this.onFinalize)===null||t===void 0||t.call(this))}},n}(et),Xe=function(e){V(n,e);function n(t){var r=e.call(this)||this;return r._value=t,r}return Object.defineProperty(n.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),n.prototype._subscribe=function(t){var r=e.prototype._subscribe.call(this,t);return!r.closed&&t.next(this._value),r},n.prototype.getValue=function(){var t=this,r=t.hasError,i=t.thrownError,s=t._value;if(r)throw i;return this._throwIfClosed(),s},n.prototype.next=function(t){e.prototype.next.call(this,this._value=t)},n}(X),Sr=function(e){V(n,e);function n(t,r){return e.call(this)||this}return n.prototype.schedule=function(t,r){return this},n}(ce),Ae={setInterval:function(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];return setInterval.apply(void 0,rn([e,n],Le(t)))},clearInterval:function(e){var n=Ae.delegate;return((n==null?void 0:n.clearInterval)||clearInterval)(e)},delegate:void 0},$r=function(e){V(n,e);function n(t,r){var i=e.call(this,t,r)||this;return i.scheduler=t,i.work=r,i.pending=!1,i}return n.prototype.schedule=function(t,r){var i;if(r===void 0&&(r=0),this.closed)return this;this.state=t;var s=this.id,a=this.scheduler;return s!=null&&(this.id=this.recycleAsyncId(a,s,r)),this.pending=!0,this.delay=r,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(a,this.id,r),this},n.prototype.requestAsyncId=function(t,r,i){return i===void 0&&(i=0),Ae.setInterval(t.flush.bind(t,this),i)},n.prototype.recycleAsyncId=function(t,r,i){if(i===void 0&&(i=0),i!=null&&this.delay===i&&this.pending===!1)return r;r!=null&&Ae.clearInterval(r)},n.prototype.execute=function(t,r){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var i=this._execute(t,r);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},n.prototype._execute=function(t,r){var i=!1,s;try{this.work(t)}catch(a){i=!0,s=a||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),s},n.prototype.unsubscribe=function(){if(!this.closed){var t=this,r=t.id,i=t.scheduler,s=i.actions;this.work=this.state=this.scheduler=null,this.pending=!1,nt(s,this),r!=null&&(this.id=this.recycleAsyncId(i,r,null)),this.delay=null,e.prototype.unsubscribe.call(this)}},n}(Sr),Ze=function(){function e(n,t){t===void 0&&(t=e.now),this.schedulerActionCtor=n,this.now=t}return e.prototype.schedule=function(n,t,r){return t===void 0&&(t=0),new this.schedulerActionCtor(this,n).schedule(r,t)},e.now=tt.now,e}(),Pr=function(e){V(n,e);function n(t,r){r===void 0&&(r=Ze.now);var i=e.call(this,t,r)||this;return i.actions=[],i._active=!1,i}return n.prototype.flush=function(t){var r=this.actions;if(this._active){r.push(t);return}var i;this._active=!0;do if(i=t.execute(t.state,t.delay))break;while(t=r.shift());if(this._active=!1,i){for(;t=r.shift();)t.unsubscribe();throw i}},n}(Ze),_r=new Pr($r),Or=new I(function(e){return e.complete()});function Tr(e){return e&&m(e.schedule)}function gn(e){return e[e.length-1]}function Ir(e){return Tr(gn(e))?e.pop():void 0}function Lr(e,n){return typeof gn(e)=="number"?e.pop():n}var Ce=function(e){return e&&typeof e.length=="number"&&typeof e!="function"};function pn(e){return m(e==null?void 0:e.then)}function wn(e){return m(e[sn])}function mn(e){return Symbol.asyncIterator&&m(e==null?void 0:e[Symbol.asyncIterator])}function bn(e){return new TypeError("You provided "+(e!==null&&typeof e=="object"?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function Rr(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var xn=Rr();function An(e){return m(e==null?void 0:e[xn])}function En(e){return rt(this,arguments,function(){var t,r,i,s;return an(this,function(a){switch(a.label){case 0:t=e.getReader(),a.label=1;case 1:a.trys.push([1,,9,10]),a.label=2;case 2:return[4,he(t.read())];case 3:return r=a.sent(),i=r.value,s=r.done,s?[4,he(void 0)]:[3,5];case 4:return[2,a.sent()];case 5:return[4,he(i)];case 6:return[4,a.sent()];case 7:return a.sent(),[3,2];case 8:return[3,10];case 9:return t.releaseLock(),[7];case 10:return[2]}})})}function Sn(e){return m(e==null?void 0:e.getReader)}function q(e){if(e instanceof I)return e;if(e!=null){if(wn(e))return Cr(e);if(Ce(e))return Fr(e);if(pn(e))return Mr(e);if(mn(e))return $n(e);if(An(e))return Dr(e);if(Sn(e))return qr(e)}throw bn(e)}function Cr(e){return new I(function(n){var t=e[sn]();if(m(t.subscribe))return t.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Fr(e){return new I(function(n){for(var t=0;t<e.length&&!n.closed;t++)n.next(e[t]);n.complete()})}function Mr(e){return new I(function(n){e.then(function(t){n.closed||(n.next(t),n.complete())},function(t){return n.error(t)}).then(null,it)})}function Dr(e){return new I(function(n){var t,r;try{for(var i=st(e),s=i.next();!s.done;s=i.next()){var a=s.value;if(n.next(a),n.closed)return}}catch(u){t={error:u}}finally{try{s&&!s.done&&(r=i.return)&&r.call(i)}finally{if(t)throw t.error}}n.complete()})}function $n(e){return new I(function(n){Ur(e,n).catch(function(t){return n.error(t)})})}function qr(e){return $n(En(e))}function Ur(e,n){var t,r,i,s;return at(this,void 0,void 0,function(){var a,u;return an(this,function(l){switch(l.label){case 0:l.trys.push([0,5,6,11]),t=ot(e),l.label=1;case 1:return[4,t.next()];case 2:if(r=l.sent(),!!r.done)return[3,4];if(a=r.value,n.next(a),n.closed)return[2];l.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return u=l.sent(),i={error:u},[3,11];case 6:return l.trys.push([6,,9,10]),r&&!r.done&&(s=t.return)?[4,s.call(t)]:[3,8];case 7:l.sent(),l.label=8;case 8:return[3,10];case 9:if(i)throw i.error;return[7];case 10:return[7];case 11:return n.complete(),[2]}})})}function D(e,n,t,r,i){r===void 0&&(r=0),i===void 0&&(i=!1);var s=n.schedule(function(){t(),i?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(s),!i)return s}function Pn(e,n){return n===void 0&&(n=0),W(function(t,r){t.subscribe(Y(r,function(i){return D(r,e,function(){return r.next(i)},n)},function(){return D(r,e,function(){return r.complete()},n)},function(i){return D(r,e,function(){return r.error(i)},n)}))})}function _n(e,n){return n===void 0&&(n=0),W(function(t,r){r.add(e.schedule(function(){return t.subscribe(r)},n))})}function Gr(e,n){return q(e).pipe(_n(n),Pn(n))}function Nr(e,n){return q(e).pipe(_n(n),Pn(n))}function Br(e,n){return new I(function(t){var r=0;return n.schedule(function(){r===e.length?t.complete():(t.next(e[r++]),t.closed||this.schedule())})})}function Hr(e,n){return new I(function(t){var r;return D(t,n,function(){r=e[xn](),D(t,n,function(){var i,s,a;try{i=r.next(),s=i.value,a=i.done}catch(u){t.error(u);return}a?t.complete():t.next(s)},0,!0)}),function(){return m(r==null?void 0:r.return)&&r.return()}})}function On(e,n){if(!e)throw new Error("Iterable cannot be null");return new I(function(t){D(t,n,function(){var r=e[Symbol.asyncIterator]();D(t,n,function(){r.next().then(function(i){i.done?t.complete():t.next(i.value)})},0,!0)})})}function Kr(e,n){return On(En(e),n)}function Jr(e,n){if(e!=null){if(wn(e))return Gr(e,n);if(Ce(e))return Br(e,n);if(pn(e))return Nr(e,n);if(mn(e))return On(e,n);if(An(e))return Hr(e,n);if(Sn(e))return Kr(e,n)}throw bn(e)}function Yr(e,n){return n?Jr(e,n):q(e)}function Tn(e,n){return W(function(t,r){var i=0;t.subscribe(Y(r,function(s){r.next(e.call(n,s,i++))}))})}var Wr=Array.isArray;function Qr(e,n){return Wr(n)?e.apply(void 0,rn([],Le(n))):e(n)}function Xr(e){return Tn(function(n){return Qr(e,n)})}function Zr(e,n,t,r,i,s,a,u){var l=[],c=0,f=0,d=!1,v=function(){d&&!l.length&&!c&&n.complete()},x=function(b){return c<r?w(b):l.push(b)},w=function(b){c++;var $=!1;q(t(b,f++)).subscribe(Y(n,function(P){n.next(P)},function(){$=!0},void 0,function(){if($)try{c--;for(var P=function(){var _=l.shift();a||w(_)};l.length&&c<r;)P();v()}catch(_){n.error(_)}}))};return e.subscribe(Y(n,x,function(){d=!0,v()})),function(){}}function Fe(e,n,t){return t===void 0&&(t=1/0),m(n)?Fe(function(r,i){return Tn(function(s,a){return n(r,s,i,a)})(q(e(r,i)))},t):(typeof n=="number"&&(t=n),W(function(r,i){return Zr(r,i,e,t)}))}function zr(e){return e===void 0&&(e=1/0),Fe(ut,e)}var Vr=["addListener","removeListener"],jr=["addEventListener","removeEventListener"],kr=["on","off"];function re(e,n,t,r){if(m(t)&&(r=t,t=void 0),r)return re(e,n,t).pipe(Xr(r));var i=Le(ti(e)?jr.map(function(u){return function(l){return e[u](n,l,t)}}):ei(e)?Vr.map(ze(e,n)):ni(e)?kr.map(ze(e,n)):[],2),s=i[0],a=i[1];if(!s&&Ce(e))return Fe(function(u){return re(u,n,t)})(q(e));if(!s)throw new TypeError("Invalid event target");return new I(function(u){var l=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];return u.next(1<c.length?c:c[0])};return s(l),function(){return a(l)}})}function ze(e,n){return function(t){return function(r){return e[t](n,r)}}}function ei(e){return m(e.addListener)&&m(e.removeListener)}function ni(e){return m(e.on)&&m(e.off)}function ti(e){return m(e.addEventListener)&&m(e.removeEventListener)}function ri(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var t=Ir(e),r=Lr(e,1/0),i=e;return i.length?i.length===1?q(i[0]):zr(r)(Yr(i,t)):Or}function In(e,n){return W(function(t,r){var i=0;t.subscribe(Y(r,function(s){return e.call(n,s,i++)&&r.next(s)}))})}function Ve(e,n){return n===void 0&&(n=_r),W(function(t,r){var i=null,s=null,a=null,u=function(){if(i){i.unsubscribe(),i=null;var c=s;s=null,r.next(c)}};function l(){var c=a+e,f=n.now();if(f<c){i=this.schedule(void 0,c-f),r.add(i);return}u()}t.subscribe(Y(r,function(c){s=c,a=n.now(),i||(i=n.schedule(l,e),r.add(i))},function(){u(),r.complete()},void 0,function(){s=i=null}))})}var $e,A,G,M,N;class ii{constructor(){y(this,$e,new fe("Editor"));y(this,A,void 0);h(this,"contentChange$",new ne);h(this,"id",xr());y(this,G,void 0);y(this,M,document.createElement("div"));y(this,N,void 0);h(this,"render",n=>{n.append(o(this,M)),F(this,N,n),o(this,G)&&this.renderPath(o(this,G))});o(this,M).style.height="100%",F(this,A,Be.create(o(this,M),vr({fontSize:14,automaticLayout:!0,minimap:{enabled:!1}}))),o(this,A).onDidChangeModelContent(()=>{var n;this.contentChange$.next([(n=o(this,A).getModel())==null?void 0:n.uri.fsPath,o(this,A).getValue()])})}renderPath(n){var r,i;const t=Be.getModel(lt.parse(n));t&&((r=o(this,A))==null?void 0:r.getModel())!==t&&((i=o(this,A))==null||i.setModel(t)),F(this,G,n)}remove(){o(this,M).remove()}dispose(){var n;(n=o(this,A))==null||n.dispose()}layout(){o(this,A).layout(),o(this,N)&&(o(this,M).remove(),requestIdleCallback(()=>{this.render(o(this,N))},{timeout:1e3}))}getValue(){return o(this,A).getValue()??""}setValue(n){o(this,A).getValue()!==n&&o(this,A).setValue(n)}}$e=new WeakMap,A=new WeakMap,G=new WeakMap,M=new WeakMap,N=new WeakMap;function si(e,n="",t=document.body){const r=document.createElement("script");return n&&r.setAttribute("type",n),r.innerHTML=e,t.append(r),r}function ai(e,n="",t=document.body){const r=document.createElement("script");return n&&r.setAttribute("type",n),r.src=e,t.append(r),r}function oi(e,n=document.body){const t=document.createElement("style");return t.type="text/css",t.innerHTML=e,n.append(t),t}function ye(e){const n=document.createElement("div");return n.innerHTML=e,n.childNodes[0]}const ui=["log","error"];function li(){const e=Object.create(window.console);return ui.reduce((n,t)=>(Qe(n,`${t}$`,new X),Qe(n,t,(...r)=>{n[`${t}$`].next(r),window.console[t](...r)}),n),e),e}var Ee=(e=>(e[e.Loading=0]="Loading",e[e.Loaded=1]="Loaded",e))(Ee||{}),R,S,ie,B,O,Z,se;class Ln{constructor(){h(this,"EState",Ee);h(this,"console",li());h(this,"state$",new X);h(this,"error$",new X);h(this,"load$");h(this,"fullscreenChange$");y(this,R,ye('<iframe style="border: none; width: 100%; height: 100%"></iframe>'));y(this,S,null);y(this,ie,new fe("previewer"));y(this,B,{scripts:[],styles:[],globals:{},html:'<div id="root"></div>'});y(this,O,{scripts:new Map,styles:new Map,globals:{},html:ye("<div id='root'></div>")});y(this,Z,new ce);y(this,se,()=>{if(!o(this,S))return;o(this,S).console=this.console,o(this,S).addEventListener("error",a=>{this.error$.next(a.message)}),o(this,S).addEventListener("unhandledrejection",a=>{this.error$.next(`Unhandledrejection:
${a.reason}`)});const n=o(this,S).document.body;n.style.backgroundColor="white";const{globals:t,scripts:r,styles:i,html:s}=o(this,B);if(o(this,ie).log({globals:t}),o(this,O).html.remove(),s){const a=ye(s);n.append(a),o(this,O).html=a}Object.keys(o(this,O).globals).forEach(a=>{delete o(this,S)[a]}),Object.entries(t).forEach(([a,u])=>{o(this,S)[a]=u}),o(this,O).globals=t,i.forEach(a=>{const{id:u,content:l}=a;let c=o(this,O).styles.get(u);c?c.textContent=l:(c=oi(a.content,n),c.setAttribute("data-style-id",u),o(this,O).styles.set(u,c))}),r.forEach(a=>{const{id:u,content:l,type:c,src:f}=a;let d=o(this,O).scripts.get(u);if(d&&d.remove(),f)d=ai(f,c,n);else if(l)d=si(l,c,n);else throw new Error("script must have src or content");d.setAttribute("data-script-id",u),o(this,O).scripts.set(u,d)})});h(this,"updateSources",n=>{F(this,B,{...o(this,B),...n}),this.reload()});h(this,"render",n=>{n.append(o(this,R))});h(this,"dispose",()=>{o(this,Z).unsubscribe(),o(this,R).remove()});h(this,"requestFullscreen",()=>{if(o(this,R).isConnected)return o(this,R).requestFullscreen()});this.state$.next(0),this.load$=re(o(this,R),"load"),o(this,Z).add(this.load$.subscribe(()=>{this.state$.next(1),F(this,S,o(this,R).contentWindow),o(this,se).call(this)})),this.fullscreenChange$=re(o(this,R),"fullscreenchange")}reload(){var n;this.state$.next(0),(n=o(this,S))==null||n.location.reload()}}R=new WeakMap,S=new WeakMap,ie=new WeakMap,B=new WeakMap,O=new WeakMap,Z=new WeakMap,se=new WeakMap,h(Ln,"EState",Ee);var T,ae,z;class ci{constructor(n){h(this,"change$",new X);h(this,"newFile$",new ne);y(this,T,new ct);y(this,ae,new ce);y(this,z,void 0);this.cwd=n,F(this,z,new fe(`explore-${n}`)),o(this,ae).add(p.newFile$.pipe(In(t=>on(t,this.cwd))).subscribe(t=>{o(this,z).log(`new file ${t}`),this.newFile$.next(t)}))}renameSync(n,t){const r=()=>{this.change$.next(),p.fs.renameSync(this.resolve(t),this.resolve(n))},i=()=>{this.change$.next(),p.fs.renameSync(this.resolve(n),this.resolve(t))};o(this,T).add({undo:r,redo:i}),i()}unlinkSync(n){const t=()=>{this.change$.next(),p.fs.unlinkSync(L(this.cwd,n))},r=p.fs.readFileSync(this.resolve(n)),i=()=>{this.change$.next(),p.fs.writeFileSync(this.resolve(n),r)};o(this,T).add({undo:i,redo:t}),t()}rmdirSync(n){const t=()=>{this.change$.next(),p.fs.rmdirSync(L(this.cwd,n))},r=p.fs.getFilesByPattern([U(L(this.cwd,n),"**/*")],{onlyFiles:!0}),i=()=>{this.change$.next(),Object.entries(r).forEach(([s,a])=>{p.fs.writeFileSync(s,a)})};o(this,T).add({undo:i,redo:t}),t()}mkdirSync(n){const t=()=>{this.change$.next(),p.fs.mkdirSync(L(this.cwd,n))},r=()=>{this.change$.next(),p.fs.rmdirSync(L(this.cwd,n))};o(this,T).add({undo:r,redo:t}),t()}writeFileSync(n,t){this.change$.next(),p.fs.writeFileSync(L(this.cwd,n),t)}readFileSync(n,t){return p.fs.readFileSync(L(this.cwd,n),t)}isDirectory(n){return p.fs.statSync(L(this.cwd,n)).isDirectory()}resolve(n){return L(this.cwd,n)}relative(n){return un(this.cwd,n)}existsSync(n){return p.fs.existsSync(L(this.cwd,n))}undo(){o(this,T).undo()}redo(){o(this,T).redo()}hasUndo(){return o(this,T).hasUndo()}hasRedo(){return o(this,T).hasRedo()}}T=new WeakMap,ae=new WeakMap,z=new WeakMap;var Rn=(e=>(e[e.Start=0]="Start",e[e.LoadingEsbuildWasm=1]="LoadingEsbuildWasm",e[e.Building=2]="Building",e[e.Error=3]="Error",e[e.Done=4]="Done",e))(Rn||{}),H,E,C,g,oe,Cn;const ue=class ue{constructor(n){y(this,oe);h(this,"EBuildState",Rn);h(this,"id");h(this,"cwd");h(this,"editor",new ii);h(this,"previewer",new Ln);h(this,"explore");h(this,"fs$");h(this,"debouncedFs$");h(this,"directoryTreePaths$",new ne);h(this,"buildState$",new Xe(0));h(this,"selectedPath$",new ne);h(this,"buildResult$",new Xe(void 0));y(this,E,void 0);y(this,C,new ce);y(this,g,void 0);const t={buildInputPattern:[U(n.cwd,"**/*"),U(n.cwd,"*"),"/node_modules/**/*.js"],buildOptions:{},globalExternals:{},directoryTreePathsPattern:[U(n.cwd,"**/*"),U(n.cwd,"*")]};F(this,g,{...t,...mr(n,hr),entry:n.entry?ft(n.entry)?n.entry:U(n.cwd,n.entry):""}),this.explore=new ci(o(this,g).cwd),this.id=o(this,g).cwd,this.cwd=o(this,g).cwd,F(this,E,new fe(`playground-${this.id}`)),this.fs$=ri(this.explore.newFile$,this.explore.change$),this.debouncedFs$=this.fs$.pipe(Ve(200)),o(this,C).add(this.editor.contentChange$.pipe(Ve(500)).subscribe(([r,i])=>{!r||!on(r,o(this,g).cwd)||this.explore.writeFileSync(r,i)})),o(this,C).add(this.explore.newFile$.pipe(In(r=>r===o(this,g).entry)).subscribe(()=>{this.editor.renderPath(o(this,g).entry)})),o(this,C).add(this.selectedPath$.subscribe(r=>{o(this,E).log("selectedPath$",r),this.editor.renderPath(this.explore.resolve(r))})),o(this,C).add(this.debouncedFs$.subscribe(()=>this.build())),o(this,C).add(this.debouncedFs$.subscribe(()=>{const r=this.getDirectoryTreePaths();o(this,E).log("directoryTreePaths$",r),this.directoryTreePaths$.next(r)})),o(this,C).add(this.explore.newFile$.subscribe(r=>{o(this,g).entry||["index.ts","index.tsx","src/index.ts","src/index.tsx"].map(i=>this.explore.resolve(i)).includes(this.explore.resolve(r))&&(o(this,g).entry=this.explore.resolve(r)),o(this,g).entry!==""&&this.explore.resolve(r)===o(this,g).entry&&this.selectedPath$.next(this.getEntryPathRelativeCwd())}))}static create(n){if(o(this,H).has(n.cwd))return o(this,H).get(n.cwd);const t=new ue(n);return o(this,H).set(n.cwd,t),t}getDirectoryTreePaths(){return p.fs.globSync(o(this,g).directoryTreePathsPattern,{onlyFiles:!1}).map(t=>un(o(this,g).cwd,t))}async build(){o(this,E).timeAsyncFn(()=>De(this,oe,Cn).call(this),"build")}destroy(){o(this,C).unsubscribe(),this.editor.dispose(),this.previewer.dispose()}getEntryPathRelativeCwd(){return this.explore.relative(o(this,g).entry)}async download(){const n=new dt;return this.getDirectoryTreePaths().forEach(r=>{this.explore.isDirectory(r)||n.file(r,this.explore.readFileSync(r,"utf-8"))}),n.generateAsync({type:"blob"}).then(function(r){ht.saveAs(r,"playground.zip")})}};H=new WeakMap,E=new WeakMap,C=new WeakMap,g=new WeakMap,oe=new WeakSet,Cn=async function(){this.buildState$.next(1),o(this,E).log("loading esbuild.wasm..."),await He.load(),this.buildState$.next(2),o(this,E).log("building...");const{globalExternals:n={},buildInputPattern:t,buildOptions:r}=o(this,g),i=Object.entries(p.fs.getFilesByPattern(t)).reduce((s,[a,u])=>(s[this.explore.relative(a)]=u,s),{});if(!p.fs.existsSync(o(this,g).entry)){this.buildState$.next(3),this.buildResult$.next({buildError:new Error(`Entry file "${this.getEntryPathRelativeCwd()}" not found`),css:"",errors:[],hash:"",js:""}),o(this,E).log("build error");return}if(!p.fs.statSync(o(this,g).entry).isFile()){this.buildState$.next(3),this.buildResult$.next({buildError:new Error(`Entry file "${this.getEntryPathRelativeCwd()}" is not a file`),css:"",errors:[],hash:"",js:""}),o(this,E).log("build error");return}return He.build({input:i,entry:this.getEntryPathRelativeCwd(),globalExternals:n,...r}).then(s=>{var f;if(s.errors.length>0||s.buildError){this.buildState$.next(3),this.buildResult$.next(s),o(this,E).log("build error");return}if(o(this,E).log("build success"),this.buildState$.next(4),((f=this.buildResult$.getValue())==null?void 0:f.hash)===s.hash){o(this,E).log("hash equals");return}this.buildResult$.next(s);const{css:u,js:l,globalExternals:c}=s;this.previewer.updateSources({scripts:[{id:"externals",content:`var module = {exports: { default: {} }};
          function require (name) {
            var value = module.exports[name] || (module.exports.default ? module.exports.default[name] : null);
            if (value) {
              value.__esModule = true;
              return value;
            }
          
            throw new Error("module not found: " + name);
          }
          
          ${p.template.externals.cjsCode}
            `},{id:"build",content:l??""}],styles:[{id:"build",content:u??""}],globals:c})})},y(ue,H,new Map);let Se=ue;const Fn=e=>ge.createElement(ln.Provider,{value:e.value},e.children),fi=ge.memo(e=>{const{entry:n,globalExternals:t,buildInputPattern:r,directoryTreePathsPattern:i,cwd:s,buildOptions:a,children:u}=e,l=Pe.useMemo(()=>Se.create({cwd:s,entry:n,globalExternals:t,buildInputPattern:r,buildOptions:a,directoryTreePathsPattern:i}),[r,t,n,a,i,s]);return ge.createElement(Fn,{value:l,children:u})},(e,n)=>{const t=["globalExternals","buildOptions","children"];return Object.keys(e).every(r=>t.includes(r)?e[r]===n[r]:JSON.stringify(e[r])===JSON.stringify(n[r]))});Fn.__docgenInfo={description:"",methods:[],displayName:"PlaygroundProvider",props:{value:{required:!0,tsType:{name:"Playground"},description:""}}};fi.__docgenInfo={description:"",methods:[],displayName:"PlaygroundProviderBuilder",props:{globalExternals:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"any"}],raw:"Record<string, any>"},description:""},entry:{required:!1,tsType:{name:"string"},description:'The entry file to be built and auto selected, can be absolute path or relative path, if not set, it will be auto resolved from cwd in these files: ["./index.ts", "./index.tsx", "./src/index.ts", "./src.index.tsx"]'},buildInputPattern:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:`The input of esbuild, can be glob pattern
@default  [
        join(options.cwd, "**\\/*"),
        join(options.cwd, "\\/*"),
        "/node_modules\\/**\\/*.js",
      ]`},buildOptions:{required:!1,tsType:{name:"Omit",elements:[{name:"IBuildOptions"},{name:"union",raw:'"entry" | "input" | "globalExternals"',elements:[{name:"literal",value:'"entry"'},{name:"literal",value:'"input"'},{name:"literal",value:'"globalExternals"'}]}],raw:'Omit<IBuildOptions, "entry" | "input" | "globalExternals">'},description:"@default {}"},directoryTreePathsPattern:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:`@default  [
        join(options.cwd, "**\\/*"),
        join(options.cwd, "\\/*"),
      ]`},cwd:{required:!0,tsType:{name:"string"},description:'@default "/"'},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};export{ui as C,fi as P,In as a,Se as b,Fn as c,Ve as d,Tn as e,re as f,yt as i,ri as m,yi as u};
