<template>
	<div class="height100">
	<el-container class="height100">
		<v-header :title='countArr.username'>
			<span slot="left"  @click="$common.back()">返回</span>
		</v-header>
      
		<el-main>
			<div class="p15">
                <el-row>
                    <div class="datatime"><span>{{countArr.createTime}}</span></div>
                    <el-col class="mt15" :span="20" >
                        <el-row>
                            <el-col :span="4">
                                <img src="../../assets/images/head.png" width="40" alt="">
                            </el-col>
                            <el-col :span="20">
                                <div class="l_chatbg chatbg"><i></i>{{countArr.content}}</div>
                            </el-col>
                        </el-row>
                        
                    </el-col>
                   <div class="datatime"><span>2018-08-27 17:27</span></div>
                    <el-col class="mt15" :span="20" :offset="4">
                         <el-row>
                            <el-col :span="20">
                                <div class="r_chatbg chatbg"><i></i>很好很好很好很好很好很好很好很好很好很好很好很好</div>
                            </el-col>
                            <el-col :span="4">
                                <img src="../../assets/images/head.png" width="40" alt="">
                            </el-col>
                        </el-row>
                    </el-col>
                     <el-col class="mt15" :span="20" :offset="4">
                         <el-row>
                            <el-col :span="20">
                                <div class="r_chatbg chatbg"><i></i>很好很好很好很好很</div>
                            </el-col>
                            <el-col :span="4">
                                <img src="../../assets/images/head.png" width="40" alt="">
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
			</div>	
		</el-main>
        <footer class="footer">
            <el-row :gutter="10">
                <el-col :span="18">
                   <div class="textarea" contenteditable="true" ref="content"></div>
                </el-col>
                <el-col :span="4">
                    <el-button  type="primary" class="f12 sendbtn"  @click="sendMessage()">发送</el-button>  
                </el-col>
            </el-row>
	    </footer>
	</el-container>

</div>
</template>
<script>

    export default {
        data() {
			return {
				form:{
					receivecount:'18193412366',
                    title:'哈哈哈哈',
                    content:'',
                    username:''
                },
                countArr:[]
			}
		},
		created(){
            // this.loadmessage();
            this.linkpage();
		},
		methods:{
             linkpage(){
				this.$http.get('/message/queryMessage?id='+this.$route.query.id).then(response => {
						this.countArr=response.data;
					})
					.catch(error=>{
						//超时之后在这里捕抓错误信息.
							console.log(error);
					});
						
			},
            loadmessage(){
				this.$http.get('/message/querysend').then(response => {
                        this.sendArr=response.data;
						console.log(this.sendArr)
					})
					.catch(error=>{
						//超时之后在这里捕抓错误信息.
							console.log(error);
					});
						
			},
			 sendMessage(){
                this.form.content=this.$refs.content.innerText;
                var formData= this.$qs.stringify(this.form) // form为form名称获取表单数据
				this.$http.post('/message/send',formData).then(response => {
                   	var Data=response.data;
						if(Data.code=="fail"){
						 this.$confirm(Data.message, '提示', {
							confirmButtonText: '确定',
							center: true,
							showClose:false,
							showCancelButton:false
							})
						}
						else{
							this.countArr=Data;
                            this.$message({
                                message: '发送成功',
                                type: 'success',
                                duration:1000
                                });
                            }
						
					})
					.catch(error=>{
						//超时之后在这里捕抓错误信息.
							console.log(error);
					});
						
			},
		},
	
    }
</script>

<style lang="scss" scoped>
    .chatbg{ border:1px solid #f5f5f5; padding:12px 15px;background: #f7c36d;; border-radius:10px; color: #fff ;
    display: inline-block; text-align: left;}
    .l_chatbg{ float: left; margin-left: 10px;}
    .r_chatbg{ float: right; margin-right: 10px;}
    .datatime{ display: inline-block;width: 100%;text-align:center;margin: 15px 0;
        span{color: #fff;padding: 5px 10px;border-radius: 6px;font-size: 12px;
        background:rgba(0,0,0,0.5) ; filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7F000000,endcolorstr=#7F000000);
        }
    }
    	.footer {
		position: fixed;
		color: #fff;
		text-align: center;
		background: #0d0d0d;
		left: 0;
		bottom: 0;
		width:100%;padding: 8px 15px 8px 10px;
        display: inline-block;
         .el-row{ width: 100%;}
         .sendbtn{ position: absolute; bottom: 0;right: 15px;}
    }
    .footer .textarea{ padding: 10px 5px;background: #fff;width: 95%;color: #333;text-align: left; min-height: 19px;}
   
</style>
