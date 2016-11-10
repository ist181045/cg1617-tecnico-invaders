/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import GameObject from './objects/GameObject';
import Barrier from './objects/Barrier';

class Field extends GameObject {

	constructor ( x, y, z, w = 200, h = 200 ) {

		super( x, y, z );

		this.type = 'Field';

		this.width  = w;
		this.height = h;

		this.add( new Barrier( ( ( x - w ) >> 1 ) + 2, y, z, 4, 10, h ) );
		this.add( new Barrier( ( ( x + w ) >> 1 ) - 2, y, z, 4, 10, h ) );
		this.add( new Barrier( x, y, ( ( z - h ) >> 1 ) + 2, w, 10, 4 ) );
		this.add( new Barrier( x, y, ( ( z + h ) >> 1 ) - 2, w, 10, 4 ) );

	}

}

export default Field;
