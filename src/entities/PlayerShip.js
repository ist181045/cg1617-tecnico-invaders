/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import Entity from './Entity.js';

class PlayerShip extends Entity {

	constructor ( x, y, z, camera ) {

		super( x, y, z );

		if ( camera === undefined || camera.type !== 'PerspectiveCamera' ) {

			throw new TypeError( 'PlayerShip: \'camera\' undefined or not PerspectiveCamera' );

		}

		this.type = 'PlayerShip';

		this.camera = (function ( self ) {

			camera.position.copy( self.position );
			camera.position.add( 0, 20, -50 );
			camera.lookAt( self.position );

			camera.updateProjectionMatrix();

			return camera;

		})( this );

		this.add( this.camera );
		this.add( function( self ) {

			/* TODO: Build player ship */

		}( this ));

		return this;

	}

	setDirection ( x, y, z ) {

		super( x, 0, 0 );

	}

}

export default PlayerShip;
