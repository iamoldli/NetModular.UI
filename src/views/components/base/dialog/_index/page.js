/** 页面信息 */
const page = new (function() {
  this.title = '对话框'
  this.name = 'components-dialog-index'
  this.path = '/components/dialog/index'
  this.icon = 'dialog'
  this.group = 0
  this.sort = 10
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
