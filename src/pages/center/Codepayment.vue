<template>
	<div >
	<el-container>
		<v-header title="付款">
			<span slot="left"  @click="$common.back()">返回</span>
		</v-header>
		<el-main>
			<div class=" pl0 border-t10">
				<el-form ref="form"  :model="form" label-width="80px">
					<el-form-item label="收款人" prop="username">
						<el-input  v-model="form.username"  ref="input"></el-input>
					</el-form-item>
					<el-form-item label="付款类型" prop="countType">
						<el-input  v-model="form.countType"   ref="input1"></el-input>
					</el-form-item>
					<el-form-item label="付款金额" prop="num">
						<el-input type="number" v-model="form.num" ref="input2" ></el-input>
					</el-form-item>
					<div class="pl15 pr15 pb15">
						 <el-button class="w100 mt30 "   type="primary"   @click="isShow=true">确定</el-button>
					
					</div>	
					  <div class="popContainer" v-if="isShow"  @click="hidePanel">
						<el-card class="box-card " id="myPanel">
							<div slot="header" class="clearfix">
								<span>请输入密码</span>
							</div>
							<el-form-item label="账号密码" prop="payPwd">
								<el-input v-model="form.payPwd" type="password"  placeholder="请输入账号付款密码" ></el-input>
							</el-form-item>
							<el-button class="w100 mt30 "   type="primary"  @click="onSubmit('form')" disabled='disabled' ref="button">付款</el-button>
						</el-card>
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
				form:{
					username:this.$route.query.username,
					num:this.$route.query.num,
					countType:this.$route.query.type,
					telphone:this.$route.query.phone,
					payPwd:'',
				},
				isShow:false,
				
			}
		},
		 created() {
			this.$nextTick(()=>{
				this.$refs.input.$el.children[0].setAttribute('readOnly','readOnly');
				this.$refs.input1.$el.children[0].setAttribute('readOnly','readOnly');
				this.$refs.input2.$el.children[0].setAttribute('readOnly','readOnly');
			})
		},
		methods:{
			onSubmit(formName) {
					var formData= this.$qs.stringify(this.form) // form为form名称获取表单数据
					 this.$http.post("/api/count/scanPay",formData, {
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  })
                  .then(response=>{
                      this.Show=false;
                        if(response.data.code=='success'){
                          this.$confirm("付款成功！", '提示', {
                                confirmButtonText: '确定',
                                center: true,
                                showClose:false,
                                showCancelButton:false
                            })
                            .then(() => {
                                this.$router.push("/index")
                            })
                        }
                        else{
                             this.$confirm(response.data.message, '提示', {
                                confirmButtonText: '确定',
                                center: true,
                                showClose:false,
                                showCancelButton:false
                            })
                        }
					
					})
					.catch(error=>{
					alert("网路错误，不能访问");
					});
				
				
				},
				 //点击弹出框以外的区域隐藏弹出框
				hidePanel: function(event){
					var sp = document.getElementById("myPanel");
					if(sp){
						if(!sp.contains(event.target)){            //这句是说如果我们点击到了id为myPanel以外的区域
						this.Show=false;
						}
					}

				},
			
		},
		 watch:{  //实时监听 地址栏传参方法
			form:{
				handler:function(val,oldval){
					//设置按钮状态
					if(this.form.payPwd!=''){
						this.$nextTick(()=>{
							this.$refs.button.$el.removeAttribute('disabled');
							//去除属性ref=button上的指定class：is-disabled
							var classVal=this.$refs.button.$el.getAttribute("class");
							classVal=classVal.replace('is-disabled','')
							this.$refs.button.$el.setAttribute("class",classVal)
						})
					}
					else{
						this.$refs.button.$el.setAttribute("disabled","disabled");
						
					}
				},
				deep:true
			}
		},
    }
</script>

<style lang="scss" scoped>
.el-form .el-form-item:first-child{ border: none; border-bottom: 1px solid #dcdfe6}
 /* 遮罩层 */
   .popContainer{
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;z-index: 9999;
    background: rgba(0,0,0,0.3);
    & .box-card{ width: 90%;text-align: center; background: #fff; position: absolute;bottom:35%;left: 5%;
        & .text{ line-height: 45px;border-bottom: 1px solid #f0eff5}
    }
    
}
</style>
