/* webpack.config.js */

var webpack = require("webpack");

// 辅助函数
var utils = require("./utils");
var path = require("path");
var fullPath = utils.fullPath;
var pickFiles = utils.pickFiles;

// 项目根路径
var ROOT_PATH = fullPath("../");

// 项目源码路径
var SRC_PATH = path.join(ROOT_PATH + "/demo1");
// 产出路径
var DIST_PATH = path.join(ROOT_PATH + "/dist");

// 是否是开发环境
var __DEV__ = process.env.NODE_ENV !== "production";

// conf
var alias = pickFiles({
    id: /(conf\/[^\/]+).js$/,
    pattern: path.join(SRC_PATH + "/conf/*.js")
});

// components
alias = Object.assign(alias, pickFiles({
    id: /(components\/[^\/]+)/,
    pattern: path.join(SRC_PATH + "/components/*/index.js")
}));

// reducers
alias = Object.assign(alias, pickFiles({
    id: /(reducers\/[^\/]+).js/,
    pattern: path.join(SRC_PATH + "/js/reducers/*")
}));

// actions
alias = Object.assign(alias, pickFiles({
    id: /(actions\/[^\/]+).js/,
    pattern: path.join(SRC_PATH + "/js/actions/*")
}));


var config = {
    context: SRC_PATH,
    entry: {
        app: ["./app.js"],
        lib:[ 'react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-thunk']
    },
    output: {
        path: DIST_PATH,
        filename: "js/[name].js"
    },
    module: {},
    resolve: {
        alias: alias
    },
    plugins: [
        new webpack.DefinePlugin({
            // http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
        }),
        new webpack.optimize.CommonsChunkPlugin({name:'lib',filename:'js/lib.js'})
    ]
};

// 使用缓存
var CACHE_PATH = path.join(ROOT_PATH + "/cache");
// loaders
config.module.loaders = [];
// 使用 babel 编译 jsx、es6
config.module.loaders.push({
    test: /\.js$/,
    exclude: /node_modules/,
    include: SRC_PATH,
    // 这里使用 loaders ，因为后面还需要添加 loader
    loaders: ["babel-loader?presets[]=es2015"]
});

// 编译 sass
config.module.loaders.push({
    test: /\.(scss|css)$/,
    loaders: ["style", "css", "sass"]
});

// html 页面
var HtmlwebpackPlugin = require("html-webpack-plugin");
config.plugins.push(
    new HtmlwebpackPlugin({
        filename: "index.html",
        chunks:['app','lib'],
        template: path.join(SRC_PATH + "/index.html")
    })
);
module.exports = config;