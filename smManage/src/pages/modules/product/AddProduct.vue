<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加商品</span>
            </div>
            <div class="form">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <div class="box">
                        <el-form-item label="所属分类" prop="category" required>
                            <el-select v-model="ruleForm.category" placeholder="选择分类">
                                <el-option label="果汁" value="1"></el-option>
                                <el-option label="汽水" value="2"></el-option>
                                <el-option label="香烟" value="3"></el-option>
                                <el-option label="酒" value="4"></el-option>
                                <el-option label="日用品" value="5"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="商品条形码" required>
                            <el-input v-model="ruleForm.barCode" placeholder="点击生成商品条形码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getCode">生成条形码</el-button>
                        </el-form-item>

                        <el-form-item label="商品名称" required prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品售价" required prop="salePrice">
                            <el-input v-model="ruleForm.salePrice"></el-input>
                        </el-form-item>
                        <el-form-item label="市场价" prop="totalPrice">
                            <el-input v-model="ruleForm.marketPrice"></el-input>
                            <span>默认市场价为售价的1.2倍</span>
                        </el-form-item>

                        <el-form-item label="商品进价" prop="importPrice">
                            <el-input v-model="ruleForm.stockPrice"></el-input>
                        </el-form-item>
                        <el-form-item label="入库数量" prop="importNumber">
                            <el-input v-model="ruleForm.stockCount"></el-input>
                            <span>计重单位商品为千克</span>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="productWeight">
                            <el-input v-model="ruleForm.commodityWeight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品单位" prop="productUnit">
                            <el-input v-model="ruleForm.commodityUnit"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="会员优惠" prop="type">
                        <el-checkbox-group>
                            <el-radio v-model="ruleForm.vipDiscount" label="0">享受</el-radio>
                            <el-radio v-model="ruleForm.vipDiscount" label="1">不享受</el-radio>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="是否促销" prop="delivery">
                        <el-switch v-model="ruleForm.promotion"></el-switch>
                    </el-form-item>

                    <el-form-item label="商品简介" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.goodsDesc"></el-input>
                        <span>不超过200汉字</span>
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
    // category{
    //      1 : 果汁
    //      2 : 汽水
    //      3 : 香烟
    //      4 : 酒
    //      5 : 日用品
    // }
    data() {
        return {
            ruleForm: {
                category: "",
                barCode: "",
                name: "",
                salePrice: "",
                marketPrice: "", //市场价
                stockPrice: "",
                stockCount: "",
                commodityWeight: "",
                commodityUnit: "",
                vipDiscount: '0',
                goodsDesc: "",
                promotion: false
            },
            // radio: "0",
            rules: {
                category: [
                    {
                        required: true,
                        message: "请选择类型",
                        trigger: "change"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入商品名称",
                        trigger: "blur"
                    }
                ],
                salePrice: [
                    {
                        required: true,
                        message: "请输入商品价格",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.ruleForm.promotion)
                    var promotion = this.ruleForm.promotion == true ? 1 : 0;
                    // 添加商品
                    this.http.get('/index/addProduct', {
                        params: {
                            category: this.ruleForm.category,
                            barCode: this.ruleForm.barCode,
                            name: this.ruleForm.name,
                            salePrice: this.ruleForm.salePrice,
                            marketPrice: this.ruleForm.marketPrice,
                            stockPrice: this.ruleForm.stockPrice,
                            stockCount: this.ruleForm.stockCount,
                            commodityWeight: this.ruleForm.commodityWeight,
                            commodityUnit: this.ruleForm.commodityUnit,
                            vipDiscount: this.ruleForm.vipDiscount,
                            goodsDesc: this.ruleForm.goodsDesc,
                            promotion: promotion
                        }
                    })
                        .then(res => {
                            if (res.data == 'ok') {
                                this.$message({
                                    message: '添加订单成功',
                                    type: 'success'
                                });
                            }
                        })
                } else {
                    alert('请填写完整')
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getCode() {
            this.ruleForm.barCode = Math.floor(Math.random() * 888888 + 100000)
        }
    },

};
</script>

<style lang="less" scoped>
.box-card {
    .form {
        span {
            font-size: 12px;
            color: #aaa;
        }
        .box {
            width: 600px;
        }
    }
}
</style>