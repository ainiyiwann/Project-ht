<template>
    <div>
        <!-- 顶部的card -->
        <el-row :gutter="10">
            <el-col :span="6">
                <Detail title="总销售额" number="￥283456">
                    <template slot="charts">
                        <span class="chart">周同比&nbsp;43.36%</span>&nbsp;
                        <svg t="1654948193435" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2113" width="12" height="12">
                            <path d="M65.582671 735.208665l446.417329-446.41733 446.417329 446.41733z" p-id="2114"
                                fill="#1afa29">
                            </path>
                        </svg>&nbsp;
                        <span class="chart">日同比&nbsp;23.45%</span>&nbsp;
                        <svg t="1654948438288" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2451" width="12" height="12">
                            <path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="2452"
                                fill="#d81e06">
                            </path>
                        </svg>
                    </template>
                    <template slot="footer">
                        <span class="footer">日销售额&nbsp;￥23423</span>
                    </template>
                </Detail>
            </el-col>
            <el-col :span="6">
                <Detail title="访问量" number="78456">
                    <template slot="charts">
                        <!-- 使用echarts做折线图 -->
                        <LineChart></LineChart>
                    </template>
                    <template slot="footer">
                        <span class="footer">日访问量&nbsp;2345</span>
                    </template>
                </Detail>
            </el-col>
            <el-col :span="6">
                <Detail title="支付笔数" number="93456">
                    <template slot="charts">
                        <!-- 使用echarts做柱状图-->
                        <BarChart></BarChart>
                    </template>
                    <template slot="footer">
                        <span class="footer">转换率&nbsp;34%</span>
                    </template>
                </Detail>
            </el-col>
            <el-col :span="6">
                <Detail title="运营活动效果" number="57%">
                    <template slot="charts">
                        <!-- 柱状图 -->
                        <ProgressCharts></ProgressCharts>
                    </template>
                    <template slot="footer">
                        <span class="chart">周同比&nbsp;43.36%</span>&nbsp;
                        <svg t="1654948193435" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2113" width="12" height="12">
                            <path d="M65.582671 735.208665l446.417329-446.41733 446.417329 446.41733z" p-id="2114"
                                fill="#1afa29">
                            </path>
                        </svg>&nbsp;
                        <span class="chart">日同比&nbsp;23.45%</span>&nbsp;
                        <svg t="1654948438288" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2451" width="12" height="12">
                            <path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="2452"
                                fill="#d81e06">
                            </path>
                        </svg>
                    </template>
                </Detail>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Detail from './Detail'
import LineChart from './LineChart'
import BarChart from './BarChart'
import ProgressCharts from './ProgressCharts'
export default {
    name: 'Card',
    components: {
        Detail, LineChart, BarChart, ProgressCharts
    }
}
</script scoped>

<style>
.chart {
    font-size: 14px;
}

.footer {
    font-size: 16px;
}
</style>