// eslint-plugin-rule doc: https://eslint.vuejs.org/rules/

module.exports = {
	extends: ['plugin:vue/essential', './index.js'],
	parser: 'vue-eslint-parser',
	parserOptions: {
		// 设置 js 的解析器为 babel-eslint
		parser: 'babel-eslint',
		ecmaVersion: 2019,
		// ECMAScript modules 模式
		sourceType: 'module',
		ecmaFeatures: {
			// 不允许 return 语句出现在 global 环境下
			globalReturn: false
		},
		// 即使没有 babelrc 配置文件，也使用 babel-eslint 来解析
		requireConfigFile: false,
		// 仅允许 import export 语句出现在模块的顶层
		allowImportExportEverywhere: false
	},
	plugins: ['vue'],
	rules: {
		'vue/html-end-tags': 2,
		'vue/html-indent': 2,
		'vue/max-attributes-per-line': [2, {
			'singleline': 3
		}],
		'vue/multiline-html-element-content-newline': 2,
		'vue/no-multi-spaces': 2,
		'vue/no-spaces-around-equal-signs-in-attribute': 2,
		'vue/no-template-shadow': 2,
		'vue/prop-name-casing': 2,
		'vue/require-prop-types': 2,
		'vue/this-in-template': 2
	}
}
