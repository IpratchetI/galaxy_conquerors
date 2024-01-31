import bulletImage from '@assets/gameplay/shoot/shootFrame1.png';

import * as constants from '../constants';

class Bullet {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;
	bulletImage: HTMLImageElement;

	constructor({
		x,
		y,
		width,
		height,
		speed
	}: {
		x: number;
		y: number;
		width?: number;
		height?: number;
		speed?: number;
	}) {
		this.x = x;
		this.y = y;
		this.width = width || constants.bulletWidth;
		this.height = height || constants.bulletHeight;
		this.speed = speed || constants.bulletSpeed;
		this.bulletImage = new Image();
		this.bulletImage.src = bulletImage;
	}

	update = () => {
		this.y -= this.speed;
	};

	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.drawImage(this.bulletImage, this.x, this.y, this.width, this.height);
	};

	isOutOfBounds = () => {
		return this.y + this.height < 0;
	};
}

export default Bullet;
