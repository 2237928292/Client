<template>
	<view class="box">
		<!-- 报修人 -->
		<view class="cu-form-group">
			<view class="title">报修人</view>
			<input type="text" class="InputIcon" value="" v-model="WarrantData.Name" />
			<image @tap="AdWarrantypro" class="AssemblyUnitPriceIcon" src="../../../../static/icon/fangdajing.png" mode=""></image>
		</view>
		<!-- 手机号码 -->
		<view class="cu-form-group" style="paddingTop: 20px;">
			<view class="title bots">英文姓名</view>
			<input type="text" class="bots botss" value="" v-model="WarrantData.NameEn" />
			<view class="title bots">手机号码</view>
			<input type="text" class="bots botss" value="" v-model="WarrantData.Mobile" />
			<view class="title bots">固定电话</view>
			<input type="text" class="bots botss" value="" v-model="WarrantData.Tel" />
			<view class="title bots">电子邮箱</view>
			<input type="text" class="bots botss" value="" v-model="WarrantData.Email" />
			<view class="title ">详细地址</view>
			<input type="text" value="" class="botss" v-model="WarrantData.Address" />
		</view>
		<!-- 选择 -->
		<view class="cu-form-group">
			<view class="top">
				<view class="title">设备信息</view>
				<input type="text" class="bots InputIcon" @tap="DeviceIn()" value="" placeholder="选择" style="color: #333333;" v-model="DeviceInformation"
				 disabled />
			</view>
			<view class="top">
				<view class="title ">故障描述</view>
				<input type="text" value="" class="InputIcon" @tap="Faultdescr()" placeholder="选择" style="color: #333333;" v-model="this.$store.state.Faultdescription"
				 disabled />
			</view>

		</view>
		<view class="BeiZhu">备注:</view>
		<!-- 备注 -->
		<view class="cu-form-group">
			<textarea name="" id="" cols="30" rows="10" auto-height v-model="textarea"></textarea>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				WarrantData: {
					Name: '', //保修人
					NameEn: '', //英文名
					Mobile: '', //手机号码
					Tel: '', //固定电话
					Address: '', //详细地址
					Email: '', //电子邮箱
				},

				DeviceInformation: '', //设备信息
				DeviceInformationID: '', //客户设备iD
				Faultdescription: '', //故障描述
				textarea: '', //备注
				Antishake1: true,
				Antishake2: true,
				Video: 0, //视频上传成功数等于视频总数时返回上传成功
			};
		},
		onShow() { //返回刷新
			this.OKAdWarrantyproitem()
			if (this.$store.state.Sxolde) {
				this.init()
			}
		},
		onBackPress() { //自定义返回事件
			this.Clear()
			uni.switchTab({
				url: "../../home",
			})
			this.$store.state.Sxolde = false
			return true
		},
		onNavigationBarButtonTap: function() { //完成按钮    进行判断操作
			var Cust = this.$store.state.OKAdWarrantyproitem
			
			console.log(Cust.NameEn)
			
			if (Cust.Name == '') {
				this.showToast("请选择报修人")
				return false
			}
			if (Cust.NameEn == '' ||Cust.NameEn == undefined  ) {
				this.showToast("请输入客户英文名")
				return false
			}
			if (Cust.Mobile == '' ||Cust.Mobile == undefined  ) {
				this.showToast("请输入手机号")
				return false
			}
			
			
			
			
			Cust.Mobile = Cust.Mobile.replace(/\s/g, "");
			//对三段式电话进行处理
			
			if (!(/^[0-9]{11}$/.test(Cust.Mobile))) {
				this.showToast("手机号格式不正确")
				return false
			}
			
			
			
			
			if (Cust.Address == '' ||Cust.Address == undefined  ) {
				this.showToast("请输入地址")
				return false
			}
			if (this.DeviceInformation == '' ||this.DeviceInformation == undefined  ) {
				this.showToast("请选择设备")
				return false
			}
			if (this.$store.state.Faultdescription == '' ||this.$store.state.Faultdescription == undefined  ) {
				this.showToast("请输入故障描述")
				return false
			}
			if (!this.Antishake1) {
				return false
			} //防抖
			if (!this.Antishake2) {
				return false
			} //防抖

			this.Antishake1 = false
			this.Antishake2 = false
			var obj = {
				url: this.$store.state.url + 'WO/CusApplyRepair',
				method: 'POST',
				header: this.$store.state.token,
				data: {
					CustomerId: this.$store.state.CusId, //客户id
					RepairName: Cust.Name, //保修人
					RepairNameEn: Cust.NameEn, //报修人英文名
					MobilePhone: Cust.Mobile, //报修人手机号 
					Tel: Cust.Tel, //报修人电话
					Email: Cust.Email, //报修人邮箱 *
					AddressDetail: Cust.Address, //详细地址 *
					DeviceId: this.DeviceInformationID, //客户设备ID *
					FaultDescription: this.$store.state.Faultdescription, // 故障描述 *
					CustomerRemark: this.textarea, //客户备注
					RequestType: this.$store.state.RequestType, // /// 报修方式 * ：1PC端报修 2App报修 3扫码报修
				}
			}
			this.$http(obj).then((res) => {
				this.UpImgData(res)
			})
		},
		methods: {
			
			init: function() {
				var obj = {
					url: this.$store.state.url + 'WO/GetRepairInfo',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						inchwellCode: this.$store.state.CodeTwo
					}
				}
				this.$http(obj).then((res) => {
					this.$store.state.OKAdWarrantyproitem = res.Data.RepairManInfo //联系人信息
					this.$store.state.Grade = JSON.stringify(res.Data.CustomerEquDto)
					// this.$store.state.Faultdescription  
					this.OKAdWarrantyproitem() //刷新
				})
			},
			UpImgData: function(res) { //上传照片方法
				var asd = res //将ID带入视频上传
				var thst = this.$store.state.imgList
				if (res.Code == 0 && thst != []) { //判断上传结果以及是否存在图片
					for (var i = 0; i < thst.length; i++) {
						var obj = {
							url: this.$store.state.url + 'WO/UploadRepairImage',
							method: 'POST',
							header: this.$store.state.token,
							data: {
								Id: res.Data,
								FileStr: thst[i],
								Type: 1,
							}
						}
						this.$http(obj).then((res) => {})
					}
				}
				this.VideoUp(asd)
			},
			VideoUp: function(res) {
				if (this.$store.state.VideoBase64List.length != 0) {
					for (var i = 0; i < this.$store.state.VideoBase64List.length; i++) {
						var obj = {
							url: this.$store.state.url + 'WO/UploadRepairImage',
							method: 'POST',
							header: this.$store.state.token,
							data: {
								Id: res.Data,
								FileStr: this.$store.state.VideoBase64List[i],
								Type: 2,
							}
						}
						this.$http(obj).then((res) => {
							this.Video += 1
							if (this.Video == this.$store.state.VideoBase64List.length) {
								uni.navigateTo({
									url: '../Ordermanagement/Ordermanagement?Code=1'
								})
								this.Clear()
							}
						})
					}
				}
				this.Clear()
				uni.navigateTo({
					url: '../Ordermanagement/Ordermanagement?Code=1'
				})
			},
			showToast: function(res) {
				uni.showToast({
					title: res,
					icon: "none"
				})
			},
			AdWarrantypro: function() {
				uni.navigateTo({
					url: '/pages/home/work/Warranty/AdWarrantypro/AdWarrantypro'
				})
			},
			DeviceIn: function() {
				uni.navigateTo({
					url: '/pages/home/work/Warranty/DeviceIn/DeviceIn'
				})
			},
			Faultdescr: function() {
				uni.navigateTo({
					url: '/pages/home/work/Warranty/Faultdescr/Faultdescr'
				})
			},
			//刷新页面
			OKAdWarrantyproitem: function() {
				var OkiTem = this.$store.state.OKAdWarrantyproitem
				if (OkiTem.Name != 'Name') {
					this.WarrantData = OkiTem
				}
				if (this.$store.state.Grade != '') { //检查型号
					var Grade = JSON.parse(this.$store.state.Grade)
					console.log(Grade.Id + '型号id') //型号id
					this.DeviceInformation = '[' + Grade.SN + ']' + Grade.Desc
					this.DeviceInformationID = Grade.Id
				}
				this.Faultdescription = this.$store.state.Faultdescription
				console.log(this.Faultdescription)
			},
			Clear: function() {
				this.$store.state.OKAdWarrantyproitem = {} //清除联系人
				this.$store.state.imgList = [] // 清除照片
				this.$store.state.Faultdescription = '' //清除故障描述
				this.$store.state.Grade = '' //清除设备型号
				this.$store.state.VideoBlobList = [] // 清除视频地址
				this.$store.state.VideoBase64List = [] //清除视频base64
				this.$store.state.up_img_Video = '' // 清空故障描述
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #FFFFFF;

		.InputIcon {
			width: calc(100% - 130px);
		}

		.AssemblyUnitPriceIcon {
			width: 16px;
			height: 16px;
			float: right;
			position: absolute;
			top: 0;
			bottom: 0;
			right: 10px;
			margin: auto;
		}

		.bots {
			margin-bottom: 20px;
		}

		.botss {
			border-bottom: 1px solid #C0C0C0;
		}

		.BeiZhu {
			width: 100%;
			height: 40px;
			line-height: 40px;
			font-size: 14px;
			font-weight: bold;
			padding-left: 15px;
			box-sizing: border-box;
		}
	}
</style>
