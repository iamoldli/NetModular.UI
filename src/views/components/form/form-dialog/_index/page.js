/** 页面信息 */
const page = new (function() {
  this.title = '表单对话框'
  this.name = 'components-form-dialog-index'
  this.path = '/components/form-dialog/index'
  this.icon = 'list'
  this.group = 1
  this.sort = 2
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
