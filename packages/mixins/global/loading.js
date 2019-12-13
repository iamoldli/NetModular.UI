export default {
  data() {
    return {
      __loading: null
    }
  },
  methods: {
    _openLoading(msg) {
      this.__loading = this.$loading({
        lock: true,
        text: msg || '正在努力加载...',
        background: 'rgba(255, 255, 255, 0.6)',
        spinner: 'el-icon-loading'
      })
    },
    _closeLoading() {
      this.__loading.close()
    }
  }
}
