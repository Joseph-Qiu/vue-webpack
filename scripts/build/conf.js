let buildAction = require('./buildAction').buildAction;
let arguments = process.argv.splice(2);
let pathKey = arguments[0] || 'dev';          // 环境 {dev: 本地, test: 测试, product: 线上}

let path = {
	dev: {
        outputPath: pathKey,
        cdnPath: "//s1.huishoubao.com/",
        publicPath: "./", 
        title: ""
    },
    product: {
        outputPath: pathKey,
        cdnPath: "//s1.huishoubao.com/",
        publicPath: "./", 
        title: ""
    }
};

// js webpack
buildAction({
	file: 'scripts/templates/js/path.config.js',
	out: 'scripts/config/path.config.js',
	replaceArr: [
		{reg: 'outputPath', value: path[pathKey].outputPath},
        {reg: 'publicPath', value: path[pathKey].publicPath},
        {reg: 'cdnPath', value: path[pathKey].cdnPath},
        {reg: 'title', value: path[pathKey].title},
	]
});
	
// js api
buildAction({
	file: 'scripts/templates/js/env.config.js',
	out: 'src/common/env.config.js',
	replaceArr: [
		{reg: 'outputPath', value: path[pathKey].outputPath},
		{reg: 'publicPath', value: path[pathKey].publicPath},
	]
});
