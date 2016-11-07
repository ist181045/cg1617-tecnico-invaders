/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { Box3 } from './lib/threejs/math/Box3';
import { Sphere } from './lib/threejs/math/Sphere';

import GameObject from './GameObject';

class Collidable extends GameObject {

	constructor ( x, y, z ) {

		super( x, y, z );

		this.type = 'Collidable';

		this.updateBoundries = false;

		this.boundingBox    = new Box3();
		this.boundingSphere = new Sphere();

	}

	intersect ( other ) {

		let rSum = this.boundingSphere.radius + other.boundingSphere.radius;
		let distSq = this.boundingSphere.center.distanceToSquared( other.boundingSphere.center );

		if ( rSum * rSum >= distSq ) {

			let [ a, b ] = [ this.boundingBox, other.boundingBox ];

			return (a.min.x < b.max.x && a.max.x > b.min.x &&
				a.min.y < b.max.y && a.max.y > b.min.y &&
				a.min.z < b.max.z && a.max.z > b.min.z);

		}

		return false;

	}

	handleCollision ( other ) {

		return;

	}

	update () {

		if ( this.updateBoundries ) {

			this.updateBoundries = false;
			this.boundingBox.setFromObject( this );
			this.boundingBox.getBoundingSphere( this.boundingSphere );

			console.log( this.type, 'updatd boundries!' );

		}

	}

}

export default Collidable;
