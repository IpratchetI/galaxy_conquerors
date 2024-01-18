module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11
  },
  plugins: [ '@typescript-eslint', 'import' ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/quotes': [ 'error', 'single' ],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'quotes': 'off',
    'no-shadow': 'off',
    'comma-dangle': [ 'error', 'never' ],
    'object-curly-spacing': [ 'error', 'always' ],
		'max-len': ['warn', { 'code': 100, 'ignoreComments': true }],
		'@typescript-eslint/no-var-requires': 0,
    'no-constant-condition': 'warn',
    'semi': ['warn', 'always', { 'omitLastInOneLineBlock': true }],
    'semi-style': ['warn', 'last'],
    '@typescript-eslint/no-extra-semi': ['warn'],
    '@typescript-eslint/member-delimiter-style': ['warn' , {
      'multiline': {
        'delimiter': 'semi',
        'requireLast': true
      },
      'singleline': {
        'delimiter': 'semi',
        'requireLast': false
      },
      'multilineDetection': 'brackets'
    }],
    'import/order': ['warn', {
      'groups': ['builtin', 'external', 'internal', 'sibling', 'index', 'type'],
      'pathGroups': [{
        'pattern': '@/**',
        'group': 'internal',
        'position': 'after'
      }],
      'newlines-between': 'always'
    }]
  }
};
