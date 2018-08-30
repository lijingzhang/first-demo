<template>
  <div class="wrapper" ref="wrapper">
      <el-container  >
    <v-header title="交易详情">
        <router-link to="/index" slot="left">返回</router-link>
         <router-link to="/index" slot="right">完成</router-link>
    </v-header>
   
    <el-main  >
      <div class="finish_tip">
        <i class="el-icon-circle-check"></i><span>交易完成</span>
      </div>
      <div class="p15">
        <el-row>
            <el-col :span="6">交易类型</el-col>
            <el-col :span="18" >{{this.$route.query.type}}</el-col>
        </el-row>  
         <el-row>
            <el-col :span="6" >交易金额</el-col>
            <el-col :span="18" >{{this.$route.query.countType | fhType}}{{this.$route.query.moneynum}}</el-col>
        </el-row>  
        <el-row>
            <el-col :span="6" >交易对象</el-col>
            <el-col :span="18" >{{this.$route.query.receivecount}}</el-col>
        </el-row>  
         <el-row>
            <el-col :span="6" >交易时间</el-col>
            <el-col :span="18" >{{this.$route.query.date}}</el-col>
        </el-row>  
         <el-row>
            <el-col :span="6" >流 水 号</el-col>
            <el-col :span="18">{{this.$route.query.snumber}}</el-col>
        </el-row>  
        
      </div>
      
    </el-main> 
 
  </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
     
    }
  },

  methods: {
 
  },


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .el-row{
  padding:10px 0;
    .el-col-6{ text-align: left;color: #999}
    .el-col-18{ text-align: right}
  }

</style>

