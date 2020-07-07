import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import typescript from "@rollup/plugin-typescript";
// import coffeescript from 'rollup-plugin-coffee-script';
import babel from 'rollup-plugin-babel'
// import json from "@rollup/plugin-json"
import { terser } from 'rollup-plugin-terser'
import autoExternal from 'rollup-plugin-auto-external'

const plugins = [
	autoExternal({
		builtins: true,
		dependencies: false,
		peerDependencies: false,
	}),

	// so Rollup can convert TypeScript to JavaScript
	// typescript({
	//   noEmitOnError: false,
	// }),

	// if any (in deps as well): Convert CoffeeScript to JavaScript
	// coffeescript(),

	// // so Rollup can bundle JSON to JavaScript
	// json(
	//   { compact: true }
	// ),

	babel(),

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
			'node-pty-prebuilt-multiarch', // TODO bundle using natives plugin
		],
		plugins: plugins,
	},
]
