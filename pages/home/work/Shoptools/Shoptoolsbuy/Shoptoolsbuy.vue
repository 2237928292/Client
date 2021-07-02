<template>
	<view class="box">
		<!-- 循环 清单 -->
		<view class="item" v-for="(item,index) in Data" :key="index" style="position: relative;padding-left: 90px;box-sizing: border-box;">
			<image style="display: block;width: 80px;height: 80px;position: absolute;top: 0;left: 0;" :src=" 'http://icms.inchwell.com.cn/File/CusTool/' + item.ImageUrl" mode=""></image>
			<!-- 右侧描述 -->
			<view class="right">
				<view class="Amier">{{item.ProductCode}}</view>
				<view class="Amier">{{item.ProductDesc}}</view>
				<view class="Amier">库位：{{item.Storehouse}}</view>
				<view class="icon" @tap="dele(index)"></view>
			</view>
		</view>
		<!-- 确认选择 -->
		<view class="AssemblyUnitPrice">
			<label class="label">

			</label>
			<button class="fu" @tap="trueinp()">提交清单</button>

		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data: [],
				Datatrue: false,
				data: this.$store.state.results,
				disabled: true,
				httpindex: 0,
				Code: this.$store.state.resultsCodeQR,
			};
		},
		created() {

			this.init()
			// this.GetCusToolByHouse()
		},
		methods: {
			init: function() {
				if (this.$store.state.resultsCodeQR) {
					this.Data = this.$store.state.results
					console.log(this.$store.state.results)
					return false
				}
				if (this.httpindex == this.data.length) {
					this.Data = this.data
					this.Datatrue = true
					return false
				}
				var obj = {
					method: 'GET',
					url: this.$store.state.url + 'CusTool/GetCusToolByToolPro',
					header: this.$store.state.token,
					data: {
						cusId: this.$store.state.CusId,
						toolProId: this.data[this.httpindex].ID
					}
				}
				this.$http(obj).then((res) => {

					this.data[this.httpindex]['Storehouse'] = res.Data.Storehouse
					this.httpindex++
					this.init()
				})
			},
			// 扫码   扫码向当前Data进行补充
			onNavigationBarButtonTap() {
				var that = this
				uni.scanCode({
					success: function(res) {
						// 通过库位查找物品
						that.GetCusToolByHouse(res.result)
					}
				});
			},
			// 删除
			dele: function(i) {
				console.log(i)
				this.data.splice(i, 1)
			},
			// 完成订单
			trueinp: function() {
				uni.showToast({
					title: "xxxxx",
					icon: "none"
				})
				console.log(this.Data)
				if (this.Data.length == 0) {
					uni.showToast({
						title: "请选择物品",
						icon: "none"
					})
					return false
				}
				// 生成需要的list
				var List = []
				for (var i = 0; i < this.Data.length; i++) {
					List.push(this.Data[i].ID)
				}
				var obj = {
					method: 'POST',
					url: this.$store.state.url + 'CusTool/CreateBorrowRec',
					header: this.$store.state.token,
					data: {
						cusId: this.$store.state.CusId,
						CurrentUserId: this.$store.state.Userid,
						Proids: List
					}
				}
				this.$http(obj).then((res) => {
					// 跳转到列表页
					uni.navigateTo({
						url: "/pages/home/work/Shoptools/Shoptoollist/Shoptoollist",
					});
				})
			},
			// 库位查找物品
			GetCusToolByHouse: function(sio) {
				uni.showToast({
					title: sio,
					icon: "none"
				})
				var obj = {
					method: 'GET',
					url: this.$store.state.url + 'CusTool/GetCusToolByHouse',
					header: this.$store.state.token,
					data: {
						cusId: this.$store.state.CusId,
						storehouse: sio
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data)
					// 跳转到列表页
					if (res.Code == 0) {
						if(this.Data.length > 0){
							for(var i = 0; i < this.Data.length; i ++){
								if(this.Data[i].Storehouse   == res.Data.Storehouse ){
									this.msg()
									return false
								}
							}
						}
						console.log(res.Data)
						this.Data.push(res.Data)
					}
				})
			},
			msg:function(){
				uni.showToast({title: "当前清单已包含此库位",icon: "none"})
			}
		},


	}
</script>

<style lang="scss" scoped>
	@import '@/scss/work/Shoptools/Shoptoolsbuy.scss';
</style>
