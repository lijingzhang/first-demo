<template>
	<div >
	<el-container>
		<v-header title="充值">
			<span slot="left"  @click="$common.back()">返回</span>
		</v-header>
		<el-main>
			<div class=" pl0">
				<el-form ref="form" status-icon :model="form" :rules="rules" label-width="65px">
					<el-form-item label="用户名" prop="cardNum">
						<el-input v-model="form.tradeMoney"  placeholder="请输入充值金额" ></el-input>
					</el-form-item>
					<el-form-item label="密  码" prop="password">
						<el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-row >
						<el-col :span="24">
						<el-button class="w100 mb15" type="primary" @click="onSubmit('form')">登录</el-button>
						</el-col>
					</el-row>
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
					tradeMoney: '',
					
				},
				 rules: {
					  tradeMoney: [
					     { required: true, message: '请输入用户名',  trigger: ['blur', 'change'] },
						{ min: 3,message: '长度至少3个字符', trigger: 'blur' }
					],
					password: [
					 { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
						{ min: 6,  message: '长度在至少6个字符', trigger: 'blur' }
					],
                 },
                  centerDialogVisible: false

			}
		},
		methods: {
			onSubmit(formName) {
				  this.$refs[formName].validate((valid) => {
					if (valid) {
					var formData= this.$qs.stringify(this.form) // form为form名称获取表单数据
					 this.$http.post("/api/pay/recharge",formData, {
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  })
                  .then(response=>{
						// this.goods=response.data;
						console.log(response.data);
						this.$router.replace({ path: '/home' })//跳转到home页面
					})
					.catch(error=>{
					alert("网路错误，不能访问");
					});
					} else {
						console.log('error submit!!');
						return false;
					}
					});
				},
				showAlert:function(){
					swal('Hello Vue world!!!');
				},
			  skip:function(a){
				this.$router.push(a)}//点击页面跳转
			}  
	
    }
</script>

