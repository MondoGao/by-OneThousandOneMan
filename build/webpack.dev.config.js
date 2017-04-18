const {resolve} = require('path')
const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

module.exports = WebpackMerge(baseConfig, {
  entry: {
    index: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      'whatwg-fetch',
      './src/index.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('develop')
    })
  ],
  devServer: {
    hot: true,
    contentBase: './dist',
    publicPath: '/',
    port: 8080,
    host: '0.0.0.0',
    compress: true
  }
})