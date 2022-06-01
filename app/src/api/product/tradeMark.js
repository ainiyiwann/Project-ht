import request from '@/utils/request'
//获取品牌管理数据的模块

//获取品牌列表的接口 地址：/admin/product/baseTrademark/{page}/{limit} GET 有参
export const reqTradeMarkList = (page,limit)=>{
    return request({
        url:`/admin/product/baseTrademark/${page}/${limit}`,
        method:'get'
    })
}

//处理添加品牌 地址：/admin/product/baseTrademark/save POST 有参 无id
//修改品牌 地址:/admin/product/baseTrademark/update PUT 有参 有id
export const reqAddOrUpdateTradeMark = (tradeMark)=>{
    //如果服务器数据又ID则为修改
    if(tradeMark.id){
        return request({
            url:'/admin/product/baseTrademark/update',
            method:'PUT',
            data:tradeMark
        })
    }else{
        //如果没有id则为添加
        return request({
            url:'/admin/product/baseTrademark/save',
            method:'POST',
            data:tradeMark
        })
    }
}

//请求删除品牌：地址： /admin/product/baseTrademark/remove/{id} DELETE 有参
export const reqDeleteTrademark = (id)=>{
    return request({
        url:`/admin/product/baseTrademark/remove/${id}`,
        method:'DELETE'
    })
}