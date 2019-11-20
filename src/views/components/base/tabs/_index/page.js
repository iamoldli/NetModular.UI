/** 页面信息 */
const page = new (function() {
  this.title = '标签页'
  this.name = 'components-tabs-index'
  this.path = '/components/tabs/index'
  this.icon = 'card'
  this.group = 0
  this.sort = 11
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
