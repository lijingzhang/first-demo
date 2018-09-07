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
              <div class="tc f20 red mt10 mb15" v-if="this.$route.query.num!=0"><b>{{this.$route.query.countType | fhType}}{{this.$route.query.num}}</b></div>
              <div class="relative mt20">
	            	<vue-qr id="qrcode"   :logoSrc="config.imagePath" :callback="test" :logoMargin="3" :text="config.value" :size="200" :margin="0"></vue-qr>
              </div>
           <el-row class="mt10">
              <el-col :span="11">
                <div class="tc mt10"><router-link class="deep_blue" to="/setNum">设置金额</router-link></div>
              </el-col>
               <el-col :span="2" class="tc gray"><div class="line"></div></el-col>
               <el-col :span="11">
                  <div class="tc mt10 deep_blue" @click="downloadImg()">保存图片</div>
              </el-col>
           </el-row>
              
        </div>
      </div>
    </el-main> 
  </el-container>
  </div>
</template>

<script>

export default {
  data () {
    return {
       userinfo: {
            avatar: '',
            username:'',
            phone:'',
            num:'0',
            type:'CNY'
        },
       	config: {
					value: '',
					imagePath: '',
					// filter: 'color'
				},
        codes:'',
    }
  },

  created() {
    this.loadUserInfo();
     this.config.value='/Codepayment?'+'phone='+this.userinfo.phone+'&&num='+this.userinfo.num+'&&type='+this.userinfo.type+'&&username='+this.userinfo.username
  },
 mounted () {
    this.defaulcode();
    // this.useqrcode();
    
  },
  methods: {
       test(dataUrl,id){
            console.log(dataUrl, id)
             this.config.value='/Codepayment?'+'phone='+this.userinfo.phone+'&&num='+this.userinfo.num+'&&type='+this.userinfo.type+'&&username='+this.userinfo.username
        },
        downloadImg(){
                var oQrcode = document.querySelector('#qrcode img')
                var url = oQrcode.src
                var a = document.createElement('a')  
                var event = new MouseEvent('click')  
                // 下载图名字
                a.download = '二维码'
                //url 
                a.href = url 
                //合成函数，执行下载 
                a.dispatchEvent(event)
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
                  this.userinfo.avatar=response.data.img;
                  this.userinfo.username=response.data.username;
                  this.userinfo.phone=response.data.phone;
                  this.config.imagePath=response.data.img //二维码中间的logo
              }
            } 
        
        })
        .catch(error=>{
                //超时之后在这里捕抓错误信息.
                console.log(error);
        });
    },
     downcode(){
       var oQrcode = document.querySelector('#qrcode img')
                var url = oQrcode.src
                var a = document.createElement('a')  
                var event = new MouseEvent('click')  
                // 下载图名字
                a.download = '张三的二维码'
                //url 
                a.href = url 
                //合成函数，执行下载 
                a.dispatchEvent(event)

     },
      defaulcode(){
          this.userinfo.type=this.$route.query.countType
          this.userinfo.num=this.$route.query.num
          this.$http.get("/count/settypeAndnum",{params:{type: this.userinfo.type,num:this.userinfo.num}}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(response=>{
            this.userinfo.num=response.data.num;
            this.userinfo.type=response.data.type;
            this.$options.methods.useqrcode.bind(this)();//调用methods中的另一个方法
          })
          .catch(error=>{
                  //超时之后在这里捕抓错误信息.
                  console.log(error);
          });
      },
      // useqrcode(){
      //   var canvas = document.getElementById('canvas')
      //   QRCode.toCanvas(canvas, '/Codepayment?'+'phone='+this.userinfo.phone+'&&num='+this.userinfo.num+'&&type='+this.userinfo.type+'&&username='+this.userinfo.username, function (error) {
      //     if (error) console.error(error)
      //     console.log('success!');
         
      //   })
      // },



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
  .line{ width: 1px; height: 18px;background: #a1a1a1;margin: 10px auto 0;}
</style>

