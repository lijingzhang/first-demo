<template>
	<div >
	<el-container>
		<v-header title="转账">
			<span slot="left"  @click="$common.back()">返回</span>
            <router-link to="/"转账记录></router-link>
		</v-header>
		<el-main>
			<div class=" pl0 border-t10">
				<el-form ref="form"  :model="form"  label-width="80px">
					<el-form-item label="对方账户" prop="receivecount">
						<el-input type="number" v-model="form.receivecount"  placeholder="请输入对方账户手机号(限本平台)" ></el-input>
					</el-form-item>
					<div class="pl15 pr15 pb15">
						<p class="gray tl f12 mb25">（ 钱将实时转入对方账户，无法退还 ）</p>
						 <el-button class="w100 mt30 "   type="primary" disabled="disabled" ref="button"  @click="nextStep">下一步</el-button>
					
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
					receivecount: '',
					
				},
                  centerDialogVisible: false

			}
		},
		methods:{
		 nextStep: function(){
			   this.$router.push({path:'/transfer?'+'receivecount='+this.form.receivecount})
			}
		},
		 watch:{  //实时监听 地址栏传参方法
			form:{
				handler:function(val,oldval){
					//设置按钮状态
					if(this.form.receivecount!=''){
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
.el-form .el-form-item:first-child{ border: none; border-bottom: 1px solid #dcdfe6}
</style>
