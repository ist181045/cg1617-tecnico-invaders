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

import Entity from './Entity';

class Bullet extends Entity {

	constructor ( x, y, z ) {

		super( x, y, z );

		this.type = 'Bullet';

		this.MAX_VELOCITY = 400;

		this.moving = true;

		this.materials.push( new MeshLambertMaterial( { color: 0x7070f0 } ) );
		this.materials.push( new MeshPhongMaterial(
			{
				color: 0x7070f0,
				specular: 0x777777,
				shininess: 4
			}
		));

		this.add( function( self ) {

			return new Mesh( new BoxGeometry( 4, 4, 10 ), self.materials[0] );

		}( this ) );

	}

	handleCollision ( other, dt ) {

		switch ( other.type ) {

			case 'EnemyShip':

				this.alive = false;
				other.alive = false;

				break;

			case 'Barrier':

				this.alive = false;

				break;

			default: break;

		}

	}

}

export default Bullet;
