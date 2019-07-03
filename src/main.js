import Vue from 'vue'
import App from './App.vue'

// 引入axios
import axios from 'axios'

// 配置axios的全局路径
axios.defaults.baseURL = 'https://wd9745392831tnadcr.wilddogio.com/'
// axios.defaults.baseURL = 'http://jsonplaceholder.typicode.com/'
// 在vue原型上添加
Vue.prototype.http = axios

// 引入组件
import showBlog from './components/showBlog'
import addBlog from './components/AddBlog'
import singleBlog from './components/SingleBlog'

// 引入路由
import VueRouter from 'vue-router'
// 使用路由
Vue.use(VueRouter)
// 配置路由
const router = new VueRouter({
  routes : [
    {path : '/', component : showBlog},
    {path : '/addBlog', component : addBlog},
    {path : '/blog/:id', component : singleBlog}
  ],
  mode :'history'
})

Vue.config.productionTip = false

// 自定义指令
Vue.directive('rainbow', {
  bind(el, binding){
    el.style.color = '#' + Math.random().toString(16).slice(2, 8);
  }
})

// 自定义本地过滤器
// Vue.filter('to-upperCase', (value)=>{
//   return value.toUpperCase();

// })




new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
