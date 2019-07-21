import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.myEcharts = echarts

//引入axios
import axios from 'axios'
// 全局配置axios
Vue.prototype.http = axios
axios.defaults.baseURL = 'http://localhost:3000'

Vue.use(ElementUI)

// 配置路由守卫的验证
router.beforeEach((to, from, next) => {
  // 第一步判断进入的路由是否开启了路由守卫
  if(to.meta.requireAuth){
    // 第二步 根据我们的tokenId来判断用户是否登录 或者是否过期
    axios.get('/getToken', {params: {token : localStorage.getItem('token')}})
      .then( res => {
        if(res.data =='inTime'){
          next()
        }else{
          alert('您的登录已过期,请重新登录')
          next('/')
        }
      })
  }else{
    next()
  }
      
})




Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
