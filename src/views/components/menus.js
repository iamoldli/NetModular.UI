import { loadMenu } from '@/utils/menus-loader'

// 基础组件菜单
const propertyPath = '_index/page.js'
let componentMenus = [
  {
    name: '基础组件',
    type: 0,
    icon: 'database',
    level: 1,
    show: true,
    children: []
  },
  {
    name: '表单组件',
    type: 0,
    icon: 'form',
    level: 1,
    show: true,
    children: []
  },
  {
    name: '高级组件',
    type: 0,
    icon: 'product',
    level: 1,
    show: true,
    children: []
  },
  {
    name: '地图组件',
    type: 0,
    icon: 'chart-map',
    level: 1,
    show: true,
    children: []
  }
]
const requireComponent = require.context('./', true, /\page.js$/)

requireComponent
  .keys()
  .filter(m => m.endsWith(propertyPath))
  .sort((a, b) => {
    let pageA = requireComponent(a).default
    let pageB = requireComponent(b).default
    return pageA.sort > pageB.sort ? 1 : -1
  })
  .map(fileName => {
    // 先加载组件属性页面
    let page = requireComponent(fileName).default
    let indexMenu = loadMenu({
      type: 0,
      name: page.title,
      icon: page.icon,
      level: 2,
      show: true,
      children: []
    })
    let parentPath = fileName.replace(propertyPath, '')
    requireComponent
      .keys()
      .filter(f => f.indexOf(parentPath) > -1)
      .map(subFile => {
        let page = requireComponent(subFile).default
        let menu = loadMenu({
          name: page.title,
          routeName: page.name,
          icon: page.icon,
          level: 3
        })
        if (subFile.endsWith(propertyPath)) {
          menu.name = '基础属性'
          menu.icon = 'property'
        }

        indexMenu.children.push(menu)
      })

    let group = page.group || 0
    componentMenus[group].children.push(indexMenu)
  })

export default componentMenus
