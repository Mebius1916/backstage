<template>
  <div>
    <!-- 1.页面展示区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 1.1 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true">
          <el-form-item label="文章分类">
            <el-select placeholder="请选择分类" size="small" v-model="query.cate_id">
              <el-option v-for="item in catList" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px;">
            <el-select  placeholder="请选择状态" size="small" v-model="query.state">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="doFilter">筛选</el-button>
            <el-button type="info" size="small" @click="doReset">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button type="primary" size="small" class="btn-pub" @click="dialogVisible=true">发表文章</el-button>
      </div>

      <!-- 1.2 文章表格区域 -->
      <el-table :data="artList">
        <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <template v-slot="{row}">
            <span>{{ formatDate(row.pub_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-button type="success">编辑</el-button>
            <el-button type="danger" @click="doDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 1.3 分页区域 -->
      <el-pagination
      background
      :page-size="query.pagesize"
      :page-sizes="[2,5,10,15]"
      :total="total"
      layout="total,sizes,prev,pager,next,jumper"
      @size-change="doSizeChange"
      @current-change="doCurrentChange"
      ></el-pagination>
    </el-card>
    <!-- 2.dialog弹窗是全屏的，所以要放在最外层盒子 -->
    <!-- 2.发表文章对话框 -->
    <el-dialog title="发表文章" :visible.sync="dialogVisible" fullscreen>
      <!-- 对话框内容 -->
      <el-form label-width="100px">
        <!-- 2.1文章标题 -->
        <el-form-item label="文章标题">
          <el-input placeholder="请输入标题" v-model="addForm.title"></el-input>
        </el-form-item>
        <!-- 2.2文章分类 -->
        <el-form-item label="文章分类">
          <el-select v-model="addForm.cate_id" placeholder="请选择分类" style="width: 100%;" value="">
            <el-option v-for="item in catList" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 2.3文章内容 -->
        <el-form-item label="文章内容">
          <quillEditor v-model="addForm.content"></quillEditor>
        </el-form-item>
        <!-- 2.4文章封面 -->
        <el-form-item label="文章封面">
          <!-- 用来显示封面的图片 -->
          <img src="@/assets/images/cover.jpg" alt="" class="cover-img" ref="imgRef"/>
          <br />
          <!-- 文件选择框，默认被隐藏 -->
          <input @change="doChange" type="file" style="display: none;" accept="image/*" ref="iptFile"/>
          <!-- 选择封面的按钮 -->
          <el-button type="text" @click="$refs.iptFile.click()">+ 选择封面</el-button>
        </el-form-item>
        <!-- 2.5底部按钮 -->
        <el-form-item>
          <el-button type="primary" @click="doAdd('已发布')">发布</el-button>
          <el-button type="info" @click="doAdd('草稿')">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
// 导入接口
import { getCatList, addArticle, deleteArticle, getArticleList } from '@/api/article'
// 导入dayjs
import dayjs from 'dayjs'

export default {
  name: 'ArtList',
  components: { quillEditor },
  data () {
    return {
      // 1.对话框显示/隐藏
      dialogVisible: false,
      // 2.文章分类列表
      catList: [],
      // 3.表单数据
      addForm: {
        title: '',
        cate_id: '',
        content: '',
        cover_img: null,
        state: '已发布'
      },
      // 4.查询列表参数
      query: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      // 5.文章列表
      artList: [],
      // 6.文章总数量
      total: 0
    }
  },
  methods: {
    // 1.查询文章列表
    async initArtList () {
      // (1)发送ajax
      const data = await getArticleList(this.query)
      console.log(data)
      // (2)绑定数据
      this.artList = data.data
      this.total = data.total
      // (3)判断页码是否-1
      if (this.query.pagenum > Math.ceil(this.total / this.query.pagesize)) {
        this.query.pagenum--
        this.initArtList()
      }
    },
    // 2.选择图片文件预览
    doChange () {
      // (1)获取用户选择的文件
      const file = this.$refs.iptFile.files[0]
      // (2)将文件转成url
      const url = URL.createObjectURL(file)
      // (3)把url设置给img标签
      this.$refs.imgRef.src = url
      // 把文件绑定到data
      this.addForm.cover_img = file
    },
    // 3.确认新增
    async doAdd (state) {
      // (1)绑定数据
      this.addForm.state = state
      // (2)有文件的数据需要转成FormData对象
      const fd = new FormData()
      // 把addForm里面的数据添加到fd中
      Object.keys(this.addForm).forEach(item => {
        fd.append(item, this.addForm[item])
      })
      // (3)发送ajax请求
      await addArticle(fd)
      // (3)弹窗消失+提示+刷新列表
      this.$message.success('新增文章成功')
      this.dialogVisible = false
      this.initArtList()
    },
    // 4.每页数量变化
    doSizeChange (size) {
      // (1)绑定数据
      this.query.pagesize = size
      // (2)刷新列表
      this.initArtList()
    },
    // 5.页码变化
    doCurrentChange (page) {
      // (1)绑定数据
      this.query.pagenum = page
      // (2)刷新列表
      this.initArtList()
    },
    // 6.点击筛选
    doFilter () {
      // (1)页码改为1
      this.query.pagenum = 1
      // (2)刷新列表
      this.initArtList()
    },
    // 7.重置
    doReset () {
      // (1)query对象恢复默认
      this.query = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      }
      // (2)刷新列表
      this.initArtList()
    },
    // 8.转换日期格式
    formatDate (date) {
      return dayjs(date).format('YYYY-MM-DD  HH:mm:ss')
    },
    // 9.点击删除
    async doDelete (id) {
      // (1)发送ajax
      await deleteArticle({ id })
      // (2)提示+刷新列表
      this.$message.success('删除成功')
      this.initArtList()
    }
  },
  async created () {
    // (1)发送ajax
    const data = await getCatList()
    console.log(data)
    // (2)绑定数据
    this.catList = data.data
    // (3)刷新列表
    this.initArtList()
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}

/deep/ .ql-editor {
  min-height: 300px;
}

// 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}

.el-pagination {
  margin-top: 15px;
}

.title {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #000;
  margin: 0 0 10px 0;
}

.info {
  font-size: 12px;
  span {
    margin-right: 20px;
  }
}

// 修改 dialog 内部元素的样式，需要添加样式穿透
/deep/ .detail-box {
  img {
    width: 500px;
  }
}
</style>
