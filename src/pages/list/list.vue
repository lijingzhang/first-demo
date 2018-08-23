<template>
  <div class="wrapper" ref="wrapper">
      <el-container  >
    <v-header title="列表">
        <span slot="left"  @click="$common.back()">返回</span>
     <i  slot="right" @click="showMenu"  class="el-icon-menu">menu</i>
    </v-header>
      <v-menu v-if="show"></v-menu>
    <scroller  :on-infinite="infinite" refreshText="下拉刷新" noDataText="没有更多数据" :on-refresh="refresh" ref="myscroll">
      <el-main class="pt0"   @touchmove="touchmove">
        <div>{{dataArr.length}}</div>
      <div class="news" v-for="news in dataArr">
            <img :src="news.img" alt="" class="news-image">
            <div class="news-info">
                <div class="news-title">{{ news.title }}</div>
                <div class="news-remark">{{ news.source }}</div>
            </div>
        </div>
     

<el-upload class="upload-demo" action="" :auto-upload='false' :on-change='changeUpload'>
       <el-button size="small" type="primary">点击上传</el-button>
       <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload> 
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
      noData:'',
      starArr: [],
      datalength:0,
      show:false   //菜单默认隐藏
    }
  },
  created() {
    this.loadData()
  },
  mounted() {
    this.top = 1;
  

  },
  methods: {
    loadData() {
          this.$http.get('http://182.92.167.237:8001/news').then(res => {
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
   infinite(done) {
              console.log(this.noData)
              if(this.noData) {
                 console.log("000")
              setTimeout(()=>{
                  this.$refs.myscroll.finishInfinite(2);
              })
              return;
              }
              let self = this;
              let start = this.dataArr.length;
              console.log(start);
              setTimeout(() => {
                if(start>self.datalength){
                  self.noData = "---已经到底了---"
                }
                else
                {
                for(let i = start + 1; i < start + 10; i++){
                  if(i >self.datalength){
                  self.noData = "---已经到底了---";  
                    break; 
                  }
                  else{
                      self.dataArr.push(this.dataArr[i]);
                  }
            
            }
        
        }
                    self.$refs.myscroll.resize();
                    done()
                }, 1500)

            },


    refresh(done) {
       let self = this;
       console.log(this.dataArr.length);
      setTimeout(() => {
      this.$options.methods.loadData.bind(this)();//调用methods中的另一个方法
       done()
      }, 1500)

    },
    showMenu(){
      this.show=!this.show;
    },
    touchmove(e) {
        console.log('move', e)
        if(e.touches[0].clientY + 3 ) {
            console.log('哈哈哈')
        }
      },
      
changeUpload: function(file, fileList) {
        this.fileList = fileList;
        this.$nextTick(
          () => {
            let upload_list_li = document.getElementsByClassName('el-upload-list')[0].children;
            for (let i = 0; i < upload_list_li.length; i++) {
              let li_a = upload_list_li[i];
              let imgElement = document.createElement("img");
              imgElement.setAttribute('src', fileList[i].url);
              imgElement.setAttribute('style', "max-width:50%;padding-left:25%");
              if (li_a.lastElementChild.nodeName !== 'IMG') {  
                li_a.appendChild(imgElement);
              }  
            }
          });
}
  },


  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

   .news {
        display: flex;
        align-items: stretch;
        padding: 10px;
        border-bottom: 1px solid #eeeeee;
    }
    
    .news:active {
        background-color: #f3f3f3;
    }

    .news-image {
        flex-shrink: 0;
        width: 95px;
        height: 62px;
        display: block;
        margin-right: 10px;
    }

    .news-info {
        padding: 5px 0;
        flex: 1;
        display: flex;text-align: left;
        flex-direction: column;
        justify-content: space-between;
    }

    .news-title {
        font-size: 14px;
        color: #333;
        line-height: 1.2;
    }

    .news-remark {
        font-size: 12px;
        color: #999;
    }


</style>
