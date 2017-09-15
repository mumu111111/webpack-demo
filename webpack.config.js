
const path = require('path'),
webpack = require("webpack"),
//CopyWebpackPlugin = require('copy-webpack-plugin'),
ExtractTextPlugin = require("extract-text-webpack-plugin"),
//WebpackNotifierPlugin = require('webpack-notifier');
UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
HtmlWebPlugin= require('html-webpack-plugin');


module.exports={
    
//入口    
    entry: './src/js/index.js',
//导出
    output:{
       //导出目录   导出文件名
        path: path.resolve(__dirname, 'dist'),
        //hashDigestlength:2,  //hash位数
        filename: '_[name].js',
       
        //处理包规范格式
        // libraryTarget: 'umd',
        // library: 'MyLibrary'

       
    },
   

   
    //插件
    plugins:[
    
       // $ 代替 jQuery
        // new webpack.providePlugin({
        //     $: 'jquery'
        // }),

        //编译成功时 提示 
        // new WebpackNotifierPlugin({
        //     title: 'webpack 编译成功',
        //     contentImage: path.resolve(process.cwd(), './img/avatar.jpeg'),
        //     alwaysNotify: true
        // }),

        //其他less等文件   转码  生成css文件
        new ExtractTextPlugin('_[name].css'),
            //disable: false,
            //allchunks= true
        
    //提取公共模块  到 common.js 
        // new webpack.optimize.CommonChunkPlugin({
        //     name:'common',
        //     minChunks: Infinity
        // })
        //压缩js
        new UglifyJSPlugin(),
        new HtmlWebPlugin({
            template: 'index.html'
        })
    ],


//模块
    module:{
        rules:[

            {
                test: /\.css$/,
                use:  ExtractTextPlugin.extract({
                    fallback :'style-loader',
                    use: 'css-loader'
                })
            },
            //js[x]文件  编译内容后 依旧是js文件 所以不需要 ExtractTextPlugin
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },


            // {
            //     test: /\.less$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback:'style-loader',
            //         use:['css-loader',{
            //             loader:'less-loader',
            //             options: {
            //                sourceMap: true
            //             }
            //         }]
            //     })
            // },
            
            // {
            //     test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback:'style-loader',
            //         use:['css-loader',{
            //             loader:'sass-loader',
            //             options: {
            //                sourceMap: true
            //             }
            //         }]
            //     })
            // },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options:{
                        name:'[name]_[sha512:hash:base64:7].[ext]'
                    }

                }
            // },
            // {
            //     test: /\.html/,
            //     use:{
            //         loader:"html-loader",
            //         options:{
            //             minimize: false,
            //             attrs:false
            //         }
                // }
            },
            {
                test: /\.(woff|svg|eot|ttf)$/i,
                use: {
                    loader: 'url-loader'
                }

            }
           
           
        ]
    }




}