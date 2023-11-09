/* vuex优点: (1)所有组件共享数据(传值方便)   (2)数据存储在内存:读取效率高
   vuex弊端: 页面一刷新,vuex数据就会丢失
   解决方案 : 把vuex数据存储在本地localStorage （有就从内存读取,没有就从localStorage）
    安利一个vuex超级好用的持久化插件(企业级解决方案) : vuex-persistedstate
      注意:一定要在vuex的index.js里面配置(全局模块)
*/

import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'

// 导入插件
import createPersistedState from 'vuex-plugin-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    key: 'big-news', // localStorage的key
    paths: ['user']// 要持久化的模块名
  })],
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
