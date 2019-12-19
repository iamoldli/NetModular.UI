export default {
  data() {
    return {
      //当前选中项
      curr: { id: '' },
      dialog: {
        save: false
      },
      //只读
      readonly: false,
      //总数量
      total: 0
    }
  },
  methods: {
    refresh() {
      this.$refs.list.refresh()
    },
    add(total) {
      this.curr.id = ''
      this.total = total
      this.readonly = false
      this.dialog.save = true
    },
    edit(row) {
      this.curr.id = row.id
      this.readonly = false
      this.dialog.save = true
    },
    preview(row) {
      this.curr.id = row.id
      this.readonly = true
      this.dialog.save = true
    }
  }
}
