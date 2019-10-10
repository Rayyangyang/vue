<template>
    <div class="index">
        <router-view></router-view>
        <TabBar :tabBarList = 'tabBarList'/></TabBar>
    </div>
</template>

<script>
import TabBar from '../components/TabBar'
    export default {
        data(){
            return {
                tabBarList : [
                    {
                        title : '首页',
                        path : '/index/home',
                        icon : ''
                    },
                    {
                        title : '我的',
                        path : '/index/mine',
                        icon : ''
                    },
                    {
                        title : '订单',
                        path : '/index/order',
                        icon : ''
                    },
                ] 
            }
        },
        components:{
            TabBar
        }
    }
</script>

<style lang="less" scoped>
.index{
    position: relative;
    height: 100%;
    width: 100;
    box-sizing: border-box;
}

</style>