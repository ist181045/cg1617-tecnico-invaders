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

	cameraDevel.position.set( 5, 5, -5 ); cameraDevel.lookAt(
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

	cameraDynamic.position.set( GameField.AShip.position.x, 20, 125 );
	cameraDynamic.lookAt( GameField.AShip.position );

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

	    	GameField.AShip.pointingDir[0] = "none";
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

			GameField.AShip.pointingDir[0] = 'left';
			break;

		case 69: /*e*/
			
			GameField.AShip.pointingDir[0] = 'right';
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

	objectCollision();

	renderer.render( scene, activeCamera );
	requestAnimationFrame( animate );

}

function objectCollision () {
	GameField.EShips.forEach(
		function(s1) {
			if ( s1.boundingSphere.intersectsSphere( GameField.AShip.boundingSphere ) ){
				if ( s1.boundingBox.intersectsBox( GameField.AShip.boundingBox ) ){
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
					if ( !s1.boundingSphere.equals(s2.boundingSphere)){
						if ( s1.boundingSphere.intersectsSphere( s2.boundingSphere ) ){
							if ( s1.boundingBox.intersectsBox( s2.boundingBox ) ){
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
