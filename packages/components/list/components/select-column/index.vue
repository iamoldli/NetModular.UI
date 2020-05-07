<template>
  <el-dropdown class="nm-list-select-column" :size="fontSize" trigger="click" :hide-on-click="false" @visible-change="onVisible">
    <span>
      选择列
      <i class="el-icon--right" :class="[visible ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      </el-dropdown-item>
      <el-checkbox-group v-model="selection" @change="change">
        <el-dropdown-item v-for="col in columns" :key="col.name">
          <el-checkbox v-if="col.label !== ''" :label="col.name" :checked="col.show">{{ col.label }}</el-checkbox>
        </el-dropdown-item>
      </el-checkbox-group>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      selection: [],
      visible: false
    }
  },
  props: ['columns'],
  methods: {
    change() {
      let checkedCount = this.selection.length
      this.checkAll = checkedCount === this.columns.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length
      this.handleEvent()
    },
    handleCheckAllChange(val) {
      this.selection = val ? this.columns.map(item => item.name) : []
      this.isIndeterminate = false
      this.handleEvent()
    },
    handleEvent() {
      this.columns.forEach(col => {
        col.show = !this.selection.every(name => name !== col.name)
      })
      this.$emit('change')
    },
    onVisible(visible) {
      this.visible = visible
    }
  }
}
</script>
