<template>
	<view class="box">
		<view class="Top">
			<view :class="{'but1':button1 == false}" @tap="buttTop(false)"  >
				联系人
			</view>
			<view :class="{'but1':button1 == true}" @tap="buttTop(true)" >
				账号
			</view>
		</view>
		<!-- 联系人集合 -->
		<view v-if="!button1" class="bottom">
			<view class="Pros"  v-for="(item,index) in data" :key='index' @tap="Call(item)" >
				<view class="Left">
					<view class="Pro">
						{{item.Name}}
					</view>
					<view v-if="item.Email" class="Emi">
						{{item.Mobile}}
					</view>
				</view>
				<view class="Right">
					<image v-if="item.Default" class="mo" src="../../../../static/icon/mo.png" mode=""></image>
					<image class="RightZuo" src="../../../../static/icon/arrow_right.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 账号信息集合 -->
		<view v-if="button1" class="bottom">
			<view class="Pros"  v-for="(itemPro,indexPro) in GetCusAccounts" :key='indexPro' >
				<view class="Left">
					<view class="Pro">
						{{itemPro.UserName}}
					</view>
					<view v-if="itemPro.Memo" class="Emi">
						备注：{{itemPro.Memo}}
					</view>
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				button1: false,
				data:[],
				ProlimsNumber:'',//原默认联系人位置
				Prolims:{},//默认联系人
				GetCusAccounts:[],//账号信息集合
			};
		},
		created() {
			this.init()
		},
		methods: {
			Call:function(item){
				this.$store.state.mePromes = item
				uni.navigateTo({
					url:'/pages/home/work/Me/meProlims'
				})
			},
			//切换左右
			buttTop:function(i){
				this.button1 = i
			},
			// 数据
			init: function() {
				//获取英之杰联系人
				var obj = {
					url: this.$store.state.url + 'CRM/GetCusLinkManMini',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						cusId : this.$store.state.CusId,
					}
				}
				this.$http(obj).then((res) => {
					this.data = res.Data.Dtos
					for(var i = 0; i < this.data.length; i ++ ){
						if(this.data[i].Default){
							this.ProlimsNumber = i
							this.Prolims = this.data[i]
						}
					}
					this.data.splice(this.ProlimsNumber,1)
					this.data.unshift(this.Prolims)
				})
				//获取客户账号列表
				var obj = {
					url: this.$store.state.url + 'CRM/GetCusAccounts',
					method: 'GET',
					header: this.$store.state.token,
					data: {
						cusId : this.$store.state.CusId,
					}
				}
				this.$http(obj).then((res) => { 
					this.GetCusAccounts = res.Data.Dtos
				})
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.box{
	.Top{
		width: 100%;
		height: 40px;
		background-color: #FFFFFF;
		padding: 5px 30px;
		box-sizing: border-box;
		margin: auto;
		view{
			width: 50%;
			height: 100%;
			line-height: 30px;
			background-color: #FFFFFF;
			border: 1px solid #007AFF;
			color: #007AFF;
			float: left;
			text-align: center;
		
			box-sizing: border-box;
		}
		.but1{
			background-color: #007AFF;
			color: #FFFFFF;
		}
	}
	.bottom{
		width: 100%;
		height: calc(100% - 40px);
		background-color: #FFFFFF;
		overflow: auto;
		padding-top: 20px;
		box-sizing: border-box;
		//联系人
		.Pros{
			width: 95%;
			height: 50px;
			border: 1px solid #dcdcdc;
			margin: auto;
			border-radius: 5px ;
			margin-bottom: 10px;
			padding: 6px;
			box-sizing: border-box;
			.Left{
				width: 75%;
				height: 100%;
				float: left;
				.Pro{
					width: 100%;
					height: 60%;
					font-weight: bold;
				}
				.Emi{
					width: 100%;
					height: 40%;
					font-size: 12px;
					color: #808080;
				}
			}
			.Right{
				width: 25%;
				height: 100%;
				float: left;
				.mo{
					width: 20px;
					height: 20px;
					display: block;
					float: left;
				}
				.RightZuo{
					width: 30px;
					height: 30px;
					display: block;
					float: right;
				}
			}
		}
	}
}
</style>
