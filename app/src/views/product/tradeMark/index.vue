<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" @click="showDialog">添加</el-button>
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
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" class="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" class="el-icon-delete" size="mini" @click="deleteTrademark(row)">删除</el-button>
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
    <el-pagination :current-page="page" :total="total" :page-size="limit" :pager-count="7" :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper,->, sizes, total" @current-change="handleCurrentChange"
      @size-change="handlesizeChange" style="margin-top: 20px; textAlign: center">
    </el-pagination>
    <!-- 对话框 -->
    <!-- title：设置标题的
         visible.sync:控制对话框显示与隐藏的 -->
    <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <!-- 表单 -->
      <!-- model：把表单里的数据收集到一个对象上，当进行表单验证时也需要这个属性 
           roule：表单验证的规则
           ref:作为表单验证的-->
      <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可 -->
      <el-form :model="tmForm" :rules="rules" ref="ruleForm" style="width: 80%">
        <!-- label:设置显示的名称
             label-width:设置label标题宽度 -->
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="名称LOGO" label-width="100px" prop="logoUrl">
          <!-- 上传图片 -->
          <!--on-success：图片上传成功之后的回调
            before-upload：图片上传之前的回调 
            action:设置图片上传的地址-->
          <!-- 这里收集图片数据不能用v-model -->
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过2MB
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      //分页器第几页
      page: 2,
      //当前页数展示数据的条数
      limit: 3,
      //一共的数据条数
      total: 0,
      //列表展示的数据
      list: [],
      //对话显示与隐藏的属性
      dialogFormVisible: false,
      //上传图片使用的属性
      // imageUrl: "",
      //收集品牌的信息
      tmForm: {
        //品牌的名字
        tmName: "",
        //品牌的图片
        logoUrl: "",
      },
      //表单验证的规则
      rules: {
        //品牌名称的验证规则
        tmName: [
          //requered:必须要输入 message：未输入使得提示信息 trigger:在什么行为下进行触发（一般有：blur：失焦;change）
          { required: true, message: "请输入活动名称", trigger: "blur" },
          //min:最小输入字符 max：最大输入字符 message:为符合得提示信息
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "change", },
        ],
        //品牌logo的验证规则
        logoUrl: [{ required: true, message: "请选择品牌图片" }],
      },
    };
  },
  methods: {
    //获取品牌列表的数据
    async getPageList() {
      const { page, limit } = this;
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      // console.log(result)
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    //当点击的页码数发送变化时
    //会把选中的页码传进来
    handleCurrentChange(page) {
      this.page = page;
      this.getPageList();
    },
    //当点击的一页展示的数据条数发送变化时
    //会把选中的显示条数传进来
    handlesizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    //上传图片成功的回调
    //res：上传成功之后返回前端的数据
    //file:上传成功后服务器返回来的数据
    handleAvatarSuccess(res, file) {
      //收集图片数据
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.tmForm.logoUrl = res.data;
    },
    //图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //点击添加按钮时
    showDialog() {
      //显示对话框
      this.dialogFormVisible = true;
      //清除对话框的数据
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    //点击对话框的确定按钮（进行添加或修改服务器中的数据）
    addOrUpdateTradeMark() {
      //当全部得表单验证通过里，才进行下一步
      //validate是验证表单的
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          this.dialogFormVisible = false;
          //发请求
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          // console.log(result);
          if (result.code == 200) {
            //弹出添加成功或修改成功提示
            //$messge是elementUI的
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            //添加或修改成功后会从新获取列表进行展示
            //如果是添加品牌留着第一页，如果是修改品牌就留在当前页
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          console.log('erro submit')
          return false
        }
      });
    },
    //点击表格中的修改时
    //row:当前选中的品牌的信息
    updateTradeMark(row) {
      // console.log(row);
      this.dialogFormVisible = true;
      //将已有的信息赋值给tmForm
      //用浅拷贝继续赋值不会直接该网页的信息
      this.tmForm = { ...row };
    },
    deleteTrademark(row) {
      //弹窗
      this.$confirm(`你确定删除${row.tmName}`, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        //用户点击确定按钮的时候会触发
        //向服务器发请求
        let result = await this.$API.trademark.reqDeleteTrademark(row.id)
        // console.log(result)
        //如果删除成功
        if (result.code == 200) {
          //弹窗删除成功
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //重写发送请求获取数据展示
          if (this.list.length == 1) {
            this.page -= 1
            this.getPageList()
          } else {
            this.getPageList()
          }

        }
      }).catch(() => {
        //用户点击取消按钮时
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  mounted() {
    this.getPageList();
  },
};
</script>/getPageList
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>