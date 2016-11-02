/**
 * CG Tecnico Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { Vector3 }  from '../lib/Three.js';

import Collidable from '../Collidable.js';

class Entity extends Collidable {

	constructor ( x, y, z ) {

		super();

		this.type = 'Entity';

		this.MAX_VELOCITY = 30;

		this.moving       = false;
		this.direction    = new Vector3();
		this.velocity     = new Vector3();
		this.acceleration = 10;
		this.friction     = 8;

		this.position.set( x, y, z );

		return this;

	}

	setDirection( x, y, z ) {

		this.direction.set( x, y, z );

		if ( this.direction.lengthSq() > 1 ) {

			this.direction.normalize();

		}

	}

	update ( dt ) {

		super();

		let v = this.velocity.length();
		let dvf = this.friction * dt;

		if ( this.moving ) {

			let dv = this.acceleration * dt;
			this.velocity.addScaledVector( this.direction, dv );

			if ( v + dv > this.MAX_VELOCITY ) {

				this.velocity.setLength( this.MAX_VELOCITY );

			}

			this.position.addScaledVector( this.velocity, dt );
			
		} else if ( v > dvf ) {

			this.velocity.addScaledVector( this.direction, -dvf );
			this.position.addScaledVector( this.velocity, dt );

		} else {

			this.velocity.setLength( 0 );

		}


	}

}

export default Entity;
