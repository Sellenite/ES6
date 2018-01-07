/* webpack-dev-server版本太高，换成2.6.1版本就好了，我看了报错信息，babel-loader好像不能把高版本webpack-dev-server的es6，如const转换成es5，在ie就报错了 */
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

function getHtmlConfig(name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        inject: true,
        hash: true,
        // 定义js
        chunks: ['common', name]
    }
}

var config = {
    // 采用多页面写法
    entry: {
        'common': ['./src/common/index.js'],
        'chapter2': ['./src/page/chapter2/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // 多个css单独打包插件
        new ExtractTextPlugin("css/[name].css"),
        // html模板处理，他会自动将link和script读取
        new HtmlWebpackPlugin(getHtmlConfig('chapter2', '第二章')),
    ],
    module: {
        loaders: [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader", "style-loader")
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(gif|png|jpg)\??.*$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'resource/images/[name].[ext]'
                }
            }
        ]
    },
    devServer: {
        inline: true,
        port: 8080
    }
};

// 执行 set WEBPACK_ENV=dev 会通过的条件
if ('dev' === WEBPACK_ENV) {

}

module.exports = config