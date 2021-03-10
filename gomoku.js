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

	// MESH
	const blackMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
	const boardGroup = new THREE.Group();
	const mainCube = new THREE.Mesh(new THREE.BoxGeometry( 800, 800, 50 ),
		new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load( 'wood.jpg' )
		})
	);
	boardGroup.add(mainCube);

	const length = 711;
	const z = 51;
	const thickness = 2;
	for (let i = 0 ; i < 19 ; i++) {

		const line = new THREE.Mesh(new THREE.BoxGeometry(thickness, length, z), blackMat);
		const line2 = new THREE.Mesh(new THREE.BoxGeometry(length, thickness, z), blackMat);
		const correctedPos = -(length * .5) + (i * 39.5);

		line.position.x = correctedPos;
		line2.position.y = correctedPos;
		boardGroup.add(line);
		boardGroup.add(line2);
	}
	for (let i = 0 ; i < 3 ; i++) {
		for (let j = 0 ; j < 3 ; j++) {
			const littleBox = new THREE.Mesh(new THREE.BoxGeometry(10, 10, z), blackMat)
			littleBox.position.set(-237 + (i * 237), -237 + (j * 237), 0);
			boardGroup.add(littleBox);
		}
	}
	scene.add(boardGroup);
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
