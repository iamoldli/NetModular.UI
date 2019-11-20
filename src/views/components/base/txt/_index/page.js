/** 页面信息 */
const page = new (function() {
  this.title = '简单文本'
  this.name = 'components-txt-index'
  this.path = '/components/txt/index'
  this.icon = 'card'
  this.group = 0
  this.sort = 12
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
