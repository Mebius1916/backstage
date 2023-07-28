import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  /* 重定向 */
  { path: '/', redirect: '/layout/home' },
  { path: '/register', component: () => import('@/views/Login/regiser.vue') },
  { path: '/login', component: () => import('@/views/Login/index.vue') },
  {
    path: '/layout',
    component: () => import('@/views/Layout/index.vue'),
    children: [
      { path: 'home', component: () => import('@/views/Home/index.vue') },
      { path: 'user', component: () => import('@/views/User/index.vue') },
      { path: 'avatar', component: () => import('@/views/User/avatar.vue') },
      { path: 'pwd', component: () => import('@/views/User/pwd.vue') },
      { path: 'category', component: () => import('@/views/Article/category.vue') },
      { path: 'article', component: () => import('@/views/Article/index.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

/* 路由导航守卫:权限管理(登录权限/角色权限/vip权限) */
const whiteList = ['/login', '/register']
router.beforeEach((to, from, next) => {
  // 可以跳转权限: (1)白名单页面 login/register (2)有token
  if (whiteList.includes(to.path) || store.state.user.token) {
    next()
  } else {
    next('/login')
  }
})
export default router
