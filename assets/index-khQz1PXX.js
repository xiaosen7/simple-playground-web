var Fn=Object.defineProperty;var Dn=(e,n,t)=>n in e?Fn(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var h=(e,n,t)=>(Dn(e,typeof n!="symbol"?n+"":n,t),t),de=(e,n,t)=>{if(!n.has(e))throw TypeError("Cannot "+t)};var u=(e,n,t)=>(de(e,n,"read from private field"),t?t.call(e):n.get(e)),y=(e,n,t)=>{if(n.has(e))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(e):n.set(e,t)},M=(e,n,t,r)=>(de(e,n,"write to private field"),r?r.call(e,t):n.set(e,t),t);var qe=(e,n,t)=>(de(e,n,"access private method"),t);import{r as $e,R as pe}from"./index-CBqU2yxZ.js";import{s as qn,o as Un,i as je,g as K,h as ke,k as Oe,l as Ie,n as Te,M as Gn,S as Ue,U as Ge,q as Ne,r as Be,u as we,v as Q,w as en,x as J,y as me,z as Nn,A as Le,B as le,C as Bn,D as xe,E as nn,F as Hn,G as Kn,H as tn,I as Jn,J as Yn,K as Wn,L as Qn,N as Xn,O as Zn,P as zn,Q as Vn,R as jn,d as kn,T as m,_ as V,V as et,W as ne,X as fe,Y as rn,Z as Re,$ as nt,a0 as tt,a1 as T,a2 as sn,a3 as rt,a4 as an,a5 as he,a6 as it,a7 as st,a8 as at,a9 as ut,aa as ot,ab as ce,ac as X,ad as He,ae as lt,p,af as un,ag as ft,j as U,ah as L,ai as on,aj as ct,b as Ke}from"./undomanager-CK-6DZh3.js";const ln=$e.createContext(null);function hi(){const e=$e.useContext(ln);if(!e)throw new Error("usePlayground must be used within a PlaygroundProvider");return e}function dt(e,n){return qn(Un(e,n,je),e+"")}function ht(e,n,t){if(!K(t))return!1;var r=typeof n;return(r=="number"?ke(t)&&Oe(n,t.length):r=="string"&&n in t)?Ie(t[n],e):!1}function vt(e){return dt(function(n,t){var r=-1,i=t.length,s=i>1?t[i-1]:void 0,a=i>2?t[2]:void 0;for(s=e.length>3&&typeof s=="function"?(i--,s):void 0,a&&ht(t[0],t[1],a)&&(s=i<3?void 0:s,i=1),n=Object(n);++r<i;){var o=t[r];o&&e(n,o,r,s)}return n})}function yt(e,n,t){var r=e==null?void 0:Te(e,n);return r===void 0?t:r}var gt="__lodash_hash_undefined__";function pt(e){return this.__data__.set(e,gt),this}function wt(e){return this.__data__.has(e)}function te(e){var n=-1,t=e==null?0:e.length;for(this.__data__=new Gn;++n<t;)this.add(e[n])}te.prototype.add=te.prototype.push=pt;te.prototype.has=wt;function mt(e,n){for(var t=-1,r=e==null?0:e.length;++t<r;)if(n(e[t],t,e))return!0;return!1}function xt(e,n){return e.has(n)}var bt=1,At=2;function fn(e,n,t,r,i,s){var a=t&bt,o=e.length,l=n.length;if(o!=l&&!(a&&l>o))return!1;var f=s.get(e),c=s.get(n);if(f&&c)return f==n&&c==e;var d=-1,v=!0,b=t&At?new te:void 0;for(s.set(e,n),s.set(n,e);++d<o;){var w=e[d],x=n[d];if(r)var P=a?r(x,w,d,n,e,s):r(w,x,d,e,n,s);if(P!==void 0){if(P)continue;v=!1;break}if(b){if(!mt(n,function(_,$){if(!xt(b,$)&&(w===_||i(w,_,t,r,s)))return b.push($)})){v=!1;break}}else if(!(w===x||i(w,x,t,r,s))){v=!1;break}}return s.delete(e),s.delete(n),v}function Et(e){var n=-1,t=Array(e.size);return e.forEach(function(r,i){t[++n]=[i,r]}),t}function St(e){var n=-1,t=Array(e.size);return e.forEach(function(r){t[++n]=r}),t}var Pt=1,_t=2,$t="[object Boolean]",Ot="[object Date]",It="[object Error]",Tt="[object Map]",Lt="[object Number]",Rt="[object RegExp]",Ct="[object Set]",Mt="[object String]",Ft="[object Symbol]",Dt="[object ArrayBuffer]",qt="[object DataView]",Je=Ue?Ue.prototype:void 0,ve=Je?Je.valueOf:void 0;function Ut(e,n,t,r,i,s,a){switch(t){case qt:if(e.byteLength!=n.byteLength||e.byteOffset!=n.byteOffset)return!1;e=e.buffer,n=n.buffer;case Dt:return!(e.byteLength!=n.byteLength||!s(new Ge(e),new Ge(n)));case $t:case Ot:case Lt:return Ie(+e,+n);case It:return e.name==n.name&&e.message==n.message;case Rt:case Mt:return e==n+"";case Tt:var o=Et;case Ct:var l=r&Pt;if(o||(o=St),e.size!=n.size&&!l)return!1;var f=a.get(e);if(f)return f==n;r|=_t,a.set(e,n);var c=fn(o(e),o(n),r,i,s,a);return a.delete(e),c;case Ft:if(ve)return ve.call(e)==ve.call(n)}return!1}var Gt=1,Nt=Object.prototype,Bt=Nt.hasOwnProperty;function Ht(e,n,t,r,i,s){var a=t&Gt,o=Ne(e),l=o.length,f=Ne(n),c=f.length;if(l!=c&&!a)return!1;for(var d=l;d--;){var v=o[d];if(!(a?v in n:Bt.call(n,v)))return!1}var b=s.get(e),w=s.get(n);if(b&&w)return b==n&&w==e;var x=!0;s.set(e,n),s.set(n,e);for(var P=a;++d<l;){v=o[d];var _=e[v],$=n[v];if(r)var De=a?r($,_,v,n,e,s):r(_,$,v,e,n,s);if(!(De===void 0?_===$||i(_,$,t,r,s):De)){x=!1;break}P||(P=v=="constructor")}if(x&&!P){var j=e.constructor,k=n.constructor;j!=k&&"constructor"in e&&"constructor"in n&&!(typeof j=="function"&&j instanceof j&&typeof k=="function"&&k instanceof k)&&(x=!1)}return s.delete(e),s.delete(n),x}var Kt=1,Ye="[object Arguments]",We="[object Array]",ee="[object Object]",Jt=Object.prototype,Qe=Jt.hasOwnProperty;function Yt(e,n,t,r,i,s){var a=J(e),o=J(n),l=a?We:Be(e),f=o?We:Be(n);l=l==Ye?ee:l,f=f==Ye?ee:f;var c=l==ee,d=f==ee,v=l==f;if(v&&we(e)){if(!we(n))return!1;a=!0,c=!1}if(v&&!c)return s||(s=new Q),a||en(e)?fn(e,n,t,r,i,s):Ut(e,n,l,t,r,i,s);if(!(t&Kt)){var b=c&&Qe.call(e,"__wrapped__"),w=d&&Qe.call(n,"__wrapped__");if(b||w){var x=b?e.value():e,P=w?n.value():n;return s||(s=new Q),i(x,P,t,r,s)}}return v?(s||(s=new Q),Ht(e,n,t,r,i,s)):!1}function Ce(e,n,t,r,i){return e===n?!0:e==null||n==null||!me(e)&&!me(n)?e!==e&&n!==n:Yt(e,n,t,r,Ce,i)}var Wt=1,Qt=2;function Xt(e,n,t,r){var i=t.length,s=i;if(e==null)return!s;for(e=Object(e);i--;){var a=t[i];if(a[2]?a[1]!==e[a[0]]:!(a[0]in e))return!1}for(;++i<s;){a=t[i];var o=a[0],l=e[o],f=a[1];if(a[2]){if(l===void 0&&!(o in e))return!1}else{var c=new Q,d;if(!(d===void 0?Ce(f,l,Wt|Qt,r,c):d))return!1}}return!0}function cn(e){return e===e&&!K(e)}function Zt(e){for(var n=Nn(e),t=n.length;t--;){var r=n[t],i=e[r];n[t]=[r,i,cn(i)]}return n}function dn(e,n){return function(t){return t==null?!1:t[e]===n&&(n!==void 0||e in Object(t))}}function zt(e){var n=Zt(e);return n.length==1&&n[0][2]?dn(n[0][0],n[0][1]):function(t){return t===e||Xt(t,e,n)}}function Vt(e,n){return e!=null&&n in Object(e)}function jt(e,n,t){n=Le(n,e);for(var r=-1,i=n.length,s=!1;++r<i;){var a=le(n[r]);if(!(s=e!=null&&t(e,a)))break;e=e[a]}return s||++r!=i?s:(i=e==null?0:e.length,!!i&&Bn(i)&&Oe(a,i)&&(J(e)||xe(e)))}function kt(e,n){return e!=null&&jt(e,n,Vt)}var er=1,nr=2;function tr(e,n){return nn(e)&&cn(n)?dn(le(e),n):function(t){var r=yt(t,e);return r===void 0&&r===n?kt(t,e):Ce(n,r,er|nr)}}function rr(e){return function(n){return n==null?void 0:n[e]}}function ir(e){return function(n){return Te(n,e)}}function sr(e){return nn(e)?rr(le(e)):ir(e)}function hn(e){return typeof e=="function"?e:e==null?je:typeof e=="object"?J(e)?tr(e[0],e[1]):zt(e):sr(e)}function ar(e){return function(n,t,r){for(var i=-1,s=Object(n),a=r(n),o=a.length;o--;){var l=a[++i];if(t(s[l],l,s)===!1)break}return n}}var ur=ar();function be(e,n,t){(t!==void 0&&!Ie(e[n],t)||t===void 0&&!(n in e))&&Hn(e,n,t)}function or(e){return me(e)&&ke(e)}function Ae(e,n){if(!(n==="constructor"&&typeof e[n]=="function")&&n!="__proto__")return e[n]}function lr(e){return Kn(e,tn(e))}function fr(e,n,t,r,i,s,a){var o=Ae(e,t),l=Ae(n,t),f=a.get(l);if(f){be(e,t,f);return}var c=s?s(o,l,t+"",e,n,a):void 0,d=c===void 0;if(d){var v=J(l),b=!v&&we(l),w=!v&&!b&&en(l);c=l,v||b||w?J(o)?c=o:or(o)?c=Jn(o):b?(d=!1,c=Yn(l,!0)):w?(d=!1,c=Wn(l,!0)):c=[]:Qn(l)||xe(l)?(c=o,xe(o)?c=lr(o):(!K(o)||Xn(o))&&(c=Zn(l))):d=!1}d&&(a.set(l,c),i(c,l,r,s,a),a.delete(l)),be(e,t,c)}function vn(e,n,t,r,i){e!==n&&ur(n,function(s,a){if(i||(i=new Q),K(s))fr(e,n,a,t,vn,r,i);else{var o=r?r(Ae(e,a),s,a+"",e,n,i):void 0;o===void 0&&(o=s),be(e,a,o)}},tn)}function cr(e){return e==null}var dr=vt(function(e,n,t){vn(e,n,t)}),hr="Expected a function";function vr(e){if(typeof e!="function")throw new TypeError(hr);return function(){var n=arguments;switch(n.length){case 0:return!e.call(this);case 1:return!e.call(this,n[0]);case 2:return!e.call(this,n[0],n[1]);case 3:return!e.call(this,n[0],n[1],n[2])}return!e.apply(this,n)}}function yn(e,n,t,r){if(!K(e))return e;n=Le(n,e);for(var i=-1,s=n.length,a=s-1,o=e;o!=null&&++i<s;){var l=le(n[i]),f=t;if(l==="__proto__"||l==="constructor"||l==="prototype")return e;if(i!=a){var c=o[l];f=void 0,f===void 0&&(f=K(c)?c:Oe(n[i+1])?[]:{})}zn(o,l,f),o=o[l]}return e}function yr(e,n,t){for(var r=-1,i=n.length,s={};++r<i;){var a=n[r],o=Te(e,a);t(o,a)&&yn(s,Le(a,e),o)}return s}function gr(e,n){if(e==null)return{};var t=Vn(jn(e),function(r){return[r]});return n=hn(n),yr(e,t,function(r,i){return n(r,i[0])})}function pr(e,n){return gr(e,vr(hn(n)))}function Xe(e,n,t){return e==null?e:yn(e,n,t)}var wr=0;function mr(e){var n=++wr;return kn(e)+n}function xr(e){return m(e==null?void 0:e.lift)}function W(e){return function(n){if(xr(n))return n.lift(function(t){try{return e(t,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function Y(e,n,t,r,i){return new br(e,n,t,r,i)}var br=function(e){V(n,e);function n(t,r,i,s,a,o){var l=e.call(this,t)||this;return l.onFinalize=a,l.shouldUnsubscribe=o,l._next=r?function(f){try{r(f)}catch(c){t.error(c)}}:e.prototype._next,l._error=s?function(f){try{s(f)}catch(c){t.error(c)}finally{this.unsubscribe()}}:e.prototype._error,l._complete=i?function(){try{i()}catch(f){t.error(f)}finally{this.unsubscribe()}}:e.prototype._complete,l}return n.prototype.unsubscribe=function(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var r=this.closed;e.prototype.unsubscribe.call(this),!r&&((t=this.onFinalize)===null||t===void 0||t.call(this))}},n}(et),Ze=function(e){V(n,e);function n(t){var r=e.call(this)||this;return r._value=t,r}return Object.defineProperty(n.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),n.prototype._subscribe=function(t){var r=e.prototype._subscribe.call(this,t);return!r.closed&&t.next(this._value),r},n.prototype.getValue=function(){var t=this,r=t.hasError,i=t.thrownError,s=t._value;if(r)throw i;return this._throwIfClosed(),s},n.prototype.next=function(t){e.prototype.next.call(this,this._value=t)},n}(ne),Ar=function(e){V(n,e);function n(t,r){return e.call(this)||this}return n.prototype.schedule=function(t,r){return this},n}(fe),Ee={setInterval:function(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];return setInterval.apply(void 0,rn([e,n],Re(t)))},clearInterval:function(e){var n=Ee.delegate;return((n==null?void 0:n.clearInterval)||clearInterval)(e)},delegate:void 0},Er=function(e){V(n,e);function n(t,r){var i=e.call(this,t,r)||this;return i.scheduler=t,i.work=r,i.pending=!1,i}return n.prototype.schedule=function(t,r){var i;if(r===void 0&&(r=0),this.closed)return this;this.state=t;var s=this.id,a=this.scheduler;return s!=null&&(this.id=this.recycleAsyncId(a,s,r)),this.pending=!0,this.delay=r,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(a,this.id,r),this},n.prototype.requestAsyncId=function(t,r,i){return i===void 0&&(i=0),Ee.setInterval(t.flush.bind(t,this),i)},n.prototype.recycleAsyncId=function(t,r,i){if(i===void 0&&(i=0),i!=null&&this.delay===i&&this.pending===!1)return r;r!=null&&Ee.clearInterval(r)},n.prototype.execute=function(t,r){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var i=this._execute(t,r);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},n.prototype._execute=function(t,r){var i=!1,s;try{this.work(t)}catch(a){i=!0,s=a||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),s},n.prototype.unsubscribe=function(){if(!this.closed){var t=this,r=t.id,i=t.scheduler,s=i.actions;this.work=this.state=this.scheduler=null,this.pending=!1,nt(s,this),r!=null&&(this.id=this.recycleAsyncId(i,r,null)),this.delay=null,e.prototype.unsubscribe.call(this)}},n}(Ar),ze=function(){function e(n,t){t===void 0&&(t=e.now),this.schedulerActionCtor=n,this.now=t}return e.prototype.schedule=function(n,t,r){return t===void 0&&(t=0),new this.schedulerActionCtor(this,n).schedule(r,t)},e.now=tt.now,e}(),Sr=function(e){V(n,e);function n(t,r){r===void 0&&(r=ze.now);var i=e.call(this,t,r)||this;return i.actions=[],i._active=!1,i}return n.prototype.flush=function(t){var r=this.actions;if(this._active){r.push(t);return}var i;this._active=!0;do if(i=t.execute(t.state,t.delay))break;while(t=r.shift());if(this._active=!1,i){for(;t=r.shift();)t.unsubscribe();throw i}},n}(ze),Pr=new Sr(Er),_r=new T(function(e){return e.complete()});function $r(e){return e&&m(e.schedule)}function gn(e){return e[e.length-1]}function Or(e){return $r(gn(e))?e.pop():void 0}function Ir(e,n){return typeof gn(e)=="number"?e.pop():n}var Me=function(e){return e&&typeof e.length=="number"&&typeof e!="function"};function pn(e){return m(e==null?void 0:e.then)}function wn(e){return m(e[sn])}function mn(e){return Symbol.asyncIterator&&m(e==null?void 0:e[Symbol.asyncIterator])}function xn(e){return new TypeError("You provided "+(e!==null&&typeof e=="object"?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function Tr(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var bn=Tr();function An(e){return m(e==null?void 0:e[bn])}function En(e){return rt(this,arguments,function(){var t,r,i,s;return an(this,function(a){switch(a.label){case 0:t=e.getReader(),a.label=1;case 1:a.trys.push([1,,9,10]),a.label=2;case 2:return[4,he(t.read())];case 3:return r=a.sent(),i=r.value,s=r.done,s?[4,he(void 0)]:[3,5];case 4:return[2,a.sent()];case 5:return[4,he(i)];case 6:return[4,a.sent()];case 7:return a.sent(),[3,2];case 8:return[3,10];case 9:return t.releaseLock(),[7];case 10:return[2]}})})}function Sn(e){return m(e==null?void 0:e.getReader)}function q(e){if(e instanceof T)return e;if(e!=null){if(wn(e))return Lr(e);if(Me(e))return Rr(e);if(pn(e))return Cr(e);if(mn(e))return Pn(e);if(An(e))return Mr(e);if(Sn(e))return Fr(e)}throw xn(e)}function Lr(e){return new T(function(n){var t=e[sn]();if(m(t.subscribe))return t.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Rr(e){return new T(function(n){for(var t=0;t<e.length&&!n.closed;t++)n.next(e[t]);n.complete()})}function Cr(e){return new T(function(n){e.then(function(t){n.closed||(n.next(t),n.complete())},function(t){return n.error(t)}).then(null,it)})}function Mr(e){return new T(function(n){var t,r;try{for(var i=st(e),s=i.next();!s.done;s=i.next()){var a=s.value;if(n.next(a),n.closed)return}}catch(o){t={error:o}}finally{try{s&&!s.done&&(r=i.return)&&r.call(i)}finally{if(t)throw t.error}}n.complete()})}function Pn(e){return new T(function(n){Dr(e,n).catch(function(t){return n.error(t)})})}function Fr(e){return Pn(En(e))}function Dr(e,n){var t,r,i,s;return at(this,void 0,void 0,function(){var a,o;return an(this,function(l){switch(l.label){case 0:l.trys.push([0,5,6,11]),t=ut(e),l.label=1;case 1:return[4,t.next()];case 2:if(r=l.sent(),!!r.done)return[3,4];if(a=r.value,n.next(a),n.closed)return[2];l.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return o=l.sent(),i={error:o},[3,11];case 6:return l.trys.push([6,,9,10]),r&&!r.done&&(s=t.return)?[4,s.call(t)]:[3,8];case 7:l.sent(),l.label=8;case 8:return[3,10];case 9:if(i)throw i.error;return[7];case 10:return[7];case 11:return n.complete(),[2]}})})}function D(e,n,t,r,i){r===void 0&&(r=0),i===void 0&&(i=!1);var s=n.schedule(function(){t(),i?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(s),!i)return s}function _n(e,n){return n===void 0&&(n=0),W(function(t,r){t.subscribe(Y(r,function(i){return D(r,e,function(){return r.next(i)},n)},function(){return D(r,e,function(){return r.complete()},n)},function(i){return D(r,e,function(){return r.error(i)},n)}))})}function $n(e,n){return n===void 0&&(n=0),W(function(t,r){r.add(e.schedule(function(){return t.subscribe(r)},n))})}function qr(e,n){return q(e).pipe($n(n),_n(n))}function Ur(e,n){return q(e).pipe($n(n),_n(n))}function Gr(e,n){return new T(function(t){var r=0;return n.schedule(function(){r===e.length?t.complete():(t.next(e[r++]),t.closed||this.schedule())})})}function Nr(e,n){return new T(function(t){var r;return D(t,n,function(){r=e[bn](),D(t,n,function(){var i,s,a;try{i=r.next(),s=i.value,a=i.done}catch(o){t.error(o);return}a?t.complete():t.next(s)},0,!0)}),function(){return m(r==null?void 0:r.return)&&r.return()}})}function On(e,n){if(!e)throw new Error("Iterable cannot be null");return new T(function(t){D(t,n,function(){var r=e[Symbol.asyncIterator]();D(t,n,function(){r.next().then(function(i){i.done?t.complete():t.next(i.value)})},0,!0)})})}function Br(e,n){return On(En(e),n)}function Hr(e,n){if(e!=null){if(wn(e))return qr(e,n);if(Me(e))return Gr(e,n);if(pn(e))return Ur(e,n);if(mn(e))return On(e,n);if(An(e))return Nr(e,n);if(Sn(e))return Br(e,n)}throw xn(e)}function Kr(e,n){return n?Hr(e,n):q(e)}function In(e,n){return W(function(t,r){var i=0;t.subscribe(Y(r,function(s){r.next(e.call(n,s,i++))}))})}var Jr=Array.isArray;function Yr(e,n){return Jr(n)?e.apply(void 0,rn([],Re(n))):e(n)}function Wr(e){return In(function(n){return Yr(e,n)})}function Qr(e,n,t,r,i,s,a,o){var l=[],f=0,c=0,d=!1,v=function(){d&&!l.length&&!f&&n.complete()},b=function(x){return f<r?w(x):l.push(x)},w=function(x){f++;var P=!1;q(t(x,c++)).subscribe(Y(n,function(_){n.next(_)},function(){P=!0},void 0,function(){if(P)try{f--;for(var _=function(){var $=l.shift();a||w($)};l.length&&f<r;)_();v()}catch($){n.error($)}}))};return e.subscribe(Y(n,b,function(){d=!0,v()})),function(){}}function Fe(e,n,t){return t===void 0&&(t=1/0),m(n)?Fe(function(r,i){return In(function(s,a){return n(r,s,i,a)})(q(e(r,i)))},t):(typeof n=="number"&&(t=n),W(function(r,i){return Qr(r,i,e,t)}))}function Xr(e){return e===void 0&&(e=1/0),Fe(ot,e)}var Zr=["addListener","removeListener"],zr=["addEventListener","removeEventListener"],Vr=["on","off"];function re(e,n,t,r){if(m(t)&&(r=t,t=void 0),r)return re(e,n,t).pipe(Wr(r));var i=Re(ei(e)?zr.map(function(o){return function(l){return e[o](n,l,t)}}):jr(e)?Zr.map(Ve(e,n)):kr(e)?Vr.map(Ve(e,n)):[],2),s=i[0],a=i[1];if(!s&&Me(e))return Fe(function(o){return re(o,n,t)})(q(e));if(!s)throw new TypeError("Invalid event target");return new T(function(o){var l=function(){for(var f=[],c=0;c<arguments.length;c++)f[c]=arguments[c];return o.next(1<f.length?f:f[0])};return s(l),function(){return a(l)}})}function Ve(e,n){return function(t){return function(r){return e[t](n,r)}}}function jr(e){return m(e.addListener)&&m(e.removeListener)}function kr(e){return m(e.on)&&m(e.off)}function ei(e){return m(e.addEventListener)&&m(e.removeEventListener)}function ni(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var t=Or(e),r=Ir(e,1/0),i=e;return i.length?i.length===1?q(i[0]):Xr(r)(Kr(i,t)):_r}function Tn(e,n){return W(function(t,r){var i=0;t.subscribe(Y(r,function(s){return e.call(n,s,i++)&&r.next(s)}))})}function ye(e,n){return n===void 0&&(n=Pr),W(function(t,r){var i=null,s=null,a=null,o=function(){if(i){i.unsubscribe(),i=null;var f=s;s=null,r.next(f)}};function l(){var f=a+e,c=n.now();if(c<f){i=this.schedule(void 0,f-c),r.add(i);return}o()}t.subscribe(Y(r,function(f){s=f,a=n.now(),i||(i=n.schedule(l,e),r.add(i))},function(){o(),r.complete()},void 0,function(){s=i=null}))})}var _e,A,G,F,N;class ti{constructor(){y(this,_e,new ce("Editor"));y(this,A,void 0);h(this,"contentChange$",new X);h(this,"id",mr());y(this,G,void 0);y(this,F,document.createElement("div"));y(this,N,void 0);h(this,"render",n=>{n.append(u(this,F)),M(this,N,n),u(this,G)&&this.renderPath(u(this,G))});u(this,F).style.height="100%",M(this,A,He.create(u(this,F),dr({fontSize:14,automaticLayout:!0,minimap:{enabled:!1}}))),u(this,A).onDidChangeModelContent(()=>{var n;this.contentChange$.next([(n=u(this,A).getModel())==null?void 0:n.uri.fsPath,u(this,A).getValue()])})}renderPath(n){var r,i;const t=He.getModel(lt.parse(n));t&&((r=u(this,A))==null?void 0:r.getModel())!==t&&((i=u(this,A))==null||i.setModel(t)),M(this,G,n)}remove(){u(this,F).remove()}dispose(){var n;(n=u(this,A))==null||n.dispose()}layout(){u(this,A).layout(),u(this,N)&&(u(this,F).remove(),requestIdleCallback(()=>{this.render(u(this,N))},{timeout:1e3}))}getValue(){return u(this,A).getValue()??""}setValue(n){u(this,A).getValue()!==n&&u(this,A).setValue(n)}}_e=new WeakMap,A=new WeakMap,G=new WeakMap,F=new WeakMap,N=new WeakMap;function ri(e,n="",t=document.body){const r=document.createElement("script");return n&&r.setAttribute("type",n),r.innerHTML=e,t.append(r),r}function ii(e,n="",t=document.body){const r=document.createElement("script");return n&&r.setAttribute("type",n),r.src=e,t.append(r),r}function si(e,n=document.body){const t=document.createElement("style");return t.type="text/css",t.innerHTML=e,n.append(t),t}function ge(e){const n=document.createElement("div");return n.innerHTML=e,n.childNodes[0]}const ai=["log","error"];function ui(){const e=Object.create(window.console);return ai.reduce((n,t)=>(Xe(n,`${t}$`,new X),Xe(n,t,(...r)=>{n[`${t}$`].next(r),window.console[t](...r)}),n),e),e}var Se=(e=>(e[e.Loading=0]="Loading",e[e.Loaded=1]="Loaded",e))(Se||{}),R,S,ie,B,O,Z,se;class Ln{constructor(){h(this,"EState",Se);h(this,"console",ui());h(this,"state$",new ne);h(this,"error$",new ne);h(this,"load$");h(this,"fullscreenChange$");y(this,R,ge('<iframe style="border: none; width: 100%; height: 100%"></iframe>'));y(this,S,null);y(this,ie,new ce("previewer"));y(this,B,{scripts:[],styles:[],globals:{},html:'<div id="root"></div>'});y(this,O,{scripts:new Map,styles:new Map,globals:{},html:ge("<div id='root'></div>")});y(this,Z,new fe);y(this,se,()=>{if(!u(this,S))return;u(this,S).console=this.console,u(this,S).addEventListener("error",a=>{this.error$.next(a.message)}),u(this,S).addEventListener("unhandledrejection",a=>{this.error$.next(`Unhandledrejection:
${a.reason}`)});const n=u(this,S).document.body;n.style.backgroundColor="white";const{globals:t,scripts:r,styles:i,html:s}=u(this,B);if(u(this,ie).log({globals:t}),u(this,O).html.remove(),s){const a=ge(s);n.append(a),u(this,O).html=a}Object.keys(u(this,O).globals).forEach(a=>{delete u(this,S)[a]}),Object.entries(t).forEach(([a,o])=>{u(this,S)[a]=o}),u(this,O).globals=t,i.forEach(a=>{const{id:o,content:l}=a;let f=u(this,O).styles.get(o);f?f.textContent=l:(f=si(a.content,n),f.setAttribute("data-style-id",o),u(this,O).styles.set(o,f))}),r.forEach(a=>{const{id:o,content:l,type:f,src:c}=a;let d=u(this,O).scripts.get(o);if(d&&d.remove(),c)d=ii(c,f,n);else if(l)d=ri(l,f,n);else throw new Error("script must have src or content");d.setAttribute("data-script-id",o),u(this,O).scripts.set(o,d)})});h(this,"updateSources",n=>{M(this,B,{...u(this,B),...n}),this.reload()});h(this,"render",n=>{n.append(u(this,R))});h(this,"dispose",()=>{u(this,Z).unsubscribe(),u(this,R).remove()});h(this,"requestFullscreen",()=>{if(u(this,R).isConnected)return u(this,R).requestFullscreen()});this.state$.next(0),this.load$=re(u(this,R),"load"),u(this,Z).add(this.load$.subscribe(()=>{this.state$.next(1),M(this,S,u(this,R).contentWindow),u(this,se).call(this)})),this.fullscreenChange$=re(u(this,R),"fullscreenchange")}reload(){var n;this.state$.next(0),(n=u(this,S))==null||n.location.reload()}}R=new WeakMap,S=new WeakMap,ie=new WeakMap,B=new WeakMap,O=new WeakMap,Z=new WeakMap,se=new WeakMap,h(Ln,"EState",Se);var I,ae,z;class oi{constructor(n){h(this,"change$",new ne);h(this,"newFile$",new X);y(this,I,new ft);y(this,ae,new fe);y(this,z,void 0);this.cwd=n,M(this,z,new ce(`explore-${n}`)),u(this,ae).add(p.newFile$.pipe(Tn(t=>un(t,this.cwd))).subscribe(t=>{u(this,z).log(`new file ${t}`),this.newFile$.next(t)}))}renameSync(n,t){const r=()=>{this.change$.next(),p.fs.renameSync(this.resolve(t),this.resolve(n))},i=()=>{this.change$.next(),p.fs.renameSync(this.resolve(n),this.resolve(t))};u(this,I).add({undo:r,redo:i}),i()}unlinkSync(n){const t=()=>{this.change$.next(),p.fs.unlinkSync(L(this.cwd,n))},r=p.fs.readFileSync(this.resolve(n)),i=()=>{this.change$.next(),p.fs.writeFileSync(this.resolve(n),r)};u(this,I).add({undo:i,redo:t}),t()}rmdirSync(n){const t=()=>{this.change$.next(),p.fs.rmdirSync(L(this.cwd,n))},r=p.fs.getFilesByPattern([U(L(this.cwd,n),"**/*")],{onlyFiles:!0}),i=()=>{this.change$.next(),Object.entries(r).forEach(([s,a])=>{p.fs.writeFileSync(s,a)})};u(this,I).add({undo:i,redo:t}),t()}mkdirSync(n){const t=()=>{this.change$.next(),p.fs.mkdirSync(L(this.cwd,n))},r=()=>{this.change$.next(),p.fs.rmdirSync(L(this.cwd,n))};u(this,I).add({undo:r,redo:t}),t()}writeFileSync(n,t){this.change$.next(),p.fs.writeFileSync(L(this.cwd,n),t)}readFileSync(n,t){return p.fs.readFileSync(L(this.cwd,n),t)}isDirectory(n){return p.fs.statSync(L(this.cwd,n)).isDirectory()}resolve(n){return L(this.cwd,n)}relative(n){return on(this.cwd,n)}existsSync(n){return p.fs.existsSync(L(this.cwd,n))}undo(){u(this,I).undo()}redo(){u(this,I).redo()}hasUndo(){return u(this,I).hasUndo()}hasRedo(){return u(this,I).hasRedo()}}I=new WeakMap,ae=new WeakMap,z=new WeakMap;var Rn=(e=>(e[e.Start=0]="Start",e[e.LoadingEsbuildWasm=1]="LoadingEsbuildWasm",e[e.Building=2]="Building",e[e.Error=3]="Error",e[e.Done=4]="Done",e))(Rn||{}),H,E,C,g,ue,Cn;const oe=class oe{constructor(n){y(this,ue);h(this,"EBuildState",Rn);h(this,"id");h(this,"cwd");h(this,"editor",new ti);h(this,"previewer",new Ln);h(this,"explore");h(this,"directoryTreePaths$",new X);h(this,"buildState$",new Ze(0));h(this,"selectedPath$",new X);h(this,"buildResult$",new Ze(void 0));y(this,E,void 0);y(this,C,new fe);y(this,g,void 0);const t={buildInputPattern:[U(n.cwd,"**/*"),U(n.cwd,"*"),"/node_modules/**/*.js"],buildOptions:{},globalExternals:{},directoryTreePathsPattern:[U(n.cwd,"**/*"),U(n.cwd,"*")]};M(this,g,{...t,...pr(n,cr),entry:n.entry?ct(n.entry)?n.entry:U(n.cwd,n.entry):""}),this.explore=new oi(u(this,g).cwd),this.id=u(this,g).cwd,this.cwd=u(this,g).cwd,M(this,E,new ce(`playground-${this.id}`));const r=ni(this.explore.newFile$,this.explore.change$);u(this,C).add(this.editor.contentChange$.pipe(ye(500)).subscribe(([i,s])=>{!i||!un(i,u(this,g).cwd)||this.explore.writeFileSync(i,s)})),u(this,C).add(this.explore.newFile$.pipe(Tn(i=>i===u(this,g).entry)).subscribe(()=>{this.editor.renderPath(u(this,g).entry)})),u(this,C).add(this.selectedPath$.subscribe(i=>{u(this,E).log("selectedPath$",i),this.editor.renderPath(this.explore.resolve(i))})),u(this,C).add(r.pipe(ye(200)).subscribe(()=>this.build())),u(this,C).add(r.pipe(ye(200)).subscribe(()=>{const i=p.fs.globSync(u(this,g).directoryTreePathsPattern,{onlyFiles:!1}).map(s=>on(u(this,g).cwd,s));u(this,E).log("directoryTreePaths$",i),this.directoryTreePaths$.next(i)})),u(this,C).add(this.explore.newFile$.subscribe(i=>{u(this,g).entry||["index.ts","index.tsx","src/index.ts","src/index.tsx"].map(s=>this.explore.resolve(s)).includes(this.explore.resolve(i))&&(u(this,g).entry=this.explore.resolve(i)),u(this,g).entry!==""&&this.explore.resolve(i)===u(this,g).entry&&this.selectedPath$.next(this.getEntryPathRelativeCwd())}))}static create(n){if(u(this,H).has(n.cwd))return u(this,H).get(n.cwd);const t=new oe(n);return u(this,H).set(n.cwd,t),t}async build(){u(this,E).timeAsyncFn(()=>qe(this,ue,Cn).call(this),"build")}destroy(){u(this,C).unsubscribe(),this.editor.dispose(),this.previewer.dispose()}getEntryPathRelativeCwd(){return this.explore.relative(u(this,g).entry)}};H=new WeakMap,E=new WeakMap,C=new WeakMap,g=new WeakMap,ue=new WeakSet,Cn=async function(){this.buildState$.next(1),u(this,E).log("loading esbuild.wasm..."),await Ke.load(),this.buildState$.next(2),u(this,E).log("building...");const{globalExternals:n={},buildInputPattern:t,buildOptions:r}=u(this,g),i=Object.entries(p.fs.getFilesByPattern(t)).reduce((s,[a,o])=>(s[this.explore.relative(a)]=o,s),{});if(!p.fs.existsSync(u(this,g).entry)){this.buildState$.next(3),this.buildResult$.next({buildError:new Error(`Entry file "${this.getEntryPathRelativeCwd()}" not found`),css:"",errors:[],hash:"",js:""}),u(this,E).log("build error");return}if(!p.fs.statSync(u(this,g).entry).isFile()){this.buildState$.next(3),this.buildResult$.next({buildError:new Error(`Entry file "${this.getEntryPathRelativeCwd()}" is not a file`),css:"",errors:[],hash:"",js:""}),u(this,E).log("build error");return}return Ke.build({input:i,entry:this.getEntryPathRelativeCwd(),globalExternals:n,...r}).then(s=>{var c;if(s.errors.length>0||s.buildError){this.buildState$.next(3),this.buildResult$.next(s),u(this,E).log("build error");return}if(u(this,E).log("build success"),this.buildState$.next(4),((c=this.buildResult$.getValue())==null?void 0:c.hash)===s.hash){u(this,E).log("hash equals");return}this.buildResult$.next(s);const{css:o,js:l,globalExternals:f}=s;this.previewer.updateSources({scripts:[{id:"externals",content:`var module = {exports: { default: {} }};
          function require (name) {
            var value = module.exports[name] || (module.exports.default ? module.exports.default[name] : null);
            if (value) {
              value.__esModule = true;
              return value;
            }
          
            throw new Error("module not found: " + name);
          }
          
          ${p.template.externals.cjsCode}
            `},{id:"build",content:l??""}],styles:[{id:"build",content:o??""}],globals:f})})},y(oe,H,new Map);let Pe=oe;const Mn=e=>pe.createElement(ln.Provider,{value:e.value},e.children),li=pe.memo(e=>{const{entry:n,globalExternals:t,buildInputPattern:r,directoryTreePathsPattern:i,cwd:s,buildOptions:a,children:o}=e,l=$e.useMemo(()=>Pe.create({cwd:s,entry:n,globalExternals:t,buildInputPattern:r,buildOptions:a,directoryTreePathsPattern:i}),[r,t,n,a,i,s]);return pe.createElement(Mn,{value:l,children:o})},(e,n)=>{const t=["globalExternals","buildOptions","children"];return Object.keys(e).every(r=>t.includes(r)?e[r]===n[r]:JSON.stringify(e[r])===JSON.stringify(n[r]))});Mn.__docgenInfo={description:"",methods:[],displayName:"PlaygroundProvider",props:{value:{required:!0,tsType:{name:"Playground"},description:""}}};li.__docgenInfo={description:"",methods:[],displayName:"PlaygroundProviderBuilder",props:{globalExternals:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"any"}],raw:"Record<string, any>"},description:""},entry:{required:!1,tsType:{name:"string"},description:'The entry file to be built and auto selected, can be absolute path or relative path, if not set, it will be auto resolved from cwd in these files: ["./index.ts", "./index.tsx", "./src/index.ts", "./src.index.tsx"]'},buildInputPattern:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:`The input of esbuild, can be glob pattern
@default  [
        join(options.cwd, "**\\/*"),
        join(options.cwd, "\\/*"),
        "/node_modules\\/**\\/*.js",
      ]`},buildOptions:{required:!1,tsType:{name:"Omit",elements:[{name:"IBuildOptions"},{name:"union",raw:'"entry" | "input" | "globalExternals"',elements:[{name:"literal",value:'"entry"'},{name:"literal",value:'"input"'},{name:"literal",value:'"globalExternals"'}]}],raw:'Omit<IBuildOptions, "entry" | "input" | "globalExternals">'},description:"@default {}"},directoryTreePathsPattern:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:`@default  [
        join(options.cwd, "**\\/*"),
        join(options.cwd, "\\/*"),
      ]`},cwd:{required:!0,tsType:{name:"string"},description:'@default "/"'},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};export{ai as C,li as P,Tn as a,Pe as b,Mn as c,ye as d,In as e,re as f,ht as i,ni as m,hi as u};