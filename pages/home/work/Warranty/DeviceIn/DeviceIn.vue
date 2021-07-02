<template>
	<view class="box">

		<view class="cu-form-group">
			<view class="title">车企品牌</view>
			<view class="uni-input">{{DtoOneText}}</view>
		</view>

		<view class="cu-form-group">
			<view class="title">设备种类</view>
			<picker @change="bindPickerChangeTwo" :range="DtoTwo">
				<view class="uni-input">{{ gradeTwos }}</view>
			</picker>
		</view>

		<view class="cu-form-group">
			<view class="title">设备品牌</view>
			<picker @change="bindPickerChangeThree" :range="DtoThree">
				<view class="uni-input">{{gradeThrees}}</view>
			</picker>
		</view>

		<view v-if="DeviceType" class="cu-form-group inputClass">
			<view class="title">型号</view>
			<picker @change="bindPickerChangeGetCusEqusByDeviceType" :value="indexf" :range="Dtos">
				<view class="uni-input">{{ gradef || Dtos[indexf]}}</view>
			</picker>
		</view>

		<view v-if="TextlistS" class="cu-form-group">
			<textarea class="Amier" name="" id="textarea" cols="30" rows="10" auto-height v-model="Textlist"></textarea>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Res: {}, //总数据
				Daara: [],

				DtoOne: [], //车品牌的集合
				DtoOneText: '请选择', //车品牌选择展示
				gradeOne: '', // id

				DtoTwo: [], //
				gradeTwos: '请选择',
				gradeTwo: '', // id


				DtoThreeS: [], //总集合
				DtoThree: [], //选择
				gradeThrees: '请选择',
				gradeThree: '', //id

				indexf: 0,
				Dtos: [],

				gradef: '请选择',
				DeviceType: false,
				TextlistS: false,
				Textlist: '描述',
				Boss: '',
				// 车企相关数据
				DtoOneList:[{
					"Id": "d470c23b-5c73-4ede-8771-c72da912c5ea",
					"Value": "宝马",
				}, {
					"Id": "32ac7aba-cabc-44f8-933d-a786d5f6234c",
					"Value": "保时捷",
				}, {
					"Id": "74a509f4-db3b-4940-b036-821ed3cddf19",
					"Value": "奔驰",
				}, {
					"Id": "0f5695a9-2cef-4ae0-85e8-d7ff25dbc425",
					"Value": "奥迪",
				}, {
					"Id": "4251fbe5-0b28-4152-8069-bbfd728ae8b5",
					"Value": "路虎",
				}],
			};
		},
		onShow() {
					
		},
		created() {
			// 根据登录时返回的数据判断用户车企类型
			let _this = this
			uni.getStorage({
			    key: 'Pros',
			    success: function (res) {
					console.log(res.data)
					_this.DtoOneText = res.data.Type
					for (var i = 0; i < _this.DtoOneList.length; i++) {
						if(_this.DtoOneList[i].Value == _this.DtoOneText){
							_this.gradeOne = _this.DtoOneList[i].Id
						}
					}
			    }
			});
			// 获取车企品牌以及设备种类
			_this.DeviceInInit()	
		},
		methods: {
			//车企品牌选项
			bindPickerChange: function(e) {
				this.gradeOne = this.Res.DtoOne[e.target.value].Id
				this.DtoOneText = this.DtoOne[e.target.value]
				this.GetCusEqus3ByDeviceType()
			},
			//设备种类
			bindPickerChangeTwo: function(e) {
				this.gradeTwo = this.Res.DtoTwo[e.target.value].Id
				this.gradeTwos = this.DtoTwo[e.target.value]
				this.GetCusEqus3ByDeviceType()
			},
			//选择设备
			bindPickerChangeThree: function(e) {
				this.gradeThree = this.DtoThreeS[e.target.value].Id
				this.gradeThrees = this.DtoThree[e.target.value]
				this.DataPackDeviceType()
			},
			// 选择型号
			bindPickerChangeGetCusEqusByDeviceType: function(e) {
				this.TextlistS = true
				this.gradef = ''
				this.Textlist = '[' + this.Daara[e.target.value].SN + ']' + this.Daara[e.target.value].Desc
				this.Boss = JSON.stringify(this.Daara[e.target.value])
			},
			//选择完品牌和种类后获取 设备
			GetCusEqus3ByDeviceType: function() {
				this.gradeThrees = '请选择'
				this.TextlistS = false
				this.DeviceType = false
				this.gradeThree = ''
				if (this.DtoOneText != '请选择' && this.gradeTwos != '请选择') {
					
					//选择完品牌和种类后调取设备品牌接口
					var obj = {
						url: this.$store.state.url + 'CRM/GetCusEqus3ByDeviceType',
						method: 'GET',
						header: this.$store.state.token,
						data: {
							gradeOne: this.gradeOne,
							gradeTwo: this.gradeTwo,
						}
					}
					this.$http(obj).then((res) => {
						if (res.Data.Dtos.length == 0) {
							uni.showToast({
								title: '暂无当前产品',
								icon: "none"
							})
							return false
						}
						this.DtoThree = []
						this.DtoThreeS = res.Data.Dtos
						for (var i = 0; i < res.Data.Dtos.length; i++) {
							this.DtoThree.push(res.Data.Dtos[i].Value)
						}
					})
				}
			},
			//初始接口   获取车企品牌和设备种类
			DeviceInInit: function() {
				var obj = {
					url: this.$store.state.url + 'Product/GetProductType12',
					method: 'GET',
					header: this.$store.state.token,
				}
				this.$http(obj).then((res) => {
					this.Res = res.Data
					console.log(res.Data)
					for (var i = 0; i < res.Data.DtoOne.length; i++) {
						this.DtoOne.push(res.Data.DtoOne[i].Value)
					}
					for (var i = 0; i < res.Data.DtoTwo.length; i++) {
						this.DtoTwo.push(res.Data.DtoTwo[i].Value)
					}

				})
			},
			//获取型号
			DataPackDeviceType: function() {
				if (this.gradeOne == '' || this.gradeTwo == '' || this.gradeThree == '') {
					return false
				}
				this.Dtos = []
				this.gradef = '请选择'
				this.TextlistS = false
				this.Boss = ''
				var obj = {
					url: this.$store.state.url + 'CRM/GetCusEqus4ByDeviceType',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						gradeOne: this.gradeOne,
						gradeTwo: this.gradeTwo,
						gradeThree: this.gradeThree,
					}
				}
				this.$http(obj).then((res) => {
					this.Daara = res.Data.Dtos
					for (var i = 0; i < res.Data.Dtos.length; i++) {
						this.Dtos.push(res.Data.Dtos[i].Desc)
					}
					console.log(this.Dtos.length)

					this.Dtos.length != 0 ? this.DeviceType = true : this.DeviceType = false
				})
			},
			//点击完成
			onNavigationBarButtonTap: function() {
				if (this.Boss) {
					this.$store.state.Grade = this.Boss
					uni.navigateTo({
						url: '../Warranty'
					})
				}else{
					uni.showToast({title: '请选择' ,icon: "none"})
				}

			},
		}
	}
</script>

<style lang="scss" scoped>
	.Amier {
		font-size: 12px;
	}
</style>
