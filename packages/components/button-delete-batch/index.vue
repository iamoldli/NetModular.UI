<template>
  <el-button
    class="nm-button"
    :type="type"
    :size="size || fontSize"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :autofocus="autofocus"
    :native-type="nativeType"
    v-nm-has="code"
    @click="remove"
  >
    <nm-icon v-if="!noIcon" :name="icon" />
    <span v-if="!circle && text" class="nm-button-text">{{ text }}</span>
  </el-button>
</template>
<script>
export default {
  name: 'ButtonDeleteBatch',
  props: {
    /** 尺寸，默认或者为空时，按照皮肤的字号设置 */
    size: String,
    /** 类型 primary/success/warning/danger/info/text */
    type: {
      type: String,
      default: 'danger'
    },
    /** 是否朴素按钮 */
    plain: Boolean,
    /** 是否圆角按钮 */
    round: Boolean,
    /** 是否圆形按钮 */
    circle: Boolean,
    /** 是否加载中状态 */
    loading: Boolean,
    /** 是否禁用状态 */
    disabled: Boolean,
    /** 是否默认聚焦 */
    autofocus: Boolean,
    /** 原生 type 属性 button/submit/reset */
    nativeType: String,
    /** 图标 */
    icon: {
      type: String,
      default: 'batch-delete'
    },
    // 文本
    text: {
      type: String,
      default: '批量删除'
    },
    // 按钮编码，用于按钮权限控制
    code: String,
    // 已选择的数据列表
    selection: Array,
    // 要显示的属性名称
    showProperty: String,
    // 不显示图标
    noIcon: Boolean,
    // 删除方法
    action: {
      type: Function,
      required: true
    }
  },
  methods: {
    async remove() {
      if (!this.selection || this.selection.length < 1) {
        this._error('请选择要删除的数据~')
        return
      }

      let msg = '您确认要删除以下数据吗？'
      if (this.showProperty) {
        msg += '<br/>已选择：' + this.selection.map(item => item[this.showProperty]).join('、')
      }

      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(async () => {
          if (this.action || typeof action === 'function') {
            this._openLoading('正在删除，请稍后...')

            this.action(this.selection.map(item => item.id))
              .then(() => {
                this._closeLoading()
                this._success('删除成功~')
                this.$emit('success')
              })
              .catch(() => {
                this._closeLoading()
                this.$emit('error')
              }, this.msg)
              .catch(() => {})
          }
        })
        .catch(() => {})
    }
  }
}
</script>
