function Board() {
	this.boardGroup = new THREE.Group();

	// BOARD MESH
	const blackMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
	const mainCube = new THREE.Mesh(new THREE.BoxGeometry( 800, 800, 50 ),
		new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load( 'wood.jpg' )
		})
	);
	this.boardGroup.add(mainCube);

	// LINE MESH
	const length = 711;
	const z = 51;
	const thickness = 2;
	for (let i = 0 ; i < 19 ; i++) {

		const line = new THREE.Mesh(new THREE.BoxGeometry(thickness, length, z), blackMat);
		const line2 = new THREE.Mesh(new THREE.BoxGeometry(length, thickness, z), blackMat);
		const correctedPos = -(length * .5) + (i * 39.5);

		line.position.x = correctedPos;
		line2.position.y = correctedPos;
		this.boardGroup.add(line);
		this.boardGroup.add(line2);
	}
	for (let i = 0 ; i < 3 ; i++) {
		for (let j = 0 ; j < 3 ; j++) {
			const littleBox = new THREE.Mesh(new THREE.BoxGeometry(10, 10, z), blackMat)
			littleBox.position.set(-237 + (i * 237), -237 + (j * 237), 0);
			this.boardGroup.add(littleBox);
		}
	}
}
