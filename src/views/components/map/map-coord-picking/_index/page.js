/** 页面信息 */
const page = new (function() {
  this.title = '坐标拾取'
  this.name = 'components-map-picking-coord-index'
  this.path = '/components/map-picking-coord/index'
  this.icon = 'chart-map'
  this.group = 3
  this.sort = 1
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
