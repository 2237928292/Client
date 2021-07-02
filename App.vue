<script>
	export default {
		onLaunch: function() {

			// #ifdef H5 
			console.log('运行在H5平台，停止获取定位')
			console.log(
				'H5控制台如果爆出警告：DevTools failed ··· ··· error: status code 404, net::ERR_HTTP_RESPONSE_CODE_FAILURE' +
				'\n' +
				'请点击右上角设置图标，找到Sources，禁用下面的 Enable JavaScript source maps')
			// #endif


			// #ifndef H5 

			const me = this
			console.log('App Launch')
			plus.runtime.getProperty(plus.runtime.appid, function(inf) {
				console.log('当前应用Id：' + plus.runtime.appid, )
				console.log("当前应用内部版本：" + inf.version);
				console.log("当前应用生产版本" + plus.runtime.version)
				me.$store.state.currentVersion = inf.version
			});


			// #endif

		},
		methods: {
		
		},

		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	/*每个页面公共css */
	html,
	body,
	uni-page-body,
	uni-page-refresh {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		font-size: 14px;
	}

	.box {
		width: 100%;
		height: 100%;
		overflow: auto;
		box-sizing: border-box;
	}

	/* 输入框样式 */
	.cu-form-group {
		width: 95%;
		background: #FFFFFF;
		border: 1px solid #ccc;
		box-sizing: border-box;
		padding: 10px;
		color: #999999;
		margin: auto;
		border-radius: 10px;
		margin-top: 10px;
		position: relative;

		.top {
			width: 100%;

		}

		.title {
			width: 100px;
			display: block;
			float: left;
			color: #333333;
			font-weight: bold;
		}

		input {
			font-size: 14px;
		}

		.kuang {
			position: absolute;
			width: 200px;
			height: 199px;
			overflow: auto;
			background-color: #cccccc;
			z-index: 999999;
			margin-left: 100px;
			border-radius: 5px;
			box-sizing: border-box;

			view {
				width: 100%;
				height: 30px;
				text-align: left;
				line-height: 30px;
				font-size: 12px;
				color: #000000;
				overflow: hidden;
			}
		}
	}
</style>
