import logo from '../../packages/assets/logo.png'
import accountApi from './account'
const get = () => {
  return {
    /** 标题 */
    title: '通用后台管理系统',
    /** logo */
    logo,
    /** 默认页 */
    home: '/home',
    permissionValidate: false,
    loginOptions: {
      type: 'default'
    },
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
