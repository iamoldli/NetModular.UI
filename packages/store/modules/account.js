import db from '../../utils/db'

// 解析路由菜单和面包屑信息
let routeMenus = new Map()
const resolveRouteMenus = (menu, rootId, bc) => {
  let bc_ = Object.assign([], bc)
  if (menu.type === 1) {
    bc_.push({
      title: menu.name,
      route: ''
    })
    menu.rootId = rootId
    routeMenus.set(menu.routeName, { menu, breadcrumb: bc_ })
  } else if (menu.type === 0) {
    bc_.push({
      title: menu.name,
      route: ''
    })
    menu.children.map(m => {
      resolveRouteMenus(m, rootId, bc_)
    })
  }
}

export default {
  namespaced: true,
  state: {
    /** 账户编号 */
    id: '',
    /** 账户类型 */
    type: 0,
    /** 用户名 */
    name: '',
    /** 菜单列表 */
    menus: [],
    /** 权限列表 */
    permissions: [],
    /** 按钮列表 */
    buttons: [],
    /** 皮肤设置 */
    skin: {
      /** 名称 */
      name: 'pretty',
      /** 主题 */
      theme: '',
      /** 字号 medium/small/mini */
      fontSize: ''
    },
    /** 路由菜单集合 */
    routeMenus: null
  },
  getters: {
    // 当前账户拥有菜单对应的路由列表
    routes: state => {
      let list = []
      if (state.routeMenus) {
        state.routeMenus.forEach((value, key) => {
          list.push(key)
        })
      }
      return list
    }
  },
  actions: {
    /**
     * @description 初始化
     */
    async init({ state, rootState, commit, dispatch }) {
      if (state.id) return

      try {
        let authInfo = await rootState.app.system.actions.getAuthInfo()

        // 设置皮肤
        dispatch('app/skins/init', authInfo.skin, { root: true })

        // 初始化
        commit('init', authInfo)

        // 初始化路由菜单数组
        dispatch('initRouteMenus', authInfo)

        const accountId = await dispatch('cacheGet')

        // 如果账户变了，则需要清除原有的一些数据
        if (authInfo.id !== accountId) {
          dispatch('app/page/reset', null, { root: true })
        }

        dispatch('cacheSet')
      } catch (error) {
        console.log(error)
        //如果请求失败则退出
        dispatch('app/system/logout', null, { root: true })
      }
    },
    /**
     * @description 退出
     */
    logout({ commit }) {
      commit('reset')
    },
    cacheGet() {
      return db.get('accountId')
    },
    cacheSet({ state }) {
      db.set('accountId', state.id)
    },
    /** 初始化路由菜单数组 */
    initRouteMenus({ commit }, account) {
      account.menus.map(m => {
        resolveRouteMenus(m, m.id)
      })
      commit('initRouteMenus', routeMenus)
    },
    /** 是否拥有指定按钮权限 */
    hasButton({ state }, button) {
      if (!button || !button.code) return true
      const b = !state.buttons.every(c => c !== button.code.toLowerCase())
      return b
    }
  },
  mutations: {
    init(state, account) {
      // 把按钮编码转小写
      if (account.hasButton) account.buttons = account.buttons.map(b => b.toLowerCase())

      Object.assign(state, account)
    },
    initRouteMenus(state, routeMenus) {
      state.routeMenus = routeMenus
    },
    reset(state) {
      state.id = ''
      state.name = ''
    }
  }
}
