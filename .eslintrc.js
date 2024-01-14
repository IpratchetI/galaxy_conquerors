module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
		'semi': ['error', 'always'],
		'@typescript-eslint/no-unused-vars': 0,
		'@typescript-eslint/no-unnecessary-condition': 'off',
		'@typescript-eslint/quotes': [ 'error', 'single' ],
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',
		'quotes': 'off',
		'no-shadow': 'off',
		'max-len': ['warn', { 'code': 80, 'ignoreComments': true }],
		'object-curly-spacing': ['error', 'always']
  },
};
