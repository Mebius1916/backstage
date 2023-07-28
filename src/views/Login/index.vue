<template>
  <!-- 注册页面的整体盒子 -->
  <div class="login-container">
    <!-- 注册的盒子 -->
    <div class="login-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"  show-password placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="doLogin">登录</el-button>
          <el-link @click="$router.push('/register')">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login-page',
  data () {
    return {
      // 1.表单数据
      loginForm: {
        username: '',
        password: ''
      },
      // 2.表单校验规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^\w{1,10}$/, message: '用户名必须是1-10位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async doLogin () {
      // (1)判断校验是否通过
      await this.$refs.loginFormRef.validate()
      // (2)发送登录请求
      await this.$store.dispatch('user/login', this.loginForm)
      // (3)请求用户个人信息
      await this.$store.dispatch('user/user')
      // 提示框 + 跳转首页
      this.$message.success('登录成功')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background: url("@/assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;

  .login-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title-box {
      height: 60px;
      background: url("@/assets/images/login_title.png") center no-repeat;
    }
  }

  .el-form {
    padding: 0 25px;
  }

  .btn-login {
    width: 100%;
  }
}
</style>
