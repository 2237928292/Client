<template>
	<view class="box">
		<view v-show="show" class="Sugg">
			<textarea v-model="textarea"  placeholder="请输入反馈,我们将为您尽快处理" />
		</view>
		<!-- <view class="Emi">
			<input type="text" value="" />
		</view> -->
		<view v-show="show" class="Button">
			<button type="warn" @tap="Ti()" >提交</button>
		</view>
		<view v-show="!show" class="OK">
			<image src="../../../static/icon/OK.png" mode=""></image>
			<view class="text">
				感谢您对英之杰天祥的关注与支持，我们会认真处理您的反馈，尽快修复和处理相关功能。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textarea:'',
				show:true,
			};
		},
		methods:{
			Ti:function(){
				if(this.textarea == ''){
					this.$title('请输入内容')
					return false
				}
				
				var obj = {
					method:'POST',
					header:this.$store.state.token,
					url:this.$store.state.url + 'system/Suggestion',
					data:{
						Str:this.textarea
					}					
				}
				this.$http(obj).then((res)=>{
					this.$title(res.Msg)
					this.show = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
@import   '@/scss/me/Suggestions.scss';
</style>
