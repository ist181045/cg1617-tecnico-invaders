/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { Mesh } from '../lib/threejs/objects/Mesh';
import { BoxGeometry } from '../lib/threejs/geometries/BoxGeometry';
import { MeshLambertMaterial } from '../lib/threejs/materials/MeshLambertMaterial';
import { MeshPhongMaterial } from '../lib/threejs/materials/MeshPhongMaterial';

import Collidable from './Collidable';

class Barrier extends Collidable {

	constructor ( x, y, z, w, h, l, n ) {

		super( x, y, z );

		this.type = 'Barrier';

		this.normal = n.normalize();

		this.updateBoundries = true;

		this.boundingSphere = null;

		this.materials.push( new MeshLambertMaterial( { color: 0x505050 } ) );
		this.materials.push( new MeshPhongMaterial(
			{
				color: 0x505050,
				specular: 0x777777,
				shininess: 4
			}
		));

		this.add( function( self ) {

			return new Mesh( new BoxGeometry( w, h, l ), self.material );

		}( this ));

	}

	intersect ( other ) {

		return this.type !== other.type && this.intersectBox( other );

	}

	handleCollision ( other, dt ) {

		switch ( other.type ) {

			case 'PlayerShip':

				other.direction.negate();
				other.velocity.negate();
				other.update( dt );

				other.moving = false;
				other.velocity.multiplyScalar( 0.3 );

				break;

			case 'EnemyShip':

				other.direction.reflect( this.normal );
				other.velocity.reflect( this.normal );
				other.update( dt );

				break;

			case 'Bullet':

				other.alive = false;

				break;

			default: break;

		}

	}

}

export default Barrier;
