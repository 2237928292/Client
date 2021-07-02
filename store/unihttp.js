const http = (obj) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中'
		});
		uni.request({
			url: obj.url,
			method: obj.method,
			header: {
				'Token': obj.header
			},
			data: obj.data,
			success: (res) => {
				var  COdeState = JSON.parse(res.data).Code
				 
				if (COdeState != 0) {
					uni.showToast({
						title: JSON.parse(res.data).Msg,
						icon: "none"
					})
					
					if (COdeState == 3) {
						uni.navigateTo({
							url: '/pages/Logo/Logo',
						});
						uni.hideLoading();
					}
					return false
				}
				resolve(JSON.parse(res.data))
				console.log(JSON.parse(res.data))
				setTimeout(function() {uni.hideLoading();}, 100);
			},
			fail: (err) => {
				console.log('err')
				reject(err)
				setTimeout(function() {uni.hideLoading();}, 100);
			},
			complete: () => {

			}
		})
	})
}

export default http
