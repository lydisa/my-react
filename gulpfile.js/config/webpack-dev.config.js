var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var colros = require('colors')

module.exports = require('./make-webpack-config.js')({
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("dev")
      }
    }),
    new ExtractTextPlugin("[name].css")
  ]
}, 'dev')
