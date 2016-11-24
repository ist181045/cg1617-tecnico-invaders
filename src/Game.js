/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import './lib/threejs/polyfills.js';
import * as THREE from './lib/threejs/constants';

import { WebGLRenderer } from './lib/threejs/renderers/WebGLRenderer';
import { Scene } from './lib/threejs/scenes/Scene';

import { OrthographicCamera } from './lib/threejs/cameras/OrthographicCamera';
import { PerspectiveCamera } from './lib/threejs/cameras/PerspectiveCamera';

import { DirectionalLight } from './lib/threejs/lights/DirectionalLight';
import { PointLight } from './lib/threejs/lights/PointLight';

import { Clock } from './lib/threejs/core/Clock';

import { Mesh } from './lib/threejs/objects/Mesh';
import { MeshBasicMaterial } from './lib/threejs/materials/MeshBasicMaterial';
import { PlaneGeometry } from './lib/threejs/geometries/PlaneGeometry';
import { TextureLoader } from './lib/threejs/loaders/TextureLoader';


import { WIDTH, HEIGHT } from './Constants';
import { WINDOW_PIXEL_RATIO, WINDOW_WIDTH, WINDOW_HEIGHT } from './Constants';

import GameHUD from './scenes/GameHUD';

import Field from './objects/Field';
import EnemyShip from './entities/EnemyShip';
import PlayerShip from './entities/PlayerShip';

import * as Keyboard from './Keyboard';

class Game {

	constructor () {

		this.renderer = (function () {

			let renderer = new WebGLRenderer({ antialias: true });

			renderer.setPixelRatio( WINDOW_PIXEL_RATIO );
			renderer.setSize( WINDOW_WIDTH(), WINDOW_HEIGHT() );
			renderer.autoClear = false;

			return renderer;

		})();
		this.scene = new Scene();

		this.gameClock = new Clock( false );

		this.field = new Field( 0, 0, 0, WIDTH - 10, HEIGHT - 10 );

		this.cameras = (function ( self ) {

			let cameras = new Array();

			/* Ortho camera (bird's eye) */
			cameras.push( function () {

				let camera = new OrthographicCamera(
					WIDTH / -2, WIDTH / 2, HEIGHT / 2, HEIGHT / -2, 1, 2000
				);

				camera.position.set( 0, 100, 0 );
				camera.lookAt( self.scene.position );

				camera.updateProjectionMatrix();

				return camera;

			}());

			/* Back perspective camera */
			cameras.push( function () {

				let camera = new PerspectiveCamera(
					75, WINDOW_WIDTH() / WINDOW_HEIGHT(), 1, 1000
				);

				camera.position.set( 0, 250, ( self.field.height / 2 ) + 150 );
				camera.lookAt( self.scene.position );

				camera.updateProjectionMatrix();

				return camera;

			}());

			return cameras;

		})( this );
		this.camera = this.cameras[0];

		this.gameObjects = new Array();

		this.playerShip = new PlayerShip( 0, 0, ( this.field.height / 2 ) - 50,
			new PerspectiveCamera( 75, WINDOW_WIDTH() / WINDOW_HEIGHT(), 1, 1000 ) );

		this.gameHUD = new GameHUD( this.renderer, this.playerShip.MAX_LIVES );

		this.sun = (function ( self ) {

			let sun = new DirectionalLight( 0xffffff, 1 );

			sun.position.set( self.field.width / -4, 100, self.field.height / 4 );
			sun.target = self.scene;

			return sun;

		})( this );
		this.stars = (function ( self, n ) {

			let stars = new Array();

			for ( let i = 0; i < n; ++i ) {

				stars.push( new PointLight( 0xffffff, 0.5 ) );

			}

			return stars;

		}( this, 6 ));

		this.lightsOn = false;

		this.gameOver = false;

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

		/* Clear the scene + reset gameObjects array */
		this.scene.children.length = 0;
		this.gameObjects.length = 0;

		/* Build the scene */
		this.scene.add( function () {

			let bgMesh = new Mesh(

				new PlaneGeometry( 10 * WIDTH, 8 * WIDTH ),
				new MeshBasicMaterial()

			);

			let loader = new TextureLoader();
			let texture = loader.load( './resources/bg/game_scene_bg.jpg' );
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.multiplyScalar( 7 );

			bgMesh.rotateX( -Math.PI / 6 );
			bgMesh.position.set( 0, -20, HEIGHT / -2 );

			bgMesh.material.map = texture;

			return bgMesh;

		}());

		this.field.children.forEach( function ( b ) {

			b.type === 'Barrier' && this.gameObjects.push( b );

		}, this );

		this.field.changeMaterial( 0 );
		this.field.visible = false;
		this.scene.add( this.field );

		this.playerShip = new PlayerShip( 0, 0, ( this.field.height / 2 ) - 50,
			this.playerShip.camera );

		this.gameHUD.setup();

		this.camera = this.cameras[0];

		this.gameObjects.push( this.playerShip );
		this.scene.add( this.playerShip );

		let [ nx, nz ] = [ 5, 2 ];
		let [ segX, segZ ] = [
			( this.field.width - 120 ) / nx,
			( ( this.field.height - 120 ) / 2 ) / nz
		];

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

		this.lightsOn = false;
		this.sun.visible = false;
		this.scene.add( this.sun );

		this.stars.forEach( function ( star ) {

			star.position.set(
				this.field.width * ( Math.random() - 0.5 ),
				100,
				this.field.height * ( Math.random() - 0.5 )
			);

			star.visible = false;
			this.scene.add( star );

		}, this );

		this.gameOver = false;

	}

	update () {

		if ( this.gameClock.running ) {

			let dt = this.gameClock.getDelta();

			if ( EnemyShip.count === 0 || !this.playerShip.alive ) {

				this.gameOver = true;
				this.gameClock.stop();
				this.gameHUD.setVisibility();

			} else {

				if ( this.playerShip.shooting ) {

					let playerBullet = this.playerShip.fire();

					if ( playerBullet !== null ) {

						this.scene.add( playerBullet );
						this.gameObjects.push( playerBullet );

					}

				}

				for ( let i = 0; i < this.gameObjects.length; ++i ) {

					let o1 = this.gameObjects[i];

					o1.update( dt );

					for ( let j = i + 1; j < this.gameObjects.length; ++j ) {

						let o2 = this.gameObjects[j];

						o1.intersect( o2 ) && o1.handleCollision( o2 );

					}

					if ( o1.isEntity && !o1.alive ) {

						this.scene.remove( o1 );
						this.gameObjects.splice( i--, 1 );

					}

				}

				if ( this.playerShip.lives < this.gameHUD.lives ) {

					--this.gameHUD.lives;
					this.gameHUD.setVisibility();

				}

			}

		}

		this.renderer.clear();
		this.renderer.setViewport( 0, 0, WINDOW_WIDTH(), WINDOW_HEIGHT() );
		this.renderer.render( this.scene, this.camera );

		this.gameHUD.update();

		window.requestAnimationFrame( this.update.bind( this ) );

	}

	updateMaterials () {

		this.gameObjects.forEach( function ( obj ) {

			let index = this.lightsOn ? (obj.phong ? 1 : 2) : 0;

			obj.phong = !obj.phong;

			obj.changeMaterial( index );

		}, this );

	}

	resize () {

		this.renderer.setSize( WINDOW_WIDTH(), WINDOW_HEIGHT() );

		let size = this.renderer.getSize();
		let ratio = size.width / size.height;

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

	}

	keyDown ( event ) {

		if ( this.gameOver ) {

			/* Restart the game */
			if ( event.keyCode === Keyboard.KEY_R ) {

				this.gameOver = false;
				this.setup();

			}

		} else {

			switch ( event.keyCode ) {

				/* Toggle cameras */
				case Keyboard.KEY_1: /* Orthographic (top bird's eye camera) */
				case Keyboard.KEY_2: /* Perspective (back camera) */
				case Keyboard.KEY_3: /* Perspective (player view camera) */

					if ( this.gameClock.running ) {

						this.camera = this.cameras[ event.keyCode - Keyboard.KEY_1 ];
						this.resize();

					}

					break;

				/* Player movement: Left */
				case Keyboard.KEY_A:
				case Keyboard.KEY_LEFT:

					if ( !this.playerShip.moving ) this.playerShip.moving = true;
					this.playerShip.setDirection( -1, 0, 0 );

					break;

				/* Player movement: Right */
				case Keyboard.KEY_D:
				case Keyboard.KEY_RIGHT:

					if ( !this.playerShip.moving ) this.playerShip.moving = true;
					this.playerShip.setDirection( 1, 0, 0 );

					break;

				/* Player action: Toggle shooting */
				case Keyboard.KEY_B:
				case Keyboard.KEY_SPACEBAR:

					this.playerShip.shooting = true;

					break;

				/* Show / hide stars */
				case Keyboard.KEY_C:

					this.stars.forEach( function( star ) {

						star.visible = !star.visible;

					});

					break;

				/* Toggle lights */
				case Keyboard.KEY_L:

					this.lightsOn = !this.lightsOn;
					this.updateMaterials();

					break;

				case Keyboard.KEY_H: /* Toggle playerShip flashlight */

					this.playerShip.toggleFlashlight();

					break;

				/* Toggle Gouraud / Lambert Shading */
				case Keyboard.KEY_G:

					this.updateMaterials();
					break;

				/* Toggle the sun (day/night modes) */
				case Keyboard.KEY_N:

					this.sun.visible = !this.sun.visible;

					break;

				/* Start / Stop the game (clock) */
				case Keyboard.KEY_S:

					this.gameClock.running ? this.gameClock.stop() : this.gameClock.start();

					break;

				/* Toggle wireframe of the objects in the scene */
				case Keyboard.KEY_W:

					this.gameObjects.forEach( function( obj ) {

						obj.traverse( function ( node ) {

							if ( node.isMesh ) {

								node.material.wireframe = !node.material.wireframe;

							}

						});

					});

					break;

				/* Toggle field visibility */
				case Keyboard.KEY_9:

					this.field.visible = !this.field.visible;

					break;

				default: break;

			}
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

			case Keyboard.KEY_B:
			case Keyboard.KEY_SPACEBAR:

				this.playerShip.shooting = false;

				break;

			default: break;

		}
	}

}

new Game();
