<template>
    <div class="login">
        <div class="img">
            <img src="../assets/images/logo.jpg" alt />
        </div>
        <div class="inp">
            <inputGroup
                placeholder="手机号"
                :text="text"
                v-model="phone"
                @btnClick="btnClick"
                :error="error.phone"
                :disabled = 'disabled'
            />
            <input-group placeholder="验证码" v-model="verifyCode" :error="error.code" />
        </div>
        <div class="text">
            新用户登陆自动注册，表示已同意
            <span @click="userAgreement">《用户服务协议》</span>
        </div>
        <button @click="login" :disabled='isclick'>登陆</button>
    </div>
</template>

<script>
import inputGroup from "../components/InputGroup.vue";
export default {
    name: "login",
    data() {
        return {
            phone: "",
            verifyCode: "",
            text: "获取验证码",
            disabled : false,
            error: {
                phone: "",
                code: ""
            }
        };
    },
    components: {
        inputGroup
    },
    computed:{
        isclick(){
            if(!this.phone || !this.verifyCode){
                return true
            }else{
                return false;
            }
        }
    },
    methods: {
        login() {
            // 发送请求
            this.$axios.post('/api/posts/sms_back', {
                phone : this.phone,
                code : this.verifyCode
            })
            .then(res => {
                console.log(res)
                localStorage.setItem('isLogin', true)
                this.$router.push('/')
            })
            .catch(err => {
                console.log(err)
                this.error.code = err.response.data.msg
            })
        },
        userAgreement() {},
        btnClick() {
            if (!this.phone) {
                //判断手机号是否为空
                this.error.phone = "手机号不能为空";
            } else {
                // 验证手机号的格式是否正确
                if (this.validatePhone(this.phone)) {
                    // 通过正则验证如果正确则发送获取验证码的请求
                    console.log(333);
                    this.error.phone = "";
                    // 发送请求 并且触发倒计时函数
                    this.$axios.post('/api/posts/sms_send', {
                        phone : this.phone,
                        key : '5c0f0ec145d988ef90c49a9b4b410032',
                        tpl_id : '190842'
                    })
                    .then (res =>{
                        console.log(res)

                    })
                    this.validateTime();
                } else {
                    // 格式不正确 提示
                    this.error.phone = "手机号格式输入错误";
                }
            }
        },
        validatePhone(num) {
            let reg = /^1[345678]\d{9}$/;
            return reg.test(num);
        },
        validateTime() {
            let num = 45;
            let timer = setInterval(() => {
                this.disabled = true
                num--;
                this.text = `${num}秒后重试`;
                if (num == 0) {
                    this.text = "获取验证码";
                    clearInterval(timer);
                    this.disabled = false
                }
            }, 1000);
        }
    }
};
</script>

<style lang="less" scoped>
.login {
    padding: 40px 10px 0 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img {
        // text-align: center;
        margin-bottom: 20px;
    }
    .inp {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .text {
        width: 70%;
        margin: 0 0 20px 0;
        font-size: 14px;
        span {
            color: rgb(37, 104, 248);
        }
    }
    button {
        border-radius: 4px;
        width: 70%;
        border: none;
        outline: none;
        height: 40px;
        font-size: 16px;
        color: #fff;
        background: #48ca38;
    }
    button[disabled] {
        background-color:#8bda81;
    }
}
</style>