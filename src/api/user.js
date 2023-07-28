import instance from '@/utils/request'

// 1.用户注册
export const userRegister = data => {
  return instance.request('/api/reg', 'post', data)
}

// 2.用户登录
export const userLogin = data => {
  return instance.request('/api/login', 'post', data)
}

// 3.用户信息
export const getUserInfo = () => {
  return instance.request('/my/userinfo')
}
