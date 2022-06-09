<template>
  <div>
    <!-- 表格 -->
    <el-table :data="skuList" border>
      <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
      <el-table-column label="名称" align="center" prop="skuName"></el-table-column>
      <el-table-column label="描述" align="center" prop="skuDesc"></el-table-column>
      <el-table-column label="默认图片" align="center" width="100px">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" style="widows: 80px;height: 80px;">
        </template>
      </el-table-column>
      <el-table-column label="重量(KG)" align="center" width="80px" prop="weight"></el-table-column>
      <el-table-column label="价格(元)" align="center" width="80px" prop="price"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="success" size="mini" icon="el-icon-sort-up" title="点击下架" v-if="row.isSale == 1"
            @click="cansleSale(row)">
          </el-button>
          <el-button type="success" size="mini" icon="el-icon-sort-down" title="点击上架" v-else @click="onSale(row)">
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" title="编辑sku" @click="edit"></el-button>
          <el-button type="info" size="mini" icon="el-icon-info" title="查看sku详情" @click="skuDetail(row)"></el-button>
          <el-popconfirm title="确定删除此sku吗？" style="margin-left: 10px;" @onConfirm="deleteSlu(row)">
            <el-button type="danger" size="mini" icon="el-icon-delete" slot="reference" title="删除sku"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination :total="total" :current-page="page" :page-size="limit" :page-sizes="[3, 5, 10]"
      layout="prev,pager,next,jumper,->,sizes,total" style="text-align: center;" @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
    <!-- 抽屉效果 -->
    <!-- :visible.sync:控制抽屉是否显示
         :direction：控制动画方向
    -->
    <el-drawer :visible.sync="drawer" :direction="direction" :show-close="false" size="50%">
      <!-- el-row:表示一行， el-clo：表示一行里面的每个元素-->
      <el-row>
        <!-- span:站一行的多少份 -->
        <el-col :span="5">
          <div style="font-size: 18px;text-align: right;margin: 10px">名称</div>
        </el-col>
        <el-col :span="16">
          <div style="margin: 10px;">{{ skuDetailData.skuName }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div style="font-size: 18px;text-align: right;margin: 10px">描述</div>
        </el-col>
        <el-col :span="16">
          <div style="margin: 10px;">{{ skuDetailData.skuDesc }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div style="font-size: 18px;text-align: right;margin: 10px">价格</div>
        </el-col>
        <el-col :span="16">
          <div style="margin: 10px;">{{ skuDetailData.price }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div style="font-size: 18px;text-align: right;margin: 10px">平台属性</div>
        </el-col>
        <el-col :span="16">
          <el-tag type="success" v-for="(skuAttr, index) in skuDetailData.skuAttrValueList" :key="skuAttr.id"
            style="margin-left: 10px;margin-top: 10px;">
            {{ `${skuAttr.attrId}-${skuAttr.valueId}` }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div style="font-size: 18px;text-align: right;margin: 10px">商品图片</div>
        </el-col>
        <el-col :span="16">
          <!-- 轮播图 -->
          <el-carousel height="500px" style="border: 1px solid red;margin-top: 20px;">
            <el-carousel-item v-for="(skuImage, index) in skuDetailData.skuImageList" :key="skuImage.id">
              <img :src="skuImage.imgUrl" alt="" style="width: 100%;height: 100%;">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      //当前第几页
      page: 1,
      //当前页面有几条数据
      limit: 5,
      //存储一共有多少条数据
      total: 0,
      //存储服务器返回的sku列表数据
      skuList: [],
      //储存服务器返回的查看sku详情的数据
      skuDetailData: {},
      //控制查看Sku详情的抽屉效果
      drawer: false,
    }
  },
  methods: {
    //获取sku列表数据的回调
    async getSkuList() {
      //结构
      const { page, limit } = this
      let result = await this.$API.sku.reqSkuList(page, limit)
      if (result.code == 200) {
        this.total = result.data.total
        this.skuList = result.data.records
      }
    },
    //点击分页器页码按钮的回调
    handleCurrentChange(page) {
      this.page = page
      this.getSkuList()
    },
    //点击分页器每页展示条数按钮的回调
    handleSizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    },
    //点击上架按钮的回调
    async onSale(row) {
      let result = await this.$API.sku.reqOnSale(row.id)
      if (result.code == 200) {
        row.isSale = 1
        this.$message({ type: 'success', message: '上架成功' })
      }
    },
    //点击下架按钮的回调
    async cansleSale(row) {
      let result = await this.$API.sku.reqCancelSale(row.id)
      if (result.code == 200) {
        row.isSale = 0
        this.$message({ type: 'success', message: '下架成功' })
      }
    },
    //点击编辑的回调
    edit() {
      this.$message({ type: 'info', message: "正在开发中" })
    },
    //点击查看详情按钮的回调
    async skuDetail(row) {
      //显示抽屉效果
      this.drawer = true
      //发请求
      let result = await this.$API.sku.reqGetSkuById(row.id)
      if (result.code == 200) {
        this.skuDetailData = result.data
      }
    },
    //删除sku的回调
    async deleteSlu(row){
      let result = await this.$API.sku.reqDeleteSku(row.id)
      if(result.code==200){
        this.$message({type:'success',message:'删除sku成功'})
        //如果spu的个数大于1保留在单曲页，小于一跳转到前一页
        this.page = this.skuList.length>=1?this.page:this.page-1
        this.getSkuList()
      }
    }
  },
  mounted() {
    this.getSkuList()
  },
}
</script>

<style>
.el-carousel__button {
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
}
</style>