import request from '@/utils/request'
//获取SKU模块数据

//获取sku列表的接口：地址：/admin/product/list/{page}/{limit} GET 有参
export const reqSkuList = (page,limit)=>{
    return request({
        url:`/admin/product/list/${page}/${limit}`,
        method:'get'
    })
}

//产品上架的接口：地址：/admin/product/onSale/{skuId} GET 有参
export const reqOnSale = (skuId)=>{
    return request({
        url:`/admin/product/onSale/${skuId}`,
        method:'get'
    })
}

//产品的下架接口：地址：/admin/product/cancelSale/{skuId} GET 有参
export const reqCancelSale = (skuId)=>{
    return request({
        url:`/admin/product/cancelSale/${skuId}`,
        method:'get'
    })
}

//获取sku详情的接口：地址：/admin/product/getSkuById/{skuId} GET 有参
export const reqGetSkuById = (skuId)=>{
    return request({
        url:`/admin/product/getSkuById/${skuId}`,
        method:'get'
    })
}

//删除sku的接口：地址：/admin/product/deleteSku/{skuId} DELETE 有参
export const reqDeleteSku = (skuId)=>{
    return request({
        url:`/admin/product/deleteSku/${skuId}`,
        method:'delete'
    })
}