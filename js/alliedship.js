/**
 * CG Space Invaders
 * RC45179 16'17
 *
 * @author: Rui Ventura (ist181045)
 * @author: Diogo Freitas (ist181586)
 * @author: Sara Azinhal (ist181700)
 */

var AShip;

function createAlliedShip(x, y, z) {
	AShip = new THREE.Object3D();
  	AShip.userData = {direction: 0, velocity: 0, aceleration: 500};
	material = new THREE.MeshBasicMaterial({ color: 0xbfbfbf, wireframe: false });

	addASCenter(AShip, 0, 0, 0);
	addASCanon(AShip, 0, 0, -30);
	addASGun(AShip, 8, 0, -48);
	addASGun(AShip, -8, 0, -48);
	addASGunCockpit1(AShip, -10, -5, -30);
	addASGunCockpit2(AShip, 10, -5, -30);

	scene.add(AShip);
	AShip.position.x = x;
	AShip.position.y = y;
	AShip.position.z = z;
}

function addASCenter(obj, x, y, z) {
	geometry = new THREE.CylinderGeometry(40, 40, 10, 100, 10, false);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addASCanon(obj, x, y, z) {
	geometry = new THREE.CubeGeometry(10, 10, 35);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addASGun(obj, x, y, z) {
	geometry = new THREE.CubeGeometry(4, 10, 36);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addASGunCockpit1(obj, x, y, z) {
	var triangleShape = new THREE.Shape();
	triangleShape.moveTo(0, 0);
	triangleShape.lineTo(0, 16);
	triangleShape.lineTo(36, 0);
	triangleShape.lineTo(0, 0);

	geometry = new THREE.ExtrudeGeometry(triangleShape, { amount: 10, bevelEnabled: false });
	mesh = new THREE.Mesh(geometry, material);
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

	geometry = new THREE.ExtrudeGeometry(triangleShape, { amount: -10, bevelEnabled: false });
	mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.x = Math.PI/2;
	mesh.rotation.z = -Math.PI/2;
	mesh.position.set(x, y, z);

	obj.add(mesh);
}