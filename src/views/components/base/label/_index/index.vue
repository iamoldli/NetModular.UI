<template>
  <nm-tmpl v-bind="tmpl"></nm-tmpl>
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
        title: '标签(nm-tabs)',
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
