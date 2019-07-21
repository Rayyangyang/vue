<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>销售列表</span>
            </div>
            <div class="content">
                <!-- 表单 -->
                <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
                    <div class="key">
                        <el-form-item label="开始时间:">
                            <el-input v-model="sizeForm.startTime"></el-input>
                        </el-form-item>
                        <el-form-item label="结束时间:">
                            <el-input v-model="sizeForm.endTime"></el-input>
                        </el-form-item>
                        <span>(格式: 2019-10-03)</span>
                    </div>

                    <div class="bottom">
                        <el-form-item label="关键字:">
                            <el-input v-model="sizeForm.keys"></el-input>
                            <span>(商品名称,订单号,客户名字,会员卡号)</span>
                        </el-form-item>
                        <el-form-item size="large">
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </div>
                </el-form>
                <!-- 表格 -->
                <el-table :data="tableData" stripe>
                    <el-table-column prop="orderNum" label="订单编号"></el-table-column>
                    <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
                    <el-table-column prop="name" label="名称" width="140px"></el-table-column>
                    <el-table-column prop="num" label="数量" width="100px"></el-table-column>
                    <el-table-column prop="salePrice" label="实际售价" width="100px"></el-table-column>
                    <el-table-column prop="discount" label="优惠(促销/会员)" width="180px">{{'促销'}}</el-table-column>
                    <el-table-column prop="refund" label="退款" width="140px">{{'无退款'}}</el-table-column>
                    <el-table-column prop="sellTime" label="销售时间">{{'2019-07-10'}}</el-table-column>
                </el-table>
                <!-- 分页 -->
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
                category: ''
            },
            sizeForm: {
                name: "",
                startTime: '',
                endTime: '',
                keys: ''
            },
            tableData: [
                {
                    orderNum: "234132740",
                    cardNum: '',
                    name: "可乐",
                    num: "1000",
                    salePrice: "4",
                    refund: "无退款",
                },
            ]
        };
    },
    created() {
        this.http.get('/index/sellList', {
            params: {
                curPage: this.curPage,
                pageSize: this.pageSize
            }
        })
            .then(res => {
                // var reg =/\},\{/g;
                // this.tableData = res.data.data;
                this.totalSize = res.data.totalSize
                var arr = [];
                res.data.data.forEach(ele => {
                    var obj = {};
                    console.log(ele.cardNum)
                    var dataObj = JSON.parse(ele.name)
                    for (var prop in dataObj) {
                        obj[prop] = dataObj[prop];
                    }
                    obj.orderNum = ele.orderNum;
                    obj.cardNum = ele.cardNum;
                    arr.push(obj);
                })
                this.tableData = arr;
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
            this.http.get('/index/sellList', {                params: {
                    curPage: this.page,
                    pageSize: this.pageSize
                }            })
                .then(res => {
                    this.totalSize = res.data.totalSize
                    var arr = [];
                    res.data.data.forEach(ele => {
                        var obj = {};
                        console.log(ele.cardNum)
                        var dataObj = JSON.parse(ele.name)
                        for (var prop in dataObj) {
                            obj[prop] = dataObj[prop];
                        }
                        obj.orderNum = ele.orderNum;
                        obj.cardNum = ele.cardNum;
                        arr.push(obj);
                    })
                    this.tableData = arr;
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
    }
};
</script>

<style lang="less" scoped>
.el-form {
    // display: flex;
    // align-items: center;
    .key {
        display: flex;
        span {
            margin-top: 6px;
            margin-left: 10px;
            font-size: 12px;
            color: #aaa;
        }
    }
    .bottom {
        display: flex;
        span {
            margin-top: 6px;
            margin-left: 10px;
            font-size: 12px;
            color: #aaa;
        }
    }
}
.paging {
    margin-top: 30px;
}
</style>