// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/'                 //路由器
import Element from 'element-ui'               //引入饿了么ui框架
import 'element-ui/lib/theme-chalk/index.css'  //引入样式
import axios from 'axios'                      //使用API所需
import querystring from 'querystring'
import './components/components.js'            //加载公共组件脚本
import VueScroller from 'vue-scroller'        //下拉
import VueTouch from 'vue-touch'              //滑动事件
import VDistpicker from 'v-distpicker'          //地址三级联动
import * as filters from './assets/js/filters.js'  //过滤器
import './assets/scss/common.scss'                      //加载公共样式
import common from './assets/js/common.js'            //加载公共脚本
import store from './store/store'
import * as types from './store/types'
// import mui from 'vue-awesome-mui'           //监听手机返回键，按两下退出应用
import VueQr from 'vue-qr'

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

//全局注册组件
Vue.component('v-distpicker', VDistpicker)
Vue.component('vue-qr', VueQr)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueScroller)
Vue.use(Element)
Vue.use(VueRouter)
Vue.prototype.$qs = querystring;
Vue.prototype.$common = common
Object.keys(filters).forEach(key => {  
  Vue.filter(key, filters[key])  
})  

Vue.config.productionTip = false

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}


const host = process.env.NODE_ENV === 'development' ? '/api' : 'http://47.52.196.190' // 根据 process.env.NODE_ENV 的值判断当前是什么环境
const instance = axios.create({
  baseURL: host
})
Vue.prototype.$http = instance


router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
      if (store.state.token) {
          next();
      }
      else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}
          })
      }
  }
  else {
      next();
  }
})

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');