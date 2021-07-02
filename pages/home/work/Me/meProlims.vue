<template>
	<view class="box">
		<!-- 展示信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				{{data.Name}}
			</view>
			
			
			
			<view class="Mini_list">
				<view class="Mini_list_left">
					英文名
				</view>
				<view class="Mini_list_right">
					{{data.NameEn}}
				</view>
			</view>
			
			<view class="Mini_list">
				<view class="Mini_list_left">
					手机
				</view>
				<view class="Mini_list_right">
					{{data.Mobile}}
				</view>
			</view>
			
			<view class="Mini_list">
				<view class="Mini_list_left">
					电话
				</view>
				<view class="Mini_list_right">
					{{data.Tel}}
				</view>
			</view>
			
			<view class="Mini_list">
				<view class="Mini_list_left">
					邮箱
				</view>
				<view class="Mini_list_right">
					{{data.Email}}
				</view>
			</view>
			
			<view class="Mini_list">
				<view class="Mini_list_left">
					地址
				</view>
				<view class="Mini_list_right">
					{{data.Address}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:this.$store.state.mePromes
			};
		},
		mounted() {
			console.log(this.data)
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/scss/work/Order/Orders.scss";
</style>
