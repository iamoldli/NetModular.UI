import accountApi from './account'
const get = () => {
  return {
    config: {
      base: {
        title: '前端说明文档',
        logo: '',
        home: '/home',
        userInfoPage: '',
        copyright: '版权所有：尼古拉斯·老李 | 用代码改变世界 | Powered by .NET Core 3.0.0 on Linux'
      },
      login: {
        type: 'auto'
      },
      component: {
        customCss: ''
      }
    },
    actions: {
      login: accountApi.login,
      getVerifyCode() {
        return new Promise(resolve => {
          resolve()
        })
      },
      // 修改密码
      updatePassword() {
        return new Promise(resolve => {
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
