<template>
	<view  class="box">
		<view class="Customer" >
			<view class="Customer_Top">
				{{WOone.WoCode}}
			</view>
			<view v-if="WOtwo.Travel != 0"   class="Mini_list Customers">
				<view class="Mini_list_left">
					差旅费
				</view>
				<view class="Mini_list_right">
					{{WOtwo.Travel}}
				</view>
			</view>
			
			<view v-if="WOtwo.Service != 0"  class="Mini_list Customers">
				<view class="Mini_list_left">
					服务费
				</view>
				<view class="Mini_list_right">
					{{WOtwo.Service}}
				</view>
			</view>
			
			<view v-if="WOtwo.DBL != 0" class="Mini_list Customers">
				<view class="Mini_list_left">
					充电机维修费
				</view>
				<view class="Mini_list_right">
					{{WOtwo.DBL}}
				</view>
			</view>
			
			<view class="Mini_list Customers">
				<view class="Mini_list_left">
					合计
				</view>
				<view class="Mini_list_right">
					{{WOtwo.Cost}}
				</view>
			</view>
	
	
	
			<view class="but">
				<button type="warn" size="mini" @tap="WOConfirmQuote(false)">拒绝</button>
				<button type="primary" size="mini" @tap="WOConfirmQuote(true)" >接受</button>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				WOone:{},//
				WOtwo:{},//
			};
		},
		created() {
			
			this.WOone = this.$store.state.RepairCosts[0]
			
			this.WOtwo = this.$store.state.RepairCosts[1]
			
			console.log(this.WOtwo)
		},
		methods:{
			WOConfirmQuote:function(bool){
				var obj = {
					method:'POST',
					url:this.$store.state.url + 'WO/WOConfirmQuote',
					header:this.$store.state.token,
					data:{
						WOId : this.WOtwo.WOId,
						IsAccept : bool,
					}
				}
				this.$http(obj).then((res)=>{
					uni.navigateTo({
						url:'./text'
					})
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
@import "@/scss/work/Order/Orders.scss";
.but{
	width: 100%;
	height: 30px;
	display: flex;
	justify-content: center;
}
</style>
