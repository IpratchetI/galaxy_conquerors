import shipFrame1 from '@assets/gameplay/playerShip/shipFrame1.png';
import shipFrame2 from '@assets/gameplay/playerShip/shipFrame2.png';
import shipFrame3 from '@assets/gameplay/playerShip/shipFrame3.png';

import * as constants from '../constants';

class Ship {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;
	moveShipDirection: number;
	shipImage: HTMLImageElement;
	animationTimer: NodeJS.Timeout | null;
	currentAnimationFrame: number;
	frames: string[];

	constructor({ x, y }: { x: number; y: number }) {
		this.x = x;
		this.y = y;
		this.width = constants.shipSize;
		this.height = constants.shipSize;
		this.speed = constants.shipSpeed;
		this.moveShipDirection = 0;
		this.frames = [shipFrame1, shipFrame2, shipFrame3];
		this.currentAnimationFrame = 0;
		this.shipImage = new Image();
		this.shipImage.src = this.frames[this.currentAnimationFrame];
		this.animationTimer = null;
	}

	moveLeft = () => {
		this.moveShipDirection = -1;
		this.startAnimation();
	};

	moveRight = () => {
		this.moveShipDirection = 1;
		this.startAnimation();
	};

	stopMoving = () => {
		this.moveShipDirection = 0;
		this.stopAnimation();
		this.shipImage.src = shipFrame1;
	};

	startAnimation = () => {
		if (!this.animationTimer) {
			this.animationTimer = setInterval(this.nextFrame, constants.animationFrameDuration);
		}
	};

	stopAnimation = () => {
		if (this.animationTimer) {
			clearInterval(this.animationTimer);
			this.animationTimer = null;
		}
	};

	update = (canvasWidth: number) => {
		this.x += this.moveShipDirection * this.speed;
		this.x = Math.max(0, Math.min(this.x, canvasWidth - this.width));
	};

	draw = (ctx: CanvasRenderingContext2D, canvasHeight: number) => {
		ctx.drawImage(
			this.shipImage,
			this.x,
			canvasHeight - this.height - constants.shipVerticalOffset,
			this.width,
			this.height
		);
	};

	nextFrame = () => {
		this.currentAnimationFrame = (this.currentAnimationFrame + 1) % this.frames.length;
		this.shipImage.src = this.frames[this.currentAnimationFrame];
	};
}

export default Ship;
