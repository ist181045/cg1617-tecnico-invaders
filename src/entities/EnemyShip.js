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
import { MeshLambertMaterial } from '../lib/threejs/materials/MeshLambertMaterial';
import { MeshPhongMaterial } from '../lib/threejs/materials/MeshPhongMaterial';

import Entity from './Entity.js';

class EnemyShip extends Entity {

	constructor ( x, y, z ) {

		super( x, y, z );

		this.type = 'EnemyShip';

		this.MAX_VELOCITY = 70;

		this.direction = (function( self ) {

			let [ x, z ] = [ Math.random() - 0.5, Math.random() - 0.5 ];

			return new Vector3( x, 0, z ).normalize();

		}( this ));

		this.moving = true;

		this.materials.push( new MeshLambertMaterial( { color: 0xe04040 } ) );
		this.materials.push( new MeshPhongMaterial(
			{
				color: 0xe04040,
				specular: 0x777777,
				shininess: 10
			}
		));

		this.add( function( self ) {

			return new Mesh( new DodecahedronGeometry( 15, 0 ), self.material );

		}( this ));

		++EnemyShip.count;

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

			case 'PlayerShip':

				this.alive = false;

				--other.lives;
				if ( other.lives <= 0 )
					other.alive = false;

				break;

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

			case 'Bullet':

				this.alive = false;
				other.alive = false;

				break;

			default: break;

		}

		!this.alive && --EnemyShip.count;

	}

}

EnemyShip.count = 0;

export default EnemyShip;
