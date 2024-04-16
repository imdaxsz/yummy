const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:import/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'webpack.config.js'),
      },
    },
  },
  rules: {
    'no-new': 0,
    'class-methods-use-this': 0,
    'no-alert': 0,
    'no-console': 0,
    'prefer-destructuring': 0,
    'lines-between-class-members': 0,
    'no-plusplus': 0,
    'no-continue': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        mjs: 'never',
        css: 'never',
      },
    ],
  },
};
