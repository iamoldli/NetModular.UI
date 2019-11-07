import accountApi from './account'
const get = () => {
  return {
    /** 标题 */
    title: '通用后台管理系统',
    /** logo */
    logo: './images/logo.png',
    /** 默认页 */
    home: '/home',
    permissionValidate: false,
    loginOptions: {
      type: 'default'
    },
    copyright:
      '版权所有：尼古拉斯·老李 | 用代码改变世界 | Powered by .NET Core 3.0.0 on Linux',
    actions: {
      login: accountApi.login,
      getVerifyCode() {
        return new Promise((resolve, reject) => {
          resolve()
        })
      },
      // 修改密码
      updatePassword() {
        return new Promise((resolve, reject) => {
          resolve()
        })
      },
      getLoginInfo: accountApi.get,
      saveSkin: accountApi.skinUpdate
    }
  }
}

export default {
  get
}
