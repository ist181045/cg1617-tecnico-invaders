/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

class AlliedShip extends THREE.Object3D {

	constructor ( x, y, z ) {

		super();

		this.max_speed = 750;
		this.acceleration = 100;
		this.friction = 37.5;
		this.movementDir = "none";
		this.pointingDir = "none";
		this.velocity = 0;
		this.camera = null;
		this.min = new THREE.Vector3(-10, -1.25, -13.875);
		this.max = new THREE.Vector3(10, 1.25, 13.875);
		this.bsRadius = Math.sqrt(this.max.x * this.max.x + this.max.y * this.max.y + this.max.z *  this.max.z);//17.1373;

		this.addASCenter( this, 0, 0, 2.625 );
		this.addASPropulsor( this, 0, 0, 5.125 );
		this.addASCanon( this, 0, 0, -4.875 );
		this.addASGun( this, 2, 0, -9.375 );
		this.addASGun( this, -2, 0, -9.375 );
		this.addASGunCockpit1( this, -2.5, -1.25, -4.875 );
		this.addASGunCockpit2( this, 2.5, -1.25, -4.875 );
		//this.addASLeg( this, 0, -9, 0 );

		this.position.set( x, y, z );
	}

	getObj () {
		return this;
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
		var geometry = new THREE.CubeGeometry( 2, 2.5, 8.75 );
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
		if ( this.movementDir == "left" ) {
			this.velocity -= ( this.acceleration - this.friction ) * interval;
		}

		if ( this.movementDir == "right" ) {
			this.velocity += ( this.acceleration - this.friction )  * interval;
		}

		if ( this.movementDir == "none" ) {
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

		this.position.x += this.velocity * interval;
		if ( this.pointingDir == "left" ) this.rotation.y += 1.5 * interval;
		if ( this.pointingDir == "right" ) this.rotation.y -= 1.5 * interval;

		//this.wallCollision();
		cameraDynamic.updateProjectionMatrix();
	}

	fire () {
		if (WEAPONS_SYSTEM == 1){
			var b = new Bullet(this.children[2].matrixWorld.elements[12], 10, this.children[2].matrixWorld.elements[14]);
			scene.add(b);
			GameField.Bullets.push(b);
		}
			
		if (WEAPONS_SYSTEM == 2){
			var b1 = new Bullet(this.children[3].matrixWorld.elements[12], 10, this.children[3].matrixWorld.elements[14]);
			var b2 = new Bullet(this.children[4].matrixWorld.elements[12], 10, this.children[4].matrixWorld.elements[14]);
			scene.add(b1);
			scene.add(b2);
			GameField.Bullets.push(b1);
			GameField.Bullets.push(b2);
		}
	}

	/*wallCollision () {
		if (bsBarrierCollision(this) == [true, 0]) {
			this.position.x += GameField.lbbb.max.x - GameField.AShip.boundingBox.min.x;
			this.velocity = 0;
			this.movementDir = "none";
		}

		if (bsBarrierCollision(this) == [true, 1]) {
			this.position.x += GameField.rbbb.min.x - GameField.AShip.boundingBox.max.x;
			this.velocity = 0;
			this.movementDir = "none";
		}
	}*/
}
