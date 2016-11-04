/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import './lib/threejs/polyfills.js';

import { AxisHelper } from './lib/threejs/extras/helpers/AxisHelper';

import { Clock } from './lib/threejs/core/Clock';
import { OrthographicCamera } from './lib/threejs/cameras/OrthographicCamera';
import { PerspectiveCamera } from './lib/threejs/cameras/PerspectiveCamera';
import { Scene } from './lib/threejs/scenes/Scene';
import { WebGLRenderer } from './lib/threejs/renderers/WebGLRenderer';

import { WIDTH, HEIGHT } from './Constants';
import { WINDOW_PIXEL_RATIO, WINDOW_WIDTH, WINDOW_HEIGHT } from './Constants';

import * as Keyboard from './Keyboard';

class Game {

	constructor () {

		this.scene = new Scene();
		this.renderer = (function () {

			let renderer = new WebGLRenderer();

			renderer.setPixelRatio( WINDOW_PIXEL_RATIO );
			renderer.setSize( WINDOW_WIDTH(), WINDOW_HEIGHT() );

			return renderer;

		})();

		this.topCamera = (function ( scene ) {

			let camera = new OrthographicCamera(
				WIDTH / -2, WIDTH / 2, HEIGHT / 2, HEIGHT / -2, 1, 1000
			);

			camera.position.set( 0, 200, 0 );
			camera.lookAt( scene.position );

			camera.updateProjectionMatrix();

			return camera;

		})( this.scene );
		this.backCamera = (function ( scene ) {

			let camera = new PerspectiveCamera(
				75, WINDOW_WIDTH() / WINDOW_HEIGHT(), 1, 1000
			);

			camera.position.set( 0, 100, 400 );
			camera.lookAt( scene.position );

			camera.updateProjectionMatrix();

			return camera;

		})( this.scene );
		this.camera = this.topCamera;

		this.gameClock = new Clock( false );

		/* TODO: Game Objects array, player ship, and so on */

	}

	start () {

		this.scene.add( new AxisHelper(50) );

		document.body.appendChild( this.renderer.domElement );

		window.addEventListener( 'resize',  this.resize.bind( this ) );
		window.addEventListener( 'keydown', this.keyDown.bind( this ) );
		window.addEventListener( 'keyup',   this.keyUp.bind( this ) );

		/* TODO: Setup function, reset the game on startup and restart */
		//setup();

		this.gameClock.start();

		this.resize();
		this.update();

	}

	update () {

		window.requestAnimationFrame( this.update.bind( this ) );

		this.gameClock.getDelta();

		/* TODO: Game objects' (TBA) updates */

		this.renderer.render( this.scene, this.camera );

	}

	resize () {

		let ratio = WINDOW_WIDTH() / WINDOW_HEIGHT();

		if ( this.camera.type === 'OrthographicCamera' ) {

			if ( ratio > ( WIDTH / HEIGHT ) ) {

				this.camera.left   = ( HEIGHT * ratio ) / -2;
				this.camera.right  = ( HEIGHT * ratio ) /  2;
				this.camera.top    = HEIGHT /  2;
				this.camera.bottom = HEIGHT / -2;

			} else {

				this.camera.left   = WIDTH / -2;
				this.camera.right  = WIDTH /  2;
				this.camera.top    = ( WIDTH / ratio ) /  2;
				this.camera.bottom = ( WIDTH / ratio ) / -2;

			}

		} else {

			this.camera.aspect = ratio;

		}

		this.camera.updateProjectionMatrix();
		this.renderer.setSize( WINDOW_WIDTH(), WINDOW_HEIGHT() );

	}

	keyDown ( event ) {

		/* TODO: Other keybindings for other game objects */

		switch ( event.keyCode ) {

			case Keyboard.KEY_1:

				this.camera = this.topCamera;
				this.resize();

				break;

			case Keyboard.KEY_2:

				this.camera = this.backCamera;
				this.resize();

				break;

			default:

				break;

		}

	}

	keyUp ( event ) {
		/* TODO: Handle key releases that affect game objects */
	}

}

var game = new Game();
game.start();

export default Game;
