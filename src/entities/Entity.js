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

		super( x, y, z );

		this.type = 'Entity';

		this.MAX_VELOCITY = 1000;

		this.updateBoundingBox = true;

		this.moving       = false;
		this.direction    = new Vector3();
		this.velocity     = new Vector3();
		this.acceleration = 300;
		this.friction     = 350;

	}

	setDirection ( x, y, z ) {

		this.direction.set( x, y, z ).normalize();

	}

	update ( dt ) {

		super.update();

		let updatePos = false;

		let v   = this.velocity.length();
		let dvf = this.friction * dt;

		let dot = this.direction.dot( this.velocity );

		if ( this.moving ) {

			updatePos = true;

			if ( v !== this.MAX_VELOCITY ) {

				let dv = this.acceleration * dt;

				if ( v + dv > this.MAX_VELOCITY ) {

					this.velocity.setLength( this.MAX_VELOCITY );

				} else if ( v !== dot ) {

					this.velocity.addScaledVector( this.direction, dvf );

				}

				this.velocity.addScaledVector( this.direction, dv );

			}

		} else if ( v > dvf ) {

			updatePos = true;

			if ( v !== dot ) {

				this.direction.copy( this.velocity ).normalize();

			}

			this.velocity.addScaledVector( this.direction, -dvf );

		} else {

			this.velocity.setLength( 0 );

		}

		if ( updatePos ) {

			let ds = this.velocity.clone();

			this.position.add( ds.multiplyScalar( dt ) );
			this.boundingBox.translate( ds );
			this.boundingSphere.translate( ds );

		}

	}

}

export default Entity;
