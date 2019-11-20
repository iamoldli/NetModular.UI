<template>
  <nm-container>
    <nm-box page header title="混入下拉框">
      <el-alert type="warning">
        <p>您也可以使用混入的方式来创建下拉组件，用法非常简单</p>
      </el-alert>
      <p>首先创建文件select.js</p>
      <br />
      <p>然后写入以下代码</p>
      <br />
      <pre
        v-highlightjs="
          `
        <script>
        import { mixins } from 'netmodular-ui'
        export default {
          mixins: [mixins.select],
          data() {
            return {
              action: $api.admin.role.select
            }
          }
        }
        </script>`
        "
      ><code class="html">
        </code>
      </pre>
      <br />
      <p>最后再使用的地方注册组件即可~</p>
    </nm-box>
  </nm-container>
</template>
<script>
import page from './page.js'
export default {
  name: page.name,
  data() {
    return {}
  }
}
</script>
