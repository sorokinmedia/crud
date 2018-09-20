import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss'
import json from 'rollup-plugin-json';

const NODE_ENV = process.env.NODE_ENV || 'development';
const outputFile = NODE_ENV === 'production' ? './dist/index.js' : './lib/index.js';

export default {
	input: 'src/index.js',
	output: {
		file: outputFile,
		format: 'cjs',
	},
	// All the used libs needs to be here
	external: [
		'react',
		'react-proptypes',
	],
	plugins: [
		postcss({
			plugins: []
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		}),
		resolve({
			jsnext: true,
			main: true
		}),
		babel({
			exclude: 'node_modules/**',
			plugins: ['external-helpers']
		}),
		commonjs({
			// non-CommonJS modules will be ignored, but you can also
			// specifically include/exclude files
			include: 'node_modules/**',  // Default: undefined
			/*exclude: [
				'node_modules/draft-js/!**',
			],*/

			// search for files other than .js files (must already
			// be transpiled by a previous plugin!)
			extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

			// if true then uses of `global` won't be dealt with by this plugin
			ignoreGlobal: false,  // Default: false

			// if false then skip sourceMap generation for CommonJS modules
			sourceMap: false,  // Default: true

			// explicitly specify unresolvable named exports
			// (see below for more details)
			namedExports: {
				'draft-js': [
					'ContentState', 'EditorState','SelectionState',
					'CompositeDecorator', 'convertToRaw',
					'decode'
				]
			},  // Default: undefined
		}),
		json()
	],
};
