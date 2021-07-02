<template>
	<!-- 英之杰联系人 -->
	<view class="box">
		<view class="Pros" v-for="(item,index) in Dtos" :key="index" >
			<view class="Pros_Top">
				
				<text>{{item.Name + '( ' + item.Role + ' )'  }}</text>
				<!-- <text class="right">{{item.Role}}</text> -->
			</view>
			<view class="Pros_Bottom">
				<view class="Left" @tap="Call(item.Tel.split(';')[0])">
					{{item.Tel.split(';')[0]}}
					<image src="../../../../static/icon/iphone.png" mode=""></image>
				</view>
				<view class="Right" @tap="Call(item.Tel.split(';')[1])">
					{{item.Tel.split(';')[1]}}
					<image src="../../../../static/icon/iphones.png" mode=""></image>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Dtos:[],//联系人数据集合
			};
		},
		created() {
			this.init()
		},
		methods:{
			init:function(){
				var obj = {
					url: this.$store.state.url + 'System/GetInchwellLinkman',
					method: 'GET',
					header: this.$store.state.token,
				}
				this.$http(obj).then((res) => {
					console.log(res.Data.Dtos)
					this.Dtos = res.Data.Dtos
					
				})
			},
			Call:function(item){
				uni.makePhoneCall({
						phoneNumber: item 
				});
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.box{
	.Pros{
		width: 100%;
		height: 70px;
		background-color: #FFFFFF;
		border-bottom:  2px solid #e3e2e2;
		box-sizing: border-box;
		padding:  0 20px ;
		box-sizing: border-box;
		.Pros_Top{
			width: 100%;
			height: 38px;
			line-height: 30px;
			font-weight: bold;
			.right{
				float: right;
			}
		}
		.Pros_Bottom{
			width: 100%;
			height: 40%;
			color: #989898;
			view{
				width: 50%;
				float: left;
				height: 100%;
				color: #007AFF;
				font-weight: bold;
				text-align: right;
				image{
					width: 25px;
					height: 25px;
				}
			}
		}
	}
}
</style>
