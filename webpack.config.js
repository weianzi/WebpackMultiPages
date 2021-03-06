var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpackConfig = {
    devServer: {
        outputPath: './'
    },
    entry: {
        index: ['./js/index.js'],
        list: ['./js/list.js'],
        detail: ['./js/detail.js']
    },
    output: {
        path: path.resolve(__dirname, 'dest'),
        filename: 'js/[hash:8].[name].js'
    },
    //devtool: 'source-map',
    module: {
        loaders: [
        {
            test: /\.js?$/,
            //排除目录,exclude后将不匹配
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015'
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, 
        {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('css!less')
        },
        {
            test: /\.json$/,
            loader: 'json'
        }]
    },
    resolve: {
        alias: {
            //jquery: path.join(__dirname, 'src/js/libs/jquery1.8.3')
        }
    },
    plugins: [
        new ExtractTextPlugin('css/[contenthash:8].[name].css', {
            //allChunks: true
        }),
        new CommonsChunkPlugin({
            name: 'vendors',
            chunks: ['index', 'list', 'detail'],
            // minChunks是指一个文件至少被require几次才会被放到CommonChunk里，
            // 如果minChunks等于2，说明一个文件至少被require两次才能放在CommonChunk里
            minChunks: 2 // 提取所有chunks共同依赖的模块    
        }),
        //js文件插入index.html底部
        new HtmlWebpackPlugin({
            inject: 'body',
            chunks: ['vendors', 'index'],
            filename: 'index.html',
            template: 'index.html',
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            chunks: ['vendors', 'list'],
            filename: 'list.html',
            template: 'list.html',
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            chunks: ['vendors', 'detail'],
            filename: 'detail.html',
            template: 'detail.html',
        }),
       new CopyWebpackPlugin([
            { from: 'js/libs/jquery.min-1.9.1.js', to: 'js/libs/jquery.min-1.9.1.js' },
            { from: 'js/libs/bootstrap.min.js', to: 'js/libs/bootstrap.min.js' },
            { from: 'js/libs/html5shiv.min.js', to: 'js/libs/html5shiv.min.js' },
            { from: 'js/libs/respond.min.js', to: 'js/libs/respond.min.js' },
            { from: 'css/bootstrap.min.css', to: 'css/bootstrap.min.css' },
            { from: 'img', to: 'img' },
            { from: 'fonts', to: 'fonts' },
            { from: 'video', to: 'video' }
        ]),
        //以下代码为压缩代码插件,在打包的时候用,开发环境下会减慢编译速度
        new webpack.optimize.UglifyJsPlugin({
        //这里是去除错误提示的配置
            compress: {
                warnings: false
            },
            minimize: true
        }),
        new webpack.DefinePlugin({
              'process.env': {
                  'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
              }
        }),
    ]
}

module.exports = webpackConfig;
