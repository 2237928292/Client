<template>
	<!-- 代用机 -->
	<view class="box">
		 <view class="Top_JianSou">
		 	<input  type="text" v-model="inputs" value="" placeholder="输入检索项" />
			<button type="primary" size="mini" @tap="Winit()">检索</button>
		 </view>
		 <view class="Bottom">
				<view class="look" v-for="(item,index) in data" :key="index" >
					<view class="Left">
						<view class="Title">
							{{item.Desc}}
						</view>
						<view class="bule">
							{{item.Brand + ' '}} {{ '' + item.ProductCode}}
						</view>
						<view class="color">
							已被代用：{{item.Use}}次
							 剩余数量：{{item.Number}}
						</view>
					</view>
					<view class="Rigth">
						<image v-if="!item.Photo" src="../../../../static/image/daiyonji.jpg" mode=""></image>
						<image v-if="item.Photo" :src="item.Photo" mode=""></image>
					</view>
					
				</view>
		 </view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[],
				inputs:'',//检索项输入内容
			};
		},
		created() {
			this.init()
		},
		methods:{
			//初始化
			init:function(){
				var obj = {
					url: this.$store.state.url + 'System/GetStandbys',
					method: 'GET',
					header: this.$store.state.token,
					data:{
						search : this.inputs,
						numPerPage: 100,
						pageNum: 1,
						orderField: '',
						orderDirection:'' ,
					}
				}
				this.$http(obj).then((res) => {
					this.data = res.Data.Dtos
				})
			},
			
			Winit:function(){
				if(this.inputs == ''){
					return false
				}
				this.init()
			}
		}
	}
</script>

<style lang="scss" scoped>
.box{
	.Top_JianSou{
		width: 100%;
		height: 50px;
		padding: 10px 0;
		box-sizing: border-box;
		input{
			background-color: #FFFFFF;
			width: 70%;
			float: left;
			height: 90%;
			margin-left: 10%;
			border: 1px solid #007AFF;
			border-radius: 5px;
			padding-left: 10px;
			box-sizing: border-box;
		}
	}
	.Bottom{
		width: 100%;
		height: calc(100% - 50px);
		background-color: #FFFFFF;
		padding: 0 10px;
		overflow: auto;
		box-sizing: border-box;
		.look{
			width: 100%;
			height: 70px;
			border-bottom: 1px solid #C0C0C0;
			margin-bottom: 10px;
			box-sizing: border-box;
			.Left{
				width: calc(100% - 60px);
				height: 100%;
				float: left;
				.Title{
					width: 100%;
					font-size: 13px;
					height: 30px;
					overflow: hidden;
					font-weight: bold;
					line-height: 15px;
				}
				.bule{
					height: 20px;
					line-height: 20px;
					color: #007AFF;
				}
				.color{
					height: 15px;
					color: #999999;
					line-height: 15px;
					font-size: 12px;
				}
				
				
			}
			.Rigth{
				width: 60px;
				height: 60px;
				float: left;
				image{
					width: 100%;
					height: 100%;
				}
			}
			
			
		}
	}
}
</style>
