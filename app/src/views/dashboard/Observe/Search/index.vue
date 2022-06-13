<template>
  <!-- 最下面的左侧组件 -->
  <div>
    <!-- 头部 -->
    <div class="search-header">
      <span>线上热门搜索</span>
      <el-dropdown>
        <span>
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>肯德基</el-dropdown-item>
          <el-dropdown-item>麦当劳</el-dropdown-item>
          <el-dropdown-item>必胜客</el-dropdown-item>
          <el-dropdown-item>华莱士</el-dropdown-item>
          <el-dropdown-item>汉堡王</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 中间 -->
    <div>
      <el-row :gutter="10">
        <div class="line"></div>
        <el-col :span="12">
          <!-- 折线图部分 -->
          <LineCharts></LineCharts>
        </el-col>
        <el-col :span="12">
          <LineCharts></LineCharts>
        </el-col>
      </el-row>
    </div>
    <!-- 底部表单 -->
    <div class="footer">
      <el-table :data="[1, 2]" style="width: 100%" border>
        <el-table-column label="排名" width="80" align="center" type="index">
        </el-table-column>
        <el-table-column label="搜索关键字" width="180" align="center">
          肯德基
        </el-table-column>
        <el-table-column label="用户数" sortable align="center">
          34
        </el-table-column>
        <el-table-column label="周涨幅" sortable align="center">
          12.3
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="500" align="center">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import LineCharts from './LineCharts'
export default {
  name: '',
  components: {
    LineCharts
  }
}
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}

.line {
  border-bottom: 1px solid rgb(238, 230, 230);
  margin-bottom: 20px;
  margin-top: 10px;
}

.footer {
  margin-top: 10px;
}
</style>