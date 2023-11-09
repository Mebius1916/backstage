// 导入axios实例
import instance from '@/utils/request'

// 1.获取文章分类
export const getCatList = () => {
  return instance.request('/my/cate/list')
}

// 2.新增文章分类
export const addCategory = data => {
  return instance.request('/my/cate/add', 'post', data)
}

// 3.编辑文章分类
export const editCategory = data => {
  return instance.request('/my/cate/info', 'put', data)
}

// 4.删除文章分类
export const deleteCategory = data => {
  // 如果遇到delete请求,有可能也是在params中传递参数。所以需要单独处理
  return instance.delete('/my/cate/del', { params: data })
}

// 5.新增文章
export const addArticle = data => {
  return instance.request('/my/article/add', 'post', data)
}

// 6.文章列表
export const getArticleList = data => {
  return instance.request('/my/article/list', 'get', data)
}

// 7.删除文章
export const deleteArticle = data => {
  return instance.delete('/my/article/info', { params: data })
}
