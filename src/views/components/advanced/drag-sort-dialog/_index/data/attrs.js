export default [
  {
    name: 'visible',
    desc: '是否显示',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'title',
    desc: '标题',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'icon',
    desc: '图标',
    type: 'String',
    opt: '-',
    def: 'sort'
  },
  {
    name: 'width',
    desc: '宽度',
    type: 'String',
    opt: '-',
    def: '400px'
  },
  {
    name: 'height',
    desc: '高度',
    type: 'String',
    opt: '-',
    def: '60%'
  },
  {
    name: 'query-action',
    desc: '查询数据方法',
    type: 'Function',
    opt: '-',
    def: '-'
  },
  {
    name: 'update-action',
    desc: '更新数据方法',
    type: 'Function',
    opt: '-',
    def: '-'
  },
  {
    name: 'close-on-success',
    desc: '保存成功后关闭',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  }
]
