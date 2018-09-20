<template>
<div>
    <div  class="comomtips" v-show="loadShow"><i class="el-icon-loading"></i></div>
   <article>
            <section v-for="item in dataArr">
                <div class="img">
                    <img  :src="item.img">
                </div>
                <div class="info">
                    <div class="name">{{ item.title | MaxLength}}</div>
                    <div class="sell-num">{{ item.source }}</div>
                    <el-row class="mt10">
                        <el-col :span="18">
                            <span class="price"> ￥22.5</span>
                        </el-col>
                        <el-col :span="6" class="tr">
                            <i class="el-icon-circle-plus"></i>
                        </el-col>
                    </el-row>
                  
                </div>
            </section>
           
          </article>
</div>
</template>

<script>
export default{

    data() {
      return {
       dataArr:[],
       loadShow:true,
      
      }
    },
created() {
    this.loadData()
  },
  methods:{
	 loadData() {
         console.log(this.$route.params.id)
          this.$http.get('http://182.92.167.237:8001/news').then(res => {
              this.loadShow=false
                let result = res.data;
                let data=result.list;
                    this.dataArr=[];//必须置空数组，才能下拉刷新不重复
                // this.data = data;   
                    for(let i = 0; i <data.length ; i++) {
                    this.dataArr.push(data[i])
                    }
                this.datalength=data.length;//赋值
                
            }).catch((err) => {   //显示异常
                console.log(err);
            });

    },
		
    },
 
}
</script>

<style lang="scss" scoped>
@function imgpx($px) {
    @return $px / 75px * 1rem;
}
      article {
            section {
              display: flex;
              position: relative;
              margin: 0 0.5rem;
              padding: 10px 0;
              border-bottom: 1px solid #f5f5f5;
             .img {
                margin-right:10px;
                img{
                    width: imgpx(400px);
                    height: imgpx(400px);
                }
              }

              .info {
                flex: 1;
                vertical-align: top;text-align:left;
                .name, .price {
                //   font-weight: bold;
                }
                .name {
                  font-size: 14px;color: #000
                }
                .sell-num {
                  font-size: 12px;color: #999;
                  margin: 0.2rem 0;
                }
                .price {
                  color: rgb(251, 79, 69);
                  font-size: 0.4rem;

                }
                .el-icon-circle-plus{ color: #f7c36d; font-size: 22px; margin-right: 5px}
              }
            }
          }
        
</style>
