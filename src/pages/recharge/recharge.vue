<template>
	<div >
	<el-container>
		<v-header title="充值">
			<span slot="left"  @click="$common.back()">返回</span>
		</v-header>
		<el-main>
			<div class=" pl0  border-t10">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="充值账户" prop="accountName">
						<el-input ref="account" v-model="accountName"  @click.native="isShow=true"  placeholder="请选择充值账户" ></el-input>
						<i class="gray_right"></i>
					</el-form-item>
					<el-form-item label="充值方式" prop="payType">
						<el-input v-model="form.payType"  placeholder="请输入充值方式"></el-input>
							<i class="gray_right"></i>
					</el-form-item>
					<el-form-item label="充值金额" prop="tradeMoney">
						<el-input v-model="form.tradeMoney"  placeholder="请输入充值金额"></el-input>
					</el-form-item>
					<div class="pl15 pr15 pb15">
						<el-button class="w100 mb15 mt15" type="primary" @click="onSubmit('form')">登录</el-button>
					</div>
				</el-form>
			</div>	
            
		</el-main>
		 <div class="popContainer" v-if="isShow" @click="isShow=false">
			<el-card class="box-card ">
				<div slot="header" class="clearfix">
					<span>选择充值账户</span>
				</div>
				<div  v-for="data in countArr" class="text item" @click="countype(data.id,data.cardId,data.countType)">
						{{data.cardId}}({{data.countType}}) 
					</div>
				<div class="mt15 w100 blue " @click="isShow=false">取消</div>
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
					tradeMoney: '',
					payType:'',
					countId:'',
					
				},
				accountName:'',
				countArr:[],
				isShow:false,
				
			}
		},
		created() {
			this.loadcount();//加载账户
			this.$nextTick(()=>{
				this.$refs.account.$el.children[0].setAttribute('readOnly','readOnly');
			
			})
		},
		methods: {
			onSubmit(formName) {
					var formData= JSON.stringify(this.form); // 获取表单数据并转为json数组
                    var params  = new URLSearchParams();
                    params.append('datas', formData);
					 this.$http.post("/pay/recharge",params, {
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  })
                  .then(response=>{
						if(response.data.code=="success"){
							this.$router.replace({ path: '/home' })//跳转到home页面
						}
						console.log(response.data);
						
					})
					.catch(error=>{
					alert("网路错误，不能访问");
					});
				
					
				},
				 loadcount(){
					this.$http.get('/count/queryCountByUserid').then(response => {
						if(response.data.code=="fail"){
							this.$confirm('操作失败！检查是否登录', '提示', {//是否登陆
							confirmButtonText: '确定',
							showClose:false,
						showCancelButton:false,
							center:true
							})
						}
						else{
							this.countArr=response.data;
						}
					})
					.catch(error=>{
						//超时之后在这里捕抓错误信息.
							console.log(error);
            		});
				  },
				  countype(id,cardId,type){
					  this.form.countId=id;
					  this.accountName=cardId+'('+type+')';
					
				  }
			
			}  
	
    }
</script>

