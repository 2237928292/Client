<template>
	<view class="box">
		<!-- 展示信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				{{data.CusName}}
			</view>
			<view class="Mini_list" v-for="(item,index) in obj" :key='index'>
				<view class="Mini_list_left">
					{{item.name}}
				</view>
				<view class="Mini_list_right">
					{{item.value}}
				</view>
			</view>
		</view>
		
		
		<!-- 设备清单 -->
		<view class="Customer" v-if="this.Data.SOEquipmentList">
			<view class="Customer_Top">
				设备清单
			</view>
			<view class="Listdan" v-for="(itemss,indexss) in this.Data.SOEquipmentList"  :key="indexss"  >
				<view class="li"> 
					{{'设备'+ (indexss+1) }}
				</view>
				<view class="Mini_list">
					<view class="Mini_list_left">
						设备编号
					</view>
					<view class="Mini_list_right">
						{{itemss.ProcodeCode }}
					</view>
				</view>
				
				<view class="Mini_list">
					<view class="Mini_list_left">
						数量
					</view>
					<view class="Mini_list_right">
						{{itemss.Number  }}
					</view>
				</view>
				<view class="Mini_list">
					<view class="Mini_list_left">
						销售单价
					</view>
					<view class="Mini_list_right">
						{{itemss.UnitPrice   }}
					</view>
				</view>
				
				
				<view class="Mini_list">
					<view class="Mini_list_left">
						安装费单价
					</view>
					<view class="Mini_list_right">
						{{itemss.AssemblyPeice   }}
					</view>
				</view>
				
				<view class="Mini_list">
					<view class="Mini_list_left">
						是否甲方安装
					</view>
					<view class="Mini_list_right">
						{{itemss.IsAssembly ? '是' : '否' }}
					</view>
				</view>
				
				
			</view>
		</view>
		
		
		<!-- 收货人 -->
		<view class="Customer" v-if="this.Data.Memo">
			<view class="Customer_Top">
				收货人
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					姓名
				</view>
				<view class="Mini_list_right">
					{{this.Data.Consignee.Name}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					手机
				</view>
				<view class="Mini_list_right">
					{{this.Data.Consignee.MobilePhone}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					电话
				</view>
				<view class="Mini_list_right">
					{{this.Data.Consignee.Tel}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					地址
				</view>
				<view class="Mini_list_right">
					{{this.Data.Consignee.Address}}
				</view>
			</view>
		</view>
		
		
		<!-- 总计 -->
		<view class="Customer" v-if="this.Data.Memo">
			<view class="Customer_Top">
				总计
			</view>
			
			
			<view class="Mini_list Customers">
				<view class="Mini_list_left">
					差旅费
				</view>
				<view class="Mini_list_right">
					{{this.Data.TotalPrice.TravelAmount}}
				</view>
			</view>
			<view class="Mini_list Customers">
				<view class="Mini_list_left">
					物流费
				</view>
				<view class="Mini_list_right">
					{{this.Data.TotalPrice.LogisticCharge}}
				</view>
			</view>
			<view class="Mini_list Customers" >
				<view class="Mini_list_left">
					总计
				</view>
				<view class="Mini_list_right">
					{{this.Data.TotalPrice.Amount}}
				</view>
			</view>
			<view class="Mini_list Customers">
				<view class="Mini_list_left">
					优惠价
				</view>
				<view class="Mini_list_right">
					{{this.Data.TotalPrice.DiscountAmount}}
				</view>
			</view>
		</view>
		
		
		<!-- 备注 -->
		<view class="Customer" v-if="this.Data.Memo">
			<!-- <view class="Customer_Top">
				{{data.CusName}}
			</view> -->
			<view class="Mini_list">
				<view class="Mini_list_left">
					备注
				</view>
				<view class="Mini_list_right">
					{{this.Data.Memo}}
				</view>
			</view>
		</view>
		
		
		<!-- 操作 -->
		<view class="but" v-if="State">
				<button  @tap="Go(7)" v-if="data.State == 1 || data.State == 0"  type="warn"    size="mini">撤单</button>
				<button  @tap="Go(3)" v-if="data.State == 2"  type="primary" size="mini">确认报价</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: this.$store.state.miniClick,
				Data:{},
				SOId:this.$store.state.miniClick.SOId,
				obj: [],
				State: true,
			};
		},
		mounted() {
			this.State =  this.$store.state.States
		},
		created() {
			this.init()
			this.obj = [{
					name: '状态',
					value: this.data.StateStr
				},
				{
					name: '时间',
					value: this.data.CreateDateStr
				},
				{
					name: '编码',
					value: this.data.SOCode
				}
			]
		},
		methods: {
			//按钮
			Go:function(number){
				var obj = {
					header:this.$store.state.token,
					method:'POST',
					url:this.$store.state.url   + 'SO/UpdateSOState',
					data:{
						SoId : this.data.SOId,
						SOStatus :number
					}
				}
				this.$http(obj).then((res)=>{
					uni.navigateTo({
						url:'./Order'
					})
				})
			},
			init:function(){
				var obj ={
					url:this.$store.state.url + 'SO/GetSo',
					header:this.$store.state.token,
					mounted:'GET',
					data:{
						soId :this.SOId 
					}
				}
				this.$http(obj).then((res)=>{
					console.log(res.Data)
					this.Data = res.Data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/scss/work/Order/Orders.scss";
</style>
