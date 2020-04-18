import accountApi from './account'
const actions = {
  login: accountApi.login,
  getVerifyCode() {
    return new Promise(resolve => {
      resolve()
    })
  },
  getAuthInfo: accountApi.get,
  // 修改密码
  updatePassword() {
    return new Promise(resolve => {
      resolve()
    })
  },
  saveSkin: accountApi.skinUpdate
}
export default actions
