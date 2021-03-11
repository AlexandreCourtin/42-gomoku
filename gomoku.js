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

let mouse = new THREE.Vector2();

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

	let boardObject = new Board();
	scene.add(boardObject.boardGroup);
}

//LOGIC FUNCTIONS
function loop() {
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}

function onDocumentMouseMove( event ) {
	event.preventDefault();
	const canvasBounds = renderer.domElement.getBoundingClientRect();
	mouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
	mouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
	camera.position.x = mouse.x * 300;
	camera.position.y = mouse.y * 300;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	// raycaster.setFromCamera( mouse, camera );
	// var intersects = raycaster.intersectObjects( students.map((s) => {return s.threegroup.children[0]}) );
	// if ( intersects.length > 0 ) {
	// 	students.forEach((s) => {
	// 		if (intersects[0].object.parent == s.threegroup) {
	// 			selectedName = s.name;
	// 			if (selectedGroup) selectedGroup.scale.set(1, 1, 1);
	// 			selectedGroup = s.threegroup;
	// 			selectedGroup.scale.set(2, 2, 2);
	// 		}
	// 	});
	// } else {
	// 	selectedName = '';
	// 	if (selectedGroup) selectedGroup.scale.set(1, 1, 1);
	// 	selectedGroup = null;
	// }
}

//MAIN
init();
loop();
