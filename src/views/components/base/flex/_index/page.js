/** 页面信息 */
const page = new (function() {
  this.title = '弹性布局'
  this.name = 'components-flex-index'
  this.path = '/components/flex/index'
  this.icon = 'card'
  this.group = 0
  this.sort = 13
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
