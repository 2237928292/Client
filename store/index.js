import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		Pros:{},
		vn:'3.0.4',
		token:'',//············································      身份信息
		appid:'com.tx.yzj',
		Vips:'',//···························································    VIP
		CusId:'',//````````````````````````````````````````````````````````		CusId
		Userid:'',//
		Name:'',//```````````````````````````````````````````````````````        客户名称		
		inchwell1:'',
		Updata:true,
		url:'http://webapi.inchwell.com.cn/api/',	//  ·············接口头部
		httpurl:'http://webapi.inchwell.com.cn', 	//  ··············外部路径
		httpimgs:'http://webapi.inchwell.com.cn',	// ··············零配件  九图  链接头部
		
		
		// url:'http://39.101.201.199:6001/api/',		//  ·············接口头部
		// httpurl:'http://39.101.201.199:6001',		//  ··············外部路径
		// httpimgs:'http://39.101.201.199:6001',		// ··············零配件  九图  链接头部
		
		sparePartsReclassifys:[],//商品列表
		NinedetailsHTML:'',//大图地址
		productCodce:'',//当前查看商品编码
		Contactperson:{},//切换联系人
		
		RequestType:2,//保修方式   App 传2 扫码 传1
		OKAdWarrantyproitem:{Name:''},//保修切换联系人
		CarHomeCode:false,//购物车跳转付款页
		Grade:'',//保修型号信息
		imgList:[],//图片Base64集合
		VideoBlobList:[],//视频Blob集合
		VideoBase64List:[],//视频Blob集合
		Faultdescription:'',//故障描述
		detailed:'',//获取保修的详细信息的ID
		
		Sxolde:false,//扫码的标志变量   在退出保修是为false
		CodeTwo:'',//二维码信息
		
		clickindex:{},//查看设备详情信息
		miniClick:{},//查看订单信息
		States: false,//查看信息的状态
		
		mePromes:{},//查看客户联系人
		RepairCosts:[{},{}],//审核报价的数据
		
		results:[],//确认借用清单
		
		resultsCodeQR:false,//扫码或选择进入
		
		QRdataMsg:'',//ICMS.获取工具借用记录详情
		
		
		up_img_Video:'',//记录故障描述，事后清除
		textVideo:[],//
		
		
		shoppingCartproitem:{},// 借用工具的联系人
		
		
		
		
		
		
		shoppingCart:[],// 借用   购物车
		shoppingID:'',// 查看借用记录详情ID
		
	},
    mutations: {},
    actions: {},
	
})
export default store