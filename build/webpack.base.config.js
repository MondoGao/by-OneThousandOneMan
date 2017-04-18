const { resolve } = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: resolve(__dirname, '../'),
  entry: {
    index: './src/index.js',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    filename: 'scripts/[name].[hash].js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpg|png|gif|ico|svg)/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'assets/[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'assets': resolve(__dirname, '../src/assets'),
      'components': resolve(__dirname, '../src/components'),
      'containers': resolve(__dirname, '../src/containers'),
      'actions': resolve(__dirname, '../src/actions'),
      'reducers': resolve(__dirname, '../src/reducers/'),
      'styles': resolve(__dirname, '../src/styles'),
      'sources': resolve(__dirname, '../src/sources')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new Webpack.ProvidePlugin({
      wx: 'weixin-js-sdk'
    })
  ]
}
