<template>
    <div id="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>登录</span>
            </div>
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
                class="demo-ruleForm"
            >
                <el-form-item label="用户名" prop="name">
                    <el-input v-model.number="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="ruleForm.pwd"></el-input>
                </el-form-item>
                <p v-show="isLogin">用户名或者密码错误</p>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        //   自定义验证
        var validateName = (rule, value, callback) => {
            // 用户名验证
            var reg = /^\w{3,12}$/;

            if (value === "") {
                callback(new Error("请输入用户名"));
            } else {
                if (reg.test(value)) {
                    callback()
                } else {
                    callback(new Error("用户名格式输入错误"));
                }
            }
        };
        // 密码验证
        var validatePass = (rule, value, callback) => {
            var reg = /^\w{3,16}$/;
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (reg.test(value)) {
                    callback()
                } else {
                    callback(new Error("密码格式输入错误"));
                }
            }
        };
        return {
            isLogin: false,
            id: '',
            ruleForm: {
                name: "",
                pwd: ""
            },
            rules: {
                name: [{ validator: validateName, trigger: "blur" }],
                pwd: [{ validator: validatePass, trigger: "blur" }]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.http.post('/login', { acc: this.ruleForm.name, pwd: this.ruleForm.pwd })
                        .then(res => {
                            if (res.data.msg == 'ok') {
                                var id = res.data.id;
                                // 存入yonghuid
                                localStorage.setItem('id', id)
                                // 存入token id
                                localStorage.setItem('token', res.data.token)
                                // 存入用户名
                                localStorage.setItem('acc', this.ruleForm.name)
                                // 存入用户权限
                                localStorage.setItem('userGroup', res.data.userGroup)
                                // 将用户头像保存
                                console.log(res.data)
                                localStorage.setItem('avatarUrl', res.data.avatarUrl)
                                this.open('登陆成功');
                            } else {
                                this.isLogin = true;
                            }
                        })

                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        open(info) {
            this.$alert(info, {
                confirmButtonText: '确定',
                callback: action => {
                    var userGroup = localStorage.getItem('userGroup')
                    if (userGroup == 1) {
                        this.$router.push('/index/product')
                    } else if (userGroup == 2) {
                        this.$router.push('/index/product')
                    } else if (userGroup == 3) {
                        this.$router.push('/index/sellSta')
                    }
                }
            })
        }
    }
};
</script>

<style lang="less" scoped>
// 登录
#login {
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .box-card {
        min-width: 500px;
        min-height: 300px;
        margin-right: 100px;
        .el-button {
            width: 60%;
            transform: translate(30%, 0);
        }
        p {
            color: rgb(255, 35, 35);
            font-size: 14px;
            margin-left: 80px;
            margin-top: -12px;
            margin-bottom: 20px;
        }
    }
}
</style>