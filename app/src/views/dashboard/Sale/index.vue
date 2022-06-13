<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px;height:450px;">
            <!-- 头部 -->
            <div slot="header" class="clearfix">
                <!-- 头部左侧内容 -->
                <!-- 页签标 -->
                <!--  v-model：绑定data中的默认数据-->
                <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
                    <el-tab-pane label="销售额" name="sale"></el-tab-pane>
                    <el-tab-pane label="访问量" name="viste"></el-tab-pane>
                </el-tabs>
                <!-- 头部右侧内容 -->
                <div class="right">
                    <span @click="setDay">今日</span>
                    <span @click="setWeek">本周</span>
                    <span @click="setMonth">本月</span>
                    <span @click="setYear">本年</span>
                </div>
                <!-- 日历 -->
                <el-date-picker v-model="data" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']" class="data" size="mini" value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
            <div>
                <el-row :gutter="10">
                    <el-col :span="18">
                        <!-- 容器 -->
                        <div class="charts" ref="charts"></div>
                    </el-col>
                    <el-col :span="6">
                        <div class="sale-right">
                            <h3>门店{{ tightTitle }}排名</h3>
                            <ul>
                                <li>
                                    <span class="span1">1</span>
                                    <span class="span2">肯德基</span>
                                    <span>2344-3432</span>
                                </li>
                                <li>
                                    <span class="span1">2</span>
                                    <span class="span2">麦当劳</span>
                                    <span>2422-6335</span>
                                </li>
                                <li>
                                    <span class="span1">3</span>
                                    <span class="span2">必胜客</span>
                                    <span>3434-2343</span>
                                </li>
                                <li>
                                    <span class="span3">4</span>
                                    <span class="span2">德克士</span>
                                    <span>5345-3454</span>
                                </li>
                                <li>
                                    <span class="span3">5</span>
                                    <span class="span2">华莱士</span>
                                    <span>2844-3467</span>
                                </li>
                                <li>
                                    <span class="span3">6</span>
                                    <span class="span2">真功夫</span>
                                    <span>3422-3432</span>
                                </li>
                                <li>
                                    <span class="span3">7</span>
                                    <span class="span2">汉堡王</span>
                                    <span>2432-3439</span>
                                </li>
                            </ul>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
//引入echarts
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
    data() {
        return {
            activeName: "sale",
            //存储echarts的实例
            myCharts: null,
            //收集日历的信息
            data: [],
        }
    },
    mounted() {
        //初始化echarts实例
        this.myCharts = echarts.init(this.$refs.charts)
        this.myCharts.setOption(
            {
                title: {
                    text: '销售额趋势'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220, 356, 234, 146, 456, 367],
                        color: "#99CC99"
                    }
                ]
            }
        )
    },
    computed: {
        tightTitle() {
            if (this.activeName == 'sale') {
                return '销售额'
            } else {
                return '访问量'
            }
        }
    },
    watch: {
        tightTitle() {
            //重写修改图表的配置
            this.myCharts.setOption(
                {
                    title: {
                        text: `${this.tightTitle}的趋势`
                    },
                }
            )
        }
    },
    methods: {
        setDay() {
            const day = dayjs().format('YYYY-MM-DD')
            this.data = [day, day]
        },
        setWeek() {
            const week = dayjs().day(1).format('YYYY-MM-DD')
            const week1 = dayjs().day(7).format('YYYY-MM-DD')
            this.data = [week, week1]
        },
        setMonth() {
            const month = dayjs().startOf('month').format('YYYY-MM-DD')
            const month2 = dayjs().endOf('month').format('YYYY-MM-DD')
            this.data = [month,month2]
        },
        setYear(){
            const year = dayjs().startOf('year').format('YYYY-MM-DD')
            const year1 = dayjs().endOf('year').format('YYYY-MM-DD')
            this.data = [year,year1]
        }
    },
}
</script>

<style scoped>
.clearfix {
    position: relative;
    display: flex;
    justify-content: space-between;
}

.tabs {
    width: 100%;
}

.right {
    position: absolute;
    right: 380px;
    top: 13px
}

.data {
    position: absolute;
    right: 0px;
    top: 11px
}

.right span {
    margin: 0px 10px;
    cursor: pointer
}

.charts {
    width: 100%;
    height: 300px;
}

.ale-right {}

ul {
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0px;
}

ul li {
    height: 8%;
    margin: 10px;
}

.span1 {
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: black;
    color: white;
    text-align: center;
    margin-right: 20px;
}

.span2 {
    margin-right: 70px;
}

.span3 {
    float: left;
    width: 20px;
    height: 20px;
    text-align: center;
    margin-right: 20px;
}
</style>