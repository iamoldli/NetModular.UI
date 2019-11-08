/** 页面信息 */
const page = new (function() {
  this.title = '列表页'
  this.name = 'components-list-index'
  this.path = '/components/list/index'
  this.icon = 'card'
  this.group = 2
  this.sort = 2
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
