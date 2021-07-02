<template>
	<view class="boxs">
		<view class="titleTopitemsxx">
			<view class="topTitle">
				<view @tap="statefunction(-1,0)" :class="{bule : state == -1 }">全部</view>
				<view @tap="statefunction(1,1)" :class="{bule : state == 1 }">预定中</view>
				<view @tap="statefunction(7,2)" :class="{bule : state == 7 }">已收款</view>
				<view @tap="statefunction(5,3)" :class="{bule : state == 5 }">已出库</view>
				<view @tap="statefunction(6,4)" :class="{bule : state == 6 }">已发货</view>
				<view @tap="statefunction(2,5)" :class="{bule : state == 2 }">已归还</view>
			</view>
			<view class="bottomtitle">
				<u-search placeholder="请输入检索项" v-model="search" @change='init()'  @search='init()'  @custom='init()'  ></u-search>
			</view>
		</view>
		
		<u-card v-for="(item,index) in Data" :key='index'  title-size='20rpx'
		  style='border: 1px solid #F0AD4E;'
		  
		  :title="item.CusName" :sub-title="item.ReserveDate | splititrm "  @tap='MsgXi(item)'>
			<view class="" slot="body">
				{{item.RecCode}}
				<u-tag  v-if='item.StateStr == "预定中" ' :text="item.StateStr" type='success' size='mini' style='float: right;' mode="light" />
				<u-tag  v-if='item.StateStr == "已归还" ' :text="item.StateStr" type='info' size='mini' style='float: right;' mode="light" />
				<u-tag  v-if='item.StateStr != "已归还" &&  item.StateStr != "预定中"' :text="item.StateStr" type='warning ' size='mini' style='float: right;' mode="light" />
			</view>
		</u-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum: 1, //第几页
				pagesize: 20, //每页显示条数
				getin: 0, //总条目数
				search: '',
				Data: [],
				state: -1,
				stateswiper: 0,
			};
		},
		created() {
			this.init()
		},
		onBackPress() { //自定义返回事件
			uni.navigateTo({
				url: "./lease",
			})
			return true
		},
		onReachBottom: function(e) {
			console.log('0000')
			this.pageNum += 1
			this.init()
		},
		filters: {
		  splititrm: function (value) {
		    return value.split('T')[0]
		  }
		},
		methods: {
			init: function() {
				var obj = {
					method: 'GET',
					url: this.$store.state.url + 'LeaseTool/GetLeaseToolRecs',
					header: this.$store.state.token,
					data: {
						pageNum: this.pageNum,
						numPerPage: this.pagesize,
						orderField: "",
						orderDirection: "",
						search: this.search, // 检索项
						state: this.state, //固定传0
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data.Dtos)
					
					if(this.Data[0]){
						for (let i = 0; i < res.Data.Dtos.length; i++) {
							this.Data.push(res.Data.Dtos[i])
						}
					}else{
						this.Data = res.Data.Dtos
					}
				})
			},	
		
			// 点击循环
			MsgXi: function(item) {
				console.log(item.ID)
				this.$store.state.shoppingID = item.ID
				uni.navigateTo({
					url:'./leasemsglook'
				})
			},
			// 切换状态
			statefunction: function(item, index) {
				this.search = ''
				this.Data=[]
				this.state = item
				this.pagesize = 20,
				this.stateswiper = index
				this.init()
			},
		
		},

	}
</script>

<style lang="scss" scoped>
	.boxs {
		padding-top: 80px;
		box-sizing: border-box;



		.Amier {
			width: 95%;
			height: 70px;
			background-color: #FFFFFF;
			margin: auto;
			border-radius: 10px;
			margin-top: 10px;
			border: 1px solid #e3dfdf;
			margin: auto;
			border-radius: 5px;
			margin-top: 10px;

			-webkit-box-shadow: 3px 3px 6px #c1c1c1;
			-moz-box-shadow: 3px 3px 6px #c1c1c1;
			box-shadow: 3px 3px 6px #c1c1c1;

			.TitleTop {
				width: 100%;
				height: 50%;
				font-weight: bold;
			}

			.left50 {
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
	}




	.titleTopitemsxx {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 80px;
		background-color: #007AFF;
		z-index: 100;

		.topTitle {
			width: 100%;
			height: 30px;
			background-color: #FFFFFF;

			view {
				width: calc(100% / 6);
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
		.bottomtitle{
			width: 100%;
			height: 50px;
			background-color: #FFFFFF;
			padding: 5px;
			box-sizing: border-box;
			input{
				width: 75%;
				border: 0.5px solid #ccc;
				border-radius: 5px;
				height: 30px;
				float: left;
			}
			button{
				float: right;
			}
		}
	}
</style>
