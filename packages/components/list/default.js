// 默认列信息
const columnInfo = {
  // 列的字段名称
  name: '',
  // 列的显示名称
  label: '',
  // 宽度
  width: '',
  // 排序
  sortable: false,
  // 固定列
  fixed: false,
  // 对其方式
  align: 'center',
  // 表头对其方式
  headerAlign: 'center',
  // 是否显示
  show: true,
  // 格式化，暂时针对日期，采用dayjs组件 https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/API-reference.md
  format: '',
  // 当内容过长被隐藏时显示 tooltip
  showOverflowTooltip: true,
  //导出配置
  export: {
    //导出列宽
    width: 0
  }
}

//默认导出配置
const exportOptions = {
  /**启用导出功能 */
  enabled: false,
  /**导出数据的方法 */
  action: null,
  /**开启高级选项 */
  advanced: false,
  /**高级选项显示模式，drawer/dialog */
  showMode: 'drawer',
  /**按钮位置，tool：右上角工具栏 querybar：查询栏里面 */
  btnLocation: 'tool',
  /**按钮编码，用于控制按钮权限 */
  btnCode: '',
  /**默认导出格式 */
  format: 0,
  /**默认导出模式 */
  mode: 0,
  /**默认是否显示标题 */
  showTitle: true,
  /**默认是否显示版权信息 */
  showCopyright: false,
  /**默认是否显示列名 */
  showColName: true,
  /**默认是否显示导出日期 */
  showExportDate: false,
  /**默认是否显示导出人 */
  showExportPeople: false
}

export default {
  columnInfo,
  exportOptions
}
