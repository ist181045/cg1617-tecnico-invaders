/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

class Bullet extends THREE.Object3D {

	constructor ( x, y, z ) {

		super();

		this.velocity = 60;
		this.direction = new THREE.Vector2(0, 0);

		var geometry = new THREE.CubeGeometry (1, 1, 4);
		var mesh = new THREE.Mesh( geometry , material1 );

		mesh.position.set( x, y, z );
		this.add(mesh);

		this.boundingBox = new THREE.Box3();
		this.boundingBox.setFromObject(this);
		this.boundingSphere = new THREE.Sphere();
		this.boundingBox.getBoundingSphere(this.boundingSphere);
		console.log(this.boundingSphere);
	}

	updateBoundingBox() {
		this.boundingBox.setFromObject(this);
		this.boundingBox.getBoundingSphere(this.boundingSphere);
	}

	move ( interval ) {
		this.position.z -= this.velocity * interval;
		this.updateBoundingBox();

		this.wallCollision ();
		this.shipCollision();
	}

	wallCollision () {
		if ( this.position.z < -205 ) {
			scene.remove(this);
		}
	}

	shipCollision () {
						console.log(this.boundingBox);

		GameField.EShips.children.forEach(
			function(s1) {
				console.log(this.boundingBox);
				if ( !this.boundingSphere.equals(s1.boundingSphere)){
					if ( this.boundingSphere.intersectsSphere( s1.boundingSphere ) ){
						if ( this.boundingBox.intersectsBox( s1.boundingBox ) ){
							scene.remove(this);
							scene.remove(s1);
							GameField.EShips.remove(s1);
						}
					}
				}
			}
		);
	}
}