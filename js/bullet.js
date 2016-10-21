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
	}

	move ( interval ) {
		this.position.z -= this.velocity * interval;

		this.wallCollision ();
	}

	wallCollision () {
		if ( this.position.z < -205 ) {
			scene.remove(this);
		}
	}
}