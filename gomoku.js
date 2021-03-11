//THREEJS RELATED VARIABLES
let scene,
	camera,
	fieldOfView,
	aspectRatio,
	nearPlane,
	farPlane,
	renderer,
	container;

//SCREEN VARIABLES
let HEIGHT,
	WIDTH,
	windowHalfX,
	windowHalfY;

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let rocks = [];
let selectedRock = null;

function onWindowResize() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	windowHalfX = WIDTH / 2;
	windowHalfY = HEIGHT / 2;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

//INIT THREE JS, SCREEN AND MOUSE EVENTS
function init() {
	scene = new THREE.Scene();
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 50;
	nearPlane = 1;
	farPlane = 2000000;
	camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio,
		nearPlane, farPlane);
	camera.position.z = 1000;
	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMap.enabled = true;
	container = document.getElementById('world');
	container.appendChild(renderer.domElement);
	windowHalfX = WIDTH / 2;
	windowHalfY = HEIGHT / 2;
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('mousemove', onDocumentMouseMove, false);

	const boardObject = new Board();
	scene.add(boardObject.boardGroup);

	for (let i = 0 ; i < 19 ; i++) {
		for (let j = 0 ; j < 19 ; j++) {
			rocks[j + (i * 19)] = new Rock(i, j, (i + j) % 2);
			scene.add(rocks[j + (i * 19)].group);
		}
	}
}

function lerp(a, b, f) {
	return a + f * (b - a);
}

function checkSelectedRock(selectedRock) {
	if (selectedRock != null) {
		selectedRock.group.scale.set(1, 1, 1);
	}
}

function loop() {
	// CAMERA LOOK
	const correctedMouseX = mouse.x * 300;
	const correctedMouseY = mouse.y * 300;
	const lerpPower = .0001;
	camera.position.x = lerp(camera.position.x, correctedMouseX, lerpPower * (Math.max(camera.position.x, correctedMouseX) - Math.min(camera.position.x, correctedMouseX)));
	camera.position.y = lerp(camera.position.y, correctedMouseY, lerpPower * (Math.max(camera.position.y, correctedMouseY) - Math.min(camera.position.y, correctedMouseY)));
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}

function onDocumentMouseMove( event ) {
	event.preventDefault();
	const canvasBounds = renderer.domElement.getBoundingClientRect();
	mouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
	mouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( rocks.map((r) => { return r.group.children[0] }) );
	if ( intersects.length > 0 ) {
		rocks.forEach((r) => {
			if ( intersects[0].object.parent == r.group ) {
				checkSelectedRock(selectedRock);
				selectedRock = r;
				selectedRock.group.scale.set(1.5, 1.5, 1.5);
			}
		});
	} else {
		checkSelectedRock(selectedRock);
	}
}

//MAIN
init();
loop();
