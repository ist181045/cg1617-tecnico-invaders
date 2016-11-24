/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { Scene } from '../lib/threejs/scenes/Scene';
import { OrthographicCamera } from '../lib/threejs/cameras/OrthographicCamera';
import { TextureLoader } from '../lib/threejs/loaders/TextureLoader';

import { Mesh } from '../lib/threejs/objects/Mesh';
import { MeshBasicMaterial } from '../lib/threejs/materials/MeshBasicMaterial';
import { PlaneGeometry } from '../lib/threejs/geometries/PlaneGeometry';

import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../Constants';

class GameBanner extends Scene {

	constructor ( renderer, width, height ) {

		super();

		this.renderer = renderer;

		this.width  = width;
		this.height = height;

		this.camera = (function ( self ) {

			let camera = new OrthographicCamera(
				self.width / -2, self.width / 2,
				self.height / 2, self.height / -2,
				-10, 10
			);

			camera.position.set( 0, 1, 0 );
			camera.lookAt( self.position );

			camera.updateProjectionMatrix();

			return camera;

		}( this ));

		/*this.screens = (function () {

			let screens = new Array();
			let loader = new TextureLoader();

			screens.push( loader.load( './resources/img/screens/pause.jpg' ) );
			screens.push( loader.load( './resources/img/screens/game_won.jpg' ) );
			screens.push( loader.load( './resources/img/screens/game_over.jpg' ) );

			return screens;

		}());*/

		this.banner = (function ( self ) {

			let mesh;

			let geo = new PlaneGeometry( self.width, self.height );
			let mat = new MeshBasicMaterial();

			mat.transparent = true;
			mat.opacity = 0.7;
			mat.depthTest = false;
			mat.depthWrite = false;

			mesh = new Mesh( geo, mat );
			mesh.rotateX( Math.PI / -2 );

			return mesh;

		}( this ));

		this.add( this.banner );
		this.visible = false;

	}

	toggleVisibility ( shipAlive = false, gameOver = false ) {

		if ( !this.visible ) {

			/*if ( gameOver ) {

				this.banner.material.map = shipAlive ? this.screens[1] : this.screens[0];

			} else {

				this.banner.material.map = this.screens[0];

			}*/

			this.update();

		}

		this.visible = !this.visible;

	}

	update () {

		this.renderer.setViewport( 0, 0, WINDOW_WIDTH(), WINDOW_HEIGHT() );
		this.renderer.render( this, this.camera );

	}

	resize () {

		let ratio = WINDOW_WIDTH() / WINDOW_HEIGHT();

		if ( ratio > ( this.width / this.height ) ) {

			this.camera.left   = ( this.height * ratio ) / -2;
			this.camera.right  = ( this.height * ratio ) /  2;
			this.camera.top    = this.height /  2;
			this.camera.bottom = this.height / -2;

		} else {

			this.camera.left   = this.width / -2;
			this.camera.right  = this.width /  2;
			this.camera.top    = ( this.width / ratio ) /  2;
			this.camera.bottom = ( this.width / ratio ) / -2;

		}

		this.camera.updateProjectionMatrix();

	}

}

export default GameBanner;
