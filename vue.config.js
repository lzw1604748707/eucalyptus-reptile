const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
// 判断当前运行环境
const isDevelopment = process.env.NODE_ENV !== 'production'
// 判断当前运行脚本是否analyzer
const isAnalyzer = process.env.npm_lifecycle_event === 'analyzer'

module.exports = {
  // 基础地址
  publicPath: isDevelopment ? '/' : '',
  // 是否生成map文件
  productionSourceMap: false,
  // 开发服务器配置
  devServer: {
    // 启用gzip压缩
    compress: true,
    // 运行端口
    port: 8080
  },
  // webpack相关配置
  configureWebpack: () => {
    const config = {
      //警告 webpack 的性能提示
      performance: {
        hints: isDevelopment ? 'warning' : 'error',
        //入口起点的最大体积
        maxEntrypointSize: 50000000,
        //生成文件的最大体积
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
          return assetFilename.endsWith('.js')
        }
      },
      plugins: [
        // 打包文件头注释
        new webpack.BannerPlugin({
          banner: `Builder: Eucalyptus \n Build time: ${new Date()}`
        }),
        // 自动导入模块
        new webpack.ProvidePlugin({
          moment: 'moment',
          Cookies: 'js-cookie',
          _: 'lodash'
        }),
        // 替换上下文中的指定字符串
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
      ]
    }
    // 判断是否分析环境，是则生成分析图
    if (isAnalyzer) config.plugins.push(new BundleAnalyzerPlugin())
    return config
  }
}
