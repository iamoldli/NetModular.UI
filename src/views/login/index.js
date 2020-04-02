import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('app/system', ['login']),
    ...mapActions('app/token', { initToken: s => s.init })
  },
  created() {
    this.login({ userName: 'admin', password: 'admin' }).then(data => {
      // 初始化令牌
      this.$store.commit('app/token/init', data)

      // 跳转
      let redirect = this.$route.query.redirect
      if (!redirect || redirect === '') {
        redirect = '/'
      }

      this.$router.push({
        path: redirect
      })
    })
  }
}
