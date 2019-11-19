import lib from '../library'

let components = []
let loginComponents = []
const requireComponent = require.context('../components', true, /index\.(vue|js)$/)
requireComponent
  .keys()
  .filter(item => item !== './index.js')
  .forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    if (componentConfig.default && componentConfig.default.name) {
      components.push(componentConfig.default)

      // 登录组件
      if (fileName.includes('login-')) {
        loginComponents.push(fileName.split('/')[1].split('-')[1])
      }
    }
  })
export default function(Vue) {
  components.forEach(component => {
    Vue.component(`${lib.prefix}${component.name}`, component)
  })
}

export { loginComponents }
