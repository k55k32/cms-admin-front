webpackJsonp([10,8],{0:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}var u=n(13),o=a(u),r=n(59),i=a(r),l=n(10),s=a(l),c=n(199),f=a(c),d=n(104),p=a(d),h=n(139),g=a(h),m=n(100),v=a(m),b=n(182),y=a(b);n(84),n(82),n(99),n(83);var k=n(185),x=a(k),M=n(181),_=a(M);s.default.use(p.default),s.default.use(g.default),s.default.use(v.default),s.default.http.options.root="http://42.96.203.79:8080",s.default.config.devtools=!1,s.default.config.silent=!0,s.default.http.options.emulateJSON=!0,s.default.globalOptions={uploadUrl:"http://42.96.203.79:22222/upload"},(0,i.default)(_.default).forEach(function(t){s.default.filter(t,_.default[t])}),s.default.mixin({computed:{headers:function(){return{Authorization:x.default.state.token}}},methods:{post:function(t,e,n){return this.$http.post(t,e,(0,o.default)({headers:this.headers},n))},put:function(t,e,n){return this.$http.put(t,e,(0,o.default)({headers:this.headers},n))},get:function(t,e,n){return this.$http.get(t+"?"+this.serialize(e),(0,o.default)({headers:this.headers},n))},delete:function(t,e,n){return this.$http.delete(t+"?"+this.serialize(e),(0,o.default)({headers:this.headers},n))},serialize:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e="";return(0,i.default)(t).forEach(function(n){var a=t[n];null!==a&&void 0!==a&&(e+=n+"="+a+"&")}),e.substr(0,e.length-1)}}});var w=new g.default({routes:y.default});w.beforeEach(function(t,e,n){0===t.matched.length?(w.push({name:"no-page",params:{message:t.path}}),n()):t.meta.authorization!==!1&&x.default.state.login===!1?!function(){var e=p.default.Loading.service({text:"loading"});x.default.dispatch("login").then(function(t){e.close(),n()}).catch(function(){w.replace({name:"login",query:{redirect:t.fullPath}}),e.close()})}():n()});var $=new s.default({el:"#app",router:w,store:x.default,template:"<App/>",components:{App:f.default}}),O={0:"Cannot connect to server",404:"request does not exist",500:"server exception"};s.default.http.interceptors.push(function(t,e){e(function(t){if(t.ok){var e=t.data;if(!e)return t;e.success===!1?($.$message.error(e.msg),t.ok=!1):e.success&&(t.data=e.data)}else{var n=t.status;switch(n){case 401:$.$message.error("login expired, please re-login"),w.replace({name:"login",query:{redirect:$.$route.fullPath}});break;default:$.$message.error(O[n]||t.body)}}})})},82:function(t,e){},83:function(t,e){},84:function(t,e){},95:function(t,e){},99:function(t,e){},181:function(t,e,n){"use strict";var a=n(183);e.datetime=function(t){if(t){var e=new Date(t);t=(0,a.dateFormat)(e,"yyyy-MM-dd hh:mm")}return t},e.html2text=function(t){return t&&(t=t.replace(/<[^>]*>/g,"")),t},e.substr=function(t,e,n){return t&&(t=t.substr(e,n)),t},e.maxlength=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return t&&t.length>e&&(t=t.substr(0,e),n&&(t+="...")),t},e.number=function(t){return parseInt(t)}},182:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={authorization:!1};e.default=[{path:"/login",name:"login",meta:a,component:function(t){return n.e(7,function(e){var n=[e(205)];t.apply(null,n)}.bind(this))}},{path:"/",name:"index",redirect:{name:"article"},component:function(t){return n.e(4,function(e){var n=[e(204)];t.apply(null,n)}.bind(this))},children:[{path:"no-page/:message",name:"no-page",title:"",meta:a,component:function(t){return n.e(6,function(e){var n=[e(206)];t.apply(null,n)}.bind(this))}},{path:"article",name:"article",component:function(t){return n.e(0,function(e){var n=[e(201)];t.apply(null,n)}.bind(this))}},{path:"catalog",name:"catalog",component:function(t){return n.e(1,function(e){var n=[e(203)];t.apply(null,n)}.bind(this))}},{path:"tag",name:"tag",component:function(t){return n.e(2,function(e){var n=[e(211)];t.apply(null,n)}.bind(this))}},{path:"pageview",name:"pageview",component:function(t){return n.e(5,function(e){var n=[e(207)];t.apply(null,n)}.bind(this))}},{path:"setting",name:"setting",component:function(t){return n.e(3,function(e){var n=[e(209)];t.apply(null,n)}.bind(this))}}]}]},183:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}var u=n(59),o=a(u);e.dateFormat=function(t,e){var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};return/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),(0,o.default)(n).forEach(function(t){new RegExp("("+t+")").test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?n[t]:("00"+n[t]).substr((""+n[t]).length)))}),e}},185:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var u=n(180),o=a(u),r=n(10),i=a(r),l=n(138),s=a(l);i.default.use(s.default);var c=window.localStorage;e.default=new s.default.Store({state:{user:{},login:!1,token:""},mutations:{LOGIN:function(t,e){var n=e.user,a=e.token;t.user=n,t.login=!0,t.token=a,c.setItem("token",a)},LOGOUT:function(t){t.login=!1,t.token="",c.clear()}},actions:{logout:function(t){var e=t.commit,n=t.state;if(e("LOGOUT"),n.token)return i.default.http.get("user/logout/"+n.token).then(function(t,e){console.log(t,e)})},login:function(t){var e=t.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c.getItem("token");return new o.default(function(t,a){n?i.default.http.get("user/"+n).then(function(a){var u=a.data,o=u;return e("LOGIN",{user:o,token:n}),t(o),o}).catch(function(t){a(t)}):a("no token")})}}})},186:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},199:function(t,e,n){var a,u;n(95),a=n(186);var o=n(221);u=a=a||{},"object"!=typeof a.default&&"function"!=typeof a.default||(u=a=a.default),"function"==typeof u&&(u=u.options),u.render=o.render,u.staticRenderFns=o.staticRenderFns,t.exports=a},221:function(t,e){t.exports={render:function(){var t=this;return t._h("div",{attrs:{id:"app"}},[t._h("router-view")])},staticRenderFns:[]}}});
//# sourceMappingURL=app.fd9d8e71a3e3f563ef5a.js.map