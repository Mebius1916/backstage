<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>重置密码</span>
    </div>
    <!-- 表单 -->
    <el-form label-width="100px" :model="pwdForm" :rules="pwdFormRules"
    ref="pwdFormRef"
    >
      <el-form-item label="原密码" prop="old_pwd" >
        <el-input v-model="pwdForm.old_pwd"  type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd" >
        <el-input v-model="pwdForm.new_pwd"  type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd" >
        <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit">修改密码</el-button>
        <el-button @click="doReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>

import { editUserPwd } from '@/api/user'
export default {
  name: 'UserPwd',
  data () {
    return {
      // 1.表单数据
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      // 2.表单的验证规则对象
      pwdFormRules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15位的非空字符串',
            trigger: 'blur'
          }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15位的非空字符串',
            trigger: 'blur'
          }
        ],
        re_pwd: [
          { required: true, message: '请再次确认新密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15位的非空字符串',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.pwdForm.new_pwd) {
                return callback(new Error('两次新密码不一致！'))
              }
              callback()
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async doSubmit () {
      // (1)判断表单校验是否通过
      await this.$refs.pwdFormRef.validate()
      // (2)发送ajax
      await editUserPwd(this.pwdForm)
      // (3)成功提示
      this.$message.success('修改密码成功,重新登录生效')
    },
    doReset () {
      this.$refs.pwdFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
