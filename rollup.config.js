import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify';

export default {
	entry: 'src/game.js',
	dest: 'build/invaders.min.js',
	format: 'iife',
	sourceMap: 'inline',
	plugins: [
		eslint( {
			exclude: ['src/three.min.js', 'src/node_modules/**']
		} ),
		babel( {
			exclude: ['src/node_modules/**']
		} ),
		(process.env.NODE_ENV === 'production' && uglify())
	]
};
