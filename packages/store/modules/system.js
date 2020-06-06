import _ from 'lodash'
import token from '../../utils/token'
export default {
  namespaced: true,
  state: {
    /** 模块列表 */
    modules: [],
    /**自定义工具栏列表 */
    customToolbars: [],
    /**全局组件列表 */
    globalComponents: [],
    /**系统的api方法 */
    actions: {
      /** 登录 */
      login: null,
      /** 获取验证码 */
      getVerifyCode: null,
      /**刷新令牌 */
      refreshToken: null,
      /**获取认证信息 */
      getAuthInfo: null,
      /** 修改密码 */
      updatePassword: null,
      /** 保存皮肤配置信息 */
      saveSkin: null
    }
  },
  actions: {
    async init({ commit, dispatch }, { system, pages }) {
      commit('init', system)
      // 配置页面信息
      await dispatch('app/page/load', { pages }, { root: true })
    },
    login({ state }, params) {
      return state.actions.login(params)
    },
    /**
     * @description 退出
     */
    async logout({ dispatch }) {
      // 删除令牌
      token.remove()

      // 账号退出
      dispatch('app/account/logout', null, { root: true })
    }
  },
  mutations: {
    init(state, system) {
      _.merge(state, system)
    }
  }
}
