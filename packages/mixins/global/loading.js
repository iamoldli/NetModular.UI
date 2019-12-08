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
        text: msg || '正在加载数据，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.6)'
      })
    },
    _closeLoading() {
      this.__loading.close()
    }
  }
}
