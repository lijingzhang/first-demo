<template>
  <div class="wrapper" ref="wrapper">
      <el-container  >
    <v-header title="我的收款码">
        <span slot="left"  @click="$common.back()">返回</span>
    </v-header>
    <el-main  >
      <div class="p15 gray_bg">
        <div class="code_bg">
           <div class="title_head">
                <el-row>
                    <el-col :span="12" class="tl f16 yellow pb10">我的收款码</el-col>
                </el-row>  
            </div>
              <div class="mt15">用南方汇兑APP扫二维码向我付款</div>
              <div class="tc f20 red mt10 mb15"><b>{{this.$route.query.ttype | fhType}}{{this.$route.query.tnum}}</b></div>
              <div class="relative">
                  <div id='code'></div>
                <canvas id="canvas"></canvas>
                <img class="small_head" :src="userinfo.avatar" alt="">
              </div>
              
              <div class="tc mt10"><router-link class="deep_blue" to="/setNum">设置金额</router-link></div>
          
        </div>
      </div>
    </el-main> 
  </el-container>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  data () {
    return {
       userinfo: {
            avatar: '',
            username:'',
            phone:'',
            num:'',
            type:''
        },
        codes:'',
    }
  },
  components: {
      QRCode: QRCode
    },
  created() {
    this.loadUserInfo();
  
  },
 mounted () {
    this.defaulcode();
    this.useqrcode();
  },
  methods: {
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
              }
              else{
                  this.userinfo.avatar=response.data.img;
                  this.userinfo.username=response.data.username;
                  this.userinfo.phone=response.data.phone;
                
              }
            } 
        
        })
        .catch(error=>{
                //超时之后在这里捕抓错误信息.
                console.log(error);
        });
    },
      defaulcode(){
      
          this.$http.get("/count/settypeAndnum",{params:{type:this.$route.query.ttype,num:this.$route.query.tnum}}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(response=>{
            this.userinfo.num=response.data.num;
            this.userinfo.type=response.data.type;
            this.$options.methods.useqrcode.bind(this)();//调用methods中的另一个方法
            console.log(this.userinfo.username)
          })
          .catch(error=>{
                  //超时之后在这里捕抓错误信息.
                  console.log(error);
          });
      },
      useqrcode(){
        var canvas = document.getElementById('canvas')
        QRCode.toCanvas(canvas, '/Codepayment?'+'phone='+this.userinfo.phone+'&&num='+this.userinfo.num+'&&type='+this.userinfo.type+'&&username='+this.userinfo.username, function (error) {
          if (error) console.error(error)
          console.log('success!');
         
        })
      },



  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .gray_bg{ background: #f0eff5}
  .relative{position: relative}
  .code_bg{background: #fff;border-radius: 6px;padding: 15px; padding-bottom:60px;}
  .title_head{ border-bottom:1px solid #f5bf66}
  .yellow{color: #f5bf66}
  .small_head{ position: absolute;top:41%;left:45%;width: 30px; z-index: 999;}
</style>

