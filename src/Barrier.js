/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { Mesh } from './lib/threejs/objects/Mesh';
import { BoxGeometry } from './lib/threejs/geometries/BoxGeometry';

import Collidable from './Collidable';

class Barrier extends Collidable {

	constructor ( x, y, z, w, h, l ) {

		super( x, y, z );

		this.type = 'Barrier';

		this.updateBoundries = true;

		this.boundingSphere = null;

		this.add( function( self ) {

			return new Mesh( new BoxGeometry( w, h, l ), self.material );

		}( this ));

	}

	intersect ( other ) {

		return this.type !== other.type && this.intersectBox( other );

	}

	handleCollision ( other, dt ) {

		let n = this.position.clone().negate().normalize();

		switch ( other.type ) {

			case 'PlayerShip':

				other.direction.negate();
				other.velocity.negate().multiplyScalar( 0.4 );
				other.update( dt );

				break;

			case 'EnemyShip': {

				other.direction.reflect( n );
				other.velocity.reflect( n );
				other.update( dt );

				break;

			}

		}

	}

}

export default Barrier;
