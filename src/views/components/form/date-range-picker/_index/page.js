/** 页面信息 */
const page = new (function() {
  this.title = '日期段选择'
  this.name = 'components-date-range-picker-index'
  this.path = '/components/date-range-picker/index'
  this.icon = 'list'
  this.group = 1
  this.sort = 10
})()

export const route = {
  page,
  component: () => import('./index')
}

export default page
