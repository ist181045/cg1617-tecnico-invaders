/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura (ist181045)
 * @author: Diogo Freitas (ist181586)
 * @author: Sara Azinhal (ist181700)
 */

class Field {

	constructor(x, y, z) {
		var field = new THREE.Object3D();

		this.addBottom(field, 0, -75, 0);
		this.addVerticalBarriers(field, -975, 0, 0);
		this.addVerticalBarriers(field, 975, 0, 0);
		this.addHorizontalBarriers(field, 0, 0, -725);
		this.addHorizontalBarriers(field, 0, 0, 725);

		scene.add(field);
		field.position.x = x;
		field.position.y = y;
		field.position.z = z;
	}

	addBottom(obj, x, y, z) {
		var geometry = new THREE.CubeGeometry(2000, 1, 1500);
		var mesh = new THREE.Mesh(geometry, material4);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addVerticalBarriers(obj, x, y, z) {
		var geometry = new THREE.CubeGeometry(50, 150, 1500);
		var mesh = new THREE.Mesh(geometry, material5);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addHorizontalBarriers(obj, x, y, z) {
		var geometry = new THREE.CubeGeometry(2000, 150, 50);
		var mesh = new THREE.Mesh(geometry, material5);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}
}