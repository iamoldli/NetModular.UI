import t from '../../utils/token'
export default {
  namespaced: true,
  state: {
    /** 请求令牌 */
    accessToken: '',
    /** 刷新令牌 */
    refreshToken: ''
  },
  mutations: {
    init(state, token) {
      t.set(token)
      Object.assign(state, token)
    },
    load(state) {
      const token = t.get()
      if (token) {
        Object.assign(state, token)
      }
    }
  }
}
