
//测试
import list from '@/pages/list/list'
import recharge from '@/pages/recharge/recharge'  //测试
import category from '@/pages/test/category'  //测试

import index from '@/pages/index'
import login from '@/pages/login'
import register from '@/pages/register'

import authentication from '@/pages/my/authentication'  
import account from '@/pages/my/account' 
import centerindex from '@/pages/center/index' 
import setting from '@/pages/center/setting' 
// 汇率
import morelist from '@/pages/rate/more_list' 
import exchange from '@/pages/rate/exchange' 
import todayrate from '@/pages/rate/today_rate' 
import caculate from '@/pages/rate/caculate' 

//个人中心
import loan from '@/pages/center/loan' 
import trade_log from '@/pages/center/trade_log' 
import QRcode from '@/pages/center/QRcode' 
import setNum from '@/pages/center/setNum' 
import Codepayment from '@/pages/center/Codepayment' 
import tradeDetail from '@/pages/center/trade_detail' 

//转账
import transfer from '@/pages/recharge/transfer' 
import transfer_next from '@/pages/recharge/transfer_next' 

//信箱
import chatDialog from '@/pages/chat/chatDialog'
import chatList from '@/pages/chat/chatList'


//设置
import setpsw from '@/pages/reset/set_psw'
import paypswstep from '@/pages/reset/pay_pswstep'  //认证支付密码 
import paypsw from '@/pages/reset/pay_psw'          //修改支付密码 
import changetel from '@/pages/reset/change_tel'   //登录前找回密码
import changepsw from '@/pages/reset/change_psw'  //登陆后修改密码


export default[
    {
      path: '/',
      redirect: '/index' ,  // 当访问根目录的时候默认跳转到主页
      
    },

    {
      path: '/index',
      component: index,
      // meta: { 
      //   requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
      //  }, 
     
    },
    {
      path: '/list',
      component: list,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/recharge',
      component: recharge,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
 
    {
      path: '/authentication',
      component: authentication,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/centerindex',
      component: centerindex,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/account',
      component: account,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/setting',
      component: setting,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/morelist',
      component: morelist,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/exchange',
      component: exchange,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/todayrate',
      component: todayrate,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/caculate',
      component: caculate,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/loan',
      component: loan,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/trade_log',
      component: trade_log,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/transfer',
      component: transfer,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    }, 
    {
      path: '/transfer_next',
      component: transfer_next,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/QRcode',
      component: QRcode,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    
    },
    {
      path: '/setNum',
      component: setNum,
      meta: { 
        requireAuth: true 
       }, 
    },
      {
        path: '/Codepayment',
        component: Codepayment,
        meta: { 
          requireAuth: true 
         }, 
      },
     
      {
        path: '/chatDialog',
        component: chatDialog,
        meta: { 
          requireAuth: true 
         }, 
      },
      {
        path: '/chatList',
        component: chatList,
        meta: { 
          requireAuth: true 
         }, 
      },
      {
        path: '/tradeDetail',
        component: tradeDetail,
        meta: { 
          requireAuth: true 
         }, 
      },
      {
        path: '/changetel',
        component: changetel,
        meta: { 
          requireAuth: true 
         }, 
      },
      {
        path: '/setpsw',
        component: setpsw,
        meta: { 
          requireAuth: true 
         }, 
      },
      {
        path: '/paypsw',
        component: paypsw,
        meta: { 
          requireAuth: true 
         }, 
      },
      {
        path: '/paypswstep',
        component: paypswstep,
        meta: { 
          requireAuth: true 
         }, 
      },
      {
        path: '/changepsw',
        component: changepsw,
        meta: { 
          requireAuth: true 
         }, 
      },
      {
        path: '/category',
        component: category,
        meta: { 
          requireAuth: true 
         }, 
      },

  ]



