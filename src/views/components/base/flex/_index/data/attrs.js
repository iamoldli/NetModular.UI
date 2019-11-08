export default [
  {
    name: 'direction',
    desc: '布局方向，对应flex-direction属性',
    type: 'String',
    opt: 'column/row',
    def: 'column'
  },
  {
    name: 'fix',
    desc: '固定宽度或高度',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'fix-mode',
    desc: '固定模式',
    type: 'top、bottom、left、right',
    opt: '-',
    def: 'top'
  },
  {
    name: 'height',
    desc: '高度',
    type: 'String',
    opt: '-',
    def: '100%'
  },
  {
    name: 'gutter',
    desc: '间隔',
    type: 'Number',
    opt: '-',
    def: '-'
  }
]
