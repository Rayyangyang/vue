<template>
    <div class="tab-bar">
        <router-link v-for="ele in tabBarList" :to = 'ele.path' >
            <img src="" alt="">
            <span>{{ ele.title }}</span>
        </router-link>
    </div>
</template>

<script>
    export default {
        props :['tabBarList'],
        data(){
            return {

            }
        },
    }
</script>

<style lang="less" scoped>
.tab-bar{
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    position:fixed;
    bottom:0px;
    display:flex;
    justify-content: space-between;
    line-height: 40px;
}
</style>