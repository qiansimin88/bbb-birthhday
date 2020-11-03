module.exports = {
  lintOnSave: false,
  publicPath: process.env.publicPath || './',
  pages: {
    index: {
      entry: 'src/pages/index',
      template: 'public/index.html',
      // filename: 'index.html',
      title: '胡大婷，生日快落👨‍❤️‍👨'
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
  devServer: {
    port: 8080,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      '/distributor': {
        target: 'xxx',
        changeOrigin: true,
        headers: {
          'origin': 'xxx'
        },
        cookieDomainRewrite: {
          '*': 'localhost'
        },
        pathRewrite: {
          '/distributor': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 75
          })
        ]
      }
    }
  }
}
