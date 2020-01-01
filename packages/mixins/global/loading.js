export default {
  methods: {
    _openLoading(msg) {
      window.$loading = this.$loading({
        lock: true,
        text: msg || '正在努力加载...',
        background: 'rgba(255, 255, 255, 0.6)',
        spinner: 'el-icon-loading'
      })
    },
    _closeLoading() {
      window.$loading.close()
    }
  }
}
