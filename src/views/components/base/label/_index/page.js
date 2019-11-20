/** 页面信息 */
const page = new (function() {
  this.title = '标签'
  this.name = 'components-label-index'
  this.path = '/components/label/index'
  this.icon = 'card'
  this.group = 0
  this.sort = 12
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
