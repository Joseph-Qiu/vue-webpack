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

    }
}