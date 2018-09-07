<template>
	<div >
	<el-container>
		<v-header title="我的信箱">
			<span slot="left"  @click="$common.back()">返回</span>
            <span slot="right" v-if="delshow" @click="checkedShow=true;delshow=false;"><i class="el-icon-delete"></i></span>
			<span slot="right" v-else @click="checkedShow=true;delItem()">删除</span>
		</v-header>
		<el-main>
			<div class="  border-t10 pr15 pl15">
				<div v-if="countArr.length==0" class="tc pt10 pb10 gray">--- 暂无数据 ---</div>
				
				 <el-checkbox-group  v-model="checkForm.checkList" >
                <el-row class="chatBlock" v-for="(item , idx) in countArr" :key="idx">
                    <el-col :span="16" @click.native="$common.skip('/#/chatDialog?id='+item.id)">
						<el-row class="tl">
                            <el-col :span="4">
                                <img src="../../assets/images/head.png" width="35" alt="" class="mr5">
                            </el-col>
                            <el-col :span="20">
								<h4>{{item.username}}</h4>
                                <div class="chatbg"><i></i>{{item.content}}</div>
                            </el-col>
						</el-row> 
                    </el-col>
                    <el-col :span="8" class="tr">
                        <span class="f12 gray">{{item.createTime}}</span>
						<el-checkbox @change="checkselect" v-show="checkedShow"  :label="item.id" :key="item.id"  class="radius50"></el-checkbox>
                    </el-col>
                </el-row>
				 </el-checkbox-group>
				   
			</div>	
			
		</el-main>
		<div class="add_message"> <router-link to="/chatDialog?id="><i class="el-icon-circle-plus "></i></router-link></div>
	</el-container>

</div>
</template>
<script>

    export default {
        data() {
			return {
				countArr:[{title:"小七",content:'最近咋地？',date:'4-25 12:10',id:'1'},{title:"小吴",content:'哈哈哈哈哈哈哈哈哈哈哈哈',date:'4分钟前',id:'2'}],
				delshow:true,
				checkedShow: false,
				checkForm: {
					checkList: [],//认证列表
				},
			}
		},
		created(){
			this.loadmessage();
		},
		methods:{

			 loadmessage(){
				this.$http.get('/message/queryreceive').then(response => {
						this.countArr=response.data;
						console.log(this.countArr)
					})
					.catch(error=>{
						//超时之后在这里捕抓错误信息.
							console.log(error);
					});
						
			},
			
			delItem: function(){
				let datas=JSON.parse(this.checkForm.checkList);//逗号隔开的字符串
				this.$confirm('确认删除已勾选的信息吗？', '确认信息', {
					distinguishCancelAndClose: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					  showClose:false,
					})
					.then(() => {
							this.$http.get('/message/batchdelete',{params:{ids: datas}}).then(response => {
						var Data=response.data;
						if(Data.code=="success"){
							  this.$message({
                                message: '删除成功',
                                type: 'success',
                                duration:1000
                                });
								setTimeout( () => {
								this.loadmessage();
								}, 1000);
						}
						else {
							 this.$confirm(Data.message, '提示', {
							confirmButtonText: '确定',
							center: true,
							showClose:false,
							showCancelButton:false
							})
						
							
						
						}
					
						console.log(response.data)
					})
					.catch(error=>{
						//超时之后在这里捕抓错误信息.
							console.log(error);
					});
					})
					
			
				
			},
			checkselect:function(){
				var datas=
				this.checkForm.checkList;
			}
		},
	
    }
</script>

<style lang="scss" scoped>

	.chatBlock{ padding: 10px 0; border-bottom: 1px solid #f5f5f5}
	.chatbg{ font-size: 12px}
	.el-checkbox{ margin-left: 5px;}
	.add_message{ position: absolute;right: 20px;bottom: 30px;
		.el-icon-circle-plus{ font-size: 50px;color: #f7c36d}
	}
	

</style>
