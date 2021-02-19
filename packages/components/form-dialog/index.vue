<template>
  <nm-dialog
    ref="dialog"
    class="nm-form-dialog"
    :title="title"
    :icon="icon"
    :width="width"
    :height="height"
    :footer="footer"
    :fullscreen="fullscreen"
    :close-on-click-modal="closeOnClickModal"
    :loading="showLoading"
    :footer-close-button="footerCloseButton"
    :draggable="draggable"
    :drag-out-page="dragOutPage"
    :drag-min-width="dragMinWidth"
    :visible.sync="visible_"
    v-on="dialogOn"
  >
    <nm-form
      ref="form"
      no-loading
      :model="model"
      :rules="rules"
      :action="action"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :customValidate="validate"
      :success-msg="successMsg"
      :success-msg-text="successMsgText"
      :disabled="disabled"
      :inline="inline"
      :customResetFunction="customResetFunction"
      v-on="formOn"
      @validate="onValidate"
    >
      <slot />
    </nm-form>

    <template v-slot:footer-left>
      <slot name="footer-left" />
    </template>

    <template v-slot:footer>
      <slot name="footer-buttons" />
      <slot name="footer">
        <el-button v-if="btnOk && !disabled" type="success" @click="submit" :size="fontSize">{{ btnOkText }}</el-button>
        <el-button v-if="btnReset && !disabled" type="warning" @click="reset" :size="fontSize">重置</el-button>
      </slot>
    </template>
  </nm-dialog>
</template>
<script>
import visible from '../../mixins/components/visible'
export default {
  name: 'FormDialog',
  mixins: [visible],
  data() {
    return {
      loading_: false,
      formOn: {
        success: this.onSuccess,
        error: this.onError,
        reset: this.onReset,
        'validate-error': this.onValidateError
      },
      dialogOn: {
        open: this.onOpen,
        opened: this.onOpened,
        close: this.onClose,
        closed: this.onClosed
      }
    }
  },
  props: {
    /** 标题 */
    title: String,
    /** 图标 */
    icon: String,
    /** 宽度 */
    width: String,
    /** Dialog 的高度 */
    height: [Number, String],
    /** 显示尾部 */
    footer: {
      type: Boolean,
      default: true
    },
    /** 是否可以通过点击 modal 关闭 Dialog */
    closeOnClickModal: {
      type: Boolean,
      default: null
    },
    /** 是否显示全屏按钮 */
    fullscreen: Boolean,
    /** 表单模型 */
    model: {
      type: Object,
      required: true
    },
    /** 验证规则 */
    rules: Object,
    /** 提交请求 */
    action: Function,
    /** 行内表单 */
    inline: {
      type: Boolean,
      default: false
    },
    /** 标签的宽度 */
    labelWidth: String,
    /** 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width */
    labelPosition: String,
    // 自定义验证
    validate: Function,
    /** 是否显示成功提示消息 */
    successMsg: {
      type: Boolean,
      default: true
    },
    /** 成功提示消息文本 */
    successMsgText: {
      type: String,
      default: '保存成功'
    },
    /** Ok按钮 */
    btnOk: {
      type: Boolean,
      default: true
    },
    /** Ok按钮文本 */
    btnOkText: {
      type: String,
      default: '保存'
    },
    /** reset按钮 */
    btnReset: {
      type: Boolean,
      default: true
    },
    /** 自定义重置操作 */
    customResetFunction: Function,
    // 保存成功后是否关闭对话框
    closeWhenSuccess: {
      type: Boolean,
      default: true
    },
    /** 禁用表单 */
    disabled: Boolean,
    /** 显示加载动画 */
    loading: Boolean,
    /** 不显示加载动画 */
    noLoading: {
      type: Boolean,
      default: false
    },
    /** 打开时是否清楚验证信息 */
    clearValidateOnOpen: {
      type: Boolean,
      default: true
    },
    /** 是否显示底部关闭按钮 */
    footerCloseButton: Boolean,
    /** 可拖拽的 */
    draggable: {
      type: Boolean,
      default: null
    },
    /** 是否可拖出页面 */
    dragOutPage: Boolean,
    /** 拖拽出页面后保留的最小宽度 */
    dragMinWidth: Number
  },
  computed: {
    showLoading() {
      return !this.noLoading && (this.loading_ || this.loading)
    }
  },
  methods: {
    /** 提交 */
    submit() {
      this.loading_ = true
      this.$refs.form.submit()
    },
    /** 重置 */
    reset() {
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    /** 清除验证信息 */
    clearValidate() {
      this.$refs.form.clearValidate()
    },
    /** 打开loading */
    openLoading() {
      this.loading_ = true
    },
    /** 关闭loading */
    closeLoading() {
      this.loading = false
    },
    // 成功
    onSuccess(data) {
      // 关闭对话框
      if (this.closeWhenSuccess) {
        setTimeout(this.hide, 800)
      }
      this.loading_ = false
      this.$emit('success', data)
    },
    onReset() {
      this.$emit('reset')
    },
    onError() {
      this.loading_ = false
      this.$emit('error')
    },
    onValidateError() {
      this.loading_ = false
      this.$emit('validate-error')
    },
    onOpen() {
      if (this.clearValidateOnOpen) {
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
      }
      this.$emit('open')
    },
    onOpened() {
      this.$emit('opened')
    },
    onClose() {
      this.$emit('close')
    },
    onClosed() {
      this.$emit('closed')
    },
    onValidate(prop, valid, msg) {
      this.$emit('validate', prop, valid, msg)
    }
  }
}
</script>
