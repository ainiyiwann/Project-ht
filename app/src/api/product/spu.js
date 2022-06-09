import request from '@/utils/request'
//获取SPU模块数据

//获取SPU列表数据的接口：地址：/admin/product/{page}/{limit} GET 有参
export const reqSpuInfoList = (page, limit, category3Id) => {
    return request({
        url: `/admin/product/${page}/${limit}`,
        method: 'get',
        params: { category3Id }
    })
}

//获取修改SPU模块的spu信息属性 地址：/admin/product/getSpuById/{spuId} GET 有参
export const reqSpu = (spuId) => {
    return request({
        url: `/admin/product/getSpuById/${spuId}`,
        method: 'get'
    })
}

//获取修改SPU模块的spu品牌信息： 地址：/admin/product/baseTrademark/getTrademarkList GET 无参
export const reqTrademark = () => {
    return request({
        url: '/admin/product/baseTrademark/getTrademarkList',
        method: 'get'
    })
}

//获取修改SPU模块的spu图片的信息：地址：/admin/product/spuImageList/{spuId} 有参
export const reqImageLIst = (spuId) => {
    return request({
        url: `/admin/product/spuImageList/${spuId}`,
        method: 'get'
    })
}

//获取修改SPU模块的spu销售属性列表的信息：地址：/admin/product/baseSaleAttrList 无参
export const reqSaleAttrList = () => {
    return request({
        url: '/admin/product/baseSaleAttrList',
        method: 'get'
    })
}

//添加spu的接口：地址；/admin/product/saveSpuInfo POST 有参 (没有id)
//修改spu的接口：地址：/admin/product/updateSpuInfo POST 有参(有id)
export const reqAddOrUpdate = (spuInfo) => {
    //如果参数带有id这为修改spu
    if (spuInfo.id) {
        return request({
            url: '/admin/product/updateSpuInfo',
            method: 'post',
            data: spuInfo
        })
        //如果参数没有id
    } else {
        return request({
            url: '/admin/product/saveSpuInfo',
            method: 'post',
            data: spuInfo
        })
    }
}

//删除spu的接口：地址：/admin/product/deleteSpu/{spuId} DELITE 有参
export const reqDeleteSpu = (spuId) => {
    return request({
        url: `/admin/product/deleteSpu/${spuId}`,
        method: 'delete'
    })
}

//在添加sku按钮点击时获取spu图片的信息：地址：/admin/product/spuImageList/{spuId} GET 有参
export const reqSpuImageList = (spuId) => {
    return request({
        url: `/admin/product/spuImageList/${spuId}`,
        method: 'get'
    })
}

//在添加sku按钮点击时获取spu销售属性列表信息：地址：/admin/product/spuSaleAttrList/{spuId} GET 有参
export const reqSpuSaleAttrList = (spuId) => {
    return request({
        url: `/admin/product/spuSaleAttrList/${spuId}`,
        method: 'get'
    })
}

//在添加sku按钮点击时获取spu平台属性的数据的接口: 地址：/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} GET 有参
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
    return request({
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method: 'get'
    })
}

//保存添加的sku的接口: 地址：/admin/product/saveSkuInfo POST 有参
export const reqSaveSkuInfo = (data)=>{
    return request({
        url:'/admin/product/saveSkuInfo',
        method:'post',
        data
    })
}

//获取sku列表数据的接口：地址：/admin/product/findBySpuId/{spuId} GET 有参
export const reqFindBySppuId = (spuId)=>{
    return request({
        url:`/admin/product/findBySpuId/${spuId}`,
        method:'get'
    })
}