(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mgou-buy-ProductDetails"],{"1a79":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={data:function(){return{asd:"1000000000184812",data:{},shulinag:1,ProductId:"",PartyA:!1,productCodce:"",CustomerId:this.$store.state.CusId,footer:!0,dsfdfsd:0}},onLoad:function(t){t.code?(this.productCodce=t.code,this.$store.state.productCodce=t.code):this.productCodce=this.$store.state.productCodce},onBackPress:function(){return uni.navigateTo({url:"./drawings"}),!0},mounted:function(){var t=this,i={url:this.$store.state.url+"Product/GetProductMini",method:"GET",header:this.$store.state.token,data:{productCodce:this.$store.state.buyids||this.productCodce}};this.$http(i).then((function(i){t.data=i.Data}))},methods:{alls:function(){this.PartyA=!this.PartyA},jia:function(){this.shulinag+=1},jian:function(){1==this.shulinag?uni.showToast({title:"商品数量最少为 1",icon:"none"}):this.shulinag-=1},Cart:function(){uni.navigateTo({url:"./ShoppingCart"})},joinCart:function(){var t={url:this.$store.state.url+"CRM/AddToShopCar",method:"POST",header:this.$store.state.token,data:{CustomerId:this.CustomerId,ProductId:this.data.ProductId,Number:this.shulinag,IsAssembly:this.PartyA}};this.$http(t).then((function(t){uni.showToast({title:"成功加入购物车",icon:"none"})}))},buy:function(){if(1==this.dsfdfsd)return!1;this.dsfdfsd=1;var t={};this.$store.state.Buy=[],t.mani=this.data.UnitPrice,t.title=this.data.Describe,t.ProductId=this.data.ProductId,t.Number=this.shulinag,t.IsAssembly=this.PartyA,this.$store.state.Buy[0]=t,uni.navigateTo({url:"./buy"})}}};i.default=a},2271:function(t,i,e){"use strict";var a=e("2c05"),o=e.n(a);o.a},"2c05":function(t,i,e){var a=e("62f4");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=e("4f06").default;o("0f237156",a,!0,{sourceMap:!1,shadowMode:!1})},"5abb":function(t,i,e){t.exports=e.p+"static/img/shao.0e973482.png"},"62f4":function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.head[data-v-d33b27b2]{width:100%;height:200px;overflow:hidden;background-color:#fff}.head uni-image[data-v-d33b27b2]{width:100px;height:100px;display:block;margin:50px auto;-webkit-box-sizing:border-box;box-sizing:border-box}.add[data-v-d33b27b2]{width:100%;height:150px;background:#57dddd;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box}.add uni-text[data-v-d33b27b2]{display:block}.add .Describe[data-v-d33b27b2]{font-weight:700;font-size:16px;margin-bottom:15px}.add .UnitPrice[data-v-d33b27b2]{color:red;font-size:14px}.add .UnitPrice span[data-v-d33b27b2]{font-size:20px}.add .AssemblyUnitPrice[data-v-d33b27b2]{float:right}.add .AssemblyUnitPrice span[data-v-d33b27b2]{color:red;font-size:20px;margin-right:10px}.add .Branch[data-v-d33b27b2]{font-weight:700;margin-top:10px}.gou[data-v-d33b27b2]{width:100%;height:50px;position:fixed;bottom:0;left:0;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box}.gou uni-view[data-v-d33b27b2]{width:30%;float:right;height:100%;text-align:center;line-height:30px;font-size:12px;color:#fff}.gou .gous[data-v-d33b27b2]{background-color:#f5c443;-webkit-border-radius:30px 0 0 30px;border-radius:30px 0 0 30px}.gou .buy[data-v-d33b27b2]{background:#ec682c;-webkit-border-radius:0 30px 30px 0;border-radius:0 30px 30px 0}.gou .icon[data-v-d33b27b2]{width:40px;height:50px;float:left;margin-left:50px;background-color:#007aff}.gou .icon uni-image[data-v-d33b27b2]{width:20px;height:20px;display:block}.gou .icon uni-text[data-v-d33b27b2]{font-size:14px}.footer[data-v-d33b27b2]{position:fixed;bottom:%?0?%;width:92%;padding:0 4%;height:%?99?%;border-top:solid %?1?% #eee;background-color:#fff;z-index:2;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.footer .icons[data-v-d33b27b2]{display:-webkit-box;display:-webkit-flex;display:flex;height:%?80?%;margin-left:-4%}.footer .icons .boxx[data-v-d33b27b2]{width:%?80?%;height:%?80?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-flex-wrap:wrap;flex-wrap:wrap;margin-left:30px}.footer .icons .boxx .icon[data-v-d33b27b2]{width:20px;height:20px;font-size:%?40?%;color:#828282}.footer .icons .boxx .icon uni-image[data-v-d33b27b2]{width:100%;height:100%}.footer .icons .boxx .text[data-v-d33b27b2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:100%;font-size:%?22?%;color:#666}.footer .btn[data-v-d33b27b2]{height:%?80?%;-webkit-border-radius:%?40?%;border-radius:%?40?%;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:flex;margin-right:-2%}.footer .btn .joinCart[data-v-d33b27b2],\r\n.footer .btn .buy[data-v-d33b27b2]{height:%?80?%;padding:0 %?40?%;color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?28?%}.footer .btn .joinCart[data-v-d33b27b2]{background-color:#dd524d}.footer .btn .buy[data-v-d33b27b2]{background-color:#f0ad4e}.info-box[data-v-d33b27b2]{width:92%;padding:%?20?% 4%;background-color:#fff;margin-bottom:%?20?%}.goods-info .price[data-v-d33b27b2]{font-size:%?46?%;font-weight:600;color:#dd524d}.goods-info .title[data-v-d33b27b2]{font-size:%?30?%}.kongbai[data-v-d33b27b2]{width:95%;background-color:#d8d8d8;height:40px;padding:0 15px;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-border-radius:10px;border-radius:10px;margin:auto;margin-bottom:10px}.kongbai uni-view[data-v-d33b27b2]{height:40px;line-height:40px;float:left;display:block;font-weight:700}.kongbai .chu[data-v-d33b27b2]{width:120px;height:30px;float:right;margin-top:5px;height:30px}.kongbai .chu uni-view[data-v-d33b27b2]{width:50%;float:right;color:#333;text-align:center;line-height:30px;background:#fff;height:30px}.kongbai .chu .left[data-v-d33b27b2]{-webkit-border-radius:30px 0 0 30px;border-radius:30px 0 0 30px}.kongbai .chu .right[data-v-d33b27b2]{-webkit-border-radius:0 30px 30px 0;border-radius:0 30px 30px 0}.kongbai .chuchu[data-v-d33b27b2]{background-color:#fff;-webkit-border-radius:30px;border-radius:30px}.kongbai .chuchu uni-checkbox-group[data-v-d33b27b2]{width:32px;height:67px;display:block;margin:auto;border:none}.kongbai .chuchu uni-checkbox .uni-checkbox-input[data-v-d33b27b2]{border:none}',""]),t.exports=i},"7b35":function(t,i,e){"use strict";var a;e.d(i,"b",(function(){return o})),e.d(i,"c",(function(){return n})),e.d(i,"a",(function(){return a}));var o=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",{staticClass:"box"},[a("v-uni-view",{staticClass:"head"},[a("v-uni-image",{attrs:{src:e("925f"),mode:""}})],1),a("v-uni-view",{staticClass:"info-box goods-info"},[a("v-uni-view",{staticClass:"price"},[t._v("￥"+t._s(t.data.UnitPrice))]),a("v-uni-view",{staticClass:"title"},[t._v(t._s(t.data.Describe))])],1),a("v-uni-view",{staticClass:"kongbai"},[a("v-uni-view",[t._v("数量：")]),a("v-uni-view",[t._v(t._s(t.shulinag))]),a("v-uni-view",{staticClass:"chu"},[a("v-uni-view",{staticClass:"right",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.jia.apply(void 0,arguments)}}},[t._v("+")]),a("v-uni-view",{staticClass:"left",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.jian.apply(void 0,arguments)}}},[t._v("-")])],1)],1),a("v-uni-view",{staticClass:"kongbai"},[a("v-uni-view",[t._v("甲方安装")]),a("v-uni-view",{staticClass:"chu chuchu",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.alls.apply(void 0,arguments)}}},[a("v-uni-checkbox-group",{staticStyle:{transform:"scale(1.5)"}},[a("v-uni-label",[a("v-uni-checkbox",{staticStyle:{transform:"scale(0.7)"},attrs:{checked:t.PartyA}})],1)],1)],1)],1),t.footer?a("v-uni-view",{staticClass:"footer"},[a("v-uni-view",{staticClass:"icons"},[a("v-uni-view",{staticClass:"boxx",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.Cart.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"icon fenxiang"},[a("v-uni-image",{attrs:{src:e("5abb"),mode:""}})],1),a("v-uni-view",{staticClass:"text"},[t._v("购物车")])],1)],1),a("v-uni-view",{staticClass:"btn"},[a("v-uni-view",{staticClass:"joinCart",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.joinCart.apply(void 0,arguments)}}},[t._v("加入购物车")]),a("v-uni-view",{staticClass:"buy",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.buy.apply(void 0,arguments)}}},[t._v("立即购买")])],1)],1):t._e()],1)},n=[]},"925f":function(t,i,e){t.exports=e.p+"static/img/zhi.edf95dac.png"},b4ce:function(t,i,e){"use strict";e.r(i);var a=e("1a79"),o=e.n(a);for(var n in a)"default"!==n&&function(t){e.d(i,t,(function(){return a[t]}))}(n);i["default"]=o.a},c770:function(t,i,e){"use strict";e.r(i);var a=e("7b35"),o=e("b4ce");for(var n in o)"default"!==n&&function(t){e.d(i,t,(function(){return o[t]}))}(n);e("2271");var d,r=e("f0c5"),s=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,"d33b27b2",null,!1,a["a"],d);i["default"]=s.exports}}]);