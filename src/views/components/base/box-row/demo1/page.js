/** 页面信息 */
const page = new (function() {
  this.title = '示例代码'
  this.name = 'components-box-row-demo1'
  this.path = '/components/box-row/demo1'
  this.icon = 'develop'
  this.sort = 3
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
