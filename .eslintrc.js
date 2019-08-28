module.exports = {
    root: true,
    parserOptions: {
      parser: 'babel-eslint',
      sourceType: 'module'
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    extends: [
        'plugin:vue/essential', 
        'plugin:vue/recommended',
        'eslint:recommended'
    ],
    plugins: [
        'vue'
    ],
  
    // add your custom rules here
    //it is base on https://github.com/vuejs/eslint-config-vue
    rules: {
        // allow async-await
      "no-console": "off",
      'generator-star-spacing': 'off',
      "indent": [2, 4], // 第一个参数是错误级别0,1,2, 第二个是几个空格
      "no-trailing-spaces": "off",
      "no-new": "off"
    }
}