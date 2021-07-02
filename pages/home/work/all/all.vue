<template>
	<view class="box">
		<view class="boa" v-for="(item,index) in Data" :key="index">
			<text class="text">{{item.name}}</text>
			<view v-for="(itemm,indexs)   of item.list" :key="indexs" class="div" @tap="Url(itemm,indexs)">
				<view class="icons">
					<image class="icon" :src="itemm.imgurl"  alt />
				</view>
				<text>{{itemm.name}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data: [{
						name: '基础资料',
						list: [{
								name: '客户信息',
								url: '/pages/home/work/Me/Me',
								imgurl: '/static/img/HomeIcon/02.png'
							},
							{
								name: '客户设备',
								url: '/pages/home/work/Customerequipment/Customerequipment',
								imgurl: '/static/img/HomeIcon/03.png'
							},
							{
								name: '英之杰联系人',
								url: '/pages/home/work/Contactperson/Contactperson',
								imgurl:'/static/img/HomeIcon/04.png'
							},
						]
					},
					{
						name: '报修相关',
						list: [{
								name: '我要报修',
								url: '/pages/home/work/Warranty/Warranty',
								imgurl: '/static/img/HomeIcon/01.png'
							},
							{
								name: '报修管理',
								url: '/pages/home/work/Ordermanagement/Ordermanagement',
								imgurl:'/static/img/HomeIcon/05.png'
							},
						]
					},
					{
						name: '订单相关',
						list: [{
								name: '选购',
								url: '/pages/mgou/mgou',
								imgurl: '/static/imags/shao1.png'
							},
							{
								name: '购物车',
								url: '/pages/car/car',
								imgurl: '/static/imags/shao1.png'
							},
							{
								name: '订单管理',
								url: '/pages/home/work/Order/Order',
								imgurl: '/static/imags/dingdan.png'
							},
						]
					},
					{
						name: '增值服务',
						list: [{
								name: '代用机',
								url: '/pages/home/work/Surrogatemachine/Surrogatemachine',
								imgurl: '/static/imags/22222.png'
							},
							{
								name: '借用工具',
								url: '/pages/home/work/lease/lease',
								imgurl: '/static/imags/gj.png'
							},
							{
								name: '本店工具',
								url: '/pages/home/work/Shoptools/Shoptools',
								imgurl: '/static/imags/888.jpg'
							},
						]
					},
				]
			}
		},
		methods: {
			Url: function(item) {
				// 主页和其他页面区分跳转
				console.log(item)
				if (item.url) {
					if(item.name == '选购' || item.name == '购物车' ){
						uni.switchTab({
							url: item.url
						})
						return false
					}
					this.$store.state.RequestType = 2    // 手动保修  
					// if(item.url == '/pages/home/work/Shoptools/Shoptools'){
					// 	return false
					// }
					uni.navigateTo({
						url: item.url
					})
				
				} else {
					this.$title('此功能正在研发，请使用电脑端租赁')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}

	.boa {
		width: 100%;
		background: #ffffff;
		height: 150px;
		box-sizing: border-box;

		.text {
			width: 100px;
			display: block;
			font-weight: bolder;
			padding-left: 20px;
		}

		.div {
			width: calc(100% / 4);
			height: 100px;
			float: left;
			border-radius: 10px;
			box-sizing: border-box;
			text-align: center;
			margin-top: 10px;
			font-size: 12px;
			line-height: 20px;

			.icons {
				width: 100%;
				height: 60px;
				display: block;
				padding: 15px;
				box-sizing: border-box;

				.icon {
					width: 45px;
					height: 45px;
					display: block;
					margin: auto;
				}
			}
		}
	}
</style>
