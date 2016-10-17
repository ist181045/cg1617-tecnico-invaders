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
		this.acceleration = 400;
		this.friction = 150;
		this.direction = "none";
		this.velocity = 0;

		this.AS = new THREE.Object3D();

		this.addASCenter( this.AS, 0, 0, 0 );
		this.addASPropulsor( this.AS, 0, 0, 10 );
		this.addASCanon( this.AS, 0, 0, -30 );
		this.addASGun( this.AS, 8, 0, -48 );
		this.addASGun( this.AS, -8, 0, -48 );
		this.addASGunCockpit1( this.AS, -10, -5, -30 );
		this.addASGunCockpit2( this.AS, 10, -5, -30 );
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
		var geometry = new THREE.CylinderGeometry( 40, 40, 10, 100, 10, false );
		var mesh = new THREE.Mesh( geometry, material1 );
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addASPropulsor ( obj, x, y, z ) {
		var geometry = new THREE.CylinderGeometry( 35, 35, 7, 100, 10, false );
		var mesh = new THREE.Mesh( geometry, material2 );
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addASCanon ( obj, x, y, z ) {
		var geometry = new THREE.CubeGeometry( 10, 10, 35 );
		var mesh = new THREE.Mesh( geometry, material1 );
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addASGun ( obj, x, y, z ) {
		var geometry = new THREE.CubeGeometry( 4, 10, 36 );
		var mesh = new THREE.Mesh( geometry, material1 );
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addASGunCockpit1 ( obj, x, y, z ) {
		var triangleShape = new THREE.Shape();
		triangleShape.moveTo( 0, 0 );
		triangleShape.lineTo( 0, 16 );
		triangleShape.lineTo( 36, 0 );
		triangleShape.lineTo( 0, 0 );

		var geometry = new THREE.ExtrudeGeometry( triangleShape, { amount: 10, bevelEnabled: false } );
		var mesh = new THREE.Mesh( geometry, material1 );
		mesh.rotation.x = -Math.PI/2;
		mesh.rotation.z = Math.PI/2;
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addASGunCockpit2 ( obj, x, y, z ) {
		var triangleShape = new THREE.Shape();
		triangleShape.moveTo( 0, 0 );
		triangleShape.lineTo( 0, 16 );
		triangleShape.lineTo( 36, 0 );
		triangleShape.lineTo( 0, 0 );

		var geometry = new THREE.ExtrudeGeometry( triangleShape, { amount: -10, bevelEnabled: false } );
		var mesh = new THREE.Mesh( geometry, material1 );
		mesh.rotation.x = Math.PI/2;
		mesh.rotation.z = -Math.PI/2;
		mesh.position.set( x, y, z );

		obj.add( mesh );
	}

	addASLeg ( obj, x, y, z ) {
		var geometry = new THREE.CubeGeometry( 8, 2, 8 );
		var mesh = new THREE.Mesh( geometry, material1 );
		mesh.position.set( x, (y - 5), z );

		var geometry1 = new THREE.CylinderGeometry( 4, 4, 8, 40, 8, false );
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
	}

	collision () {
		if ( this.AS.position.x > 910 ) {
			this.AS.position.x = 910;
			this.velocity = 0;
			this.direction = "none";
		}

		if ( this.AS.position.x < -910 ) {
			this.AS.position.x = -910;
			this.velocity = 0;
			this.direction = "none";
		}
	}
}
