const TerserPlugin = require('terser-webpack-plugin')
// 增加环境变量
process.env.VUE_APP_COPYRIGHT = '版权所有：尼古拉斯·老李 | 用代码改变世界 Powered by .Net Core 3.1.0 on Linux'
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYYMDHHmmss')
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_CUSTOM_SCRIPTS = ''

const isDev = process.env.NODE_ENV === 'development' // 开发环境

module.exports = {
  devServer: {
    port: 6220
  },
  publicPath: '/ui',
  transpileDependencies: ['netmodular.*', 'element-ui'],
  configureWebpack() {
    let config = {
      module: {
        rules: [
          {
            test: /^demo.vue$/,
            use: 'raw-loader'
          }
        ]
      }
    }

    if (!isDev) {
      //自定义代码压缩
      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: false,
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true
              }
            }
          })
        ]
      }
    }
    return config
  },
  chainWebpack: config => {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins.delete('prefetch').delete('preload')
  }
}
