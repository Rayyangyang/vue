import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.isLoging ? true : false;
    if(to.path == '/login'){
        next()
    }else{
        isLogin ?  next() : next('/login')
    }

})

export default router
