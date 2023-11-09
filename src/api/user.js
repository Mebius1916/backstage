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

// 4.用户侧边栏信息
export const getMenuList = () => {
  return instance.request('/my/menus')
}

// 5.更新基本资料
export const editUserInfo = data => {
  return instance.request('/my/userinfo', 'put', data)
}

// 6.更新用户密码
export const editUserPwd = data => {
  return instance.request('/my/updatepwd', 'patch', data)
}

// 7.更新用户头像
export const editUserAvatar = data => {
  return instance.request('/my/update/avatar', 'patch', data)
}
