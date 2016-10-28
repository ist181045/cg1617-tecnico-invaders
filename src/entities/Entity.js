/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { Object3D, Vector3 } from '../lib/Three.js';

class Entity extends Object3D {

	constructor ( x, y, z ) {

		super();

		this.type = 'Entity';

		this.MAX_VELOCITY = 10;

		this.velocity     = new Vector3();
		this.trajectory   = new Vector3();

		this.acceleration = 10;

		this.position.set( x, y, z );

	}

	move ( dt ) {

		let vlim = this.MAX_VELOCITY;

		if ( this.velocity.lengthSq() < vlim * vlim ) {

			this.velocity.addScaledVector( this.trajectory, this.acceleration * dt );

		} else if ( this.velocity.length() === vlim ) {

			this.velocity.setLength( vlim );

		}

		this.position.addScaledVector( this.velocity, dt );

	}

}

export { Entity };
