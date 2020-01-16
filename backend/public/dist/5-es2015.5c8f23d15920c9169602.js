(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{fL5g:function(t,e,r){"use strict";r.d(e,"a",function(){return M}),r.d(e,"b",function(){return F}),r.d(e,"c",function(){return et}),r.d(e,"d",function(){return tt}),r.d(e,"e",function(){return Z});var n=r("8Y7J"),i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])};function o(t,e){function r(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}var s=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var i in e=arguments[r])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t};function u(t){return"function"==typeof t}var c=!1,h={Promise:void 0,set useDeprecatedSynchronousErrorHandling(t){c=t},get useDeprecatedSynchronousErrorHandling(){return c}};function a(t){setTimeout(function(){throw t},0)}var l={closed:!0,next:function(t){},error:function(t){if(h.useDeprecatedSynchronousErrorHandling)throw t;a(t)},complete:function(){}},p=Array.isArray||function(t){return t&&"number"==typeof t.length};function d(t){return Error.call(this),this.message=t?t.length+" errors occurred during unsubscription:\n"+t.map(function(t,e){return e+1+") "+t.toString()}).join("\n  "):"",this.name="UnsubscriptionError",this.errors=t,this}d.prototype=Object.create(Error.prototype);var f=d,y=function(){function t(t){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,t&&(this._unsubscribe=t)}var e;return t.prototype.unsubscribe=function(){var e;if(!this.closed){var r,n=this._parentOrParents,i=this._unsubscribe,o=this._subscriptions;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,n instanceof t)n.remove(this);else if(null!==n)for(var s=0;s<n.length;++s)n[s].remove(this);if(u(i))try{i.call(this)}catch(a){e=a instanceof f?b(a.errors):[a]}if(p(o)){s=-1;for(var c=o.length;++s<c;){var h=o[s];if(null!==(r=h)&&"object"==typeof r)try{h.unsubscribe()}catch(a){e=e||[],a instanceof f?e=e.concat(b(a.errors)):e.push(a)}}}if(e)throw new f(e)}},t.prototype.add=function(e){var r=e;if(!e)return t.EMPTY;switch(typeof e){case"function":r=new t(e);case"object":if(r===this||r.closed||"function"!=typeof r.unsubscribe)return r;if(this.closed)return r.unsubscribe(),r;if(!(r instanceof t)){var n=r;(r=new t)._subscriptions=[n]}break;default:throw new Error("unrecognized teardown "+e+" added to Subscription.")}var i=r._parentOrParents;if(null===i)r._parentOrParents=this;else if(i instanceof t){if(i===this)return r;r._parentOrParents=[i,this]}else{if(-1!==i.indexOf(this))return r;i.push(this)}var o=this._subscriptions;return null===o?this._subscriptions=[r]:o.push(r),r},t.prototype.remove=function(t){var e=this._subscriptions;if(e){var r=e.indexOf(t);-1!==r&&e.splice(r,1)}},t.EMPTY=((e=new t).closed=!0,e),t}();function b(t){return t.reduce(function(t,e){return t.concat(e instanceof f?e.errors:e)},[])}var _="function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random(),v=function(t){function e(r,n,i){var o=t.call(this)||this;switch(o.syncErrorValue=null,o.syncErrorThrown=!1,o.syncErrorThrowable=!1,o.isStopped=!1,arguments.length){case 0:o.destination=l;break;case 1:if(!r){o.destination=l;break}if("object"==typeof r){r instanceof e?(o.syncErrorThrowable=r.syncErrorThrowable,o.destination=r,r.add(o)):(o.syncErrorThrowable=!0,o.destination=new w(o,r));break}default:o.syncErrorThrowable=!0,o.destination=new w(o,r,n,i)}return o}return o(e,t),e.prototype[_]=function(){return this},e.create=function(t,r,n){var i=new e(t,r,n);return i.syncErrorThrowable=!1,i},e.prototype.next=function(t){this.isStopped||this._next(t)},e.prototype.error=function(t){this.isStopped||(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this))},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){this.destination.error(t),this.unsubscribe()},e.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},e.prototype._unsubscribeAndRecycle=function(){var t=this._parentOrParents;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=t,this},e}(y),w=function(t){function e(e,r,n,i){var o,s=t.call(this)||this;s._parentSubscriber=e;var c=s;return u(r)?o=r:r&&(o=r.next,n=r.error,i=r.complete,r!==l&&(u((c=Object.create(r)).unsubscribe)&&s.add(c.unsubscribe.bind(c)),c.unsubscribe=s.unsubscribe.bind(s))),s._context=c,s._next=o,s._error=n,s._complete=i,s}return o(e,t),e.prototype.next=function(t){if(!this.isStopped&&this._next){var e=this._parentSubscriber;h.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?this.__tryOrSetError(e,this._next,t)&&this.unsubscribe():this.__tryOrUnsub(this._next,t)}},e.prototype.error=function(t){if(!this.isStopped){var e=this._parentSubscriber,r=h.useDeprecatedSynchronousErrorHandling;if(this._error)r&&e.syncErrorThrowable?(this.__tryOrSetError(e,this._error,t),this.unsubscribe()):(this.__tryOrUnsub(this._error,t),this.unsubscribe());else if(e.syncErrorThrowable)r?(e.syncErrorValue=t,e.syncErrorThrown=!0):a(t),this.unsubscribe();else{if(this.unsubscribe(),r)throw t;a(t)}}},e.prototype.complete=function(){var t=this;if(!this.isStopped){var e=this._parentSubscriber;if(this._complete){var r=function(){return t._complete.call(t._context)};h.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?(this.__tryOrSetError(e,r),this.unsubscribe()):(this.__tryOrUnsub(r),this.unsubscribe())}else this.unsubscribe()}},e.prototype.__tryOrUnsub=function(t,e){try{t.call(this._context,e)}catch(r){if(this.unsubscribe(),h.useDeprecatedSynchronousErrorHandling)throw r;a(r)}},e.prototype.__tryOrSetError=function(t,e,r){if(!h.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{e.call(this._context,r)}catch(n){return h.useDeprecatedSynchronousErrorHandling?(t.syncErrorValue=n,t.syncErrorThrown=!0,!0):(a(n),!0)}return!1},e.prototype._unsubscribe=function(){var t=this._parentSubscriber;this._context=null,this._parentSubscriber=null,t.unsubscribe()},e}(v),m="function"==typeof Symbol&&Symbol.observable||"@@observable",g=function(){function t(t){this._isScalar=!1,t&&(this._subscribe=t)}return t.prototype.lift=function(e){var r=new t;return r.source=this,r.operator=e,r},t.prototype.subscribe=function(t,e,r){var n=this.operator,i=function(t,e,r){if(t){if(t instanceof v)return t;if(t[_])return t[_]()}return t||e||r?new v(t,e,r):new v(l)}(t,e,r);if(i.add(n?n.call(i,this.source):this.source||h.useDeprecatedSynchronousErrorHandling&&!i.syncErrorThrowable?this._subscribe(i):this._trySubscribe(i)),h.useDeprecatedSynchronousErrorHandling&&i.syncErrorThrowable&&(i.syncErrorThrowable=!1,i.syncErrorThrown))throw i.syncErrorValue;return i},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){h.useDeprecatedSynchronousErrorHandling&&(t.syncErrorThrown=!0,t.syncErrorValue=e),function(t){for(;t;){var e=t.destination;if(t.closed||t.isStopped)return!1;t=e&&e instanceof v?e:null}return!0}(t)?t.error(e):console.warn(e)}},t.prototype.forEach=function(t,e){var r=this;return new(e=E(e))(function(e,n){var i;i=r.subscribe(function(e){try{t(e)}catch(r){n(r),i&&i.unsubscribe()}},n,e)})},t.prototype._subscribe=function(t){var e=this.source;return e&&e.subscribe(t)},t.prototype[m]=function(){return this},t.prototype.pipe=function(){for(var t,e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return 0===e.length?this:((t=e)?1===t.length?t[0]:function(e){return t.reduce(function(t,e){return e(t)},e)}:function(){})(this)},t.prototype.toPromise=function(t){var e=this;return new(t=E(t))(function(t,r){var n;e.subscribe(function(t){return n=t},function(t){return r(t)},function(){return t(n)})})},t.create=function(e){return new t(e)},t}();function E(t){if(t||(t=Promise),!t)throw new Error("no Promise impl found");return t}function S(){return Error.call(this),this.message="object unsubscribed",this.name="ObjectUnsubscribedError",this}S.prototype=Object.create(Error.prototype);var O=S,x=function(t){function e(e,r){var n=t.call(this)||this;return n.subject=e,n.subscriber=r,n.closed=!1,n}return o(e,t),e.prototype.unsubscribe=function(){if(!this.closed){this.closed=!0;var t=this.subject,e=t.observers;if(this.subject=null,e&&0!==e.length&&!t.isStopped&&!t.closed){var r=e.indexOf(this.subscriber);-1!==r&&e.splice(r,1)}}},e}(y),I=function(t){function e(e){var r=t.call(this,e)||this;return r.destination=e,r}return o(e,t),e}(v),T=function(t){function e(){var e=t.call(this)||this;return e.observers=[],e.closed=!1,e.isStopped=!1,e.hasError=!1,e.thrownError=null,e}return o(e,t),e.prototype[_]=function(){return new I(this)},e.prototype.lift=function(t){var e=new N(this,this);return e.operator=t,e},e.prototype.next=function(t){if(this.closed)throw new O;if(!this.isStopped)for(var e=this.observers,r=e.length,n=e.slice(),i=0;i<r;i++)n[i].next(t)},e.prototype.error=function(t){if(this.closed)throw new O;this.hasError=!0,this.thrownError=t,this.isStopped=!0;for(var e=this.observers,r=e.length,n=e.slice(),i=0;i<r;i++)n[i].error(t);this.observers.length=0},e.prototype.complete=function(){if(this.closed)throw new O;this.isStopped=!0;for(var t=this.observers,e=t.length,r=t.slice(),n=0;n<e;n++)r[n].complete();this.observers.length=0},e.prototype.unsubscribe=function(){this.isStopped=!0,this.closed=!0,this.observers=null},e.prototype._trySubscribe=function(e){if(this.closed)throw new O;return t.prototype._trySubscribe.call(this,e)},e.prototype._subscribe=function(t){if(this.closed)throw new O;return this.hasError?(t.error(this.thrownError),y.EMPTY):this.isStopped?(t.complete(),y.EMPTY):(this.observers.push(t),new x(this,t))},e.prototype.asObservable=function(){var t=new g;return t.source=this,t},e.create=function(t,e){return new N(t,e)},e}(g),N=function(t){function e(e,r){var n=t.call(this)||this;return n.destination=e,n.source=r,n}return o(e,t),e.prototype.next=function(t){var e=this.destination;e&&e.next&&e.next(t)},e.prototype.error=function(t){var e=this.destination;e&&e.error&&this.destination.error(t)},e.prototype.complete=function(){var t=this.destination;t&&t.complete&&this.destination.complete()},e.prototype._subscribe=function(t){return this.source?this.source.subscribe(t):y.EMPTY},e}(T),P=function(t){function e(e){var r=t.call(this)||this;return r._value=e,r}return o(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!0,configurable:!0}),e.prototype._subscribe=function(e){var r=t.prototype._subscribe.call(this,e);return r&&!r.closed&&e.next(this._value),r},e.prototype.getValue=function(){if(this.hasError)throw this.thrownError;if(this.closed)throw new O;return this._value},e.prototype.next=function(e){t.prototype.next.call(this,this._value=e)},e}(T),k=function(t){function e(e,r){var n=t.call(this,e,r)||this;return n.scheduler=e,n.work=r,n}return o(e,t),e.prototype.schedule=function(e,r){return void 0===r&&(r=0),r>0?t.prototype.schedule.call(this,e,r):(this.delay=r,this.state=e,this.scheduler.flush(this),this)},e.prototype.execute=function(e,r){return r>0||this.closed?t.prototype.execute.call(this,e,r):this._execute(e,r)},e.prototype.requestAsyncId=function(e,r,n){return void 0===n&&(n=0),null!==n&&n>0||null===n&&this.delay>0?t.prototype.requestAsyncId.call(this,e,r,n):e.flush(this)},e}(function(t){function e(e,r){var n=t.call(this,e,r)||this;return n.scheduler=e,n.work=r,n.pending=!1,n}return o(e,t),e.prototype.schedule=function(t,e){if(void 0===e&&(e=0),this.closed)return this;this.state=t;var r=this.id,n=this.scheduler;return null!=r&&(this.id=this.recycleAsyncId(n,r,e)),this.pending=!0,this.delay=e,this.id=this.id||this.requestAsyncId(n,this.id,e),this},e.prototype.requestAsyncId=function(t,e,r){return void 0===r&&(r=0),setInterval(t.flush.bind(t,this),r)},e.prototype.recycleAsyncId=function(t,e,r){if(void 0===r&&(r=0),null!==r&&this.delay===r&&!1===this.pending)return e;clearInterval(e)},e.prototype.execute=function(t,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var r=this._execute(t,e);if(r)return r;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},e.prototype._execute=function(t,e){var r=!1,n=void 0;try{this.work(t)}catch(i){r=!0,n=!!i&&i||new Error(i)}if(r)return this.unsubscribe(),n},e.prototype._unsubscribe=function(){var t=this.id,e=this.scheduler,r=e.actions,n=r.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==n&&r.splice(n,1),null!=t&&(this.id=this.recycleAsyncId(e,t,null)),this.delay=null},e}(function(t){function e(e,r){return t.call(this)||this}return o(e,t),e.prototype.schedule=function(t,e){return void 0===e&&(e=0),this},e}(y))),R=function(){function t(e,r){void 0===r&&(r=t.now),this.SchedulerAction=e,this.now=r}return t.prototype.schedule=function(t,e,r){return void 0===e&&(e=0),new this.SchedulerAction(this,t).schedule(r,e)},t.now=function(){return Date.now()},t}(),D=new(function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e}(function(t){function e(r,n){void 0===n&&(n=R.now);var i=t.call(this,r,function(){return e.delegate&&e.delegate!==i?e.delegate.now():n()})||this;return i.actions=[],i.active=!1,i.scheduled=void 0,i}return o(e,t),e.prototype.schedule=function(r,n,i){return void 0===n&&(n=0),e.delegate&&e.delegate!==this?e.delegate.schedule(r,n,i):t.prototype.schedule.call(this,r,n,i)},e.prototype.flush=function(t){var e=this.actions;if(this.active)e.push(t);else{var r;this.active=!0;do{if(r=t.execute(t.state,t.delay))break}while(t=e.shift());if(this.active=!1,r){for(;t=e.shift();)t.unsubscribe();throw r}}},e}(R)))(k),j=new g(function(t){return t.complete()});var z=function(){function t(t,e,r){this.kind=t,this.value=e,this.error=r,this.hasValue="N"===t}return t.prototype.observe=function(t){switch(this.kind){case"N":return t.next&&t.next(this.value);case"E":return t.error&&t.error(this.error);case"C":return t.complete&&t.complete()}},t.prototype.do=function(t,e,r){switch(this.kind){case"N":return t&&t(this.value);case"E":return e&&e(this.error);case"C":return r&&r()}},t.prototype.accept=function(t,e,r){return t&&"function"==typeof t.next?this.observe(t):this.do(t,e,r)},t.prototype.toObservable=function(){var t;switch(this.kind){case"N":return function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r,n,i=t[t.length-1];return(r=i)&&"function"==typeof r.schedule?(t.pop(),function(t,e){return new g(function(r){var n=new y,i=0;return n.add(e.schedule(function(){i!==t.length?(r.next(t[i++]),r.closed||n.add(this.schedule())):r.complete()})),n})}(t,i)):new g((n=t,function(t){for(var e=0,r=n.length;e<r&&!t.closed;e++)t.next(n[e]);t.complete()}))}(this.value);case"E":return t=this.error,new g(function(e){return e.error(t)});case"C":return j}throw new Error("unexpected notification kind value")},t.createNext=function(e){return void 0!==e?new t("N",e):t.undefinedValueNotification},t.createError=function(e){return new t("E",void 0,e)},t.createComplete=function(){return t.completeNotification},t.completeNotification=new t("C"),t.undefinedValueNotification=new t("N",void 0),t}(),U=function(t){function e(e,r,n){void 0===n&&(n=0);var i=t.call(this,e)||this;return i.scheduler=r,i.delay=n,i}return o(e,t),e.dispatch=function(t){t.notification.observe(t.destination),this.unsubscribe()},e.prototype.scheduleMessage=function(t){this.destination.add(this.scheduler.schedule(e.dispatch,this.delay,new V(t,this.destination)))},e.prototype._next=function(t){this.scheduleMessage(z.createNext(t))},e.prototype._error=function(t){this.scheduleMessage(z.createError(t)),this.unsubscribe()},e.prototype._complete=function(){this.scheduleMessage(z.createComplete()),this.unsubscribe()},e}(v),V=function(){return function(t,e){this.notification=t,this.destination=e}}(),A=function(t){function e(e,r,n){void 0===e&&(e=Number.POSITIVE_INFINITY),void 0===r&&(r=Number.POSITIVE_INFINITY);var i=t.call(this)||this;return i.scheduler=n,i._events=[],i._infiniteTimeWindow=!1,i._bufferSize=e<1?1:e,i._windowTime=r<1?1:r,r===Number.POSITIVE_INFINITY?(i._infiniteTimeWindow=!0,i.next=i.nextInfiniteTimeWindow):i.next=i.nextTimeWindow,i}return o(e,t),e.prototype.nextInfiniteTimeWindow=function(e){var r=this._events;r.push(e),r.length>this._bufferSize&&r.shift(),t.prototype.next.call(this,e)},e.prototype.nextTimeWindow=function(e){this._events.push(new L(this._getNow(),e)),this._trimBufferThenGetEvents(),t.prototype.next.call(this,e)},e.prototype._subscribe=function(t){var e,r=this._infiniteTimeWindow,n=r?this._events:this._trimBufferThenGetEvents(),i=this.scheduler,o=n.length;if(this.closed)throw new O;if(this.isStopped||this.hasError?e=y.EMPTY:(this.observers.push(t),e=new x(this,t)),i&&t.add(t=new U(t,i)),r)for(var s=0;s<o&&!t.closed;s++)t.next(n[s]);else for(s=0;s<o&&!t.closed;s++)t.next(n[s].value);return this.hasError?t.error(this.thrownError):this.isStopped&&t.complete(),e},e.prototype._getNow=function(){return(this.scheduler||D).now()},e.prototype._trimBufferThenGetEvents=function(){for(var t=this._getNow(),e=this._bufferSize,r=this._windowTime,n=this._events,i=n.length,o=0;o<i&&!(t-n[o].time<r);)o++;return i>e&&(o=Math.max(o,i-e)),o>0&&n.splice(0,o),n},e}(T),L=function(){return function(t,e){this.time=t,this.value=e}}();class F{constructor(t){this.lazyLoad=!1,this.providers=new Map;for(let e=0;e<t.length;e++){let r=t[e];this.providers.set(r.id,r.provider),this.lazyLoad=this.lazyLoad||r.lazyLoad}}}const M=(()=>{class t{constructor(t){this._user=null,this._authState=new A(1),this._readyState=new P([]),this.initialized=!1,this.providers=t.providers,t.lazyLoad||this.initialize()}get authState(){return this._authState.asObservable()}get readyState(){return this._readyState.asObservable()}initialize(){this.initialized=!0,this.providers.forEach((t,e)=>{t.initialize().then(()=>{let r=this._readyState.getValue();r.push(e),this._readyState.next(r),t.getLoginStatus().then(t=>{t.provider=e,this._user=t,this._authState.next(t)}).catch(t=>{this._authState.next(null)})})})}signIn(e,r){return this.initialized||this.initialize(),new Promise((n,i)=>{let o=this.providers.get(e);o?o.signIn(r).then(t=>{t.provider=e,n(t),this._user=t,this._authState.next(t)}).catch(t=>{i(t)}):i(t.ERR_LOGIN_PROVIDER_NOT_FOUND)})}signOut(e=!1){return this.initialized||this.initialize(),new Promise((r,n)=>{if(this._user){let i=this.providers.get(this._user.provider);i?i.signOut(e).then(()=>{r(),this._user=null,this._authState.next(null)}).catch(t=>{n(t)}):n(t.ERR_LOGIN_PROVIDER_NOT_FOUND)}else n(t.ERR_NOT_LOGGED_IN)})}}return t.ERR_LOGIN_PROVIDER_NOT_FOUND="Login provider not found",t.ERR_NOT_LOGGED_IN="Not logged in",t})();function B(t){return function(e,r){var n=t(e,r);return 1==n.length?"0"+n:n}}function G(t){return function(e,r){return t(e,r).split(" ")[0]}}function H(t,e,r){return new Intl.DateTimeFormat(e,r).format(t).replace(/[\u200e\u200f]/g,"")}function Y(t){var e={hour:"2-digit",hour12:!1,timeZoneName:t};return function(t,r){var n=H(t,r,e);return n?n.substring(3):""}}function C(t,e){return t.hour12=e,t}function W(t,e){var r={};return r[t]=2===e?"2-digit":"numeric",r}function q(t,e){var r={};return r[t]=e<4?e>1?"short":"narrow":"long",r}function J(t){return t.reduce(function(t,e){return s({},t,e)},{})}function $(t){return function(e,r){return H(e,r,t)}}new n.InjectionToken("Location Initialized"),new n.InjectionToken("appBaseHref"),new n.InjectionToken("UseV4Plurals"),$(J([W("year",1),q("month",3),W("day",1),W("hour",1),W("minute",1),W("second",1)])),$(J([W("year",1),W("month",1),W("day",1),W("hour",1),W("minute",1)])),$(J([W("year",1),q("month",4),q("weekday",4),W("day",1)])),$(J([W("year",1),q("month",4),W("day",1)])),$(J([W("year",1),q("month",3),W("day",1)])),$(J([W("year",1),W("month",1),W("day",1)])),$(J([W("hour",1),W("second",1),W("minute",1)])),$(J([W("hour",1),W("minute",1)])),$(W("year",4)),$(W("year",2)),$(W("year",1)),$(q("month",4)),$(q("month",3)),$(W("month",2)),$(W("month",1)),$(q("month",4)),$(q("month",1)),$(W("day",2)),$(W("day",1)),B(G($(C(W("hour",2),!1)))),G($(C(W("hour",1),!1))),B(G($(C(W("hour",2),!0)))),G($(C(W("hour",1),!0))),$(W("hour",2)),$(W("hour",1)),B($(W("minute",2))),$(W("minute",1)),B($(W("second",2))),$(W("second",1)),$(W("second",3)),$(q("weekday",4)),$(q("weekday",3)),$(q("weekday",2)),$(q("weekday",1)),$(C(W("hour",1),!0)),Y("short"),Y("long"),$({}),$({}),$(q("era",1)),$(q("era",2)),$(q("era",3)),$(q("era",4)),new Map;var K=function(){function t(){}return t.prototype.createSubscription=function(t,e){return t.subscribe({next:e,error:function(t){throw t}})},t.prototype.dispose=function(t){t.unsubscribe()},t.prototype.onDestroy=function(t){t.unsubscribe()},t}();new(function(){function t(){}return t.prototype.createSubscription=function(t,e){return t.then(e,function(t){throw t})},t.prototype.dispose=function(t){},t.prototype.onDestroy=function(t){},t}()),new K,new n.InjectionToken("DocumentToken"),new n.Version("7.2.15");const Z=(()=>{class t{static initialize(e){return{ngModule:t,providers:[M,{provide:F,useValue:e}]}}}return t})();class Q{}class X{constructor(){this._readyState=new P(!1)}onReady(){return new Promise((t,e)=>{this._readyState.subscribe(e=>{e&&t()})})}loadScript(t,e,r,n=!0,i=""){if(document.getElementById(t))return;let o=document.createElement("script");o.async=n,o.src=e,o.onload=r,o.text=i,document.head.appendChild(o)}}const tt=(()=>{class t extends X{constructor(t,e={scope:"email"}){super(),this.clientId=t,this.opt=e}initialize(){return new Promise((e,r)=>{this.loadScript(t.PROVIDER_ID,"https://apis.google.com/js/platform.js",()=>{gapi.load("auth2",()=>{this.auth2=gapi.auth2.init(Object.assign({},this.opt,{client_id:this.clientId})),this.auth2.then(()=>{this._readyState.next(!0),e()}).catch(t=>{r(t)})})})})}getLoginStatus(){return new Promise((t,e)=>{this.onReady().then(()=>{if(this.auth2.isSignedIn.get()){let e=new Q,r=this.auth2.currentUser.get().getBasicProfile(),n=this.auth2.currentUser.get().getAuthResponse(!0).access_token,i=this.auth2.currentUser.get().getAuthResponse(!0).id_token;e.id=r.getId(),e.name=r.getName(),e.email=r.getEmail(),e.photoUrl=r.getImageUrl(),e.firstName=r.getGivenName(),e.lastName=r.getFamilyName(),e.authToken=n,e.idToken=i,t(e)}else e("No user is currently logged in.")})})}signIn(t){return new Promise((e,r)=>{this.onReady().then(()=>{(t&&t.offline_access||this.opt&&this.opt.offline_access?this.auth2.grantOfflineAccess(t):this.auth2.signIn(t)).then(t=>{let r=new Q,n=this.auth2.currentUser.get().getBasicProfile(),i=this.auth2.currentUser.get().getAuthResponse(!0).access_token,o=this.auth2.currentUser.get().getAuthResponse(!0).id_token;r.id=n.getId(),r.name=n.getName(),r.email=n.getEmail(),r.photoUrl=n.getImageUrl(),r.firstName=n.getGivenName(),r.lastName=n.getFamilyName(),r.authToken=i,r.idToken=o,t&&t.code&&(r.authorizationCode=t.code),e(r)},t=>{r("User cancelled login or did not fully authorize.")}).catch(t=>{r(t)})})})}signOut(t){return new Promise((e,r)=>{this.onReady().then(()=>{let n;(n=t?this.auth2.disconnect():this.auth2.signOut()).then(t=>{t?r(t):e()}).catch(t=>{r(t)})})})}}return t.PROVIDER_ID="GOOGLE",t})(),et=(()=>{class t extends X{constructor(t,e={scope:"email,public_profile"},r="en_US",n="name,email,picture,first_name,last_name",i="v2.9"){super(),this.clientId=t,this.opt=e,this.locale=r,this.fields=n,this.version=i}initialize(){return new Promise((e,r)=>{this.loadScript(t.PROVIDER_ID,`//connect.facebook.net/${this.locale}/sdk.js`,()=>{FB.init({appId:this.clientId,autoLogAppEvents:!0,cookie:!0,xfbml:!0,version:this.version}),this._readyState.next(!0),e()})})}getLoginStatus(){return new Promise((t,e)=>{this.onReady().then(()=>{FB.getLoginStatus(r=>{if("connected"===r.status){let e=r.authResponse;FB.api(`/me?fields=${this.fields}`,r=>{let n=new Q;n.id=r.id,n.name=r.name,n.email=r.email,n.photoUrl="https://graph.facebook.com/"+r.id+"/picture?type=normal",n.firstName=r.first_name,n.lastName=r.last_name,n.authToken=e.accessToken,n.facebook=r,t(n)})}else e("No user is currently logged in.")})})})}signIn(t){return new Promise((t,e)=>{this.onReady().then(()=>{FB.login(r=>{if(r.authResponse){let e=r.authResponse;FB.api(`/me?fields=${this.fields}`,r=>{let n=new Q;n.id=r.id,n.name=r.name,n.email=r.email,n.photoUrl="https://graph.facebook.com/"+r.id+"/picture?type=normal",n.firstName=r.first_name,n.lastName=r.last_name,n.authToken=e.accessToken,n.facebook=r,t(n)})}else e("User cancelled login or did not fully authorize.")},this.opt)})})}signOut(){return new Promise((t,e)=>{this.onReady().then(()=>{FB.logout(e=>{t()})})})}}return t.PROVIDER_ID="FACEBOOK",t})()}}]);