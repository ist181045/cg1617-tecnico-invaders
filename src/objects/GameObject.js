/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { Object3D } from '../lib/threejs/core/Object3D';
import { MeshNormalMaterial } from '../lib/threejs/materials/MeshNormalMaterial';

class GameObject extends Object3D {

	constructor ( x, y, z ) {

		super();

		this.type = 'GameObject';

		this.isGameObject = true;

		this.materials = [
			new MeshNormalMaterial()
		];

		this.material = this.materials[0];

		this.materialIndex = 0;

		this.phong = false;

		this.position.set( x || 0, y || 0, z || 0 );

	}

	changeMaterial ( index ) {

		let newMaterial = this.materials[ index ];
		this.materialIndex = index;

		this.children.forEach( function ( child ) {

			if ( child.isGameObject ) child.changeMaterial( index );
			else if ( child.isMesh ) child.material = newMaterial;

		});

		this.material = newMaterial;

	}

}

export default GameObject;
