import Vue from 'vue'
import App from './App'

import uView from "uview-ui";
Vue.use(uView);

// 插件
import ToTop from './store/function.js' // 引入
Vue.use(ToTop) // 添加

import httpno from 'store/unihttpnone.js'
Vue.prototype.$httpno = httpno

import http from 'store/unihttp.js'
Vue.prototype.$http = http

//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false


// import NutUI from './store/nutui.js';
// import './store/nutui.css';

// NutUI.install(Vue);





App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
