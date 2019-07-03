<template>
    <div class="header">
        <ul>
            <router-link to='/' tag='li'>看博客</router-link>
            <router-link to='/addBlog' tag='li'>写博客</router-link>
        </ul>
    </div>
</template>

<script>
export default {
    name : 'app-header',
    data (){
        return {

        }
    }
}
</script>

<style scoped>
    ul{
        list-style:none;
        display: flex;
        justify-content: center;
    }
    ul li{
        margin:30px;
        width:100px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color:#fff;
        background-color:#333;
        cursor :pointer;
    }
</style>
