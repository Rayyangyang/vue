<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>卡片名称</span>
        </div>
        <div class="form">
            <el-form
                :model="ruleForm2"
                status-icon
                :rules="rules2"
                ref="ruleForm2"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="原密码" prop="oldPwd">
                    <el-input v-model.number="ruleForm2.oldPwd"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script>
export default {
    data() {
        var checkOldPwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm2.checkOldPwd !== '') {
                    this.$refs.ruleForm2.validateField('checkOldPwd');
                }
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm2: {
                pass: '',
                checkPass: '',
                oldPwd: ''
            },
            rules2: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                oldPwd: [
                    { validator: checkOldPwd, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('修改成功!');
                    var id = localStorage.getItem('id');
                    var pass = this.ruleForm2.pass;
                    var oldPwd = this.ruleForm2.oldPwd;
                    this.http.post('http://localhost:3000/index/changePwd', {oldPwd : oldPwd,id : id, pwd : pass})
                        .then(res => {
                            console.log(res)
                            if(res.data == 'fail'){
                                this.open('原始密码不正确')
                            }else{
                                this.open('修改成功, 请重新登陆')
                            }
                        })
                } else {
                    alert('请填写完整');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        open(info){
            this.$alert(info, {
                confirmButtonText: '确定',
                callback: action => {
                    if(info == '修改成功, 请重新登陆'){
                        this.$router.push('/')
                    }
                }
            })
        }
    }
}
</script>
<style lang="less">
.form{
    width:500px;
}
</style>
