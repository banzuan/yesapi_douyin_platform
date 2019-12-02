const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',//publicPath取代了baseUrl
    outputDir: 'dist',
    lintOnSave: true,
    // 是否为生产环境构建生成 source map？
    productionSourceMap: false,
    runtimeCompiler: true, //关键点在这  原来的 Compiler 换成了 runtimeCompiler
    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    chainWebpack: (config) => {},
    configureWebpack: () => {},
    // 配置 webpack-dev-server 行为。
    devServer: {
      open: process.platform === 'darwin',
      host: '0.0.0.0',
      port: 8080,
      // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
      proxy: {
        api: {
          target: "http://top-api.yesapi.top/", // 域名
          ws: true, // 是否启用websockets
          changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
          pathRequiresRewrite: {
            "^/api": "/"
          },
        before: app => {}
      }
    }
  }
    
  }