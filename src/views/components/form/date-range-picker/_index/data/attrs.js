export default [
  {
    name: 'start',
    desc: '开始日期',
    type: 'String、Date',
    opt: '-',
    def: '默认当前月1号，需要加.sync修饰符'
  },
  {
    name: 'end',
    desc: '结束日期',
    type: 'String、Date',
    opt: '-',
    def: '默认今日，需要加.sync修饰符'
  },
  {
    name: 'size',
    desc: '尺寸，默认或者为空时，按照皮肤的字号设置',
    type: 'String',
    opt: 'medium / small / mini',
    def: '-'
  },
  {
    name: 'clearable',
    desc: '可清空的',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'width',
    desc: '宽度',
    type: 'String',
    opt: '-',
    def: '240px'
  }
]
