<template>
	<div >
	<el-container>
		<v-header title="我的信箱">
			<span slot="left"  @click="$common.back()">返回</span>
            <span slot="right" ><i class="el-icon-delete"></i></span>
		</v-header>
		<el-main>
			<div class="  border-t10 pr15 pl15">
                <el-row class="chatBlock" @click.native="$common.skip('/#/chatDialog')">
                    <el-col :span="20">
						<el-row class="tl">
                            <el-col :span="4">
                                <img src="../../assets/images/head.png" width="35" alt="">
                            </el-col>
                            <el-col :span="20">
								<h4>小七</h4>
                                <div class="chatbg"><i></i>最近怎么样</div>
                            </el-col>
						</el-row>
                    </el-col>
                    <el-col :span="4" >
                        <span class="f12 gray">4-28</span>
                    </el-col>
                </el-row>
				     <el-row  class="chatBlock" @click.native="$common.skip('/#/chatDialog')">
                    <el-col :span="20">
						<el-row class="tl">
                            <el-col :span="4">
                                <img src="../../assets/images/head.png" width="35" alt="">
                            </el-col>
                            <el-col :span="20">
								<h4>小七</h4>
                                <div class=" chatbg"><i></i>最近怎么样</div>
                            </el-col>
						</el-row>
                    </el-col>
                    <el-col :span="4" >
                        <span class="f12 gray">4-28</span>
                    </el-col>
                </el-row>
				    <el-row  class="chatBlock" @click.native="$common.skip('/#/chatDialog')">
                    <el-col :span="20">
						<el-row class="tl">
                            <el-col :span="4">
                                <img src="../../assets/images/head.png" width="35" alt="">
                            </el-col>
                            <el-col :span="20">
								<h4>小七</h4>
                                <div class="chatbg"><i></i>最近怎么样</div>
                            </el-col>
						</el-row>
                    </el-col>
                    <el-col :span="4" >
                        <span class="f12 gray">4-28</span>
                    </el-col>
                </el-row>
			</div>	
		</el-main>
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
	.chatBlock{ padding: 10px 0; border-bottom: 1px solid #f5f5f5}
	.chatbg{ font-size: 12px}
</style>
