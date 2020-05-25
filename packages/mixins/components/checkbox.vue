<template>
  <el-checkbox-group
    class="nm-checkbox"
    v-model="value_"
    :size="size || fontSize"
    :disabled="disabled"
    :min="min"
    :max="max"
    :text-color="textColor"
    :fill="fill"
    @change="onChange"
    v-loading="loading"
  >
    <slot :options="options">
      <component :is="_tagName" v-for="item in options" :key="item.value" :label="item.value" :disabled="item.disabled" :border="border"> {{ item.label }}</component>
    </slot>
  </el-checkbox-group>
</template>
<script>
import loading from './loading'
export default {
  mixins: [loading],
  data() {
    return {
      value_: this.value,
      options: [],
      action: null,
      loading: false
    }
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    size: String,
    disabled: Boolean,
    min: Number,
    max: Number,
    border: Boolean,
    textColor: String,
    fill: String,
    button: Boolean
  },
  computed: {
    _tagName() {
      return this.button ? 'el-checkbox-button' : 'el-checkbox'
    },
    selection() {
      let list = []
      if (this.value_) {
        this.value_.forEach(item => {
          for (var i = 0; i < this.options.length; i++) {
            const opt = this.options[i]
            if (opt.value === item) {
              list.push(opt)
              break
            }
          }
        })
      }
      return list
    }
  },
  methods: {
    refresh() {
      this.loading = true
      this.action()
        .then(options => {
          this.options = options
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 清楚已选项
    clear() {
      this.value_ = this.value
      this.onChange()
    },
    onChange() {
      this.$emit('input', this.value_)
      this.$emit('change', this.value_, this.selection, this.options)
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
