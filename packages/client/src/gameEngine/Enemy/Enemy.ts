import enemyFrame1 from '@assets/gameplay/enemy/enemyFrame1.png';
import enemyFrame2 from '@assets/gameplay/enemy/enemyFrame2.png';
import enemyFrame3 from '@assets/gameplay/enemy/enemyFrame3.png';

import * as constants from '../constants';

class Enemy {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;
	enemyImages: HTMLImageElement[];
	currentAnimationFrame: number;
	isAnimationStopped: boolean;

	constructor({
		x,
		y,
		speed
	}: {
		x: number;
		y: number;
		width?: number;
		height?: number;
		speed: number;
	}) {
		this.x = x;
		this.y = y;
		this.width = constants.enemyWidth;
		this.height = constants.enemyHeight;
		this.speed = speed;
		this.enemyImages = [new Image(), new Image(), new Image()];
		this.enemyImages[0].src = enemyFrame1;
		this.enemyImages[1].src = enemyFrame2;
		this.enemyImages[2].src = enemyFrame3;
		this.currentAnimationFrame = 0;
		this.isAnimationStopped = false;
	}

	private static moveDownDistance = 50;

	static moveAllEnemies = (allEnemies: Enemy[], canvasWidth: number) => {
		const reachedLeftEdge = allEnemies.some(enemy => enemy.x <= constants.enemyBorder);
		const reachedRightEdge = allEnemies.some(
			enemy => enemy.x + enemy.width >= canvasWidth - constants.enemyBorder
		);

		allEnemies.forEach(enemy => {
			if ((reachedLeftEdge && enemy.speed < 0) || (reachedRightEdge && enemy.speed > 0)) {
				enemy.y += Enemy.moveDownDistance;
				enemy.speed *= -1;
			}

			enemy.x += enemy.speed / 60;
		});
	};

	draw = (ctx: CanvasRenderingContext2D) => {
		if (this.speed !== 0) {
			ctx.drawImage(
				this.enemyImages[this.currentAnimationFrame],
				this.x,
				this.y,
				this.width,
				this.height
			);

			this.currentAnimationFrame = (this.currentAnimationFrame + 1) % this.enemyImages.length;
		} else {
			ctx.drawImage(this.enemyImages[0], this.x, this.y, this.width, this.height);
		}
	};
}

export default Enemy;
