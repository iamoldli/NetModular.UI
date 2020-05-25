<template>
  <el-radio-group class="nm-radio" v-model="value_" :size="size || fontSize" :disabled="disabled" :text-color="textColor" :fill="fill" @change="onChange" v-loading="loading">
    <slot :options="options">
      <component :is="_tagName" v-for="item in options" :key="item.value" :label="item.value" :disabled="item.disabled" :border="border">{{ item.label }}</component>
    </slot>
  </el-radio-group>
</template>
<script>
import loading from './loading'

export default {
  mixins: [loading],
  data() {
    return {
      value_: this.value,
      options: [],
      loading: false,
      /**数据请求方法 */
      action: null
    }
  },
  props: {
    value: [String, Number],
    /** 大小 */
    size: String,
    /** 禁用 */
    disabled: Boolean,
    /** 按钮形式的 Radio 激活时的文本颜色，默认 #fff */
    textColor: String,
    /** 按钮形式的 Radio 激活时的填充色和边框色，默认 #409EFF */
    fill: String,
    /** 是否显示边框 */
    border: Boolean,
    /** 是否默认选中第一个 */
    checkedFirst: Boolean,
    /**  按钮样式 */
    button: Boolean
  },
  computed: {
    _tagName() {
      return this.button ? 'el-radio-button' : 'el-radio'
    }
  },
  methods: {
    refresh() {
      this.loading = true
      this.action()
        .then(data => {
          this.options = data
          if (data.length > 0 && this.checkedFirst) {
            this.onChange(data[0].value)
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    onChange(val) {
      this.value_ = val
      this.$emit('input', this.value_)
      this.$emit(
        'change',
        this.value_,
        this.options.find(m => m.value === this.value_),
        this.options
      )
    },
    reset() {
      if (this.options.length > 0 && this.checkedFirst) {
        this.onChange(this.options[0].value)
      }
    }
  },
  created() {
    this.refresh()
  },
  watch: {
    value(val) {
      if (val !== this.value_) this.value_ = val
    }
  }
}
</script>
