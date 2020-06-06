/**
 * 单个页面转为路由信息
 * @param {Object} config 配置信息
 */
const Page2Route = config => {
  const { page, component } = config
  return {
    path: page.path,
    name: page.name.toLowerCase(),
    component: component,
    props: page.props || true,
    meta: {
      title: page.title,
      icon: page.icon,
      frameIn: page.frameIn, //是否框架内
      cache: page.cache, //是否缓存
      noPermission: page.noPermission, //是否不走权限验证
      buttons: page.buttons,
      permissions: page.permissions
    }
  }
}

/**
 * @description 页面数组转为路由数组
 * @param {Object} module 模块信息
 * @param {Object} pages 页面数组
 */
export default pages => {
  let routes = []
  pages.forEach(item => {
    if (item) {
      routes.push(Page2Route(item))
    }
  })
  return routes
}
