/** 页面信息 */
const page = new function() {
  this.title = '多文件上传'
  this.name = 'components-upload-multiple-index'
  this.path = '/components/upload-multiple/index'
  this.icon = 'card'
  this.group = 1
  this.sort = 9
}()

export const route = {
  page,
  component: () => import('./index')
}

export default page
