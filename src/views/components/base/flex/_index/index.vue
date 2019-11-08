<template>
  <nm-tmpl v-bind="tmpl">
    <el-alert type="warning">nm-flex是一个布局组件，可以理解为对display:flex属性的一个封装，用于快速实现弹性布局。</el-alert>
  </nm-tmpl>
</template>
<script>
import page from './page.js'
import attrs from './data/attrs.js'
import slots from './data/slots.js'
export default {
  name: page.name,
  data() {
    return {
      val: '',
      tmpl: {
        title: '弹性布局组件(nm-tabs)',
        icon: 'card',
        attrs,
        slots
      }
    }
  },
  created() {
    this.setTabName(this.tmpl.title)
  }
}
</script>
