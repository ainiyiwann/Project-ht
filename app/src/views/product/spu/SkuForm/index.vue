<template>
    <div>
        <!-- 表单：lable-width：设置里面每一个label的宽度 -->
        <el-form label-width="80px">
            <el-form-item label="SPU名称:">{{ spuName }}</el-form-item>
            <el-form-item label="SKU名称">
                <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input placeholder="价格(元)" v-model="skuInfo.price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="重量(kg)">
                <el-input placeholder="重量(kg)" v-model="skuInfo.weight"></el-input>
            </el-form-item>
            <el-form-item label="规格描述">
                <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form :inline="true">
                    <el-form-item :label="attrInfo.attrName" v-for="(attrInfo, index) in attrInfoList"
                        :key="attrInfo.id">
                        <!-- 将收集的数据存储到当前选择的attrInfoList的对象中 -->
                        <el-select placeholder="请选择" v-model="attrInfo.attrIdAndValueId">
                            <!-- value是要收集的数据 -->
                            <el-option v-for="(attr, index) in attrInfo.attrValueList" :key="attr.id"
                                :label="attr.valueName" :value="`${attrInfo.id}:${attr.id}`">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true">
                    <el-form-item :label="spuSaleAttr.saleAttrName" v-for="(spuSaleAttr, index) in spuSaleAttrList"
                        :key="spuSaleAttr.id">
                        <el-select placeholder="请选择" v-model="spuSaleAttr.attrIdAndValueId">
                            <el-option v-for="(spuSaleAttrValue, index) in spuSaleAttr.spuSaleAttrValueList"
                                :key="spuSaleAttrValue.id" :label="spuSaleAttrValue.saleAttrValueName"
                                :value="`${spuSaleAttr.id}:${spuSaleAttrValue.id}`">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片列表">
                <!-- @selection-change；当选择的复选框发送变化时 -->
                <el-table border :data="spuImageList" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="80px"></el-table-column>
                    <el-table-column label="图片">
                        <template slot-scope="{row,$index}">
                            <img :src="row.imgUrl" style="width: 100px;height: 100px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="imgName"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="{row,$index}">
                            <el-button type="primary" v-if="row.isDefault == 0" @click="changeDefault(row)">设置默认
                            </el-button>
                            <el-button style="color: red;" v-else>默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="cansle">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'SkuForm',
    data() {
        return {
            //spu图片的信息
            spuImageList: [],
            //spu销售属性列表信息
            spuSaleAttrList: [],
            //spu平台属性的数据
            attrInfoList: [],
            //收集sku数据进行保存的时候发送请求（通过服务器需要的参数来写）
            skuInfo: {
                //下面三个属性都是父组件给的
                category3Id: 0,
                spuId: 0,
                tmId: 0,
                //以下的数据是通过v-model收集的
                skuName: "",
                price: 0,
                weight: "",
                //描述的信息
                skuDesc: "",
                //以下是通过自己书写的
                //收集图片的信息
                skuImageList: [
                    //     {
                    //         id: 0,
                    //         imgName: "",
                    //         imgUrl: "",
                    //         isDefault: "",
                    //         skuId: 0,
                    //         spuImgId: 0
                    //     }
                ],
                //默认图片
                skuDefaultImg: "",
                //销售属性列表
                skuSaleAttrValueList: [
                    // {
                    //     saleAttrId: 0,
                    //     saleAttrValueId: 0,
                    //     saleAttrValueName: "",
                    //     skuId: 0,
                    //     spuId: 0
                    // }
                ],
                //平台属性列表
                skuAttrValueList: [
                    // {
                    //     skuId: 0,
                    //     valueId: 0
                    // }
                ],
            },
            //spu名称
            spuName: '',
            //收集图片的属性
            imageList: []
        }
    },
    methods: {
        //点击取消按钮的回调
        cansle() {
            this.$emit('changeScene', { scene: 0 })
            //清除数据
            Object.assign(this._data, this.$options.data())
        },
        //父组件点击添加sku的的回调（进行发送请求）
        async getData(category1Id, category2Id, row) {
            // console.log(category1Id,category2Id,row)
            //收集spu名称
            this.spuName = row.spuName
            //收集父组件的数据
            this.skuInfo.category3Id = row.category3Id
            this.skuInfo.spuId = row.id
            this.skuInfo.tmId = row.tmId
            //获取spu图片的信息
            let result1 = await this.$API.spu.reqSpuImageList(row.id)
            if (result1.code == 200) {
                //给服务器返回的数据加上isDefault属性
                let list = result1.data
                list.forEach(item => {
                    item.isDefault = 0
                })
                this.spuImageList = list
            }
            //获取spu销售属性列表信息
            let result2 = await this.$API.spu.reqSpuSaleAttrList(row.id)
            if (result2.code == 200) {
                this.spuSaleAttrList = result2.data
            }
            //获取spu平台属性的数据
            let result3 = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, row.category3Id)
            if (result3.code == 200) {
                this.attrInfoList = result3.data
            }
        },
        //table表格复选框发送变化时的回调
        handleSelectionChange(params) {
            //params为勾选的spuImageList里对应的对象
            //收集勾选的图片列表
            this.imageList = params
        },
        //点击设置按钮的操作
        changeDefault(row) {
            //让所有的isDefault变为0
            this.spuImageList.forEach(item => {
                item.isDefault = 0
            })
            //点击的按钮变为1
            row.isDefault = 1
            //收集默认图片的地址
            this.skuInfo.skuDefaultImg = row.imgUrl
        },
        //保存按钮的回调
        async save() {
            //新建一个数组
            let arr = []
            //整理平台属性数据
            this.attrInfoList.forEach(item => {
                if (item.attrIdAndValueId) {
                    //将有attrIdAndValueId属性的对象进行切割
                    const [attrId, valueId] = item.attrIdAndValueId.split(':')
                    //带给服务器的数据时一个对象
                    let obj = { attrId, valueId }
                    arr.push(obj)
                }
            })
            //将整理好的数组添加到skuInfo.skuAttrValuelist里
            this.skuInfo.skuAttrValueList = arr
            //整理销售属性数据
            let arr1 = []
            this.spuSaleAttrList.forEach(item => {
                if (item.attrIdAndValueId) {
                    const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':')
                    let obj = { saleAttrId, saleAttrValueId }
                    arr1.push(obj)
                }
            })
            //将整理好的数据添加到skuInfo.skuSaleAttrValueList里
            this.skuInfo.skuSaleAttrValueList = arr1
            //整理图片列表
            this.skuInfo.skuImageList = this.imageList.map(item => {
                //返回的结果赋值个skuInfo.skuImageList
                return {
                    imgName: item.imgName,
                    imgUrl: item.imgUrl,
                    isDefault: item.isDefault,
                    spuImgId: item.id
                }
            })
            //发送请求
            let result = await this.$API.spu.reqSaveSkuInfo(this.skuInfo)
            if(result.code==200){
                //发送成功进行场景切换
                this.$emit('changeScene', { scene: 0 })
                this.$message({type:'success',message:'保存成功'})
            }
        }
    }
}
</script>

<style>
</style>