<template>
  <!-- 版心  -->
  <el-container class="main-container">
    <!-- 1.左侧菜单栏 -->
    <el-aside width="200px">
      <!-- 1.1 个人信息 -->
      <div class="user-box">
        <img v-if="userInfo.user_pic" :src="userInfo.user_pic" alt="">
        <img v-else src="@/assets/logo.png" alt="">
        <span>{{ userInfo.nickname || userInfo.username }}</span>
      </div>
      <!-- 1.2 el-menu侧边栏
      el-menu : 侧边栏父元素
      el-submenu : 有下拉导航
      el-menu-item : 没有下拉的导航
      -->
      <el-menu
      background-color="#23262e"
      text-color="#fff"
      active-text-color="#f00"
      unique-opened
      :default-active="$route.path"
      router
      >
        <!-- 因为template不会被真正的渲染,所以不能设置key值。 它的key值要给里面的根元素设置 -->
        <template v-for="item in menus">
          <el-submenu v-if="item.children" :index="item.indexPath" :key="item.indexPath">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <!-- 继续遍历children -->
            <el-menu-item v-for="ele in item.children" :index="ele.indexPath" :key="ele.indexPath">
              <i :class="ele.icon"></i>
              <span>{{ ele.title }}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.indexPath" :key="item.indexPath">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <!-- 2.右侧内容 -->
    <el-container>
      <!-- 2.1 右侧顶部栏 -->
  <el-header>
    <!-- 右侧logo -->
    <div class="logo"></div>
    <!-- 右侧菜单 -->
    <el-menu
      class="el-menu-top"
      mode="horizontal"
      text-color="#5c5c5c"
      active-text-color="#409EFF"
    >
      <el-submenu index="1">
        <template slot="title">
          <!-- 头像 -->
          <img v-if="userInfo.user_pic" :src="userInfo.user_pic" alt="" class="avatar" />
          <img v-else src="@/assets/logo.png" alt="" class="avatar" />
          <span>个人中心</span>
        </template>
        <el-menu-item @click="$router.push('/user-info')" index="/user-info"
          ><i  class="el-icon-s-operation"></i>基本资料</el-menu-item
        >
        <el-menu-item @click="$router.push('/user-avatar')" index="/user-avatar"
          ><i  class="el-icon-camera"></i>更换头像</el-menu-item
        >
        <el-menu-item @click="$router.push('/user-pwd')" index="/user-pwd"
          ><i  class="el-icon-key"></i>重置密码</el-menu-item
        >
      </el-submenu>
      <el-menu-item index="2" @click="doLogout"
        ><i class="el-icon-switch-button" ></i>退出</el-menu-item
      >
    </el-menu>
  </el-header>
      <!-- 2.2 右侧内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 2.3 右侧底部 -->
      <el-footer>© www.itheima.com - 黑马程序员</el-footer>
    </el-container>
  </el-container>

</template>

<script>
import { getMenuList } from '@/api/user'
export default {
  name: 'layout-page',
  data () {
    return {
      menus: [] // 侧边栏数组
    }
  },
  async created () {
    // (1)发送ajax获取侧边栏数据
    const data = await getMenuList()
    console.log(data)
    // (2)绑定数据
    this.menus = data.data
  },
  methods: {
    async doLogout () {
      // (1)弹出一个确认框
      await this.$confirm('您确定要退出吗?', '友情提示')
      // (2)清空token + 个人信息
      this.$store.commit('user/updateToken', '')
      this.$store.commit('user/updateUserInfo', {})
      // (3)跳转登录页
      this.$router.push('/login')
    }
  },
  computed: {
    // 从vuex中读取用户信息
    userInfo () {
      return this.$store.state.user.userInfo
    }
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}

//右侧样式
.el-header {
  .logo {
    height: 45px;
    width: 150px;
    padding: 8px 0px;
    user-select: none;
    text-align: center;
    background: url('@/assets/images/logo.png')
      center center / 100px no-repeat rgb(85, 85, 85);
    border-radius: 3px;
    margin-left: 15px;
  }
}

// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}

// 侧边栏菜单的样式
.el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}
</style>
