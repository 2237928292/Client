(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-work-Warranty-Warranty"],{"0107":function(t,e,a){var s=a("24fb");e=s(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.box[data-v-37a14ec4]{background-color:#fff}.box .InputIcon[data-v-37a14ec4]{width:calc(100% - 130px)}.box .AssemblyUnitPriceIcon[data-v-37a14ec4]{width:16px;height:16px;float:right;position:absolute;top:0;bottom:0;right:10px;margin:auto}.box .bots[data-v-37a14ec4]{margin-bottom:20px}.box .botss[data-v-37a14ec4]{border-bottom:1px solid silver}.box .BeiZhu[data-v-37a14ec4]{width:100%;height:40px;line-height:40px;font-size:14px;font-weight:700;padding-left:15px;-webkit-box-sizing:border-box;box-sizing:border-box}',""]),t.exports=e},"0588":function(t,e,a){"use strict";a.r(e);var s=a("7560"),i=a.n(s);for(var r in s)"default"!==r&&function(t){a.d(e,t,(function(){return s[t]}))}(r);e["default"]=i.a},"6b06":function(t,e,a){var s=a("0107");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var i=a("4f06").default;i("7195c465",s,!0,{sourceMap:!1,shadowMode:!1})},7560:function(t,e,a){"use strict";a("ac1f"),a("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{WarrantData:{Name:"",NameEn:"",Mobile:"",Tel:"",Address:"",Email:""},DeviceInformation:"",DeviceInformationID:"",Faultdescription:"",textarea:"",Antishake1:!0,Antishake2:!0,Video:0}},onShow:function(){this.OKAdWarrantyproitem(),this.$store.state.Sxolde&&this.init()},onBackPress:function(){return this.Clear(),uni.switchTab({url:"../../home"}),this.$store.state.Sxolde=!1,!0},onNavigationBarButtonTap:function(){var t=this,e=this.$store.state.OKAdWarrantyproitem;if(""==e.CustomerId)return this.showToast("请选择报修人"),!1;if(""==e.NameEn)return this.showToast("请输入客户英文名"),!1;if(e.Mobile.split(" ").length>1&&(e.Mobile=e.Mobile.split(" ")[0]+e.Mobile.split(" ")[1]+e.Mobile.split(" ")[2]),!/^[0-9]{11}$/.test(e.Mobile))return this.showToast("手机号格式不正确"),!1;if(""==e.Address)return this.showToast("请输入地址"),!1;if(""==this.DeviceInformation)return this.showToast("请选择设备"),!1;if(""==this.$store.state.Faultdescription)return this.showToast("请输入故障描述"),!1;if(!this.Antishake1)return!1;if(!this.Antishake2)return!1;this.Antishake1=!1,this.Antishake2=!1;var a={url:this.$store.state.url+"WO/CusApplyRepair",method:"POST",header:this.$store.state.token,data:{CustomerId:this.$store.state.CusId,RepairName:e.Name,RepairNameEn:e.NameEn,MobilePhone:e.Mobile,Tel:e.Tel,Email:e.Email,AddressDetail:e.Address,DeviceId:this.DeviceInformationID,FaultDescription:this.$store.state.Faultdescription,CustomerRemark:this.textarea,RequestType:this.$store.state.RequestType}};this.$http(a).then((function(e){t.UpImgData(e)}))},methods:{init:function(){var t=this,e={url:this.$store.state.url+"WO/GetRepairInfo",method:"GET",header:this.$store.state.token,data:{inchwellCode:this.$store.state.CodeTwo}};this.$http(e).then((function(e){t.$store.state.OKAdWarrantyproitem=e.Data.RepairManInfo,t.$store.state.Grade=JSON.stringify(e.Data.CustomerEquDto),t.OKAdWarrantyproitem()}))},UpImgData:function(t){var e=t,a=this.$store.state.imgList;if(0==t.Code&&a!=[])for(var s=0;s<a.length;s++){var i={url:this.$store.state.url+"WO/UploadRepairImage",method:"POST",header:this.$store.state.token,data:{Id:t.Data,FileStr:a[s],Type:1}};this.$http(i).then((function(t){}))}this.VideoUp(e)},VideoUp:function(t){var e=this;if(0!=this.$store.state.VideoBase64List.length)for(var a=0;a<this.$store.state.VideoBase64List.length;a++){var s={url:this.$store.state.url+"WO/UploadRepairImage",method:"POST",header:this.$store.state.token,data:{Id:t.Data,FileStr:this.$store.state.VideoBase64List[a],Type:2}};this.$http(s).then((function(t){e.Video+=1,e.Video==e.$store.state.VideoBase64List.length&&(uni.navigateTo({url:"../Ordermanagement/Ordermanagement?Code=1"}),e.Clear())}))}this.Clear(),uni.navigateTo({url:"../Ordermanagement/Ordermanagement?Code=1"})},showToast:function(t){uni.showToast({title:t,icon:"none"})},AdWarrantypro:function(){uni.navigateTo({url:"/pages/home/work/Warranty/AdWarrantypro/AdWarrantypro"})},DeviceIn:function(){uni.navigateTo({url:"/pages/home/work/Warranty/DeviceIn/DeviceIn"})},Faultdescr:function(){uni.navigateTo({url:"/pages/home/work/Warranty/Faultdescr/Faultdescr"})},OKAdWarrantyproitem:function(){var t=this.$store.state.OKAdWarrantyproitem;if("Name"!=t.Name&&(this.WarrantData=t),""!=this.$store.state.Grade){var e=JSON.parse(this.$store.state.Grade);console.log(e.Id+"型号id"),this.DeviceInformation="["+e.SN+"]"+e.Desc,this.DeviceInformationID=e.Id}this.Faultdescription=this.$store.state.Faultdescription,console.log(this.Faultdescription)},Clear:function(){this.$store.state.OKAdWarrantyproitem={},this.$store.state.imgList=[],this.$store.state.Faultdescription="",this.$store.state.Grade="",this.$store.state.VideoBlobList=[],this.$store.state.VideoBase64List=[],this.$store.state.up_img_Video=""}}};e.default=s},"7c85":function(t,e,a){"use strict";var s;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return s}));var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-uni-view",{staticClass:"box"},[s("v-uni-view",{staticClass:"cu-form-group"},[s("v-uni-view",{staticClass:"title"},[t._v("报修人")]),s("v-uni-input",{staticClass:"InputIcon",attrs:{type:"text",value:""},model:{value:t.WarrantData.Name,callback:function(e){t.$set(t.WarrantData,"Name",e)},expression:"WarrantData.Name"}}),s("v-uni-image",{staticClass:"AssemblyUnitPriceIcon",attrs:{src:a("8f62"),mode:""},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.AdWarrantypro.apply(void 0,arguments)}}})],1),s("v-uni-view",{staticClass:"cu-form-group",staticStyle:{paddingTop:"20px"}},[s("v-uni-view",{staticClass:"title bots"},[t._v("英文姓名")]),s("v-uni-input",{staticClass:"bots botss",attrs:{type:"text",value:""},model:{value:t.WarrantData.NameEn,callback:function(e){t.$set(t.WarrantData,"NameEn",e)},expression:"WarrantData.NameEn"}}),s("v-uni-view",{staticClass:"title bots"},[t._v("手机号码")]),s("v-uni-input",{staticClass:"bots botss",attrs:{type:"text",value:""},model:{value:t.WarrantData.Mobile,callback:function(e){t.$set(t.WarrantData,"Mobile",e)},expression:"WarrantData.Mobile"}}),s("v-uni-view",{staticClass:"title bots"},[t._v("固定电话")]),s("v-uni-input",{staticClass:"bots botss",attrs:{type:"text",value:""},model:{value:t.WarrantData.Tel,callback:function(e){t.$set(t.WarrantData,"Tel",e)},expression:"WarrantData.Tel"}}),s("v-uni-view",{staticClass:"title bots"},[t._v("电子邮箱")]),s("v-uni-input",{staticClass:"bots botss",attrs:{type:"text",value:""},model:{value:t.WarrantData.Email,callback:function(e){t.$set(t.WarrantData,"Email",e)},expression:"WarrantData.Email"}}),s("v-uni-view",{staticClass:"title "},[t._v("详细地址")]),s("v-uni-input",{staticClass:"botss",attrs:{type:"text",value:""},model:{value:t.WarrantData.Address,callback:function(e){t.$set(t.WarrantData,"Address",e)},expression:"WarrantData.Address"}})],1),s("v-uni-view",{staticClass:"cu-form-group"},[s("v-uni-view",{staticClass:"top"},[s("v-uni-view",{staticClass:"title"},[t._v("设备信息")]),s("v-uni-input",{staticClass:"bots InputIcon",staticStyle:{color:"#333333"},attrs:{type:"text",value:"",placeholder:"选择",disabled:!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.DeviceIn()}},model:{value:t.DeviceInformation,callback:function(e){t.DeviceInformation=e},expression:"DeviceInformation"}})],1),s("v-uni-view",{staticClass:"top"},[s("v-uni-view",{staticClass:"title "},[t._v("故障描述")]),s("v-uni-input",{staticClass:"InputIcon",staticStyle:{color:"#333333"},attrs:{type:"text",value:"",placeholder:"选择",disabled:!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.Faultdescr()}},model:{value:this.$store.state.Faultdescription,callback:function(e){t.$set(this.$store.state,"Faultdescription",e)},expression:"this.$store.state.Faultdescription"}})],1)],1),s("v-uni-view",{staticClass:"BeiZhu"},[t._v("备注:")]),s("v-uni-view",{staticClass:"cu-form-group"},[s("v-uni-textarea",{attrs:{name:"",id:"",cols:"30",rows:"10","auto-height":!0},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}})],1)],1)},r=[]},"7eaf":function(t,e,a){"use strict";var s=a("6b06"),i=a.n(s);i.a},"8f62":function(t,e,a){t.exports=a.p+"static/img/fangdajing.7cd81e97.png"},c1ee:function(t,e,a){"use strict";a.r(e);var s=a("7c85"),i=a("0588");for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);a("7eaf");var n,o=a("f0c5"),l=Object(o["a"])(i["default"],s["b"],s["c"],!1,null,"37a14ec4",null,!1,s["a"],n);e["default"]=l.exports}}]);