<template>
	<view class="box">
		<view class="head">
			我
			<!-- <span>退出</span> -->
			<!-- <image  src="../../static/icon/dropOut.png"   @tap="botLogo"   ></image> -->
		</view>
		
		
			<view style="width: 100%;text-align: center;padding-top: 30px;box-sizing: border-box;">
				<u-avatar :src="src" size='160' ></u-avatar>
				<h3 style='line-height: 50px;'>{{username || ' - - '}}</h3>
			</view>
		
		
		
		
		
		<!-- <view class="index">
			<view class="timg">
				<image class="ttimg"></image>
			</view>
			<view v-if="username" class="geren-right">
				<view class="left">
					欢迎
				</view>
				<view class="right">
					{{username}}

				</view>
			</view>
		</view> -->
		
		
		
		<u-cell-group>
				<u-cell-item   v-for="(item,index) in data" :key="index" @tap="Click_Index(item)" :icon="item.icon" :title="item.name"></u-cell-item>
				<u-cell-item   @tap="botLogo()"   value="退出登录" :value-style='RightTextStyle' :arrow='false' ></u-cell-item>
		</u-cell-group>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				RightTextStyle:{color:'red'},
				src: '../../static/imags/download.jpg',
				text: '无头像',
				title: 'Hello',
				data: [{
						name: "关于公司",
						Lick_url: './introduction/introduction',
						icon:'home-fill'
					},
					{
						name: "投诉与建议",
						Lick_url: './Suggestions/Suggestions',
						icon:'email-fill'
					},
					{
						name: "检查更新",
						Lick_url: './VersionUpdate/VersionUpdate',
						icon:'setting-fill'
					}
				],
				username: '', //登录用户
			}
		},
		onShow() {
			this.username = this.$store.state.Name
			this.Logos()
		},
		methods: {
			//点击功能
			Click_Index: function(item) {
				console.log(item.Lick_url)
				if (item.Lick_url != '') {
					uni.navigateTo({
						url: item.Lick_url
					})
				}
			},
			//退出登录
			botLogo: function() {
				uni.navigateTo({
					url: "/pages/Logo/Logo",
				});
			},
			//初始 获取信息
			Logos: function() {
				uni.getStorage({
					key: 'Pros',
					success: function(res) {
						if (res.data == '') {
							uni.navigateTo({
								url: '../Logo/Logo'
							})
						}
					},
					fail: function() {
						uni.navigateTo({
							url: '../Logo/Logo'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
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
		
			// image{
			// 	display: block;
			// 	width: 20px;
			// 	height: 20px;
			// 	float: right;
			// 	margin-top: 15px;
			// }
		
		}	
	}
</style>
