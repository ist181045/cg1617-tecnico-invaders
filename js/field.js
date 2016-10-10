/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura (ist181045)
 * @author: Diogo Freitas (ist181586)
 * @author: Sara Azinhal (ist181700)
 */

var field;
var	material4 = new THREE.MeshBasicMaterial({ color: 0x1a1a1a, wireframe: true });
var material5 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

function createField(x, y, z) {
	field = new THREE.Object3D();

	addBottom(field, 0, -100, 0);
	addVerticalBarriers(field, -975, 0, 0);
	addVerticalBarriers(field, 975, 0, 0);
	addHorizontalBarriers(field, 0, 0, -725);
	addHorizontalBarriers(field, 0, 0, 725);

	scene.add(field);
	field.position.x = x;
	field.position.y = y;
	field.position.z = z;

	function addBottom(obj, x, y, z) {
		var geometry = new THREE.CubeGeometry(2000, 1, 1500);
		var mesh = new THREE.Mesh(geometry, material4);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	function addVerticalBarriers(obj, x, y, z) {
		var geometry = new THREE.CubeGeometry(50, 200, 1500);
		var mesh = new THREE.Mesh(geometry, material5);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	function addHorizontalBarriers(obj, x, y, z) {
		var geometry = new THREE.CubeGeometry(2000, 200, 50);
		var mesh = new THREE.Mesh(geometry, material5);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}
}