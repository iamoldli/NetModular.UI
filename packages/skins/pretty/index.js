import store from './store'
import component from './index.vue'
import preview from './preview.png'

export default {
  component,
  store,
  options: {
    name: '靓丽',
    code: 'pretty',
    preview,
    themes: [
      {
        name: 'default',
        color: '#03a9f4'
      },
      {
        name: 'blue-light',
        color: '#e4e7ed'
      },
      {
        name: 'green',
        color: '#00a65a'
      },
      {
        name: 'green-light',
        color: '#e4e7ed'
      },
      {
        name: 'orange',
        color: '#e6a23c'
      },
      {
        name: 'orange-light',
        color: '#e4e7ed'
      },
      {
        name: 'pink',
        color: 'rgb(114, 46, 209)'
      },
      {
        name: 'pink-light',
        color: '#e4e7ed'
      }
    ]
  }
}
