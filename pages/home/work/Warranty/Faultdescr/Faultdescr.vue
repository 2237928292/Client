<template>
	<view class="box">
		<text class="TiJaiu">故障描述:</text>
		<view class="cu-form-group textview">
			<textarea class="Amier" maxlength='-1' name="" id="textarea" cols="30" rows="10" auto-height v-model="texts"></textarea>
		</view>

		<text class="TiJaiu">添加视频:</text>
		<easy-upload :dataList="imageList" :types="category"></easy-upload>

		<text class="TiJaiu">添加图片:</text>
		<anUploadImg></anUploadImg>

	</view>
</template>

<script>
	import anUploadImg from '@/components/an-uploadImg/an-uploadImg'
	export default {
		components: {
			anUploadImg
		},
		data() {
			return {
				texts: '', //故障描述
				src: '',
				imageList: [],
				category: 'video'
			};
		},
		created() {
			this.texts = this.$store.state.up_img_Video
		},
		// 点击完成
		onNavigationBarButtonTap: function() {
			
			if (this.texts == '') {
				uni.showToast({
					title: "请输入故障描述",
					icon: "none"
				})
				return false
			}
			this.$store.state.up_img_Video = this.texts
			uni.navigateTo({
				url: '../Warranty'
			})
			this.$store.state.Faultdescription = this.texts
		},

		methods: {

		}


	}
</script>

<style scoped lang="scss">
	.box {
		.TiJaiu {
			padding-left: 15px;
			font-weight: bold;
			font-size: 14px;
			display: block;
			margin-top: 20px;
			box-sizing: border-box;
		}
	}
</style>
