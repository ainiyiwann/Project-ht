import request from '@/utils/request'
//平台属性管理请求的模块

//获取一级分类的接口：地址：/admin/product/getCategory1 GET 无参
export const  reqCategory1List = ()=>{
    return request({
        url:`/admin/product/getCategory1`,
        method:'get'
    })
}

//获取二级分类的接口：地址：/admin/product/getCategory2/{category1Id} GET 有参
export const  reqCategory2List = (category1Id)=>{
    return request({
        url:`/admin/product/getCategory2/${category1Id}`,
        method:'get'
    })
}

//获取三级分类的接口：地址：/admin/product/getCategory3/{category2Id} GET 有参
export const  reqCategory3List = (category2Id)=>{
    return request({
        url:`/admin/product/getCategory3/${category2Id}`,
        method:'get'
    })
}

//获取平台属性的数据的接口：地址：/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} GET 有参
export const reqAttrList = (category1Id,category2Id,category3Id)=>{
    return request({
        url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method:'get'
    })
}

//添加属性、属性值和修改属性的接口：地址：/admin/product/saveAttrInfo POST 有参 
/*要传的参数
{
    "attrName": "string",    属性名
    "attrValueList": [       属性名对应的所有属性值
      {
        "attrId": 0,          属性的id
        "valueName": "string" 属性值
      }
    ],
    "categoryId": 0,       category3Id
    "categoryLevel": 3,
  }
  */
export const reqAddOrUpdateAttr = (data)=>{
    return request({
        url:'/admin/product/saveAttrInfo',
        method:'post',
        data
    })
}