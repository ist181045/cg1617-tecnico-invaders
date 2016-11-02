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
		this.direction = new THREE.Vector2(-Math.sin(GameField.AShip.rotation.y), -Math.cos(GameField.AShip.rotation.y));
		this.direction.normalize();
		this.min = new THREE.Vector3(-0.5, -0.5, 2);
		this.max = new THREE.Vector3(0.5, 0.5, 2);
		this.bsRadius = Math.sqrt(this.max.x * this.max.x + this.max.y * this.max.y + this.max.z *  this.max.z);//2.1213;

		var pts = [new THREE.Vector3(0, 2, 0), new THREE.Vector3(0.5, 1.5, 0.5), new THREE.Vector3(0.75, 1, 1),
				   new THREE.Vector3(0.90, 0.5, 1.5), new THREE.Vector3(1, 0, 2), new THREE.Vector3(1, -0.5, 2.5),
				   new THREE.Vector3(1, -1, 3), new THREE.Vector3(1, -1.5, 3.5), new THREE.Vector3(1, -2, 4)];

		var geometry = new THREE.CubeGeometry (1, 1, 4);
		//var geometry = new THREE.LatheGeometry(pts, 50, 0, 2 * Math.PI);
		var mesh = new THREE.Mesh( geometry , material1 );
		//mesh.rotation.x = -Math.PI/2;

		mesh.rotation.y = GameField.AShip.rotation.y;
		this.add(mesh);
		this.position.set( x, y, z );
	}

	move ( interval ) {
		this.position.x += this.direction.x * this.velocity * interval;
		this.position.z += this.direction.y * this.velocity * interval;

		//this.wallCollision ();
		//this.shipCollision();
	}

	/*wallCollision () {
		if ( ) {
			scene.remove(this);
			GameField.Bullets.splice(GameField.Bullets.indexOf(this), 1);
		}
	}

	shipCollision () {
		for (var i = 0; i < GameField.EShips.length; i++) {
			var s =  GameField.EShips[i];
			if (){
				if (){
					if () ){
						scene.remove(this);
						GameField.remove(s);
						GameField.Bullets.splice(GameField.Bullets.indexOf(this), 1);
						GameField.EShips.splice(GameField.EShips.indexOf(s), 1);
					}
				}
			}
		}
	}*/
}
