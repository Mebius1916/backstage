<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="showDialog('add')">添加分类</el-button>
      </div>
      <el-table :data="catList">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="分类名称" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="success" @click="showDialog('edit', row )">修改</el-button>
            <el-button type="danger" @click="doDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- dialog是全屏的,所以要作为最外层的元素 -->
    <el-dialog
    :title="dialogText.title"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
    >
      <el-form label-position="left" label-width="80px" :model="catForm" :rules="catFormRules"
      ref="catFormRef"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="catForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="catForm.cate_alias"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right">
          <el-button type="info" @click="doReset">取消</el-button>
          <el-button type="primary" @click="doConfirm">{{ dialogText.btn }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import { getCatList, addCategory, editCategory, deleteCategory } from '@/api/article.js'
export default {
  name: 'ArtCate',
  data () {
    return {
      catList: [], // 分类列表
      dialogVisible: false, // 对话框显示/隐藏
      type: 'add', // 操作类型 add新增  edit编辑
      catForm: {
        cate_name: '',
        cate_alias: ''
      },
      catFormRules: {
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          {
            pattern: /^\S{1,10}$/,
            message: '分类名必须是1-10位的非空字符',
            trigger: 'blur'
          }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9_]{1,15}$/,
            message: '分类别名必须是1-15位的字母数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 1.查询分类
    async initList () {
      // (1)发送ajax
      const data = await getCatList()
      // (2)绑定到data
      this.catList = data.data
    },
    // 2.展示对话框
    showDialog (type, row) {
      console.log(type, row)
      // (1)显示对话框
      this.dialogVisible = true
      // (2)修改type
      this.type = type
      // (3)如果是编辑,就需要数据回填(不能直接引用类型赋值,需要拷贝数据)
      if (row) {
        this.catForm = { ...row }
      }
    },
    // 3.隐藏对话框
    handleClose () {
      // (1)隐藏对话框
      this.dialogVisible = false
      // (2)清空表单文本
      this.catForm = {
        cate_name: '',
        cate_alias: ''
      }
    },
    // 4.点击对话框取消
    doReset () {
      this.$refs.catFormRef.resetFields()
    },
    // 5.点击对话框确认
    async doConfirm () {
      // (1)判断校验是否通过
      await this.$refs.catFormRef.validate()
      // 判断是新增还是编辑
      if (this.type === 'add') {
        // (2)发送新增ajax + 提示
        await addCategory(this.catForm)
        this.$message.success('新增分类成功')
      } else {
        // (2)发送新增ajax + 提示
        await editCategory(this.catForm)
        this.$message.success('编辑分类成功')
      }

      // (3)隐藏弹窗 + 刷新列表
      this.dialogVisible = false
      this.initList()
    },
    // 6.点击删除
    async doDelete (id) {
      // (1)发送ajax
      await deleteCategory({ id })
      // (2)提示+刷新列表
      this.$message.success('删除成功')
      this.initList()
    }
  },
  created () {
    // 一进来就要刷新列表
    this.initList()
  },
  computed: {
    dialogText () {
      if (this.type === 'add') {
        return {
          title: '添加分类',
          btn: '新增'
        }
      } else {
        return {
          title: '编辑分类',
          btn: '编辑'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
