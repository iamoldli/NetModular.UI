/** 页面信息 */
const page = new (function() {
  this.title = '按钮'
  this.name = 'components-button-index'
  this.path = '/components/button/index'
  this.icon = 'button'
  this.group = 0
  this.sort = 5
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
