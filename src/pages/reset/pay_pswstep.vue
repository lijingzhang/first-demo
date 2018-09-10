<template>
	<div >
	<el-container>
		<v-header title="认证原始密码">
			<span slot="left"  @click="$common.back()">返回</span>
		</v-header>
		<el-main>
			<div class="  border-t10">
				<el-form ref="form"  :model="form"  label-width="80px">
				
					  <el-form-item label="账户选择" prop="cardid">
                        <el-input v-model="cardid" @click.native="isShow=true" ref="cardid" placeholder="请选择账户" class="pr30"></el-input>
                        <i class="gray_right"></i>
                    </el-form-item>
					<el-form-item label="旧密码" prop="password">
						<el-input v-model="form.payPwd" type="password"   placeholder="请输入旧支付密码"></el-input>
					</el-form-item>
					<div class="pl15 pr15">
						<el-button class="w100 mb15 mt40" type="primary" disabled="disabled" ref="button" @click="onSubmit('form')">下一步</el-button>
					</div>
					
				</el-form>
			</div>	
            
		</el-main>
		 <div class="popContainer transfer" v-if="isShow" @click="isShow=false">
            <el-card class="box-card ">
                <div slot="header" class="clearfix">
                    <span>选择账户</span>
                </div>
                <div  v-for="item in countArr" class="text item" @click="countype(item.id,item.cardId,item.countType)">
                    <el-row>
                        <el-col :span="12" class="tl">
                            {{item.cardId}}({{item.countType}})
                        </el-col>
                        
                    </el-row>
                
                </div>
            
            </el-card>
        </div>
	</el-container>

</div>
</template>
<script>

    export default {
        data() {
			return {
			form: {//form名称
				
					payPwd: '',
					id:'',
				},
				countArr:[],
				cardid:'',
				isShow:false,

			}
		},
		created(){
			 this.loadcount();  //加载自己的账户
			   this.$nextTick(()=>{
                this.$refs.cardid.$el.children[0].setAttribute('readOnly','readOnly')
                })
		},
		methods:{
			onSubmit(formName) {
					var params  = new URLSearchParams();
					params.append('id', this.form.id);
					params.append('payPwd', this.form.payPwd);
					this.$http.get("/count/authCountpwd",{params:params}, {
					headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
					}
					})
					.then(response=>{
							var Data=response.data;
							if(Data.code=="fail"){
								this.$confirm("密码错误", '提示', {
									confirmButtonText: '确定',
									center: true,
									showClose:false,
									showCancelButton:false
								})
							}
							else{
								
								this.$router.push("/paypsw?id="+this.form.id)
							}
						})
					.catch(error=>{
					   //超时之后在这里捕抓错误信息.
                     console.log(error);
					});
					
				
				
				},
				
				 loadcount(){
                    this.$http.get('/count/queryCountByUserid').then(response => {
                        this.countArr=response.data;
                        var len=this.countArr.length;
                    })
                    .catch(error=>{
                        //超时之后在这里捕抓错误信息.
                            console.log(error);
                    });
                        
           		 },
				countype(id,cardId,countType){  //下拉框选中项事件
					this.form.id=id;
					this.cardid=cardId+'('+countType+')';
					this.countType=countType;
					this.isShow=false;
					
				},
		},
		  watch:{  //实时监听
				form:{
					handler:function(val,oldval){

						//监听提交按钮状态
						if(this.form.id!=''&&this.form.payPwd!=''){
							this.$nextTick(()=>{
								this.$refs.button.$el.removeAttribute('disabled');
								//去除属性ref=button上的指定class：is-disabled
								var classVal=this.$refs.button.$el.getAttribute("class");
								classVal=classVal.replace('is-disabled','')
								this.$refs.button.$el.setAttribute("class",classVal)
							})
						}	
						else{
								this.$nextTick(()=>{
								this.$refs.button.$el.setAttribute('disabled','disabled');
								this.$refs.button.$el.setAttribute("class","el-button w100 mt40 mb15 el-button--primary  is-disabled")
							})
						}
					},
					deep:true
				}
			},
    }
</script>

<style lang="scss" scoped>
.el-form .el-form-item:first-child{ border: none; border-bottom: 1px solid #dcdfe6}
.code_btn.el-button{    height: 35px;line-height: 10px; color: #fff;padding: 0;width: 100%;}
</style>
