// 全局混入
import message from './global/message'
import fontSize from './global/fontSize'
import _loading from './global/loading'
import setTabName from './global/setTabName'

// 局部混入
import dialog from './components/dialog'
import select from './components/select'
import drawer from './components/drawer'
import loading from './components/loading'
import formDialogEdit from './components/form-dialog-edit'
import formSave from './components/form-save'
import formReadonly from './components/form-readonly'
import visible from './components/visible'
import list from './components/list'
import treeSelect from '../../packages/components/tree-select/mixins.vue'
import button from './components/button'
import radio from './components/radio.vue'
import checkbox from './components/checkbox.vue'

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
    formReadonly,
    visible,
    list,
    treeSelect,
    button,
    radio,
    checkbox
  }
}
