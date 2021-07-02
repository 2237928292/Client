<template>
	<view class="box">
		<view class="top">
			<!-- <image src="../../../../static/icon/Sao.png" mode="" @tap="onNavigationBarButtonTapfun()"></image> -->
			<input type="text" value="" v-model="search" />
			<button type="primary" size="mini" @tap="searchs()">检索</button>
		</view>
		<!-- 中 -->
		<view class="item" style="padding-left: 60px;box-sizing: border-box;position: relative;" v-for="(item,index) in result" :key='index'>
			<image style="display: block;width: 55px;height: 55px;position: absolute;top: 0;left: 0;" :src=" 'http://icms.inchwell.com.cn/File/CusTool/' + item.ImageUrl" mode=""></image>
			<view class="leftitem">
				<view class="itemTop">
					{{item.ProductDesc}}
				</view>
				<view class="itemBottom">
					<span>{{item.ToolLabel}}</span>
					<span class='span'>{{item.ProductCode}}</span>
				</view>
			</view>
			<view class="rightitem">
				<image @tap="addbug(item)" src="../../../../static/icon/addbug.png" mode="" style="width: 100%;height:100%">
				</image>
			</view>
		</view>

		<!-- 悬浮购物车 -->
		<view class="gwc" @click="shoppingCartlink()">
			<view class="jioabiao">
				{{this.results.length}}
			</view>
			<image :src="gwc" mode=""></image>
		</view>
		<view v-if="this.result.length == 0" class="zanwu" >
			未查询到本店工具！
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				result: [], //数据
				results: [], //选择的待定数据
				delBtnWidth: 100, //删除按钮宽度单位（rpx）
				startX: '',
				toolsnumber: 0, //已选工具数量
				search: '', //查询输入
				gwc: require('../../../../static/icon/gouwuche.png')
			};
		},
		created() {
			this.initdata()
			console.log(this.gwc)
		},
		// 跳转列表
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: "/pages/home/work/Shoptools/Shoptoollist/Shoptoollist",
			});
		},
		methods: {
			addbug: function(item) {
				for (let i = 0; i < this.results.length; i++) {
					if (this.results[i].ID == item.ID) {
						this.$title('您已添加此物品！')
						return false
					}
				}
				this.results.push(item)
			},
			// 扫码获得库位	
			// onNavigationBarButtonTapfun: function() {
			// 	var that = this
			// 	uni.scanCode({
			// 		success: function(res) {
			// 			that.GetCusToolByHouse(res.result)
			// 		}
			// 	});
			// },
			// 初始接口
			initdata: function() {
				var obj = {
					method: 'GET',
					url: this.$store.state.url + 'CusTool/GetTopCusTool',
					header: this.$store.state.token,
					data: {
						cusId: this.$store.state.CusId,
					}
				}
				this.$http(obj).then((res) => {
					var asd = res.Data
					for (var i = 0; i < asd.length; i++) {

						asd[i]['txtStyle'] = '0px'
						asd[i]['trueAndFalses'] = 'background:#fff0'
						asd[i]['click'] = '选择'
						asd[i]['clickstyle'] = 'background:#00aaff'
					}
					this.result = asd
					console.log(this.result)

				})
			},
			// 检索
			searchs: function() {
				var obj = {
					method: 'GET',
					url: this.$store.state.url + 'CusTool/GetCusToolObjects',
					header: this.$store.state.token,
					data: {
						cusId: this.$store.state.CusId,
						search: this.search,
						pageNum: 1,
						numPerPage: 100,
						orderField: '',
						orderDirection: '',
					}
				}
				this.$http(obj).then((res) => {
					console.log(res.Data.Dtos)
					var asd = res.Data.Dtos

					for (var i = 0; i < asd.length; i++) {

						asd[i]['txtStyle'] = '0px'
						asd[i]['trueAndFalses'] = 'background:#fff0'
						asd[i]['click'] = '选择'
						asd[i]['clickstyle'] = 'background:#00aaff'
					}
					this.result = asd
					console.log(this.result)
				})
			},
			//
			// touchS: function(e) {
			// 	// console.log('touchS')
			// 	if (e.touches.length == 1) {
			// 		//设置触摸起始点水平方向位置
			// 		this.startX = e.touches[0].clientX
			// 		console.log(this.startX)
			// 	}
			// },
			// touchM: function(e) {
			// 	console.log('1')
			// 	// console.log('touchM')
			// 	if (e.touches.length == 1) {
			// 		//手指移动时水平方向位置
			// 		var moveX = e.touches[0].clientX;
			// 		//手指起始点位置与移动期间的差值
			// 		var disX = this.startX - moveX;
			// 		var delBtnWidth = this.delBtnWidth;
			// 		var txtStyle = "";
			// 		if (disX == 0 || disX < 0) { //如果移动距离小于等于0，说明向右滑动，文本层位置不变
			// 		} else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
			// 			txtStyle = "left:-" + disX + "px";
			// 			if (disX >= delBtnWidth) {
			// 				//控制手指移动距离最大值为删除按钮的宽度
			// 				txtStyle = "left:-" + delBtnWidth + "px";
			// 			}
			// 		}
			// 		//获取手指触摸的是哪一项
			// 		var index = e.currentTarget.dataset.index;
			// 		var list = this.result;
			// 		list[index].txtStyle = txtStyle;
			// 		// console.log(list[index].txtStyle)
			// 		//更新列表的状态
			// 		this.result = list;
			// 	}
			// },
			// touchE: function(e) {
			// 	console.log('0')
			// 	// console.log('touchE')
			// 	if (e.changedTouches.length == 1) {
			// 		//手指移动结束后水平位置
			// 		var endX = e.changedTouches[0].clientX;
			// 		//触摸开始与结束，手指移动的距离
			// 		var disX = this.startX - endX;
			// 		var delBtnWidth = this.delBtnWidth;
			// 		//如果距离小于删除按钮的1/2，不显示删除按钮
			// 		var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
			// 		//获取手指触摸的是哪一项
			// 		var index = e.currentTarget.dataset.index;
			// 		var list = this.result;
			// 		list[index].txtStyle = txtStyle;
			// 		// console.log(list[index].txtStyle)
			// 		//更新列表的状态{
			// 		this.result = list
			// 	}
			// },
			// //点击选择按钮事件
			// trueclick: function(ii) {
			// 	// 判断是否已选  已选进入   
			// 	if (this.result[ii].trueAndFalses == 'background:#ffdf25') {
			// 		this.result[ii]['txtStyle'] = 'left:0px'
			// 		this.result[ii]['trueAndFalses'] = 'background:#fff0'
			// 		this.result[ii]['click'] = '选择'
			// 		this.result[ii]['clickstyle'] = 'background:#00aaff'
			// 		this.resultssahi()
			// 		return false
			// 	}
			// 	// 未选在此
			// 	this.result[ii]['txtStyle'] = 'left:0px'
			// 	this.result[ii]['trueAndFalses'] = 'background:#ffdf25'
			// 	this.result[ii]['click'] = '取消'
			// 	this.result[ii]['clickstyle'] = 'background:#e44f4f'
			// 	this.resultssahi()
			// },
			// // 筛选已选数据
			// resultssahi: function() {
			// 	this.results = []
			// 	for (var i = 0; i < this.result.length; i++) {
			// 		if (this.result[i].trueAndFalses == 'background:#ffdf25') {
			// 			this.results.push(this.result[i])
			// 		}
			// 	}
			// 	this.toolsnumber = this.results.length
			// },
			shoppingCartlink: function() {
				console.log(this.results)
				if (this.results.length == 0) {
					uni.showToast({
						title: "您还没有选择",
						icon: "none"
					})
					return false
				}
				this.$store.state.results = this.results
				this.$store.state.resultsCodeQR = false
				uni.navigateTo({
					url: "/pages/home/work/Shoptools/Shoptoolsbuy/Shoptoolsbuy",
				});
			},
			GetCusToolByHouse: function(sio) {
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
					// 跳转到列表页
					if (res.Code == 0) {
						console.log(res.Data)
						this.$store.state.results = []
						this.$store.state.results.push(res.Data)
						this.$store.state.resultsCodeQR = true
						uni.navigateTo({
							url: "/pages/home/work/Shoptools/Shoptoolsbuy/Shoptoolsbuy",
						});
					}
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	@import '@/scss/work/Shoptools/Shoptools.scss';
</style>
