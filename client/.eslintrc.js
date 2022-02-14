module.export = {
	env: { es6: true, node: true, browser: true },
	extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb'],
	globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaFeatures: { jsx: true },
		ecmaVersion: 'latest',
		requireConfigFile: false,
		sourceType: 'module',
		babelOptions: {
			presets: ['@babel/preset-react'],
		},
	},
	plugins: ['react'],
	rules: {
		quotes: [0, 'single'],
		indent: ['error', 4],
		'import/extensions': 0,
		'react/prop-types': 0,
		'linebreak-style': 0,
		'react/state-in-constructor': 0,
		'import/prefer-default-export': 0,
		'max-len': [2, 250],
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
		'no-underscore-dangle': ['error', { allow: ['_d', '_dh', '_h', '_id', '_m', '_n', '_t', '_text'] }],
		'object-curly-newline': 0,
		'react/jsx-filename-extension': 0,
		'react/jsx-one-expression-per-line': 0,
		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/alt-text': 0,
		'jsx-a11y/no-autofocus': 0,
		'jsx-a11y/no-static-element-interactions': 0,
		'react/no-array-index-key': 0,
		'jsx-a11y/anchor-is-valid': [
			'error',
			{
				components: ['Link'],
				specialLink: ['to', 'hrefLeft', 'hrefRight'],
				aspects: ['noHref', 'invalidHref', 'preferButton'],
			},
		],
	},
	settings: {
		react: {
			version: 'latest', // "detect" automatically picks the version you have installed.
		},
	},
}
