/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura (ist181045)
 * @author: Diogo Freitas (ist181586)
 * @author: Sara Azinhal (ist181700)
 */

var AShip;
var	material1 = new THREE.MeshBasicMaterial({ color: 0xbfbfbf, wireframe: true });
var material2 = new THREE.MeshBasicMaterial({ color: 0x404040, wireframe: true });

function createAlliedShip(x, y, z) {
	AShip = new THREE.Object3D();
  	AShip.userData = {direction: 0, velocity: 0, braking: false, aceleration: 200};

	addASCenter(AShip, 0, 0, 0);
	addASPropulsor(AShip, 0, 0, 10);
	addASCanon(AShip, 0, 0, -30);
	addASGun(AShip, 8, 0, -48);
	addASGun(AShip, -8, 0, -48);
	addASGunCockpit1(AShip, -10, -5, -30);
	addASGunCockpit2(AShip, 10, -5, -30);
	/*addASLeg(AShip, 0, 0, 0);*/

	scene.add(AShip);
	AShip.position.x = x;
	AShip.position.y = y;
	AShip.position.z = z;

	function addASCenter(obj, x, y, z) {
		var geometry = new THREE.CylinderGeometry(40, 40, 10, 100, 10, false);
		var mesh = new THREE.Mesh(geometry, material1);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	function addASPropulsor(obj, x, y, z) {
		var geometry = new THREE.CylinderGeometry(35, 35, 7, 100, 10, false);
		var mesh = new THREE.Mesh(geometry, material2);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	function addASCanon(obj, x, y, z) {
		var geometry = new THREE.CubeGeometry(10, 10, 35);
		var mesh = new THREE.Mesh(geometry, material1);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	function addASGun(obj, x, y, z) {
		var geometry = new THREE.CubeGeometry(4, 10, 36);
		var mesh = new THREE.Mesh(geometry, material1);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	function addASGunCockpit1(obj, x, y, z) {
		var triangleShape = new THREE.Shape();
		triangleShape.moveTo(0, 0);
		triangleShape.lineTo(0, 16);
		triangleShape.lineTo(36, 0);
		triangleShape.lineTo(0, 0);

		var geometry = new THREE.ExtrudeGeometry(triangleShape, { amount: 10, bevelEnabled: false });
		var mesh = new THREE.Mesh(geometry, material1);
		mesh.rotation.x = -Math.PI/2;
		mesh.rotation.z = Math.PI/2;
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	function addASGunCockpit2(obj, x, y, z) {
		var triangleShape = new THREE.Shape();
		triangleShape.moveTo(0, 0);
		triangleShape.lineTo(0, 16);
		triangleShape.lineTo(36, 0);
		triangleShape.lineTo(0, 0);

		var geometry = new THREE.ExtrudeGeometry(triangleShape, { amount: -10, bevelEnabled: false });
		var mesh = new THREE.Mesh(geometry, material1);
		mesh.rotation.x = Math.PI/2;
		mesh.rotation.z = -Math.PI/2;
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	function addASLeg(obj, x, y, z) {
		var geometry = new THREE.CubeGeometry(4, 1, 4);
		var mesh = new THREE.Mesh(geometry, material1);
		mesh.position.set(x, (y - 2.5), z);

		var geometry1 = new THREE.CylinderGeometry(2, 2, 4, 20, 4, false);
		var mesh1 = new THREE.Mesh(geometry1, material1);
		mesh1.position.set(x, y, z);

		obj.add(mesh);
		obj.add(mesh1);
	}
}