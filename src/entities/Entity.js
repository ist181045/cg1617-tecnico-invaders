/**
 * CG Tecnico Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { Vector3 }  from '../lib/threejs/math/Vector3';

import Collidable from '../Collidable';

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

		this.updateBoundingBox = true;

		this.position.set( x, y, z );

	}

	setDirection ( x, y, z ) {

		this.direction.set( x, y, z ).normalize();

	}

	update ( dt ) {

		super.update();

		let v   = this.velocity.length();
		let dvf = this.friction * dt;
		let updatePos = false;

		if ( this.moving ) {

			if ( v !== this.MAX_VELOCITY ) {

				let dv = this.acceleration * dt;

				updatePos = true;

				if ( v + dv > this.MAX_VELOCITY ) {

					this.velocity.setLength( this.MAX_VELOCITY );

				} else {

					this.velocity.addScaledVector( this.direction, dv );

				}
				
			}

		} else if ( v > dvf ) {

			updatePos = true;
			this.velocity.addScaledVector( this.direction, -dvf );

		} else {

			this.velocity.setLength( 0 );

		}

		if ( updatePos ) {

			let ds = new Vector3().addScaledVector( this.velocity, dt );

			this.position.add( ds );
			this.boundingBox.translate( ds );
			this.boundingSphere.translate( ds );

		}

	}

}

export default Entity;
