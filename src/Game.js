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

import Field from './Field';
import EnemyShip from './entities/EnemyShip';
import PlayerShip from './entities/PlayerShip';

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

		this.topCamera = (function ( self ) {

			let camera = new OrthographicCamera(
				~WIDTH >> 1, WIDTH >> 1, HEIGHT >> 1, ~HEIGHT >> 1, 1, 200
			);

			camera.position.set( 0, 100, 0 );
			camera.lookAt( self.scene.position );

			camera.updateProjectionMatrix();

			return camera;

		})( this );
		this.backCamera = (function ( self ) {

			let camera = new PerspectiveCamera(
				75, WINDOW_WIDTH() / WINDOW_HEIGHT(), 1, 1000
			);

			camera.position.set( 0, 250, ( HEIGHT >> 1 ) + 150 );
			camera.lookAt( self.scene.position );

			camera.updateProjectionMatrix();

			return camera;

		})( this );
		this.camera = this.topCamera;

		this.field = new Field( 0, 0, 0, WIDTH - 4, HEIGHT - 4 );

		this.playerShip = new PlayerShip( 0, 0, ( HEIGHT >> 1 ) - 50,
			new PerspectiveCamera( 75, WINDOW_WIDTH() / WINDOW_HEIGHT(), 1, 1000 ) );

		this.gameObjects = new Array();

		this.gameClock = new Clock( false );

	}

	start () {

		document.body.appendChild( this.renderer.domElement );

		window.addEventListener( 'resize',  this.resize.bind( this ) );
		window.addEventListener( 'keydown', this.keyDown.bind( this ) );
		window.addEventListener( 'keyup',   this.keyUp.bind( this ) );

		this.setup();

		/* HACK: Force a first resize */
		this.resize();

		this.update();

	}

	setup () {

		/* Clear the scene */
		for ( let i = this.scene.children.length; i > 0; --i ) {

			this.scene.remove( this.scene.children[i] );

		}

		this.gameObjects = new Array();

		/* Build the scene */

		this.scene.add( new AxisHelper( 50 ) );

		let [ nx, nz ] = [ 6, 3 ];
		let [ segX, segZ ] = [ ( WIDTH - 120 ) / nx, ( ( HEIGHT >> 1 ) - 60 ) / nz ];

		this.field.children.forEach( function ( b ) {

			if ( b.type === 'Barrier' ) {

				this.gameObjects.push( b );

			}

		}, this );
		this.scene.add( this.field );

		this.playerShip.position.set( 0, 0, ( HEIGHT >> 1 ) - 50 );
		this.playerShip.velocity.setScalar( 0 );
		this.gameObjects.push( this.playerShip );
		this.scene.add( this.playerShip );

		for ( let i = 0; i < nz; ++i ) {

			for ( let j = 0; j < nx; ++j ) {

				let [ posX, posZ ] = [
					segX * ( j - ( ( nx - 1 ) / 2 ) ),
					segZ * ( i - ( ( nz + 1 ) / 2 ) )
				];

				let alien = new EnemyShip( posX, 0, posZ );

				this.gameObjects.push( alien );
				this.scene.add( alien );

			}

		}

	}

	update () {

		if ( this.gameClock.running ) {

			let dt = this.gameClock.getDelta();

			for ( let i = 0; i < this.gameObjects.length; ++i ) {

				for ( let j = i + 1; j < this.gameObjects.length; ++j ) {

					let [ o1, o2 ] = [ this.gameObjects[i], this.gameObjects[j] ];

					o1.intersect( o2 ) && o1.handleCollision( o2, dt );

				}

			}

			this.gameObjects.forEach( ( obj ) => obj.update( dt ) );

		}

		this.renderer.render( this.scene, this.camera );

		window.requestAnimationFrame( this.update.bind( this ) );

	}

	resize () {

		let ratio = WINDOW_WIDTH() / WINDOW_HEIGHT();

		if ( this.camera.type === 'OrthographicCamera' ) {

			if ( ratio > ( WIDTH / HEIGHT ) ) {

				this.camera.left   = ~( HEIGHT * ratio ) >> 1;
				this.camera.right  = ( HEIGHT * ratio ) >> 1;
				this.camera.top    = HEIGHT >> 1;
				this.camera.bottom = ~HEIGHT >> 1;

			} else {

				this.camera.left   = ~WIDTH >> 1;
				this.camera.right  = WIDTH >> 1;
				this.camera.top    = ( WIDTH / ratio ) >> 1;
				this.camera.bottom = ~( WIDTH / ratio ) >> 1;

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

			case Keyboard.KEY_3:

				this.camera = this.playerShip.camera;
				this.resize();

				break;

			case Keyboard.KEY_A:
			case Keyboard.KEY_LEFT:

				if ( !this.playerShip.moving ) this.playerShip.moving = true;
				this.playerShip.setDirection( -1, 0, 0 );

				break;

			case Keyboard.KEY_D:
			case Keyboard.KEY_RIGHT:

				if ( !this.playerShip.moving ) this.playerShip.moving = true;
				this.playerShip.setDirection( 1, 0, 0 );

				break;

			case Keyboard.KEY_P:

				this.gameClock.running ?
					this.gameClock.stop() :
					this.gameClock.start();

				break;

			case Keyboard.KEY_R:

				this.gameClock.stop();
				this.setup();

				break;

			case Keyboard.KEY_W:

				this.gameObjects.forEach( function ( obj ) {

					obj.children.forEach( function ( child ) {

						if ( child.type === 'Mesh' )  {

							child.material.wireframe = !child.material.wireframe;

						}

					});

				} );

				break;

			default: break;

		}

	}

	keyUp ( event ) {

		switch ( event.keyCode ) {

			case Keyboard.KEY_A:
			case Keyboard.KEY_LEFT:
			case Keyboard.KEY_D:
			case Keyboard.KEY_RIGHT:

				this.playerShip.moving = false;

				break;

			default: break;

		}
	}

}

new Game().start();
