<template>
	<view class="Boss">
		<view class="an-uploadImg-group">
			<view>
				<view class="an-img" v-for="(item, index) in imgList" :key="index" @click="perviewImg(index)">
					<image :src="item" v-if="item" @click="perviewImg(index)" ></image>
					<view class="an-icon-close" @click.stop="handleRemove(index)">
						<uni-icon type="closeempty" size="26" color="#F00"></uni-icon>
					</view>
				</view>
				<view class="an-img-add" @click="chooseImage">
					<uni-icon type="plus" size="36" color="#FFFFFF">
						
					</uni-icon>
					
				</view>
			</view>
		</view>
		<view class="aaddimg-bottom"> 
			
		</view>
		<hxpreviewimg :list.sync="previewImgList" :current.sync="currentImg" :start.sync="PINum"></hxpreviewimg>
	</view>
</template>

<script>
	import uniIcon from './ACell/uni-icon/uni-icon.vue'
	import { pathToBase64 } from './js_sdk/gsq-image-tools/image-tools/index.js'
	import hxpreviewimg from '@/components/an-uploadImg/hx-preview-img/hx-preview-img.vue'
	
	export default {
		name: 'AnUploadImg',
		components:{
			uniIcon,
			hxpreviewimg
		},
		data() {
			return {
				imgList: [],  //图片展示地址
				imgBase64List: [],
				currentImg:'',
				previewImgList:[],
				PINum:0,
				ImgUrlLocalhost:[],
			};
		},
		created() {
			this.imgList = this.$store.state.imgList
		},
		methods:{
			chooseImage() {
				uni.chooseImage({
				  success: (res) => {
					for(var i = 0; i < res.tempFilePaths.length; i++){
						this.ImgUrlLocalhost.push(res.tempFilePaths[i])
						pathToBase64(res.tempFilePaths[i])
					  .then(base64 => {
						this.imgList.push(base64)
					  })
					  .catch(error => {
					    console.error(error)
					  })
					}
					this.$store.state.imgList = this.imgList
				  }
				})
			},
			perviewImg(index){
				
				console.log(index)
				this.currentImg = this.ImgUrlLocalhost[index]
				this.previewImgList = this.ImgUrlLocalhost
				this.PINum++
			},
			handleRemove(index){
				
			}
		}
	}
</script>

<style>
	.Boss{
		width: 100%;
	}
	.an-uploadImg-group{
		margin: 5upx 20upx;
	}
	.an-img{
		float: left; 
		margin-right: 10upx;
	}
	.an-img-add{
		float: left; 
		margin-right: 10upx; 
		height: 200upx; 
		width: 200upx; 
		/* background-color: #C8C7CC; */
		background: url(icon/top.png) repeat;
		background-size: 100% 100%;
		text-align: center; 
		line-height: 110upx;
	}
	.an-img>image{
		height: 200upx; 
		width: 200upx;
	}
	.an-icon-close{
		position: relative; 
		right: -50upx; 
		top: -120upx;
	}
</style>
