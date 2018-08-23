<template>
	<div class="login_bg" >
	<el-container>
	
		<el-main class="p15 pt55"  >
			<div class=" pl0">
					<div class="tc mb15"><img src="../assets/images/logo.png" width="120"></div>
				<el-form ref="form" status-icon :model="form"  label-width="80px" id='box'>
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
					<el-form-item label="手机号" prop="phone">
						<el-input v-model="form.phone" type="number"  placeholder="请输入手机号" ></el-input>
					</el-form-item>
                     <el-form-item label="验证码" prop="checkNum">
                         <el-row >
                        	<el-col :span="14">
	                            <el-input class="l" type="number" v-model="form.checkNum"  placeholder="请输入验证码"></el-input>
                            </el-col>
                            <el-col :span="9" >
                                <el-button  type="primary" class="code_btn" v-if="sendMsgDisabled">{{time+'秒后重发'}}</el-button>
								<el-button  type="primary" class="code_btn" v-if="!sendMsgDisabled"  @click="sendcode()">发送验证码</el-button>  
                             </el-col>
                         </el-row>    
					</el-form-item>
					<el-form-item label="密  码" prop="password">
						<el-input v-model="form.password" type="password" id="input" @click="passwordshow" placeholder="请输入密码"></el-input>
					</el-form-item>
                   
					<el-row class="mt20">
						<el-col :span="24">
						<el-button class="w100 mb15 mt40" type="primary" disabled="disabled" ref="button" @click="onSubmit('form')">注册</el-button>
						</el-col>
						<el-col :span="24" class="tr white">
                            	<span>已有账号？</span><router-link to="/login">登录</router-link>
						</el-col>
					</el-row>
					<!-- <el-button @click="resetForm('form')">重置</el-button> -->
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
					password: '',
					checkNum: '',	
				},
				
				time: 60, // 发送验证码倒计时
				sendMsgDisabled: false,
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
		 created() {
	var clientHeight = document.body.clientHeight;
    var _focusElem = null; //输入框焦点
    //利用捕获事件监听输入框等focus动作
    document.body.addEventListener("focus", function(e) {
        _focusElem = e.target || e.srcElement;
    }, true);
    //因为存在软键盘显示而屏幕大小还没被改变，所以以窗体（屏幕显示）大小改变为准
    window.addEventListener("resize", function() {
        if (_focusElem && document.body.clientHeight < clientHeight) {
            //焦点元素滚动到可视范围的底部(false为底部，true为顶部)
            _focusElem.scrollIntoView(false);
        }
    });

		},
		methods: {
			onSubmit(formName) {
				
					var formData= this.$qs.stringify(this.form) // form为form名称获取表单数据
					this.form.telphone=this.value+this.form.phone;
					console.log(this.form.telphone);
					 this.$http.post("/api/user/register",formData, {
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  })
                  .then(response=>{
						var Data=response.data;
						if(Data.code=="fail"){
							this.form.telphone=''; //错误时置空
							this.$confirm(Data.message, '提示', {
								confirmButtonText: '确定',
								center: true,
								showClose:false,
								showCancelButton:false
							})
						}
						else{
							setTimeout( () => {
								this.$confirm("恭喜您，注册成功!", '提示', {
								confirmButtonText: '确定',
								center: true,
								showClose:false,
								showCancelButton:false,
								callback: action => {
								this.$router.push("/login")
								}
								});
								
							 }, 1000);
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
						this.$http.post("/api/user/checkPhone",params, {
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
				passwordshow:function(){
					  var inputTextBox = document.getElementById('input');
        			inputTextBox.scrollIntoView(true);
				}
				
				
				
		},
		  watch:{  //实时监听
				form:{
					handler:function(val,oldval){
						//转账金额页设置按钮状态
						if(this.form.phone!=''&&this.form.password!=''&&this.form.checkNum){
							this.$nextTick(()=>{
								this.$refs.button.$el.removeAttribute('disabled');
								//去除属性ref=button上的指定class：is-disabled
								var classVal=this.$refs.button.$el.getAttribute("class");
								classVal=classVal.replace('is-disabled','')
								this.$refs.button.$el.setAttribute("class",classVal)
							})
						}
					},
					deep:true
				}
			},
	
    }
</script>
<style lang="scss" scoped>
.code_btn.el-button{    height: 35px;line-height: 10px; color: #fff;padding: 0;width: 100%;}
.el-main{ background: none; }
.el-button--primary{ background: #e2514a;border: 1px solid #e2514a;border-radius: 6px}
.el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover {
    color: #fff;
    background-color: #f89894;
    border-color: #f89894;
}
.white a{color: #fff}
.gray_right{background: url("../assets/images/gray_right.png") no-repeat; background-size: contain; width: 18px; height:18px; display: inline-block;
right: 0; top: 15px; position:absolute }
.el-form{ margin-top: 50px}
</style>
</style>


