<template>
  <!-- 三级联动组件 -->
  <div>
    <!-- 表单
          inline:为行内表单 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <!-- 一级分类 -->
      <el-form-item label="一级分类">
        <!-- 选择器 -->
        <!-- palceholder:为展示的信息 
             v-model:收集的数据存储的data中
             @change：展示的数据改变时触发 -->
        <el-select placeholder="请选择" v-model="cForm.category1Id" @change="handler1" :disabled="show">
          <!-- lable:要展示在页面的数据
               value:收集数据到前面的el-element的value中 -->
          <el-option :label="c1.name" :value="c1.id" v-for="(c1,index) in list1" :key="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 二级分类 -->
      <el-form-item label="二级分类" >
        <el-select placeholder="请选择" v-model="cForm.category2Id" @change="handler2" :disabled="show">
          <el-option :label="c2.name" :value="c2.id" v-for="(c2,index) in list2" :key="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 三级分类 -->
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handler3" :disabled="show">
          <el-option :label="c3.name" :value="c3.id" v-for="(c3,index) in list3" :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      //一级数组的数据
      list1:[],
      //二级级数组的数据
      list2:[],
      //三级数组的数据
      list3:[],
      //收集一级、二级、三级分类的id
      cForm:{
        category1Id:'',
        category2Id:'',
        category3Id:'',
      }
    }
  },
  props:['show'],
  methods: {
    //获取一级分类的请求的函数
    async getCategory1List(){
      let result = await this.$API.attr.reqCategory1List()
      // console.log(result)
      if(result.code==200){
        this.list1 = result.data
      }
    },
    //一级分类的select事件的回调
    async handler1(){
      //清除数据（保证在一级分类修改数据时后面的分类保持空数据）
      this.list2=[]
      this.list3=[]
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      //发送请求获取二级分类的数据
      const {category1Id} = this.cForm
      //向父组件传一级分类id
      this.$emit('getCategoryId',{categoryId:category1Id,level:1})
      let result = await this.$API.attr.reqCategory2List(category1Id)
      // console.log(result)
      if(result.code==200){
        this.list2 = result.data
      }
    },
    //二级分类的select事件的回调
    async handler2(){
      //清除数据
      this.list3 = []
      this.cForm.category3Id = ''
      //发送请求获取二级分类的数据
      const {category2Id} = this.cForm
      //向父组件传二级分类id
      this.$emit('getCategoryId',{categoryId:category2Id,level:2})
      let result = await this.$API.attr.reqCategory3List(category2Id)
      // console.log(result)
      if(result.code==200){
        this.list3 = result.data
      }
    },
    //三级分类的select事件的回调
    handler3(){
      const {category3Id} = this.cForm
      //向父组件三级分类id
      this.$emit('getCategoryId',{categoryId:category3Id,level:3})
    }
  },
   //组件挂载完成后，就进行一级分类数据的获取
  mounted() {
    //获取一级组件的方法
    this.getCategory1List()
  },
};
</script>

<style>
</style>