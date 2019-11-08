/** 页面信息 */
const page = new (function() {
  this.title = '基础表单'
  this.name = 'components-form-index'
  this.path = '/components/form/index'
  this.icon = 'list'
  this.group = 1
  this.sort = 1
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
