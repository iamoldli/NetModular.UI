<template>
  <!--使用popover来实现下拉效果-->
  <el-popover ref="popover" :popper-class="popperClass" v-model="visible" :width="width">
    <nm-box page header no-scrollbar :title="title_" :icon="icon" footer :loading="showLoading">
      <template v-slot:toolbar>
        <!--全部折叠按钮-->
        <el-tooltip v-if="collapseAll" effect="dark" :content="collapsed ? '展开全部' : '折叠全部'" placement="top">
          <nm-button :icon="collapsed ? 'unfold' : 'fold'" @click="onCollapseAll" />
        </el-tooltip>
        <!--刷新按钮-->
        <nm-button v-if="refresh" icon="refresh" @click="refreshTree" />
      </template>
      <section class="nm-tree-select-content">
        <!--搜索框-->
        <div class="nm-tree-select-search-wrapper">
          <el-input :size="fontSize" v-if="filterable" class="nm-tree-select-search" v-model="keyword" placeholder="请输入内容" prefix-icon="el-icon-search"> </el-input>
        </div>
        <!--树结构-->
        <div class="nm-tree-select-tree-wrapper">
          <div class="nm-tree-select-tree-main">
            <nm-scrollbar horizontal>
              <el-tree ref="tree" v-bind="treeOptions" v-on="treeOn"> </el-tree>
            </nm-scrollbar>
          </div>
        </div>
      </section>
      <!--按钮-->
      <template v-slot:footer>
        <div style="float:left">
          <span style="float:left;font-size:12px;">
            {{ multiple ? '多选' : '单选' }}
            <span v-if="multiple && multipleLimit > 0"
              >(<label class="nm-size-13 nm-text-danger nm-p-3">{{ selection.length }}/{{ multipleLimit }}</label
              >)</span
            >
          </span>
        </div>
        <el-button type="text" @click="save">确定</el-button>
        <el-button class="nm-text-warning" type="text" @click="reset">重置</el-button>
        <el-button class="nm-text-info" type="text" @click="visible = false">取消</el-button>
      </template>
    </nm-box>
    <!--展示-->
    <el-input
      ref="input"
      :value="label"
      class="nm-tree-select-input"
      :placeholder="placeholder"
      :disabled="disabled"
      :suffix-icon="visible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
      readonly
      slot="reference"
    >
    </el-input>
  </el-popover>
</template>
<script>
export default {
  data() {
    return {
      title_: this.title,
      /**树配置 */
      treeOptions: {
        data: [],
        nodeKey: 'id',
        props: {
          children: 'children',
          label: 'label'
        },
        showCheckbox: true,
        checkStrictly: true,
        defaultExpandAll: this.defaultExpandAll,
        defaultExpandedKeys: [],
        filterNodeMethod: this.filterNode
      },
      /**树事件 */
      treeOn: {
        check: this.onCheck,
        'node-expand': this.onNodeExpand,
        'node-collapse': this.onNodeCollapse
      },
      /**是否显示 */
      visible: false,
      /**输入框显示文本 */
      label: '',
      /**过滤关键字 */
      keyword: '',
      /**已选项 */
      selection: [],
      /**折叠状态 */
      collapsed: false,
      /**加载动画 */
      loading: false
    }
  },
  props: {
    value: [String, Number, Array],
    placeholder: {
      type: String,
      default: '请选择...'
    },
    /**头部标题 */
    title: {
      type: String,
      default: '请选择'
    },
    /**图标 */
    icon: {
      type: String,
      default: 'tree'
    },
    /**宽度 */
    width: {
      type: String,
      default: '250px'
    },
    /**高度 */
    height: {
      type: String,
      default: '400px'
    },
    /**可搜索的 */
    filterable: Boolean,
    /**禁用的 */
    disabled: Boolean,
    /**多选 */
    multiple: Boolean,
    /**多选时最多可以选择的项目数，为 0 则不限制 */
    multipleLimit: {
      type: Number,
      default: 0
    },
    /**多选时展示用的分隔符 */
    separator: {
      type: String,
      default: '/'
    },
    /**是否显示折叠/展开全部按钮 */
    collapseAll: Boolean,
    /**默认展开所有 */
    defaultExpandAll: Boolean,
    /**不显示加载动画 */
    noLoading: Boolean,
    /**是否显示刷新按钮 */
    refresh: Boolean
  },
  computed: {
    popperClass() {
      return `nm-tree-select-popover ${this.filterable ? 'filterable' : ''}`
    },
    selection_() {
      let sl = this.selection
      return this.multiple ? sl.map(m => m) : sl.length > 0 ? sl[0] : null
    },
    /**已选中的值 */
    value_() {
      let sl = this.selection
      return this.multiple ? sl.map(m => m.id) : sl.length > 0 ? sl[0].id : ''
    },
    showLoading() {
      return !this.noLoading && this.loading
    }
  },
  methods: {
    refreshTree() {
      this.loading = true
      this.action().then(data => {
        this.treeOptions.data = data
        this.change()
        this.loading = false
      })
    },
    /**
     * @description 选项更改处理
     */
    change() {
      if (!this.value) return

      let data = this.treeOptions.data
      if (data.length < 1) return

      let value = this.multiple ? this.value : [this.value]

      //设置显示文本
      this.setLabel(value)
      //清除已选项
      this.selection = []
      //要展开的选项
      this.treeOptions.defaultExpandedKeys = value

      this.$nextTick(() => {
        this.setCheckedKeys(value)
        this.$emit('change', this.value_, this.selection_)
      })
    },
    /**保存 */
    save() {
      if (this.multiple && this.multipleLimit > 0 && this.selection.length > this.multipleLimit) {
        this.showLimitMsg()
        return
      }
      this.setLabel(this.multiple ? this.value_ : [this.value_])
      this.$emit('input', this.value_)
      this.$emit('change', this.value_, this.selection_)
      this.visible = false
    },
    /**重置 */
    reset() {
      this.selection = this.multiple ? [] : ''
      this.setCheckedKeys([])

      this.setLabel(this.multiple ? this.value_ : [this.value_])
      this.$emit('input', this.value_)
      this.$emit('change', this.value_, this.selection_)
    },
    setLabel(ids) {
      let datas = []
      if (ids && ids.length > 0) {
        ids.map(m => {
          let nodeData = this.getNodeData(this.treeOptions.data, m)
          if (nodeData) {
            datas.push(nodeData)
          }
        })
      }
      this.label = datas.map(m => m.label).join(` ${this.separator} `)
    },
    //递归获取当前数据对象
    getNodeData(list, id) {
      for (let i = 0; i < list.length; i++) {
        const m = list[i]
        if (m.id === id) {
          return m
        }

        if (m.children) {
          const nodeData = this.getNodeData(m.children, id)
          if (nodeData != null) return nodeData
        }
      }
      return null
    },
    /**设置选中 */
    setCheckedKeys(keys) {
      this.$refs.tree.setCheckedKeys(keys || this.selection.map(m => m.id))
    },
    /**过滤方法 */
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    /**显示限制提醒消息 */
    showLimitMsg() {
      this._warning(`最多只能选择${this.multipleLimit}个`)
    },
    /**复选框点击事件 */
    onCheck(data, curr) {
      const { checkedNodes, checkedKeys } = curr
      if (this.multiple) {
        if (this.multipleLimit > 0 && checkedKeys.length > this.multipleLimit) {
          this.showLimitMsg()
          this.setCheckedKeys() //恢复
          return
        }
        this.selection = checkedNodes.map(m => m.item)
      } else {
        this.selection = checkedKeys.length > 0 ? [data.item] : []
        this.setCheckedKeys()
      }

      this.$emit('check', data, curr)
    },
    /**折叠展开全部事件 */
    onCollapseAll() {
      this.collapsed = !this.collapsed
      let treeStore = this.$refs.tree.store
      for (var i = 0; i < treeStore._getAllNodes().length; i++) {
        treeStore._getAllNodes()[i].expanded = !this.collapsed
      }
    },
    /**节点被点击时的回调 */
    onNodeClick(data, node, cmp) {
      this.$emit('node-click', data, node, cmp)
    },
    /**节点选中状态发生变化时的回调 */
    onCheckChange(data, checked, indeterminate) {
      this.$emit('check-change', data, checked, indeterminate)
    },
    /**当前选中节点变化时触发的事件 */
    onCurrentChange(data, node) {
      this.$emit('current-change', data, node)
    },
    /**节点被展开时触发的事件 */
    onNodeExpand(data, node, cmp) {
      //记录展开的节点
      this.treeOptions.defaultExpandedKeys.push(data.id)
      this.$emit('node-expand', data, node, cmp)
    },
    /**节点被关闭时触发的事件 */
    onNodeCollapse(data, node, cmp) {
      //移除展开的节点
      this.$_.pull(this.treeOptions.defaultExpandedKeys, data.id)
      this.$emit('node-collapse', data, node, cmp)
    }
  },
  created() {
    this.refreshTree()
  },
  mounted() {
    this.$nextTick(() => {
      //初始化宽高
      let el = this.$refs.popover.$el.querySelector('.el-popover')
      el.style.height = this.height
      el.style.width = this.width
    })
  },
  watch: {
    title(val) {
      this.title_ = val
    },
    value(val) {
      if (val !== this.value_) {
        this.change()
      }
    },
    defaultExpandAll(val) {
      this.treeOptions.defaultExpandAll = val
    },
    keyword(val) {
      if (this.filterable) this.$refs.tree.filter(val)
    }
  }
}
</script>
