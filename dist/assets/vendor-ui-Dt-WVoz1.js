var Go=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Fe(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var fe={exports:{}},g={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ke;function He(){if(ke)return g;ke=1;var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),m=Symbol.for("react.provider"),d=Symbol.for("react.context"),k=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),f=Symbol.for("react.memo"),S=Symbol.for("react.lazy"),N=Symbol.iterator;function W(t){return t===null||typeof t!="object"?null:(t=N&&t[N]||t["@@iterator"],typeof t=="function"?t:null)}var I={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D=Object.assign,j={};function A(t,s,v){this.props=t,this.context=s,this.refs=j,this.updater=v||I}A.prototype.isReactComponent={},A.prototype.setState=function(t,s){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,s,"setState")},A.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function q(){}q.prototype=A.prototype;function R(t,s,v){this.props=t,this.context=s,this.refs=j,this.updater=v||I}var F=R.prototype=new q;F.constructor=R,D(F,A.prototype),F.isPureReactComponent=!0;var H=Array.isArray,B=Object.prototype.hasOwnProperty,O={current:null},T={key:!0,ref:!0,__self:!0,__source:!0};function l(t,s,v){var _,h={},x=null,M=null;if(s!=null)for(_ in s.ref!==void 0&&(M=s.ref),s.key!==void 0&&(x=""+s.key),s)B.call(s,_)&&!T.hasOwnProperty(_)&&(h[_]=s[_]);var z=arguments.length-2;if(z===1)h.children=v;else if(1<z){for(var y=Array(z),P=0;P<z;P++)y[P]=arguments[P+2];h.children=y}if(t&&t.defaultProps)for(_ in z=t.defaultProps,z)h[_]===void 0&&(h[_]=z[_]);return{$$typeof:e,type:t,key:x,ref:M,props:h,_owner:O.current}}function L(t,s){return{$$typeof:e,type:t.type,key:s,ref:t.ref,props:t.props,_owner:t._owner}}function te(t){return typeof t=="object"&&t!==null&&t.$$typeof===e}function ae(t){var s={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(v){return s[v]})}var J=/\/+/g;function oe(t,s){return typeof t=="object"&&t!==null&&t.key!=null?ae(""+t.key):s.toString(36)}function Z(t,s,v,_,h){var x=typeof t;(x==="undefined"||x==="boolean")&&(t=null);var M=!1;if(t===null)M=!0;else switch(x){case"string":case"number":M=!0;break;case"object":switch(t.$$typeof){case e:case n:M=!0}}if(M)return M=t,h=h(M),t=_===""?"."+oe(M,0):_,H(h)?(v="",t!=null&&(v=t.replace(J,"$&/")+"/"),Z(h,s,v,"",function(P){return P})):h!=null&&(te(h)&&(h=L(h,v+(!h.key||M&&M.key===h.key?"":(""+h.key).replace(J,"$&/")+"/")+t)),s.push(h)),1;if(M=0,_=_===""?".":_+":",H(t))for(var z=0;z<t.length;z++){x=t[z];var y=_+oe(x,z);M+=Z(x,s,v,y,h)}else if(y=W(t),typeof y=="function")for(t=y.call(t),z=0;!(x=t.next()).done;)x=x.value,y=_+oe(x,z++),M+=Z(x,s,v,y,h);else if(x==="object")throw s=String(t),Error("Objects are not valid as a React child (found: "+(s==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":s)+"). If you meant to render a collection of children, use an array instead.");return M}function G(t,s,v){if(t==null)return t;var _=[],h=0;return Z(t,_,"","",function(x){return s.call(v,x,h++)}),_}function E(t){if(t._status===-1){var s=t._result;s=s(),s.then(function(v){(t._status===0||t._status===-1)&&(t._status=1,t._result=v)},function(v){(t._status===0||t._status===-1)&&(t._status=2,t._result=v)}),t._status===-1&&(t._status=0,t._result=s)}if(t._status===1)return t._result.default;throw t._result}var C={current:null},X={transition:null},ne={ReactCurrentDispatcher:C,ReactCurrentBatchConfig:X,ReactCurrentOwner:O};function u(){throw Error("act(...) is not supported in production builds of React.")}return g.Children={map:G,forEach:function(t,s,v){G(t,function(){s.apply(this,arguments)},v)},count:function(t){var s=0;return G(t,function(){s++}),s},toArray:function(t){return G(t,function(s){return s})||[]},only:function(t){if(!te(t))throw Error("React.Children.only expected to receive a single React element child.");return t}},g.Component=A,g.Fragment=r,g.Profiler=c,g.PureComponent=R,g.StrictMode=o,g.Suspense=w,g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ne,g.act=u,g.cloneElement=function(t,s,v){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var _=D({},t.props),h=t.key,x=t.ref,M=t._owner;if(s!=null){if(s.ref!==void 0&&(x=s.ref,M=O.current),s.key!==void 0&&(h=""+s.key),t.type&&t.type.defaultProps)var z=t.type.defaultProps;for(y in s)B.call(s,y)&&!T.hasOwnProperty(y)&&(_[y]=s[y]===void 0&&z!==void 0?z[y]:s[y])}var y=arguments.length-2;if(y===1)_.children=v;else if(1<y){z=Array(y);for(var P=0;P<y;P++)z[P]=arguments[P+2];_.children=z}return{$$typeof:e,type:t.type,key:h,ref:x,props:_,_owner:M}},g.createContext=function(t){return t={$$typeof:d,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:m,_context:t},t.Consumer=t},g.createElement=l,g.createFactory=function(t){var s=l.bind(null,t);return s.type=t,s},g.createRef=function(){return{current:null}},g.forwardRef=function(t){return{$$typeof:k,render:t}},g.isValidElement=te,g.lazy=function(t){return{$$typeof:S,_payload:{_status:-1,_result:t},_init:E}},g.memo=function(t,s){return{$$typeof:f,type:t,compare:s===void 0?null:s}},g.startTransition=function(t){var s=X.transition;X.transition={};try{t()}finally{X.transition=s}},g.unstable_act=u,g.useCallback=function(t,s){return C.current.useCallback(t,s)},g.useContext=function(t){return C.current.useContext(t)},g.useDebugValue=function(){},g.useDeferredValue=function(t){return C.current.useDeferredValue(t)},g.useEffect=function(t,s){return C.current.useEffect(t,s)},g.useId=function(){return C.current.useId()},g.useImperativeHandle=function(t,s,v){return C.current.useImperativeHandle(t,s,v)},g.useInsertionEffect=function(t,s){return C.current.useInsertionEffect(t,s)},g.useLayoutEffect=function(t,s){return C.current.useLayoutEffect(t,s)},g.useMemo=function(t,s){return C.current.useMemo(t,s)},g.useReducer=function(t,s,v){return C.current.useReducer(t,s,v)},g.useRef=function(t){return C.current.useRef(t)},g.useState=function(t){return C.current.useState(t)},g.useSyncExternalStore=function(t,s,v){return C.current.useSyncExternalStore(t,s,v)},g.useTransition=function(){return C.current.useTransition()},g.version="18.3.1",g}var xe;function Be(){return xe||(xe=1,fe.exports=He()),fe.exports}var re=Be();const qo=Fe(re);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Se=(...e)=>e.filter((n,r,o)=>!!n&&n.trim()!==""&&o.indexOf(n)===r).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var De={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=re.forwardRef(({color:e="currentColor",size:n=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:c="",children:m,iconNode:d,...k},w)=>re.createElement("svg",{ref:w,...De,width:n,height:n,stroke:e,strokeWidth:o?Number(r)*24/Number(n):r,className:Se("lucide",c),...k},[...d.map(([f,S])=>re.createElement(f,S)),...Array.isArray(m)?m:[m]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=(e,n)=>{const r=re.forwardRef(({className:o,...c},m)=>re.createElement(Ze,{ref:m,iconNode:n,className:Se(`lucide-${Ue(e)}`,o),...c}));return r.displayName=`${e}`,r};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Oo=p("ArrowRight",Xe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],Vo=p("ArrowUpRight",Ye);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qe=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],Wo=p("ArrowUp",Qe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je=[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]],Fo=p("Bot",Je);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]],Ho=p("Building2",Ke);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const et=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],Bo=p("Calendar",et);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Uo=p("Check",tt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Do=p("ChevronDown",ot);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rt=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Zo=p("ChevronRight",rt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Xo=p("CircleCheck",nt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const st=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Yo=p("CircleHelp",st);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const at=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],Qo=p("Clock",at);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const it=[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],Jo=p("CodeXml",it);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3",key:"11bfej"}]],Ko=p("Command",lt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],er=p("Compass",ct);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dt=[["path",{d:"M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5",key:"laymnq"}],["path",{d:"M8.5 8.5v.01",key:"ue8clq"}],["path",{d:"M16 15.5v.01",key:"14dtrp"}],["path",{d:"M12 12v.01",key:"u5ubse"}],["path",{d:"M11 17v.01",key:"1hyl5a"}],["path",{d:"M7 14v.01",key:"uct60s"}]],tr=p("Cookie",dt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ut=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],or=p("Copy",ut);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2",key:"14l7u7"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1",key:"5aljv4"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]],rr=p("Cpu",pt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]],nr=p("Crown",mt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ft=[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]],sr=p("DollarSign",ft);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ht=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],ar=p("FileText",ht);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=[["path",{d:"M6 3h12l4 6-10 13L2 9Z",key:"1pcd5k"}],["path",{d:"M11 3 8 9l4 13 4-13-3-6",key:"1fcu3u"}],["path",{d:"M2 9h20",key:"16fsjt"}]],ir=p("Gem",yt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bt=[["path",{d:"M9 10h.01",key:"qbtxuw"}],["path",{d:"M15 10h.01",key:"1qmjsl"}],["path",{d:"M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z",key:"uwwb07"}]],lr=p("Ghost",bt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],cr=p("Globe",gt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kt=[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",key:"yt0hxn"}]],dr=p("Hexagon",kt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xt=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],ur=p("House",xt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wt=[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]],pr=p("Link2",wt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vt=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],mr=p("Mail",vt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],fr=p("Menu",_t);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]],hr=p("MessageSquare",Mt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=[["polyline",{points:"4 14 10 14 10 20",key:"11kfnr"}],["polyline",{points:"20 10 14 10 14 4",key:"rlmsce"}],["line",{x1:"14",x2:"21",y1:"10",y2:"3",key:"o5lafz"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]],yr=p("Minimize2",Ct);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],br=p("Moon",zt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const St=[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]],gr=p("Phone",St);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]],kr=p("Play",$t);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nt=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",key:"w46dr5"}]],xr=p("Puzzle",Nt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",key:"rib7q0"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",key:"1ymkrd"}]],wr=p("Quote",At);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],vr=p("Search",Rt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jt=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],_r=p("Send",jt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Mr=p("ShieldCheck",Lt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],Cr=p("Shield",Pt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=[["line",{x1:"4",x2:"4",y1:"21",y2:"14",key:"1p332r"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3",key:"gb41h5"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12",key:"hf2csr"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3",key:"1kfi7u"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16",key:"1lhrwl"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3",key:"16vvfq"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14",key:"1uebub"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8",key:"1yglbp"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16",key:"1jxqpz"}]],zr=p("SlidersVertical",It);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]],Sr=p("Smartphone",Et);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],$r=p("Sparkles",Tt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],Nr=p("Star",Gt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],Ar=p("Sun",qt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],Rr=p("Target",Ot);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vt=[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]],jr=p("TrendingUp",Vt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wt=[["path",{d:"M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"14u9p9"}]],Lr=p("Triangle",Wt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ft=[["rect",{width:"8",height:"8",x:"3",y:"3",rx:"2",key:"by2w9f"}],["path",{d:"M7 11v4a2 2 0 0 0 2 2h4",key:"xkn7yn"}],["rect",{width:"8",height:"8",x:"13",y:"13",rx:"2",key:"1cgmvn"}]],Pr=p("Workflow",Ft);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ht=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]],Ir=p("Wrench",Ht);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Er=p("X",Bt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Tr=p("Zap",Ut);function $e(e){var n,r,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var c=e.length;for(n=0;n<c;n++)e[n]&&(r=$e(e[n]))&&(o&&(o+=" "),o+=r)}else for(r in e)e[r]&&(o&&(o+=" "),o+=r);return o}function Gr(){for(var e,n,r=0,o="",c=arguments.length;r<c;r++)(e=arguments[r])&&(n=$e(e))&&(o&&(o+=" "),o+=n);return o}const Dt=(e,n)=>{const r=new Array(e.length+n.length);for(let o=0;o<e.length;o++)r[o]=e[o];for(let o=0;o<n.length;o++)r[e.length+o]=n[o];return r},Zt=(e,n)=>({classGroupId:e,validator:n}),Ne=(e=new Map,n=null,r)=>({nextPart:e,validators:n,classGroupId:r}),pe="-",we=[],Xt="arbitrary..",Yt=e=>{const n=Jt(e),{conflictingClassGroups:r,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:d=>{if(d.startsWith("[")&&d.endsWith("]"))return Qt(d);const k=d.split(pe),w=k[0]===""&&k.length>1?1:0;return Ae(k,w,n)},getConflictingClassGroupIds:(d,k)=>{if(k){const w=o[d],f=r[d];return w?f?Dt(f,w):w:f||we}return r[d]||we}}},Ae=(e,n,r)=>{if(e.length-n===0)return r.classGroupId;const c=e[n],m=r.nextPart.get(c);if(m){const f=Ae(e,n+1,m);if(f)return f}const d=r.validators;if(d===null)return;const k=n===0?e.join(pe):e.slice(n).join(pe),w=d.length;for(let f=0;f<w;f++){const S=d[f];if(S.validator(k))return S.classGroupId}},Qt=e=>e.slice(1,-1).indexOf(":")===-1?void 0:(()=>{const n=e.slice(1,-1),r=n.indexOf(":"),o=n.slice(0,r);return o?Xt+o:void 0})(),Jt=e=>{const{theme:n,classGroups:r}=e;return Kt(r,n)},Kt=(e,n)=>{const r=Ne();for(const o in e){const c=e[o];be(c,r,o,n)}return r},be=(e,n,r,o)=>{const c=e.length;for(let m=0;m<c;m++){const d=e[m];eo(d,n,r,o)}},eo=(e,n,r,o)=>{if(typeof e=="string"){to(e,n,r);return}if(typeof e=="function"){oo(e,n,r,o);return}ro(e,n,r,o)},to=(e,n,r)=>{const o=e===""?n:Re(n,e);o.classGroupId=r},oo=(e,n,r,o)=>{if(no(e)){be(e(o),n,r,o);return}n.validators===null&&(n.validators=[]),n.validators.push(Zt(r,e))},ro=(e,n,r,o)=>{const c=Object.entries(e),m=c.length;for(let d=0;d<m;d++){const[k,w]=c[d];be(w,Re(n,k),r,o)}},Re=(e,n)=>{let r=e;const o=n.split(pe),c=o.length;for(let m=0;m<c;m++){const d=o[m];let k=r.nextPart.get(d);k||(k=Ne(),r.nextPart.set(d,k)),r=k}return r},no=e=>"isThemeGetter"in e&&e.isThemeGetter===!0,so=e=>{if(e<1)return{get:()=>{},set:()=>{}};let n=0,r=Object.create(null),o=Object.create(null);const c=(m,d)=>{r[m]=d,n++,n>e&&(n=0,o=r,r=Object.create(null))};return{get(m){let d=r[m];if(d!==void 0)return d;if((d=o[m])!==void 0)return c(m,d),d},set(m,d){m in r?r[m]=d:c(m,d)}}},ye="!",ve=":",ao=[],_e=(e,n,r,o,c)=>({modifiers:e,hasImportantModifier:n,baseClassName:r,maybePostfixModifierPosition:o,isExternal:c}),io=e=>{const{prefix:n,experimentalParseClassName:r}=e;let o=c=>{const m=[];let d=0,k=0,w=0,f;const S=c.length;for(let j=0;j<S;j++){const A=c[j];if(d===0&&k===0){if(A===ve){m.push(c.slice(w,j)),w=j+1;continue}if(A==="/"){f=j;continue}}A==="["?d++:A==="]"?d--:A==="("?k++:A===")"&&k--}const N=m.length===0?c:c.slice(w);let W=N,I=!1;N.endsWith(ye)?(W=N.slice(0,-1),I=!0):N.startsWith(ye)&&(W=N.slice(1),I=!0);const D=f&&f>w?f-w:void 0;return _e(m,I,W,D)};if(n){const c=n+ve,m=o;o=d=>d.startsWith(c)?m(d.slice(c.length)):_e(ao,!1,d,void 0,!0)}if(r){const c=o;o=m=>r({className:m,parseClassName:c})}return o},lo=e=>{const n=new Map;return e.orderSensitiveModifiers.forEach((r,o)=>{n.set(r,1e6+o)}),r=>{const o=[];let c=[];for(let m=0;m<r.length;m++){const d=r[m],k=d[0]==="[",w=n.has(d);k||w?(c.length>0&&(c.sort(),o.push(...c),c=[]),o.push(d)):c.push(d)}return c.length>0&&(c.sort(),o.push(...c)),o}},co=e=>({cache:so(e.cacheSize),parseClassName:io(e),sortModifiers:lo(e),postfixLookupClassGroupIds:uo(e),...Yt(e)}),uo=e=>{const n=Object.create(null),r=e.postfixLookupClassGroups;if(r)for(let o=0;o<r.length;o++)n[r[o]]=!0;return n},po=/\s+/,mo=(e,n)=>{const{parseClassName:r,getClassGroupId:o,getConflictingClassGroupIds:c,sortModifiers:m,postfixLookupClassGroupIds:d}=n,k=[],w=e.trim().split(po);let f="";for(let S=w.length-1;S>=0;S-=1){const N=w[S],{isExternal:W,modifiers:I,hasImportantModifier:D,baseClassName:j,maybePostfixModifierPosition:A}=r(N);if(W){f=N+(f.length>0?" "+f:f);continue}let q=!!A,R;if(q){const T=j.substring(0,A);R=o(T);const l=R&&d[R]?o(j):void 0;l&&l!==R&&(R=l,q=!1)}else R=o(j);if(!R){if(!q){f=N+(f.length>0?" "+f:f);continue}if(R=o(j),!R){f=N+(f.length>0?" "+f:f);continue}q=!1}const F=I.length===0?"":I.length===1?I[0]:m(I).join(":"),H=D?F+ye:F,B=H+R;if(k.indexOf(B)>-1)continue;k.push(B);const O=c(R,q);for(let T=0;T<O.length;++T){const l=O[T];k.push(H+l)}f=N+(f.length>0?" "+f:f)}return f},fo=(...e)=>{let n=0,r,o,c="";for(;n<e.length;)(r=e[n++])&&(o=je(r))&&(c&&(c+=" "),c+=o);return c},je=e=>{if(typeof e=="string")return e;let n,r="";for(let o=0;o<e.length;o++)e[o]&&(n=je(e[o]))&&(r&&(r+=" "),r+=n);return r},ho=(e,...n)=>{let r,o,c,m;const d=w=>{const f=n.reduce((S,N)=>N(S),e());return r=co(f),o=r.cache.get,c=r.cache.set,m=k,k(w)},k=w=>{const f=o(w);if(f)return f;const S=mo(w,r);return c(w,S),S};return m=d,(...w)=>m(fo(...w))},yo=[],$=e=>{const n=r=>r[e]||yo;return n.isThemeGetter=!0,n},Le=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,Pe=/^\((?:(\w[\w-]*):)?(.+)\)$/i,bo=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,go=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,ko=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,xo=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,wo=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,vo=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Y=e=>bo.test(e),b=e=>!!e&&!Number.isNaN(Number(e)),V=e=>!!e&&Number.isInteger(Number(e)),he=e=>e.endsWith("%")&&b(e.slice(0,-1)),U=e=>go.test(e),Ie=()=>!0,_o=e=>ko.test(e)&&!xo.test(e),ge=()=>!1,Mo=e=>wo.test(e),Co=e=>vo.test(e),zo=e=>!a(e)&&!i(e),So=e=>e.startsWith("@container")&&(e[10]==="/"&&e[11]!==void 0||e[11]==="s"&&e[16]!==void 0&&e.startsWith("-size/",10)||e[11]==="n"&&e[18]!==void 0&&e.startsWith("-normal/",10)),$o=e=>Q(e,Ge,ge),a=e=>Le.test(e),K=e=>Q(e,qe,_o),Me=e=>Q(e,Eo,b),No=e=>Q(e,Ve,Ie),Ao=e=>Q(e,Oe,ge),Ce=e=>Q(e,Ee,ge),Ro=e=>Q(e,Te,Co),de=e=>Q(e,We,Mo),i=e=>Pe.test(e),se=e=>ee(e,qe),jo=e=>ee(e,Oe),ze=e=>ee(e,Ee),Lo=e=>ee(e,Ge),Po=e=>ee(e,Te),ue=e=>ee(e,We,!0),Io=e=>ee(e,Ve,!0),Q=(e,n,r)=>{const o=Le.exec(e);return o?o[1]?n(o[1]):r(o[2]):!1},ee=(e,n,r=!1)=>{const o=Pe.exec(e);return o?o[1]?n(o[1]):r:!1},Ee=e=>e==="position"||e==="percentage",Te=e=>e==="image"||e==="url",Ge=e=>e==="length"||e==="size"||e==="bg-size",qe=e=>e==="length",Eo=e=>e==="number",Oe=e=>e==="family-name",Ve=e=>e==="number"||e==="weight",We=e=>e==="shadow",To=()=>{const e=$("color"),n=$("font"),r=$("text"),o=$("font-weight"),c=$("tracking"),m=$("leading"),d=$("breakpoint"),k=$("container"),w=$("spacing"),f=$("radius"),S=$("shadow"),N=$("inset-shadow"),W=$("text-shadow"),I=$("drop-shadow"),D=$("blur"),j=$("perspective"),A=$("aspect"),q=$("ease"),R=$("animate"),F=()=>["auto","avoid","all","avoid-page","page","left","right","column"],H=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],B=()=>[...H(),i,a],O=()=>["auto","hidden","clip","visible","scroll"],T=()=>["auto","contain","none"],l=()=>[i,a,w],L=()=>[Y,"full","auto",...l()],te=()=>[V,"none","subgrid",i,a],ae=()=>["auto",{span:["full",V,i,a]},V,i,a],J=()=>[V,"auto",i,a],oe=()=>["auto","min","max","fr",i,a],Z=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],G=()=>["start","end","center","stretch","center-safe","end-safe"],E=()=>["auto",...l()],C=()=>[Y,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...l()],X=()=>[Y,"screen","full","dvw","lvw","svw","min","max","fit",...l()],ne=()=>[Y,"screen","full","lh","dvh","lvh","svh","min","max","fit",...l()],u=()=>[e,i,a],t=()=>[...H(),ze,Ce,{position:[i,a]}],s=()=>["no-repeat",{repeat:["","x","y","space","round"]}],v=()=>["auto","cover","contain",Lo,$o,{size:[i,a]}],_=()=>[he,se,K],h=()=>["","none","full",f,i,a],x=()=>["",b,se,K],M=()=>["solid","dashed","dotted","double"],z=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],y=()=>[b,he,ze,Ce],P=()=>["","none",D,i,a],ie=()=>["none",b,i,a],le=()=>["none",b,i,a],me=()=>[b,i,a],ce=()=>[Y,"full",...l()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[U],breakpoint:[U],color:[Ie],container:[U],"drop-shadow":[U],ease:["in","out","in-out"],font:[zo],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[U],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[U],shadow:[U],spacing:["px",b],text:[U],"text-shadow":[U],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",Y,a,i,A]}],container:["container"],"container-type":[{"@container":["","normal","size",i,a]}],"container-named":[So],columns:[{columns:[b,a,i,k]}],"break-after":[{"break-after":F()}],"break-before":[{"break-before":F()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:B()}],overflow:[{overflow:O()}],"overflow-x":[{"overflow-x":O()}],"overflow-y":[{"overflow-y":O()}],overscroll:[{overscroll:T()}],"overscroll-x":[{"overscroll-x":T()}],"overscroll-y":[{"overscroll-y":T()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:L()}],"inset-x":[{"inset-x":L()}],"inset-y":[{"inset-y":L()}],start:[{"inset-s":L(),start:L()}],end:[{"inset-e":L(),end:L()}],"inset-bs":[{"inset-bs":L()}],"inset-be":[{"inset-be":L()}],top:[{top:L()}],right:[{right:L()}],bottom:[{bottom:L()}],left:[{left:L()}],visibility:["visible","invisible","collapse"],z:[{z:[V,"auto",i,a]}],basis:[{basis:[Y,"full","auto",k,...l()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[b,Y,"auto","initial","none",a]}],grow:[{grow:["",b,i,a]}],shrink:[{shrink:["",b,i,a]}],order:[{order:[V,"first","last","none",i,a]}],"grid-cols":[{"grid-cols":te()}],"col-start-end":[{col:ae()}],"col-start":[{"col-start":J()}],"col-end":[{"col-end":J()}],"grid-rows":[{"grid-rows":te()}],"row-start-end":[{row:ae()}],"row-start":[{"row-start":J()}],"row-end":[{"row-end":J()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":oe()}],"auto-rows":[{"auto-rows":oe()}],gap:[{gap:l()}],"gap-x":[{"gap-x":l()}],"gap-y":[{"gap-y":l()}],"justify-content":[{justify:[...Z(),"normal"]}],"justify-items":[{"justify-items":[...G(),"normal"]}],"justify-self":[{"justify-self":["auto",...G()]}],"align-content":[{content:["normal",...Z()]}],"align-items":[{items:[...G(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...G(),{baseline:["","last"]}]}],"place-content":[{"place-content":Z()}],"place-items":[{"place-items":[...G(),"baseline"]}],"place-self":[{"place-self":["auto",...G()]}],p:[{p:l()}],px:[{px:l()}],py:[{py:l()}],ps:[{ps:l()}],pe:[{pe:l()}],pbs:[{pbs:l()}],pbe:[{pbe:l()}],pt:[{pt:l()}],pr:[{pr:l()}],pb:[{pb:l()}],pl:[{pl:l()}],m:[{m:E()}],mx:[{mx:E()}],my:[{my:E()}],ms:[{ms:E()}],me:[{me:E()}],mbs:[{mbs:E()}],mbe:[{mbe:E()}],mt:[{mt:E()}],mr:[{mr:E()}],mb:[{mb:E()}],ml:[{ml:E()}],"space-x":[{"space-x":l()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":l()}],"space-y-reverse":["space-y-reverse"],size:[{size:C()}],"inline-size":[{inline:["auto",...X()]}],"min-inline-size":[{"min-inline":["auto",...X()]}],"max-inline-size":[{"max-inline":["none",...X()]}],"block-size":[{block:["auto",...ne()]}],"min-block-size":[{"min-block":["auto",...ne()]}],"max-block-size":[{"max-block":["none",...ne()]}],w:[{w:[k,"screen",...C()]}],"min-w":[{"min-w":[k,"screen","none",...C()]}],"max-w":[{"max-w":[k,"screen","none","prose",{screen:[d]},...C()]}],h:[{h:["screen","lh",...C()]}],"min-h":[{"min-h":["screen","lh","none",...C()]}],"max-h":[{"max-h":["screen","lh",...C()]}],"font-size":[{text:["base",r,se,K]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[o,Io,No]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",he,a]}],"font-family":[{font:[jo,Ao,n]}],"font-features":[{"font-features":[a]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[c,i,a]}],"line-clamp":[{"line-clamp":[b,"none",i,Me]}],leading:[{leading:[m,...l()]}],"list-image":[{"list-image":["none",i,a]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",i,a]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:u()}],"text-color":[{text:u()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...M(),"wavy"]}],"text-decoration-thickness":[{decoration:[b,"from-font","auto",i,K]}],"text-decoration-color":[{decoration:u()}],"underline-offset":[{"underline-offset":[b,"auto",i,a]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:l()}],"tab-size":[{tab:[V,i,a]}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",i,a]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",i,a]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:t()}],"bg-repeat":[{bg:s()}],"bg-size":[{bg:v()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},V,i,a],radial:["",i,a],conic:[V,i,a]},Po,Ro]}],"bg-color":[{bg:u()}],"gradient-from-pos":[{from:_()}],"gradient-via-pos":[{via:_()}],"gradient-to-pos":[{to:_()}],"gradient-from":[{from:u()}],"gradient-via":[{via:u()}],"gradient-to":[{to:u()}],rounded:[{rounded:h()}],"rounded-s":[{"rounded-s":h()}],"rounded-e":[{"rounded-e":h()}],"rounded-t":[{"rounded-t":h()}],"rounded-r":[{"rounded-r":h()}],"rounded-b":[{"rounded-b":h()}],"rounded-l":[{"rounded-l":h()}],"rounded-ss":[{"rounded-ss":h()}],"rounded-se":[{"rounded-se":h()}],"rounded-ee":[{"rounded-ee":h()}],"rounded-es":[{"rounded-es":h()}],"rounded-tl":[{"rounded-tl":h()}],"rounded-tr":[{"rounded-tr":h()}],"rounded-br":[{"rounded-br":h()}],"rounded-bl":[{"rounded-bl":h()}],"border-w":[{border:x()}],"border-w-x":[{"border-x":x()}],"border-w-y":[{"border-y":x()}],"border-w-s":[{"border-s":x()}],"border-w-e":[{"border-e":x()}],"border-w-bs":[{"border-bs":x()}],"border-w-be":[{"border-be":x()}],"border-w-t":[{"border-t":x()}],"border-w-r":[{"border-r":x()}],"border-w-b":[{"border-b":x()}],"border-w-l":[{"border-l":x()}],"divide-x":[{"divide-x":x()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":x()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...M(),"hidden","none"]}],"divide-style":[{divide:[...M(),"hidden","none"]}],"border-color":[{border:u()}],"border-color-x":[{"border-x":u()}],"border-color-y":[{"border-y":u()}],"border-color-s":[{"border-s":u()}],"border-color-e":[{"border-e":u()}],"border-color-bs":[{"border-bs":u()}],"border-color-be":[{"border-be":u()}],"border-color-t":[{"border-t":u()}],"border-color-r":[{"border-r":u()}],"border-color-b":[{"border-b":u()}],"border-color-l":[{"border-l":u()}],"divide-color":[{divide:u()}],"outline-style":[{outline:[...M(),"none","hidden"]}],"outline-offset":[{"outline-offset":[b,i,a]}],"outline-w":[{outline:["",b,se,K]}],"outline-color":[{outline:u()}],shadow:[{shadow:["","none",S,ue,de]}],"shadow-color":[{shadow:u()}],"inset-shadow":[{"inset-shadow":["none",N,ue,de]}],"inset-shadow-color":[{"inset-shadow":u()}],"ring-w":[{ring:x()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:u()}],"ring-offset-w":[{"ring-offset":[b,K]}],"ring-offset-color":[{"ring-offset":u()}],"inset-ring-w":[{"inset-ring":x()}],"inset-ring-color":[{"inset-ring":u()}],"text-shadow":[{"text-shadow":["none",W,ue,de]}],"text-shadow-color":[{"text-shadow":u()}],opacity:[{opacity:[b,i,a]}],"mix-blend":[{"mix-blend":[...z(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":z()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[b]}],"mask-image-linear-from-pos":[{"mask-linear-from":y()}],"mask-image-linear-to-pos":[{"mask-linear-to":y()}],"mask-image-linear-from-color":[{"mask-linear-from":u()}],"mask-image-linear-to-color":[{"mask-linear-to":u()}],"mask-image-t-from-pos":[{"mask-t-from":y()}],"mask-image-t-to-pos":[{"mask-t-to":y()}],"mask-image-t-from-color":[{"mask-t-from":u()}],"mask-image-t-to-color":[{"mask-t-to":u()}],"mask-image-r-from-pos":[{"mask-r-from":y()}],"mask-image-r-to-pos":[{"mask-r-to":y()}],"mask-image-r-from-color":[{"mask-r-from":u()}],"mask-image-r-to-color":[{"mask-r-to":u()}],"mask-image-b-from-pos":[{"mask-b-from":y()}],"mask-image-b-to-pos":[{"mask-b-to":y()}],"mask-image-b-from-color":[{"mask-b-from":u()}],"mask-image-b-to-color":[{"mask-b-to":u()}],"mask-image-l-from-pos":[{"mask-l-from":y()}],"mask-image-l-to-pos":[{"mask-l-to":y()}],"mask-image-l-from-color":[{"mask-l-from":u()}],"mask-image-l-to-color":[{"mask-l-to":u()}],"mask-image-x-from-pos":[{"mask-x-from":y()}],"mask-image-x-to-pos":[{"mask-x-to":y()}],"mask-image-x-from-color":[{"mask-x-from":u()}],"mask-image-x-to-color":[{"mask-x-to":u()}],"mask-image-y-from-pos":[{"mask-y-from":y()}],"mask-image-y-to-pos":[{"mask-y-to":y()}],"mask-image-y-from-color":[{"mask-y-from":u()}],"mask-image-y-to-color":[{"mask-y-to":u()}],"mask-image-radial":[{"mask-radial":[i,a]}],"mask-image-radial-from-pos":[{"mask-radial-from":y()}],"mask-image-radial-to-pos":[{"mask-radial-to":y()}],"mask-image-radial-from-color":[{"mask-radial-from":u()}],"mask-image-radial-to-color":[{"mask-radial-to":u()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":H()}],"mask-image-conic-pos":[{"mask-conic":[b]}],"mask-image-conic-from-pos":[{"mask-conic-from":y()}],"mask-image-conic-to-pos":[{"mask-conic-to":y()}],"mask-image-conic-from-color":[{"mask-conic-from":u()}],"mask-image-conic-to-color":[{"mask-conic-to":u()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:t()}],"mask-repeat":[{mask:s()}],"mask-size":[{mask:v()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",i,a]}],filter:[{filter:["","none",i,a]}],blur:[{blur:P()}],brightness:[{brightness:[b,i,a]}],contrast:[{contrast:[b,i,a]}],"drop-shadow":[{"drop-shadow":["","none",I,ue,de]}],"drop-shadow-color":[{"drop-shadow":u()}],grayscale:[{grayscale:["",b,i,a]}],"hue-rotate":[{"hue-rotate":[b,i,a]}],invert:[{invert:["",b,i,a]}],saturate:[{saturate:[b,i,a]}],sepia:[{sepia:["",b,i,a]}],"backdrop-filter":[{"backdrop-filter":["","none",i,a]}],"backdrop-blur":[{"backdrop-blur":P()}],"backdrop-brightness":[{"backdrop-brightness":[b,i,a]}],"backdrop-contrast":[{"backdrop-contrast":[b,i,a]}],"backdrop-grayscale":[{"backdrop-grayscale":["",b,i,a]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[b,i,a]}],"backdrop-invert":[{"backdrop-invert":["",b,i,a]}],"backdrop-opacity":[{"backdrop-opacity":[b,i,a]}],"backdrop-saturate":[{"backdrop-saturate":[b,i,a]}],"backdrop-sepia":[{"backdrop-sepia":["",b,i,a]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":l()}],"border-spacing-x":[{"border-spacing-x":l()}],"border-spacing-y":[{"border-spacing-y":l()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",i,a]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[b,"initial",i,a]}],ease:[{ease:["linear","initial",q,i,a]}],delay:[{delay:[b,i,a]}],animate:[{animate:["none",R,i,a]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[j,i,a]}],"perspective-origin":[{"perspective-origin":B()}],rotate:[{rotate:ie()}],"rotate-x":[{"rotate-x":ie()}],"rotate-y":[{"rotate-y":ie()}],"rotate-z":[{"rotate-z":ie()}],scale:[{scale:le()}],"scale-x":[{"scale-x":le()}],"scale-y":[{"scale-y":le()}],"scale-z":[{"scale-z":le()}],"scale-3d":["scale-3d"],skew:[{skew:me()}],"skew-x":[{"skew-x":me()}],"skew-y":[{"skew-y":me()}],transform:[{transform:[i,a,"","none","gpu","cpu"]}],"transform-origin":[{origin:B()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:ce()}],"translate-x":[{"translate-x":ce()}],"translate-y":[{"translate-y":ce()}],"translate-z":[{"translate-z":ce()}],"translate-none":["translate-none"],zoom:[{zoom:[V,i,a]}],accent:[{accent:u()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:u()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",i,a]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scrollbar-thumb-color":[{"scrollbar-thumb":u()}],"scrollbar-track-color":[{"scrollbar-track":u()}],"scrollbar-gutter":[{"scrollbar-gutter":["auto","stable","both"]}],"scrollbar-w":[{scrollbar:["auto","thin","none"]}],"scroll-m":[{"scroll-m":l()}],"scroll-mx":[{"scroll-mx":l()}],"scroll-my":[{"scroll-my":l()}],"scroll-ms":[{"scroll-ms":l()}],"scroll-me":[{"scroll-me":l()}],"scroll-mbs":[{"scroll-mbs":l()}],"scroll-mbe":[{"scroll-mbe":l()}],"scroll-mt":[{"scroll-mt":l()}],"scroll-mr":[{"scroll-mr":l()}],"scroll-mb":[{"scroll-mb":l()}],"scroll-ml":[{"scroll-ml":l()}],"scroll-p":[{"scroll-p":l()}],"scroll-px":[{"scroll-px":l()}],"scroll-py":[{"scroll-py":l()}],"scroll-ps":[{"scroll-ps":l()}],"scroll-pe":[{"scroll-pe":l()}],"scroll-pbs":[{"scroll-pbs":l()}],"scroll-pbe":[{"scroll-pbe":l()}],"scroll-pt":[{"scroll-pt":l()}],"scroll-pr":[{"scroll-pr":l()}],"scroll-pb":[{"scroll-pb":l()}],"scroll-pl":[{"scroll-pl":l()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",i,a]}],fill:[{fill:["none",...u()]}],"stroke-w":[{stroke:[b,se,K,Me]}],stroke:[{stroke:["none",...u()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{"container-named":["container-type"],overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","inset-bs","inset-be","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pbs","pbe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mbs","mbe","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-bs","border-w-be","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-bs","border-color-be","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mbs","scroll-mbe","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pbs","scroll-pbe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},postfixLookupClassGroups:["container-type"],orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},qr=ho(To);export{Xo as $,Oo as A,Fo as B,Do as C,jr as D,Qo as E,or as F,lr as G,dr as H,mr as I,yr as J,er as K,_r as L,br as M,Wo as N,tr as O,gr as P,wr as Q,qo as R,Ar as S,Rr as T,sr as U,ar as V,Pr as W,Er as X,Ir as Y,Tr as Z,Ho as _,re as a,Yo as a0,pr as a1,ur as a2,Zo as a3,Bo as a4,vr as b,fr as c,Go as d,$r as e,Nr as f,Fe as g,kr as h,nr as i,Lr as j,Ko as k,ir as l,rr as m,cr as n,Mr as o,Vo as p,xr as q,Be as r,zr as s,Sr as t,Jo as u,Uo as v,Cr as w,qr as x,Gr as y,hr as z};
