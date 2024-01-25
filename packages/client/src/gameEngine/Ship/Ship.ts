// src/gameEngine/Ship/Ship.ts
class Ship {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;
	isMovingLeft: boolean;
	isMovingRight: boolean;

	constructor({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = 5; //значение скорости движения корабля
		this.isMovingLeft = false;
		this.isMovingRight = false;
	}

	moveLeft = () => {
		this.isMovingLeft = true;
		this.isMovingRight = false;
	};

	moveRight = () => {
		this.isMovingLeft = false;
		this.isMovingRight = true;
	};

	stopMoving = () => {
		this.isMovingLeft = false;
		this.isMovingRight = false;
	};

	update = (canvasWidth: number) => {
		if (this.isMovingLeft && this.x > 0) {
			this.x -= this.speed;
		} else if (this.isMovingRight && this.x < canvasWidth - this.width) {
			this.x += this.speed;
		}
	};

	draw = (ctx: CanvasRenderingContext2D, canvasHeight: number) => {
		ctx.fillStyle = 'black';
		ctx.fillRect(this.x, canvasHeight - this.height - 50, this.width, this.height);
	};
}

export default Ship;
