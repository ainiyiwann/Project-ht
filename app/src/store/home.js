import mockRequest from '@/utils/mockRequest'
export default{
    actions:{
        //发请求获取首页的mock数据
        async getData(context){
            let result = await mockRequest.get('/home/list')
            if(result.code == 20000){
                context.commit('GETDATA',result.data)
            }
        }
    },
    mutations:{
        GETDATA(state,value){
            state.list = value
        }
    },
    state:{
        list:{}
    }
}