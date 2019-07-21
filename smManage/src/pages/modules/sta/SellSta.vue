<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>销售统计</span>
            </div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="时间">
                    <el-input v-model="formInline.user" placeholder="2018-01-03"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formInline.user" placeholder="2019-04-20"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="formInline.region" placeholder="销售统计情况">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
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
            }
        }
    },
    mounted() {
        let echartsForm = this.myEcharts.init(this.$refs.echartsForm);
        echartsForm.showLoading()
        setTimeout(() => {
            let option = {
                title: {
                    text: '销售统计(不含退款)'
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [320, 1232, 1401, 534, 1290, 1330, 320],
                    type: 'line'
                }]
            };
            echartsForm.hideLoading()
            echartsForm.setOption(option);
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