/** 页面信息 */
const page = new (function() {
  this.title = '列表框'
  this.name = 'components-listbox-index'
  this.path = '/components/listbox/index'
  this.icon = 'card'
  this.group = 2
  this.sort = 6
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
