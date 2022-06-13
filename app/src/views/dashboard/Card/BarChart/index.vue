<template>
    <div class="charts" ref="charts"></div>
</template>

<script>
//引入echarts
import * as echarts from 'echarts'
export default {
    name: '',
    mounted() {
        //初始化echarts实例
        let lineCharts = echarts.init(this.$refs.charts)
        //    console.log(lineCharts)
        //使用图表
        lineCharts.setOption({
            //图表的配置
            xAxis: {
                //隐藏x轴
                show: false,
                type: 'category'
            },
            yAxis: {
                show: false
            },
            series: [
                {
                    type: 'bar',
                    data: [34,54,12,34,64,34,54,34,54,23,13,53],
                    //设置颜色
                    color:'pink'
                }
            ],
            //提示
            tooltip:{},
            //布局调试
            grid: {
                left: 10,
                right: 10,
                top: 0,
                bottom: 0
            }
        })
    },
}
</script>

<style>
.charts {
    /* border: 1px solid red; */
    width: 100%;
    height: 100%;
}
</style>