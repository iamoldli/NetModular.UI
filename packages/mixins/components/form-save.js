import visible from './visible'
export default {
  mixins: [visible],
  data() {
    return {
      // 存储表单数据
      model_: {},
      form: {
        icon: '',
        action: null,
        model: {
          id: null
        },
        customResetFunction: null,
        disabled: this.readonly,
        footerCloseButton: true,
        loading: false
      },
      //编辑时，是否总是刷新
      allRefresh: true,
      on: {
        success: this.onSuccess,
        open: this.onOpen
      },
      //文本标签
      labels: {
        add: '新增',
        edit: '编辑',
        read: '查看'
      }
    }
  },
  props: {
    //id不为空，标识编辑或预览，反之为新增
    id: [String, Number],
    /**是否只读 */
    readonly: Boolean,
    /**总数，用于有排序需求的默认值 */
    total: Number
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
    /**设置信息 */
    setInfo() {
      const { form, title, readonly, actions, labels } = this
      //添加
      if (this.isAdd_) {
        form.title = `${labels.add}${title}`
        form.icon = 'add'
        form.customResetFunction = null
        form.action = actions.add
        return
      }
      //编辑
      form.title = `${readonly ? labels.read : labels.edit}${title}`
      form.icon = readonly ? 'preview' : 'edit'
      form.customResetFunction = this.reset
      form.action = actions.update
    },
    reset() {
      this.form.model = this.$_.merge({}, this.model_)
    },
    //获取编辑信息
    edit() {
      const { id, form, actions } = this
      form.loading = true
      actions
        .edit(id)
        .then(data => {
          this.model_ = this.$_.merge({}, data)
          //重置
          this.$refs.form.reset()
          form.loading = false
        })
        .catch(() => {
          form.loading = false
        })
    },
    onSuccess(data) {
      this.$emit('success', this.form.model, data, this.isAdd_)
    },
    onOpen() {
      //设置图标
      this.setInfo()

      if (this.isEdit_) {
        //编辑时是否总是刷新或者id不同时也刷新
        if (this.allRefresh || this.id !== this.form.model.id) {
          this.edit()
        }
      } else {
        //如果总是刷新则要重置
        if (this.allRefresh) {
          this.$refs.form.reset()
        }
      }

      //打开后执行的方法
      if (this.afterOpen) {
        this.afterOpen()
      }
    }
  },
  watch: {
    readonly(val) {
      this.form.disabled = val
    }
  }
}
