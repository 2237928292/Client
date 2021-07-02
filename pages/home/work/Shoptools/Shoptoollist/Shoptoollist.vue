<template>
	<!-- 订单管理 -->
	<view class="box">
		<!-- 头部切换 -->
		<view class="top_Tab">
			<view v-for="(item,index) in tabClick" :class="{tab : state == item.index }"  :key="index" @tap="TabCli(item)">
				{{item.text}}
			</view>

		</view>
		<!-- LIST -->
		<view class="List" v-if="data[0]">
			<view class="li" v-for="(items,indexs) in data" :key="indexs" @tap="mnimsg(items)"   >
				
						<view class="title">
							{{items.UserName}}
						</view>
						<view class="conter">
							{{items.BorrowRecoreCode || '- -' }}
						</view>
						<view class="Time">
							{{items.StateStr}}
						</view>
						<div class="buttomTime">
							<view>{{items.ApplyTime  || '- -'}}</view>
							<view>{{items.LendTime  || '- -'}}</view>
							<view>{{items.ReturnTime || '- -' }}</view>
						</div>
			</view>
		</view>
		<!-- 没有数据 -->
		<view v-if="!data[0]"  class="ListNo" >
			这里空空的
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: '' ,
				data: [], //数据
				search: '', //检索项 默认为空
				tabClick: [{
						text: '全部',
						index: ''
					},
					{
						text: '申请中',
						index: 1
					},
					{
						text: '使用中',
						index: 2
					},
					{
						text: '已归还',
						index: 3
					}

				]
			};
		},
		onBackPress() {
			uni.switchTab({
				url: "/pages/home/home"
			});
			return true
		},
		created() {
			this.init()
		},
		methods: {
			// 初始化
			init: function() {
				var obj = {
					url: this.$store.state.url + 'CusTool/GetCusToolRecs',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						Cusid:this.$store.state.CusId,
						search: this.search, //检索项默认为空
						numPerPage: 100,
						pageNum: 1,
						orderField: '',
						orderDirection: '',
						state: this.state, //请求的状态，  全部：0，申请中：1使用中：2已归还：3
						end:'',
						begin :'',
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data.Dtos)
					var xx = res.Data.Dtos
					for(var i = 0; i < xx.length; i ++){
							if(xx[i].ApplyTime != null){
								xx[i].ApplyTime = xx[i].ApplyTime.split('T')[0]
							}
							if(xx[i].LendTime != null){
								xx[i].LendTime = xx[i].ApplyTime.split('T')[0]
							}
							if(xx[i].ReturnTime != null){
								xx[i].ReturnTime = xx[i].ApplyTime.split('T')[0]
							}
					}
					this.data = xx
				})
			},
			// Tab切换
			TabCli: function(item) {
				if(this.state == item.index){return false}
				this.state = item.index
				this.init()
			},
			//查看详细信息
			mnimsg:function(msg){
				this.$store.state.QRdataMsg = msg.Id
				uni.navigateTo({
					url:'/pages/home/work/Shoptools/Shoptoolsmsg/Shoptoolsmsg'
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/scss/work/Shoptools/Shoptoollist.scss";  
</style>
