import request from '@/utils/request'
//获取品牌管理数据的模块

//获取品牌列表的接口 地址：/admin/product/baseTrademark/{page}/{limit} GET 有参
export const reqTradeMarkList = (page,limit)=>{
    return request({
        url:`/admin/product/baseTrademark/${page}/${limit}`,
        method:'get'
    })
}
