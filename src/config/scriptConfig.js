exports.vendor = ['vue', 'vuex', 'vue-router', 'element-ui', 'echarts', 'babel-polyfill'];

// 是否开启多页面 {false|true}
exports.multiple = true;

// 运行端环境 {''|pc}
exports.packageEnv = 'pc'

// 是否开启rem {false|true}
exports.px2rem = false;

// 当前项目依赖的脚本文件
exports.scriptArr = [
    // {
    //     src: "html/assets/md5.js",
    //     attr: {
    //         crossorigin: "anonymous"
    //     }
    // },
    // {
    //     src: "//res.wx.qq.com/open/js/jweixin-1.2.0.js",
    //     relative: false,
    //     jump: true
    // }
];

// 当前项目依赖的样式文件
exports.linkArr = [
    {
        src: 'static/element-ui/index.css',
        relative: false,
    }
];

// 当前项目设置的meta标签
exports.metaArr = [
    
];

// webpack模块统计分析
exports.analyzer = false