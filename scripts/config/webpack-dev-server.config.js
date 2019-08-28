const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const Helper = require('./helper');
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
        port: 7305,
        host: '0.0.0.0'
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