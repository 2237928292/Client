<template>
	<!-- 客户设备 -->
	<view class="box">
		<!-- 设备列表 -->

		<u-card v-if="Dtos[0]" v-for="(item,index) in Dtos" @tap="click(item)" :key="index" :title="item.Brand" :sub-title="item.SN"
		 class='card'>
			<view style="margin: -5px;" slot="body">

				<view>
					{{ item.Desc }}
				</view>

			</view>
			<view class="" slot="foot">
				<u-icon name="chat-fill" size="34" color="" :label="item.ProdcutCode"></u-icon>
			</view>
		</u-card>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				search: '', //检索项   暂时传空
				Dtos: [],
			};
		},
		created() {
			this.init()
		},
		methods: {
			// 初始化  
			init: function() {
				var obj = {
					url: this.$store.state.url + 'CRM/GetCustomerEqus',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						search: this.search,
						numPerPage: 100,
						pageNum: 1,
						orderField: '',
						orderDirection: '',
					}
				}
				this.$http(obj).then((res) => {

					this.Dtos = res.Data.Dtos
				})
			},
			// 点击查看详情
			click: function(item) {
				this.$store.state.clickindex = item
				uni.navigateTo({
					url: './Customerequipments/Customerequipments'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		padding-top: 15px;
		box-sizing: border-box;
		background-color: #e7e7e7;
	}
</style>
