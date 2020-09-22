<template>
  <footer class="nm-list-footer" :class="[reverse ? 'reverse' : '']">
    <div class="nm-list-footer-left">
      <slot />
    </div>
    <div class="nm-list-footer-right">
      <el-pagination
        background
        :current-page="value.index"
        :page-size="value.size"
        :total="total"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="onIndexChange"
      />
      <select-column v-if="!noSelectColumn" :columns="columns" @change="onSelectColumnChange" />
    </div>
  </footer>
</template>
<script>
import SelectColumn from '../select-column'
export default {
  components: { SelectColumn },
  props: {
    /** 分页信息 */
    value: {
      type: Object,
      required: true
    },
    /** 总数 */
    total: Number,
    /** 列集合 */
    columns: Array,
    /** 不显示选择列按钮 */
    noSelectColumn: Boolean,
    /** 左右反转 */
    reverse: Boolean,
    /** 页数选择项 */
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 50, 100]
      }
    }
  },
  methods: {
    onSizeChange(size) {
      console.log(size)
      const page = Object.assign({}, this.value, { size, index: 1 })
      this.$emit('input', page)
      this.$parent.query()
      this.$parent.$emit('size-change', size)
    },
    onIndexChange(index) {
      const page = Object.assign({}, this.value, { index })
      this.$emit('input', page)
      this.$parent.query()
      this.$parent.$emit('index-change', index)
    },
    onSelectColumnChange() {
      // 重绘父组件的布局
      this.$parent.doLayout()
    }
  }
}
</script>
