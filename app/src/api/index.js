//将product里面的接口继续统一暴漏
import * as trademark from '@/api/product/tradeMark'
import * as attr from '@/api/product/attr'
import * as spu from '@/api/product/spu'
import * as sku from '@/api/product/sku'

//对外暴漏
export default{
    trademark,
    attr,
    spu,
    sku
}