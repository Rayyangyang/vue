<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>库存统计数据</span>
            </div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="时间">
                    <el-input v-model="formInline.user" placeholder="2018-01-03"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formInline.user" placeholder="2019-04-20"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
            <div class="echarts-form" style="width: 600px;height:400px;" ref="echartsForm"></div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formInline: {
                user: '',
                region: ''
            },
            arr1: [],
            arr2: []
        }
    },
    created() {

    },
    mounted() {
        let echartsForm = this.myEcharts.init(this.$refs.echartsForm);
        echartsForm.showLoading()
        setTimeout(() => {
            this.http.get('/index/purchaseSta')
                .then(res => {
                    var arr1 = [];
                    var arr2 = []
                    for (var ele in res.data[0]) {
                        arr1.push(ele);
                        arr2.push(res.data[0][ele]);
                    }
                    let option = {
                        title: {
                            text: '进货统计'
                        },
                        xAxis: {
                            type: 'category',
                            data: arr1
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: arr2,
                            type: 'line'
                        }]
                    };
                    echartsForm.hideLoading()

                    echartsForm.setOption(option);

                })

        }, 2000)

    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }

    }
}
</script>

<style lang="less" scoped>
.echarts-form {
    margin: 15px 0px;
}
</style>