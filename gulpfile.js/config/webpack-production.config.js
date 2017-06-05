var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var colros = require('colors')

module.exports = require('./make-webpack-config.js')({
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        function() {
            this.plugin('done', function(state) {
                if (state.compilation.errors && state.compilation.errors.length) {
                    console.log('出错啦！！！！'.yellow)
                    state.compilation.errors.every(function(err) {
                        console.log(err.message.red)
                    })
                    process.exit(1)
                }
            })
        },
    ]
}, 'production')
