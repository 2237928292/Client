(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-work-Contactperson-Contactperson"],{"0dec":function(t,n,o){var i=o("d297");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var e=o("4f06").default;e("29d3e9b0",i,!0,{sourceMap:!1,shadowMode:!1})},"2ef9":function(t,n,o){"use strict";o.r(n);var i=o("f3a2"),e=o("8c42");for(var r in e)"default"!==r&&function(t){o.d(n,t,(function(){return e[t]}))}(r);o("58c7");var a,s=o("f0c5"),c=Object(s["a"])(e["default"],i["b"],i["c"],!1,null,"71d3a914",null,!1,i["a"],a);n["default"]=c.exports},"58c7":function(t,n,o){"use strict";var i=o("0dec"),e=o.n(i);e.a},"7d5c":function(t,n,o){t.exports=o.p+"static/img/iphone.527fbd79.png"},"86cb":function(t,n,o){t.exports=o.p+"static/img/iphones.cf09cfec.png"},"8c42":function(t,n,o){"use strict";o.r(n);var i=o("fad6"),e=o.n(i);for(var r in i)"default"!==r&&function(t){o.d(n,t,(function(){return i[t]}))}(r);n["default"]=e.a},d297:function(t,n,o){var i=o("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.box .Pros[data-v-71d3a914]{width:100%;height:70px;background-color:#fff;border-bottom:2px solid #e3e2e2;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 20px;box-sizing:border-box}.box .Pros .Pros_Top[data-v-71d3a914]{width:100%;height:38px;line-height:30px;font-weight:700}.box .Pros .Pros_Top .right[data-v-71d3a914]{float:right}.box .Pros .Pros_Bottom[data-v-71d3a914]{width:100%;height:40%;color:#989898}.box .Pros .Pros_Bottom uni-view[data-v-71d3a914]{width:50%;float:left;height:100%;color:#007aff;font-weight:700;text-align:right}.box .Pros .Pros_Bottom uni-view uni-image[data-v-71d3a914]{width:25px;height:25px}',""]),t.exports=n},f3a2:function(t,n,o){"use strict";var i;o.d(n,"b",(function(){return e})),o.d(n,"c",(function(){return r})),o.d(n,"a",(function(){return i}));var e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",{staticClass:"box"},t._l(t.Dtos,(function(n,e){return i("v-uni-view",{key:e,staticClass:"Pros"},[i("v-uni-view",{staticClass:"Pros_Top"},[i("v-uni-text",[t._v(t._s(n.Name+"( "+n.Role+" )"))])],1),i("v-uni-view",{staticClass:"Pros_Bottom"},[i("v-uni-view",{staticClass:"Left",on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.Call(n.Tel.split(";")[0])}}},[t._v(t._s(n.Tel.split(";")[0])),i("v-uni-image",{attrs:{src:o("7d5c"),mode:""}})],1),i("v-uni-view",{staticClass:"Right",on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.Call(n.Tel.split(";")[1])}}},[t._v(t._s(n.Tel.split(";")[1])),i("v-uni-image",{attrs:{src:o("86cb"),mode:""}})],1)],1)],1)})),1)},r=[]},fad6:function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{Dtos:[]}},created:function(){this.init()},methods:{init:function(){var t=this,n={url:this.$store.state.url+"System/GetInchwellLinkman",method:"GET",header:this.$store.state.token};this.$http(n).then((function(n){console.log(n.Data.Dtos),t.Dtos=n.Data.Dtos}))},Call:function(t){uni.makePhoneCall({phoneNumber:t})}}};n.default=i}}]);