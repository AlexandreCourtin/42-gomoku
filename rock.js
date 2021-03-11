function Rock(x, y, team) {
	this.x = x;
	this.y = y;
	this.team = team;
	this.group = new THREE.Group();

	// BOARD MESH
	let mat;

	if (team == 0) {
		mat = new THREE.MeshBasicMaterial({ color: 0x000000 });
	} else {
		mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
	}

	const mesh = new THREE.Mesh(new THREE.SphereGeometry( 16, 10, 10 ), mat);
	this.group.add(mesh);

	const posX = (-39.5 * 9) + (39.5 * this.x);
	const posY = (39.5 * 9) - (39.5 * this.y);
	this.group.position.set(posX, posY, 30);
}
