/** 页面信息 */
const page = new (function() {
  this.title = '简单列表'
  this.name = 'components-list-demo1'
  this.path = '/components/list/demo1'
  this.icon = 'develop'
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
