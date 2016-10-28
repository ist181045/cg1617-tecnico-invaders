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
		this.min = new THREE.Vector3(-10, -7.5, -6.375);
		this.max = new THREE.Vector3(10, 7.5, 6.375);
		this.bsRadius = Math.sqrt(this.max.x * this.max.x + this.max.y * this.max.y + this.max.z *  this.max.z);//14.0764;

		this.addESCockpit( this, 0, 0, 0 );
		this.addESWingConector1( this, 6.75, 0, 0 );
		this.addESWingConector2( this, -6.75, 0, 0 );
		this.addESWing( this, -9.75, -7.5, -4.375 );
		this.addESWing( this, 9.75, -7.5, -4.375 );

		this.position.set( x, y, z );

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
		var angle = Math.random() * Math.PI * 2;
		this.direction.x = Math.cos(angle);
		this.direction.y = Math.sin(angle);
		//this.direction.normalize();
	}

	move ( interval ) {
		if ( this.velocity.length() < this.max_speed ) {
			this.velocity.x += this.direction.x * this.acceleration * interval;
			this.velocity.y += this.direction.y * this.acceleration * interval;
		}
		
		this.position.x += this.velocity.x * interval;
		this.position.z += this.velocity.y * interval;

		//this.wallCollision();
	}

	/*wallCollision () {
		if () {
			this.direction.x = -this.direction.x;
			this.direction.y = this.direction.y;
			this.velocity.x = -this.velocity.x;
			this.velocity.y = this.velocity.y;
		}

		if () {
			this.direction.x = this.direction.x;
			this.direction.y = -this.direction.y;
			this.velocity.x = this.velocity.x;
			this.velocity.y = -this.velocity.y;
		}
	}*/
}
