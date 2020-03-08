import _ from 'lodash'
import token from '../../utils/token'
export default {
  namespaced: true,
  state: {
    /************************************************************/
    /** 可在管理平台配置的属性 */
    /************************************************************/
    /**基础配置 */
    config: {
      base: {
        /** 标题 */
        title: '',
        /** logo */
        logo: '',
        /** logo完整Url */
        logoUrl: '',
        /** 首页 */
        home: '',
        /** 用户信息页(路由名称) */
        userInfoPage: 'userinfo',
        /** 版权声明 */
        copyright: ''
      },
      /**权限配置 */
      permission: {
        //开启权限验证
        validate: true,
        //开启按钮权限
        button: false
      },
      /**登录设置 */
      login: {
        //登录页类型
        type: null,
        //是否启用验证码
        verifyCode: false
      },
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
      /**组件配置 */
      component: {
        //菜单
        menu: {
          //是否只能打开一个菜单
          uniqueOpened: false
        },
        //对话框
        dialog: {
          //点击模态框是否可关闭对话框
          closeOnClickModal: false,
          //对话框默认是否可拖拽
          draggable: false
        },
        //列表页
        list: {
          //序号表头名称
          serialNumberName: null
        },
        //标签页
        tabnav: {
          //是否显示图标
          showIcon: true,
          //最大页面数量
          maxOpenCount: 20
        },
        //自定义样式
        customCss: null
      }
    },
    /************************************************************/
    /** 需要在代码中设置的属性 */
    /************************************************************/
    /**
     * 方法集合
     */
    actions: {
      /**身份认证 */
      auth: {
        /** 登录 */
        login: null,
        /** 获取验证码 */
        getVerifyCode: null,
        /**刷新令牌 */
        refreshToken: null,
        /**获取认证信息 */
        getAuthInfo: null
      },
      /** 修改密码 */
      updatePassword: null,
      /** 保存皮肤配置信息 */
      saveSkin: null
    },
    /************************************************************/
    /** 系统中自动设置的属性 */
    /************************************************************/
    /** 模块列表 */
    modules: [],
    /**自定义工具栏列表 */
    customToolbars: []
  },
  getters: {
    logoUrl: s => {
      return s.config.base.logoUrl || './images/logo.png'
    }
  },
  actions: {
    async init({ commit, dispatch }, { system }) {
      commit('init', { system })
      // 配置页面信息
      await dispatch('app/page/load', null, { root: true })
    },
    login({ state }, params) {
      return state.actions.auth.login(params)
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
      let base = state.config.base
      if (!base.logo) {
        base.logo = './images/logo.png'
      }
      if (!base.userInfoPage) {
        base.userInfoPage = 'userinfo'
      }
    },
    /**设置 */
    setBaseConfig(state, baseConfig) {
      state.config.base = baseConfig
      if (!baseConfig.logo) {
        state.config.base.logo = './images/logo.png'
      }
      if (!baseConfig.userInfoPage) {
        state.config.base.userInfoPage = 'userinfo'
      }
    },
    /**设置权限配置 */
    setPermissionConfig(state, permissionConfig) {
      state.config.permission = permissionConfig
    },
    /**设置登录配置 */
    setLoginConfig(state, loginConfig) {
      state.config.login = loginConfig
    },
    /**设置组件配置 */
    setComponentConfig(state, componentConfig) {
      state.config.component = componentConfig
    },
    /**设置工具栏配置 */
    setToolbarConfig(state, toolbarConfig) {
      state.config.toolbar = toolbarConfig
    }
  }
}
