export default {
  install (Vue, options) {
	  //测试
    Vue.prototype.$toTop = function () {
      console.log('Plugin Test')
    }
	//console
	Vue.prototype.$log = function (res) {
	  console.log(res)
	}
	//title
	Vue.prototype.$title = function (res) {
	  uni.showToast({
	  	title: res,
	  	icon: "none"
	  })
	  return false
	}
  }
}