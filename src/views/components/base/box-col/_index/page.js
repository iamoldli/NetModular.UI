/** 页面信息 */
const page = new (function() {
  this.title = '盒子栅格列'
  this.name = 'components-box-col-index'
  this.path = '/components/box-col/index'
  this.icon = 'card'
  this.group = 0
  this.sort = 4
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
