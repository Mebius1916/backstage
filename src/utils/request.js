// 安装+导入axios
import axios from 'axios'

import { Message } from 'element-ui'

import store from '@/store'
import router from '@/router'

// 1.创建axios实例
/* 为什么? : 开发中一个项目可能不止一个基地址。不同的基地址会使用不同的axios实例来发送请求 */
const instance = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net',
  timeout: 10000
})
// 2.axios拦截器
// 2.1 请求拦截器
instance.interceptors.request.use(config => {
  // 发送请求之前做些什么
  if (store.state.user.token) {
    config.headers.Authorization = store.state.user.token
  }
  // config:请求报文
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 2.2 响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  // 判断逻辑码是否错误 0:成功  不是0:错误
  // 此时响应头状态码还是200,所以会进入响应成功拦截器
  if (response.data.code !== 0) {
    // 错误提示
    Message.error(response.data.message)
    // 返回一个rejected状态的promise, 让浏览器爆红。避免执行await下一步业务
    return Promise.reject(response.data.message)
  }
  // response:响应报文
  return response.data
}, error => {
  /* 状态码错误: 401跳转登录页 */
  if (error.response.status === 401) {
    Message.error('token错误请重新登录')
    // 用户个人信息清空
    store.state.user.userInfo = {}
    router.push('/login')
  }
  // 对响应错误做些什么
  return Promise.reject(error)
})

// 3.封装一个request方法
/* 为什么? get和post传参方式是不同的。在网络层不需要区分,直接发三要素。在request方法中来区分不同的请求方法对应不同的参数 */
instance.request = (url, method = 'get', data) => {
  const config = {
    url,
    method
  }
  // 区分get和post请求
  config[method === 'get' ? 'params' : 'data'] = data

  return instance(config)
}

// 导出实例
export default instance
