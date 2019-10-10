import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect : '/index/home',
      children : [
        {
          path : '/index/home',
          name :'home',
          component : () => import ('./views/Home.vue')
        },
        {
          path : '/index/mine',
          name :'mine',
          component : () => import('./views/Mine.vue')
        },
        {
          path : '/index/order',
          name : 'order',
          component: () => import('./views/Order.vue')
        }

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   console.log(localStorage.isLogin)
//     const isLogin = localStorage.isLogin ? true : false;
//     console.log(isLogin)
//     if(to.path == '/login'){
//         next()
//     }else{
//         isLogin ?  next() : next('/login')
//     }

// })

export default router
