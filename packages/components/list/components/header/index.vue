<template>
  <header class="nm-list-header">
    <div class="nm-list-icon">
      <nm-icon :name="icon || 'list'" />
    </div>
    <div class="nm-list-title">{{ title }}</div>
    <div class="nm-list-header-toolbar">
      <!--工具栏插槽-->
      <slot name="toolbar" />
      <!--导出按钮-->
      <nm-button v-if="exportEnabled" icon="export" @click="onExportClick" v-nm-has="exportBtnCode" />
      <!--刷新按钮-->
      <nm-button v-if="!noRefresh" icon="refresh" @click="refresh" />
      <!--全屏按钮-->
      <nm-button v-if="!noFullscreen" :icon="fullscreen ? 'min' : 'max'" @click="onFullscreenClick" />
    </div>
  </header>
</template>
<script>
export default {
  props: {
    value: Object,
    /** 标题 */
    title: String,
    /** 图标 */
    icon: String,
    /** 是否全屏 */
    fullscreen: Boolean,
    /** 不显示全屏按钮 */
    noFullscreen: Boolean,
    /** 不显示刷新按钮 */
    noRefresh: Boolean,
    /**显示导出按钮 */
    exportEnabled: Boolean,
    /**导出按钮权限编码 */
    exportBtnCode: String
  },
  methods: {
    query() {
      this.$parent.page.index = 1
      this.$parent.query()
    },
    reset() {
      this.$parent.reset()
    },
    refresh() {
      this.$parent.refresh()
    },
    onFullscreenClick() {
      this.$parent.triggerFullscreen()
    },
    onExportClick() {
      this.$parent.triggerExport()
    }
  }
}
</script>
