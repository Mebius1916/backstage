
// 导入接口
import { userLogin, getUserInfo } from '@/api/user'

export default {
  // 命名空间
  namespaced: true,
  // 1.state负责存储数据
  state: {
    token: '',
    userInfo: {}
  },
  // 2.mutaions负责修改数据
  mutations: {
    updateToken (state, payload) {
      state.token = payload
    },
    updateUserInfo (state, payload) {
      state.userInfo = payload
    }
  },
  // 3.actions负责异步操作
  actions: {
    async login (context, payload) {
      // (1)发送ajax
      const data = await userLogin(payload)
      console.log(data)
      // (2)调用commit提交mutations更新
      context.commit('updateToken', data.token)
    },
    async user (context) {
      // (1)发送ajax
      const data = await getUserInfo()
      console.log(data)
      // (2)提交mutations更新
      context.commit('updateUserInfo', data.data)
    }
  }
}
