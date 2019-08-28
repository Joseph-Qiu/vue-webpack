const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const Helper = require('./helper');
const pathConfig = require('../config').dev;
const webpackConfig = require('./webpack.config');
const buildPath = path.resolve(__dirname, '../../dist');

module.exports = {
    context: path.resolve(__dirname, '../../src'),
    entry: webpackConfig.entry(),
    devtool: 'source-map',
    output: {
        path: buildPath,
        filename: "js/[name].js",
		chunkFilename: "js/[name].js"
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../templates/www'),
        hot: true,
        port: pathConfig.port || 9527,
        host: pathConfig.host || '0.0.0.0',
        //publicPath: buildPath,
        proxy: pathConfig.proxyTable,
    },
    module: {
        noParse: /static\/([\s\S]*.(js|css))/,
        rules: webpackConfig.rules()
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: Object.assign({
            'src': path.resolve(__dirname, '../../src'),
            'utils': path.resolve(__dirname, '../../src/utils'),
            'vue': path.resolve(__dirname, '../../node_modules/vue/dist/vue.js'),
        }, webpackConfig.alias())
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].css",
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        })
    ]
};