<template>
	<view class="box">
		<view class="Amier" v-for="(item,index) in Data" :key="index" @tap="OKAdWarrantypro(item)"  >
				<view>{{item.Name}}</view>
				<view style="textAlign: right;">{{item.Mobile || '暂无联系方式' }}</view>
				<view class="TitleTop">{{item.Address}}</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() { 
			return {
				Data:[]
			};
		},
		mounted() {
			this.init()
		},
		
		methods:{
			OKAdWarrantypro:function(item){
				this.$store.state.shoppingCartproitem = item
				uni.navigateTo({
					url:'./shoppingCart'
				})
			},
			init:function(){
				var obj = {
					url: this.$store.state.url + 'CRM/GetCusLinkManMini',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						cusId : this.$store.state.CusId
					}
				}
				this.$http(obj).then((res) => {
					this.Data = res.Data.Dtos
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.Amier{
	width: 95%;
	height: 70px;
	background-color: #FFFFFF;
	margin: auto;
	border-radius: 10px;
	margin-top: 10px;
	.TitleTop{
		width: 100%;
		height: 50%;
	}
	view{
		width: calc(100% / 2);
		height: 50%;
		float: left;
		line-height: 35px;
		padding: 0 20px;
		box-sizing: border-box;
		font-weight: bold;
	}
}
</style>
