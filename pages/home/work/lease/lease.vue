<template>
	<view class="boxx">
		<view class="topsearch">
			<u-search placeholder="请输入检索项" v-model="search" @change='inits()'  @search='inits()'  @custom='inits()'  ></u-search>
		</view>
		<view v-if="!ListNone" class="zanwu" >
			贵司暂未开通工具管理业务 <br> 如需开通，请联系英之杰天祥
		</view>
		<view v-if="!ListNone1" class="zanwu" >
			未查询到工具！
		</view>
		
			<u-card v-for="(item,index) in Data" :key='index'  title-size='20rpx' 
			  style='border: 1px solid #F0AD4E;'
			  
			  :title="item.StateStr" :sub-title="item.BMWCode"  @tap='addbug(item)'>
				<view class="" slot="body">
					{{item.Describe}}
					<u-tag text="点击加入购物车" size='mini' style='float: right;' mode="light" />
				</view>
			</u-card>
		
		
		<!-- 悬浮购物车 -->
		<view class="gwc"  @click="shoppingCartlink()" >
			<u-badge size="mini" type="success" :count='shoppingCartlength' ></u-badge>
			<image src="../../../../static/icon/gouwuche.png" mode=""></image>
		</view>



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
				shoppingCart:[],
				shoppingCartlength:0,
				ListNone:true,
				ListNone1:true,
			};
		},
		created() {
			this.init()
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: './leaseList'
			})
		},
		onReachBottom: function(e) {
			this.pageNum += 1
			this.init()

		},
		onBackPress() { //自定义返回事件
			uni.switchTab({
				url: "../../home",
			})
			return true
		},
		methods: {
			init: function() {
				var obj = {
					method: 'GET',
					url: this.$store.state.url + 'LeaseTool/GetLeaseTools',
					header: this.$store.state.token,
					data: {

						pageNum: this.pageNum,
						numPerPage: this.pagesize,
						orderField: "",
						orderDirection: "",
						search: this.search, // 检索项
						state: 0, //固定传0
					}
				}
				this.$http(obj).then((res) => {
					this.Data[0] ? this.Data = this.Data.concat(res.Data.Dtos) : this.Data = res.Data.Dtos
					if(this.Data.length == 0){
						this.ListNone = false
						this.ListNone1 = true
					}
				})
			},
			inits: function() {
				this.pageNum = 1
				this.Data = []
				var obj = {
					method: 'GET',
					url: this.$store.state.url + 'LeaseTool/GetLeaseTools',
					header: this.$store.state.token,
					data: {

						pageNum: this.pageNum,
						numPerPage: this.pagesize,
						orderField: "",
						orderDirection: "",
						search: this.search, // 检索项
						state: 0, //固定传0
					}
				}
				this.$http(obj).then((res) => {
					this.Data[0] ? this.Data = this.Data.concat(res.Data.Dtos) : this.Data = res.Data.Dtos
					if(this.Data.length == 0){
						this.ListNone = true
						this.ListNone1 = false
					}else{
						this.ListNone1 = true
						this.ListNone = true	
					}
					
					
				})
			},
			// 点击添加购物车
			addbug:function(item){
				
				for (let i = 0; i < this.shoppingCart.length; i++) {
					if(this.shoppingCart[i].ID == item.ID){
						this.$title('您已添加此物品！')
						return false
					}
				}
				this.shoppingCart.push(item)
				this.shoppingCartlength = this.shoppingCart.length
				this.$title('添加成功！')
			},
			shoppingCartlink:function(){
				if(this.shoppingCart.length == 0){
					this.$title('您还没有选择物品！')
					return false
				}
				this.$store.state.shoppingCart = this.shoppingCart
				uni.navigateTo({
					url:'./shoppingCart'
				})
			}
		}
	}
</script>

<style lang="scss">
	.boxx {
		width: 100%;
		height: 100%;
		padding-top: 50px;
		box-sizing: border-box;
		position: relative;
		
		.zanwu{
			width: 100%;
			height: 100%;
			color: red;
			// line-height: 100px;
			padding-top: 100px;
			box-sizing: border-box;
			line-height: 30px;
			font-size: 20px;
			text-align: center;
		}
		// 检索框
		.topsearch {
			position: fixed;
			top: 0;
			right: 0;
			width: 100%;
			height: 50px;
			background-color: #FFFFFF;
			padding-left: 20px;
			padding-top: 10px;
			padding-right: 20px;
			box-sizing: border-box;
			z-index: 100;
		}

		// 循环的item
		.item {
			width: 98%;
			height: 60px;
			border: 1px solid #e3dfdf;
			margin: auto;
			border-radius: 5px;
			margin-top: 10px;

			-webkit-box-shadow: 3px 3px 6px #c1c1c1;
			-moz-box-shadow: 3px 3px 6px #c1c1c1;
			box-shadow: 3px 3px 6px #c1c1c1;

			.leftitem {
				width: calc(100% - 60px);
				height: 100%;
				float: left;
				// 上部分
				.itemTop {
					width: 100%;
					height: 50%;
					padding-left: 10px;
					overflow: hidden;
					box-sizing: border-box;
					line-height: 30px;
					font-weight: bold;
					font-size: 12px;
				}
				.itemBottom {
					width: 100%;
					height: 50%;
					padding-left: 10px;
					padding-right: 10px;
					overflow: hidden;
					box-sizing: border-box;
					line-height: 30px;
					font-size: 12px;
					span {
						color: #939393;
					}
					.span {
						float: right;
						color: #000000;
					}
				}
			}
			.rightitem {
				width: 60px;
				height: 100%;
				float: left;
				padding: 5px;
				box-sizing: border-box;
			}
		}
		.gwc{
			width: 70px;
			height: 70px;
			position: fixed;
			bottom: 20px;
			right: 60px;
			border-radius: 5px;
			background-color: #d5d5d5;
			border-radius: 50%;
			padding: 8px 8px 5px 5px;
			border: 3px solid #4CD964;
			box-sizing: border-box;
			z-index: 100;
			image{
				width: 50px;
				height: 50px;
				float: right;
			}
			.jioabiao{
				position: absolute;
				color: red;
				left: 3px;
				bottom: 15px;
				font-weight: bold;
				font-size: 20px;
			}
		}
	}
</style>
