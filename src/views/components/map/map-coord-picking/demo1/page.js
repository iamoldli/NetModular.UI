/** 页面信息 */
const page = new (function() {
  this.title = '坐标拾取示例'
  this.name = 'components-map-coord-picking-demo1'
  this.path = '/components/map-coord-picking/demo1'
  this.icon = 'develop'
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
