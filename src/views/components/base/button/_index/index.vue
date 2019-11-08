<template>
  <nm-tmpl v-bind="tmpl">
    <el-alert title="按钮权限" type="warning" show-icon :closable="false">按钮的权限控制是通过 code 属性来控制的，只要按钮设置了code属性，那么就会经过权限处理，只有授权的才会显示</el-alert>
  </nm-tmpl>
</template>
<script>
import page from './page.js'
import attrs from './data/attrs.js'
import slots from './data/slots.js'
import events from './data/events.js'
export default {
  name: page.name,
  data() {
    return {
      tmpl: {
        title: '按钮(nm-button)',
        icon: 'button',
        attrs,
        slots,
        events
      }
    }
  },
  created() {
    this.setTabName(this.tmpl.title)
  }
}
</script>
