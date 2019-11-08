/** 页面信息 */
const page = new (function() {
  this.title = '页表单'
  this.name = 'components-form-page-index'
  this.path = '/components/form-page/index'
  this.icon = 'list'
  this.group = 1
  this.sort = 3
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
