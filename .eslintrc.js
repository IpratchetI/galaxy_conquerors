module.exports = {
	env: {
		browser: true,
		es2020: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:react/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 11
	},
	plugins: ['@typescript-eslint', 'import', 'react-hooks', 'react'],
	settings: {
		react: { version: 'detect' }
	},
	ignorePatterns: ['**/*.d.ts', '**/dist'],
	rules: {
		'@typescript-eslint/ban-ts-comment': 'warn',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-unnecessary-condition': 'off',
		'@typescript-eslint/quotes': ['error', 'single'],
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',
		'no-shadow': 'off',
		'comma-dangle': ['error', 'never'],
		'object-curly-spacing': ['error', 'always'],
		'max-len': ['warn', { 'code': 120, 'ignoreComments': true }],
		'@typescript-eslint/no-var-requires': 0,
		'no-constant-condition': 'warn',
		'semi': ['warn', 'always', { 'omitLastInOneLineBlock': true }],
		'semi-style': ['warn', 'last'],
		'@typescript-eslint/no-extra-semi': ['warn'],
		'quotes': ['error', 'single'],
		'@typescript-eslint/member-delimiter-style': [
			'warn',
			{
				'multiline': {
					'delimiter': 'semi',
					'requireLast': true
				},
				'singleline': {
					'delimiter': 'semi',
					'requireLast': false
				},
				'multilineDetection': 'brackets'
			}
		],
		'import/order': [
			'warn',
			{
				'groups': ['builtin', 'external', 'internal', 'sibling', 'index', 'type'],
				'pathGroups': [
					{
						'pattern': '@/**',
						'group': 'internal',
						'position': 'after'
					}
				],
				'newlines-between': 'always'
			}
		],
		'react/react-in-jsx-scope': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/display-name': 'warn'
	}
};
