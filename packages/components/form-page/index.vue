<template>
  <nm-box ref="page" class="nm-form-page" no-scrollbar :title="title" :icon="icon" :header="header" :footer="!noFooter" :fullscreen="fullscreen" :loading="!noLoading && loading">
    <!--标题-->
    <template v-slot:title>
      <slot name="title"></slot>
    </template>

    <!--工具栏之前-->
    <template v-slot:toolbar-before>
      <slot name="toolbar-before" />
    </template>

    <!--工具栏插槽-->
    <template v-slot:toolbar>
      <slot name="toolbar" />
    </template>

    <section class="nm-form-page-body">
      <nm-scrollbar :horizontal="false">
        <nm-form
          class="nm-form-page-main"
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
          :custom-reset-function="customResetFunction"
          v-on="formOn"
        >
          <slot />
        </nm-form>
      </nm-scrollbar>
    </section>

    <!--底部-->
    <template v-slot:footer class="nm-form-page-footer">
      <div class="nm-form-page-footer-left">
        <slot name="footer-left" />
      </div>
      <div class="nm-form-page-footer-right">
        <slot name="fotter">
          <el-button v-if="btnOk" :type="btnOkType" @click="submit" :size="fontSize" :disabled="disabled">{{ btnOkText }}</el-button>
          <el-button v-if="btnReset" type="info" @click="reset" :size="fontSize" :disabled="disabled">重置</el-button>
        </slot>
      </div>
    </template>
  </nm-box>
</template>
<script>
export default {
  name: 'FormPage',
  data() {
    return {
      loading: false,
      formOn: {
        success: this.onSuccess,
        error: this.onError,
        reset: this.onReset,
        'validate-error': this.onValidateError
      }
    }
  },
  props: {
    /** 显示头部 */
    header: {
      type: Boolean,
      default: true
    },
    /** 标题 */
    title: String,
    /** box图标 */
    icon: {
      type: String,
      default: 'detail'
    },
    /** 表单 */
    model: {
      type: Object,
      required: true
    },
    /** 验证规则 */
    rules: Object,
    /** 提交请求 */
    action: {
      type: Function,
      required: true
    },
    /** 行内表单 */
    inline: Boolean,
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
    /** Ok按钮类型 */
    btnOkType: {
      type: String,
      default: 'primary'
    },
    /** reset按钮 */
    btnReset: {
      type: Boolean,
      default: true
    },
    /** 自定义重置操作 */
    customResetFunction: Function,
    /** 是否显示全屏按钮 */
    fullscreen: {
      type: Boolean,
      default: true
    },
    /** 禁用表单 */
    disabled: Boolean,
    /**不显示底部 */
    noFooter: Boolean,
    /**不显示加载动画 */
    noLoading: Boolean
  },
  methods: {
    /** 提交 */
    submit() {
      this.loading = true
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
      this.loading = true
      this.$refs.form.openLoading()
    },
    /** 关闭loading */
    closeLoading() {
      this.loading = false
      this.$refs.form.closeLoading()
    },
    // 成功
    onSuccess(data) {
      this.loading = false
      this.$emit('success', data)
    },
    onReset() {
      this.$emit('reset')
    },
    onError() {
      this.loading = false
      this.$emit('error')
    },
    onValidateError() {
      this.loading = false
      this.$emit('validate-error')
    }
  }
}
</script>
