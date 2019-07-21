import Vue from 'vue'
import Router from 'vue-router'

import login from './pages/Login.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/index',
            name: 'index',
            // 这样加载组件 实现懒加载 让首屏的加载速度变快
            component: () => import('./pages/Index.vue'),
            children: [
                // 商品管理
                // 配置路由守卫  给每一个二级路由设置 requireAuth : true 表示开启验证
                // 然后在main.js中加判断
                {path : '/index/addProduct', meta:{requireAuth : true}, component: () => import('./pages/modules/product/AddProduct.vue')},
                {path : '/index/product', meta:{requireAuth : true}, component: () => import('./pages/modules/product/Product.vue')},
                // 进货管理
                {path : '/index/stock', name :'stock', meta:{requireAuth : true}, component : () => import('./pages/modules/stock/Stock.vue')},
                {path : '/index/addStock', name :'addStock', meta:{requireAuth : true}, component : () => import('./pages/modules/stock/addStock.vue')},
                // 出货管理
                {path : '/index/exportProduct', name :'exportProduct', meta:{requireAuth : true}, component : () => import('./pages/modules/shipment/ExportProduct.vue')},
                {path : '/index/returnGoods', name :'returnGoods', meta:{requireAuth : true}, component : () => import('./pages/modules/shipment/ReturnGoods.vue')},
                {path : '/index/sellList', name :'sellList', meta:{requireAuth : true}, component : () => import('./pages/modules/shipment/SellList.vue')},
                // 统计管理
                {path : '/index/purchaseSta', name :'purchaseSta', meta:{requireAuth : true}, component : () => import('./pages/modules/sta/PurchaseSta.vue')},
                {path : '/index/sellSta', name :'sellSta', meta:{requireAuth : true}, component : () => import('./pages/modules/sta/SellSta.vue')},
                // 账号管理
                {path : '/index/account', name :'account', meta:{requireAuth : true}, component : () => import('./pages/modules/account/Account.vue')},
                {path : '/index/addAccount', name :'addAccount', meta:{requireAuth : true}, component : () => import('./pages/modules/account/addAccount.vue')},
                {path : '/index/changePwd', name :'changePwd', meta:{requireAuth : true}, component : () => import('./pages/modules/account/ChangePwd.vue')},
                // 会员管理
                {path : '/index/addVip', name :'addVip', meta:{requireAuth : true}, component : () => import('./pages/modules/vip/AddVip.vue')},
                {path : '/index/vipAccount', name :'vipAccount', meta:{requireAuth : true}, component : () => import('./pages/modules/vip/VipAccount.vue')}
            ]
        },

    ],
})
