<template>
	<view class="box">

		<view class="head">
			主页
			<span>{{this.$store.state.currentVersion}}</span>
			
			<u-icon name="scan" color='#ffffff' size='50' style='float: right;margin-top: 16px;' @click="scanCodeTwo">
			</u-icon>

		</view>

		<view class="ZindexVideo" v-if="OPVideo">
			<video style="width: 100%;" :src="Video" :poster='posterhttp' :autoplay='true'></video>
			<button @click="DelVideo()">关闭视频</button>
		</view>

		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :circular="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(itemed,indexed) in imgData" :key="indexed">
				<view class="swiper-item" style="position: relative;">
					<!-- <image class="images" :src="itemed.Str" ></image> -->
					<image class="start" v-show="itemed.Video != null " src="../../static/icon/start.png"
						@click="CliOPVideo(itemed)" mode=""></image>
					<image class="images" :src=" 'http://icms.inchwell.com.cn/file/IndexBanner/'+ itemed.Image"
						@click="CliOPVideo(itemed)"></image>
				</view>
			</swiper-item>
		</swiper>


		<view class="content">
			<view android:gravity="center" class="list" v-for="(item,index) in icon" :key="index" @tap="click(item)">
				<image mode="" :class="item.AmierIMG"></image>
				<text>{{item.text}}</text>
			</view>
		</view>

		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" :title='Title' :content="Content" :duration="2000" :before-close="true"
				@close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>

	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				OPVideo: false,
				Video: '',
				// https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209104902N3v5Vpxuvb.mp4
				// VideoStr:'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209104902N3v5Vpxuvb.mp4',

				// 视频地址
				posterhttp: '',
				// 视频首屏图片
				icon: [{
					url: '/pages/home/work/Warranty/Warranty',
					text: '我要报修',
					AmierIMG: 'icon01'
				}, {
					url: '/pages/home/work/Me/Me',
					text: '客户信息',
					AmierIMG: 'icon02'
				}, {
					url: '/pages/home/work/Customerequipment/Customerequipment',
					text: '客户设备',
					AmierIMG: 'icon03'
				}, {
					url: "/pages/home/work/Contactperson/Contactperson",
					text: '英之杰联系人',
					AmierIMG: 'icon04'
				}, {
					url: '/pages/home/work/Ordermanagement/Ordermanagement',
					text: '报修管理',
					AmierIMG: 'icon05'
				}, {
					url: '/pages/home/work/Order/Order',
					text: '订单管理',
					AmierIMG: 'icon06'
				}, {
					url: '/pages/home/work/lease/lease',
					text: '借用工具',
					AmierIMG: 'icon07'
				}, {
					url: '/pages/home/work/all/all',
					text: '全部',
					AmierIMG: 'icon08'
				}, ],

				imgData: [],
				version: this.$store.state.currentVersion,
				Title: '',
				Content: '',
				Dupdata: false,
				PkgUrl: '', //下载地址
			};
		},
		onHide: function() {
			this.DelVideo()
		},
		created() {
			// this.MasgNoRead()
		},
		onShow() {
			
			//初次登录状态
			var that = this
			// 读取本地客户信息   读取不到则返回重新登陆
			// 获取轮播图
			
			uni.getStorage({
				key: 'Pros',
				success: function(res) {
					var Pros = res.data
					that.$store.state.Vips = Pros.Characteristics // VIP等级
					that.$store.state.Name = Pros.FullName //名称
					that.$store.state.CusId = Pros.CusId //ID 
					that.$store.state.token = Pros.Token //Token
					that.MasgNoRead()
					that.MasgNoRead()
					that.GetIndexBanners()
				},
				fail: function() {
					uni.navigateTo({
						url: '../Logo/Logo'
					})
				}
			})
			//  初次会验证版本   如果需要更新则会提示    不需要更新则会进行下一步   
			if (that.$store.state.Updata) {
				uni.getStorage({
					key: 'admins',
					success: function(Darat) {
						console.log(Darat.data)
						if (Darat.data == 'inchwell1' || Darat.data == 'Inchwell1') {
							console.log('false Updata')
							return false
						} else {
							that.getappversion()
						}
					},
					fail: function() {
						console.log('err')
						return false
					}
				})
			}
			
			
			
			
			
		},
		// 右上角扫描二维码
		onNavigationBarButtonTap() {
			var that = this
			uni.scanCode({
				success: function(res) {
					that.$store.state.CodeTwo = res.result.split('=')[1]
					that.$store.state.RequestType = 3
					that.$store.state.Sxolde = true
					uni.navigateTo({
						url: "./work/Warranty/Warranty",
					});
				}
			});
		},
		methods: {
			// 右上角二维码
			scanCodeTwo: function() {
				var that = this
				uni.scanCode({
					success: function(res) {
						that.$store.state.CodeTwo = res.result.split('=')[1]
						that.$store.state.RequestType = 3
						that.$store.state.Sxolde = true
						uni.navigateTo({
							url: "./work/Warranty/Warranty",
						});
					}
				});
			},
			CliOPVideo: function(Row) {
				if (Row.Video != null) {
					this.posterhttp = 'http://icms.inchwell.com.cn/file/IndexBanner/' + Row.Image,
						this.Video = 'http://icms.inchwell.com.cn/file/IndexBanner/' + Row.Video,
						console.log(this.Video)
					this.OPVideo = true
				}
			},
			DelVideo: function() {
				this.Video = ''
				this.OPVideo = false
			},
			close(done) {
				// ...				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				done()
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(done, value) {
				// 输入框的值
				if (this.Dupdata) {
					plus.runtime.openURL(this.PkgUrl)
				}
				// ...// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				done()
			},
			//轮播图片
			GetIndexBanners: function() {
				var obj = {
					method: 'GET',
					url: this.$store.state.url + 'System/GetIndexBanners',
					header: this.$store.state.token,
					data: {
						to: 1
					}
				}
				this.$httpno(obj).then((res) => {
					console.log(res.Data.Dtos)
					this.imgData = res.Data.Dtos
				})
				
				
				
			},
			//跳转页面   提示
			click: function(item) {
				if (item.url) {
					this.$store.state.RequestType = 2 // 手动保修  
					uni.navigateTo({
						url: item.url
					})
				} else {
					this.$title('此功能正在研发，请使用电脑端')
				}
			},


			MasgNoRead: function() {
				var obj = {
					method: 'GET',
					url: this.$store.state.url + 'System/GetJournalisms',
					header: this.$store.state.token,
					data: {
						search: '',
						pageNum: 1,
						numPerPage: 10,
						orderField: "",
						orderDirection: "",
					}
				}
				this.$httpno(obj).then((res) => {
					var NoMasgindex = 0
					var Data = res.Data.Dtos
					for (var index = 0; index < Data.length; index++) {
						if (Data[index].Read == false) NoMasgindex += 1
					}
					if(NoMasgindex != 0){
						uni.setTabBarBadge({
							index: 3,
							text: String(NoMasgindex)
						})
					}
				})
			},
			// 获取当前版本号
			getappversion: function() {
				// #ifdef APP-PLUS
				const me = this
				plus.runtime.getProperty(plus.runtime.appid, function(inf) {
					me.$store.state.currentVersion = inf.version
					me.initUpdata(inf.version)
				})
				// #endif
			},
			// 分析版本差异
			initUpdata: function(version) {
				var obj = {
					url: this.$store.state.url + 'System/GetSysVersion',
					data: {
						mobile: 1,
						type: 1,
						clientVersion: version,
					},
				}
				this.$http(obj).then((res) => {
					this.$store.state.Updata = false
					// 判断是否需要更新  Update  True/false
					if (res.Data.Update) {
						// PkgUrl 有值为大更新
						if (res.Data.PkgUrl != null) {
							this.Title = '更新！'
							this.Content = res.Data.Description
							this.Dupdata = true
							this.PkgUrl = res.Data.PkgUrl
							this.$refs.popup.open()
							// WgtUrl 有值为小更新
						} else {
							// 小更新
							plus.nativeUI.toast("下载更新文件...");
							this.downWgt(res.Data.WgtUrl) //下载wgt文件的方法
						}
					}
					this.load = false
					this.Msg = '检查完成'
				})
			},
			//下载安装包
			downWgt(WgtUrl) {
				const me = this;
				plus.downloader.createDownload(WgtUrl, {
					filename: "_doc/update/"
				}, function(d, status) {
					if (status == 200) {
						//plus.nativeUI.toast("下载wgt成功："+d.filename); 
						plus.nativeUI.toast("下载更新文件成功，安装中");
						me.installWgt(d.filename); // 安装wgt包  
					} else {
						plus.nativeUI.toast("下载更新失败！");
					}
					plus.nativeUI.closeWaiting();
				}).start();
			},
			//更新资源包
			installWgt(path) {
				plus.runtime.install(path, {}, function() {
					plus.nativeUI.toast("应用资源更新完成！请重启App！", function() {
						plus.runtime.restart();
					});
					uni.showModal({
						title: '更新完成！',
						content: '热更新完成，请重启手机app',
						success: function(resTwo) {
							if (resTwo.confirm) {
								console.log('用户点击确定')
								plus.runtime.restart();
							} else if (resTwo.cancel) {
								console.log('用户点击取消');
								plus.runtime.restart();
							}
						}
					});
				}, function(e) {
					plus.nativeUI.toast("安装wgt文件失败[" + e.code + "]：" + e.message);
				});
			}

		}
	}
</script>

<style lang="scss" scoped>
	// @import '@/scss/home.scss';

	.box {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		height: 100%;
		padding-top: 80px;
		box-sizing: border-box;

		.head {
			position: fixed;
			top: 0px;
			left: 0;
			width: 100%;
			height: 80px;
			background-color: #1678ff;
			padding-top: 30px;
			padding-left: 20px;
			padding-right: 20px;
			box-sizing: border-box;
			line-height: 50px;
			font-weight: bolder;
			font-size: 18px;
			color: #ececec;
			z-index: 99;
			
			span{
				font-size: 10px;
				color: #2785ff;
			}
		}








		uni-image>img {
			opacity: 1;
		}

		.start {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			z-index: 99;
			width: 50px;
			height: 50px;
		}

		img {
			opacity: 1;
		}

		.ZindexVideo {
			width: 100%;
			height: 100%;
			z-index: 99;
			position: absolute;
			top: 0;
			bottom: 0;
			padding: 40% 0 0 0;
			box-sizing: border-box;
			transition: 2s;
			background-color: #FFFFFF;
		}
	}

	swiper {
		height: 240px;

		.uni-image>img {
			opacity: 1;
		}

		.swiper-item {
			background-color: #ffffff;

			.images {
				image {
					opacity: 1;
				}
			}

			image {
				width: 100%;
			}
		}
	}

	.content {
		width: 100%;

		.list {
			width: 23%;
			height: 100px;
			float: left;
			padding-top: 10px;
			margin: 1%;
			box-sizing: border-box;
			position: relative;
			// background-color: #FFFFFF;
			border-radius: 10px;


			// -webkit-box-shadow: 3px 3px 6px #c1c1c1; 
			// -moz-box-shadow: 3px 3px 6px #c1c1c1; 
			// box-shadow: 3px 3px 6px #c1c1c1; 
			image {
				width: 45px;
				height: 45px;
				display: block;
				margin: auto;
			}

			//1
			.icon01 {
				background-image: url(../../static/img/HomeIcon/01.png);
				background-size: 100% 100%;
			}

			//2
			.icon02 {
				background-image: url(../../static/img/HomeIcon/02.png);
				background-size: 100% 100%;
			}

			//6
			.icon03 {
				background-image: url(../../static/img/HomeIcon/03.png);
				background-size: 100% 100%;
			}

			//3
			.icon04 {
				background-image: url(../../static/img/HomeIcon/04.png);
				background-size: 100% 100%;
			}

			// 5
			.icon05 {
				background-image: url(../../static/img/HomeIcon/05.png);
				background-size: 100% 100%;
			}

			// 4
			.icon06 {
				background-image: url(../../static/img/HomeIcon/06.png);
				background-size: 100% 100%;
			}

			// 7
			.icon07 {
				background-image: url(../../static/img/HomeIcon/07.png);
				background-size: 100% 100%;
			}

			// 8
			.icon08 {
				background-image: url(../../static/img/HomeIcon/08.png);
				background-size: 100% 100%;
			}


			text {
				display: block;
				text-align: center;
				line-height: 40px;
				font-size: 13px;
			}
		}
	}
</style>
