<template>
	<view class="box">
		
		<view class="Customer" v-if="Data.CusName">
			<view class="Customer_Top">
				客户信息
			</view>
		
			<view class="Mini_list">
				<view class="Mini_list_left">
					客户名称
				</view>
				<view class="Mini_list_right">
					{{Data.CusName}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					状态
				</view>
				<view class="Mini_list_right">
					{{Data.StateStr}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					编号
				</view>
				<view class="Mini_list_right">
					{{Data.RecCode  }}
				</view>
			</view>
		</view>
		
		
		<view class="Customer" v-if="Data.CusName">
			<view class="Mini_list">
				<view class="Mini_list_left">
					收货人
				</view>
				<view class="Mini_list_right">
					{{Data.Person}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					手机号
				</view>
				<view class="Mini_list_right">
					{{Data.Phone}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					地址
				</view>
				<view class="Mini_list_right">
					{{Data.Address  }}
				</view>
			</view>
		</view>
		
		
		
		<view class="Customer" v-if="Data.CusName">
			<view class="Mini_list">
				<view class="Mini_list_left">
					预定日期
				</view>
				<view class="Mini_list_right">
					{{Data.ReserveDate | splititrm}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					发货日期
				</view>
				<view class="Mini_list_right">
					{{Data.SendDate | splititrm}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					归还日期
				</view>
				<view class="Mini_list_right">
					{{Data.ReturnDate  | splititrm}}
				</view>
			</view>
			
		</view>
		

		<view class="Customer" v-if="Data.CusName">
			<view class="Mini_list">
				<view class="Mini_list_left">
					物流信息
				</view>
				<view class="Mini_list_right">
					{{Data.ExpressNum}}
				</view>
			</view>
		</view>
		
		<view class="Customer" v-for="(item,index) in LeaseToolDtos" :key="index" >
			<view class="Mini_list">
				<view class="Mini_list_left">
					编号
				</view>
				<view class="Mini_list_right">
					{{item.ToolCode}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					描述
				</view>
				<view class="Mini_list_right">
					{{item.Describe}}
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
				LeaseToolDtos:[]
			};
		},
		created() {
			this.init()
		},
		onBackPress() { //自定义返回事件
			uni.navigateTo({
				url: "./leaseList",
			})
			return true
		},
		filters: {
		  splititrm: function (value) {
			  if(value == '' || value == undefined){
				  return ''
			  }else{
				  return value.split('T')[0]
			  }
		  }
		},
		methods:{
			init:function(){
				console.log(this.$store.state.shoppingID)
				var obj = {
					method: 'GET',
					url: this.$store.state.url + 'LeaseTool/GetLeaseToolRec',
					header: this.$store.state.token,
					data: {
						Id:this.$store.state.shoppingID
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data)
					this.Data = res.Data.Dto
					this.LeaseToolDtos = res.Data.LeaseToolDtos
				})	
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Customer {
		width: 100%;
		background-color: #FFFFFF;
		margin-top: 20px;
	
		.Customer_Top {
			width: 100%;
			height: 40px;
			border-bottom: 1px solid #c3c3c3;
			line-height: 40px;
			padding-left: 20px;
			font-weight: bold;
			box-sizing: border-box;
		}
		.textarea{
			width: 90%;
			margin: auto;
			margin: 10px;
			.textarea{
				text-indent:10px;
				font-size: 14px;
				color: #555555;
			}
			.Quote{
				width: 100%;
				// background-color: #dddddd;
				border-radius: 10px;
				margin-bottom: 10px;
				height: 100px;
				padding-top: 10px;
				box-sizing: border-box;
				button{
					float: right;
				}
				.Quote_Top{
					width: 100%;
					height: 25px;
					text{
						float: right;
					}
				}
			}
			.Customer_Top_Code{
				width: 100%;
				height: 20px;
				border-bottom: 1px solid #C8C7CC;
				.Customer_Top_Code_left{
					width: 50%;
					float: left;
					line-height: 20px;
					color: #999999;
				}
				.Customer_Top_Code_right{
					text-align: right;
					line-height: 20px;
				}
			}
			image{
				width: 100px;
				height: 100px;
				margin-left: 10px;
			}
		}
	
		.Mini_list {
			width: 100%;
			height: 30px;
			line-height: 30px;
			padding-left: 20px;
			box-sizing: border-box;
	
			.Mini_list_left {
				width: 25%;
				height: 100%;
				font-weight: bold;
				float: left;
				font-size: 12px;
				color: #555555;
			}
	
			.Mini_list_right {
				width: 75%;
				height: 100%;
				color: #808080;
				float: left;
				overflow: hidden;
				font-size: 12px;
			}
		}
	}
</style>
