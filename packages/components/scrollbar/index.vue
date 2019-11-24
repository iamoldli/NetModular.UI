<template>
  <el-scrollbar ref="bar" :class="['nm-scrollbar', horizontal ? 'is-horizontal' : '']">
    <slot />
  </el-scrollbar>
</template>
<script>
export default {
  name: 'Scrollbar',
  props: {
    /** 是否显示水平滚动条 */
    horizontal: Boolean
  },
  methods: {
    // 重绘滚动条
    update() {
      this.$refs.bar.update()
    }
  }
}
</script>
