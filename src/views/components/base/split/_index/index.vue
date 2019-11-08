<template>
  <nm-tmpl v-bind="tmpl">
    <el-alert type="warning">
      <p>本组件从iView移植而来</p>
    </el-alert>
  </nm-tmpl>
</template>
<script>
import page from './page.js'
import attrs from './data/attrs.js'
import events from './data/events.js'
export default {
  name: page.name,
  data() {
    return {
      val: '',
      tmpl: {
        title: '面板分割(nm-split)',
        icon: 'list',
        attrs,
        events
      }
    }
  },
  created() {
    this.setTabName(this.tmpl.title)
  }
}
</script>
