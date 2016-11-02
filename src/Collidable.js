/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { Object3D } from '../lib/Three.js';
import { Box3 } from '../lib/Three.js';
import { Sphere3 } from '../lib/Three.js';

class Collidable extends Object3D {

	constructor ( x, y, z ) {

		super();

		this.boundingBox    = new Box3();
		this.boundingSphere = new Sphere3();

		this.position.set( x, y, z );

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

export default Collidable;
