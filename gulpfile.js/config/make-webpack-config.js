var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = function(customConfig, NODE_ENV) {
    var BROWSERSLIST_CONFIG = ['ios >= 8', 'android >= 4', 'safari >= 6', 'chromw >= 34']
    var cssLoader = ['css', 'postcss']
    var scssLoader = cssLoader.concat(['sass'])

    var defaultConfig = {
        output: {
            path: path.resolve(__dirname, '../../dist'),
            filename: '[name].js',
            chunkFilename: '[chunkhash].js',
            sourceMapFilename: 'debugging/[file].map'
        },
        module: {
            rules: [{
                    'test': /\.css$/,
                    'use': ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "postcss-loader"]
                    })
                },
                {
                    'test': /\.scss$/,
                    'use': ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "postcss-loader"]
                    })
                },
                {
                    'test': /\.(js|jsx)$/,
                    'use': [{
                        'loader': 'babel-loader',
                        'options': {
                            'cacheDirectory': false,
                            'presets': ["es2015", "stage-0", "react"],
                            'plugins': ['transform-decorators-legacy']
                        }
                    }]
                },
            ],
        },
        resolve: {
            extensions: [
                '.js',
                '.jsx',
                '.web.js'
            ],
            modules: [
                'node_modules',
                './',
            ]
        },
        plugins: [
            new ExtractTextPlugin("styles.css"),
            new webpack.IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/),
        ],
        target: 'web'
    }

    customConfig.plugins = defaultConfig.plugins.concat(customConfig.plugins || [])

    var result = Object.assign({}, defaultConfig, customConfig)

    return result

}
