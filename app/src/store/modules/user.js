//引入登录，退出登录，获取用户信息的接口
import { login, logout, getInfo } from '@/api/user'
//获取token,设置token,删除token
import { getToken, setToken, removeToken } from '@/utils/auth'
//引入重置路由的方法
import { resetRouter, anyRoutes, asyncRoutes, constantRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    //获取token
    token: getToken(),
    //存储用户名
    name: '',
    //存储用户头像
    avatar: '',
    //服务器返回的菜单的信息(不同的登录账户，返回的信息不同)
    routes: [],
    //角色信息
    roles: [],
    //按钮权限的信息
    buttons: [],
    //对比之后(项目中已有的异步路由，与服务器返回的标记对比对比最终要展示的结果)
    resultAsyncRoutes: [],
    //用户最终需要展示的内容
    resultAllRputes:[]
  }
}
const state = getDefaultState()

const mutations = {
  //重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  //存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // //存储用户名
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // //存储用户头像
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  //存储用户信息
  SET_USERINFO: (state, userInfo) => {
    //用户头像
    state.avatar = userInfo.avatar
    //菜单权限标记
    state.routes = userInfo.routes
    //按钮权限的标记
    state.buttons = userInfo.buttons
    //角色
    state.roles = userInfo.roles
  },
  //最终计算处理的异步路由
  SET_RESULTAYCROUTES: (state, resultAsyncRoutes) => {
    state.resultAsyncRoutes = resultAsyncRoutes
    //计算出当前用户需要展示是所有路由
    state.resultAllRputes = constantRoutes.concat(state.resultAsyncRoutes,anyRoutes)
    //给路由器添加新的路由
    router.addRoutes(state.resultAllRputes)
  }
}

//定义一个函数：两个数组进行对比，对比当前用户显示什么路由
const computedAsyncRouters=(asyncRoutes,routes)=>{
  // console.log(asyncRoutes,111)
  // console.log(routes,2222)
  //过滤出当前用户需要展示的异步路由
  return asyncRoutes.filter(item=>{
    //如果routes中有asyncRoutes就执行下一步
    if(routes.indexOf(item.name)!=-1){
      //如果有多级路由(用递归)
      if(item.children && item.children.length){
        //再次进行对比
        item.children = computedAsyncRouters(item.children,routes)
      }
      return true
    }
  })
}

const actions = {
  // 处理登录的业务
  async login({ commit }, userInfo) {
    //用结构赋值赋值出用户名和密码
    const { username, password } = userInfo
    //发请求
    let result = await login({ username: username.trim(), password: password })
    // console.log(result)
    if (result.code == 20000) {
      commit('SET_TOKEN', result.data.token)
      //将数据进行Cookies储存
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      //获取用户信息
      getInfo(state.token).then(response => {
        const { data } = response
        commit('SET_USERINFO', data)
        commit('SET_RESULTAYCROUTES', computedAsyncRouters(asyncRoutes, data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

