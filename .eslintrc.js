module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'indent': [0, 4, {'SwitchCase': 1}],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-extra-parens': 0, //不允许出现多余的括号
    'no-trailing-spaces': 2, //一行最后不允许有空格
    "no-label-var": 0, //不允许标签和变量同名
    "no-shadow": 0, //外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    "no-shadow-restricted-names": 2, //js关键字和保留字不能作为函数名或者变量名
    "no-undef": 2, //不允许未声明的变量
    "no-unused-vars": [2, {"vars": "all", "args": "after-used"}], //不允许有声明后未使用的变量或者参数
    "space-before-function-paren": [2, {"anonymous": "always", "named": "never"}], //函数定义时括号前的空格
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/script-indent': ["error", 4, {
      "baseIndent": 0,
      "switchCase": 0,
      "ignores": []
    }] // vue script 缩进
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
