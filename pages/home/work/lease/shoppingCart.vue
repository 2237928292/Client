<template>
	<view class="box">
		
		<view class="cu-form-group">
			<view class="title">联系人</view>
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
		
		<view class="cu-form-group">
			<view class="items" v-for="(item,index) in data" :key='index' >
				<view style="color: #333;font-size: 12px;width: 90%; float: left;" >{{item.Describe}}</view>
				<span style="color: red;" @tap='deleteitem(item)' >
					删除
				</span>
			</view>
		</view>
		
		<button type="primary" style="width: 80%;margin-top: 20px;margin-bottom: 20px; " @tap="Applyforalease()">申请借用</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:this.$store.state.shoppingCart,
				WarrantData: {
					Name: '', //保修人
					NameEn: '', //英文名
					Mobile: '', //手机号码
					Tel: '', //固定电话
					Address: '', //详细地址
					Email: '', //电子邮箱
				},
			};
		},
		created() {
			
		},
		onShow() {
			this.WarrantData = this.$store.state.shoppingCartproitem
		
		},
		
		onBackPress() { //自定义返回事件
			uni.navigateTo({
				url: "./lease",
			})
			return true
		},
		methods:{
			AdWarrantypro:function(){
				uni.navigateTo({
					url: './AdleasePro'
				})
			},
			Applyforalease:function(){
				if(this.WarrantData.Name == ''){
					this.$title("请选择报修人")
					return false
				}
				if(this.WarrantData.Mobile == ''){
					this.$title("请输入手机号码")
					return false
				}
				if(this.WarrantData.Address == ''){
					this.$title("请选择地址")
					return false
				}	
				
				// 生成工具借用的字符串
				
				
				var gjdata =  []
				
				
				for (let i = 0; i < this.data.length; i++) {
					gjdata.push(this.data[i].ID)
				}
				if(gjdata.length == 0){
					this.$title("您还未选择物品！")
					return false
				}
				
				
				var obj = {
					url: this.$store.state.url + 'LeaseTool/ApplyLease',
					method: 'POST',
					header: this.$store.state.token,
					data: {
						Person  :  this.WarrantData.Name,
						Phone :   this.WarrantData.Mobile,
						Address :  this.WarrantData.Address,
						LeaseToolIds : gjdata,//工具集合
					}
				}
				this.$http(obj).then((res) => {
					uni.navigateTo({
						url: "./leaseList",
					})
				})
				
				
				
				
				
				
			},
			deleteitem:function(item){
				for (let i = 0; i < this.data.length; i++) {
					if(this.data[i].ID == item.ID){
						this.data.splice(i,1)
					}
				}
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
		.items{
			width: 100%;
			height: 25px;
			line-height: 25px;
			view{
				height: 100%;
				overflow: hidden;
			}
		}
	}

</style>
