<template>
	<view class="box">
	
		<!-- 故障描述 -->
		<view class="Customer" v-if="Data.RepairBase">
			<view class="Customer_Top">
				故障描述
			</view>
			<view class="textarea">
				<textarea class="textarea" :value="Data.RepairBase.FaultDescribe" placeholder="" auto-height />
				</view>
		</view>
		
		
		
		<view class="Customer" style="width: 100%;" v-if="Data.RepairFaultImages">
			<view class="Customer_Top">
				图片&视频
				<!-- <button type="primary" style="float: right;margin: 5px;" size="mini" v-if="Videoshow" @tap="show()">查看视频附件</button> -->
			</view>
			<view class="upload"  >
				<scroll-view scroll-y="true" >
					
					<view class="imgVideo" v-for="(upload,index) in Data.RepairFaultImages" :key="index">
						<image v-if="upload.Type == 'picture'" 	class="uploade-img" @tap="yulan(upload.Path)"	:src="upload.Path" ></image>
					</view>
					<view  class="imgVideo" >
						<image class="uploade-img" v-if="Videoshow" @tap="show()" :src=icon  mode=""></image>
					</view>
				</scroll-view>
			</view>
			<block>
				
			</block>
		</view>
		<view class="Amier" v-if="Data.RepairBase">
			<view class="left">报修单号</view>
			<view class="right">{{Data.RepairBase.RepairCode}}</view>
		</view>
		<!-- 客户信息 -->
		<view class="Customer" v-if="Data.RepairMan">
			<view class="Customer_Top">
				客户信息
			</view>

			<view class="Mini_list">
				<view class="Mini_list_left">
					客户名称
				</view>
				<view class="Mini_list_right">
					{{Data.RepairBase.CusName}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					报修人
				</view>
				<view class="Mini_list_right">
					{{Data.RepairMan.RepairName}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					英文名
				</view>
				<view class="Mini_list_right">
					{{Data.RepairMan.RepairNameEn }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					手机号码
				</view>
				<view class="Mini_list_right">
					{{Data.RepairMan.MobilePhone }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					固定号码
				</view>
				<view class="Mini_list_right">
					{{Data.RepairMan.Tel }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					邮箱
				</view>
				<view class="Mini_list_right">
					{{Data.RepairMan.Email }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					公司地址
				</view>
				<view class="Mini_list_right">
					{{Data.RepairMan.AddressDetail }}
				</view>
			</view>
		</view>
		<!-- 设备信息 -->
		<view class="Customer" v-if="Data.RepairDeviceInfo">
			<view class="Customer_Top">
				设备信息
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					产品编号
				</view>
				<view class="Mini_list_right">
					{{Data.RepairDeviceInfo.DeviceCode }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					序列号
				</view>
				<view class="Mini_list_right">
					{{Data.RepairDeviceInfo.DeviceSN }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					设备品牌
				</view>
				<view class="Mini_list_right">
					{{Data.RepairDeviceInfo.DeviceBrand }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					设备描述
				</view>
				<view class="Mini_list_right">
					{{Data.RepairDeviceInfo.DeviceDesc }}
				</view>
			</view>
		</view>

		<!-- 工单信息 -->
		<view class="Customer" v-if="Data.RepairCosts">
			<view class="Customer_Top">
				工单信息
			</view>
			<view class="textarea">
				<view class="Quote" v-for="(itema,indexss) in Data.RepairWos" :key="indexss">
					<view class="Quote_Top">
						工单编号
						<text>{{itema.WoCode}}</text>
					</view>
					<view class="Quote_Top">
						工单状态
						<text>{{itema.WoStateStr}}</text>
					</view>
					<button v-if="itema.WoState == 5" type="primary" size="mini" @tap="WoCode(itema,indexss)">审核报价</button>
				</view>
				<view class="Customer_Top_Code">
					费用清单
				</view>
				<view class="Customer_Top_Code" v-for="(items,indexxx) in Data.RepairCosts" :key='indexxx + 1'>
					<view class="Customer_Top_Code_left">
						{{items.WoCode}}
					</view>
					<view class="Customer_Top_Code_right">
						￥{{items.Cost}}
					</view>
				</view>
				<!-- 总计 -->
				<view class="Customer_Top_Code">
					<view class="Customer_Top_Code_left">
						总计
					</view>
					<view class="Customer_Top_Code_right">
						￥{{WoCodeCost}}
					</view>
				</view>

			</view>
		</view>
		<!-- 保修信息 -->
		<view class="Customer CustomerBOttom" v-if="Data.RepairBase">
			<view class="Customer_Top">
				工单信息
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					申请日期
				</view>
				<view class="Mini_list_right">
					{{Data.RepairBase.CreateDate }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					受理日期
				</view>
				<view class="Mini_list_right">
					{{Data.RepairBase.AcceptanceDate }}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					解决日期
				</view>
				<view class="Mini_list_right">
					{{Data.RepairBase.OverOrderDate }}
				</view>
			</view>
		</view>


	
		<!-- 图片 -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data: {},
				WoCodeCost:0,
				Videoshow:false,
				icon:require('../../../../../static/icon/video.png'),
			};
		},
		created() {
			this.init()
		},
		mounted() {
			
		},
		methods: {
			// 视频
			show: function(){
				// this.shows = true
				this.$store.state.textVideo = this.Data.RepairFaultImages
				uni.navigateTo({
					url:"./textVideo"
				})	
			},
			// 初始化
			init: function() {
				var obj = {
					url: this.$store.state.url + 'WO/GetRepairDetailInfo',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						repairId: this.$store.state.detailed,
					}
				}
				this.$http(obj).then((res) => {
					this.Data = res.Data
					console.log(this.Data)
					//只算了单个数量
					if(this.Data.RepairCosts){
						for(var i = 0; i < this.Data.RepairCosts.length; i++){
							this.WoCodeCost += this.Data.RepairCosts[i].Cost
						}
					}
					for(var i = 0; i < this.Data.RepairFaultImages.length; i ++){
						if(this.Data.RepairFaultImages[i].Type == 'video'){
							this.Videoshow = true
						}
					}
					
				})
			},
			WoCode:function(item,index){
				this.$store.state.RepairCosts[0] = item
				this.$store.state.RepairCosts[1] = this.Data.RepairCosts[index]
				uni.navigateTo({
					url:"./RepairCosts"
				})
			},
			yulan: function(item) {
				var xx = []
				xx[0] = item
				console.log(xx)
				uni.previewImage({
					urls: xx
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.box {
		// 视频
		.video{
			position: absolute;
			width: 100%;
			height: 100%;
			background-color: #FFFFFF;
			z-index: 99;
		}

		// 头部 编号
		.Amier {
			width: 100%;
			height: 40px;
			background-color: #FFFFFF;
			line-height: 40px;
			padding-left: 20px;
			padding-right: 20px;
			margin-top: 10px;
			box-sizing: border-box;

			view {
				width: 50%;
				height: 100%;
				float: left;
			}

			.right {
				float: right;
				text-align: right;
				color: #808080;
			}
		}

		//客户信息
		.CustomerBOttom{
			margin-bottom: 30px;
		}
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
	}
	
	.upload {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
		.imgVideo{
			position: relative;
			.uploade-img {
				width: 210upx;
				height: 210upx;
				float: left;
			}
			.uploade-video{
				
			}
		}
		
		
	}

</style>
