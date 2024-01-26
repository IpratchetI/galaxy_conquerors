// src/gameEngine/Ship/Ship.ts
const shipSpeed = 10;
const shipVerticalOffset = 50;

class Ship {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;
	moveShipDirection: number;

	constructor({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = shipSpeed;
		this.moveShipDirection = 0;
	}

	moveLeft = () => {
		this.moveShipDirection = -1;
	};

	moveRight = () => {
		this.moveShipDirection = 1;
	};

	stopMoving = () => {
		this.moveShipDirection = 0;
	};

	update = (canvasWidth: number) => {
		this.x += this.moveShipDirection * this.speed;
		this.x = Math.max(0, Math.min(this.x, canvasWidth - this.width));
	};

	draw = (ctx: CanvasRenderingContext2D, canvasHeight: number) => {
		ctx.fillStyle = 'black';
		ctx.fillRect(this.x, canvasHeight - this.height - shipVerticalOffset, this.width, this.height);
	};
}

export default Ship;
