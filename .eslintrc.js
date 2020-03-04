module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    $http: 'readonly',
    $const: 'readonly',
    BMap: 'readonly',
    BMAP_STATUS_SUCCESS: 'readonly'
  }
}
