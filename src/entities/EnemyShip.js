/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { DodecahedronGeometry } from '../lib/threejs/geometries/DodecahedronGeometry';
import { Mesh } from '../lib/threejs/objects/Mesh';
import { Vector3 } from '../lib/threejs/math/Vector3';

import Entity from './Entity.js';

class EnemyShip extends Entity {

	constructor ( x, y, z ) {

		super( x, y, z );

		this.type = 'EnemyShip';

		this.MAX_VELOCITY = 200;

		this.direction = (function( self ) {

			let [ x, z ] = [ Math.random() - 0.5, Math.random() - 0.5 ];

			return new Vector3( x, 0, z ).normalize();

		}( this ));

		this.moving = true;

		this.add( function( self ) {

			return new Mesh( new DodecahedronGeometry( 15, 0 ), self.material );

		}( this ));

	}

	setDirection ( x, y, z ) {

		/* HACK: Do not allow direction changes */
		return;

	}

	intersect ( other ) {

		if ( other.type === 'Barrier' ) return other.intersect( this );

		return super.intersect( other );

	}

	handleCollision ( other, dt ) {

		switch ( other.type ) {

			case 'EnemyShip':

				this.direction.negate();
				this.velocity.negate();
				this.update( dt );

				other.direction.negate();
				other.velocity.negate();
				other.update( dt );

				break;

			case 'Barrier':

				/* Delegate to barrier */
				other.handleCollision( this, dt );

				break;

			default: break;

		}
	}

}

export default EnemyShip;
