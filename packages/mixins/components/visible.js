// 显示隐藏混入
export default {
  computed: {
    visible_: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  props: {
    visible: Boolean
  },
  methods: {
    show() {
      this.visible_ = true
    },
    hide() {
      this.visible_ = false
    }
  }
}
