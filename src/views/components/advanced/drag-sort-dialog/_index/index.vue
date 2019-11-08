<template>
  <nm-tmpl v-bind="tmpl">
    <el-alert type="warning">
      <p>该组件有固定的数据格式，需要与后端接口搭配使用</p>
    </el-alert>
  </nm-tmpl>
</template>
<script>
import page from './page.js'
import attrs from './data/attrs.js'
import events from './data/events'
export default {
  name: page.name,
  data() {
    return {
      tmpl: {
        title: '拖动排序对话框(nm-drag-sort-dialog)',
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
