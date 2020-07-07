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
	['@babel/plugin-proposal-optional-chaining', { loose: false }],
	['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
	['@babel/plugin-proposal-class-properties', { loose: true }],
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
