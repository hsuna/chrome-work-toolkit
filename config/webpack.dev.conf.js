const glob = require("glob")
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

entry = {}
glob.sync('./src/*.js').map(filepath => entry[path.basename(filepath, '.js')] = filepath)

module.exports = {
  name:'开发编译',
  entry,
  mode: "development",
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: "js/[name].js",
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: ['css-loader', 'postcss-loader', 'less-loader', 'vue-style-loader'],
          transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          },
        }
      },
      {
        test: /\.less$/,
        use: ['css-loader', 'postcss-loader', 'less-loader', 'vue-style-loader'],
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      // 模板来源
      template: path.join(__dirname, '../public/popup.html'),
      // 文件名称
      filename: 'popup.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['popup'],
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../public'),
        to: path.join(__dirname, '../build'),
        ignore: ['*.html']
      }
    ])
  ]
}