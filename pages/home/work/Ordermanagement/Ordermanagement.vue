<template>
	<view class="box">
		<view class="topTitle">
			<view @tap="statefunction(0)" :class="{bule : state == 0 }">全部</view>
			<view @tap="statefunction(1)" :class="{bule : state == 1 }">申请中</view>
			<view @tap="statefunction(2)" :class="{bule : state == 2 }">已受理</view>
			<view @tap="statefunction(3)" :class="{bule : state == 3 }">已结单</view>
			<view @tap="statefunction(4)" :class="{bule : state == 4 }">已撤单</view>
		</view>
		<view class="Amierbox">
			<swiper  :duration="1000" :current="state" @change="currentNoe" >
				<swiper-item v-for="(itemdd,indexdd) in 5" :key="indexdd" >
					<u-card v-if='Data[0]' v-for="(item,index) in Data" :key="index" @tap="MsgXi(item)"  
					:title="item.CusName" :sub-title="item.StatusStr"
					 class='card'>
						<view style="margin: -5px;" slot="body">
							<view>
								{{ item.RepairCode  }}
							</view>
						</view>
						<view class="" slot="foot">
							<u-icon name="hourglass-half-fill" size="34" color="" :label="item.CreateDate"></u-icon>
							
						</view>
					</u-card>
					<!-- <view class="Amier" v-for="(item,index) in Data" :key="index" @tap="MsgXi(item)" >
						<view class="TitleTop">{{item.CusName}}</view>
						<view class="left50">{{item.RepairCode}}</view>
						<view>{{item.CreateDate}}</view>
						<view>{{item.StatusStr}}</view>
					</view> -->
				</swiper-item>
			</swiper>
			
			
			
			
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: 0,
				numPerPage: 100,
				Data: [],
			};
		},
		onBackPress() {   //自定义返回事件
			uni.switchTab({
				url: "../../home",
			})
			return true
		},
		onLoad(res) {     //接受上个页面的参数
			if(res.Code){
				this.state = res.Code
			}
		},
		onShow() {       //复现
			this.init()
		},
		
		methods: {
			currentNoe:function(event){
				console.log(event.detail.current)
				this.state = event.detail.current
				this.init()
			},
			MsgXi:function(item){
				console.log(item)
				this.$store.state.detailed = item.RepairId
				uni.navigateTo({
					url:'./text/text'
				})
			},
			init: function() { //初始化
				var obj = {
					url: this.$store.state.url + 'WO/GetRepareMinis',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						numPerPage: this.numPerPage,
						pageNum: 1,
						orderField: '',
						orderDirection: '',
						state: this.state,
						search: '',
					}
				}
				this.$http(obj).then((res) => {
					this.Data = res.Data.Dtos
					for(var i = 0; i < this.Data.length; i ++){
						this.Data[i].CreateDate = this.Data[i].CreateDate.split('T')[0]
					}
				})
			},
			statefunction:function(i){   //切换状态
				this.state = i
				this.init()
			}
		},
		onReachBottom: function(e) {   //触底事件    未触发
		console.log('触底')
			this.numPerPage += 10
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.box {
		// background-color: #FFFFFF;
		background-color: #efefef;
		
		.topTitle {
			width: 100%;
			height: 30px;
			background-color: #FFFFFF;

			view {
				width: 20%;
				height: 100%;
				background-color: #dadada;
				float: left;
				text-align: center;
				line-height: 30px;
				font-weight: bold;
				color: #FFFFFF;
			}

			.bule {
				color: #007AFF;
			}
		}

		.Amierbox {
			width: 100%;
			height: calc(100% - 30px);
			overflow: auto;
			box-sizing: border-box;
			swiper {	
				height: 100%;
				.Amier {
					width: 95%;
					height: 70px;
					background-color: #FFFFFF;
					margin: auto;
					border-radius: 10px;
					margin-top: 10px;
					
					.TitleTop {
						width: 100%;
						height: 50%;
						font-weight: bold;
					}
					
					.left50{
						width: 50%;
					}
				
					view {
						width: calc(100% / 4);
						height: 50%;
						float: left;
						line-height: 35px;
						padding-left: 5px;
						box-sizing: border-box;
					}
				}
				swiper-item {
					overflow: auto;
				}
			}
			
		}


	}
</style>
