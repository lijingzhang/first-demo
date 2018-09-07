<template>
	<div >
	<el-container>
		<v-header title="找回密码">
			<span slot="left"  @click="$common.back()">返回</span>
		</v-header>
		<el-main>
			<div class="  border-t10">
				<el-form ref="form"  :model="form"  label-width="80px">
					<el-form-item label="国家/地区" prop="country">
						<el-select v-model="value" placeholder="请选择">
							<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="原手机号" prop="phone">
						<el-input v-model="form.phone" type="number"  placeholder="请输入手机号" ></el-input>
					</el-form-item>
                     <el-form-item label="验证码" prop="checkNum">
                         <el-row >
                        	<el-col :span="14">
	                            <el-input class="l" type="number" v-model="form.checkNum"  placeholder="请输入验证码"></el-input>
                            </el-col>
                            <el-col :span="9" >
                                <el-button  type="primary" class="code_btn" v-if="sendMsgDisabled">{{time+'秒后重发'}}</el-button>
								<el-button  type="primary" class="code_btn" ref="codebtn" disabled="disabled" v-if="!sendMsgDisabled"  @click="sendcode()">发送验证码</el-button>  
                             </el-col>
                         </el-row>    
					</el-form-item>
					<div class="pl15 pr15">
						<el-button class="w100 mb15 mt40" type="primary" disabled="disabled" ref="button"	@click="dialogFormVisible = true">下一步</el-button>
					</div>
				<el-dialog  :visible.sync="dialogFormVisible">
					<v-header title="账户类型">
						<span slot="left"  @click="dialogFormVisible = false">返回</span>
					</v-header>
					<el-form-item  label="国家/地区" prop="country">
						<el-select v-model="value" placeholder="请选择">
							<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="新手机号" prop="v">
						<el-input v-model="form.newphone" type="number"  placeholder="请输入手机号" ></el-input>
					</el-form-item>
					<div class="pl15 pr15">
						<el-button class="w100 mb15 mt40" type="primary" disabled="disabled" ref="button" @click="onSubmit('form');">提 交</el-button>
					</div>
				</el-dialog >
				</el-form>
			</div>	
          
		</el-main>
	</el-container>
	 
</div>
</template>
<script>

    export default {
        data() {
			return {
			form: {//form名称
					phone: '',
					telphone: '',
					newphone: '',
					checkNum: '',
						
				},
				newpassword:'',
				time: 60, // 发送验证码倒计时
				sendMsgDisabled: false,
				 dialogFormVisible: false,
			options: [{
					value: '',
					label: '中国大陆(默认)'
					}, {
					value: '852',
					label: '中国香港'
					}, {
					value: '855',
					label: '柬埔寨'
					}, {
					value: '65',
					label: '新加坡'
					}, {
					value: '60',
					label: '马来西亚'
				}, {
					value: '66',
					label: '泰国'
				}, {
					value: '95',
					label: '缅甸'
				}, {
					value: '62',
					label: '印度尼西亚'
				}, {
					value: '63',
					label: '菲律宾'
				}, {
					value: '84',
					label: '越南'
				}, {
					value: '856',
					label: '老挝'  
				}, {
					value: '673',
					label: '文莱'
				}],
				value: ''
			}
		},
		methods:{
			onSubmit(formName) {
				this.form.telphone=this.value+this.form.phone;
					var checknums  = new URLSearchParams();
					checknums.append('newphone', this.form.telphone);
   					checknums.append('checknum', this.form.checkNum);
					this.$http.post("/user/updatephone",checknums, {
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  })
                  .then(response=>{
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
							 this.$message({
                                message: '修改成功',
                                type: 'success',
                                duration:1000
								});
							this.$router.push("/centerindex")
							}
						})
					.catch(error=>{
					   //超时之后在这里捕抓错误信息.
                     console.log(error);
					});
					
					
			
				
				},
				sendcode(){
					let self = this;
					
					var params  = new URLSearchParams();
					this.form.telphone=this.value+this.form.phone;
					params.append('telphone', this.form.telphone);
						this.$http.post("/user/checkPhone",params, {
						headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
						}
					})
                  .then(response=>{
						var Data=response.data;
						if(Data.code=="fail"){
						 this.$confirm('手机号不正确', '提示', {
							confirmButtonText: '确定',
							center: true,
							showClose:false,
							showCancelButton:false
							})
						}
						else{
							self.sendMsgDisabled = true;
							let interval = window.setInterval(function() {
							if ((self.time--) <= 0) {
								self.time = 60;
								self.sendMsgDisabled = false;
								window.clearInterval(interval); //停止
							}
							}, 1000);
						
						}
					})
					.catch(error=>{
					alert("网路错误，不能访问");
					});
				},
		},
		  watch:{  //实时监听
				form:{
					handler:function(val,oldval){
						//监听发送验证码按钮
						if(this.form.phone!=''){
							this.$nextTick(()=>{
								this.$refs.codebtn.$el.removeAttribute('disabled');
								//去除属性ref=button上的指定class：is-disabled
								var classVal=this.$refs.codebtn.$el.getAttribute("class");
								classVal=classVal.replace('is-disabled','')
								this.$refs.codebtn.$el.setAttribute("class",classVal)
							})
						}
						else{
								this.$nextTick(()=>{
								this.$refs.codebtn.$el.setAttribute('disabled','disabled');
								//去除属性ref=button上的指定class：is-disabled
								this.$refs.codebtn.$el.setAttribute("class","el-button code_btn el-button--primary is-disabled")
							})
						}	

						//监听提交按钮状态
						if(this.form.phone!=''&&this.form.checkNum){
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
								//去除属性ref=button上的指定class：is-disabled
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
