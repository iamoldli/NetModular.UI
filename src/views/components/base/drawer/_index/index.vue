<template>
  <nm-tmpl v-bind="tmpl">
    <el-alert title="按钮权限" type="warning" show-icon :closable="false">
      <p>Element-UI组件库已经包含了el-drawer组件，只是本框架开始做的时候它还没有该组件，所以便一直保留了下来~</p>
    </el-alert>
  </nm-tmpl>
</template>
<script>
import page from './page.js'
import attrs from './data/attrs'
import events from './data/events'
import slots from './data/slots'
export default {
  name: page.name,
  data() {
    return {
      tmpl: {
        title: '抽屉(nm-drawer)',
        icon: 'list',
        attrs,
        events,
        slots
      }
    }
  },
  created() {
    this.setTabName(this.tmpl.title)
  }
}
</script>
