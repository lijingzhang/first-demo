<template>
	<div class="login_bg">
	<el-container>
		<el-main class="p15 pt55 ">
			<div class=" pl0">
				<div class="tc mb15"><img src="../assets/images/logo.png" width="120"></div>
				<el-form ref="form"  :model="form"  label-width="80px" >
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
					<el-form-item label="密  码" prop="password" >
						<el-input v-model="form.password" type="password"  placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-row>
						<el-col :span="24">
						<el-button class="w100 mt40 mb15" type="primary" disabled="disabled" ref="button" @click="onSubmit('form')">登  录</el-button>
						</el-col>
						
					</el-row>
					<el-row class="white">
						<el-col :span="12" class="tl">
							<router-link to="/" >忘记密码</router-link>
						</el-col>
						<el-col :span="12" class="tr">
							<router-link to="/register">注册</router-link>
						</el-col>
					</el-row>
					 <!-- <el-checkbox  style="color:#a0a0a0;">一周内自动登录</el-checkbox> -->
				</el-form>
			</div>	
		</el-main>
	</el-container>
</div>
</template>
<script>
import * as types from '../store/types.js'
    export default {
        data() {
			return {
				form: {//form名称
					phone: '',
					telphone: '',
					password: '',
					
				},
			
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
		//页面加载调用获取cookie值
		mounted(){
		this.getCookie();
	     this.$store.commit(types.TITLE, 'Login');
        },
		methods: {
			onSubmit(formName) {
					this.form.telphone=this.value+this.form.phone;
					var formData= this.$qs.stringify(this.form) // form为form名称获取表单数据
					 this.$http.post("/api/user/login",formData, {
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
				  }).then(response=>{
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
							 if (this.form.password) {
								this.$store.commit(types.LOGIN, this.form.password)
								let redirect = decodeURIComponent(this.$route.query.redirect || '/');
								this.$router.push({
									path: redirect
								})
							}
							//保存的账号
							var name=this.form.phone;
							this.setCookie(name,30);//设置cookie保存一个月
							setTimeout( () => {
								 this.$router.push("/index")
							
							 }, 1000);
						
						}
					
					})
					.catch(error=>{
					   //超时之后在这里捕抓错误信息.
                     console.log(error);
					});
					
				
				    },
					//设置cookie
					setCookie(c_name,exdays) {
						var exdate=new Date();//获取时间
						exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
						//字符串拼接cookie
						window.document.cookie="phone"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
						
					},
					//读取cookie
					getCookie:function () {
						if (document.cookie.length>0) {
						var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
						for(var i=0;i<arr.length;i++){
							var arr2=arr[i].split('=');//再次切割
							//判断查找相对应的值
							if(arr2[0]=='phone'){
							this.form.phone=arr2[1];//保存到保存数据的地方
							// let tel = this.form.telphone;
							// let reg = /^(\d{3})\d{4}(\d{4})$/;
							// this.form.telphone = tel.replace(reg, "$1****$2");

							}
						}
						}
					},
					  //清除cookie
					clearCookie:function () {
						this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
					}
			 },
			  watch:{  //实时监听
				form:{
					handler:function(val,oldval){
						//转账金额页设置按钮状态
						if(this.form.phone!=''&&this.form.password!=''){
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
.el-main{ background: none; }
.el-button--primary{ background: #e2514a;border: 1px solid #e2514a;border-radius: 6px}
.el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover {
    color: #fff;
    background-color: #f89894;
    border-color: #f89894;
}
.white a{color: #fff}

.el-form{ margin-top: 50px}
</style>




