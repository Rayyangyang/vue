<template>
    <div id="returnGoods">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品退货</span>
            </div>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="订单号">
                    <el-input v-model="orderNum" placeholder="请输入正确的订单号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="tableData" style="width: 100%" v-show="key">
                <el-table-column label="商品条形码" width="180">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.barCode }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="名称" width="180">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="数量" width="180">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.num }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="售价" width="180">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.salePrice }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            key: false,
            orderNum: '',
            tableData: []
        }
    },
    methods: {
        onSubmit() {
            this.http.get('/getGoodsInfo', {
                params: {
                    orderNum: this.orderNum
                }
            })
                .then(res => {
                    this.key = true;
                    console.log(JSON.parse(res.data[0].name))
                    this.tableData.push(JSON.parse(res.data[0].name))

                })
        },
        handleDelete(index, row) {
            this.http.get('/deleteGoods', {
                params: {
                    orderNum: this.orderNum
                }
            })
                .then(res => {
                    if (res.data == 'ok') {
                        this.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                })
        }
    }
}
</script>

<style lang="less" scoped>
</style>