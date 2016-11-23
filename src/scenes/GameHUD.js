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

import PlayerShip from '../entities/PlayerShip';

class GameHUD extends Scene {

	constructor ( renderer, maxLives ) {

		super();

		this.renderer = renderer;

		this.maxLives = maxLives;
		this.lives = maxLives;

		this.ships = new Array();

		this.camera = new OrthographicCamera( 0, 60 * this.maxLives, 30, -30, -30, 30 );
		this.camera.position.set( 0, 1, 0 );
		this.camera.lookAt( this.position );

	}

	setVisibility () {

		this.ships.forEach( function( ship, index ) {

			ship.visible = index < this.lives;

		}, this);

	}

	setup () {

		for ( let i = this.children.length; i > 0; --i ) {

			this.remove( this.children[i] );

		}

		this.ships = new Array();
		for ( let i = 0; i < this.maxLives; ++i ) {

			let ship = new PlayerShip( 30 * ( 2 * ( this.maxLives - i ) - 1 ) );

			ship.rotateY( Math.PI / 2 );
			ship.scale.multiplyScalar( 0.6 );
			ship.material.depthTest = false;
			ship.material.depthWrite = false;

			this.ships.push( ship );
			this.add( this.ships[i] );

		}

		this.lives = this.maxLives;

		this.setVisibility();
		this.update();

	}

	update () {

		let size = this.renderer.getSize();

		this.renderer.setViewport(
			size.width - 60 * this.maxLives, size.height - 60,
			60 * this.maxLives, 60);

		this.renderer.render( this, this.camera );

	}

}

export default GameHUD;
