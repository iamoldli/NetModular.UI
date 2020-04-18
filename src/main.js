import Vue from 'vue'
import Skins from '../packages/index'
import './components'
import actions from './api/actions'
import { getUI } from './api/config'
import 'highlight.js/styles/darkula.css'
import VueHighlightJS from 'vue-highlightjs'
import Vuep from 'vuep'
import 'vuep/dist/vuep.css'
import './style/element-ui.scss'
import Admin from './index'

// 代码高亮插件
Vue.use(VueHighlightJS)

// 在线编辑预览代码插件
Vue.use(Vuep /*, { codemirror options } */)

// 获取系统信息
getUI().then(config => {
  let modules = [Admin]

  window.loaded = true
  const t = setInterval(() => {
    if (window.loadProgress > 98) {
      clearInterval(t)
      Skins.configApi({ baseUrl: '' })
      Skins.use({ config, modules, actions })
    }
  }, 20)
})
