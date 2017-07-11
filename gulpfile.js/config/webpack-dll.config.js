var path = require('path');
var webpack = require('webpack');

var vendors = [
  "react",
  "react-dom",
  "classnames",
  "redux",
  "react-redux",
  "redux-thunk"
];

module.exports = {
  entry: {
    'vendors': vendors,
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].bundle.js',
    library: '[name]',
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.DllPlugin({
      path: 'manifest.json',  // mainfest.json 文件的输出路径放到根目录下，此文件会用于后续的业务代码打包
      name: '[name]', // dll 暴露的对象名字，要和 output.library 名字相同
      context: __dirname, // context 是解析包的上下文，要与 webpack.config.js 一直
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  ]
}
