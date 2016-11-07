/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import GameObject from './GameObject';
import Barrier from './Barrier';

class Field extends GameObject {

	constructor ( x, y, z, w = 200, l = 200 ) {

		super( x, y, z );

		this.type = 'Field';

		this.width  = w;
		this.length = l;

		this.add( new Barrier( ( ( x - w ) >> 1 ) + 2, y, z, 4, 10, l ) );
		this.add( new Barrier( ( ( x + w ) >> 1 ) - 2, y, z, 4, 10, l ) );
		this.add( new Barrier( x, y, ( ( z - l ) >> 1 ) + 2, w, 10, 4 ) );
		this.add( new Barrier( x, y, ( ( z + l ) >> 1 ) - 2, w, 10, 4 ) );

	}

}

export default Field;
