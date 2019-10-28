import _ from 'lodash'
import token from '../../utils/token'
export default {
  namespaced: true,
  state: {
    /************************************************************/
    /** 可在管理平台配置的属性 */
    /************************************************************/
    /** 标题 */
    title: '',
    /** logo */
    logo: '',
    /** 首页 */
    home: '',
    /** 工具栏 */
    toolbar: {
      // 全屏
      fullscreen: true,
      // 皮肤切换
      skin: true,
      // 退出
      logout: true,
      // 用户信息
      userInfo: true
    },
    /**
     * 是否启用按钮权限
     */
    buttonPermission: true,
    /** 是否启用权限验证功能 */
    permissionValidate: true,
    /** 菜单只能打开一个 */
    menuUniqueOpened: true,
    /** 用户信息页(路由名称) */
    userInfoPage: 'userinfo',
    /** 设置对话框是否可以点击模态框关闭 */
    dialogCloseOnClickModal: false,
    // 登录配置
    loginOptions: {
      // 登录页类型
      type: 'default',
      // 是否启用验证码
      verifyCode: false,
      /** 登录账户类型列表
      * [
          { label: '管理员', value: 0 },
          { label: '企业', value: 2 },
          { label: '员工', value: 1 }
         ]
      */
      accountTypes: null
    },
    /************************************************************/
    /** 需要在代码中设置的属性 */
    /************************************************************/
    /**
     * 方法集合
     */
    actions: {
      /** 登录 */
      login: null,
      /** 获取验证码 */
      getVerifyCode: null,
      /** 修改密码 */
      updatePassword: null,
      /** 查询登录信息 */
      getLoginInfo: null,
      /** 保存皮肤配置信息 */
      saveSkin: null
    },
    /************************************************************/
    /** 系统中自动设置的属性 */
    /************************************************************/
    /** 模块列表 */
    modules: []
  },
  actions: {
    async init({ commit, dispatch }, { system }) {
      commit('init', { system })
      // 配置页面信息
      await dispatch('app/page/load', null, { root: true })
    },
    async login({ state }, params) {
      var data = await state.actions.login(params)
      if (data) {
        token.set(data)
      }
      return data
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
    init(state, { system }) {
      _.merge(state, system)
      state.logo = state.logoUrl
      if (!state.logo) {
        state.logo = './images/logo.png'
      }
      if (!state.userInfoPage) {
        state.userInfoPage = 'userinfo'
      }
    }
  }
}
