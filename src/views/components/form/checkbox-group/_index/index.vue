<template>
  <nm-tmpl v-bind="tmpl">
    <el-alert title="约定" type="warning" show-icon :closable="false">
      <p>本多选框组件是在Element-UI的多选框组件基础上做的扩展，一般结合后端一起使用，组件会自动请求数据并绑定。</p>
      <p>后端接口需要返回固定的格式</p>
      <pre>
        <code>
          [
              {
                  //文本
                  label:'',
                  //值
                  value:'',
                  //是否禁用
                  disabled:'',
                  //扩展数据
                  data:''
              }
          ]
        </code>
      </pre>
    </el-alert>
  </nm-tmpl>
</template>
<script>
import page from './page.js'
import attrs from './data/attrs.js'
import slots from './data/slots.js'
import events from './data/events.js'
import methods from './data/methods.js'
export default {
  name: page.name,
  data() {
    return {
      tmpl: {
        title: '多选框(nm-checkbox-group)',
        icon: 'checkbox',
        attrs,
        slots,
        events,
        methods
      }
    }
  },
  created() {
    this.setTabName(this.tmpl.title)
  }
}
</script>
