export default [
  {
    name: 'value/v-model',
    desc: '坐标值，如：{lng:116.11,lat:39.22}',
    type: 'Object',
    opt: '-',
    def: '-'
  },
  {
    name: 'title',
    desc: '标题，默认：坐标拾取',
    type: 'string',
    opt: '-',
    def: '-'
  },
  {
    name: 'icon',
    desc: '头部左侧的图标，默认：coordinate',
    type: 'string',
    opt: '-',
    def: '-'
  },
  {
    name: 'fullscreen',
    desc: '是否显示全屏按钮',
    type: 'boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'width',
    desc: '高度，与css中的width属性相同，如：100%、100px，默认 70%',
    type: 'string',
    opt: '-',
    def: ''
  },
  {
    name: 'height',
    desc: '高度，与css中的height属性相同，如：100%、100px，默认 80%',
    type: 'string',
    opt: '-',
    def: ''
  },
  {
    name: 'placeholder',
    desc: '默认值：请输入或选择坐标，如：116.404,39.915',
    type: 'string',
    opt: '-',
    def: '-'
  },
  {
    name: 'disabled',
    desc: '禁用',
    type: 'boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'allow-input',
    desc: '允许手动输入',
    type: 'boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'delay',
    desc: '查询延时，默认700ms',
    type: 'Number',
    opt: '-',
    def: '700'
  },
  {
    name: 'precision',
    desc: '保留小数位精度',
    type: 'Number',
    opt: '-',
    def: '3'
  },
  {
    name: 'search-page-capacity',
    desc: '查询时每页数量，默认15',
    type: 'Number',
    opt: '-',
    def: '15'
  },
  {
    name: 'scroll-wheel-zoom',
    desc: '启用滚轮放大缩小',
    type: 'boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'zoom',
    desc: '缩放级别',
    type: 'Number',
    opt: '-',
    def: '15'
  }
]
