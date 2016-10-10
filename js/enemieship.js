/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura (ist181045)
 * @author: Diogo Freitas (ist181586)
 * @author: Sara Azinhal (ist181700)
 */

var material3 = new THREE.MeshBasicMaterial({ color: 0x404040, wireframe: false });

function createEnemieShip(x, y, z) {
	var ship = new THREE.Object3D();

	addESCockpit(ship, 0, 0, 0);
	addESWingConector1(ship, 27, 0, 0);
	addESWingConector2(ship, -27, 0, 0);
	addESWing(ship, -39, -30, -17.5);
	addESWing(ship, 39, -30, -17.5);

	scene.add(ship);
	ship.position.x = x;
	ship.position.y = y;
	ship.position.z = z;

	function addESCockpit(obj, x, y, z) {
		var geometry = new THREE.SphereGeometry(20, 100, 100);
		var mesh = new THREE.Mesh(geometry, material3);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	function addESWingConector1(obj, x, y, z) {
		var geometry = new THREE.CylinderGeometry(5, 10, 25, 100, 10, false);
		var mesh = new THREE.Mesh(geometry, material3);
		mesh.rotation.z = -Math.PI/2;
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	function addESWingConector2(obj, x, y, z) {
		var geometry = new THREE.CylinderGeometry(5, 10, 25, 100, 10, false);
		var mesh = new THREE.Mesh(geometry, material3);
		mesh.rotation.z = Math.PI/2;
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	function addESWing(obj, x, y, z) {
		var hexagonShape = new THREE.Shape();
		hexagonShape.moveTo(0, 0);
		hexagonShape.lineTo(35, 0);
		hexagonShape.lineTo(43, 30);
		hexagonShape.lineTo(35, 60);
		hexagonShape.lineTo(0, 60);
		hexagonShape.lineTo(-8, 30);
		hexagonShape.lineTo(0, 0);

		var geometry = new THREE.ExtrudeGeometry(hexagonShape, { amount: -2, bevelEnabled: false });
		var mesh = new THREE.Mesh(geometry, material3);
		mesh.rotation.y = -Math.PI/2;
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}
}