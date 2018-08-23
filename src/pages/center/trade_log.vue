<template>
  <div class="wrapper" ref="wrapper">
      <el-container  >
    <v-header title="收支记录">
        <span slot="left"  @click="$common.back()">返回</span>
    </v-header>
    <scroller   :on-refresh="refresh"  refreshText="下拉刷新" noDataText="—— ——  已经到底了 —— ——" ref="myscroll">
    <el-main class="pt0" >
        <div class="sub_header">
        <el-row>
            <el-col :span="14" class="tl">
                交易类型
            </el-col>
             <el-col :span="10">
                交易金额
            </el-col>
            
        </el-row>
    </div>
      <div class="pl15 pr15 record">
        <el-row  v-for="data in sortdataArr" :key="data.id">
          <el-col :span="14">
             <div class="tl"><img src="../../assets/images/qd.png" class="img1x l mr5">{{data.operaType}}</div>
          </el-col>
          <el-col :span="10">
                <div v-if="data.countType=='USD'"><span :class="data.num>0?'green':'red'">${{data.num}}</span></div>
                <div v-if="data.countType=='CNY'"><span :class="data.num>0?'green':'red'">￥{{data.num}}</span></div>
             <div class="gray f12 ">{{data.operaTime}}</div>
          </el-col>
        </el-row>    
      </div>
      
    </el-main> 
    </scroller>
  </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataArr:[],
      noData:'', //下拉刷新保留
      datalength:0,  //下拉刷新保留
   
    }
  },
  created() {
    this.loadData()
  },
  mounted() {
    this.top = 1
  },
  computed:{
        sortdataArr:function(){
            return sortByKey(this.dataArr,'operaTime');
        }
},
  methods: {
    loadData() {
          this.$http.get('/api/opera/queryByUserid').then(res => {
                    var result = res.data;
                   this.dataArr=result;
                    this.datalength=result.length;//赋值
                }).catch((err) => {   //显示异常
                    console.log(err);
                });

    },

    refresh(done) {
       let self = this;
      setTimeout(() => {
      this.$options.methods.loadData.bind(this)();//调用methods中的另一个方法
       done()
      }, 1500)

    },
  
 
    
  },


}
//数组对象方法排序:
    function sortByKey(array,key){  //(数组、排序的列)
        return array.sort(function(a,b){
        var x=a[key];
        var y=b[key];
        return ((x>y)?-1:((x<y)?1:0));//从大到小排序
        // return ((x<y)?-1:((x>y)?1:0));//从小到大排序
     });
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .record .el-row{
    border-bottom: 1px solid #f5f5f5;padding:10px 0;
    .el-col-14{ line-height: 2}
    .el-col-10{ text-align: right}
  }
  @function imgpx($px) {
    @return $px / 75px * 1rem;
}
.img3x{width: imgpx(300px)}
.img2x{width: imgpx(200px)}
.img1x{width: imgpx(150px)}
.sub_header{ background: #f5f5f5; padding:10px 15px; color: #666666}
</style>

