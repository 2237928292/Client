(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-work-Warranty-DeviceIn-DeviceIn"],{"12f5":function(e,t,a){var s=a("24fb");t=s(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.Amier[data-v-4dbecb5c]{font-size:12px}',""]),e.exports=t},"2e0c":function(e,t,a){"use strict";a.r(t);var s=a("e742"),i=a("c51b");for(var n in i)"default"!==n&&function(e){a.d(t,e,(function(){return i[e]}))}(n);a("ae4e");var r,o=a("f0c5"),u=Object(o["a"])(i["default"],s["b"],s["c"],!1,null,"4dbecb5c",null,!1,s["a"],r);t["default"]=u.exports},"5d6a":function(e,t,a){var s=a("12f5");"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var i=a("4f06").default;i("025aacea",s,!0,{sourceMap:!1,shadowMode:!1})},ae4e:function(e,t,a){"use strict";var s=a("5d6a"),i=a.n(s);i.a},b10b:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s={data:function(){return{Res:{},Daara:[],DtoOne:[],DtoOneText:"请选择",gradeOne:"",DtoTwo:[],gradeTwos:"请选择",gradeTwo:"",DtoThreeS:[],DtoThree:[],gradeThrees:"请选择",gradeThree:"",indexf:0,Dtos:[],gradef:"请选择",DeviceType:!1,TextlistS:!1,Textlist:"描述",Boss:"",DtoOneList:[{Id:"d470c23b-5c73-4ede-8771-c72da912c5ea",Value:"宝马"},{Id:"32ac7aba-cabc-44f8-933d-a786d5f6234c",Value:"保时捷"},{Id:"74a509f4-db3b-4940-b036-821ed3cddf19",Value:"奔驰"},{Id:"0f5695a9-2cef-4ae0-85e8-d7ff25dbc425",Value:"奥迪"},{Id:"4251fbe5-0b28-4152-8069-bbfd728ae8b5",Value:"路虎"}]}},onShow:function(){},created:function(){var e=this;uni.getStorage({key:"Pros",success:function(t){console.log(t.data),e.DtoOneText=t.data.Type;for(var a=0;a<e.DtoOneList.length;a++)e.DtoOneList[a].Value==e.DtoOneText&&(e.gradeOne=e.DtoOneList[a].Id)}}),e.DeviceInInit()},methods:{bindPickerChange:function(e){this.gradeOne=this.Res.DtoOne[e.target.value].Id,this.DtoOneText=this.DtoOne[e.target.value],this.GetCusEqus3ByDeviceType()},bindPickerChangeTwo:function(e){this.gradeTwo=this.Res.DtoTwo[e.target.value].Id,this.gradeTwos=this.DtoTwo[e.target.value],this.GetCusEqus3ByDeviceType()},bindPickerChangeThree:function(e){this.gradeThree=this.DtoThreeS[e.target.value].Id,this.gradeThrees=this.DtoThree[e.target.value],this.DataPackDeviceType()},bindPickerChangeGetCusEqusByDeviceType:function(e){this.TextlistS=!0,this.gradef="",this.Textlist="["+this.Daara[e.target.value].SN+"]"+this.Daara[e.target.value].Desc,this.Boss=JSON.stringify(this.Daara[e.target.value])},GetCusEqus3ByDeviceType:function(){var e=this;if(this.gradeThrees="请选择",this.TextlistS=!1,this.DeviceType=!1,this.gradeThree="","请选择"!=this.DtoOneText&&"请选择"!=this.gradeTwos){var t={url:this.$store.state.url+"CRM/GetCusEqus3ByDeviceType",method:"GET",header:this.$store.state.token,data:{gradeOne:this.gradeOne,gradeTwo:this.gradeTwo}};this.$http(t).then((function(t){if(0==t.Data.Dtos.length)return uni.showToast({title:"暂无当前产品",icon:"none"}),!1;e.DtoThree=[],e.DtoThreeS=t.Data.Dtos;for(var a=0;a<t.Data.Dtos.length;a++)e.DtoThree.push(t.Data.Dtos[a].Value)}))}},DeviceInInit:function(){var e=this,t={url:this.$store.state.url+"Product/GetProductType12",method:"GET",header:this.$store.state.token};this.$http(t).then((function(t){e.Res=t.Data,console.log(t.Data);for(var a=0;a<t.Data.DtoOne.length;a++)e.DtoOne.push(t.Data.DtoOne[a].Value);for(a=0;a<t.Data.DtoTwo.length;a++)e.DtoTwo.push(t.Data.DtoTwo[a].Value)}))},DataPackDeviceType:function(){var e=this;if(""==this.gradeOne||""==this.gradeTwo||""==this.gradeThree)return!1;this.Dtos=[],this.gradef="请选择",this.TextlistS=!1,this.Boss="";var t={url:this.$store.state.url+"CRM/GetCusEqus4ByDeviceType",method:"GET",header:this.$store.state.token,data:{gradeOne:this.gradeOne,gradeTwo:this.gradeTwo,gradeThree:this.gradeThree}};this.$http(t).then((function(t){e.Daara=t.Data.Dtos;for(var a=0;a<t.Data.Dtos.length;a++)e.Dtos.push(t.Data.Dtos[a].Desc);console.log(e.Dtos.length),0!=e.Dtos.length?e.DeviceType=!0:e.DeviceType=!1}))},onNavigationBarButtonTap:function(){this.Boss?(this.$store.state.Grade=this.Boss,uni.navigateTo({url:"../Warranty"})):uni.showToast({title:"请选择",icon:"none"})}}};t.default=s},c51b:function(e,t,a){"use strict";a.r(t);var s=a("b10b"),i=a.n(s);for(var n in s)"default"!==n&&function(e){a.d(t,e,(function(){return s[e]}))}(n);t["default"]=i.a},e742:function(e,t,a){"use strict";var s;a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return s}));var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"box"},[a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[e._v("车企品牌")]),a("v-uni-view",{staticClass:"uni-input"},[e._v(e._s(e.DtoOneText))])],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[e._v("设备种类")]),a("v-uni-picker",{attrs:{range:e.DtoTwo},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindPickerChangeTwo.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"uni-input"},[e._v(e._s(e.gradeTwos))])],1)],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[e._v("设备品牌")]),a("v-uni-picker",{attrs:{range:e.DtoThree},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindPickerChangeThree.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"uni-input"},[e._v(e._s(e.gradeThrees))])],1)],1),e.DeviceType?a("v-uni-view",{staticClass:"cu-form-group inputClass"},[a("v-uni-view",{staticClass:"title"},[e._v("型号")]),a("v-uni-picker",{attrs:{value:e.indexf,range:e.Dtos},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindPickerChangeGetCusEqusByDeviceType.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"uni-input"},[e._v(e._s(e.gradef||e.Dtos[e.indexf]))])],1)],1):e._e(),e.TextlistS?a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-textarea",{staticClass:"Amier",attrs:{name:"",id:"textarea",cols:"30",rows:"10","auto-height":!0},model:{value:e.Textlist,callback:function(t){e.Textlist=t},expression:"Textlist"}})],1):e._e()],1)},n=[]}}]);