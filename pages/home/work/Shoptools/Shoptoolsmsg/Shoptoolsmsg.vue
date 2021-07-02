<template>
	<view class="box">
		<!-- 基础信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				基础信息
			</view>
			<view class="Mini_list" v-for="(item,index) in obj" :key='index' >
				<view class="Mini_list_left">
					{{item.name}}
				</view>
				<view class="Mini_list_right">
					{{item.value}}
				</view>
			</view>
		</view>
		<!-- 设备信息 -->
		
		<view class="Customer" v-if="this.Data.BorrowListDtos">
			<view class="Customer_Top">
				工具清单
			</view>
			<view class="Listdan" style="position: relative;" v-for="(itemss,indexss) in this.Data.BorrowListDtos"  :key="indexss"  >
				<image style="width: 100px;height: 100px;position: absolute;top: 0;right: 0;" :src=" 'http://icms.inchwell.com.cn/File/CusTool/' + itemss.ImageUrl" mode=""></image>
				<view class="li"> 
					{{'工具'+ (indexss+1) }}
				</view>
				<view class="Mini_list">
					<view class="Mini_list_left">
						工具编号
					</view>
					<view class="Mini_list_right">
						{{itemss.ProductCode }}
					</view>
				</view>
				
				<view class="Mini_list">
					<view class="Mini_list_left">
						库位
					</view>
					<view class="Mini_list_right">
						{{itemss.Storehouse  }}
					</view>
				</view>
				
				<view class="Mini_list">
					<view class="Mini_list_left">
						单位
					</view>
					<view class="Mini_list_right">
						{{itemss.Unit   }}
					</view>
				</view>
				
				<view class="Mini_list">
					<view class="Mini_list_left">
						标签
					</view>
					<view class="Mini_list_right">
						{{itemss.ToolLabel}}
					</view>
				</view>
				
				<view class="Mini_lists" >
					<view class="Mini_list_left">
						产品说明
					</view>
					<view class="Mini_list_right">
						{{itemss.ProductDesc   }}
						
					</view>
				</view>
				
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data:{},
				obj:[],
			};
		},
		created() {
			this.init()
		},
		methods:{
			init:function(){
				var obj = {
					method: 'GET',
					url: this.$store.state.url + 'CusTool/GetCusToolRec',
					header: this.$store.state.token,
					data: {
						Id: this.$store.state.QRdataMsg,
					}
				}
				this.$http(obj).then((res) => {
					 // 跳转到列表页
					this.Data = res.Data
					console.log(res.Data)
					
					this.obj = [{
							name: '借用人',
							value: res.Data.CusToolRecDto.UserName
						},
						{
							name: '状态',
							value: res.Data.CusToolRecDto.StateStr,
						},
						{
							name: '申请时间',
							value: res.Data.CusToolRecDto.ApplyTime
						},
						{
							name: '借出时间',
							value: res.Data.CusToolRecDto.LendTime
						},
						{
							name: '归还时间',
							value: res.Data.CusToolRecDto.ReturnTime
						}
					]
					
					
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/scss/work/Order/Orders.scss";
</style>
<style lang="scss">

</style>
