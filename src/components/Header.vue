<template>
    <header class="app-header">
        <nav class="navbar navbar-default">
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <router-link to='/' tag ='li'>
                        <span class="glyphicon glyphicon-heart"></span> 
                        <i>爱心订单</i>
                    </router-link> 
                    <!-- <li><a href="#">爱心订单</a></li> -->
                    <li>
                        <router-link to='/'>主页</router-link>
                    </li>
                    <li>
                        <router-link to='/menu'>菜单</router-link>
                    </li>
                    <li>
                        <router-link to='/admin'>管理</router-link>
                    </li>
                    <li>
                        <router-link to='/about'>关于我们</router-link>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li v-show= "!isLogin" >
                        <router-link to='/login'>登录</router-link>
                    </li>
                    <li v-show = 'isLogin'>
                        <span class="username">{{username}}</span>
                    </li>
                    <li>
                        <router-link to='/login' v-show= 'isLogin'>退出</router-link>
                    </li>
                    <li>
                        <router-link to='/register' v-show= "!isLogin">注册</router-link>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </nav>
    </header>
</template>
<script>
export default {
    name : 'app-header',
    data (){
        return {
        }
    },
    computed:{
        isLogin(){
            return this.$store.state.isLogin
        },
        username(){
            return this.$store.state.username
        }
    },
    methods : {
    }
}
</script>
<style scoped>
    .app-header .nav li span{
        font-size: 30px;
        line-height: 50px;
        color :rgb(255, 41, 166);
    }
    .app-header .nav li i{
        font-style: normal;
        font-size: 20px;
        color:rgb(255, 41, 166);
        vertical-align: 7px;
        margin:0 10px;
    }
    .app-header .nav li span.username{
        font-size: 18px;
        line-height: 50px;
        color :rgb(61, 213, 251);
    }

</style>

