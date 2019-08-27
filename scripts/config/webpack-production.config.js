const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');  // manifest
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'); // webpack3 多进程打包
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');  // webpack4支持性比较好| 多进程打包
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const {publicPath, env} = require('./path.config');
const webpackConfig = require('./webpack.config');
let buildPath = path.resolve(__dirname, '../../dist');

let opt = {    
    entry: webpackConfig.entry(),
	devtool: '', // cheap-module-source-map
    output: {
        path: buildPath,
        publicPath: publicPath || "/",
        filename: "js/[name].[chunkhash].js",
        chunkFilename: "js/[name].[chunkhash].js",
	    sourceMapFilename: "map/[name].js.map"
    },
    module: {
        noParse: /static\/([\s\S]*.(js|css))/,
        rules: webpackConfig.rules()
    },
    resolve: {
        extensions: ['.js', '.vue', '.less'],
        alias: Object.assign({
            'src': path.resolve(__dirname, '../../src'),
            'utils': path.resolve(__dirname, '../../src/utils'),
            'vue': path.resolve(__dirname, '../../node_modules/vue/dist/vue.js'),
        }, webpackConfig.alias())
    },
    plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
	        sourceMap: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new TransferWebpackPlugin([{from: 'www'}], path.resolve(__dirname, '../templates')),
        new ManifestPlugin({fileName: 'manifest.json'}),
        new webpack.optimize.CommonsChunkPlugin({names: ['vendor']}),
        new ExtractTextPlugin({
            filename: "[name].[chunkhash].css", // [chunkhash:8]
            allChunks: true
        })
    ],
};

opt.plugins = opt.plugins.concat(webpackConfig.plugins())
if (webpackConfig.scriptConfig.analyzer) {
    const smp = new SpeedMeasurePlugin({
        disable: false,
        outputFormat: 'humanVerbose',
        outputTarget: './smp.txt',
    });
    module.exports = smp.wrap(opt)
} else {
    module.exports = opt
}

