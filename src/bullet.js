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

		this.velocity = 90;
		this.direction = new THREE.Vector2(0, 0);

		var geometry = new THREE.CubeGeometry (1, 1, 4);
		var mesh = new THREE.Mesh( geometry , material1 );

		mesh.position.set( x, y, z );
		this.add(mesh);

		this.boundingBox = new THREE.Box3();
		this.boundingBox.setFromObject(this);
		this.boundingSphere = new THREE.Sphere();
		this.boundingBox.getBoundingSphere(this.boundingSphere);
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
		if ( this.boundingBox.intersectsBox(GameField.tbbb)) {
			scene.remove(this);
			GameField.Bullets.shift();
		}
	}

	shipCollision () {
		for (var i = 0; i < GameField.EShips.length; i++) {
			var s =  GameField.EShips[i];
			if ( !this.boundingSphere.equals(s.boundingSphere)){
				if ( this.boundingSphere.intersectsSphere( s.boundingSphere ) ){
					if ( this.boundingBox.intersectsBox( s.boundingBox ) ){
						scene.remove(this);
						scene.remove(s);
						GameField.Bullets.splice(GameField.Bullets.indexOf(this), 1);
						GameField.EShips.splice(GameField.EShips.indexOf(s), 1);
					}
				}
			}
		}
	}
}