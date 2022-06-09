<template>
    <div>
        <el-form ref="form" label-width="80px" :inline="false" size="normal" :model="spu">
            <el-form-item label="SPU名称">
                <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
            </el-form-item>
            <el-form-item label="品牌" size="normal">
                <!-- v-model:将收集的数据存储到tmId -->
                <el-select placeholder="请选择品牌" v-model="spu.tmId">
                    <!-- valeu；要收集的数据 -->
                    <el-option :label="tm.tmName" :value="tm.id" v-for="(tm, index) in tradeMarkList" :key="tm.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述" size="normal">
                <el-input placeholder="描述" type="textarea" rows="4" v-model="spu.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU图片" size="normal">
                <!--照片墙 (进行上传图片)-->
                <!-- action:上传图片的地址
                    list-fype:图片列表的类型，当前为照片墙类型 
                    :on-preview:图片预览时会触发
                    :on-remove:图片删除时会触发
                    :fle-list:上传文件列表（通过已有的数组进行展示有几张图片,数组里面的对象必须有name和url属性）
                    :on-success:图片上传成功时的回调
                -->
                <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="imgList"
                    :on-success="handlerSuccess">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="销售属性" size="normal">
                <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrId">
                    <el-option :label="unslect.name" :value="`${unslect.id}:${unslect.name}`"
                        v-for="(unslect, index) in unSelectSaleAttr" :key="unslect.id">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" @click="addSaleAttr" :disabled="!attrId">添加销售属性
                </el-button>
                <!-- 展示当前SPU当前已有的销售属性-->
                <el-table style="width:100%" border :data="spu.spuSaleAttrList">
                    <el-table-column label="序号" width="80px" type="index"></el-table-column>
                    <el-table-column label="属性" width="width" prop="saleAttrName"></el-table-column>
                    <el-table-column label="属性值名称列表" width="width">
                        <template slot-scope="{row,$index}">
                            <!-- 表示显示的属性值按钮 
                                :disable-rransitions:表示是否开启动画
                                @close：点击叉子的删除按钮
                            -->
                            <el-tag :key="tag.id" v-for="(tag, index) in row.spuSaleAttrValueList" closable
                                :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index, 1)">
                                {{ tag.saleAttrValueName }}
                            </el-tag>
                            <!-- 下面两个组件是通过inputVisible进行切换的 -->
                            <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue"
                                ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm(row)">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput(row)"
                                icon="el-icon-plus">添加
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="width">
                        <template slot-scope="{row,$index}">
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteAttr(row, $index)">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="" size="normal">
                <el-button type="primary" @click="addOrUpdataSpu">保存</el-button>
                <el-button type="info" @click="cansle">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'SpuForm',
    data() {
        return {
            //存储spu信息属性
            //添加spu的的时候里面没有结构不知道要添加属性到哪去所以里面要写一下结构
            spu: {
                //三级分类id
                category3Id: 0,
                //描述
                description: "",
                //收集SPU图片信息
                spuImageList: [
                    // {
                    //     id: 0,
                    //     imgName: "string",
                    //     imgUrl: "string",
                    //     spuId: 0
                    // }
                ],
                //spu名称
                spuName: "",
                //品牌的id
                tmId: '',
                //平台属性与属性值收集
                spuSaleAttrList: [
                    // {
                    //     baseSaleAttrId: 0,
                    //     id: 0,
                    //     saleAttrName: "string",
                    //     spuId: 0,
                    //     spuSaleAttrValueList: [
                    //         {
                    //             baseSaleAttrId: 0,
                    //             id: 0,
                    //             isChecked: "string",
                    //             saleAttrName: "string",
                    //             saleAttrValueName: "string",
                    //             spuId: 0
                    //         }
                    //     ]
                    // }
                ],
            },
            //存储品牌的信息
            tradeMarkList: [],
            //存储图片信息
            imgList: [],
            //存储全部销售属性
            //收集未选择的销售属性id
            attrId: '',
            saleAttrList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false
        }
    },
    methods: {
        //照片墙删除图片时的回调
        handleRemove(file, fileList) {
            //file:表示删除的那种图片，fileList:删除图片后照片墙还剩下的图片列表
            // console.log(file, fileList);
            //收集照片墙图片的数据
            this.imgList = fileList
        },
        //照片墙图片预览时的回调
        handlePictureCardPreview(file) {
            //将图片地址赋值各这个属性
            this.dialogImageUrl = file.url;
            //对话框的显示与隐藏
            this.dialogVisible = true;
        },
        //照片墙图片上传成时的回调
        handlerSuccess(response, file, fileList) {
            //收集图片的信息
            this.imgList = fileList
        },
        //点击父组件修改spu时的回调，初始化spuForm数据(通过父组件的修改按键进行调用)
        async initSpuData(spu) {
            //获取SPU信息的数据
            let result1 = await this.$API.spu.reqSpu(spu.id)
            if (result1.code == 200) {
                console.log(result1.data)
                this.spu = result1.data
            }
            //获取spu品牌的信息
            let result2 = await this.$API.spu.reqTrademark()
            if (result2.code == 200) {
                this.tradeMarkList = result2.data
            }
            //获取spu图片的信息
            let result3 = await this.$API.spu.reqImageLIst(spu.id)
            if (result3.code == 200) {
                //由于图片墙显示的数据需要数组，数组里面需要有name和url两个值，则需要对服务器返回的数据进行处理
                let listAttr = result3.data
                listAttr.forEach(item => {
                    item.name = item.imgName
                    item.url = item.imgUrl
                })
                this.imgList = listAttr
            }
            //获取全部的销售属性
            let result4 = await this.$API.spu.reqSaleAttrList()
            if (result4.code == 200) {
                this.saleAttrList = result4.data
            }
        },
        //点击添加销售属性的回调
        addSaleAttr() {
            //把收集到的销售属性数据进行整理
            const [baseSaleAttrId, saleAttrName] = this.attrId.split(':')
            //向spu对象的spuSaleAttrList属性中添加新的属性值
            let newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
            this.spu.spuSaleAttrList.push(newSaleAttr)
            //清空数据
            this.attrId = ''
        },
        //销售属性值的添加的回调
        showInput(row) {
            //用$set向sup.spuSaleAttrList下添加一个响应式属性
            this.$set(row, 'inputVisible', true)
            this.$set(row, 'inputValue', '')
        },
        //销售属性添加属性值的input框失去焦点的回调
        handleInputConfirm(row) {
            const { baseSaleAttrId, inputValue } = row
            //新增的属性值不能为空
            if (inputValue.trim() == '') {
                this.$message('属性值不能为空')
                return
            }
            //属性值不能重复 every返回的时布尔值
            let result = row.spuSaleAttrValueList.every(item => {
                return item.saleAttrValueName != inputValue
            })
            if (!result) {
                this.$message('属性值不能相同')
                return
            }
            console.log(result)
            //新增的销售属性值
            let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
            row.spuSaleAttrValueList.push(newSaleAttrValue)
            //修改inputVisibelde值为false进行显示button按钮
            row.inputVisible = false
        },
        //删除spu属性的回调
        deleteAttr(row, $index) {
            this.spu.spuSaleAttrList.splice($index, 1)
        },
        //点击保存按钮发送信息到服务器进行修改和添加spu
        async addOrUpdataSpu() {
            //首先要进行整理数据（整理照片墙的数据）
            this.spu.spuImageList = this.imgList.map(item => {
                return {
                    imageName: item.name,
                    //如果是新增的图片就有response属性，
                    imageUrl: (item.response ? item.response.data : item.url)
                }
            })
            //发送求情
            let result = await this.$API.spu.reqAddOrUpdate(this.spu)
            if (result.code == 200) {
                //进行场景的切换
                this.$emit('changeScene', {scene:0,flag:this.spu.id?'修改':'添加'})
                //提示保存存草稿
                this.$message({ type: 'success', message: '保存成功' })
            }
            //进行数据清空
            Object.assign(this._data,this.$options.data())
        },
        //点击父组件的添加spu按钮时发请求的回调
        async addSpuData(category3Id) {
            //收集category3Id
            this.spu.category3Id = category3Id
            //获取spu品牌的信息
            let result1 = await this.$API.spu.reqTrademark()
            if (result1.code == 200) {
                this.tradeMarkList = result1.data
            }
            //获取全部的销售属性
            let result2 = await this.$API.spu.reqSaleAttrList()
            if (result2.code == 200) {
                this.saleAttrList = result2.data
            }
        },
        //点击取消按钮的回调
        cansle(){
            //向父组件传递数据进行切换场景
            this.$emit('changeScene', {scene:0})
            //spu的数据清理
            //assing是es6的新方法：进行合并对象的（把后面一个配置对象的值赋值给前面一个对象）
            //配置对象里面的第一个数是当前有的数据，的二个是data里最初的数据
            Object.assign(this._data,this.$options.data())
        }
    },
    computed: {
        //计算出还没有选择的属性
        unSelectSaleAttr() {
            //整个平台就三个属性,有从已经有的属性中过滤出还未选择的属性
            let result = this.saleAttrList.filter(item => {
                return this.spu.spuSaleAttrList.every(item1 => {
                    return item.name != item1.saleAttrName
                })
            })
            return result
        }
    }
}
</script>

<style>
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>