/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura (ist181045)
 * @author: Diogo Freitas (ist181586)
 * @author: Sara Azinhal (ist181700)
 */

var camera, scene, renderer;
var clock = new THREE.Clock(true);
var friction = 500;

function createCamera() {
	/*camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 75;
	camera.position.y = 75;
	camera.position.z = -75;*/
	camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, -500, 1000);
	camera.position.x = 0;
	camera.position.y = 100;
	camera.position.z = 0;
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
	createCamera();
	render();

 	window.addEventListener("keyup", onKeyUp);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("resize", onResize);
}