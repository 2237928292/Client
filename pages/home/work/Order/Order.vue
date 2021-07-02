<template>
	<!-- 订单管理 -->
	<view class="box">
		<!-- 头部切换 -->
		<view class="top_Tab">
			<view v-for="(item,index) in tabClick" :class="{tab : state == item.index }" :key="index" @tap="TabCli(item)">
				{{item.text}}
			</view>
		</view>
		<!-- LIST -->
		<view class="List" v-if="data[0]">

			<u-card v-if='data[0]' v-for="(item,indexs) in data" :key="indexs" :title="item.CusName" :sub-title="item.StateStr"
			 class='card'>
				<view style="margin: -5px;" slot="body">
					<view>
						{{ item.SOCode  }}
					</view>
				</view>
				<view class="" slot="foot">
					<u-icon name="hourglass-half-fill" size="34" color="" :label="item.CreateDateStr"></u-icon>
					<span style='float: right;'>
						<button @tap="miniClick(item)" v-if="!(item.State == 1 || data.State == 0 || item.State == 2)" size="mini">查看</button>
						<button @tap="miniClicks(item)" v-if="item.State == 1 || data.State == 0" type='warn' size="mini">撤单</button>
						<button @tap="miniClicks(item)" v-if="item.State == 2" type='primary' size="mini">确认报价</button>
					</span>
				</view>
			</u-card>


		</view>
		<!-- 没有数据 -->
		<view v-if="!data[0]" class="ListNo">
			这里空空的
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: -1,
				data: [], //数据
				search: '', //检索项 默认为空
				tabClick: [{
						text: '全部',
						index: -1
					},
					{
						text: '待报价',
						index: 1
					},
					{
						text: '待确认',
						index: 2
					},
					{
						text: '待付款',
						index: 3
					},
					{
						text: '待收货',
						index: 4
					},
					{
						text: '已结单',
						index: 5
					}

				]
			};
		},
		onBackPress() {
			uni.switchTab({
				url: "../../home"
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
					url: this.$store.state.url + 'SO/GetSOsForCus',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						search: this.search, //检索项默认为空
						numPerPage: 100,
						pageNum: 1,
						orderField: '',
						orderDirection: '',
						status: this.state, //请求的状态，  全部-1 待报价1 待确认2 待付款3 待收货4 已结单5
					}
				}
				this.$http(obj).then((res) => {
					this.data = res.Data.Dtos
				})
			},
			// Tab切换
			TabCli: function(item) {
				if (this.state == item.index) {
					return false
				}
				this.state = item.index
				this.init()
			},
			// 粗略查看
			miniClick: function(item) {
				this.$store.state.miniClick = item
				this.$store.state.States = false
				uni.navigateTo({
					url: './Orders'
				})
			},
			//进行操作
			miniClicks: function(item) {
				this.$store.state.miniClick = item
				this.$store.state.States = true
				uni.navigateTo({
					url: './Orders'
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/scss/work/Order/Order.scss";
</style>
