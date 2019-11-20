/** 页面信息 */
const page = new (function() {
  this.title = '小盒子'
  this.name = 'components-box-small-index'
  this.path = '/components/box-small/index'
  this.icon = 'card'
  this.group = 0
  this.sort = 2
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
