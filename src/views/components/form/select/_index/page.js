/** 页面信息 */
const page = new (function() {
  this.title = '下拉框'
  this.name = 'components-select-index'
  this.path = '/components/select/index'
  this.icon = 'card'
  this.group = 1
  this.sort = 6
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
