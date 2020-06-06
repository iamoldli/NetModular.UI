import 'nprogress/nprogress.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import SkinsRoutes from './routes'
import NProgress from 'nprogress'
import token from '../utils/token'

// 路由实例
let router
// 路由集合
let routes = SkinsRoutes

// 错误路由
const errorRoutes = ['error403', 'error404']

Vue.use(VueRouter)

// 进度条初始值
NProgress.configure({ minimum: 0.2 })

/** 初始化路由 */
export default (store, config) => {
  router = new VueRouter({ routes })

  // 路由过滤器
  router.beforeEach((to, from, next) => {
    // 开始进度条
    NProgress.start()

    //如果是框架外的页面，或者不需要权限验证，不走验证逻辑
    if (to.meta && (to.meta.frameIn === false || to.meta.noPermission)) {
      next()
      // 关闭进度条
      NProgress.done()
      return
    }

    // 默认页
    const homeUrl = config.component.tabnav.homeUrl
    // 如果访问的是 / 或者 /default，则跳转到首页
    if (homeUrl && (to.path === '/' || to.path === '/default')) {
      if (homeUrl.startsWith('http://') || homeUrl.startsWith('https://')) {
        next({ name: 'iframe', params: { url: homeUrl, tn_: '首页' } })
      } else {
        next(homeUrl)
      }

      // 关闭进度条
      NProgress.done()
      return
    }

    // 验证是否已登录，根据本地是否存在token判断
    const _token = token.get()
    if (!_token && to.name !== 'login') {
      next({ name: 'login', query: { redirect: to.fullPath } })
    } else {
      if (to.name === 'login') {
        next()
        // 关闭进度条
        NProgress.done()
      } else {
        // 加载账户信息，内部会做是否已加载判断
        store
          .dispatch('app/account/init', null, {
            root: true
          })
          .then(() => {
            // 错误页
            if (errorRoutes.includes(to.name)) {
              next()
              // 关闭进度条
              NProgress.done()
            } else if (
              !store.state.app.config.permission.validate ||
              store.getters['app/account/routes'].includes(to.name) ||
              to.path === homeUrl ||
              to.path === '/' ||
              to.path === '/default' ||
              to.name === 'iframe' ||
              to.name === 'userinfo'
            ) {
              // 打开页面
              store.dispatch('app/page/open', to, { root: true }).then(() => {
                next()

                // 关闭进度条
                NProgress.done()
              })
            } else {
              next({ name: 'error403' })

              // 关闭进度条
              NProgress.done()
            }
          })
      }
    }
  })
}

export { router, routes }
