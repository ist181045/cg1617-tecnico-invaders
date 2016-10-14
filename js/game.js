/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura (ist181045)
 * @author: Diogo Freitas (ist181586)
 * @author: Sara Azinhal (ist181700)
 */

//MATERIALS

var	material1 = new THREE.MeshBasicMaterial({ color: 0xbfbfbf, wireframe: false });
var material2 = new THREE.MeshBasicMaterial({ color: 0x404040, wireframe: false });
var material3 = new THREE.MeshBasicMaterial({ color: 0x404040, wireframe: false });
var	material4 = new THREE.MeshBasicMaterial({ color: 0x1a1a1a, wireframe: false });
var material5 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false });

//GLOBAL VARIABLES

var camera1, camera2;
var camera, scene, renderer;
var clock = new THREE.Clock(true);
var AShip;

var X = 1920, Y = 1080;

//CAMERAS

function createOrtographicCamera() {
	camera = new THREE.OrthographicCamera(-X/2, X/2, Y/2, -Y/2, 1, 1000);
	camera.position.set(0, 100, 0);
	camera.zoom = 0.6;
  	camera.lookAt(scene.position);
	camera.updateProjectionMatrix();
}

function createStaticBackCamera() {
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 0;
	camera.position.y = 300;
	camera.position.z = 900;
	camera.lookAt(scene.position);
}

function createDynamicBackCamera() {
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 700;
	camera.lookAt(scene.position);
}

//SCENES

function createScene() {
  	var rows = 2, columns = 4;
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(100));
	new Field(0, 0, 0);
	AShip = new AlliedShip(0, 0, 600);
	var xDist = -75 * (columns - 1), zDist = -300;
	for (var i = 0; i < rows; i++){
		for (var e = 0; e < columns; e++){
			new EnemyShip(xDist, 0, zDist);
			xDist += 150;
		}
		zDist -= 100;
		xDist = -75 * (columns - 1);
	}
}

function createSceneMF() {
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(100));
	AShip = new AlliedShip(0, 0, 0);
}

function createSceneTF() {
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(100));
	new EnemyShip(0, 0, 0);
}

//

function render() {
	renderer.render(scene, camera);
}

/*function onResize(e) {
	var screenratio = window.innerWidth / window.innerHeight;
	var renderratio = renderer.getSize().width / renderer.getSize().height;
	
	if(screenratio / renderratio > 1) {
		camera.left = -(Y/2) * screenratio;
		camera.right = (Y/2) * screenratio;
	}
	if(screenratio / renderratio < 1) {
		camera.top = (X/2) / screenratio;
		camera.bottom = -(X/2) / screenratio;
	}
	camera.aspect = screenratio;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}*/

function onKeyUp(e) {
  	switch(e.keyCode) {
    	case 37:
    	case 39:
	    	AShip.direction = "none";
	    	console.log("Braking ON - onKeyUp");
	    	break;
  	}
}

function onKeyDown(e) {
	switch(e.keyCode) {
		case 65:
		case 97:
			material1.wireframe = !material1.wireframe;
			material2.wireframe = !material2.wireframe;
			material3.wireframe = !material3.wireframe;
			material4.wireframe = !material4.wireframe;
			material5.wireframe = !material5.wireframe;
			break;
		case 37:
			AShip.direction = "left";
			console.log("Arrow Left - onKeyDown");
			break;
	  	case 39:
	  		AShip.direction = "right";
	  		console.log("Arrow Right - onKeyDown");
			break;
		case 49:
			createOrtographicCamera();
			break;
		case 50:
			createStaticBackCamera();
			break;
		case 51:
			createDynamicBackCamera();
			break;
		case 77:
			createSceneMF();
			break;
		case 84:
			createSceneTF();
			break;
 	}
}

function animate() {
	var interval = clock.getDelta();

	AShip.move(interval);
	render();
	requestAnimationFrame(animate);
}

function init() {
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	createScene();
	createOrtographicCamera();

 	window.addEventListener("keyup", onKeyUp);
	window.addEventListener("keydown", onKeyDown);
	/*window.addEventListener("resize", onResize);*/
}