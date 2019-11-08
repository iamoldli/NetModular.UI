/** 页面信息 */
const page = new (function() {
  this.title = '详情页'
  this.name = 'components-details-index'
  this.path = '/components/details/index'
  this.icon = 'detail'
  this.group = 2
  this.sort = 1
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
