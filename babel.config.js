const presets = [
	[
		'@babel/preset-env',
		{
			targets: {
				electron: 5,
			},
		},
	],
	'@babel/preset-flow',
]

const plugins = [
	'@babel/plugin-proposal-function-bind',

	'@babel/plugin-proposal-logical-assignment-operators',
	['@babel/plugin-proposal-optional-chaining', { loose: false }],
	['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
	['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
	'@babel/plugin-proposal-do-expressions',

	['@babel/plugin-proposal-decorators', { legacy: true }],
	'@babel/plugin-proposal-function-sent',
	'@babel/plugin-proposal-numeric-separator',
	'@babel/plugin-proposal-throw-expressions',

	'@babel/plugin-syntax-import-meta',
	['@babel/plugin-proposal-class-properties', { loose: true }],
	'@babel/plugin-proposal-json-strings',
]

if (process.env.BABEL_ENV === 'development') {
	plugins.push(
		'@babel/plugin-transform-modules-commonjs',
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-syntax-dynamic-import',
	)
}

module.exports = {
	presets: presets,
	plugins: plugins,
	exclude: 'node_modules/**',
	sourceMap: 'inline',
}
