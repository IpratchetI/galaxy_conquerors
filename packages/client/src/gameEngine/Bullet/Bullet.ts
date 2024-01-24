// src/gameEngine/Bullet/Bullet.ts
class Bullet {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;

	constructor(x: number, y: number, width: number, height: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = 2;
	}

	update = () => {
		this.y -= this.speed;
	};

	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.fillStyle = 'red';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	isOutOfBounds = () => {
		return this.y + this.height < 0;
	};
}

export default Bullet;
