/** 页面信息 */
const page = new (function() {
  this.title = '盒子栅格行'
  this.name = 'components-box-row-index'
  this.path = '/components/box-row/index'
  this.icon = 'card'
  this.group = 0
  this.sort = 3
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
