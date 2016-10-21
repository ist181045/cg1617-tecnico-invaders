/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

class EnemyShip {

	constructor ( x, y, z ) {
		this.max_speed = 200;
		this.acceleration = 10;
		this.direction = new THREE.Vector2(0, 0);
		this.velocity = new THREE.Vector2(0, 0);

		this.ES = new THREE.Object3D();

		this.addESCockpit( this.ES, 0, 0, 0 );
		this.addESWingConector1( this.ES, 6.75, 0, 0 );
		this.addESWingConector2( this.ES, -6.75, 0, 0 );
		this.addESWing( this.ES, -9.75, -7.5, -4.375 );
		this.addESWing( this.ES, 9.75, -7.5, -4.375 );

		scene.add( this.ES );
		this.ES.position.x = x;
		this.ES.position.y = y;
		this.ES.position.z = z;

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

	move ( interval ) {
		this.velocity.x += this.direction.x * this.acceleration * interval;
		this.velocity.y += this.direction.y * this.acceleration * interval;

		this.ES.position.x += this.velocity.x * interval;
		this.ES.position.z += this.velocity.y * interval;
	}
}
