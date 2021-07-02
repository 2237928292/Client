<template>
	<view class="box">
		
		<view class="head">
			选购商品
		</view>
		
		
		
		
		<view class="img" v-for="(item,index) in imgurl" :key="index" @tap="enter(index)">
			<image :src="item.url" mode=""></image>
			<text>{{item.text}}</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				imgurl: [{
						url: "/static/image/1.jpg",
						text: '举升机'
					},
					{
						url: "/static/image/2.jpg",
						text: '轮胎维修设备'
					},
					{
						url: "/static/image/3.jpg",
						text: '悬架调整设备'
					},
					{
						url: "/static/image/4.jpg",
						text: '自动系统维修设备'
					},
					{
						url: "/static/image/5.jpg",
						text: '空调设备'
					},
					{
						url: "/static/image/6.jpg",
						text: '车灯调整设备'
					},
					{
						url: "/static/image/7.jpg",
						text: '清洁设备'
					},
					{
						url: "/static/image/8.jpg",
						text: '钣金设备'
					},
					{
						url: "/static/image/9.jpg",
						text: '喷漆设备'
					},
				]
			};
		},
		
		methods: {
			enter(index) {
				var that = this
				var obj = {
					url: this.$store.state.url + 'System/GetPartDrawing',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						sparePartsType: index + 1
					}
				}
				this.$http(obj).then((res) => {
					this.$store.state.sparePartsReclassifys = res.Data.sparePartsReclassifys
					uni.navigateTo({url: "/pages/mgou/buy/Navigationindetail" });
				})


			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
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
		
		
		}
	}
	.img {
		width: calc(88% / 3);
		float: left;
		margin: 2%;
		height: 130px;
		text-align: center;
		box-sizing: border-box;
		border-radius: 10px;
		overflow: hidden;
		border: 1px solid #ccc ;
		font-size: 12px;
		line-height: 20px;
		image {
			width: 100%;
			height: 105px;
			display: block;
		}

	}
</style>
