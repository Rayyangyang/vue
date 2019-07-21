<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {};
</script>


<style lang="less">
//全局样式
* {
    margin: 0px;
    padding: 0px;
    list-style: none;
}
html,
body,
#app {
    height: 100%;
    width: 100%;
}
a{
    text-decoration: none;
}
</style>
