/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { Object3D } from './lib/threejs/core/Object3D';
import { MeshNormalMaterial } from './lib/threejs/materials/MeshBasicMaterial';

class GameObject extends Object3D {

	constructor ( x, y, z ) {

		super();

		this.type = 'GameObject';

		this.material = new MeshNormalMaterial();

	}

}

export default GameObject;
