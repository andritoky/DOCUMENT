(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{1592:function(n,t,r){"use strict";r.r(t);var E=r(64),e=r(0),u=r.n(e);class layout_Layout extends e.Component{constructor(n){super(n),window.addEventListener("message",n=>{if(n.data)switch(n.data.type){case E.b.UPDATE_IFRAME_BODY_PADDING:{const t=document.documentElement;t.style.setProperty("--iframe-top",n.data.top||"80px"),t.style.setProperty("--iframe-left",n.data.left||"80px");break}case E.b.RELOAD:location.reload()}}),Object(E.c)({type:E.b.LEGACY_LAYOUT_READY})}render(){return null}}var A=Object(e.memo)(layout_Layout),O=r(16),o=r.n(O);const renderLayout=()=>{const n=document.getElementById("layout");n?o.a.render(u.a.createElement(A,null),n):window.requestAnimationFrame(renderLayout)};renderLayout()},184:function(n,t,r){"use strict";r.r(t),r.d(t,"LOGIN",(function(){return E})),r.d(t,"HOME",(function(){return e})),r.d(t,"AB_TEST_DASHBOARD",(function(){return u})),r.d(t,"AB_TEST_RESULTS",(function(){return A})),r.d(t,"AB_TEST_CODE_EDITOR",(function(){return O})),r.d(t,"ADVANCED_TOOLS",(function(){return o})),r.d(t,"AUDIENCE_INSIGHTS",(function(){return I})),r.d(t,"AUDIENCE_SEGMENT",(function(){return T})),r.d(t,"AUDIENCE_DISCOVER",(function(){return _})),r.d(t,"AUDIENCE_SETUP",(function(){return S})),r.d(t,"FEATURE_FLAG_DASHBOARD",(function(){return c})),r.d(t,"FEATURE_FLAG_EDIT",(function(){return i})),r.d(t,"FEATURE_FLAG_RESULTS",(function(){return D})),r.d(t,"GOALS",(function(){return R})),r.d(t,"INTEGRATIONS",(function(){return N})),r.d(t,"PERSONALIZATION_DASHBOARD",(function(){return d})),r.d(t,"PERSONALIZATION_EDIT",(function(){return f})),r.d(t,"PERSONALIZATION_RESULTS",(function(){return L})),r.d(t,"PREDICTIVE",(function(){return P})),r.d(t,"SEGMENTS",(function(){return s})),r.d(t,"SITES",(function(){return a})),r.d(t,"SITES_CONFIGURATION",(function(){return U})),r.d(t,"SITES_SETUP",(function(){return C})),r.d(t,"SITES_INDICATORS",(function(){return G})),r.d(t,"TIMELINE",(function(){return p})),r.d(t,"USERS",(function(){return F})),r.d(t,"USERS_PROFILE",(function(){return y})),r.d(t,"WIDGETS",(function(){return l}));const E="LOGIN",e="HOME",u="AB_TEST_DASHBOARD",A="AB_TEST_RESULTS",O="AB_TEST_CODE_EDITOR",o="ADVANCED_TOOLS",I="AUDIENCE_INSIGHTS",T="AUDIENCE_SEGMENT",_="AUDIENCE_DISCOVER",S="AUDIENCE_SETUP",c="FEATURE_FLAG_DASHBOARD",i="FEATURE_FLAG_EDIT",D="FEATURE_FLAG_RESULTS",R="GOALS",N="INTEGRATIONS",d="PERSONALIZATION_DASHBOARD",f="PERSONALIZATION_EDIT",L="PERSONALIZATION_RESULTS",P="PREDICTIVE",s="SEGMENTS",a="PROJECTS_DASHBOARD",U="PROJECTS_CONFIGURATION",C="PROJECTS_SETUP",G="PROJECTS_INDICATORS",p="TIMELINE",F="USERS",y="USERS_PROFILE",l="WIDGETS"},64:function(n,t,r){"use strict";r.d(t,"b",(function(){return L})),r.d(t,"a",(function(){return P})),r.d(t,"c",(function(){return postMessageToApp}));var E={};r.r(E),r.d(E,"RELOAD",(function(){return A})),r.d(E,"LEGACY_LAYOUT_READY",(function(){return O})),r.d(E,"UPDATE_IFRAME_BODY_PADDING",(function(){return o})),r.d(E,"TOGGLE_POPUP",(function(){return I})),r.d(E,"WIDGET_OPEN_CONFIGURATION",(function(){return T})),r.d(E,"USERS_OPEN_PROFILE",(function(){return _})),r.d(E,"WIDGET_CLOSE_CONFIGURATION",(function(){return S})),r.d(E,"REDIRECT",(function(){return c})),r.d(E,"NOTIFICATION",(function(){return i})),r.d(E,"CLOSE_IFRAME",(function(){return D})),r.d(E,"SET_PAGE_TITLE",(function(){return R})),r.d(E,"OPEN_SITE_ALIASES_SIDEBAR",(function(){return N})),r.d(E,"UPDATE_VARIATION_ALLOCATION",(function(){return d}));var e=r(2),u=r.n(e);const A="RELOAD",O="LEGACY_LAYOUT_READY",o="UPDATE_IFRAME_BODY_PADDING",I="TOGGLE_POPUP",T="WIDGET_OPEN_CONFIGURATION",_="USERS_OPEN_PROFILE",S="WIDGET_CLOSE_CONFIGURATION",c="REDIRECT",i="NOTIFICATION",D="CLOSE_IFRAME",R="SET_PAGE_TITLE",N="OPEN_SITE_ALIASES_SIDEBAR",d="UPDATE_VARIATION_ALLOCATION";var f=r(184);function ownKeys(n,t){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var E=Object.getOwnPropertySymbols(n);t&&(E=E.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.push.apply(r,E)}return r}const L=E,P=f,postMessageToApp=n=>{window.parent.postMessage(function _objectSpread(n){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){u()(n,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(r,t))}))}return n}({},n),"*")}}}]);