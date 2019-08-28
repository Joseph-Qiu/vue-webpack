const path = require('path')

module.exports = {
    dev: {
        host: '0.0.0.0',
        port: 7300,
        proxyTable: {
            '/api':{
                target: 'http://127.0.0.1:7304',
                changeOrigin: true,
            }
        },

        assetsPublicPath: "/",
        cdnPath: "//s1.huishoubao.com/",
        version: '',
        title: "demo"
    },
    product: {
        assetsRoot: path.resolve(__dirname, `../dist`),
        assetsPublicPath: "./",
        cdnPath: "//s1.huishoubao.com/",
        version: '',
        title: "demo"
    }
}