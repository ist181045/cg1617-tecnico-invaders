var camera, scene, renderer;
var AShip;
var clock = new THREE.Clock(true);
var friction = 500;

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

function createEnemieShip(x, y, z) {
	var ship = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({ color: 0x404040, wireframe: false });

	addESCockpit(ship, 0, 0, 0);
	addESWingConector1(ship, 27, 0, 0);
	addESWingConector2(ship, -27, 0, 0);
	addESWing(ship, -39, -30, -17.5);
	addESWing(ship, 39, -30, -17.5);

	//ship.rotation.y = Math.PI/2;

	scene.add(ship);
	ship.position.x = x;
	ship.position.y = y;
	ship.position.z = z;
}

function addESCockpit(obj, x, y, z) {
	geometry = new THREE.SphereGeometry(20, 100, 100);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addESWingConector1(obj, x, y, z) {
	geometry = new THREE.CylinderGeometry(5, 10, 25, 100, 10, false);
	mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.z = -Math.PI/2;
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addESWingConector2(obj, x, y, z) {
	geometry = new THREE.CylinderGeometry(5, 10, 25, 100, 10, false);
	mesh = new THREE.Mesh(geometry, material);
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

	geometry = new THREE.ExtrudeGeometry(hexagonShape, { amount: -2, bevelEnabled: false });
	mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.y = -Math.PI/2;
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function createCamera() {
	camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, -500, 1000);
	camera.position.x = 0;
	camera.position.y = 100;
	camera.position.z = 0;
	/*camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 75;
	camera.position.y = 75;
	camera.position.z = -75;*/
	camera.lookAt(scene.position);
}

function createScene() {
  var rows = 3, columns = 8;
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(100));
	createAlliedShip(0, 0, 250);
	var xDist = -75 * (columns - 1), zDist = 0;
	for (var i = 0; i < rows; i++){
		for (var e = 0; e < columns; e++){
			createEnemieShip(xDist, 0, zDist);
			xDist += 150;
		}
		zDist -= 100;
		xDist = -75 * (columns - 1);
	}
}

function createMileniumFalcon() {
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(100));
	createAlliedShip(0, 0, 0);
}

function createTieFighter() {
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(100));
	createEnemieShip(0, 0, 0);
}

function render() {
	renderer.render(scene, camera);
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerWidth > 0 && window.innerHeight > 0) {
		camera.aspect = renderer.getSize().width / renderer.getSize().height;
		camera.updateProjectionMatrix();
	}
}

function onKeyUp(e) {
  	switch(e.keycode) {
    	case 37:
    	case 39:
      		AShip.userData.direction = 0;
      		break;
  	}
}

function onKeyDown(e) {
  	var interval = clock.getDelta();

	switch(e.keyCode) {
	case 65:
	case 97:
		scene.traverse(function (node) {
			if (node instanceof THREE.Mesh) {
				node.material.wireframe = !node.material.wireframe;
			}
		});
		break;
	case 37:
	  	AShip.userData.direction = -1;
	  	AShip.userData.velocity += AShip.userData.direction * AShip.userData.aceleration * interval;
		break;
  	case 39:
    	AShip.userData.direction = 1;
    	AShip.userData.velocity += AShip.userData.direction * AShip.userData.aceleration * interval;
		break;
 	}
}

function animate() {
  	var interval = clock.getDelta();
    AShip.position.x += AShip.userData.velocity * interval;
  	render();
	requestAnimationFrame(animate);
}

function init() {
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	createScene();
  	//createMileniumFalcon();
	createCamera();
	render();

 	window.addEventListener("keyup", onKeyUp);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("resize", onResize);
}
