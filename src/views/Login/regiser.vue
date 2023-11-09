<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form :model="regForm" :rules="regFormRules" ref="regFormRef">
        <el-form-item prop="username">
          <el-input v-model="regForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="regForm.password"  show-password placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="regForm.repassword" show-password placeholder="请再次确认密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-reg" type="primary" @click="doRegister">注册</el-button>
          <el-link @click="$router.push('/login')">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import { userRegister } from '@/api/user'
export default {
  name: 'Register-page',
  data () {
    return {
      // 1.表单数据
      regForm: {
        username: '',
        password: '',
        repassword: ''
      },
      // 2.表单校验规则
      regFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^\w{1,10}$/, message: '用户名必须是1-10位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15位', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15位', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
            // 判断两次密码是否一致
              if (value === this.regForm.password) {
                callback()
              } else {
                callback(new Error('两次密码不一致'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async doRegister () {
      // (1)判断校验是否通过
      await this.$refs.regFormRef.validate()
      // (2)发送ajax请求
      await userRegister(this.regForm)
      // (3)跳转登录页
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url("@/assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;

  .reg-box {
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

  .btn-reg {
    width: 100%;
  }
}
</style>
