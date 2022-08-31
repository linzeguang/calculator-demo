const { override, addWebpackAlias, addWebpackPlugin, useBabelRc } = require('customize-cra')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const path = require('path')

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  // alias
  addWebpackAlias({
    // 加载模块的时候，可以使用“@”符号来进行简写啦~
    '@': path.resolve(__dirname, './src/'),
  }),
  // 注意是production环境启动该plugin
  process.env.NODE_ENV === 'production' &&
    addWebpackPlugin(
      new UglifyJsPlugin({
        // 开启打包缓存
        cache: true,
        // 开启多线程打包
        parallel: true,
        uglifyOptions: {
          // 删除警告
          warnings: false,
          // 压缩
          compress: {
            // 移除console
            drop_console: true,
            // 移除debugger
            drop_debugger: true,
          },
        },
      }),
    ),
  // 判断环境变量ANALYZER参数的值
  process.env.ANALYZER && addWebpackPlugin(new BundleAnalyzerPlugin()),
  // 打包进度条
  addWebpackPlugin(new ProgressBarPlugin()),
)
