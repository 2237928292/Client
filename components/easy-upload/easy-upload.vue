<template>
	<view>
		<view class="upload">
			<block v-for="(upload,index) in uploads" :key="index">
				<view class="uplode-file">
					<image v-if="types == 'image'" class="uploade-img" :src="upload" :data-src="upload" @tap="previewImage"></image>
					<image v-if="types == 'image'" class="clear-one-icon" :src="clearIcon" @tap="delImage(index)"></image>
					<video v-if="types == 'video'" class="uploade-img" :src="upload" controls>
						<cover-image v-if="types == 'video'" class="clear-one-icon" :src="clearIcon" @tap="delImage(index)"></cover-image>
					</video>
				</view>
			</block>
			<view v-if="uploads.length < uploadCount" :class="uploadIcon ? 'uploader-icon' : 'uploader-input-box'">
				<view v-if="!uploadIcon" class="uploader-input" @tap="chooseUploads"></view>
				<image v-else class="image-cion" :src="uploadIcon" @tap="chooseUploads"></image>
			</view>
		</view>
		<button type="primary" v-if="types == 'image'" @tap="upload">上传</button>
	</view>
</template>

<script>
	import {
		pathToBase64
	} from '../an-uploadImg/js_sdk/gsq-image-tools/image-tools/index.js'

	export default {
		props: {
			types: {
				type: String,
				default: 'image'
			},
			dataList: {
				type: Array,
				default: function() {
					return []
				}
			},
			clearIcon: {
				type: String,
				default: 'http://img1.imgtn.bdimg.com/it/u=451604666,2295832001&fm=26&gp=0.jpg'
			},
			uploadIcon: {
				type: String,
				default: ''
			},
			uploadUrl: {
				type: String,
				default: ''
			},
			deleteUrl: {
				type: String,
				default: ''
			},
			uploadCount: {
				type: Number,
				default: 99, //限制上传多少视频，默认99
			},
			//上传图片大小 默认3M
			upload_max: {
				type: Number,
				default: 3
			}
		},
		data() {
			return {
				//上传的图片地址
				uploadImages: [],
				//展示的图片地址
				uploads: [],
				// 超出限制数组
				exceeded_list: [],
			}
		},
		mounted() {
			this.uploads = this.$store.state.VideoBlobList
		},
		methods: {
			previewImage(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.dataList
				})
			},
			chooseUploads() {
				switch (this.types) {
					case 'image':
						uni.chooseImage({
							count: this.uploadCount - this.uploads.length, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album', 'camera'], //从相册选择
							success: (res) => {
								for (let i = 0; i < res.tempFiles.length; i++) {
									uni.showModal({
										title: Math.ceil(res.tempFiles[i].size / 1024),
										content: `上传视频超过5M,已过滤！`
									});
									if (Math.ceil(res.tempFiles[i].size / 1024) <= 20480) {
										// console.log(res.tempFilePaths)
										this.uploads.push(res.tempFiles[i].path)
										this.uploadImages.push(res.tempFiles[i].path)
										console.log(this.uploadImages)

										// uni.uploadFile({
										// 	url: 'http://49.232.193.216:1024', //仅为示例，非真实的接口地址
										// 	// filePath: this.uploadImages[0],  //要上传文件资源的路径。
										// 	fileType: 'image',
										// 	name: 'file',
										// 	files: [{
										// 		url: res.tempFilePaths
										// 	}],
										// 	//请求参数
										// 	formData: {
										// 		'user': 'test'
										// 	}, //附带参数
										// 	success: (uploadFileRes) => {
										// 		console.log('结束')
										// 		// this.$emit('successVideo', uploadFileRes)
										// 	}
										// });
									} else {
										// this.exceeded_list.push(i === 0 ? 1 : i + 1);
										uni.showModal({
											title: '提示',
											content: `上传视频超过20M,已过滤！`
										});
									}
								}
							},
							fail: (err) => {
								console.log('取消上传')
							}
						});
						break;
					case 'video':
						uni.chooseVideo({
							sourceType: ['camera', 'album'],
							success: (res) => {
								if ((res.size / 1024) <= 20480) {
									// this.uploads.push(res.tempFilePath)
									console.log(res.tempFilePath)
									this.uploads.push(res.tempFilePath)
									this.$store.state.VideoBlobList = this.uploads
									this.base64function(this.$store.state.VideoBlobList)
								} else {
									uni.showToast({
										title: '上传视频超过20M,已过滤！',
										icon: "none"
									})
								}
							},
							fail: (err) => {
								console.log('取消上传')
							}
						});
						break;
				}
			},
			delImage(index) {
				//第一个是判断app或者h5的 第二个是判断小程序的
				if (this.uploads[index].substring(0, 4) !== 'http' || this.uploads[index].substring(0, 11) == 'http://tmp/') {
					this.uploads.splice(index, 1)
					this.$store.state.VideoBlobList = this.uploads
					console.log(this.$store.state.VideoBlobList)
					this.base64function(this.$store.state.VideoBlobList)
					return;
				};
				if (!this.deleteUrl) {
					uni.showModal({
						content: '请填写删除接口'
					});
					return;
				};
				uni.request({
					url: this.deleteUrl,
					method: 'DELETE',
					data: {
						image: this.dataList[index]
					},
					success: res => {
						if (res.data.status == 1) {
							uni.showToast({
								title: '删除成功'
							})
							this.uploads.splice(index, 1)
						}
					},
				});
			},
			upload() {

				console.log(this.uploadImages)
				uni.uploadFile({
					url: 'http://49.232.193.216:1024', //仅为示例，非真实的接口地址
					filePath: this.uploads[0], //要上传文件资源的路径。
					fileType: 'video',
					name: 'file',
					//请求参数
					formData: {
						'user': 'test'
					}, //附带参数
					success: (uploadFileRes) => {
						console.log('结束')
						// this.$emit('successVideo', uploadFileRes)
					}
				});
			},
			base64function: function(res) {
				this.$store.state.VideoBase64List = []


				for (var i = 0; i < res.length; i++) {
					pathToBase64(res[i])
						.then(base64 => {
							this.$store.state.VideoBase64List.push(base64)

						})
						.catch(error => {
							console.error(error)
						})
				}
				console.log(this.$store.state.VideoBase64List)

			}
		}
	}
</script>

<style scoped>
	.upload {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.uplode-file {
		margin: 10upx;
		width: 210upx;
		height: 210upx;
		position: relative;
	}

	.uploade-img {
		display: block;
		width: 210upx;
		height: 210upx;
	}

	.clear-one {
		position: absolute;
		top: -10rpx;
		right: 0;
	}

	.clear-one-icon {
		position: absolute;
		width: 20px;
		height: 20px;
		top: 0;
		right: 0;
		z-index: 9;
	}

	.uploader-input-box {
		position: relative;
		margin: 10upx;
		width: 208upx;
		height: 208upx;
		border: 2upx solid #D9D9D9;
	}

	.uploader-input-box:before,
	.uploader-input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #D9D9D9;
	}

	.uploader-input-box:before {
		width: 4upx;
		height: 79upx;
	}

	.uploader-input-box:after {
		width: 79upx;
		height: 4upx;
	}

	.uploader-input-box:active {
		border-color: #999999;
	}

	.uploader-input-box:active:before,
	.uploader-input-box:active:after {
		background-color: #999999;
	}

	.uploader-input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.uploader-icon {
		position: relative;
		margin: 10upx;
		width: 208upx;
		height: 208upx;
	}

	.uploader-icon .image-cion {
		width: 100%;
		height: 100%;
	}
</style>
