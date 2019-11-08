/** 页面信息 */
const page = new (function() {
  this.title = '混入示例'
  this.name = 'components-select-demo2'
  this.path = '/components/select/demo2'
  this.icon = 'develop'
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
