import { store } from '../../store'

// 按钮权限指令
const has = {
  inserted: (el, binding) => {
    // 如果编码为空则始终显示
    if (!binding.value) return

    // 验证是否开启按钮验证
    if (store.state.app.config.permission.button) {
      var buttons = store.state.app.account.buttons
      const code = binding.value
      if (buttons.every(c => c.toLowerCase() !== code.toLowerCase())) {
        el.parentNode.removeChild(el)
      }
    }
  }
}

export default {
  name: 'Has',
  directive: has
}
