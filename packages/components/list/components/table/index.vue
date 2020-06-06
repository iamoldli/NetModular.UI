<template>
  <section class="nm-list-body-table">
    <el-table
      ref="table"
      headerRowClassName="nm-list-body-table-header"
      border
      stripe
      highlight-current-row
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :size="fontSize"
      :height="height"
      :span-method="spanMethod"
      :data="rows"
      :tree-props="treeProps"
      :row-key="rowKey"
      :lazy="lazy"
      :load="load"
      :default-expand-all="defaultExpandAll"
      v-on="on"
    >
      <slot />
    </el-table>
  </section>
</template>
<script>
export default {
  data() {
    return {
      on: {
        select: this.onSelect,
        'select-all': this.onSelectAll,
        'selection-change': this.onSelectionChange,
        'cell-mouse-enter': this.onCellMouseEnter,
        'cell-mouse-leave': this.onCellMouseLeave,
        'cell-click': this.onCellClick,
        'cell-dblclick': this.onCellDblclick,
        'row-click': this.onRowClick,
        'row-contextmenu': this.onRowContextmenu,
        'row-dblclick': this.onRowDblclick,
        'header-click': this.onHeaderClick,
        'header-contextmenu': this.onHeaderContextmenu,
        'sort-change': this.onSortChange,
        'current-change': this.onCurrentChange,
        'expand-change': this.onExpandChange
      }
    }
  },
  props: {
    /** 高度 */
    height: {
      type: String,
      default: '100%'
    },
    /** 数据 */
    rows: Array,
    /** 合并行列方法 */
    spanMethod: Function,
    /**渲染嵌套数据的配置选项 */
    treeProps: Object,
    /*行数据的 Key，用来优化 Table 的渲染；
    在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。
    类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。*/
    rowKey: [Function, String],
    /*是否懒加载子节点数据*/
    lazy: Boolean,
    /**加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息 */
    load: Function,
    /**是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效 */
    defaultExpandAll: Boolean,
    /**当刷新时不清空已选择数据 */
    noClearSelection: Boolean,
    /**是否显示合计行 */
    showSummary: Boolean,
    /**合计行文本 */
    sumText: String,
    /**合计行自定义逻辑方法 */
    summaryMethod: Function
  },
  methods: {
    /** 清除排序 */
    clearSort() {
      this.$refs.table.clearSort()
    },
    /** 滚动到顶部 */
    scrollTop() {
      this.$nextTick(() => {
        this.$el.querySelector('.el-table__body-wrapper').scrollTop = 0
      })
    },
    /** 重绘布局 */
    doLayout() {
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    },
    /** 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） */
    toggleRowSelection(row, selected) {
      this.$refs.table.toggleRowSelection(row, selected)
    },
    /** 当用户手动勾选数据行的 Checkbox 时触发的事件 */
    onSelect(selection, row) {
      if (this.noClearSelection) {
        let hasSelection = this.$parent.selection
        if (!selection.every(m => m.id !== row.id)) {
          //添加
          hasSelection.push(row)
        } else {
          //移除
          for (let i = 0; i < hasSelection.length; i++) {
            if (hasSelection[i].id == row.id) {
              hasSelection.splice(i, 1)
              break
            }
          }
        }
      }
      this.$parent.$emit('select', selection, row)
    },
    /** 当用户手动勾选全选 Checkbox 时触发的事件 */
    onSelectAll(selection) {
      if (this.noClearSelection) {
        let hasSelection = this.$parent.selection
        if (selection.length > 0) {
          this.rows.forEach(m => {
            if (!hasSelection.every(n => n.id !== m.id)) {
              hasSelection.push(m)
            }
          })
        } else {
          //移除
          this.rows.forEach(m => {
            for (let i = 0; i < hasSelection.length; i++) {
              if (hasSelection[i].id == m.id) {
                hasSelection.splice(i, 1)
                break
              }
            }
          })
        }
      }
      this.$parent.$emit('select-all', this.$parent.selection)
    },
    /** 当选择项发生变化时会触发该事件 */
    onSelectionChange(selection) {
      if (!this.noClearSelection) {
        this.$parent.selection = selection
      }
      this.$parent.$emit('selection-change', this.$parent.selection)
    },
    /** 当单元格 hover 进入时会触发该事件 */
    onCellMouseEnter(row, column, cell, event) {
      this.$parent.$emit('cell-mouse-enter', row, column, cell, event)
    },
    /** 当单元格 hover 退出时会触发该事件 */
    onCellMouseLeave(row, column, cell, event) {
      this.$parent.$emit('cell-mouse-leave', row, column, cell, event)
    },
    /** 当某个单元格被点击时会触发该事件 */
    onCellClick(row, column, cell, event) {
      this.$parent.$emit('cell-click', row, column, cell, event)
    },
    /** 当某个单元格被双击击时会触发该事件 */
    onCellDblclick(row, column, cell, event) {
      this.$parent.$emit('cell-dblclick', row, column, cell, event)
    },
    /** 当某一行被点击时会触发该事件 */
    onRowClick(row, event, column) {
      this.$parent.$emit('row-click', row, event, column)
    },
    /** 当某一行被鼠标右键点击时会触发该事件 */
    onRowContextmenu(row, event) {
      this.$parent.$emit('row-contextmenu', row, event)
    },
    /** 当某一行被双击时会触发该事件 */
    onRowDblclick(row, event) {
      this.$parent.$emit('row-dblclick', row, event)
    },
    /** 当某一列的表头被点击时会触发该事件 */
    onHeaderClick(column, event) {
      this.$parent.$emit('header-click', column, event)
    },
    /** 当某一列的表头被鼠标右键点击时触发该事件 */
    onHeaderContextmenu(column, event) {
      this.$parent.$emit('header-contextmenu', column, event)
    },
    /** 当表格的排序条件发生变化的时候会触发该事件 */
    onSortChange(val) {
      this.$parent.page.sort = []
      // 将排序信息转化成后端的格式
      if (val.prop !== null) {
        this.$parent.page.sort.push({ field: val.prop, type: val.order === 'ascending' ? 0 : 1 })
      }

      this.$parent.refresh()

      this.$parent.$emit('sort-change', this.$parent.page.sort, val)
    },
    /** 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 */
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$parent.$emit('current-change', currentRow, oldCurrentRow)
    },
    /**当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded） */
    onExpandChange(currentRow, expandedRows) {
      this.$parent.$emit('expand-change', currentRow, expandedRows)
    }
  }
}
</script>
