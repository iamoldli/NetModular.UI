<template>
  <nm-tmpl v-bind="tmpl">
    <el-alert type="warning">列表页对话框是专门用于再对话框中显示列表的组件，他是基于dialog的，然后针对列表页做了一些优化</el-alert>
  </nm-tmpl>
</template>
<script>
import page from './page.js'
import attrs from './data/attrs.js'
import slots from './data/slots.js'
import methods from './data/methods.js'
import events from './data/events.js'
export default {
  name: page.name,
  data() {
    return {
      val: '',
      tmpl: {
        title: '列表页对话框(nm-list-dialog)',
        icon: 'list',
        attrs,
        slots,
        methods,
        events
      }
    }
  },
  created() {
    this.setTabName(this.tmpl.title)
  }
}
</script>
