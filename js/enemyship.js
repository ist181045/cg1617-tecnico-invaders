/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

class EnemyShip extends THREE.Object3D {

	constructor ( x, y, z ) {

		super();

		this.max_speed = 30;
		this.acceleration = 50;
		this.direction = new THREE.Vector2(0, 0);
		this.velocity = new THREE.Vector2(0, 0);

		this.addESCockpit( this, 0, 0, 0 );
		this.addESWingConector1( this, 6.75, 0, 0 );
		this.addESWingConector2( this, -6.75, 0, 0 );
		this.addESWing( this, -9.75, -7.5, -4.375 );
		this.addESWing( this, 9.75, -7.5, -4.375 );

		scene.add( this );
		this.position.x = x;
		this.position.y = y;
		this.position.z = z;

		//this.collisionSphere ( this, 0, 0, 0 );
		//this.collisionBox ( this, 0, 0, 0 );
		
		this.boundingBox = new THREE.Box3();
		this.boundingBox.setFromObject(this);
		this.boundingSphere = new THREE.Sphere();
		this.boundingBox.getBoundingSphere(this.boundingSphere);

		this.calcRandomDirection ();
	}

	addESCockpit ( obj, x, y, z ) {
		var geometry = new THREE.SphereGeometry( 5, 25, 25 );
		var mesh = new THREE.Mesh( geometry, material3 );
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addESWingConector1 ( obj, x, y, z ) {
		var geometry = new THREE.CylinderGeometry( 1.25, 2.5, 6.25, 50, 2.5, false );
		var mesh = new THREE.Mesh( geometry, material3 );
		mesh.rotation.z = -Math.PI/2;
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addESWingConector2 ( obj, x, y, z ) {
		var geometry = new THREE.CylinderGeometry( 1.25, 2.5, 6.25, 50, 2.5, false );
		var mesh = new THREE.Mesh( geometry, material3 );
		mesh.rotation.z = Math.PI/2;
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addESWing ( obj, x, y, z ) {
		var hexagonShape = new THREE.Shape();
		hexagonShape.moveTo( 0, 0 );
		hexagonShape.lineTo( 8.75, 0 );
		hexagonShape.lineTo( 10.75, 7.5 );
		hexagonShape.lineTo( 8.75, 15 );
		hexagonShape.lineTo( 0, 15 );
		hexagonShape.lineTo(-2, 7.5);
		hexagonShape.lineTo( 0, 0 );

		var geometry = new THREE.ExtrudeGeometry( hexagonShape, { amount: -0.5, bevelEnabled: false } );
		var mesh = new THREE.Mesh( geometry, material3 );
		mesh.rotation.y = -Math.PI/2;
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	calcRandomDirection () {
		this.direction.x = Math.random() * 2 - 1;
		this.direction.y = Math.random() * 2 - 1;
		this.direction.normalize();
	}

	/*collisionSphere ( obj, x, y, z) {
		var geometry = new THREE.SphereGeometry( 13, 25, 25 );
		var mesh = new THREE.Mesh( geometry, abbmaterial );
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	collisionBox ( obj, x, y, z ) {
		var geometry = new THREE.CubeGeometry( 19.75, 15, 12.75 );
		var mesh = new THREE.Mesh( geometry, abbmaterial );
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}*/

	updateBoundingBox() {
		this.boundingBox.setFromObject(this);
		this.boundingBox.getBoundingSphere(this.boundingSphere);
	}

	move ( interval ) {
		if ( this.velocity.x > -this.max_speed && this.velocity.x < this.max_speed ) {
			this.velocity.x += this.direction.x * this.acceleration * interval;
		}
		
		if ( this.velocity.y > -this.max_speed && this.velocity.y < this.max_speed ) {
			this.velocity.y += this.direction.y * this.acceleration * interval;
		}

		this.position.x += this.velocity.x * interval;
		this.position.z += this.velocity.y * interval;
		this.updateBoundingBox();

		this.wallCollision();
	}

	wallCollision () {
		if ( this.position.x > 111 ) {
			this.position.x = 111;
			this.direction.x = -this.direction.x;
			this.direction.y = this.direction.y;
			this.velocity.x = -this.velocity.x;
			this.velocity.y = this.velocity.y;
		}

		if ( this.position.x < -111 ) {
			this.position.x = -111;
			this.direction.x = -this.direction.x;
			this.direction.y = this.direction.y;
			this.velocity.x = -this.velocity.x;
			this.velocity.y = this.velocity.y;
		}

		if ( this.position.z > 114.75 ) {
			this.position.z = 114.75;
			this.direction.x = this.direction.x;
			this.direction.y = -this.direction.y;
			this.velocity.x = this.velocity.x;
			this.velocity.y = -this.velocity.y;
		}

		if ( this.position.z < -114.75 ) {
			this.position.z = -114.75;
			this.direction.x = this.direction.x;
			this.direction.y = -this.direction.y;
			this.velocity.x = this.velocity.x;
			this.velocity.y = -this.velocity.y;
		}
	}
}
