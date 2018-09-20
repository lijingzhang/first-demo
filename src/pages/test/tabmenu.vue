<template>
<div>
    <el-container>
		<v-header title="状态">
			<span slot="left"  @click="$common.back()">返回</span>
		</v-header>
		<el-main>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="未发货" name="first"> 未发货</el-tab-pane>
                <el-tab-pane label="待收货" name="second">待收货</el-tab-pane>
                <el-tab-pane label="待确认" name="third">待确认</el-tab-pane>
                <el-tab-pane label="待评价" name="fourth">待评价</el-tab-pane>
            </el-tabs>
		</el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>