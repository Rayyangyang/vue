import Vue from 'vue'
import Router from 'vue-router'

// 引入首页
import index from './views/Index'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: '/',
            component: index,
            redirect : '/goods',
            children: [
                {
                    path: '/goods',
                    name: '/goods',
                    component: () => import('./views/Goods.vue'),
                },
                {
                    path: '/evaluate',
                    name: 'evaluate',
                    component: () => import('./views/Evaluate.vue')
                },
                {
                    path: '/merchant',
                    name: 'merchant',
                    component: () => import('./views/Merchant.vue')
                },

            ]
        },
        {
            path: '/goodsInfo',
            name: '/goodsInfo',
            component: () => import('./components/GoodsInfo.vue')
        }
    ]
})
