<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品管理</span>
            </div>
            <div class="content">
                <el-form ref="form" :model="ruleForm" label-width="80px" size="mini">
                    <el-form-item label="选择分类">
                        <el-select v-model="ruleForm.category" placeholder="请选择分类">
                            <el-option label="果汁" value="1"></el-option>
                            <el-option label="汽水" value="2"></el-option>
                            <el-option label="香烟" value="3"></el-option>
                            <el-option label="酒" value="4"></el-option>
                            <el-option label="日用品" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="key">
                        <el-form-item label="关键字：">
                            <el-input v-model="ruleForm.keys"></el-input>
                        </el-form-item>
                        <span>(商品名称/条形码)</span>
                    </div>

                    <el-form-item size="large">
                        <el-button type="primary" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="tableData">
                    <el-table-column prop="barCode" label="商品条形码" width="140"></el-table-column>
                    <el-table-column prop="name" label="商品名称" width="80px"></el-table-column>
                    <el-table-column prop="salePrice" label="售价(元)"></el-table-column>
                    <el-table-column prop="marketPrice" label="市场价(元)"></el-table-column>
                    <el-table-column prop="stockCount" label="库存"></el-table-column>
                    <el-table-column prop="stockPrice" label="库存总额(元)"></el-table-column>
                    <el-table-column prop="totalSell" label="销售总额(元)"></el-table-column>
                    <el-table-column prop="manage" label="管理" width="180px">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row), dialogFormVisible = true"
                            >编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button>
                             
                        </template>
                    </el-table-column>
                </el-table>
                <div class="paging">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="curPage"
                        :page-sizes="[4, 8, 12]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalSize"
                    ></el-pagination>
                </div>
            </div>
            <!-- 编辑弹出框 -->
            <el-dialog title="商品修改" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="商品条形码" :label-width="formLabelWidth">
                        <el-input v-model="form.barCode" auto-complete="off" disabled></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="form">
                    <el-form-item label="商品名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="form">
                    <el-form-item label="进价" :label-width="formLabelWidth">
                        <el-input v-model="form.stockPrice" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="form">
                    <el-form-item label="库存" :label-width="formLabelWidth">
                        <el-input v-model="form.stockCount" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="upData">修改</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            curPage: 1,
            pageSize: 4,
            totalSize: 0,
            ruleForm: {
                keys: "",
                category: ''
            },
            tableData: [
                {
                    barCode: "234132740",
                    name: "可乐",
                    category: "汽水",
                    salePrice: "3.00",
                    marketPrice: "3.00",
                    stockCount: "2000",
                    stockPrice: 0,
                    totalSell: 0
                },
            ],
            // 弹出框属性
            dialogFormVisible: false,
            form: {
                name: '',
                barCode : '',
                stockPrice : "",
                stockCount : '',
            },
            formLabelWidth: '140px'
        };
    },
    methods: {
        onSubmit() { },
        handleEdit(index, row) {
            for(var i in this.form){
                this.form[i] = row[i]
            }
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getData();
        },
        getData() {
            this.http.get('/index/product', {
                    params: {
                        curPage: this.page,
                        pageSize: this.pageSize
                    }
                })
                .then(res => {
                    this.tableData = res.data.data;
                    this.totalSize = res.data.totalSize
                })
        },
        upData(){
            this.http.get('/upDataStock', {
                params : {
                    name : this.form.name,
                    barCode : this.form.barCode,
                    stockPrice : this.form.stockPrice,
                    stockCount : this.form.stockCount
                }
            })
            .then(res => {
                this.dialogFormVisible = false;
                this.getData()
            })
        },
        search() {
            console.log(this.ruleForm)
            // 发送请求
            this.http.get('/search', {
                params: {
                    category: this.ruleForm.category,
                    keys: this.ruleForm.keys
                }
            })
                .then(res => {
                    console.log(res)
                    this.tableData = res.data

                })
        }
    },
    created() {
        // 发送ajax请求 获取数据
        this.http.get('/index/product', {            params: {
                curPage: this.curPage,
                pageSize: this.pageSize
            }        })
            .then(res => {
                this.tableData = res.data.data;
                this.totalSize = res.data.totalSize
            })
    }
};
</script>

<style lang="less" scoped>
.el-form {
    display: flex;
    align-items: center;
    .key {
        display: flex;
        span {
            margin-top: 3px;
            margin-left: 10px;
        }
    }
}
.paging {
    margin-top: 30px;
}
</style>