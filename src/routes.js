// 引入组件
import home from './components/Home'
import menu from './components/Menu'
import admin from './components/Admin'
import about from './components/About/About'
import login from './components/Login'
import register from './components/Register'

//引入二级路由对应的组件
import contact from './components/About/Contact'
import history from './components/About/History'
import info from './components/About/Info'
import express from './components/About/Express'


// 配置路由
export const routes = [
    // { path: '/', component: home },
    //router-view 的复用
    {path : '/', components : {
        default: home,
        'contact' : contact,
        'express' : express,
        'history' : history
    }},
    { path: '/menu', component: menu },
    {
        path: '/admin', component: admin,
        // beforeEnter(to, from, next){
        //   if(to.path == '/login' || to.path == '/register'){
        //     next()
        //   }else{
        //     alert('luelue ');
        //     next('/login')
        //   }
        // }
    },
    //redirect  拥有二级路由的页面默认显示的二级路由
    {
        path: '/about', component: about, redirect: '/about/contact', children: [
            { path: '/about/contact', component: contact },
            { path: '/about/history', component: history },
            { path: '/about/info', component: info },
            { path: '/about/express', component: express }
        ]
    },
    { path: '/login', component: login },
    { path: '/register', component: register },
    { path: '*', redirect: '/' }
]

