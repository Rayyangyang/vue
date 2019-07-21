<template>
    <div id="exportProduct">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品销售</span>
            </div>
            <div class="table">
                <el-form
                    :inline="true"
                    :model="sellForm"
                    class="demo-form-inline"
                    :rules="rules"
                    ref="ruleForm"
                >
                    <div>
                        <el-form-item label="商品条形码" prop="barCode">
                            <el-input v-model="sellForm.barCode"></el-input>
                        </el-form-item>
                        <el-form-item label="数量" prop="num">
                            <el-input v-model="sellForm.num"></el-input>
                            <span>计重商品单位为千克</span>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">加入订单</el-button>
                            <el-button type="primary" @click="clearArr">重新出库</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="form">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="num" label="数量"></el-table-column>
                    <el-table-column prop="salePrice" label="单价(元)"></el-table-column>
                    <el-table-column prop="totalPrice" label="总价(元)"></el-table-column>
                    <el-table-column prop="discountPrice" label="优惠总价(元)"></el-table-column>
                </el-table>
            </div>
            <div class="total">
                总价:
                <span>{{totalPrice}}</span> 元, 优惠:
                <span>{{lastDiscountPrice}}</span>元,
                小计:
                <span>{{lastPrice}}</span>元
            </div>
            <!-- 表单 -->
            <el-form :inline="true" :model="sellForm" class="demo-form-inline">
                <el-form-item label="会员卡号">
                    <el-input v-model="sellForm.cardNum"></el-input>
                    <span>填写会员卡号</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // discountPrice : 0,
            sellForm: {
                barCode: '',
                num: '',
                cardNum: ''
            },
            rules: {
                barCode: {
                    required: true,
                    message: "输入不能为空",
                    trigger: "blur"
                },
                num: {
                    required: true,
                    message: "输入不能为空",
                    trigger: "blur"
                }
            },
            tableData: [
            ]
        }
    },
    computed: {
        totalPrice() {
            var price = 0;
            this.tableData.forEach(ele => {
                price += ele.totalPrice;
            })
            return price;
        },
        lastPrice() {
            return (this.totalPrice - this.lastDiscountPrice)
        },
        lastDiscountPrice() {
            var price = 0;
            this.tableData.forEach(ele => {
                price += ele.discountPrice;
            })
            return price;
        }

    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.http.get('/index/exportProduct', {
                        params: {
                            barCode: this.sellForm.barCode,
                            num: this.sellForm.num
                        }
                    })
                        .then(res => {
                            this.$message({
                                message: '添加订单成功',
                                type: 'success'
                            });
                            var key = false;
                            var len = this.tableData.length;
                            if (this.tableData.length > 0) {
                                this.tableData.forEach(ele => {
                                    if (res.data.barCode == ele.barCode) {
                                        key = false;
                                        ele.num = Number(ele.num) + Number(res.data.num);
                                        ele.totalPrice = ele.salePrice * ele.num;
                                        ele.discountPrice = ele.discountPrice + res.data.discountPrice;
                                    } else {
                                        key = true;
                                    }
                                })
                                if (key) {
                                    this.tableData.push(res.data)
                                }
                            } else {
                                console.log(2)
                                this.tableData.push(res.data)
                            }
                        })
                } else {
                    alert('请填写完整!')
                    return false;
                }
            });
        },
        onSubmit() {
            var orderNum = Math.floor(Math.random() * 888888 + 100000);
            this.http.get('/outStock', {
                params: {
                    name: this.tableData,
                    cardNum: this.sellForm.cardNum,
                    orderNum: orderNum
                }
            })
                .then(res => {
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                    // 出库改变库存总量
                    this.http.get('/changeStock', {
                        params : {
                            barCode : this.sellForm.barCode,
                            count : this.sellForm.num
                        }
                    })
                    .then(res => {
                        console.log(res)
                    })
                })
        },
        clearArr() {
            this.tableData = []
        }
    }
}
</script>

<style lang="less" scoped>
span {
    color: #aaa;
}
.table {
    border-bottom: 2px solid #ccc;
    margin-bottom: 10px;
    div {
        display: flex;
        span {
            font-size: 14px;
            color: #aaa;
        }
    }
}
.total {
    line-height: 60px;
    border-bottom: 2px solid #ccc;
    span {
        color: rgb(238, 27, 27);
    }
    margin-bottom: 40px;
}
</style>