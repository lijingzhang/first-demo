<template>
  <div class="height100">
    <el-container class="height100">
    <v-header title="南方汇兑"></v-header>
        <el-main >
          <div class="sub_header">
           <el-row>
            <el-col :span="12">
               <div><router-link to="/QRcode?ttype=CNY&&tnum=0"><img class="img3x pb10" src="../assets/images/sk_code.png" alt=""></router-link></div>
               <div>收款码</div>
            </el-col>
            <el-col :span="12">
              <div @click="startRecognize()" ><img class="img3x pb10" src="../assets/images/sm_code.png" alt=""></div>
               <div>扫码付</div>
            </el-col>
          </el-row>
        </div>
        <div class="scan" v-if="show">
        <div id="bcid">
          <div style="height:40%"></div>
          <p class="tip">...载入中...</p>
        </div>
        <!-- <div class="ffooter">
            <button @click="startRecognize">1.创建控件</button>
            <button @click="startScan">2.开始扫描</button>
            <button @click="cancelScan">3.结束扫描</button>
            <button @click="closeScan">4.关闭控件</button>
        </div> -->
    </div>
    
          <el-row>
            <el-col :span="8" >
              <router-link  to="/">
                <div><img class="img2x pb10" src="../assets/images/icon_tx.png"  alt=""></div>
                <div>提现</div>
              </router-link>
            </el-col>
            <el-col :span="8" >
               <router-link   to="/">
                <div><img class="img2x pb10"  src="../assets/images/phone.png" alt=""></div>
                <div>话费充值</div>
              </router-link>
            </el-col>
             <el-col :span="8" >
               <router-link  to="/transfer_next">
                <div><img class="img2x pb10" src="../assets/images/icon_zz.png" alt=""></div>
                <div>转账</div>
              </router-link>
            </el-col>
          </el-row>
           <el-row>
            <el-col :span="8" >
              <router-link  to="exchange">
                <div><img class="img2x pb10" src="../assets/images/icon_dh.png" alt=""></div>
                <div>兑汇</div>
              </router-link>
            </el-col>
            <el-col :span="8" >
               <router-link   to="/">
                <div><img class="img2x pb10"  src="../assets/images/icon_lc.png" alt=""></div>
                <div>理财</div>
              </router-link>
            </el-col>
             <el-col :span="8"  >
               <router-link  to="/">
                <div><img class="img2x pb10" src="../assets/images/icon_sh.png" alt=""></div>
                <div>生活</div>
              </router-link>
            </el-col>
          </el-row>
           <el-row>
            <el-col :span="8" >
              <router-link  to="/">
                <div><img class="img2x pb10" src="../assets/images/icon_cz.png" alt=""></div>
                <div>充值</div>
              </router-link>
            </el-col>
            <el-col :span="8" >
               <router-link   to="todayrate">
                <div><img class="img2x pb10"  src="../assets/images/icon_hl.png" alt=""></div>
                <div>汇率</div>
              </router-link>
            </el-col>
             <el-col :span="8" >
               <router-link  to="/">
                <div><img class="img2x pb10" src="../assets/images/icon_zd.png" alt=""></div>
                <div>账单查询</div>
              </router-link>
            </el-col>
          </el-row>
         
        </el-main>
    	<v-footer ></v-footer>
    </el-container>
  </div>
</template>

<script>
let scan = null;
export default {
  data () {
    return {
      show:false,
      codeUrl: '',
    }
  },
  created(){
    
  },
  methods:{
       //创建扫描控件
      startRecognize() {
        this.$nextTick(()=>{
          this.show=true;
        })
        let that = this;
        setTimeout( () => {   //延时缓冲加载
            if (!window.plus) return;
            scan = new plus.barcode.Barcode('bcid');
            scan.onmarked = onmarked;
        
            function onmarked(type, result, file) {
              switch (type) {
                case plus.barcode.QR:
                  type = 'QR';
                  break;
                case plus.barcode.EAN13:
                  type = 'EAN13';
                  break;
                case plus.barcode.EAN8:
                  type = 'EAN8';
                  break;
                default:
                  type = '其它' + type;
                  break;
              }
              result = result.replace(/\n/g, '');
              that.codeUrl = result;
              that.closeScan();
              setTimeout( () => {
                    that.$router.push(that.codeUrl);

                }, 1000);
            }
          }, 1000);
           setTimeout( () => {   //延时缓冲加载
               that.startScan();

            }, 1000);
         
      },
      //开始扫描
      startScan() {
        console.log("123")
        if (!window.plus) return;
        scan.start();
      },
      //关闭扫描
      cancelScan() {
        if (!window.plus) return;
        scan.cancel();
      },
      //关闭条码识别控件
      closeScan() {
        if (!window.plus) return;
        scan.close();
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
.sub_header{ background: #0d0d0d;color: #fff;padding: 15px 0}
.el-row .el-col-8{border-right: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5;min-height: 115px;
 padding: 20px 0;

 }


.el-row .el-col-8:last-child{border-right:0}
@function imgpx($px) {
    @return $px / 75px * 1rem;
}
.img3x{width: imgpx(300px)}
.img2x{width: imgpx(200px)}
 .scan {
    height: 100%;
    #bcid {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom:0;
      text-align: center;
      color: #fff;
      background: #ccc;
    }
   .ffooter {
      position: absolute;
      left: 0;
      bottom: 1rem;
      height: 2rem;
      line-height: 2rem;
      z-index: 2;
    }
  }
</style>
