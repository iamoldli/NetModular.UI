/** 页面信息 */
const page = new (function() {
  this.title = '高级查询'
  this.name = 'components-list-demo2'
  this.path = '/components/list/demo2'
  this.icon = 'develop'
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
