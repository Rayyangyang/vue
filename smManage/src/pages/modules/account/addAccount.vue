<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>添加管理员账号</span>
        </div>
        <div class="form">
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="用户名" prop="name">
                    <el-input v-model.number="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" required>
                    <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择用户组" required>
                    <el-select v-model="ruleForm.managerType" placeholder="选择用户组">
                        <el-option label="超级管理员" value="1"></el-option>
                        <el-option label="管理员" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
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
                    // callback()
                    this.http.get('/checkUser', { params: { acc: this.ruleForm.name } })
                        .then(res => {
                            if (res.data == 'ok') {
                                callback(new Error("用户名重复, 请重新输入"))
                            }else{
                                callback()
                            }
                        })
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
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                name: '',
                pass: '',
                checkPass: '',
                managerType: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                name: [
                    { validator: validateName, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    this.http.post('http://localhost:3000/index/addAccount', { acc: this.ruleForm.name, pwd: this.ruleForm.pass, userGroup: this.ruleForm.managerType })
                        .then(res => {
                            if (res.data == 'ok') {
                                this.open('添加成功')
                            } else {
                                this.open('添加失败')
                            }
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        open(info) {
            this.$alert(info, {
                confirmButtonText: '确定',
            })
        },
    }
}
</script>
<style lang="less" scoped>
.form {
    width: 500px;
}
</style>

