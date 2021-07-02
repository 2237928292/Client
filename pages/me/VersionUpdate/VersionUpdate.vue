<template>
	<view class="box">
		<u-image width="100px" height='100px' :src="src" style='margin:auto'></u-image>
		<h3 style='text-align: center;line-height: 50px;'>北京英之杰</h3>
		<h5 style='text-align: center;margin-bottom: 30px;'>当前版本 &nbsp; {{version}}</h5>

		<view style="text-align:center">
			<u-button size='medium'  type="primary" @click="Jiann" :loading="load">{{Msg}}</u-button>
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
				form: {},
				Msg: '检查更新',
				load: false,
				version: this.$store.state.currentVersion,
				Title: '',
				Content: '',
				Dupdata: false,
				PkgUrl: '', //下载地址
				src: '../../../static/img/zhi.png'
			};
		},
		methods: {
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
			//检查更新
			Jiann: function() {
				var _this = this
				
				_this.Msg = '正在检查'
				
				_this.load = true
				uni.getStorage({
					key: 'admins',
					success: function(Darat) {
						console.log(Darat.data)
						if (Darat.data == 'inchwell1' || Darat.data == 'Inchwell1') {
							console.log('false Updata')
							_this.load = false
							return false
						} else {
							_this.Updata()
						}
					},
					fail: function() {
						console.log('err')
						_this.load = false
						return false
					}
				})
			},
			Updata: function() {
				this.Msg = '正在检查'
				this.load = true
				var obj = {
					url: this.$store.state.url + 'System/GetSysVersion',
					data: {
						mobile: 1,
						type: 1,
						clientVersion: this.version,
					},
				}
				this.$httpno(obj).then((res) => {
					console.log(res)
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
					} else {
						// 否则 不需要更新
						this.Title = '提示！'
						this.Content = '当前为最新版本'
						this.Dupdata = false
						this.$refs.popup.open()
					}
					this.load = false
					this.Msg = '检查完成'
				})
			},
			downWgt(WgtUrl) { //下载安装包
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
			installWgt(path) { //更新资源包
				plus.runtime.install(path, {}, function() {
					plus.nativeUI.toast("应用资源更新完成！请重启App！", function() {
						plus.runtime.restart();
					});
				}, function(e) {
					plus.nativeUI.toast("安装wgt文件失败[" + e.code + "]：" + e.message);
				});
			}
		}
	}
</script>

<style lang="scss">
	.box {
		background-color: #FFFFFF;

	}
</style>
