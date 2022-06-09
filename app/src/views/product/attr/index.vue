<template>
  <div>
    <!-- 卡片组件 -->
    <el-card style="margin-bottom: 20px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTabel"></CategorySelect>
    </el-card>
    <el-card>
      <!-- 一进来显示的结构 -->
      <div v-show="isShowTabel">
        <!-- disabled：表示该按键是否禁止使用，true为禁止使用 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttr"
          :disabled="!category3Id"
          >添加属性</el-button
        >
        <!-- 表格展示平台属性 -->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <!-- row为attrList里面的每一个对象 -->
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 20px"
              >
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="150px"
            align="center"
          >
            <template slot-scope="{row,$index}">
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              @click="updateAttr(row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性或修改时的结构 -->
      <div v-show="!isShowTabel">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名:">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAtttrValue" :disabled="!attrInfo.attrName">添加属性值</el-button></el-button>
        <el-button @click="isShowTabel=true">取消</el-button></el-button>
        <el-table style="width:100%; margin:20px 0px" border :data="attrInfo.attrValueList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="属性值名称"
            width="width">
            <!-- row就是el-table里：data属性遍历的每一个对象 -->
             <template slot-scope="{row,$index}">
               <!-- input与span要进行切换，当输入框失去焦点的时候会切换到span -->
               <el-input 
                placeholder="请输入属性值名称" 
                v-model="row.valueName" 
                size="mini" v-if="row.flag" 
                @blur="toLook(row)" 
                @keyup.native.enter="row.flag=false">
               </el-input>
               <span v-else @click="toEdit(row,$index)" style="display:block">{{row.valueName}}</span>
             </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width">
            <template slot-scope="{row,$index}">
              <!-- 气泡确定框
                   title:设置标题显示的消息
                   confirm:点击确定按钮触发的 -->
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
                <el-button slot="reference" type="danger" icon="el-icon-delete" size='mini'></el-button>
              </el-popconfirm>
             </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button></el-button>
        <el-button @click="isShowTabel=true">取消</el-button></el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入loadsh的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      //收集子组件返回了数据
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //储存服务器返回的数据
      attrList: [],
      //控制tabel表格的显示与隐藏
      isShowTabel: true,
      //收集新增或修改的属性值
      attrInfo: {
        attrName: "", // 属性名
        // 属性名对应的所有属性值,因为属性值可以有多个所以用数组，且每一个属性值就是一个对象
        attrValueList: [
          // {
          //   attrId: 0, //属性名的id
          //   valueName: "", //属性值
          // },
        ],
        categoryId: 0, //三级分类category3Id
        categoryLevel: 3, //服务器分别是否时三级分类
      },
    };
  },
  methods: {
    //自定义事件的回调
    getCategoryId({ categoryId, level }) {
      // console.log(categoryId,level)
      //区分各级分类的id，然后进行存储
      if (level == 1) {
        this.category1Id = categoryId;
        //清除数据
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //当有三级分类的id时，会发请求获取平台额属性
        this.getAttrList();
      }
    },
    //当用户确定三级分类的数据时，就可以向服务器获取数据进行展示
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result)
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    //添加属性值的函数
    addAtttrValue() {
      //向属性值的数组里添加元素
      //加的对象数据要和要穿的的参数一致，不能随便写
      this.attrInfo.attrValueList.push({
        //修改某个属性的时候可以在已有的属性值的基础上可以新增
        attrId: this.attrInfo.id,
        valueName: "",
        //控制属性值的输入时input和span的切换
        flag: true,
      });
    },
    //添加属性的回调
    addAttr() {
      //切换table隐藏
      this.isShowTabel = false;
      //清除数据
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        //在这里进行赋值给id
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    //修改属性的回调
    updateAttr(row) {
      // console.log(row)
      this.isShowTabel = false;
      //将选中的属性赋值给attrInfo
      //由于存在对象里套数组，数组里套对象，因此不能使用浅拷贝只能使用深拷贝（用lodash里的深拷贝）
      this.attrInfo = cloneDeep(row);
      //在修改属性的时候在属性中添加flag
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    //添加或修改里设置属性值的input失去焦点的回调
    toLook(row) {
      //如果为空要提示
      if (row.valueName.trim() == "") {
        this.$message("请输入属性值");
        return;
      }
      //新增的属性值不能和已有的属性值相同
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) {
        this.$message("属性值不能重复");
        return;
      }
      //让编辑模式变为查看模式
      row.flag = false;
    },
    //点击span的回调
    toEdit(row) {
      //切换为编辑模式
      row.flag = true;
      //切换为编辑模式的时候要自动聚焦
      // this.$nextTick(()=>{
      //   this.$refs[index].focus()
      // })
    },
    //气泡确定框的确定按钮的回调
    deleteAttrValue(index){
      //删除一个当前点击的属性
      this.attrInfo.attrValueList.splice(index,1)
      
    },
    //点击保存按钮进行添加属性或修改属性
    async addOrUpdateAttr(){
      //整理参数（属性值为空的不提交；提交的数据没有flag）
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
        //过滤属性值不为空的
        if(item.valueName!=''){
          //删除flag属性
          delete item.flag
          return true
        }
      })
      //发请求
      try {
        let result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        //成功之后
        //跳转到属性展示
        this.isShowTabel = true
        //提示保存成功
        this.$message({type:'success',message:'保存成功'})
        //再次发送请求获取新数据
        this.getAttrList()
      } catch (error) {
        this.$message('保存失败')
      }
    }
  },
};
</script>

<style>
</style>