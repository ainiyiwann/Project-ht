<template>
  <div>
    <el-row :gutter="10" class="row">
      <el-col :span="12">
        <el-card class="box-card">
          <Search></Search>
        </el-card>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-card>
          <Category></Category>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from './Search'
import Category from './category'
export default {
  name: 'Observe',
  components: {
    Search, Category
  }
}
</script>

<style scoped>
.row {
  margin-top: 10px;
}
</style>