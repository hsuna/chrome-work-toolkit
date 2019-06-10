const glob = require("glob")
const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

const styleLoaders = (loader, extract) => {
  const loaders = ['css-loader', loader].filter(Boolean);
  return extract ? ExtractTextPlugin.extract({
    use: loaders,
    fallback: 'vue-style-loader',
  }) : ['vue-style-loader'].concat(loaders)
}

module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  const outputPath = isEnvProduction ? path.resolve(__dirname, '../dist') : undefined

  return {
    name: isEnvProduction? '生产编译' : '开发编译',
    entry: Object.assign(
      ...glob.sync('./src/*.js').map(filepath => ({
        [path.basename(filepath, '.js')]:filepath
      }))
    ),
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    output: {
      path: outputPath,
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
            loaders: {
              css: styleLoaders('', isEnvProduction),
              postcss: styleLoaders('', isEnvProduction),
              less: styleLoaders('less-loader', isEnvProduction),
            },
            cacheBusting: true,
            transformToRequire: {
              video: ['src', 'poster'],
              source: 'src',
              img: 'src',
              image: 'xlink:href'
            },
          }
        },
        {
          test: /\.css$/,
          use: styleLoaders('', isEnvProduction),
        },
        {
          test: /\.less$/,
          use: styleLoaders('less-loader', isEnvProduction),
        },
      ]
    },
    optimization: isEnvProduction ? {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true
        })
      ],
    } : undefined,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${webpackEnv}"`
        }
      }),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        // 模板来源
        template: path.join(__dirname, '../public/popup.html'),
        // 文件名称
        filename: 'popup.html',
        // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
        chunks: ['popup'],
        inject: true,
        minify: isEnvProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }: undefined,
      }),
      ...(isEnvProduction ? [
        new CleanWebpackPlugin(),
        new ExtractTextPlugin({
          filename: 'css/[name].css',
          allChunks: true,
        }),
        new CopyWebpackPlugin([
          {
            from: path.join(__dirname, '../public'),
            to: outputPath,
            ignore: ['*.html']
          }
        ])
      ] : []),
    ]
  }
}