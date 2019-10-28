import store from './store'
import routes from './routes'

export default {
  module: {
    name: 'nm-module-admin',
    code: 'admin',
    version: '1.0.0',
    description: '权限管理'
  },
  routes,
  store
}
