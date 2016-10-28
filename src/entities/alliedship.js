/**
 * CG Tecnico Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura ( ist181045 )
 * @author: Diogo Freitas ( ist181586 )
 * @author: Sara Azinhal ( ist181700 )
 */

import { Entity } from './Entity.js';

class PlayerShip extends Entity {

	constructor ( x, y, z ) {

		super( x, y, z );

		this.max_speed = 750;
		this.acceleration = 100;
		this.friction = 37.5;
		this.direction = 'none';
		this.velocity = 0;

		this.addASCenter( this, 0, 0, 0 );
		this.addASPropulsor( this, 0, 0, 2.5 );
		this.addASCanon( this, 0, 0, -7.5 );
		this.addASGun( this, 2, 0, -12 );
		this.addASGun( this, -2, 0, -12 );
		this.addASGunCockpit1( this, -2.5, -1.25, -7.5 );
		this.addASGunCockpit2( this, 2.5, -1.25, -7.5 );
		//this.addASLeg( this, 0, -9, 0 );

		this.boundingBox = new THREE.Box3();
		this.boundingBox.setFromObject(this);
		this.boundingSphere = new THREE.Sphere();
		this.boundingBox.getBoundingSphere(this.boundingSphere);

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

	updateBoundingBox() {
		this.boundingBox.setFromObject(this);
		this.boundingBox.getBoundingSphere(this.boundingSphere);
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

		this.position.x += this.velocity * interval;
		this.updateBoundingBox();

		this.wallCollision();

		cameraDynamic.position.x += this.velocity * interval;
	}

	fire () {
		if (WEAPONS_SYSTEM == 1){
			var b = new Bullet(this.position.x, 10, this.position.z - 14.5);
			scene.add(b);
			GameField.Bullets.push(b);
		}

		if (WEAPONS_SYSTEM == 2){
			var b1 = new Bullet(this.position.x - 2, 10, this.position.z - 18);
			var b2 = new Bullet(this.position.x + 2, 10, this.position.z - 18);
			scene.add(b1);
			scene.add(b2);
			GameField.Bullets.push(b1);
			GameField.Bullets.push(b2);
		}
	}

	wallCollision () {
		if ( this.boundingBox.intersectsBox(GameField.rbbb) ) {
			this.position.x = GameField.rbbb.min.x - 10;
			this.velocity = 0;
			this.direction = "none";
		}

		if ( this.boundingBox.intersectsBox(GameField.lbbb) ) {
			this.position.x = GameField.lbbb.max.x + 10;
			this.velocity = 0;
			this.direction = "none";
		}
	}
}

export { PlayerShip };
