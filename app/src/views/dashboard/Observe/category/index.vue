<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <span>销售额类别占比</span>
      <el-radio-group v-model="radio1">
        <el-radio-button label="全部渠道"></el-radio-button>
        <el-radio-button label="线上"></el-radio-button>
        <el-radio-button label="门店"></el-radio-button>
      </el-radio-group>
    </div>
    <!-- 线 -->
    <div class="line"></div>
    <!-- 饼图 -->
    <div>
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',
  data() {
    return {
      activeName: 'first',
      radio1: '全部渠道'
    }
  },
  mounted() {
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts)
    //    console.log(lineCharts)
    //使用图表
    lineCharts.setOption(
      {
        title:{
          text:'Search Engine'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    )
    //鼠标一如图表的事件
    lineCharts.on('mouseover',(params)=>{
      const {name,value} = params.data
      lineCharts.setOption({
        title:{
          text:name,
          subtext:value
        }
      })
    })
  },
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}

.line {
  border-top: 1px solid rgb(230, 225, 225);
  margin-top: 10px;
}

.charts {
  width: 100%;
  height: 300px;
}
</style>