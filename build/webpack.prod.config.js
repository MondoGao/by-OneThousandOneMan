const { resolve } = require('path')
const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const baseConfig = require('./webpack.base.config')

module.exports = WebpackMerge(baseConfig, {
  entry: {
    index: [
      'whatwg-fetch',
      './src/index.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use:
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?minimize&modules&localIdentName=[name]__[local]-[hash:base64:5]',
              'postcss-loader',
              'sass-loader'
            ]
          })
      },
      {
        test: /\.css$/,
        use:
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?minimize',
              'postcss-loader'
            ]
          })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles/[name].[hash].css'
    }),
    new Webpack.optimize.UglifyJsPlugin({
      sourceMap: 'cheap-module-source-map',
      beautify: false,
      mangle: {
        screw_ie8: true,
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ImageminPlugin()
  ]
})