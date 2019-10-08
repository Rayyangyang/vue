<template>
    <div class="login">
        <h2>login</h2>
        <div class="inp">
            <inputGroup placeholder='请输入手机号' text='获取验证码' v-model="phone"/>
            <input-group placeholder="请输入验证码" v-model="verifyCode"/>
        </div>
        <span>{{ phone }}</span>
        <button @click="login">登陆</button>

    </div>
</template>

<script>
import inputGroup from '../components/InputGroup.vue'
    export default {
        name:'login',
        data(){
            return{
                phone :'',
                verifyCode :''
            }
        },
        components :{
            inputGroup
        },
        methods:{
            login(){
                console.log(this.phone)
            }

        }
    }
</script>

<style lang="less" scoped>

</style>