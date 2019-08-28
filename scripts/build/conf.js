let buildAction = require('./buildAction').buildAction;
let arguments = process.argv.splice(2);
let env = arguments[0] || 'dev';          
let config = require('../config')
let replaceArr = [
    {reg: 'publicPath', value: config[env].assetsPublicPath},
    {reg: 'env', value: env},
    {reg: 'cdnPath', value: config[env].cdnPath},
    {reg: 'version', value: config[env].version},
    {reg: 'assetsRoot', value: config[env].assetsRoot || "dist"},
    {reg: 'title', value: config[env].title},
]

// js webpack
buildAction({
	file: 'scripts/templates/js/path.config.js',
	out: 'scripts/config/path.config.js',
	replaceArr: replaceArr
});
	
// js api
buildAction({
	file: 'scripts/templates/js/env.config.js',
	out: 'src/common/env.config.js',
	replaceArr: replaceArr
});
