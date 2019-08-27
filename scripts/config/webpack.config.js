const path = require('path');
const fs = require("fs");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HappyPack = require('happypack');
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const StatsPlugin = require('./plugins/stats');

const Helper = require('./helper');
const {env} = require('./path.config');
const projectFolder = path.resolve(__dirname, `../../src`);

const resolve = (dir) => {
    return path.join(__dirname, '../../', dir)
}

let createHappyPlugin = (id, loaders) => {
    return new HappyPack({
      id: id,
      loaders: loaders,
      threadPool: happyThreadPool,
      verbose: false
    })
}

// 获取项目的配置依赖包
let scriptConfig = require(projectFolder + '/config/scriptConfig');
let {vendor, multiple, px2rem, analyzer} = scriptConfig;

let oEntry = {
    vendor: vendor
};

exports.scriptConfig = scriptConfig;

// 拿到入口文件
exports.entry = () => {
    if (multiple) {
        let names = Helper.getFolderName(`${projectFolder}/entry`);
        for (let i = 0; i < names.length; i++) {
            oEntry[names[i]] = `${projectFolder}/entry/${names[i]}/main.js`;
        }
    } else {
        oEntry['app'] = `${projectFolder}/main.js`;
    }

    return oEntry;
};

// 路径别名, 指向当前应用, 比如：vue/demo.  app === demo
exports.alias = () => {
    return {
        //app: path.resolve(__dirname, projectFolder)
    }
};

// 规则
exports.rules = () => {
    const exclude = /(node_modules|dist)/i;
    let lessUSE = [
        {
            loader: 'css-loader',
            options: {
                minimize: true,
                importLoaders: 1
            }
        },
        {
            loader: 'postcss-loader',
        },
        {
            loader: 'less-loader'
        }
    ];

    // 如果需要打包px2rem, 要有顺序的
    if (px2rem) {
        lessUSE.splice(1, 0, {
            loader: 'px2rem-loader',
            options: {
              remUni: 75,
              remPrecision: 8
            }
        });
    }

    return [
        {
            test: /\.js$/,
            exclude: exclude,
            loader: env === 'dev' ? "babel-loader" : 'happypack/loader?id=happy-babel-js',
            include: [resolve('src')],
        },
        {
            test:/\.vue$/,
            exclude: exclude,
            include: [resolve('src')],
            loader: 'vue-loader',
            options: {
                loaders: {
                    js: env === 'dev' ? "babel-loader" : 'happypack/loader?id=happy-vue-js',
                }
            }
        },
        {
            test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
            exclude: exclude,
            include: [resolve('static'), resolve('src')],
            use: [
                {
                    loader: "file-loader",
                    query: {
                        name: "img/[name].[hash].[ext]"
                    },
                },
            ]
        },
        {
            test: /\.(css|less)$/,
            exclude: exclude,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: lessUSE
            })
        }
    ]
};

// 插件
exports.plugins = () => {
    let arr = [
        createHappyPlugin('happy-babel-js', ['babel-loader?cacheDirectory=true']),
        createHappyPlugin('happy-vue-js', ['babel-loader?cacheDirectory=true']),
    ]
    if (analyzer) {
        arr.push(new BundleAnalyzerPlugin())
        arr.push(new StatsPlugin())
    }
    return arr
}