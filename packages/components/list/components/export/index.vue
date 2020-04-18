<template>
  <component v-bind:is="`nm-${options.showMode || 'drawer'}`" header footer draggable :padding="10" :title="title" :icon="icon" :width="width" :height="height" :visible.sync="visible_">
    <el-form ref="form" :model="model" :rules="rules" :size="fontSize" label-width="120px">
      <el-form-item label="显示标题：" prop="showTitle">
        <el-switch v-model="model.showTitle"> </el-switch>
      </el-form-item>
      <el-form-item v-if="model.showTitle" label="标题内容：" prop="title">
        <el-input v-model="model.title" clearable> </el-input>
      </el-form-item>
      <el-form-item label="文件名称：" prop="fileName">
        <el-input v-model="model.fileName">
          <template slot="append">{{ ext }}</template>
        </el-input>
      </el-form-item>
      <el-form-item label="导出格式：" prop="format">
        <el-radio-group v-model="model.format">
          <el-radio :label="0">xlsx</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="导出模式：" prop="mode">
        <el-radio-group v-model="model.mode">
          <el-radio :label="0">当前条件所有数据</el-radio>
          <el-radio :label="1">当前页数据</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设置列：">
        <el-table ref="table" :data="columns" border stripe size="mini" max-height="400" @selection-change="onSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="字段"></el-table-column>
          <el-table-column prop="label" label="列名">
            <template v-slot="{ row }">
              <el-input v-model="row.label" />
            </template>
          </el-table-column>
          <el-table-column prop="width">
            <template slot="header"
              >宽度 <el-tooltip effect="dark" content="0表示自适应" placement="top"> <i class="el-icon-info nm-size-15 nm-text-warning"> </i></el-tooltip
            ></template>
            <template v-slot="{ row }">
              <el-input type="number" v-model.number="row.width" />
            </template>
          </el-table-column>
          <el-table-column prop="align" label="对齐方式">
            <template v-slot="{ row }">
              <el-select v-model="row.align" placeholder="请选择">
                <el-option label="居左" value="left"> </el-option>
                <el-option label="居中" value="center"> </el-option>
                <el-option label="居右" value="right"> </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="format">
            <template slot="header"
              >格式化 <el-tooltip effect="dark" content="如日期：yyyy-MM-dd" placement="top"> <i class="el-icon-info nm-size-15 nm-text-warning"> </i></el-tooltip
            ></template>
            <template v-slot="{ row }">
              <el-input v-model="row.format" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-collapse>
        <el-collapse-item>
          <template slot="title"
            ><span class="nm-p-l-10">
              <i class="el-icon-s-tools nm-size-16" style="position: relative;top: 2px;"></i>
              高级选项</span
            >
          </template>
          <el-row>
            <el-col :span="8">
              <el-form-item label="显示列名：" prop="showColName">
                <el-switch v-model="model.showColName"> </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="显示导出日期：" prop="showExportDate">
                <el-switch v-model="model.showExportDate"> </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="显示导出人：" prop="showExportPeople">
                <el-switch v-model="model.showExportPeople"> </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="显示版权：" prop="showCopyright">
            <el-switch v-model="model.showCopyright"> </el-switch>
          </el-form-item>
          <el-form-item v-if="model.showCopyright" label="版权信息：" prop="copyright">
            <el-input :value="copyright" disabled />
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>

    <!--底部-->
    <template v-slot:footer>
      <nm-button type="success" text="导出" @click="onExport" />
      <nm-button type="info" text="取消" @click="hide" />
    </template>
  </component>
</template>
<script>
import dialog from '../../../../mixins/components/dialog'
import { mapState } from 'vuex'
export default {
  mixins: [dialog],
  data() {
    return {
      title: '导出数据',
      icon: 'export',
      width: '800px',
      height: '500px',
      model: {
        columns: [],
        showTitle: true,
        title: '',
        fileName: '',
        format: 0,
        mode: 0,
        showCopyright: false,
        showColName: true,
        showExportDate: false,
        showExportPeople: false
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'change' }],
        fileName: [{ required: true, message: '请输入文件名称', trigger: 'change' }]
      },
      columns: []
    }
  },
  props: {
    cols: Array,
    /**导出显示模式 */
    options: Object
  },
  computed: {
    ...mapState('app/config', { copyright: s => s.system.copyright }),
    ext() {
      return '.xlsx'
    }
  },
  methods: {
    /**初始化 */
    init() {
      const { title, format, mode, showTitle, showCopyright, showColName, showExportDate, showExportPeople } = this.options

      this.model.title = title
      this.model.fileName = `${title}_${this.$dayjs().format('YYYYMMDDHHmmss')}`
      this.model.format = format
      this.model.mode = mode
      this.model.showTitle = showTitle
      this.model.showCopyright = showCopyright
      this.model.showColName = showColName
      this.model.showExportDate = showExportDate
      this.model.showExportPeople = showExportPeople
      this.columns = this.cols.map(m => {
        let col = this.$parent.listCol2ExportCol(m)
        //把已显示的加到选中列表
        if (m.show) {
          this.model.columns.push(col)
        }
        return col
      })

      this.$nextTick(() => {
        //设置已选择的列
        this.model.columns.map(m => {
          this.$refs.table.toggleRowSelection(m)
        })
      })
    },
    onSelectionChange(val) {
      this.model.columns = val
    },
    onExport() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.$parent.export_(this.model)
        }
      })
    }
  },
  created() {
    this.init()
  }
}
</script>
