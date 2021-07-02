<template>
	<view class="box">
		<image class="img" src="../../static/img/zhi.png" mode=""></image>
		<view class="inputArea assd">
			<input v-model="loginPhone" placeholder="请输入账号" maxlength="20" class="inputClass" />
		</view>
		<view class="inputArea">
			<form>
				<input v-model="loginPassword" placeholder="请输入密码" type="text" password class="inputClass" />
			</form>
		</view>
		<view style="padding: 0 10%;">
			<text style="color: red;"></text>
		</view>
		<view class="inputArea">
			<button style="border-radius:22px;" type="primary" @tap="Logo">登 录</button>
		</view>
		<view class="inputArea texts">
			<text @tap="Logos()" >暂无账号点击注册</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginPhone: '',
				loginPassword: '',
			}
		},
		onShow() {
			var that = this
			uni.getStorage({
				key: 'admins',
				success: function(res) {
					console.log(res.data)
					that.loginPhone = res.data
				},
			})
		},

		methods: {
			//  登录
			Logo: function() {
				if (this.loginPhone == '') {
					this.$title('请输入账号')
					return false
				}
				if (this.loginPassword == '') {
					this.$title('请输入密码')
					return false
				}
				uni.showLoading({
					title: '正在登陆'
				});
				var obj = {
					url: this.$store.state.url + 'Account/Login',
					method: 'POST',
					data: {
						username: this.loginPhone,
						password: this.loginPassword
					}
				}
				this.$store.state.username = this.loginPhone
				this.$http(obj).then((res) => {
					var Pros = JSON.parse(res.Data)
					this.$store.state.Vips = Pros.Characteristics  // VIP等级
					this.$store.state.Name = Pros.FullName //名称
					this.$store.state.CusId = Pros.CusId  //ID 
					this.$store.state.token = Pros.Token //Token
					this.$store.state.Userid = Pros.UserId //Token
					uni.setStorage({ //将用户名存储在本地
						key: 'Pros',
						data: Pros,
					});
					uni.setStorage({ //将用户存储在本地
						key: 'admins',
						data: this.loginPhone,
						success: function() {
							uni.switchTab({ //跳转至主页
								url: '/pages/home/home'
							})
						}
					});

				})
			},
			// 前往 注册页
			Logos:function(){
				uni.navigateTo({
					url:"./CusRegister"
				})		
			}
			

		}
	}
</script>

<style scoped lang="scss">
	.box {
		background-color: #FFFFFF;

		.ceshishi {
			padding: 10px;
			position: fixed;
			bottom: 0;
			right: 0;
			color: #808080;
		}

		// background-image: url(../../static/img/QQ.jpg) ;
		// background-size: 100% 100%;
		.img {
			width: 100px;
			height: 100px;
			display: block;
			margin: auto;
			margin-top: 80px;
			box-sizing: border-box;
		}

		.assd {
			margin-top: 30px;
			box-sizing: border-box;
		}
	}

	.inputArea {
		padding: 20upx 10%;

		.right {
			float: right;
		}
	}
	.texts{
		text-align: right;
		color: #007AFF;
		font-size: 12px;
	}

	.inputClass {
		border: 2px solid #ccc;
		border-radius: 22px;
		outline: 0;
		padding: 8px 15px;
		font-weight: bold;
	}
</style>
