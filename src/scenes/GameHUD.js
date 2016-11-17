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

import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../Constants';

import PlayerShip from '../entities/PlayerShip';

class GameHUD extends Scene {

	constructor ( renderer, maxLives ) {

		super();

		this.renderer = renderer;

		this.maxLives = maxLives;
		this.lives = maxLives;

		this.ships = new Array();

		this.camera = new OrthographicCamera( -30 * this.maxLives, 15, 15, -15, -10, 10 );

		this.setup();
		this.update();

	}

	setVisibility () {

		let i = 0;

		while ( i < this.lives ) this.ships[i++].visible = true;
		while ( i < this.ships.length ) this.ships[i++].visible = false;

	}

	setup () {

		for ( let i = 0; i < this.children.length; ++i ) {

			this.remove( this.children[i] );

		}

		this.ships = new Array();
		for ( let i = 0; i < this.maxLives; ++i ) {

			this.ships.push( new PlayerShip( 10 * ( i + 1 ) - 5 ) );
			this.ships[i].scale.multiplyScalar( 0.6 );
			this.add( this.ships[i] );

		}

	}

	update () {

		this.renderer.setViewport(
			WINDOW_WIDTH() - 30 * this.maxLives, WINDOW_HEIGHT() - 30,
			30 * this.maxLives, 30);
		this.renderer.render( this, this.camera );

	}

}

export default GameHUD;
