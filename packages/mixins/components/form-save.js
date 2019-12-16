import visible from './visible'
export default {
  mixins: [visible],
  data() {
    return {
      // 存储表单数据
      model_: {},
      form: {
        action: null,
        model: {
          id: null
        },
        customResetFunction: null,
        disabled: this.readonly,
        loading: false
      },
      //编辑时，是否总是刷新
      allRefresh: true,
      on: {
        success: this.onSuccess,
        open: this.onOpen
      }
    }
  },
  props: {
    //id不为空，标识编辑或预览，反之为新增
    id: [String, Number],
    /**是否只读 */
    readonly: Boolean
  },
  computed: {
    //是否添加
    isAdd_() {
      return this.id === null || this.id === '' || typeof this.id === 'undefined'
    },
    //是否编辑
    isEdit_() {
      return !this.isAdd_
    }
  },
  methods: {
    /**设置图标 */
    setIcon() {
      if (this.isAdd_) {
        this.form.icon = 'add'
      } else {
        this.form.icon = this.readonly ? 'edit' : 'preview'
      }
    },
    //获取编辑信息
    edit() {
      this.form.loading = true
      this.actions
        .edit(this.id)
        .then(data => {
          this.form.model = data
          this.model_ = this.$_.merge({}, this.form.model)
          this.form.loading = false
          //编辑刷新事件
          this.$emit('edit-refresh')
        })
        .catch(() => {
          this.form.loading = false
          //编辑刷新失败事件
          this.$emit('edit-refresh-error')
        })
    },
    reset() {
      if (this.isEdit_) {
        this.form.model = this.$_.merge({}, this.model_)
        this.$emit('reset')
      } else {
        this.$refs.form.reset()
      }
    },
    onSuccess(data) {
      this.$emit('success', this.form.model, data)
    },
    onOpen() {
      //设置图标
      this.setIcon()
      //设置重置方法
      this.form.customResetFunction = this.isEdit_ ? this.reset : null
      //设置表单action
      this.form.action = this.isAdd_ ? this.actions.add : this.actions.update

      if (this.isEdit_) {
        if (this.allRefresh || this.id !== this.form.model.id) {
          this.edit()
        }
      } else {
        this.$refs.form.reset()
      }
    }
  },
  watch: {
    readonly(val) {
      this.form.disabled = val
    }
  }
}
