<template>
	<div >
	<el-container>
		<v-header title="修改密码">
			<span slot="left"  @click="$common.back()">返回</span>
		</v-header>
		<el-main>
			<div class="  border-t10">
				<el-form ref="form"  :model="form"  label-width="80px">
					<el-form-item label=" 旧密码" prop="oldpassword">
						<el-input v-model="form.oldpassword" type="password"   placeholder="请输入旧密码"></el-input>
					</el-form-item>
					<el-form-item label=" 新密码" prop="newpassword">
						<el-input v-model="form.newpassword" type="password"   placeholder="请输入新密码"></el-input>
					</el-form-item>
					<el-form-item label="重复密码" prop="password">
						<el-input v-model="password" type="password"   placeholder="请再次输入新密码"></el-input>
					</el-form-item>
					<div class="pl15 pr15">
						<el-button class="w100 mb15 mt40" type="primary" disabled="disabled" ref="button" @click="onSubmit('form')">重置密码</el-button>
					</div>
					
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
					oldpassword: '',
					newpassword: '',
				},
				password:'',

			}
		},
		methods:{
			onSubmit(formName) {
				if(this.password!=this.form.newpassword){
					this.$confirm('两次密码不一致，请重新输入', '提示', {
						confirmButtonText: '确定',
						center: true,
						showClose:false,
						showCancelButton:false
					})
				}
				else{
					// var formData= this.$qs.stringify(this.form) // form为form名称获取表单数据
					const params  = {oldpassword: this.form.oldpassword, newpassword: this.form.newpassword}
					this.$http.get("/user/resetpwdmode",{params:params}, {
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
								setTimeout( () => {
									this.$confirm("恭喜您，密码修改成功!", '提示', {
									confirmButtonText: '确定',
									center: true,
									showClose:false,
									showCancelButton:false,
									callback: action => {
									this.$router.push("/centerindex")
									}
									});
									
								}, 1000);
							}
						})
						.catch(error=>{
						//超时之后在这里捕抓错误信息.
						console.log(error);
					
						
						})
					
				}
				
				},
		
		},
		  watch:{  //实时监听
				form:{
					handler:function(val,oldval){
						//监听提交按钮状态
						if(this.form.oldpassword!=''&&this.form.newpassword!=''){
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
