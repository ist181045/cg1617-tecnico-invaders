/**
 * CG Space Invaders
 * CG45179 16'17
 *
 * @author: Rui Ventura   (ist181045)
 * @author: Diogo Freitas (ist181586)
 * @author: Sara Azinhal  (ist181700)
 */

//MATERIALS

var	material1 = new THREE.MeshBasicMaterial( { color: 0xbfbfbf, wireframe: false } );
var material2 = new THREE.MeshBasicMaterial( { color: 0x404040, wireframe: false } );
var material3 = new THREE.MeshBasicMaterial( { color: 0x404040, wireframe: false } );

//GLOBAL VARIABLES

var container;

var cameraOrtho, cameraStatic, cameraDynamic;

var activeCamera, scene, renderer;

var clock;

var AShip;

var CAMERA_MOVEMENT = false;

var X = 400, Y = 300;

/* Camera creation */
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
		70, window.innerWidth / window.innerHeight, 1, 1500
	);

	cameraStatic.position.set( 0, 300, 900 );
	cameraStatic.lookAt( scene.position );

	cameraStatic.updateProjectionMatrix();
}

function createDynamicBackCamera () {
	cameraDynamic = new THREE.PerspectiveCamera(
		70, window.innerWidth / window.innerHeight, 1, 1000
	);

	cameraDynamic.position.set( AShip.AS.position.x, 0, 700 );
	cameraDynamic.lookAt( AShip.AS.position );

	cameraDynamic.updateProjectionMatrix;
}

/* Event Handler */
function onKeyUp ( event ) {

  	switch ( event.keyCode ) {

    	case 37:
    	case 39:

	    	AShip.direction = 'none';
	    	console.log( 'Braking ON - onKeyUp' );

	    	break;

  	}

}

function onKeyDown ( event ) {

	switch ( event.keyCode ) {

		case 65:
		case 97:

			/* wireframe toggling: later... */

			break;

		case 37:

			AShip.direction = 'left';
			console.log( 'Arrow Left - onKeyDown' );

			break;

  	case 39:

			AShip.direction = 'right';
  		console.log( 'Arrow Right - onKeyDown' );

			break;

		case 49:

			activeCamera = cameraOrtho;
			CAMERA_MOVEMENT = false;

			break;

		case 50:

			activeCamera = cameraStatic;
			CAMERA_MOVEMENT = false;
			onResize();

			break;

		case 51:

			activeCamera = cameraDynamic;
			CAMERA_MOVEMENT = true;

			break;

 	}

}

function onResize () {

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

	renderer.setSize( window.innerWidth, window.innerHeight );

}

/* Scene */
function createScene () {

  let [ rows, columns ] = [ 2, 4 ];

	scene = new THREE.Scene();
	scene.add( new THREE.AxisHelper( 100 ) );

	scene.add( new Field( 0, 0, 0 ) );
	AShip = new AlliedShip( 0, 0, 600 );

	let [ xDist, zDist ] = [ -75 * ( columns - 1 ), -300 ];

	for ( let i = 0; i < rows; i++ ) {
		for ( let e = 0; e < columns; e++ ) {
			new EnemyShip( xDist, 0, zDist );
			xDist += 150;
		}
		zDist -= 100;
		xDist = -75 * ( columns - 1 );
	}
}

function animate () {

	let delta = clock.getDelta();

	AShip.move( delta );

	renderer.render( scene, activeCamera );
	requestAnimationFrame( animate );

}

function init () {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	createScene();

	createOrtographicCamera();
	createStaticBackCamera();
	createDynamicBackCamera();

	activeCamera = cameraOrtho;

	clock = new THREE.Clock( true );

	onResize();

 	window.addEventListener( 'keyup',   onKeyUp );
	window.addEventListener( 'keydown', onKeyDown );
	window.addEventListener( 'resize',  onResize );

	activeCamera.addEventListener( 'rescale', onResize );

}
