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
                //最小值和最大值的设置
                mini:0,
                max:100
            },
            yAxis: {
                show: false,
                //在y轴均分
                type: 'category'
            },
            series: [
                {
                    type: 'bar',
                    data: [57],
                    //柱状图宽度的设置
                    barWidth:10,
                    color:'#4169E1',
                    //开启背景颜色
                    showBackground:true,
                    //设置背景颜色
                    backgroundStyle:{
                        color:'#DDDDDD'
                    },
                    //文本的设置
                    // label:{
                    //     //显示文本
                    //     show:true,
                    //     //显示的内容
                    //     formatter:'|',
                    //     position:'right'
                    // }

                }
            ],
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