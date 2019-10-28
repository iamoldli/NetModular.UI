import axios from 'axios'
import qs from 'qs'
import token from './token'
import { Message } from 'element-ui'
import { store } from '../store'
import { router } from '../router'

// 是否开发环境
const isDev = process.env.NODE_ENV !== 'production'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

function Http() {
  this.axios = axios
}

// 序列化参数为Url形式
Http.prototype.stringify = params => {
  return qs.stringify(params, {
    allowDots: true
  })
}

Http.prototype.post = (url, params, config) => {
  return axios.post(url, params, config)
}

Http.prototype.get = (url, params, config) => {
  const config_ = Object.assign({}, config, {
    // 参数
    params,
    // 修改参数序列化方法
    paramsSerializer: p => {
      // 使用逗号分隔参数
      return qs.stringify(p, {
        allowDots: true
      })
    }
  })
  return axios.get(url, config_)
}

Http.prototype.delete = (url, params, config) => {
  const config_ = Object.assign({}, config, {
    // 参数
    params,
    // 修改参数序列化方法
    paramsSerializer: p => {
      // 使用逗号分隔参数
      return qs.stringify(p, {
        allowDots: true
      })
    }
  })
  return axios.delete(url, config_)
}

Http.prototype.put = (url, params, config) => {
  return axios.put(url, params, config)
}

// 通用CRUD接口地址
Http.prototype.crud = root => {
  if (!root.endsWith('/')) {
    root += '/'
  }
  return {
    query(params) {
      return $http.get(`${root}query`, params)
    },
    add(params) {
      return $http.post(`${root}add`, params)
    },
    remove(id) {
      return $http.delete(`${root}delete`, { id })
    },
    edit(id) {
      return $http.get(`${root}edit`, { id })
    },
    update(params) {
      return $http.post(`${root}update`, params)
    }
  }
}

// 设为全局属性$http
if (!window.$http) window.$http = new Http()

// 初始化
export default config => {
  // 消息提醒显示时长(ms)
  const messageDuration = 1500

  // 接口根路径
  axios.defaults.baseURL = config.baseUrl

  // 拦截请求
  axios.interceptors.request.use(
    function(config) {
      let t = token.get()
      if (t && t.accessToken) {
        config.headers.Authorization = 'Bearer ' + t.accessToken
      }
      return config
    },
    function(error) {
      return Promise.reject(error)
    }
  )

  // 响应前拦截器
  axios.interceptors.response.use(
    response => {
      // 文件下载/预览
      if (response.request.responseType.toLowerCase() === 'blob') {
        // 如果响应头不包含'content-disposition'属性，则表示请求失败
        if (response.headers['content-disposition']) {
          const url = window.URL.createObjectURL(response.data)
          // 如果是预览直接返回，否则就是下载
          if (response.config.preview) {
            return url
          }

          const fileName = decodeURI(
            response.headers['content-disposition']
              .split(';')
              .find(m => m.trim().startsWith('filename='))
              .split('=')[1]
          )
            .replace('"', '')
            .replace('"', '')

          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } else {
          var reader = new FileReader()
          reader.onload = e => {
            var data = JSON.parse(e.target.result)
            if (data.code === 1) {
              return data.data
            } else {
              Message.error({
                message: data.msg,
                showClose: true,
                center: true,
                duration: messageDuration
              })
              return Promise.reject(data.msg)
            }
          }
          reader.readAsText(response.data)
        }
        return
      }

      if (response.data.code === 1) {
        return response.data.data
      } else {
        Message.error({
          message: response.data.msg,
          showClose: true,
          center: true,
          duration: messageDuration
        })
        return Promise.reject(response.data.msg)
      }
    },
    error => {
      let currentRoute = router.currentRoute
      let redirect = currentRoute.name !== 'login' ? currentRoute.fullPath : '/' // 跳转页面

      if (error && error.response) {
        switch (error.response.status) {
          case 401:
            // 删除token
            token.remove()
            router.push({
              name: 'login',
              query: {
                redirect
              }
            })
            break
          case 403:
            store.dispatch(
              'app/page/close',
              {
                fullPath: currentRoute.path,
                router: router,
                to: {
                  name: 'error403'
                }
              },
              { root: true }
            )
            break
          default:
            if (isDev) {
              console.error(error.response.data.msg)
            }

            Message.error({
              message: '系统异常，请联系管理员~',
              duration: messageDuration
            })
            break
        }
      } else {
        if (currentRoute.name === 'login') {
          Message.error({
            message: '无法连接网络~',
            duration: messageDuration
          })
        } else {
          token.remove()
          router.push({ name: 'login', query: { redirect } })
        }
      }
      return Promise.reject(error)
    }
  )
}
