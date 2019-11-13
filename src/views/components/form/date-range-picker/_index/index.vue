<template>
  <nm-tmpl v-bind="tmpl">
    该组件主要用于再列表查询中包含日期区间的场景，比如再列表头部工具栏显示日期选择空间，该组件默认采用当前月的 1 号至当前日，所以你可以不指定日期。
    <nm-upload-single v-model="file" action="123" />
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
      file: '',
      tmpl: {
        title: '日起段选择(nm-date-range-picker)',
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
