<template>
  <span :class="class_">
    <slot>{{ text }}</slot>
  </span>
</template>
<script>
export default {
  name: 'Label',
  props: {
    /** 显示文本 */
    text: String,
    /** 类型 */
    type: String,
    /** 左边箭头 */
    arrowed: Boolean,
    /** 左侧内箭头 */
    arrowedIn: Boolean,
    /** 右侧箭头 */
    arrowedRight: Boolean,
    /** 右侧内箭头 */
    arrowedRightIn: Boolean,
    /** 尺寸 */
    size: String
  },
  computed: {
    class_() {
      return [
        'nm-label',
        this.type ? `nm-label-${this.type}` : '',
        this.arrowed ? 'arrowed' : '',
        this.arrowedIn ? 'arrowed-in' : '',
        this.arrowedRight ? 'arrowed-right' : '',
        this.arrowedRightIn ? 'arrowed-right-in' : '',
        this.size || this.fontSize
      ]
    }
  }
}
</script>
