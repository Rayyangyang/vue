<template>
    <div id="header">
        <nav class="navbar navbar-default">
            <div class="container">
                <ul class="nav navbar-nav">
                    <li>
                        <router-link to='/'>用户管理</router-link>
                    </li>
                    <li>
                        <router-link to='/'>首页</router-link>
                    </li>
                    <li>
                        <router-link to='/about'>关于我们</router-link>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><router-link to="/addUser">添加用户</router-link></li>
                </ul>
            </div>
        </nav>
    </div>
</template>
