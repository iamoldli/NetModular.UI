/** 页面信息 */
const page = new (function() {
  this.title = '敏捷列表页'
  this.name = 'components-list-demo4'
  this.path = '/components/list/demo4'
  this.icon = 'develop'
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
