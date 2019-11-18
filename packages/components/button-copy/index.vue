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
    v-clipboard:copy="copy"
    v-clipboard:success="onSuccess"
    v-clipboard:error="onError"
    @click="$emit('click')"
  >
    <nm-icon v-if="!loading && icon" :name="icon" />
    <slot>
      <span v-if="!circle && text" class="nm-button-text" v-html="text" />
    </slot>
  </el-button>
</template>
<script>
export default {
  name: 'ButtonCopy',
  props: {
    /** 尺寸，默认按照框架的字号设置 */
    size: String,
    /** 类型 primary/success/warning/danger/info/text */
    type: {
      type: String,
      default: 'text'
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
      default: 'max'
    },
    // 文本
    text: {
      type: String,
      default: '复制'
    },
    // 按钮编码，用于按钮权限控制
    code: String,
    // 拷贝内容
    copy: String
  },
  methods: {
    onSuccess() {
      this._success('复制成功')
    },
    onError() {
      this._error('复制失败')
    }
  }
}
</script>
