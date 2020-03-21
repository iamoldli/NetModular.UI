<template>
  <div :style="{ display: 'inline-block', width }">
    <el-date-picker v-model="value" v-bind="options" @change="onChange" />
  </div>
</template>
<script>
export default {
  name: 'DateRangePicker',
  data() {
    return {
      value: []
    }
  },
  props: {
    // 开始日期，默认当前月1号
    start: [String, Date],
    // 结束日期，默认今日
    end: [String, Date],
    /** 尺寸 */
    size: String,
    /** 可清空的 */
    clearable: Boolean,
    width: {
      type: String,
      default: '240px'
    }
  },
  computed: {
    options() {
      return {
        size: this.size || this.fontSize,
        type: 'daterange',
        rangeSeparator: '至',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'yyyy-MM-dd',
        clearable: this.clearable
      }
    }
  },
  methods: {
    onChange(val) {
      if (!val || val.length < 2) {
        var date = new Date()
        this.value = [date, date]
      }

      this.$emit('update:start', val[0])
      this.$emit('update:end', val[1])
      this.$emit('change', val)
    }
  },
  created() {
    var mow = new Date()
    const start = this.$dayjs(mow).format('YYYY-MM-01')
    const end = this.$dayjs(mow).format('YYYY-MM-DD')

    let val = []
    val.push(this.start || start)
    val.push(this.end || end)
    if (!this.start) {
      this.$emit('update:start', val[0])
    }
    if (!this.end) {
      this.$emit('update:end', val[1])
    }
    this.value = val
  },
  watch: {
    start(val) {
      this.value = [val, this.end]
    },
    end(val) {
      this.value = [this.start, val]
    }
  }
}
</script>
