// 全局混入
import message from './global/message'
import fontSize from './global/fontSize'
import _loading from './global/loading'
import setTabName from './global/setTabName'

// 局部混入
import dialog from './components/dialog'
import select from './components/select'
import drawer from './components/drawer'
import formDialogEdit from './components/form-dialog-edit'
import loading from './components/loading'
import formSave from './components/form-save'
import visible from './components/visible'
import list from './components/list'

export default {
  global(Vue) {
    // 消息提示
    Vue.mixin(message)

    // 字号
    Vue.mixin(fontSize)

    // 设置loading
    Vue.mixin(_loading)

    //设置标签导航名称
    Vue.mixin(setTabName)
  },
  components: {
    dialog,
    select,
    drawer,
    formDialogEdit,
    loading,
    formSave,
    visible,
    list
  }
}
