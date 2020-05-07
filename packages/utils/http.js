import axios from 'axios'
import qs from 'qs'
import dayjs from 'dayjs'
import token from './token'
import { Message, MessageBox } from 'element-ui'
import { store } from '../store'
import { router } from '../router'

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

Http.prototype.download = (url, params, config) => {
  const config_ = Object.assign({ responseType: 'blob' }, config, {
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

Http.prototype.preview = (url, params, config) => {
  const config_ = Object.assign({ responseType: 'blob', headers: { preview: true } }, config, {
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

Http.prototype.export = (url, params, config) => {
  return axios.post(url, params, Object.assign({ responseType: 'blob' }, config))
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

// 消息提醒显示时长(ms)
const messageDuration = 1500
//是否显示了账户在其他地方登录的提示框
let showLoginOnOtherPlaces = false

//处理文件下载请求
const handleDownload = response => {
  //如果返回的是application/json，则表示返回的是json，没有要下载的问题，可能是逻辑处理失败
  if (response.data.type === 'application/json') {
    var reader = new FileReader()
    reader.onload = e => {
      var data = JSON.parse(e.target.result)
      if (data.code === 1) {
        return data.data
      } else {
        Message.error({
          message: data.msg,
          showClose: true,
          duration: messageDuration
        })
        return
      }
    }
    reader.readAsText(response.data)
    return
  }

  const url = window.URL.createObjectURL(response.data)

  // 如果是预览直接返回
  if (response.config.headers['preview']) return url

  let fileName = ''
  // 如果响应头包含'content-disposition'属性，则从该属性中获取文件名称
  let cd = response.headers['content-disposition']
  if (cd) {
    fileName = decodeURI(cd.split("''")[1])
  }

  //如果文件名不存在，则使用时间戳
  if (!fileName) {
    fileName = dayjs().format('YYYYMMDDHHMMSSS')
  }

  //通过模拟a标签点击事件下载文件
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

//刷新令牌
const refreshToken = () => {
  let t = token.get()
  if (t && t.refreshToken) {
    return store.state.app.system.actions.refreshToken(t.refreshToken)
  }

  Promise.reject('refresh token error')
}

// 初始化
export default config => {
  // 接口根路径
  axios.defaults.baseURL = config.baseUrl

  // 拦截请求
  axios.interceptors.request.use(
    config => {
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
      const { config } = response
      // 文件下载/预览
      if (config.responseType && config.responseType === 'blob') {
        return handleDownload(response)
      }

      if (response.data.code === 1) {
        return response.data.data
      } else if (response.data.code === 0 && !config.noErrorMsg) {
        Message.error({
          message: response.data.msg,
          showClose: true,
          duration: messageDuration
        })
        return Promise.reject(response.data.msg)
      } else {
        return response.data
      }
    },
    error => {
      let currentRoute = router.currentRoute
      let redirect = currentRoute.name !== 'login' ? currentRoute.fullPath : '/' // 跳转页面
      if (error && error.response) {
        switch (error.response.status) {
          case 401:
            return refreshToken()
              .then(data => {
                //重新初始化令牌
                store.commit('app/token/init', data)
                //重新发一起一次上次的的请求
                error.config.headers.Authorization = 'Bearer ' + data.accessToken
                return axios.request(error.config)
              })
              .catch(() => {
                // 如果刷新失败，需要删除token并跳转到登录页面
                token.remove()
                router.push({
                  name: 'login',
                  query: {
                    redirect
                  }
                })
              })
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
          case 622:
            //单账户登录功能
            if (!showLoginOnOtherPlaces) {
              showLoginOnOtherPlaces = true
              MessageBox.confirm('账户已在别处登录, 请重新登录~', '提示', {
                confirmButtonText: '确定',
                type: 'warning',
                showCancelButton: false,
                callback() {
                  // 删除token
                  token.remove()
                  router.push({
                    name: 'login',
                    query: {
                      redirect
                    }
                  })
                  showLoginOnOtherPlaces = false
                }
              })
            }
            break
          default:
            console.error(error.response.data.msg)
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
