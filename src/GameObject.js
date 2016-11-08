/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { Object3D } from './lib/threejs/core/Object3D';
import { MeshNormalMaterial } from './lib/threejs/materials/MeshNormalMaterial';

class GameObject extends Object3D {

	constructor ( x, y, z ) {

		super();

		this.type = 'GameObject';

		this.isGameObject = true;

		this.material = new MeshNormalMaterial();

		this.position.set( x || 0, y || 0, z || 0 );

	}

}

export default GameObject;
