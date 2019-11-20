<template>
  <nm-box page header title="拖拽排序对话框示例" icon="sort">
    <nm-button type="primary" text="排序" @click="show = true" />
    <nm-drag-sort-dialog :query-action="query" :update-action="update" :visible.sync="show"></nm-drag-sort-dialog>
  </nm-box>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    query() {
      let options = []
      for (var i = 1; i < 10; i++) {
        options.push({
          id: i,
          label: `第${i}个`,
          sort: i
        })
      }

      return new Promise(resolve => {
        resolve({ options })
      })
    },
    update() {
      return new Promise(resolve => {
        resolve({ code: 1, data: '' })
      })
    }
  }
}
</script>
