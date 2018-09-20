<template>
	<div >
	<el-container>
		<v-header title="转账">
			<span slot="left"  @click="$common.back()">返回</span>
            <router-link to="/"转账记录></router-link>
		</v-header>
		<el-main>
           <div class="popContainer" v-show="loadShow"> <div  class="comomtips" ><i class="el-icon-loading"></i></div></div>
			<div class=" p15 mt30">
				<el-form ref="form"  :model="form"  label-width="80px">
                    <div class="tc mb40">
                         <img src="../../assets/images/head.png" alt="" width="80">
                         <p >{{this.$route.query.receivecount}}</p>
                    </div>
					<el-form-item label="转账金额" prop="moneynum">
						<el-input v-model="form.moneynum" type="number" placeholder="请输入转账金额" ref="moneynum"></el-input>
					</el-form-item>
                   <el-form-item label="付款账号" prop="cardid">
                        <el-input v-model="cardid" @click.native="isShow=true" ref="cardid" placeholder="请选择付款账号" class="pr30"></el-input>
                        <i class="gray_right"></i>
                    </el-form-item>
					<el-button class="w100 mb15 mt30" type="primary" ref="button" disabled="disabled"  @click="Show=true">确认转账</el-button>
					<div class="popContainer transfer" v-if="Show" @click="hidePanel">
                        <el-card class="box-card "  id="myPanel">
                            <div slot="header" class="clearfix">
                                <span>确认付款</span>
                            </div>
                            <div v-if="countType=='USD'" class="f16"><b>$</b>{{form.moneynum}}</div>
                             <div v-if="countType=='CNY'" class="f16"><b >￥</b>{{form.moneynum}}</div>
                             <el-form-item class="mt30" label="订单信息" >
                                   <span class="r">转账</span>
                                </el-form-item>
                                 <!-- <el-form-item label="付款账号" prop="countid">
                                    <el-input v-model="cardid" @click.native="isShow=true" placeholder="请选择付款账号" class="pr30"></el-input>
                                    <i class="gray_right"></i>
                                </el-form-item> -->
                                 <el-form-item label="账号密码" prop="payPwd">
                                    <el-input v-model="form.payPwd" type="password" placeholder="请输入账号付款密码" ></el-input>
                                </el-form-item>
                                <el-button class="w100 mt30 "   type="primary" disabled="disabled" ref="button2"  @click="onSubmit('form')">付款</el-button>
                        
                        </el-card>
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
                        <el-col :span="12" class="tr">
                            余额：{{item.blance}}
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
                    moneynum:'',
                    receivecount: '',
                    receivetype:'',
                    countid:'',
                    payPwd:'',
					
                },
                cardid:'',
                countType:'',
                Show:false,
                 isShow:false,
                 countArr:[],
                 loadShow:false

			}
        },
        
          created() {
            this.loadcount();  //加载自己的账户
            	this.$nextTick(()=>{
				this.$refs.cardid.$el.children[0].setAttribute('readOnly','readOnly');
            });
          
         
        },
		methods: {
			onSubmit(formName) {
                this.form.receivecount=this.$route.query.receivecount; //上个页面传递下来的对方账户参数
                    var formData= this.$qs.stringify(this.form) // form为form名称获取表单数据
                     const params  = {moneynum: this.form.moneynum, receivecount: this.form.receivecount,countid:this.form.countid,payPwd:this.form.payPwd,receivetype:this.form.receivetype}
					 this.$http.get("/count/switch",{params:params}, {
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  })
                  .then(response=>{
                      this.Show=false;
                        if(response.data.code=='success'){
                        this.loadShow=true;
                        //   this.$confirm("转账成功！", '提示', {
                        //         confirmButtonText: '确定',
                        //         center: true,
                        //         showClose:false,
                        //         showCancelButton:false
                        //     })
                        //     .then(() => {
                        //         this.$router.push("/trade_log")
                        //     })
                        let type='转账'
                        let  d =new Date();
                        let  resDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
                        let datas = {
                            type,
                            moneynum:this.form.moneynum,
                            receivecount:this.form.receivecount,
                            countType:this.countType,
                            snumber:response.data.message,
                            datatime:resDate

                            };
                         localStorage.setItem('confirmOrderData', JSON.stringify(datas)); 
                        //  console.log(JSON.stringify(datas));   
                        setTimeout( () => {
                            this.$router.push("/tradeDetail")
                                console.log("123")
                        },1000)
                        }
                        else{
                            this.form.payPwd="";
                             this.$confirm(response.data.message, '提示', {
                                confirmButtonText: '确定',
                                center: true,
                                showClose:false,
                                showCancelButton:false
                            })
                        }
					
					})
					.catch(error=>{
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
               this.form.countid=id;
               this.cardid=cardId+'('+countType+')';
               this.countType=countType;
               this.isShow=false;
               this.form.receivetype=countType
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
        watch:{  //实时监听
            form:{
                handler:function(val,oldval){
                    //转账金额页设置按钮状态
                    if(this.form.moneynum!=''&&this.form.countid!=''){
                        this.$nextTick(()=>{
                            this.$refs.button.$el.removeAttribute('disabled');
                            //去除属性ref=button上的指定class：is-disabled
                            var classVal=this.$refs.button.$el.getAttribute("class");
                            classVal=classVal.replace('is-disabled','')
                            this.$refs.button.$el.setAttribute("class",classVal)
                        })
                    }

                    //输入密码框设置按钮状态
                    if(this.form.payPwd!=''){
                        this.$nextTick(()=>{
                            this.$refs.button2.$el.removeAttribute('disabled');
                            //去除属性ref=button上的指定class：is-disabled
                            var classVal1=this.$refs.button2.$el.getAttribute("class");
                            classVal1=classVal1.replace('is-disabled','')
                            this.$refs.button2.$el.setAttribute("class",classVal1)
                        })
                    }
                },
                deep:true
            }
        },
	
    }
</script>

<style lang="scss" scoped>
  .el-form .el-form-item{ border: none;border-bottom: 1px solid #d2d2d2; height: 50px;line-height: 50px;position: relative;
        .el-form-item__content,.el-form-item__label{height: 50px;line-height: 50px; }
      
    }

</style>

