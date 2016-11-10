/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { Geometry } from '../lib/threejs/core/Geometry';
import { Mesh } from '../lib/threejs/objects/Mesh';
import { Vector3 } from '../lib/threejs/math/Vector3';
import { Face3 } from '../lib/threejs/core/Face3';
import { MeshLambertMaterial } from '../lib/threejs/materials/MeshLambertMaterial';
import { MeshPhongMaterial } from '../lib/threejs/materials/MeshPhongMaterial';

import Entity from './Entity';
import Bullet from './Bullet';

class PlayerShip extends Entity {

	constructor ( x, y, z, camera ) {

		super( x, y, z );

		if ( camera === undefined || camera.type !== 'PerspectiveCamera' ) {

			throw new TypeError( 'PlayerShip: \'camera\' undefined or not PerspectiveCamera' );

		}

		this.type = 'PlayerShip';

		this.bullets  = new Array();
		this.shooting = false;
		this.reload   = 0;

		this.camera = (function ( self ) {

			camera.position.add( new Vector3( 0, 30, 75 ) );
			camera.lookAt( self.position.clone().negate() );

			camera.updateProjectionMatrix();

			return camera;

		})( this );
		this.add( this.camera );

		this.materials.push( new MeshLambertMaterial( { color: 0x4040e0 } ) );
		this.materials.push( new MeshPhongMaterial(
			{
				color: 0x4040e0,
				specular: 0x777777,
				shininess: 4
			}
		));

		this.add( function( self ) {

			let vertices = [

				new Vector3( -1,    0,    1    ),
				new Vector3( -1,    0.25, 1    ),
				new Vector3( -1,    0,    0.66 ),
				new Vector3( -0.33, 0,    1    ),
				new Vector3(  0,   -0.33, 1    ),
				new Vector3(  0,    0.33, 1    ),
				new Vector3(  0,    0,    0.9  ),
				new Vector3(  0,    0,   -1    )

			];

			let faces = [

				new Face3( 0, 1, 2 ),
				new Face3( 0, 2, 1 ),

				new Face3( 0, 3, 2 ),

				new Face3( 2, 3, 7 ),

				new Face3( 3, 7, 4 ),

				new Face3( 3, 4, 6 ),

				new Face3( 3, 6, 5 ),

				new Face3( 3, 5, 7 )

			];

			let lhalf = new Geometry();

			lhalf.vertices = vertices;
			lhalf.faces = faces;
			lhalf.mergeVertices();
			lhalf.computeFaceNormals();

			let rhalf = lhalf.clone();
			rhalf.scale( -1, 1, 1 );
			rhalf.faces.forEach( function ( face ) {

				let b = face.b;
				face.b = face.c;
				face.c = b;

			} );
			rhalf.computeFaceNormals();

			lhalf.merge( rhalf );

			return new Mesh( lhalf.scale( 30, 30, 30 ), self.material );

		}( this ));

	}

	setDirection ( x, y, z ) {

		super.setDirection( x, 0, 0 );

	}

	update ( dt ) {

		super.update( dt );

		this.reload > 0 && --this.reload;

	}

	fire () {

		if ( this.reload === 0 ) {

			let bullet = new Bullet( 0, 0, -20, this.materialIndex );

			bullet.direction.set( -Math.sin( this.rotation.y ), 0, -Math.cos( this.rotation.y ) );
			bullet.velocity.copy( bullet.direction ).multiplyScalar( bullet.MAX_VELOCITY );
			bullet.position.applyMatrix4( this.matrixWorld );

			this.bullets.push( bullet );
			this.reload = 25;

		}

	}

	intersect ( other ) {

		if ( other.type === 'Barrier' ) return other.intersect( this );

		return super.intersect( other );

	}

	handleCollision ( other, dt ) {

		switch ( other.type ) {

			case 'Barrier':

				/* Delegate to barrier */
				other.handleCollision( this, dt );

				break;

			default: break;

		}

	}

}

export default PlayerShip;
