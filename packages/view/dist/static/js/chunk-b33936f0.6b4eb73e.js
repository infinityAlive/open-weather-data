(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b33936f0"],{"0390":function(e,t,r){"use strict";var n=r("02f4")(!0);e.exports=function(e,t,r){return t+(r?n(e,t).length:1)}},"0798":function(e,t,r){"use strict";var n=r("4ee0"),a=r.n(n);a.a},"0bfb":function(e,t,r){"use strict";var n=r("cb7c");e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},"214f":function(e,t,r){"use strict";r("b0c5");var n=r("2aba"),a=r("32e9"),o=r("79e5"),i=r("be13"),c=r("2b4c"),s=r("520a"),u=c("species"),l=!o(function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}),f=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2===r.length&&"a"===r[0]&&"b"===r[1]}();e.exports=function(e,t,r){var p=c(e),d=!o(function(){var t={};return t[p]=function(){return 7},7!=""[e](t)}),g=d?!o(function(){var t=!1,r=/a/;return r.exec=function(){return t=!0,null},"split"===e&&(r.constructor={},r.constructor[u]=function(){return r}),r[p](""),!t}):void 0;if(!d||!g||"replace"===e&&!l||"split"===e&&!f){var v=/./[p],h=r(i,p,""[e],function(e,t,r,n,a){return t.exec===s?d&&!a?{done:!0,value:v.call(t,r,n)}:{done:!0,value:e.call(r,t,n)}:{done:!1}}),x=h[0],m=h[1];n(String.prototype,e,x),a(RegExp.prototype,p,2==t?function(e,t){return m.call(e,this,t)}:function(e){return m.call(e,this)})}}},"4ee0":function(e,t,r){},"520a":function(e,t,r){"use strict";var n=r("0bfb"),a=RegExp.prototype.exec,o=String.prototype.replace,i=a,c="lastIndex",s=function(){var e=/a/,t=/b*/g;return a.call(e,"a"),a.call(t,"a"),0!==e[c]||0!==t[c]}(),u=void 0!==/()??/.exec("")[1],l=s||u;l&&(i=function(e){var t,r,i,l,f=this;return u&&(r=new RegExp("^"+f.source+"$(?!\\s)",n.call(f))),s&&(t=f[c]),i=a.call(f,e),s&&i&&(f[c]=f.global?i.index+i[0].length:t),u&&i&&i.length>1&&o.call(i[0],r,function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(i[l]=void 0)}),i}),e.exports=i},"5f1b":function(e,t,r){"use strict";var n=r("23c6"),a=RegExp.prototype.exec;e.exports=function(e,t){var r=e.exec;if("function"===typeof r){var o=r.call(e,t);if("object"!==typeof o)throw new TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==n(e))throw new TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},"73cf":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",[r("header",{staticClass:"header"},[e._v("註冊帳號")]),r("mu-flex",{staticClass:"margin-top",attrs:{"justify-content":"center"}},[r("mu-form",{ref:"register",staticClass:"login-block",attrs:{model:e.registerInfo}},[r("mu-form-item",{attrs:{label:"帳號",prop:"account",rules:e.accountRules}},[r("mu-text-field",{attrs:{prop:"account"},model:{value:e.registerInfo.account,callback:function(t){e.$set(e.registerInfo,"account",t)},expression:"registerInfo.account"}})],1),r("mu-form-item",{attrs:{label:"密碼",prop:"password",rules:e.passwordRules}},[r("mu-text-field",{attrs:{type:"password",prop:"password"},model:{value:e.registerInfo.password,callback:function(t){e.$set(e.registerInfo,"password",t)},expression:"registerInfo.password"}})],1),r("mu-form-item",[r("mu-button",{attrs:{color:"primary"},on:{click:e.register}},[e._v("確認註冊")])],1)],1)],1),r("mu-flex",{staticClass:"margin-top",attrs:{"justify-content":"center"}},[r("mu-circular-progress",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}],attrs:{"stroke-width":5,size:50}})],1)],1)},a=[],o=(r("a481"),r("96cf"),r("3b8d")),i=r("903d"),c={name:"Register",data:function(){return{isLoading:!1,registerInfo:{account:"",password:""},accountRules:[{validate:function(e){return!!e},message:"帳號不能為空值"},{validate:function(e){return e.length>=3},message:"帳號必須大於 2 個字元"}],passwordRules:[{validate:function(e){return!!e},message:"密碼不能為空值"},{validate:function(e){return e.length>=3&&e.length<=10},message:"密碼長度介於 3 ~ 10 字元"}]}},methods:{register:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){var t,r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,t.isLoading=!0,e.next=4,t.$refs.register.validate();case 4:if(r=e.sent,!0!==r){e.next=11;break}return e.next=8,t.$axios({method:"post",url:"http://localhost:8080/api/register",data:{account:t.registerInfo.account,password:t.registerInfo.password}});case 8:n=e.sent,t.isLoading=!1,t.$modal.show({text:"".concat(i["b"].get(n.data),"，返回登入頁"),onOk:function(){t.$router.replace({name:"Auth"})}});case 11:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}},s=c,u=(r("0798"),r("2877")),l=Object(u["a"])(s,n,a,!1,null,null,null);t["default"]=l.exports},a481:function(e,t,r){"use strict";var n=r("cb7c"),a=r("4bf8"),o=r("9def"),i=r("4588"),c=r("0390"),s=r("5f1b"),u=Math.max,l=Math.min,f=Math.floor,p=/\$([$&`']|\d\d?|<[^>]*>)/g,d=/\$([$&`']|\d\d?)/g,g=function(e){return void 0===e?e:String(e)};r("214f")("replace",2,function(e,t,r,v){return[function(n,a){var o=e(this),i=void 0==n?void 0:n[t];return void 0!==i?i.call(n,o,a):r.call(String(o),n,a)},function(e,t){var a=v(r,e,this,t);if(a.done)return a.value;var f=n(e),p=String(this),d="function"===typeof t;d||(t=String(t));var x=f.global;if(x){var m=f.unicode;f.lastIndex=0}var b=[];while(1){var w=s(f,p);if(null===w)break;if(b.push(w),!x)break;var y=String(w[0]);""===y&&(f.lastIndex=c(p,o(f.lastIndex),m))}for(var k="",R=0,$=0;$<b.length;$++){w=b[$];for(var I=String(w[0]),E=u(l(i(w.index),p.length),0),S=[],j=1;j<w.length;j++)S.push(g(w[j]));var C=w.groups;if(d){var L=[I].concat(S,E,p);void 0!==C&&L.push(C);var A=String(t.apply(void 0,L))}else A=h(I,p,E,S,C,t);E>=R&&(k+=p.slice(R,E)+A,R=E+I.length)}return k+p.slice(R)}];function h(e,t,n,o,i,c){var s=n+e.length,u=o.length,l=d;return void 0!==i&&(i=a(i),l=p),r.call(c,l,function(r,a){var c;switch(a.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,n);case"'":return t.slice(s);case"<":c=i[a.slice(1,-1)];break;default:var l=+a;if(0===l)return r;if(l>u){var p=f(l/10);return 0===p?r:p<=u?void 0===o[p-1]?a.charAt(1):o[p-1]+a.charAt(1):r}c=o[l-1]}return void 0===c?"":c})}})},b0c5:function(e,t,r){"use strict";var n=r("520a");r("5ca1")({target:"RegExp",proto:!0,forced:n!==/./.exec},{exec:n})}}]);
//# sourceMappingURL=chunk-b33936f0.6b4eb73e.js.map