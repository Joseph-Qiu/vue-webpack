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
const pathConfig = require('../config')[env] || {};

let buildPath = pathConfig.assetsRoot ? pathConfig.assetsRoot : path.resolve(__dirname, `../../dist`);
let oEntry = webpackConfig.entry()
let getChunks = () => {
    let multiple = !webpackConfig.scriptConfig;
    let o = JSON.parse(JSON.stringify(oEntry))
    delete o.vendor
    o = Object.keys(o)
    if (multiple) return o
    return o.join()
}

let opt = {    
    entry: oEntry,
	devtool: '',
    output: {
        path: buildPath,
        publicPath: publicPath || "/",
        filename: "js/[name].[chunkhash].js",
        chunkFilename: "js/[name].[chunkhash].js",
	    // sourceMapFilename: "map/[name].js.map"
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
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false,
            parallel: true
        }),
        new ExtractTextPlugin({
            filename: "[name].[contenthash:8].css",
            allChunks: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new TransferWebpackPlugin([{from: 'www'}], path.resolve(__dirname, '../templates')),
        new ManifestPlugin({fileName: 'manifest.json'}),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'runtime'],
            filename: 'js/[name].[chunkhash].js',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/[name].[chunkhash].js',
            chunks: getChunks()
        })

        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor']
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks (module) {
        //       // any required modules inside node_modules are extracted to vendor
        //       return (
        //         module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(
        //           path.join(__dirname, '../../node_modules')
        //         ) === 0
        //       )
        //     }
        // }),
        //   // extract webpack runtime and module manifest to its own file in order to
        //   // prevent vendor hash from being updated whenever app bundle is updated
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     minChunks: Infinity
        // }),
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

