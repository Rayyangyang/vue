import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

Vue.prototype.http = axios

// 引入路由
import VueRouter from 'vue-router'
// 使用路由
Vue.use(VueRouter)
// 配置路由

// 引入路由模块
import about from './components/About'
import home from './components/Home'
import addUser from './components/AddUser'
import info from './components/Info'
const router = new VueRouter({
  routes : [
    {path : '/', component : home},
    {path : '/about', component : about},
    {path : '/addUser', component : addUser},
    {path : '/info/:id', component : info},
  ],
  mode : 'history'

})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
