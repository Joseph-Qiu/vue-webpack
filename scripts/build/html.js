const path = require('path');
const Helper = require('../config/helper');
const buildAction = require('./buildAction').buildAction;
const {publicPath, env, title, cdnPath} = require('../config/path.config');
let manifest = null
let devEnv = '';
let relyOnStyle = '';
let random = Date.now();
let src = path.resolve(__dirname, '../../src');

if (env !== 'dev') {
    try {
        manifest = require('../../dist/manifest.json')
    } catch(err) {}
}

// 获取项目的配置依赖包
let {scriptArr, linkArr, metaArr, packageEnv, multiple} = require('../../src/config/scriptConfig');

// 创建额外依赖{script, link}
let createRelyOn = (arr = [], prefix = '', type = 'script') => {
	let data = [];
	if (!arr.length) return '';
	
	for (let i = 0; i < arr.length; i++) {
		let src = arr[i].src;
		let attr = arr[i].attr || {};
		let jump = arr[i].jump;
		let relative = arr[i].relative === false ? false : true;
		let attributes = '';

		// 跳过此设置
		if (jump === true) continue;

		// 不是相对路径, 不需要域名前缀
		if (!relative) prefix = '';

		for (let j in attr) {
			attributes += encodeURIComponent(j) + '="' + attr[j] + '" ';
		}
		
		if (type === 'script') {
			if (!src) continue;
			data.push(`<script src="${prefix + src}" ${attributes}></script>`);
		}

		if (type === 'link') {
			data.push(`<link rel="stylesheet" href="${prefix + src}" ${attributes}>`);
		}

		if (type === 'meta') {
			data.push(`<meta ${attributes} />`);
		}
	}

	return data.join('');
};

// 生成html
let generatedHtml = (outEnv = '', outHtmlName = 'index') => {
    let out = `dist/${outHtmlName}.html`
    if (env === 'dev') {
        out = `scripts/templates/www/${outHtmlName}.html`
    }
	buildAction({
		file: `scripts/templates/html/${outEnv}index.html`,
        out: out,
		replaceArr: [
			{reg: 'publicPath', value: publicPath},
			{reg: 'title', value: title},
			{reg: 'random', value: random},
			{reg: 'devEnv', value: devEnv},
			{reg: 'cdnPath', value: cdnPath},
			{reg: 'relyOnStyle', value:relyOnStyle},
			{reg: 'relyOnScript', value: createRelyOn(scriptArr, cdnPath)},
			{reg: 'relyOnLink', value: createRelyOn(linkArr, cdnPath, 'link')},
			{reg: 'relyOnMeta', value: createRelyOn(metaArr, '', 'meta')}
		]
    });
    devEnv = "";
    relyOnStyle = "";
};

let beforeHtml = (p, file = [], type) => {
    file = typeof file === 'object' ? file : [file]
    file.forEach(item => {
        if (type === 'css') {
            relyOnStyle += `<link rel="stylesheet" href="${p}${item}">`
        } 
        if (type === 'js') {
            devEnv += `<script src="${p}${item}" crossorigin="anonymous"></script>`;
        }
    })
};

let init = () => {
	if (multiple) {
		let folder = src + '/entry';
		let names = Helper.getFolderName(folder);
		for (let i = 0; i < names.length; i++) {
            let nameJs = `${names[i]}.js`
            let nameCss = `${names[i]}.css`
            if (env === 'dev') {
                beforeHtml(publicPath, ['vendor.css', nameCss], 'css');
                beforeHtml(publicPath, ['js/vendor.js', `js/${nameJs}`], 'js');
            } else {
                beforeHtml(publicPath, [manifest['vendor.css'], manifest[nameCss]], 'css');
			    beforeHtml(publicPath, [manifest['vendor.js'], manifest[nameJs]], 'js');
            }
			generatedHtml(packageEnv, names[i]);
		}
	} else {
        if (env === 'dev') {
            beforeHtml(publicPath, 'app.css', 'css');
            beforeHtml(publicPath, ['js/vendor.js', 'js/app.js'], 'js');
        } else {
            beforeHtml(publicPath, manifest['app.css'], 'css');
            beforeHtml(publicPath, [manifest['vendor.js'], manifest['app.js']], 'js');
        }
		generatedHtml(packageEnv);
	}
};

init();