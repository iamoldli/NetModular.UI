<template>
  <section :class="['nm-tabs', this.fullscreen_ ? 'fullscreen' : '']">
    <section class="nm-tabs-toolbar">
      <slot name="toolbar" />
      <!--全屏按钮-->
      <nm-button v-if="fullscreen" :icon="this.fullscreen_ ? 'min' : 'max'" @click="onFullscreen" />
    </section>
    <slot />
  </section>
</template>
<script>
export default {
  name: 'Tabs',
  data() {
    return {
      fullscreen_: false
    }
  },
  props: {
    fullscreen: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /** 开启全屏 */
    openFullscreen() {
      this.fullscreen_ = true
      // 全屏事件
      this.$emit('fullscreen-change', this.fullscreen_)
    },
    /** 关闭全屏 */
    closeFullscreen() {
      this.fullscreen_ = false
      // 全屏事件
      this.$emit('fullscreen-change', this.fullscreen_)
    },
    /** 全屏事件 */
    onFullscreen() {
      if (this.fullscreen_) {
        this.closeFullscreen()
      } else {
        this.openFullscreen()
      }
    }
  }
}
</script>
