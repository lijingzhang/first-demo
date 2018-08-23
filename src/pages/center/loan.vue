<template>
  <div class="wrapper" ref="wrapper">
      <el-container  >
    <v-header title="我的借贷">
        <span slot="left"  @click="$common.back()">返回</span>
    </v-header>
   
    <scroller   :on-refresh="refresh"  refreshText="下拉刷新" noDataText="—— ——  已经到底了 —— ——" ref="myscroll">
    <el-main class="pt0" >
        <div class="sub_header">
        <el-row>
            <el-col :span="8" class="tl">
                借贷金额
            </el-col>
             <el-col :span="8">
                担保人
            </el-col>
             <el-col :span="8">
                借款状态
            </el-col>
        </el-row>
    </div>
      <div class="pl15 pr15 record">
        <el-row  v-for="data in dataArr" :key="data.id">
          <el-col :span="8">
             <div class="tl">
                <div v-if="data.moneytype=='USD'">${{data.num}}</div>
                <div v-if="data.moneytype=='CNY'">￥{{data.num}}</div>
             </div>
          </el-col>
          <el-col :span="8">
              {{data.warrantor}}
          </el-col>
            <el-col :span="8">
                 <div :class="data.status==0?'red':'gray'">{{data.status | loanStatus}}</div>
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
  methods: {
    loadData() {
          this.$http.get('/api/borrow/queryAll').then(res => {
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .record .el-row{
    border-bottom: 1px solid #f5f5f5;padding:10px 0;
    .el-col-14{ line-height: 2}
    .el-col-10{ text-align: right}
  }
.sub_header{ background: #f5f5f5; padding:10px 15px; color: #666666}
</style>

