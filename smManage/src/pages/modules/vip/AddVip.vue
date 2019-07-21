<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加编辑账号</span>
            </div>
            <div class="form">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="真实名字" prop="name" required>
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>

                    <el-form-item label="会员卡卡号" required prop="cardNum">
                        <el-input v-model="ruleForm.cardNum"></el-input>
                        <span class="btn"></span>
                        <el-button type="primary" @click='createCode'>生成会员卡号</el-button>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="ruleForm.idCard"></el-input>
                    </el-form-item>
                    <el-form-item label="用户状态">
                        <el-checkbox-group v-model="ruleForm.type">
                            <el-radio v-model="radio" label="启用" name="type"></el-radio>
                            <el-radio v-model="radio" label="禁用" name="type"></el-radio>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="ruleForm.phoneNum"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱地址">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <!-- 选择地址 -->
                    <el-form-item label="详细地址">
                        <el-input v-model="ruleForm.adressInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="邮政编码">
                        <el-input v-model="ruleForm.postCode"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                cardNum: '',
                idCard: '',
                phoneNum: '',
                email: '',
                adressInfo: '',
                postCode: '',
            },
            radio: "启用",
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入您的真实姓名",
                        trigger: "blur"
                    }
                ],
                cardNum: [
                    {
                        required: true,
                        message: "请输入您的会员卡号码",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                console.log(valid)
                if (valid) {
                    this.http.get('/index/addVip', {
                        params: {
                            name: this.ruleForm.name,
                            cardNum: this.ruleForm.cardNum,
                            idCard: this.ruleForm.idCard,
                            phoneNum: this.ruleForm.phoneNum,
                            email: this.ruleForm.email,
                            adressInfo: this.ruleForm.adressInfo,
                            postCode: this.ruleForm.postCode
                        }
                    })
                        .then(res => {
                            if (res.data == 'ok') {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                            }else{
                                this.$message.error('添加失败');
                            }
                        })
                } else {
                    alert('请填写完整!')
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        createCode(){
            this.ruleForm.cardNum = Math.floor(Math.random() * 888888 + 100000)
        }
    }
};
</script>

<style lang="less" scoped>
.form {
    width: 570px;
    .seat {
        display: inline-block;
        width: 30px;
    }
}
.btn{
    display:inline-block;
    height: 10px;
    width:10px;
    margin-top:30px;
}
</style>