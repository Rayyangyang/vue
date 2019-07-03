import Vue from 'vue'
import App from './App.vue'

// 引入 store
import {store} from '../src/store/store'
// 引入路由
import VueRouter from 'vue-router'

// 引入 axios
import axios from 'axios'

// 配置全局axios 的默认地址
axios.defaults.baseURL = 'https://wd1198031447mmuwcn.wilddogio.com/'

// 将axios添加到vue的原型上 方便所有组件使用
Vue.prototype.http = axios

// 使用路由
Vue.use(VueRouter)

import {routes} from './routes'

// 配置路由
const router = new VueRouter({
  routes,
  mode : 'history'
})

// 全局守卫(路由上的)
// router.beforeEach((to, from, next)=>{
//   console.log(to)
//   if(to.path == '/login' || to.path == '/register'){
//     next();
//   }else{
//     alert('你还没有登录');
//     next('/login')
//   }
// })


new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
