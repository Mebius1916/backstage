<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本资料</span>
    </div>
    <!-- 表单 -->
    <el-form label-position="left" label-width="80px" :model="userForm" :rules="userFormRules"
    ref="userFormRef"
    >
      <el-form-item label="登录名称">
        <el-input disabled v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="userForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit">提交修改</el-button>
        <el-button type="info" @click="doReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>

import { editUserInfo } from '@/api/user'
export default {
  name: 'UserInfo',
  data () {
    return {
      /* 不能直接绑定vuex数据, 而应该把vuex中的数据拷贝一份出来 */
      userForm: { ...this.$store.state.user.userInfo },
      userFormRules: {
        nickname: [
          { required: true, message: '请填写昵称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '昵称必须是1-10非空字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
          { type: 'email', message: '请填写正确的邮箱格式-10非空字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async doSubmit () {
      // (1)判断表单是否校验通过
      await this.$refs.userFormRef.validate()
      // (2)发送ajax
      await editUserInfo(this.userForm)
      // (3)提示 + 调用vuex的actions更新用户信息
      this.$message.success('更新成功')
      this.$store.dispatch('user/user')
    },
    doReset () {
      // 重置不是清空 ： 重置是把表单恢复到初始状态
      this.$refs.userFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
