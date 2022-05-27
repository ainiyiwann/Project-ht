<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus">添加</el-button>
    <!-- 表格 
         data:表格组件要展示的数据（数组）
         border:是否有标签
         elementUI的tatle组件的数据是以列展示的
         -->
    <el-table :data="list" style="width: 100%" border>
        <!--代表一列 -->
        <!--label:显示标题 
            width:对应列的宽带
            align:标题的对其方式
            type:设置展示的数为序列号
            prop:对应列内容的字段名-->
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width" align="center">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width" align="center">
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="warning" class="el-icon-edit" size='mini'>修改</el-button>
          <el-button type="danger" class="el-icon-delete" size='mini'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
         current-page:当前是第几页
         total：一共有几页
         page-size:一页展示多少条数据
         page-sizes:设置一页展示多少条数据（设置多条可以进切换）
         layout：设置分页器的布局
         pager-count:显示的页码数（包括前面和后面）
         @current-change:当前按钮改变时会触发
         @size-change:改变一页展示的数据条数是会触发
         -->
    <el-pagination
        :current-page='page'
        :total="total"
        :page-size="limit"
        :pager-count='7'
        :page-sizes=[3,5,10]
        layout="prev, pager, next, jumper,->, sizes, total"
        @current-change="handleCurrentChange"
        @size-change = "handlesizeChange"
        style="margin-top:20px;textAlign:center"
        >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name:'tradeMark',
  data() {
    return {
      //分页器第几页
      page:2,
      //当前页数展示数据的条数
      limit:3,
      //一共的数据条数
      total:0,
      //列表展示的数据
      list:[]
    }
  },
  methods: {
    //获取品牌列表的数据
    async getPageList(){
      const {page,limit} = this
      let result = await this.$API.trademark.reqTradeMarkList(page,limit)
      // console.log(result)
      if(result.code==200){
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    //当点击的页码数发送变化时
    //会把选中的页码传进来
    handleCurrentChange(page){
      this.page=page
      this.getPageList()
    },
    //当点击的一页展示的数据条数发送变化时
    //会把选中的显示条数传进来
    handlesizeChange(limit){
      this.limit = limit
       this.getPageList()
    }
  },
  mounted() {
    this.getPageList()
    console.log(this.$API)
  },
};
</script>

<style>
</style>