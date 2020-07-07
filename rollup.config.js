import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import autoExternal from 'rollup-plugin-auto-external'

const plugins = [
	autoExternal({
		builtins: true,
		dependencies: false,
		peerDependencies: false,
	}),

	babel({ extensions: ['.js', '.coffee'], babelHelpers: 'bundled' }),

	// so Rollup can find externals
	resolve({ extensions: ['ts', '.js', '.coffee'], preferBuiltins: true }),

	// so Rollup can convert externals to an ES module
	commonjs(),
]

// minify only in production mode
if (process.env.NODE_ENV === 'production') {
	plugins.push(
		// minify
		terser({
			ecma: 2018,
			warnings: true,
			compress: {
				drop_console: false,
			},
		}),
	)
}

export default [
	{
		input: 'src/x-terminal.js',
		output: [
			{
				dir: 'dist',
				format: 'cjs',
				sourcemap: true,
			},
		],
		// loaded externally
		external: [
			'atom',
			'electron',
			'node-pty-prebuilt-multiarch',
		],
		plugins: plugins,
	},
]
