<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>会员管理</span>
            </div>
            <div class="content">
                <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
                    <div class="key">
                        <el-form-item label="搜索：">
                            <el-input v-model="ruleForm.keys"></el-input>
                        </el-form-item>
                        <span>(会员卡,会员名,电话,手机)</span>
                    </div>

                    <el-form-item size="large">
                        <el-button type="primary" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="tableData">
                    <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
                    <el-table-column prop="name" label="会员姓名"></el-table-column>
                    <el-table-column prop="discount" label="折扣"></el-table-column>
                    <el-table-column prop="phoneNum" label="手机号" width="120px"></el-table-column>
                    <el-table-column prop="email" label="邮箱" width="120px"></el-table-column>
                    <el-table-column prop="manage" label="管理" width="160px">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
            },
            sizeForm: {
                name: ""
            },
            tableData: [
                {
                    carCode: "234132740",
                    name: "sunny",
                    discount: "9", //折扣
                    phoneNum: "12890374123",
                    email: "1289@qq.com",
                },
            ]
        };
    },
    created() {

        this.http.get('/index/vipAccount', {            params: {
                curPage: this.curPage,
                pageSize: this.pageSize
            }        })
            .then(res => {
                this.tableData = res.data.data;
                this.totalSize = res.data.totalSize
            })
    },
    methods: {
        onSubmit() { },
        handleSizeChange(val) {
            this.pageSize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getData();
        },
        getData() {
            this.http.get('/index/vipAccount', {                params: {
                    curPage: this.page,
                    pageSize: this.pageSize
                }            })
                .then(res => {
                    this.tableData = res.data.data;
                    this.totalSize = res.data.totalSize
                })
        },
        search(){
            console.log(this.ruleForm.keys)
            // 发送请求
            this.http.get('/searchVip', {
                params : {
                    keys : this.ruleForm.keys
                }
            })
            .then(res => {
                console.log(res)
                this.tableData = res.data

            })
        }
    }
};
</script>

<style lang="less" scoped>
.el-form {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    .key {
        display: flex;
        span {
            margin-top: 3px;
            margin-left: 10px;
            color: #aaa;
            font-size: 14px;
        }
    }
}
.paging {
    margin-top: 30px;
}
</style>