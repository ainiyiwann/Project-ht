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
                //在x轴均匀分配
                type: 'category'
            },
            yAxis: {
                show: false
            },
            series: [
                {
                    type: 'line',
                    data: [12, 32, 14, 35, 23, 15,23,45,16,28],
                    //使线段变平滑
                    smooth: true,
                    //隐藏拐点的标记
                    showSymbol: false,
                    //线条的样式
                    lineSytle: {
                        //颜色
                        color: 'purple'
                    },
                    //填充样式
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(58,77,233,0.8)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(58,77,233,0.3)'
                            }
                        ])
                    }
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