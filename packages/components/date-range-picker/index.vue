<template>
  <div class="nm-date-range-picker" :style="{ display: 'inline-block', width }">
    <el-date-picker
      v-model="value"
      :size="this.size || this.fontSize"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
      :clearable="clearable"
      :picker-options="pickerOptions_"
      @change="onChange"
    />
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
    },
    /**当前时间日期选择器特有的选项 */
    pickerOptions: Object,
    /**是否显示日期快捷键 */
    showPickerOptions: Boolean
  },
  computed: {
    pickerOptions_() {
      return this.showPickerOptions
        ? {
            shortcuts: [
              {
                text: '最近一周',
                onClick(picker) {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                  picker.$emit('pick', [start, end])
                }
              },
              {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                  picker.$emit('pick', [start, end])
                }
              },
              {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                  picker.$emit('pick', [start, end])
                }
              }
            ]
          }
        : null
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
