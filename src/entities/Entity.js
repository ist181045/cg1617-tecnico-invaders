/**
 * CG Tecnico Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { Box3 }     from '../lib/Three.js';
import { Object3D } from '../lib/Three.js';
import { Sphere3 }  from '../lib/Three.js';
import { Vector3 }  from '../lib/Three.js';

class Entity extends Object3D {

	constructor ( x, y, z ) {

		super();

		this.type = 'Entity';

		this.MAX_VELOCITY = 30;

		this.moving       = false;
		this.direction    = new Vector3();
		this.velocity     = new Vector3();
		this.acceleration = 10;
		this.friction     = 8;

		this.boundingBox    = new Box3();
		this.boundingSphere = new Sphere3();

		this.position.set( x, y, z );

		return this;

	}

	setDirection( x, y, z ) {

		this.direction.set( x, y, z );

		if ( this.direction.lengthSq() > 1 ) {

			this.direction.normalize();

		}

	}

	move ( dt ) {

		let v = this.velocity.length();
		let dvf = this.friction * dt;

		if ( this.moving ) {

			let dv = this.acceleration * dt;
			this.velocity.addScaledVector( this.direction, dv );

			if ( v + dv > this.MAX_VELOCITY ) {

				this.velocity.setLength( this.MAX_VELOCITY );

			}

		} else if ( v > dvf ) {

			this.velocity.addScaledVector( this.direction, -dvf );

		} else {

			this.velocity.setLength( 0 );

		}

		this.position.addScaledVector( this.velocity, dt );

	}

	intersect ( other ) {

		let r1 = this.boundingSphere.radius;
		let r2 = other.boundingSphere.radius;
		let distSq = this.position.distanceToSquared( other.position );

		if ( ( r1 * r1 + r2 * r2 ) >= distSq ) {

			let [ a, b ] = [ this.boundingBox, other.boundingBox ];

			return (a.min.x <= b.max.x && a.max.x >= b.min.x &&
				a.min.y <= b.max.y && a.max.y >= b.min.y &&
				a.min.z <= b.max.z && a.max.z >= b.min.z);

		}

		return false;

	}

}

export default Entity;
