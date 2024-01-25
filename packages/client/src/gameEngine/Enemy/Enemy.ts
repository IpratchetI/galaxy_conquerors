//src/gameEngine/Enemy/Enemy.ts
class Enemy {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;

	constructor({
		x,
		y,
		width,
		height,
		speed
	}: {
		x: number;
		y: number;
		width: number;
		height: number;
		speed: number;
	}) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
	}

	private static moveDownDistance = 50;

	//пока не удалять
	// move = () => {
	//   this.x += this.speed / 60;
	// };

	//todo: пофиксить логику движения. противник коснувшийся границы не смещается вниз
	static moveAllEnemies = (allEnemies: Enemy[], canvasWidth: number) => {
		const reachedLeftEdge = allEnemies.some(enemy => enemy.x <= 100);
		const reachedRightEdge = allEnemies.some(enemy => enemy.x + enemy.width >= canvasWidth - 100);

		allEnemies.forEach(enemy => {
			if ((reachedLeftEdge && enemy.speed < 0) || (reachedRightEdge && enemy.speed > 0)) {
				enemy.y += Enemy.moveDownDistance;
				enemy.speed *= -1;
			}

			enemy.x += enemy.speed / 60;
		});
	};

	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.fillStyle = 'black';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
}

export default Enemy;
