<template>
  <div class="wrapper" ref="wrapper">
      <el-container  >
    <div  class="comomtips" v-show="loadShow"><i class="el-icon-loading"></i></div>
         <el-main style="padding-top:0">
             <div class="headcenter">
                 <div class="top tc">
                      个人中心   <router-link class="r" to="/setting" ><i   class="el-icon-setting">设置</i></router-link>
                </div>
                <div class="content">
                    <div class="tc head_img">
                         <img :src="userInfo.avatar" @click.stop="uploadHeadImg" onerror="this.src='../../assets/images/head.png'"/>
                         <input type="file" accept="image/*" mutiple="mutiple"  @change="handleFile" class="hiddenInput"/>
                    </div>
                    <div class="tc" v-if="userInfo.username!=''">欢迎您，{{userInfo.username}}</div>
                     <div class="tc" v-if="userInfo.username==''">欢迎您，{{userInfo.phone}}</div>
                    <div class="tc f12 pt5 pb20">上次登录:{{userInfo.lasttime}}</div>
                    <el-row >
                        <el-col :span="6">
                            <div >2</div>
                            <div>银行卡</div>
                        </el-col>
                        <el-col :span="6" >
                             <router-link to="/list">
                            <div >2</div>
                            <div>待办</div>
                             </router-link>
                        </el-col>
                        <el-col :span="6" >
                            <div>2</div>
                            <div>待办</div>
                        </el-col>
                        <el-col :span="6" >
                            <div>2</div>
                            <div>待办</div>
                        </el-col>
                    </el-row>  
                </div>
                
             </div>
            <el-row class="pt15 pb15 ">
                <el-col :span="6">
                    <router-link to="/chatList">
                        <div ><img src="../../assets/images/center_xx.png" class="img1x" alt=""></div>
                        <div>信箱</div>
                    </router-link>    
                </el-col>
                <el-col :span="6" >
                    <router-link to="/loan">
                        <div ><img src="../../assets/images/center_jd.png" class="img1x" alt=""></div>
                        <div>我的借贷</div>
                    </router-link>
                </el-col>
                <el-col :span="6" >
                    <router-link to="/trade_log">
                        <div ><img src="../../assets/images/center_jl.png" class="img1x" alt=""></div>
                        <div>收支记录</div>
                    </router-link>
                </el-col>
                <el-col :span="6" >
                      <router-link to="/account">
                        <div ><img src="../../assets/images/center_zh.png" class="img1x" alt=""></div>
                        <div>账户总览</div>
                      </router-link>
                </el-col>
            </el-row>  
            <div class="list_group">
                <div class="list_head">
                    我的
                </div>
                <div class="list_item" >
                    <router-link to="/authentication">
                        <el-row>
                            <el-col :span="2" ><i class="el-icon-date"></i></el-col>
                            <el-col :span="20" >实名认证</el-col>
                            <el-col :span="2" class="tr"><i class="el-icon-arrow-right"></i></el-col>
                        </el-row>  
                    </router-link>
                </div>
                 <div class="list_item" >
                    <router-link to="/account">
                        <el-row>
                            <el-col :span="2" ><i class="el-icon-date"></i></el-col>
                            <el-col :span="20" >我的账户</el-col>
                            <el-col :span="2" class="tr"><i class="el-icon-arrow-right"></i></el-col>
                        </el-row>  
                    </router-link>
                </div>
            </div>
            <div class="list_group">
                <div class="list_head">
                    交易
                </div>
                <div class="list_item" >
                    <router-link to="/recharge">
                        <el-row>
                            <el-col :span="2" ><i class="el-icon-date"></i></el-col>
                            <el-col :span="20" >充值</el-col>
                            <el-col :span="2" class="tr"><i class="el-icon-arrow-right"></i></el-col>
                        </el-row>  
                    </router-link>
                </div>
               <div class="list_item" >
                    <router-link to="/recharge">
                        <el-row>
                            <el-col :span="2" ><i class="el-icon-date"></i></el-col>
                            <el-col :span="20">提现</el-col>
                            <el-col :span="2" class="tr"><i class="el-icon-arrow-right"></i></el-col>
                        </el-row>  
                    </router-link>
                </div>
                <div class="list_item" >
                    <router-link to="/recharge">
                        <el-row>
                            <el-col :span="2" ><i class="el-icon-date"></i></el-col>
                            <el-col :span="20">转账</el-col>
                            <el-col :span="2" class="tr"><i class="el-icon-arrow-right"></i></el-col>
                        </el-row>  
                    </router-link>
                </div>
            </div>
              <div class="popContainer" v-if="isshow"  >
            <el-card class="box-card " style="overflow-y:scroll;">
                <div slot="header" class="clearfix">
                    <span>预览图片</span>
                    <span @click="isshow=false" class="left_back">返回</span>
                </div>
                <div >
                   <img :src="userInfo.head" class="w100 ylimg"/>
                </div>
               <el-button class="w100 mt20 "  type="primary"   @click="onSubmit">使用</el-button>
            </el-card>
        </div>
         </el-main>
         <v-footer ></v-footer>
           
      </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
        userInfo: {
            avatar: '',
            head:'',
            lasttime:'',
            username:'',
            phone:''
        },
        // 初始图片
        isshow:false,
        isSize:0,
        loadShow:false,
    }
  },
  created(){
      this.loadUserInfo();
  },
  methods: {
    // 打开图片上传
    uploadHeadImg: function () {
      this.$el.querySelector('.hiddenInput').click()
    },
    // 将头像显示
    handleFile: function (e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      var reader = new FileReader()//创建读取文件的方法
        this.isshow=true
        this.isSize =file.size / 1024 
      reader.onload = (data) => {
        let res = data.target || data.srcElement
         this.userInfo.head = res.result//把图片的二进制流赋值给head
      
      }
      reader.readAsDataURL(file)//将文件已url的形式读入页面
    },
    onSubmit:function(){
        this.isshow= false; 
        if(this.isSize<57){
            this.loadShow=true;
             setTimeout( () => {
                var imgurl=this.userInfo.head
                this.$http.get("/user/uploadimg",{params:{img:imgurl }}, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(response=>{
                    if(response.data.code=="success"){
                        this.userInfo.avatar= imgurl;
                        this.loadShow=false;
                    }
                    else{
                        this.$confirm(response.data.message, '提示', {
                        confirmButtonText: '确定',
                        showClose:false,
                        showCancelButton:false,
                        center:true
                        })
                    }
                    
                
                })
                .catch(error=>{
                        //超时之后在这里捕抓错误信息.
                        console.log(error);
                });
             }, 1500);
        }
        else{
             this.$confirm("图片大小不能大于56KB", '提示', {
                confirmButtonText: '确定',
                showClose:false,
                    showCancelButton:false,
                center:true
                })
        }
           
      
         
    },
    loadUserInfo(){
         this.$http.get("/user/getuser", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response=>{
            if(response.data==''){
                  this.$confirm("登录超时，请重新登录！", '提示', {
                        confirmButtonText: '确定',
                        showClose:false,
                        showCancelButton:true
                    })
                    .then(() => {
                        this.$router.push("/login")
                    })
            }
            else{
                if(response.data.code=="fail"){
               this.$confirm(response.data.message, '提示', {
                confirmButtonText: '确定',
                showClose:false,
                showCancelButton:false,
                center:true
                })
                .then(() => {
                      this.$router.push("/login")
                })

            }
            else{
                this.userInfo.avatar=response.data.img;
                this.userInfo.lasttime=response.data.lasttime;
                this.userInfo.username=response.data.username;
                this.userInfo.phone=response.data.phone;
              
            }
            } 
        
        })
        .catch(error=>{
                //超时之后在这里捕抓错误信息.
                console.log(error);
        });
    }
    
  }

}
</script>
 <style lang="scss" scoped>
/* 列表 */
   .list_group{ padding-left: 15px;border-top: 8px solid #f0eff5}
   .list_item { padding: 10px;text-align: left; border-bottom: 1px solid #eeeeee;color: #333333}
   .list_item a{color: #333}
   .list_item:last-child{border-bottom: 0}
   .list_head{color: #999;border-bottom: 1px solid #f5f5f5;text-align: left;padding: 10px 0}
   .list_group i{ vertical-align: middle}

  
.top{	position: relative;
		line-height: 45px;
		color: #fff;
		text-align: center;
		width:100%;
	
    a{position: absolute	;right: 10px;color: #fff;}    
        }
	@media (min-width: 320px){
    .top{font-size:14px;}
	}
	
	@media (min-width: 360px){
	.top{font-size:16px;}
	}
@function imgpx($px) {
    @return $px / 75px * 1rem;
}
.img3x{width: imgpx(300px)}
.img2x{width: imgpx(200px)}
.img1x{width: imgpx(100px)}
  .headcenter{
      background: url("../../assets/images/centerbg.png") no-repeat center;background-size: cover;padding: 0 0 15px 0;color:#fff;
      .content{
          img{border-radius: 50%;}
      }
  }

  .head_img{
  height: 90px;margin:5px 0;
}
.head_img img{
  width:90px;
  height:90px;
  border-radius:50px
}
.setting_right{
  display: flex;
  height: 37px;
  justify-content: flex-end;
  align-items: center;
}
.hiddenInput{
  display: none;
}
.caption {
  color: #8F8F8F;
  font-size: 26px;
  height: 37px;
}


      /* 遮罩层 */
.popContainer{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;z-index: 9999;
    background: rgba(0,0,0,0.3);
    & .box-card{ width: 100%;text-align: center; background: #fff; position: absolute;bottom: 0;left: 0;height: 100%;
        & .text{ line-height: 45px;border-bottom: 1px solid #f0eff5}
    }
    
}
.el-card__header{ position: relative}
.ylimg{ max-height: 80%; max-width: 100%;}
.left_back{ position: absolute;top: 15px; left: 15px;}
</style>

 

