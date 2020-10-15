<template>
  <section :class="class_" v-loading="showLoading" :element-loading-text="loadingText || loadingText_" :element-loading-background="loadingBackground" :element-loading-spinner="loadingSpinner">
    <!--header-->
    <query-header
      v-if="!noHeader"
      :title="title"
      :icon="icon"
      :no-fullscreen="noFullscreen"
      :fullscreen="fullscreen"
      :no-refresh="noRefresh"
      :export-enabled="exportOptions_.enabled && exportOptions_.btnLocation !== 'querybar'"
      :exportBtnCode="exportOptions_.btnCode"
    >
      <template v-slot:toolbar>
        <slot name="header-toolbar" :total="total" :selection="selection" />
      </template>
    </query-header>

    <!--查询栏-->
    <querybar
      ref="querybar"
      v-if="!noQuerybar"
      :model="model"
      :rules="rules"
      :input-width="inputWidth"
      :advanced="advanced"
      :no-search="noSearch"
      :no-reset="noReset"
      :export-enabled="exportOptions_.enabled && exportOptions_.btnLocation === 'querybar'"
      :export-btn-code="exportOptions_.btnCode"
      @reset="onQueryBarReset"
    >
      <template v-slot>
        <slot name="querybar" />
      </template>
      <template v-slot:buttons>
        <slot name="querybar-buttons" :total="total" :selection="selection" />
      </template>
      <template v-slot:advanced>
        <slot name="querybar-advanced" />
      </template>
    </querybar>

    <section class="nm-list-body">
      <query-table
        ref="table"
        :rows="rows"
        :cols="cols"
        :span-method="spanMethod"
        :selection="selection"
        :row-key="rowKey"
        :tree-props="treeProps"
        :default-expand-all="defaultExpandAll"
        :no-clear-selection="noClearSelection"
        :show-summary="showSummary"
        :sum-text="sumText"
        :summary-method="summaryMethod"
      >
        <!-- 多选 -->
        <el-table-column v-if="multiple" fixed="left" align="center" type="selection" width="55" />

        <!-- 序号 -->
        <el-table-column v-if="showNo" fixed="left" align="center" type="index" :index="getNo">
          <template v-slot:header>
            <slot name="col-no-header">{{ serialNumberName || '#' }}</slot>
          </template>
          <template slot-scope="{ row, $index }">
            <div class="nm-list-no">
              <slot name="col-no" :row="row">{{ getNo($index) }}</slot>
            </div>
          </template>
        </el-table-column>

        <!-- 自动生成列 -->
        <template v-for="(col, i) in columns">
          <el-table-column
            v-if="col.show"
            :key="i"
            :prop="col.name"
            :width="col.width"
            :sortable="col.sortable"
            :type="col.type"
            :fixed="col.fixed"
            :align="col.align"
            :header-align="col.headerAlign"
            :show-overflow-tooltip="col.showOverflowTooltip"
          >
            <!--自定义头-->
            <template v-slot:header>
              <slot :name="`col-${col.name}-header`">
                <nm-icon v-if="col.icon" :name="col.icon" />
                {{ col.label }}
              </slot>
            </template>

            <template slot-scope="{ row }">
              <slot :name="'col-' + col.name" :row="row" :rows="rows">{{ format(row, col) }}</slot>
            </template>
          </el-table-column>
        </template>

        <!-- 操作列 -->
        <el-table-column v-if="!noOperation" :width="operationWidth" fixed="right" align="center" label="操作">
          <template v-slot:header>
            <slot name="col-operation-header">操作</slot>
          </template>
          <template slot-scope="{ row }">
            <div class="nm-list-operation">
              <slot name="col-operation" :row="row" :rows="rows" />
            </div>
          </template>
        </el-table-column>
      </query-table>
    </section>

    <!--footer-->
    <query-footer
      v-if="!noFooter"
      v-model="page"
      :page-sizes="pageSizes"
      :total="total"
      :columns.sync="columns"
      :no-select-column="noSelectColumn"
      :no-search-button-icon="noSearchButtonIcon"
      :reverse="footerReverse"
    >
      <slot name="footer" :total="total" :selection="selection" :data="data" />
    </query-footer>
    <slot />

    <!--导出-->
    <query-export v-if="exportAdvancedEnabled" :options="exportOptions_" :list-title="title" :cols="columns" :visible.sync="showExport" />
  </section>
</template>
<script>
import { mapState } from 'vuex'
import def from './default.js'
import QueryHeader from './components/header'
import Querybar from './components/querybar'
import QueryTable from './components/table'
import QueryFooter from './components/footer'
import QueryExport from './components/export'

export default {
  name: 'List',
  components: { QueryHeader, Querybar, QueryTable, QueryFooter, QueryExport },
  data() {
    return {
      loading_: false,
      fullscreen: false,
      // 分页数据
      page: {
        index: 1,
        size: this.pageSizes[0],
        sort: []
      },
      // 数据列表
      rows: [],
      // 扩展数据
      data: '',
      // 总数量
      total: 0,
      selection: [],
      showExport: false,
      columns: []
    }
  },
  props: {
    /** 标题 */
    title: String,
    /** 图标 */
    icon: String,
    // 查询方法
    action: {
      type: Function,
      required: true
    },
    /** 查询表单输入框宽度 */
    inputWidth: String,
    // 模型
    model: Object,
    /** 模型验证规则 */
    rules: Object,
    /** 高级查询 */
    advanced: Object,
    // 列数组
    cols: {
      type: Array,
      default() {
        return []
      }
    },
    /** 多选 */
    multiple: Boolean,
    /** 显示序号 */
    showNo: {
      type: Boolean,
      default: true
    },
    /** 不显示操作列 */
    noOperation: Boolean,
    /** 操作列宽度 */
    operationWidth: [String, Number],
    /** 不显示选择列按钮 */
    noSelectColumn: Boolean,
    /** 不显示查询栏 */
    noQuerybar: Boolean,
    /** 不显示全屏按钮 */
    noFullscreen: Boolean,
    /** 不显示刷新按钮 */
    noRefresh: Boolean,
    /** 不显示头部 */
    noHeader: Boolean,
    /** 不显示底部 */
    noFooter: Boolean,
    /** 不包含搜索功能 */
    noSearch: Boolean,
    /** 不显示查询按钮图标 */
    noSearchButtonIcon: Boolean,
    /**不显示重置按钮 */
    noReset: Boolean,
    /** 底部反转 */
    footerReverse: Boolean,
    /** 合并行列的方法 */
    spanMethod: Function,
    /** 加载中动画 */
    loading: Boolean,
    /** 加载中文本 */
    loadingText: String,
    /** 创建后执行一次查询 */
    queryOnCreated: {
      type: Boolean,
      default: true
    },
    /**导出配置 */
    exportOptions: Object,
    /** 页数选择项 */
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 50, 100]
      }
    },
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
  computed: {
    ...mapState('app/loading', { loadingText_: 'text', loadingBackground: 'background', loadingSpinner: 'spinner' }),
    ...mapState('app/config', { serialNumberName: s => s.component.list.serialNumberName }),
    class_() {
      return ['nm-list', this.fontSize ? `nm-list-${this.fontSize}` : '', this.fullscreen ? 'fullscreen' : '']
    },
    showLoading() {
      return this.loading || this.loading_
    },
    exportOptions_() {
      return this.$_.assignIn({ title: this.title }, def.exportOptions, this.exportOptions)
    },
    exportAdvancedEnabled() {
      return this.exportOptions_.enabled && this.exportOptions_.advanced
    }
  },
  methods: {
    /** 查询方法 */
    query() {
      if (this.$refs.querybar) {
        this.$refs.querybar.validate(() => {
          this.doQuery()
        })
      } else {
        this.doQuery()
      }
    },
    doQuery() {
      if (this.loading_) {
        return
      }

      this.loading_ = true
      let fullModel = Object.assign({}, this.model)

      // 设置分页
      fullModel.page = this.page

      this.action(fullModel)
        .then(data => {
          this.rows = data.rows
          this.total = data.total
          this.data = data.data

          // 回到顶部
          this.$refs.table.scrollTop()
          // 重新绘制布局
          this.$refs.table.doLayout()
          this.loading_ = false

          if (this.noClearSelection) {
            this.$nextTick(() => {
              this.rows.forEach(m => {
                if (!this.selection.every(n => n.id !== m.id)) {
                  this.$refs.table.toggleRowSelection(m, true)
                }
              })
            })
          }
          // 查询事件
          this.$emit('query', data)
        })
        .catch(() => {
          this.loading_ = false
        })
    },
    export_(exportModel) {
      if (!exportModel.columns || exportModel.columns.length < 1) {
        this._error('请选择要导出的列')
        return
      }
      if (!this.exportOptions_.action) {
        this._error('未设置导出方法')
        return
      }

      this._openLoading('正在导出数据，请稍后...')

      let model = Object.assign({}, this.model)

      // 设置分页
      model.page = this.page
      //设置导出信息
      model.export = exportModel
      this.exportOptions_
        .action(model)
        .then(() => {
          this._closeLoading()
        })
        .catch(() => {
          this._closeLoading()
        })
    },
    /** 刷新 */
    refresh(goFirst) {
      if (goFirst) this.page.index = 1
      this.query()
    },
    /** 查询表单重置 */
    reset() {
      this.$refs.querybar.reset()
    },
    /** 获取序号 */
    getNo(index) {
      return (this.page.index - 1) * this.page.size + index + 1
    },
    // 重新绘制布局
    doLayout() {
      this.$refs.table.doLayout()
    },
    /** 全屏切换 */
    triggerFullscreen() {
      this.fullscreen ? this.closeFullscreen() : this.openFullscreen()
      this.doLayout()
    },
    /** 开启全屏 */
    openFullscreen() {
      this.fullscreen = true
      this.$emit('fullscreen-change', this.fullscreen)
    },
    /** 关闭全屏 */
    closeFullscreen() {
      this.fullscreen = false
      this.$emit('fullscreen-change', this.fullscreen)
    },
    /** 切换导出对话框显示状态 */
    triggerExport() {
      let exp = this.exportOptions_
      //未启用高级，直接执行导出操作
      if (!exp.advanced) {
        const { format, mode, showTitle, showCopyright, showColName, showExportDate, showExportPeople } = exp

        let model = { format, mode, showTitle, showCopyright, showColName, showExportDate, showExportPeople }
        model.title = this.title
        model.fileName = `${this.title}_${this.$dayjs().format('YYYYMMDDHHmmss')}`
        model.columns = []

        this.columns.forEach(m => {
          if (m.show) {
            model.columns.push(this.listCol2ExportCol(m))
          }
        })

        this.export_(model)
      }

      this.showExport ? this.closeExport() : this.openExport()
    },
    /** 打开导出对话框 */
    openExport() {
      this.showExport = true
      this.$emit('export-change', this.showExport)
    },
    closeExport() {
      this.showExport = false
      this.$emit('export-change', this.showExport)
    },
    /** 列表的列转导出的列 */
    listCol2ExportCol(m) {
      let col = {
        name: m.name,
        label: m.label,
        align: m.align,
        format: m.format,
        width: 0
      }

      //设置导出专属vip配置~
      if (m.export.width > 0) {
        col.width = m.export.width
      } else {
        let w = parseInt(m.width)
        if (w) col.width = w / 10 + 4 //默认取列表页中设置的宽度，该宽度与导出的Excel的列宽度比例大概10:1，所以这里进行一下转换, 转换后在+4，保可以保证有内边距，不会挤在一起
      }
      return col
    },
    /** 查询栏重置事件 */
    onQueryBarReset() {
      this.$refs.table.clearSort()
      this.$emit('reset')
    },
    /** 删除行 */
    removeRow(row) {
      for (let i = 0; i < this.rows.length; i++) {
        if (this.rows[i] === row) {
          this.rows.splice(i, 1)
          this.total--
          break
        }
      }
    },
    /** 格式化 */
    format(row, col) {
      const val = row[col.name]
      if (!col.format) return val

      const format = col.format

      //性别
      if (format === 'sex') {
        return val === 0 ? '男' : '女'
      }

      //日期
      if (format === 'date') {
        return this.$dayjs(val).format('YYYY-MM-DD')
      }

      //自定义函数
      if (typeof format === 'function') {
        return format(val, row)
      }

      //日期
      return this.$dayjs(val).format(col.format)
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.queryOnCreated) {
        this.query()
      }
    })
  },
  created() {
    if (this.cols) {
      this.columns = this.cols.map(col => {
        return this.$_.assignIn({}, def.columnInfo, col)
      })
    }
  },
  activated() {
    this.doLayout()
  }
}
</script>
