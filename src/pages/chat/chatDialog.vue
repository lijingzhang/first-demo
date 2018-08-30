<template>
	<div class="height100">
	<el-container class="height100">
		<v-header title="小七">
			<span slot="left"  @click="$common.back()">返回</span>
            
		</v-header>
		<el-main>
			<div class="p15">
                <el-row>
                    <el-col class="mt15" :span="20">
                        <el-row>
                            <el-col :span="4">
                                <img src="../../assets/images/head.png" width="50" alt="">
                            </el-col>
                            <el-col :span="20">
                                <div class="l_chatbg chatbg"><i></i>最近怎么样</div>
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
                                <img src="../../assets/images/head.png" width="50" alt="">
                            </el-col>
                        </el-row>
                    </el-col>
                     <el-col class="mt15" :span="20" :offset="4">
                         <el-row>
                            <el-col :span="20">
                                <div class="r_chatbg chatbg"><i></i>很好很好很好很好很</div>
                            </el-col>
                            <el-col :span="4">
                                <img src="../../assets/images/head.png" width="50" alt="">
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
			</div>	
		</el-main>
        <footer class="footer">
            <el-row :gutter="10">
                <el-col :span="18">
                   <div class="textarea" contenteditable="true"></div>
                </el-col>
                <el-col :span="4">
                    <el-button  type="primary" class="f12 sendbtn"  @click="sendcode()">发送</el-button>  
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
					num:'',
					countType:'',
				},
				countArr:[],
				isShow:false,
				
			}
		},
	
		methods:{
		 nextStep: function(){
			   this.$router.push({path:'/QRcode?'+'ttype='+this.form.countType+'&&tnum='+this.form.num})
			},
			 countype(item){  //下拉框选中项事件
               this.form.countType=item;
               this.isShow=false;
                
			},
			 loadcountType(){
				this.$http.get('/count/queryMoneyType').then(response => {
						this.countArr=response.data;
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
