<template>
  <!-- 卡片盒子 -->
  <el-card class="box-card">
    <!-- 1.头部插槽 -->
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <!-- 2.内容盒子 -->
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img v-if="avatar" :src="avatar" alt="" class="preview" />
      <img v-else src="@/assets/images/avatar.jpg" alt="" class="preview" />

      <!-- 按钮区域 -->
      <div class="btn-box">
        <!-- 渲染一个被隐藏的文件选择框，只允许选中图片文件 -->
        <input type="file" style="display: none" accept="image/*" ref="iptRef" @change="onFileChange" />
        <el-button type="primary" icon="el-icon-plus" @click="$refs.iptRef.click()">选择图片</el-button>
        <el-button :disabled="!avatar" type="success" icon="el-icon-upload" @click="uploadAvatar">上传头像
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>

import { editUserAvatar } from '@/api/user'

export default {
  name: 'UserAvatar',
  data () {
    return {
      // 用户头像  base64字符串
      avatar: ''
    }
  },
  methods: {
    // 1.头像预览
    onFileChange (e) {
      // (1)获取用户选择的文件
      const file = e.target.files[0]
      // (2)使用FileReader对象来读取文件base64格式
      const fr = new FileReader()
      fr.readAsDataURL(file)// 异步读取文件信息
      // (3)获取文件base64格式
      fr.onload = e => {
        console.log(e)
        console.log(fr.result)// base64格式字符串
        // (4)设置img的src为base64字符串 (src属性既可以是url,也可以是base64)
        this.avatar = fr.result
      }
    },
    // 2.头像提交
    async uploadAvatar () {
      // (2)发送ajax
      await editUserAvatar({ avatar: this.avatar })
      // (3)提示 + 更新vuex数据
      this.$message.success('更新头像成功')
      this.$store.dispatch('user/user')
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
  width: 350px;
  height: 350px;
}
</style>
