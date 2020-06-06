import '@babel/polyfill'
import './utils/const'
import Vue from 'vue'
import lodash from 'lodash'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/app.scss'
import UseRouter, { router, routes } from './router/'
import UseStore, { store, storeOptions } from './store/'
import HttpInit from './utils/http'
import Layout from './layout'
import Components, { loginComponents } from './components'
import Mixins from './mixins/'
import Directive from './directive'
import regex from './utils/regex'
import dayjs from 'dayjs'
import VueClipboard from 'vue-clipboard2'
// 皮肤
import SkinPretty from './skins/pretty/index'
// 皮肤集合
let skins = [SkinPretty]

Vue.config.productionTip = false

// 附加自定义样式
const appendCustomCss = config => {
  const customCss = config.component.customCss
  if (customCss) {
    var style = document.createElement('style')
    style.type = 'text/css'
    if (style.styleSheet) {
      style.styleSheet.cssText = customCss
    } else {
      // w3c浏览器中只要创建文本节点插入到style元素中就行了
      var textNode = document.createTextNode(customCss)
      style.appendChild(textNode)
    }
    document.head.appendChild(style)
  }
}

/** 注册皮肤 */
const useSkin = skin => {
  // 注册组件
  Vue.component('skin-' + skin.options.code.toLowerCase(), skin.component)
  // 注册状态
  store.registerModule('app/skins/' + skin.options.code, skin.store)
  // 添加到列表
  store.commit('app/skins/registerSkin', skin.options)
}

export default {
  /** 注册皮肤 */
  registerSkin(skin) {
    skins.push(skin)
  },
  /** 设置接口 */
  configApi(config) {
    // 初始化接口信息
    HttpInit(config)
  },
  /**
   * @description 加载皮肤组件
   */
  use: async ({ config, modules, actions }) => {
    // 设置标题
    document.title = config.system.title

    // 将lodash添加到Vue的实例属性
    Vue.prototype.$_ = lodash

    // 日期格式化插件
    Vue.prototype.$dayjs = dayjs

    // 全局混入
    Mixins.global(Vue)

    // 加载饿了么框架
    Vue.use(ElementUI)

    // 复制到粘贴板组件
    Vue.use(VueClipboard)

    // 加载自定义组件
    Vue.use(Components)

    // 注册皮肤组件
    Vue.component('nm-skins', Layout)

    // 注册指令
    Vue.use(Directive)

    // 全局组件
    let globalComponents = []
    // 自定义工具栏组件
    let customToolbars = []
    // 回调方法
    let callbacks = []
    //页面集合
    let pages = []

    // 加载模块信息
    modules.forEach(m => {
      // 注入路由信息
      if (m.routes) {
        m.routes.forEach(r => {
          routes.push(r)
          pages.push({
            moduleCode: m.module.code,
            name: r.meta.title || '',
            icon: r.meta.icon || '',
            code: r.name.toLowerCase(),
            frameIn: typeof r.meta.frameIn === 'undefined' ? true : r.meta.frameIn,
            cache: typeof r.meta.cache === 'undefined' ? true : r.meta.cache,
            noPermission: typeof r.meta.noPermission === 'undefined' ? false : r.meta.noPermission,
            path: r.path,
            permissions: r.meta.permissions,
            buttons: r.meta.buttons
          })
        })
      }

      // 注入状态信息
      if (m.store) {
        storeOptions.modules.module.modules[m.module.code] = m.store
      }

      // 注入回调方法
      if (m.callback) {
        callbacks.push(m.callback)
      }

      // 添加全局组件
      if (m.components) {
        m.components.forEach(c => {
          globalComponents.push(c)

          // 判断是否是登录组件
          if (c.name.startsWith('nm-login-')) {
            loginComponents.push(c.name.replace('nm-login-', ''))
          }
          // 判断是否是登录组件
          if (c.name.startsWith('nm-toolbar-')) {
            customToolbars.push(c.name.replace('nm-toolbar-', ''))
          }
        })
      }
    })

    // 保存登录页组件
    config.component.login.pageTypeOptions = loginComponents

    // 系统属性
    let system = {
      modules: modules.map(m => m.module),
      customToolbars: customToolbars,
      globalComponents: globalComponents.map(m => m.name),
      actions
    }

    // 使用状态
    UseStore()

    // 使用路由
    UseRouter(store, config)

    // 注册皮肤
    skins.map(s => {
      useSkin(s)
    })

    // 加载页面数据
    await store.dispatch('app/config/init', { config, system, pages }, { root: true })

    // 加载本地令牌
    store.commit('app/token/load', null, { root: true })

    // 注册全局组件
    if (globalComponents) {
      globalComponents.forEach(com => {
        Vue.component(com.name, com.component)
      })
    }

    // 创建根实例
    const vm = new Vue({
      router,
      store,
      render: h => h('nm-skins')
    }).$mount('#app')

    // 处理回调
    if (callbacks) {
      callbacks.forEach(cb => {
        cb({ vm, store, router, Vue })
      })
    }

    // 附加自定义样式
    appendCustomCss(config)

    return { router, store, vm }
  }
}

const mixins = Mixins.components

// 导出混入组件、状态实例、路由实例
export { mixins, store, router, regex }
