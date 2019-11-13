<template>
  <el-select v-model="value_" :placeholder="placeholder" :clearable="clearable" @change="onChange">
    <el-option label="是" :value="1" />
    <el-option label="否" :value="0" />
  </el-select>
</template>
<script>
export default {
  name: 'SelectWhether',
  data() {
    return {
      value_: this.value
    }
  },
  props: {
    value: [String, Number],
    placeholder: {
      type: String,
      default: '请选择...'
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onChange(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    reset() {
      this.value_ = ''
      this.onChange('')
    }
  },
  watch: {
    value(val) {
      this.value_ = val
    }
  }
}
</script>
