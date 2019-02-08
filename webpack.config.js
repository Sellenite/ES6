const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
/** 
 * 由于使用import加载样式时，css文件是通过js代码生成的，这就导致js在加载完成前样式会有一段白屏时间
 * 为了解决这个问题，使用ExtractTextPlugin插件抽取独立的css样式，在style中引入
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
/**
 * 用于使用定义html的编译模板，多页面编译的时候会使用它
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

const getHtmlConfig = (name, title) => {
    return {
        template: './src/html/' + name + '.html',
        filename: 'html/' + name + '.html',
        title: title,
        favicon: './favicon.ico',
        // js文件插入到body最后
        inject: true,
        hash: true,
        // 定义js，有公共的js需要写成数组，并且需要放在前面，否则使用key-value
        // chunks: name，对应入口的name
        chunks: ['common', name]
    }
};

module.exports = {
    devtool: false,
    // 采用多页面写法，对象的key是下面的name属性
    entry: {
        'common': ['./src/js/common/index.js'],
        'youDontKnowJS': ['./src/js/youDontKnowJS/index.js'],
        'DOM': ['./src/js/DOM/index.js'],
        'interview-general': ['./src/js/interview-general/index.js'],
    },
    output: {
        // 输出文件
        filename: 'js/[name].js',
        // 指定资源文件引用的目录，会加在资源路径的前面，dev-server模式时需要定义一个，线上时需要定义线上的目录
        publicPath: '/dist/',
        // 输出文件地址，__dirname是获得当前config文件的绝对路径
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            // js/jsx文件的配置
            {
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // 使用多个处理的时候，会以最右边为最开始执行的loader，然后依次向左执行
                        presets: ['env'],
                        plugins: [
                            // 使用generator需要支持的插件，不用使用babel-polyfill，体积太大了
                            'transform-runtime',
                            // babel默认不支持原生构造函数的继承，需要插件支持
                            ["babel-plugin-transform-builtin-extend", {
                                globals: ["Error", "Array"],
                                // ES5 inheritance to approximate extending a class
                                approximate: true
                            }]
                        ]
                    }
                }
            },
            // css文件的配置
            {
                test: /\.css$/,
                // 有顺序之分，首先使用use，然后再使用fallback
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            // scss文件的配置，依赖node-sass和webpack
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // postcss用于做css兼容
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                autoprefixer({
                                    browsers: [
                                        "> 1%",
                                        "last 2 versions"
                                    ]
                                })
                            ]
                        }
                    }, 'sass-loader']
                })
            },
            // 图片的配置，url-loader依赖file-loader
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 大于8k的时候就会用原图片，否则使用base64
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            // 字体图标的配置
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 处理html文件的插件
        new HtmlWebpackPlugin(getHtmlConfig('youDontKnowJS', '你不知道的JavaScript')),
        new HtmlWebpackPlugin(getHtmlConfig('DOM', 'DOM')),
        new HtmlWebpackPlugin(getHtmlConfig('interview-general', '前端面试之道')),
        // 处理提取独立css的插件
        new ExtractTextPlugin('css/[name].css'),
        // 处理提取公共模块的插件，webpack自带，引用次数大于一定次数就会被加入进来
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: 'sourcemaps/[file].map',
            publicPath: '/dist/',
            fileContext: 'public'
        })
    ],
    devServer: {
        // 需要配置publicPath，才能正确引用资源文件
        port: 8081
        // 访问404时自动指向以下页面，虽然url没有强制变化，但内容是以下页面的内容
        // historyApiFallback: {
        //     index: '/dist/html/youDontKnowJS.html'
        // }
    }
};