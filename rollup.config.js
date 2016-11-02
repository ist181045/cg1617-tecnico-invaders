import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/Game.js',
	plugins: [
		babel({
			exclude: 'node_modules/**'
		})
	],
	targets: [
		{
			format: 'es',
			dest: 'dist/invaders.es6.js'
		},
		{
			format: 'iife',
			dest: 'dist/invaders.js'
		}
	]
};
