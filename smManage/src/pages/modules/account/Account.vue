<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>账号管理</span>
            </div>
            <div class="table">
                <el-table :data="users" style="width: 100%">
                    <el-table-column label="用户名称">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.acc }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="用户组">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.userGroup == 1 ? '超级管理员' : '管理员'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="管理" prop="id">
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
            </div>
            <div class="page">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="num"
                    :page-size="5"
                    @current-change="changePage"
                ></el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            num: 0,
            page : 0
        }
    },
    created() {
        this.getUsers(1);
    },
    methods: {
        handleEdit(index, row) {
            // console.log(index, row);
        },
        handleDelete(index, row) {
            // console.log(row.id)
            // 执行删除之前进行询问
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var id = row.id
                this.http.get('http://localhost:3000/delete', { params: { id: id } })
                    .then(res => {
                        this.getUsers(this.page)
                    })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        getUsers(page) {
            console.log(page)
            this.http.get('http://localhost:3000/index/account', { params: { page: page } })
                .then(res => {
                    console.log(res);
                    this.users = res.data.users;
                    this.num = res.data.num - 1
                })
        },
        changePage(val) {
            // val 为当前页
            // 改变页数时发送ajax
            this.page = val;
            this.getUsers(val)
        }
    }
}
</script>

<style lang="less" scoped>
.page {
    text-align: center;
    margin-top: 24px;
    margin-bottom: 34px;
}
</style>