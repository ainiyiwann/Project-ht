<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <CategorySelect @getCategoryId="getCategoryId" :show="scene != 0"></CategorySelect>
    </el-card>
    <el-card>
      <!-- 这个模块将会有三个模块进行切换-->
      <!-- 一进来展示的模块（spu列表的模块） -->
      <div v-show="scene == 0">
        <el-button type="primary" icon="el-icon-plus" @click="addSpu" :disabled="!category3Id">添加SPU</el-button>
        <el-table :data="records" style="width: 100%" border>
          <el-button type="index" label="序号" width="80px" align="center">
          </el-button>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)">
              </hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)">
              </hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表" @click="handler(row)">
              </hint-button>
              <!-- 气泡确定按钮 -->
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu" slot="reference">
                </hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :page-size="limit" :page-sizes="[3, 5, 10]" :current-page="page" :pager-count="7"
          layout="prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="handleCurrentChange"
          @size-change="handleSizeChange" style="textAlign: center">
        </el-pagination>
        <!-- 对话框 -->
        <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
          <!-- v-loading:为设置加载效果 -->
          <el-table :data="skuList" border v-loading="loading">
            <el-table-column prop="skuName" label="名称" width="150"></el-table-column>
            <el-table-column prop="price" label="价格" width="200"></el-table-column>
            <el-table-column prop="weight" label="重量"></el-table-column>
            <el-table-column label="默认图片">
              <template slot-scope="{row,$index}">
                <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;">
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
      <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>
      <SkuForm v-show="scene == 2" @changeScene="changeScene" ref="sku"></SkuForm>
    </el-card>
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: "Spu",
  components: {
    SpuForm,
    SkuForm,
  },
  data() {
    return {
      //一级分类id
      category1Id: "",
      //二级分类id
      category2Id: "",
      //三级分类id
      category3Id: "",
      //默认加载spu的第几页
      page: 1,
      //每页要多少条数据
      limit: 3,
      //存储spu列表的数据
      records: [],
      //分页器一共有多少条数据
      total: 0,
      //0表示展示SPU列表数据，1表示添加或修改spu, 2添加sku
      scene: 0,
      //切换对话框
      dialogTableVisible: false,
      //收集查看sku列表的spu的数据
      spu: {},
      //收集查看sku列表的数据
      skuList: [],
      //设置加载是否显示
      loading: true
    };
  },
  methods: {
    //获取Spu列表的回调
    async getSpuList() {
      //要传page、limit、getegory3Id
      const { page, limit } = this;
      let result = await this.$API.spu.reqSpuInfoList(page, limit, this.category3Id);
      // console.log(result)
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    //三级联动的自定义事件，把子组件的响应id传递给父组件
    //categoryId:获取一级、二级、三级分类的id,level：区分是几级id
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        //清除二级、三级分类的id
        this.category2Id = "";
        this.category3Id = "";
      }
      else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      }
      else {
        this.category3Id = categoryId;
        //获取spu列表进行数据展示
        this.getSpuList();
      }
    },
    //点击分页器第几页的回调
    handleCurrentChange(page) {
      this.page = page
      //再次发送请求或新数据进行展示
      this.getSpuList()
    },
    //点击分页器一页显示多少行的数据
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    //添加spu的回调
    addSpu() {
      this.scene = 1
      //通知子组件发请求
      this.$refs.spu.addSpuData(this.category3Id)
    },
    //修改spu的回调
    updateSpu(row) {
      this.scene = 1
      //获取子组件spuFrom的initSpuData方法
      this.$refs.spu.initSpuData(row)
    },
    //添加sku的回调
    addSku(row) {
      //切换场景
      this.scene = 2
      //让父组件调用子组件的方法
      this.$refs.sku.getData(this.category1Id, this.category2Id, row)
    },
    //spuForrm的自定义事件
    changeScene({ scene, flag }) {
      //flag是为了区分是修个函数添加
      this.scene = scene
      //如果是修个就留在当前页，是添加跳转到第一页
      if (flag == "修改") {
        this.getSpuList()
      } else {
        this.page = 1
        this.getSpuList()
      }
      //重写获取列表数据进行展示
    },
    //删除SPU的回调
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code == 200) {
        this.$message({ type: 'success', message: '删除成功' })
        //如果spu的个数大于1保留在单曲页，小于一跳转到前一页
        this.page = this.records.length > 1 ? this.page : this.page - 1
        this.getSpuList()
      }
    },
    //点击查看sku列表的回调
    async handler(row) {
      //清除数据
      this.skuList = []
      this.dialogTableVisible = true
      //保存spu信息
      this.spu = row
      //发请求，获取sku列表数据进行掌展示
      let result = await this.$API.spu.reqFindBySppuId(row.id)
      if (result.code == 200) {
        this.skuList = result.data
        //设置loading隐藏
        this.loading = false
      }
    },
    //关闭对话框的对的
    close(done) {
      //将loading属性设置为true
      this.loading = true
      //关闭对话框
      done()
    }
  },
};
</script>

<style>
</style>