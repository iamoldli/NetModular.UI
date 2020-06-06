import _ from 'lodash'
export default {
  namespaced: true,
  state: {
    system: {
      /** 标题 */
      title: '',
      /** logo */
      logo: '',
      /** 用户信息页(路由名称) */
      userPage: 'userinfo',
      /** 版权声明 */
      copyright: ''
    },
    /**权限配置 */
    permission: {
      //开启权限验证
      validate: false,
      //开启按钮权限
      button: false
    },
    /**组件配置 */
    component: {
      /**登录设置 */
      login: {
        //登录页选项
        pageTypeOptions: [],
        //默认登录账户类型
        defaultAccountType: 0,
        //登录页类型
        pageType: null,
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
        serialNumberName: '#'
      },
      //标签页
      tabnav: {
        //是否启用
        enabled: true,
        //是否显示首页
        showHome: true,
        /** 首页 */
        homeUrl: '',
        //是否显示图标
        showIcon: true,
        //最大页面数量
        maxOpenCount: 20
      },
      //自定义样式
      customCss: null
    }
  },
  getters: {
    logoUrl: s => {
      return s.system.logo || './images/logo.png'
    },
    userPage: s => {
      return s.system.userPage || 'userinfo'
    }
  },
  actions: {
    async init({ commit, dispatch }, { config, system, pages }) {
      commit('init', config)
      // 配置页面信息
      await dispatch('app/system/init', { system, pages }, { root: true })
    }
  },
  mutations: {
    init(state, config) {
      _.merge(state, config)
    }
  }
}
