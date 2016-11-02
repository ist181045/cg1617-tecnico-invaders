/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura   (ist181045)
 * @author: Diogo Freitas (ist181586)
 * @author: Sara Azinhal  (ist181700)
 */

//MATERIALS

var	material1 = new THREE.MeshBasicMaterial( { color: 0xbfbfbf, wireframe: false, side: THREE.DoubleSide } );
var material2 = new THREE.MeshBasicMaterial( { color: 0x404040, wireframe: false } );
var material3 = new THREE.MeshBasicMaterial( { color: 0x404040, wireframe: false } );

//GLOBAL VARIABLES

var container;

var cameraOrtho, cameraStatic, cameraDynamic, cameraDevel;

var activeCamera, scene, renderer;

var clock, fireRateClock;

var GameField;

var collisionsArray = new Array();

var X = 500, Y = 300;

//FLAGS

var WEAPONS_SYSTEM = 1;
var BREAK_FIRERATE = true;

//CAMERA CREATION
function createDevelopingCamera () {

	cameraDevel = new THREE.PerspectiveCamera(
		75, window.innerWidth / window.innerHeight, 1, 1500
	);

	cameraDevel.position.set( 25, 25, -25 ); cameraDevel.lookAt(
	scene.position );

	cameraDevel.updateProjectionMatrix();

}

function createOrtographicCamera () {

	cameraOrtho = new THREE.OrthographicCamera(
		X / -2, X /  2, /* left / right */
		Y /  2, Y / -2, /* top / bottom */
		1, 150 /* near / far */
	);

	cameraOrtho.position.set( 0, 100, 0 );
  	cameraOrtho.lookAt( new THREE.Vector3( 0, -1, 0 ) );

	cameraOrtho.updateProjectionMatrix();

}

function createStaticBackCamera () {

	cameraStatic = new THREE.PerspectiveCamera(
		75, window.innerWidth / window.innerHeight, 1, 1500
	);

	cameraStatic.position.set( 0, 140, 190 ); cameraStatic.lookAt(
	scene.position );

	cameraStatic.updateProjectionMatrix();

}

function createDynamicBackCamera () {

	cameraDynamic = new THREE.PerspectiveCamera(
		75, window.innerWidth / window.innerHeight, 1, 1000
	);

	cameraDynamic.position.set( GameField.AShip.position.x, 9, 25 );
	cameraDynamic.lookAt( GameField.AShip );

	GameField.AShip.add( cameraDynamic );

	cameraDynamic.updateProjectionMatrix();

}

//EVENT HANDLER
function onKeyUp ( event ) {

  	switch ( event.keyCode ) {

    	case 37: /*<-*/
    	case 39: /*->*/

	    	GameField.AShip.movementDir = "none";
	    	break;

	    case 81: /*q*/
	    case 69: /*e*/

	    	GameField.AShip.pointingDir = "none";
	    	break;

	    case 32:
	    case 66: /*b*/

	    	BREAK_FIRERATE = true;
	    	break;
  	}

}

function onKeyDown ( event ) {

	switch ( event.keyCode ) {

		case 65: /*a*/
		case 97: /*A*/

			/* wireframe toggling: later... */
			break;

		case 37: /*<-*/

			GameField.AShip.movementDir = 'left';
			break;

  		case 39: /*->*/

			GameField.AShip.movementDir = 'right';
			break;

		case 81: /*q*/

			GameField.AShip.pointingDir = 'left';
			break;

		case 69: /*e*/

			GameField.AShip.pointingDir = 'right';
			break;

		case 49: /*1*/

			activeCamera = cameraOrtho;
			resizeCamera();
			break;

		case 50: /*2*/

			activeCamera = cameraStatic;
			resizeCamera();
			break;

		case 51: /*3*/

			activeCamera = cameraDynamic;
			resizeCamera();
			break;

		case 52: /*4*/

			 activeCamera = cameraDevel;
			 resizeCamera();
			 break;

		case 32:
		case 66: /*b*/

			if (fireRateClock.getElapsedTime() >= 0.3 || BREAK_FIRERATE){
				GameField.AShip.fire();
				fireRateClock = new THREE.Clock( true );
			}
			BREAK_FIRERATE = false;
			break;

		case 77: /*m*/
			createSceneMF();
			break;

		case 84: /*t*/
			createSceneTF();
			break;

		case 87: /*w*/
			if (WEAPONS_SYSTEM == 1){
				WEAPONS_SYSTEM = 2;
			}
			else{
				WEAPONS_SYSTEM = 1;
			}
			break;
 	}

}

function onResize () {

	resizeCamera();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function resizeCamera () {

	let ratio = window.innerWidth / window.innerHeight;

	if( activeCamera instanceof THREE.OrthographicCamera ) {

		if ( ratio > ( X / Y ) ) {

			activeCamera.left   = ( Y * ratio ) / -2;
			activeCamera.right  = ( Y * ratio ) /  2;
			activeCamera.top    = Y /  2;
			activeCamera.bottom = Y / -2;

		}	else {

			activeCamera.left   = X / -2;
			activeCamera.right  = X /  2;
			activeCamera.top    = ( X / ratio ) /  2;
			activeCamera.bottom = ( X / ratio ) / -2;

		}

	} else {

		activeCamera.aspect = ratio;

	}

	activeCamera.updateProjectionMatrix();

}

//SCENES
function createScene () {

	scene = new THREE.Scene();
	scene.add( new THREE.AxisHelper( 100 ) );

	GameField = new Field( 0, 0, 0 );
	scene.add( GameField );

}

function createSceneMF () {
	scene = new THREE.Scene();
	scene.add( new THREE.AxisHelper( 100 ) );
	scene.add( new Bullet( 0, 0, 0 ) );

}

function createSceneTF () {
	scene = new THREE.Scene();
	scene.add( new THREE.AxisHelper( 100 ) );
	scene.add( new EnemyShip( 0, 0, 0 ) );

}

//ANIMATE
function animate () {

	let delta = clock.getDelta();

	GameField.AShip.move( delta );
	GameField.EShips.forEach( function(s) { s.move( delta ); } );
	GameField.Bullets.forEach( function(b) { b.move( delta ); } );

	//objectCollision();
	collision()

	renderer.render( scene, activeCamera );
	requestAnimationFrame( animate );

}

/*function objectCollision () {
	GameField.EShips.forEach(
		function(s1) {
			if (){
				if (){
					s1.direction.x = -s1.direction.x;
					s1.direction.y = -s1.direction.y;
					s1.velocity.x = -s1.velocity.x;
					s1.velocity.y = -s1.velocity.y;

					if ( s1.direction.x > 0 ) {
						GameField.AShip.velocity = -40;
					}
					if ( s1.direction.x < 0 ) {
						GameField.AShip.velocity = 40;
					}
				}
			}

			GameField.EShips.forEach(
				function(s2) {
					if (){
						if (){
							if (){
								if (!collisionsArray.includes(s1)) collisionsArray.push(s1);
								if (!collisionsArray.includes(s2)) collisionsArray.push(s2);
							}
						}
					}
				}
			);
		}
	);

	while (collisionsArray.length != 0) {
		collisionsArray[0].direction.x = -collisionsArray[0].direction.x;
		collisionsArray[0].direction.y = -collisionsArray[0].direction.y;
		collisionsArray[0].velocity.x = -collisionsArray[0].velocity.x;
		collisionsArray[0].velocity.y = -collisionsArray[0].velocity.y;
		collisionsArray.shift();
	}

}*/

function bsBarrierCollision (obj) {
	var r = obj.bsRadius;

	for (var i = 0; i < 4; i++) {
		if (i == 0 || i == 1) {
			var d = Math.abs(GameField.barriers.children[i].position.x - obj.position.x);
		}
		if (i == 2 || i == 3) {
			var d = Math.abs(GameField.barriers.children[i].position.z - obj.position.z);
		}
		if (r + 2 >= d)
			return [true, i];
	}
	return [false, -1];
}

function bbBarrierCollision (obj, barr) {
	var objmin = new THREE.Vector3(obj.position.x + obj.min.x, obj.position.y + obj.min.y, obj.position.z + obj.min.z);
	var objmax = new THREE.Vector3(obj.position.x + obj.max.x, obj.position.y + obj.max.y, obj.position.z + obj.max.z);
	var barrmin = new THREE.Vector3();
	var barrmax = new THREE.Vector3();
	if (barr == 0 || barr == 1){
		var barrpos = GameField.barriers.children[barr].position;
		barrmin.set(barrpos.x - 2, barrpos.y - 10, barrpos.z - GameField._length / 2);
		barrmax.set(barrpos.x + 2, barrpos.y + 10, barrpos.z + GameField._length / 2);
	}
	if (barr == 2 || barr == 3){
		var barrpos = GameField.barriers.children[barr].position;
		barrmin.set(barrpos.x - GameField.width / 2, barrpos.y - 10, barrpos.z - 2);
		barrmax.set(barrpos.x + GameField.width / 2, barrpos.y + 10, barrpos.z + 2);
	}

	if (objmax.x > barrmin.x && objmin.x < barrmax.x &&
		objmax.y > barrmin.y && objmin.y < barrmax.y &&
		objmax.z > barrmin.z && objmin.z < barrmax.z)
		return true;
	return false;
}

function bsObjectCollision (obj1, obj2) {
	var r1 = obj1.bsRadius;
	var r2 = obj2.bsRadius;
	var d = Math.sqrt(Math.pow(obj1.position.x - obj2.position.x, 2) + Math.pow(obj1.position.z - obj2.position.z, 2));

	if (r1 + r2 >= d)
		return true;
	return false;
}

function bbObjectCollision (obj1, obj2) {
	var obj1min = new THREE.Vector3(obj1.position.x + obj1.min.x, obj1.position.y + obj1.min.y, obj1.position.z + obj1.min.z);
	var obj1max = new THREE.Vector3(obj1.position.x + obj1.max.x, obj1.position.y + obj1.max.y, obj1.position.z + obj1.max.z);
	var obj2min = new THREE.Vector3(obj2.position.x + obj2.min.x, obj2.position.y + obj2.min.y, obj2.position.z + obj2.min.z);
	var obj2max = new THREE.Vector3(obj2.position.x + obj2.max.x, obj2.position.y + obj2.max.y, obj2.position.z + obj2.max.z);

	if (obj1max.x > obj2min.x && obj1min.x < obj2max.x &&
		obj1max.y > obj2min.y && obj1min.y < obj2max.y &&
		obj1max.z > obj2min.z && obj1min.z < obj2max.z)
		return true;
	return false;
}

function collision () {
	var resAShipBSColl = bsBarrierCollision(GameField.AShip);

	if (resAShipBSColl[0] && resAShipBSColl[1] == 0) {
		var resAShipBBColl = bbBarrierCollision(GameField.AShip, resAShipBSColl[1]);
		if (resAShipBBColl) {
			GameField.AShip.position.x = GameField.barriers.children[0].position.x + 2 - GameField.AShip.min.x;
			GameField.AShip.velocity = 0;
			GameField.AShip.movementDir = "none";
		}
	}

	if (resAShipBSColl[0] && resAShipBSColl[1] == 1) {
		var resAShipBBColl = bbBarrierCollision(GameField.AShip, resAShipBSColl[1]);
		if (resAShipBBColl) {
			GameField.AShip.position.x = GameField.barriers.children[1].position.x - 2 - GameField.AShip.max.x;
			GameField.AShip.velocity = 0;
			GameField.AShip.movementDir = "none";
		}
	}

	for (var o = 0; o < GameField.Bullets.length; o++) {
		var currBullet = GameField.Bullets[o];
		var resCurrBulletBSColl = bsBarrierCollision(currBullet);

		if (resCurrBulletBSColl[0]) {
			if (bbBarrierCollision(currBullet, resCurrBulletBSColl[1])) {
				scene.remove(currBullet);
				GameField.Bullets.splice(o, 1);
				o--;
			}
		}
	}

	for (var i = 0; i < GameField.EShips.length; i++) {
		var currShip = GameField.EShips[i];
		var resCurrEShipBSColl = bsBarrierCollision(currShip);

		if (resCurrEShipBSColl[0] && (resCurrEShipBSColl[1] == 0 || resCurrEShipBSColl[1] == 1)) {
			if (bbBarrierCollision(currShip, resCurrEShipBSColl[1])) {
				currShip.direction.x = -currShip.direction.x;
				currShip.direction.y = currShip.direction.y;
				currShip.velocity.x = -currShip.velocity.x;
				currShip.velocity.y = currShip.velocity.y;
			}
		}

		if (resCurrEShipBSColl[0] && (resCurrEShipBSColl[1] == 2 || resCurrEShipBSColl[1] == 3)) {
			if (bbBarrierCollision(currShip, resCurrEShipBSColl[1])) {
				currShip.direction.x = currShip.direction.x;
				currShip.direction.y = -currShip.direction.y;
				currShip.velocity.x = currShip.velocity.x;
				currShip.velocity.y = -currShip.velocity.y;
			}
		}

		for (var e = i + 1; e < GameField.EShips.length; e++) {
			var currTestShip = GameField.EShips[e];

			if (bsObjectCollision(currShip, currTestShip)) {
				if (bbObjectCollision(currShip, currTestShip)) {
					currShip.direction.x = -currShip.direction.x;
					currShip.direction.y = -currShip.direction.y;
					currShip.velocity.x = -currShip.velocity.x;
					currShip.velocity.y = -currShip.velocity.y;

					currTestShip.direction.x = -currTestShip.direction.x;
					currTestShip.direction.y = -currTestShip.direction.y;
					currTestShip.velocity.x = -currTestShip.velocity.x;
					currTestShip.velocity.y = -currTestShip.velocity.y;
				}
			}
		}
		for (var b = 0; b < GameField.Bullets.length; b++) {
			var currBullet = GameField.Bullets[b];

			if (bsObjectCollision(currShip, currBullet)) {
				if (bbObjectCollision(currShip, currBullet)) {
					scene.remove(currBullet);
					GameField.remove(currShip);
					GameField.Bullets.splice(b, 1);
					GameField.EShips.splice(i, 1);
					i--; b--;
				}
			}
		}
	}
}

function init () {

	container = document.createElement( 'div' );
	container.setAttribute( "id", "container");
	document.body.appendChild( container );

	renderer = new THREE.WebGLRenderer( { alpha: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	createScene();

	createOrtographicCamera();
	createStaticBackCamera();
	createDynamicBackCamera();
	createDevelopingCamera();

	activeCamera = cameraOrtho;

	clock = new THREE.Clock( true );
	fireRateClock = new THREE.Clock( true );

	resizeCamera();

 	window.addEventListener( 'keyup',   onKeyUp );
	window.addEventListener( 'keydown', onKeyDown );
	window.addEventListener( 'resize',  onResize );

}
