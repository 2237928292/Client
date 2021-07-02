<template>
	<view class="box">
		<view class="Customer"  >
			<view class="Customer_Top">
				{{data.Brand}}
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					自定义名称
				</view>
				<view class="Mini_list_right">
					{{data.Name }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					序列号
				</view>
				<view class="Mini_list_right">
					{{data.SN}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					描述
				</view>
				<view class="Mini_list_right">
					{{data.Desc }}
				</view>
			</view>
			
			
			<view class="Mini_list">
				<view class="Mini_list_left">
					编号
				</view>
				<view class="Mini_list_right">
					{{data.ProdcutCode  }}
				</view>
			</view>
			
			<view class="Mini_list">
				<view class="Mini_list_left">
					安装日期
				</view>
				<view class="Mini_list_right">
					{{data.BeganRunDate  }}
				</view>
			</view>
			
			<view class="Mini_list">
				<view class="Mini_list_left">
					保质期
				</view>
				<view class="Mini_list_right">
					{{data.GuaranteeDeadline  }}
				</view>
			</view>
	

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:this.$store.state.clickindex
			};
		},
		created() {
			console.log(this.data)
		}
	}
</script>

<style lang="scss" scoped>
.box{
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
				font-size: 13px;
				color: #555555;
			}
	
			.Mini_list_right {
				width: 75%;
				height: 100%;
				color: #808080;
				float: left;
				overflow: hidden;
				font-size: 13px;
			}
		}
	}
}
</style>
