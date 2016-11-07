/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { BoxGeometry } from '../lib/threejs/geometries/BoxGeometry';
import { Mesh } from '../lib/threejs/objects/Mesh';
import { Vector3 } from '../lib/threejs/math/Vector3';

import Entity from './Entity.js';

class PlayerShip extends Entity {

	constructor ( x, y, z, camera ) {

		super( x, y, z );

		if ( camera === undefined || camera.type !== 'PerspectiveCamera' ) {

			throw new TypeError( 'PlayerShip: \'camera\' undefined or not PerspectiveCamera' );

		}

		this.type = 'PlayerShip';

		this.camera = (function ( self ) {

			camera.position.add( new Vector3( 0, 30, 75 ) );
			camera.lookAt( self.position.clone().negate() );

			camera.updateProjectionMatrix();

			return camera;

		})( this );

		this.add( this.camera );
		this.add( function( self ) {

			/* TODO: Build player ship */

			return new Mesh( new BoxGeometry( 10, 10, 10 ), self.material );

		}( this ));

	}

	setDirection ( x, y, z ) {

		super.setDirection( x, 0, 0 );

	}

	handleCollision ( other ) {

		switch ( other.type ) {

			case 'Field':

				/* TODO: Create Field and implement collisions with it */

				break;

			default: break;

		}

	}

}

export default PlayerShip;
