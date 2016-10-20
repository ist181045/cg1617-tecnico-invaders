/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

class AlliedShip {

	constructor ( x, y, z ) {
		this.max_speed = 750;
		this.acceleration = 100;
		this.friction = 37.5;
		this.direction = "none";
		this.velocity = 0;

		this.AS = new THREE.Object3D();

		this.addASCenter( this.AS, 0, 0, 0 );
		this.addASPropulsor( this.AS, 0, 0, 2.5 );
		this.addASCanon( this.AS, 0, 0, -7.5 );
		this.addASGun( this.AS, 2, 0, -12 );
		this.addASGun( this.AS, -2, 0, -12 );
		this.addASGunCockpit1( this.AS, -2.5, -1.25, -7.5 );
		this.addASGunCockpit2( this.AS, 2.5, -1.25, -7.5 );
		//this.addASLeg( this.AS, 0, -9, 0 );

		scene.add( this.AS );
		this.AS.position.x = x;
		this.AS.position.y = y;
		this.AS.position.z = z;
	}

	getObj () {
		return this.AS;
	}

	addASCenter ( obj, x, y, z ) {
		var geometry = new THREE.CylinderGeometry( 10, 10, 2.5, 50, 2.5, false );
		var mesh = new THREE.Mesh( geometry, material1 );
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addASPropulsor ( obj, x, y, z ) {
		var geometry = new THREE.CylinderGeometry( 8.75, 8.75, 1.75, 50, 1.75, false );
		var mesh = new THREE.Mesh( geometry, material2 );
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addASCanon ( obj, x, y, z ) {
		var geometry = new THREE.CubeGeometry( 2.5, 2.5, 8.75 );
		var mesh = new THREE.Mesh( geometry, material1 );
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addASGun ( obj, x, y, z ) {
		var geometry = new THREE.CubeGeometry( 1, 2.5, 9 );
		var mesh = new THREE.Mesh( geometry, material1 );
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addASGunCockpit1 ( obj, x, y, z ) {
		var triangleShape = new THREE.Shape();
		triangleShape.moveTo( 0, 0 );
		triangleShape.lineTo( 0, 4 );
		triangleShape.lineTo( 9, 0 );
		triangleShape.lineTo( 0, 0 );

		var geometry = new THREE.ExtrudeGeometry( triangleShape, { amount: 2.5, bevelEnabled: false } );
		var mesh = new THREE.Mesh( geometry, material1 );
		mesh.rotation.x = -Math.PI/2;
		mesh.rotation.z = Math.PI/2;
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addASGunCockpit2 ( obj, x, y, z ) {
		var triangleShape = new THREE.Shape();
		triangleShape.moveTo( 0, 0 );
		triangleShape.lineTo( 0, 4 );
		triangleShape.lineTo( 9, 0 );
		triangleShape.lineTo( 0, 0 );

		var geometry = new THREE.ExtrudeGeometry( triangleShape, { amount: -2.5, bevelEnabled: false } );
		var mesh = new THREE.Mesh( geometry, material1 );
		mesh.rotation.x = Math.PI/2;
		mesh.rotation.z = -Math.PI/2;
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addASLeg ( obj, x, y, z ) {
		var geometry = new THREE.CubeGeometry( 2, 0.5, 2 );
		var mesh = new THREE.Mesh( geometry, material1 );
		mesh.position.set( x, (y - 5), z );

		var geometry1 = new THREE.CylinderGeometry( 1, 1, 2, 20, 2, false );
		var mesh1 = new THREE.Mesh( geometry1, material1 );
		mesh1.position.set( x, y, z );

		obj.add( mesh );
		obj.add( mesh1 );
	}

	move ( interval ) {
		if ( this.direction == "left" ) {
			this.velocity -= ( this.acceleration - this.friction ) * interval;
		}

		if ( this.direction == "right" ) {
			this.velocity += ( this.acceleration - this.friction )  * interval;
		}

		if ( this.direction == "none" ) {
			if ( this.velocity < 0 ) {
				this.velocity += ( this.friction * 2 ) * interval;
				if ( this.velocity > 0 ) {
					this.velocity = 0;
				}
			}

			if ( this.velocity > 0 ) {
				this.velocity -= ( this.friction * 2 ) * interval;
				if ( this.velocity < 0 ) {
					this.velocity = 0;
				}
			}
		}

		this.AS.position.x += this.velocity * interval;
		this.collision();

		cameraDynamic.position.x += this.velocity * interval;
		
	}

	collision () {
		if ( this.AS.position.x > 111 ) {
			this.AS.position.x = 111;
			this.velocity = 0;
			this.direction = "none";
		}

		if ( this.AS.position.x < -111 ) {
			this.AS.position.x = -111;
			this.velocity = 0;
			this.direction = "none";
		}
	}
}
