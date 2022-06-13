<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <span class="user">收索用户数</span>
      <span>
        <svg t="1655094024662" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="2131" width="20" height="20">
          <path
            d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z"
            p-id="2132">
          </path>
        </svg>
      </span>
    </div>
    <!-- 中间 -->
    <div class="mian">
      <span class="mian0">4323</span>
      <span class="mian1">34.3</span>
      <span>
        <svg t="1655095270985" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="3730" width="15" height="15">
          <path d="M65.582671 735.208665l446.417329-446.41733 446.417329 446.41733z" p-id="3731" fill="#d81e06"></path>
        </svg>
      </span>
      <span>
        <svg t="1655095307994" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="3913" width="15" height="15">
          <path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="3914" fill="#1afa29"></path>
        </svg>
      </span>
    </div>
    <!-- 底部折线图 -->
    <div>
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',
  mounted() {
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts)
    //    console.log(lineCharts)
    //使用图表
    lineCharts.setOption({
      xAxis: {
        //隐藏x轴
        show: false,
        type: 'category',
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [
        {
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
                color: 'rgba(52,177,233,0.8)'
              },
              {
                offset: 1,
                color: 'rgba(158,177,233,0.3)'
              }
            ])
          },
          data: [82, 93, 190, 131, 129, 233, 132],
          type: 'line',
          smooth: true
        }
      ],
      //布局调试
      grid: {
        left:0,
        right:0,
        top: 0,
        bottom: 0
      }
    })
  },
}
</script>

<style scoped>
.header {
  display: flex;
  align-content: center;
}

.user {
  margin-right: 30px;
}

.mian {
  margin-top: 10px;
}

.mian0 {
  margin-right: 30px;
}

.mian1 {
  margin-right: 20px;
}

.charts {
  width: 100%;
  height: 50px;
}
</style>