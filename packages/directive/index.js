import lib from '../library'
import has from './has'

const directives = [has]

const install = {
  install: Vue => {
    directives.forEach(o => {
      Vue.directive(`${lib.prefix}${o.name}`, o.directive)
    })
  }
}
export default install
