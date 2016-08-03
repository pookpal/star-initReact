var webpack = require('webpack');
var path = require('path');


var config = require('./web.config.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //��ȡCSS�ļ����
var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //�Զ�����������
var HtmlWebpackPlugin = require('html-webpack-plugin'); //��ȡhtml
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    devtool: 'source-map',

    // ���÷�����
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: "./dist", //���д�ϣ����򱨴�
        port: 8080
    },


    // �������
    entry:{
        "main": path.resolve(__dirname, 'src/entry/main.jsx'),
        "zh-CN": path.resolve(__dirname, 'src/entry/zh-CN.js'),
        "en-US": path.resolve(__dirname, 'src/entry/en-US.js'),
        "common": ['react','react-dom','react-router','redux','react-redux']
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        //publicPath: 'dist',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },

    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },

            // ֻ��srcĿ¼���less�ļ�Ӧ��CSS Module,�Զ����hash��׺
            { test: /\.less$/, include: [path.resolve(__dirname, 'src/components'),path.resolve(__dirname, 'src/views')], loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&localIdentName=[local]-[hash:base64:5]', 'less-loader') },

            { test: /\.less$/,exclude: [path.resolve(__dirname, 'src/components'),path.resolve(__dirname, 'src/views')],loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!' + 'autoprefixer-loader!' +`less`)},

            { test: /\.js[x]?$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192' },
            { test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url' }
        ]
    },

    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, './node_modules')],
        extensions: ['', '.js', '.jsx']
    },

    resolveLoader:{
        modulesDirectories: ['node_modules', path.join(__dirname, './node_modules')],
    },

    plugins: [

        new CopyWebpackPlugin([
            {
                context: './src/assets/images',
                from: '**/*',
                to: './assets/images'},
            {
                context: './src/assets/iconFont',
                from: '**/*',
                to: './assets/iconFont'
            },
            {
                context: './src/assets/data',
                from: '**/*',
                to: './assets/data'
            }
        ]),

        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),

        new ExtractTextPlugin("style.css"),

        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     "window.jQuery": "jquery"
        // }),

        new HtmlWebpackPlugin({
            title: 'demo', //����
            filename: './dist/index.html', //���ɵ�html���·��������� path
            template: './src/entry/index.html', //htmlģ��·��
            inject: true, //�������޸���Щ���ݣ�����head��body
            hash: true, //Ϊ��̬��Դ����hashֵ
            minify: { //ѹ��HTML�ļ�
                removeComments: true, //�Ƴ�HTML�е�ע��
                collapseWhitespace: false //ɾ���հ׷��뻻�з�
            }
        },
            {
                title: 'demo', //����
                filename: './dist/index-en.html', //���ɵ�html���·��������� path
                template: './src/entry/index-en.html', //htmlģ��·��
                inject: true, //�������޸���Щ���ݣ�����head��body
                hash: true, //Ϊ��̬��Դ����hashֵ
                minify: { //ѹ��HTML�ļ�
                    removeComments: true, //�Ƴ�HTML�е�ע��
                    collapseWhitespace: false //ɾ���հ׷��뻻�з�
                }
            }
        ),

        new webpack.HotModuleReplacementPlugin(),

        //���ɻ���
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),

        new OpenBrowserPlugin({ url: 'http://localhost:8080/dist' })
    ]
};
