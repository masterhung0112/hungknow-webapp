_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[12],{"/0+H":function(e,t,r){"use strict";(function(e){!function(){var t="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0;t&&t(e)}();var n="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e};t.__esModule=!0,t.isInAmpMode=u,t.useAmp=i;var o=d(r("q1tI")),a=r("lwAK");function d(e){return e&&e.__esModule?e:{default:e}}function u({ampFirst:e=!1,hybrid:t=!1,hasQuery:r=!1}={}){return e||t&&r}function i(){return u(o.default.useContext(a.AmpStateContext))}n(i,"useContext{}"),function(){var e="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;e&&(e.register(o,"_react","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/amp.js"),e.register(d,"_interopRequireDefault","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/amp.js"),e.register(u,"isInAmpMode","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/amp.js"),e.register(i,"useAmp","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/amp.js"))}(),function(){var t="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0;t&&t(e)}()}).call(this,r("YuTi")(e))},"/a9y":function(module,exports,__webpack_require__){"use strict";(function(module){!function(){var e="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0;e&&e(module)}();var __signature__="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e},_interopRequireDefault=__webpack_require__("AroE");exports.__esModule=!0,exports.default=void 0;var _react=_interopRequireDefault(__webpack_require__("q1tI")),_head=_interopRequireDefault(__webpack_require__("8Kt/"));const statusCodes={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function _getInitialProps({res:e,err:t}){return{statusCode:e&&e.statusCode?e.statusCode:t?t.statusCode:404}}class Error extends _react.default.Component{render(){const{statusCode:e}=this.props,t=this.props.title||statusCodes[e]||"An unexpected error has occurred";return _react.default.createElement("div",{style:styles.error},_react.default.createElement(_head.default,null,_react.default.createElement("title",null,e,": ",t)),_react.default.createElement("div",null,_react.default.createElement("style",{dangerouslySetInnerHTML:{__html:"body { margin: 0 }"}}),e?_react.default.createElement("h1",{style:styles.h1},e):null,_react.default.createElement("div",{style:styles.desc},_react.default.createElement("h2",{style:styles.h2},t,"."))))}__reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}exports.default=Error,Error.displayName="ErrorPage",Error.getInitialProps=_getInitialProps,Error.origGetInitialProps=_getInitialProps;const styles={error:{color:"#000",background:"#fff",fontFamily:'-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{display:"inline-block",textAlign:"left",lineHeight:"49px",height:"49px",verticalAlign:"middle"},h1:{display:"inline-block",borderRight:"1px solid rgba(0, 0, 0,.3)",margin:0,marginRight:"20px",padding:"10px 23px 10px 0",fontSize:"24px",fontWeight:500,verticalAlign:"top"},h2:{fontSize:"14px",fontWeight:"normal",lineHeight:"inherit",margin:0,padding:0}};!function(){var e="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;e&&(e.register(_react,"_react","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/pages/_error.js"),e.register(_head,"_head","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/pages/_error.js"),e.register(statusCodes,"statusCodes","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/pages/_error.js"),e.register(_getInitialProps,"_getInitialProps","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/pages/_error.js"),e.register(Error,"Error","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/pages/_error.js"),e.register(styles,"styles","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/pages/_error.js"))}(),function(){var e="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0;e&&e(module)}()}).call(this,__webpack_require__("YuTi")(module))},"04ac":function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_error",function(){return r("/a9y")}])},"6LWA":function(e,t,r){var n=r("xrYK");e.exports=Array.isArray||function(e){return"Array"==n(e)}},"8Kt/":function(e,t,r){"use strict";(function(e){r("Junv"),r("LKBx"),r("3bBZ"),function(){var t="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0;t&&t(e)}();"undefined"!==typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;t.__esModule=!0,t.defaultHead=p,t.default=void 0;var n=l(r("q1tI")),o=i(r("Xuae")),a=r("lwAK"),d=r("FYa8"),u=r("/0+H");function i(e){return e&&e.__esModule?e:{default:e}}function s(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function l(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var a=n?Object.getOwnPropertyDescriptor(e,o):null;a&&(a.get||a.set)?Object.defineProperty(r,o,a):r[o]=e[o]}return r.default=e,t&&t.set(e,r),r}function p(e=!1){const t=[n.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(n.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function c(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===n.default.Fragment?e.concat(n.default.Children.toArray(t.props.children).reduce((e,t)=>"string"===typeof t||"number"===typeof t?e:e.concat(t),[])):e.concat(t)}const h=["name","httpEquiv","charSet","itemProp"];function f(){const e=new Set,t=new Set,r=new Set,n={};return o=>{let a=!0;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){const t=o.key.slice(o.key.indexOf("$")+1);e.has(t)?a=!1:e.add(t)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(let e=0,t=h.length;e<t;e++){const t=h[e];if(o.props.hasOwnProperty(t))if("charSet"===t)r.has(t)?a=!1:r.add(t);else{const e=o.props[t],r=n[t]||new Set;r.has(e)?a=!1:(r.add(e),n[t]=r)}}}return a}}function w(e,t){return e.reduce((e,t)=>{const r=n.default.Children.toArray(t.props.children);return e.concat(r)},[]).reduce(c,[]).reverse().concat(p(t.inAmpMode)).filter(f()).reverse().map((e,t)=>{const r=e.key||t;return n.default.cloneElement(e,{key:r})})}function g({children:e}){const t=(0,n.useContext)(a.AmpStateContext),r=(0,n.useContext)(d.HeadManagerContext);return n.default.createElement(o.default,{reduceComponentsToState:w,headManager:r,inAmpMode:(0,u.isInAmpMode)(t)},e)}g.rewind=()=>{};var _=g;t.default=_,function(){var e="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;e&&(e.register(n,"_react","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head.js"),e.register(o,"_sideEffect","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head.js"),e.register(i,"_interopRequireDefault","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head.js"),e.register(s,"_getRequireWildcardCache","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head.js"),e.register(l,"_interopRequireWildcard","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head.js"),e.register(p,"defaultHead","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head.js"),e.register(c,"onlyReactElement","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head.js"),e.register(h,"METATYPES","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head.js"),e.register(f,"unique","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head.js"),e.register(w,"reduceComponents","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head.js"),e.register(g,"Head","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head.js"),e.register(_,"_default","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head.js"))}(),function(){var t="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0;t&&t(e)}()}).call(this,r("YuTi")(e))},AroE:function(e,t){e.exports=function(e){return e&&e.__esModule?e:{default:e}}},FYa8:function(e,t,r){"use strict";(function(e){!function(){var t="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0;t&&t(e)}();"undefined"!==typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;t.__esModule=!0,t.HeadManagerContext=void 0;var n=o(r("q1tI"));function o(e){return e&&e.__esModule?e:{default:e}}const a=n.default.createContext({});t.HeadManagerContext=a,function(){var e="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;e&&(e.register(n,"_react","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head-manager-context.js"),e.register(o,"_interopRequireDefault","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head-manager-context.js"),e.register(a,"HeadManagerContext","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/head-manager-context.js"))}(),function(){var t="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0;t&&t(e)}()}).call(this,r("YuTi")(e))},Junv:function(e,t,r){"use strict";var n=r("I+eb"),o=r("6LWA"),a=[].reverse,d=[1,2];n({target:"Array",proto:!0,forced:String(d)===String(d.reverse())},{reverse:function(){return o(this)&&(this.length=this.length),a.call(this)}})},LKBx:function(e,t,r){"use strict";var n=r("I+eb"),o=r("Bs8V").f,a=r("UMSQ"),d=r("WjRb"),u=r("HYAF"),i=r("qxPZ"),s=r("xDBR"),l="".startsWith,p=Math.min,c=i("startsWith");n({target:"String",proto:!0,forced:!(!s&&!c&&!!function(){var e=o(String.prototype,"startsWith");return e&&!e.writable}())&&!c},{startsWith:function(e){var t=String(u(this));d(e);var r=a(p(arguments.length>1?arguments[1]:void 0,t.length)),n=String(e);return l?l.call(t,n,r):t.slice(r,r+n.length)===n}})},ROdP:function(e,t,r){var n=r("hh1v"),o=r("xrYK"),a=r("tiKp")("match");e.exports=function(e){var t;return n(e)&&(void 0!==(t=e[a])?!!t:"RegExp"==o(e))}},WjRb:function(e,t,r){var n=r("ROdP");e.exports=function(e){if(n(e))throw TypeError("The method doesn't accept regular expressions");return e}},Xuae:function(module,exports,__webpack_require__){"use strict";(function(module){__webpack_require__("3bBZ"),function(){var e="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0;e&&e(module)}();var __signature__="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e};exports.__esModule=!0,exports.default=void 0;var _react=__webpack_require__("q1tI");const isServer=!1;class _default extends _react.Component{constructor(e){super(e),this._hasHeadManager=void 0,this.emitChange=()=>{this._hasHeadManager&&this.props.headManager.updateHead(this.props.reduceComponentsToState([...this.props.headManager.mountedInstances],this.props))},this._hasHeadManager=this.props.headManager&&this.props.headManager.mountedInstances,isServer&&this._hasHeadManager&&(this.props.headManager.mountedInstances.add(this),this.emitChange())}componentDidMount(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}componentDidUpdate(){this.emitChange()}componentWillUnmount(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}render(){return null}__reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}exports.default=_default,function(){var e="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;e&&(e.register(isServer,"isServer","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/side-effect.js"),e.register(_default,"_default","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/side-effect.js"))}(),function(){var e="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0;e&&e(module)}()}).call(this,__webpack_require__("YuTi")(module))},YuTi:function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},lwAK:function(e,t,r){"use strict";(function(e){!function(){var t="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0;t&&t(e)}();"undefined"!==typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;t.__esModule=!0,t.AmpStateContext=void 0;var n=o(r("q1tI"));function o(e){return e&&e.__esModule?e:{default:e}}const a=n.default.createContext({});t.AmpStateContext=a,function(){var e="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;e&&(e.register(n,"_react","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/amp-context.js"),e.register(o,"_interopRequireDefault","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/amp-context.js"),e.register(a,"AmpStateContext","/home/runner/work/hungknow-webapp/hungknow-webapp/node_modules/next/dist/next-server/lib/amp-context.js"))}(),function(){var t="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0;t&&t(e)}()}).call(this,r("YuTi")(e))},qxPZ:function(e,t,r){var n=r("tiKp")("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(r){try{return t[n]=!1,"/./"[e](t)}catch(o){}}return!1}}},[["04ac",1,2,0]]]);