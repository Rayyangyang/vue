<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加库存</span>
            </div>
            <div class="form-box">
                <el-form
                    :model="ruleForm"
                    ref="addStock"
                    label-width="100px"
                    class="demo-dynamic"
                    :rules="rules"
                >
                    <el-form-item prop="barCode" label="商品条形码">
                        <el-input v-model="ruleForm.barCode"></el-input>
                    </el-form-item>
                    <el-form-item label="数量" prop="count">
                        <el-input v-model="ruleForm.count"></el-input>
                        <span>计重商品为千克</span>
                    </el-form-item>
                    <el-form-item label="进价" prop="stockPrice">
                        <el-input v-model="ruleForm.stockPrice"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('addStock')">入库</el-button>
                        <el-button @click="resetForm('addStock')">重置</el-button>
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
                barCode: '',
                count: '',
                stockPrice: ''
            },
            rules: {
                barCode: [
                    { required: true, message: '商品条形码不能为空', trigger: 'blur' },
                ],
                count: [
                    { required: true, message: '数量不能为空', trigger: 'blur' }
                ],
                stockPrice: [
                    { required: true, message: '进价不能为空', trigger: 'blur' }
                ],
            }

        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('提交成功');
                    // 发送ajax
                    this.http.get('/index/addStock', {
                        params: {
                            barCode: this.ruleForm.barCode,
                            count: this.ruleForm.count,
                            stockPrice: this.ruleForm.stockPrice
                        }
                    })
                        .then(res => {
                            if (res.data == 'ok') {
                                this.$message({
                                    message: '入库成功',
                                    type: 'success'
                                });
                            }
                        })
                } else {
                    this.$message.error('入库失败,请重新输入');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }

}
</script>

<style lang="less" scoped>
.form-box {
    width: 400px;
    span {
        font-size: 12px;
        color: #aaa;
    }
}
</style>