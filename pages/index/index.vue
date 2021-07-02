<template>
	<view class="box-hie">
		<view class="head">
			消息 <span>（{{indexINIT}} 条 未读）</span>
			<span @tap='OneTabAllRead()' style='float:right;margin-right: 10px;'>一键已读<u-icon name="eye-off" size="35">
				</u-icon> &nbsp; </span>
		</view>


		<view class="card" v-for="(item,index) in Msg" @tap="seeDetails(item)">
			<u-icon v-if='!item.Read' class='init' name="info-circle-fill" color="#fa3534" size="28"></u-icon>
			<u-icon v-if='item.Read' class='init' name="info-circle-fill" color="#dcdfe6" size="28"></u-icon>
			<h3>{{item.Title}}
				<span>{{item.BeginTime.split('T')[0]}}</span>
			</h3>
			<p>{{item.Con}}</p>
		</view>

		<u-loadmore :status="status" margin-top='30' margin-bottom='30' />





		<!-- <u-empty v-if='Msg == []' text="暂无消息" mode="message"></u-empty> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Msg: [],
				pageNum: 1,
				pagesize: 10,
				search: '',
				indexINIT: 0,
				status: 'loading',
				index: 0,
				length:0,
			}
		},

		onLoad() {
			console.log('出现')
		},
		onShow() {
			this.pageNum = 1
			this.Msg = []
			this.init()

		},
		onReachBottom() {
			// this.pagesize += 10
			this.pageNum += 1
			this.init()
		},

		methods: {
			// 一键已读
			OneTabAllRead: function() {
				
				this.index = 0
				
				if (this.Msg.length != 0) {
					if (this.Msg.length > 10) {
						this.length = 10
					} else {
						this.length = this.Msg.length
					}
				
					for (var index = 0; index < this.length; index++) {
						console.log(this.Msg[index])
						this.ReadJournalism(this.Msg[index].ID)
					}
				}

			},
			// 标为已读
			ReadJournalism: function(SoId) {
				
			
				
				
				var obj = {
					method: 'POST',
					url: this.$store.state.url + 'System/ReadJournalism',
					header: this.$store.state.token,
					data: {
						Id: SoId,
					}
				}
				this.$httpno(obj).then((res) => {
					uni.hideTabBarRedDot({
						index: 3
					})
					
					this.indexINIT  = 0
					
					this.index += 1
					if (this.index == this.length) {
						console.log('清除当前前十条清除当前前十条清除当前前十条清除当前前十条清除当前前十条清除当前前十条清除当前前十条')
						this.Msg = []
						this.init()
					}
				})
			},
			// 打开消息详细页
			seeDetails: function(row) {
				console.log(row)
				uni.navigateTo({
					url: "./seeDetails?Con=" + row.Content + '&Tit=' + row.Title + '&Id=' + row.ID,
				});
			},
			init: function() {

				var obj = {
					method: 'GET',
					url: this.$store.state.url + 'System/GetJournalisms',
					header: this.$store.state.token,
					data: {
						search: this.search,
						pageNum: this.pageNum,
						numPerPage: this.pagesize,
						orderField: "",
						orderDirection: "",
					}
				}
				this.$httpno(obj).then((res) => {

					console.log(
						'输出 ————————————————————————————————————————————————————————————————————'
					)
					this.indexINIT = 0

					if (this.Msg == []) {
						this.Msg = res.Data.Dtos
					} else {
						if (res.Data.Dtos == 0) {
							this.status = 'nomore'
						} else {
							this.Msg = this.Msg.concat(res.Data.Dtos)
						}
					}

					if (this.Msg.length == 0) {
						this.status = 'nomore'
						this.indexINIT = 0
					} else {
						var regex = /(<([^>]+)>)/ig
						for (var index = 0; index < this.Msg.length; index++) {
							this.Msg[index]['Con'] = this.Msg[index].Content.replace(regex, "");
							if (index < 10) {
								if (this.Msg[index].Read == false) this.indexINIT += 1

							}
						}
					}
					if (this.indexINIT != 0) {
						uni.setTabBarBadge({
							index: 3,
							text: String(NoMasgindex)
						})
					} else {
						uni.hideTabBarRedDot({
							index: 3
						})
					}








				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.box-hie {
		width: 100%;
		background-color: #FFFFFF;
		position: relative;
		padding-top: 80px;
		box-sizing: border-box;

		.head {
			position: fixed;
			top: 0px;
			left: 0;
			width: 100%;
			height: 80px;
			background-color: #1678ff;
			padding-top: 30px;
			padding-left: 20px;
			box-sizing: border-box;
			line-height: 50px;
			font-weight: bolder;
			font-size: 18px;
			color: #ececec;
			z-index: 99;

			span {
				font-size: 14px;

			}

		}

		.card {
			width: 90%;
			background-color: #ffffff;
			margin: auto;
			border-radius: 7px;
			overflow: hidden;
			margin-top: 10px;
			padding: 10px;
			border: 0.3px solid #d9e7f1;
			box-sizing: border-box;
			-webkit-box-shadow: 9px 9px 6px #d9e7f1;
			-moz-box-shadow: 9px 9px 6px #d9e7f1;
			box-shadow: 3px 3px 6px #d9e7f1;
			position: relative;

			.init {
				position: absolute;
				right: 3px;
				top: 3px;
			}

			h3 {
				color: #545454;
				font-size: 15px;

				span {
					float: right;
					color: #adadad;
					font-size: 12px;

				}
			}

			p {
				text-indent: 2em;
				color: #919191;
				font-size: 12px;
				margin-top: 10px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

		}
	}
</style>
