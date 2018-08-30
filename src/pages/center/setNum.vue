<template>
	<div >
	<el-container>
		<v-header title="设置金额">
			<span slot="left"  @click="$common.back()">返回</span>
		</v-header>
		<el-main>
			<div class=" pl0 border-t10">
				<el-form ref="form"  :model="form" label-width="80px">
					<el-form-item label="收款类型" prop="countType">
						<el-input  v-model="form.countType" @click.native="isShow=true" ref="countType" placeholder="请选择款项类型" ></el-input>
						<i class="gray_right"></i>
					</el-form-item>
					
					<el-form-item label="收款金额" prop="num">
						<el-input type="number" v-model="form.num"  placeholder="请输入对方需要付款的金额" ></el-input>
					</el-form-item>
					<div class="pl15 pr15 pb15">
						 <el-button class="w100 mt30 "   type="primary" disabled="disabled" ref="button"  @click="nextStep">确定</el-button>
					
					</div>	
				</el-form>
			</div>	
             <div class="popContainer" v-if="isShow" @click="isShow=false">
				<el-card class="box-card ">
					<div slot="header" class="clearfix">
						<span>选择货币类型</span>
					</div>
					<div  v-for="(item, idx) in countArr" :key="idx" class="text item" @click="countype(idx)">
						{{idx | countType}}
					</div>
					<div class="mt15 w100 blue " @click="isShow=false">取消</div>
				</el-card>
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
		 created() {
			this.loadcountType();
				this.$nextTick(()=>{
				this.$refs.countType.$el.children[0].setAttribute('readOnly','readOnly');
			})
		},
		methods:{
		 nextStep: function(){
			   this.$router.push({path:'/QRcode?'+'countType='+this.form.countType+'&&num='+this.form.num})
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
		 watch:{  //实时监听 地址栏传参方法
			form:{
				handler:function(val,oldval){
					//设置按钮状态
					if(this.form.num!=''&&this.form.countType!=''){
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
</style>
