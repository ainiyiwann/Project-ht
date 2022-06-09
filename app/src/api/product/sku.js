import request from '@/utils/request'
//获取SKU模块数据

//获取sku列表的接口：地址：/admin/product/list/{page}/{limit} GET 有参
export const reqSkuList = (page,limit)=>{
    return request({
        url:`/admin/product/list/${page}/${limit}`,
        method:'get'
    })
}