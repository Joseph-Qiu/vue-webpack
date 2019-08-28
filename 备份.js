// https://eslint.org/docs/user-guide/configuring
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
      // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
      // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
      'plugin:vue/essential', 
      'plugin:vue/recommended',
      // https://github.com/standard/standard/blob/master/docs/RULES-en.md
      'standard',
      'eslint:recommended'
    ],
    // required to lint *.vue files
    plugins: [
      'vue'
    ],
    // add your custom rules here
    rules: {
      // allow async-await
      "no-console": "off",
      'generator-star-spacing': 'off',
      "indent": [2, 4],
      "no-trailing-spaces": "off",
      "no-new": "off"
    }
  }
  