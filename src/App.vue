<template>
    <div id="app">
        <router-view></router-view>
        <shopCar></shopCar>
    </div>
</template>
<script>
import shopCar from './views/ShopCar'
export default {
    data() {
        return {

        }
    },
    components: {
        shopCar
    }
}
</script>

<style lang="less">
* {
    list-style: none;
}
#app {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
