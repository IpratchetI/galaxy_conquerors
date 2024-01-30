import explosionFrame1 from '@assets/gameplay/explosion/explosionFrame1.png';
import explosionFrame2 from '@assets/gameplay/explosion/explosionFrame2.png';
import explosionFrame3 from '@assets/gameplay/explosion/explosionFrame3.png';
import explosionFrame4 from '@assets/gameplay/explosion/explosionFrame4.png';
import explosionFrame5 from '@assets/gameplay/explosion/explosionFrame5.png';
import explosionFrame6 from '@assets/gameplay/explosion/explosionFrame6.png';
import explosionFrame7 from '@assets/gameplay/explosion/explosionFrame7.png';

import * as constants from '../constants';

class Explosion {
	x: number;
	y: number;
	width: number;
	height: number;
	frames: string[];
	currentAnimationFrame: number;
	explosionImage: HTMLImageElement;
	animationTimer: NodeJS.Timeout | null;
	played: boolean;

	constructor({ x, y }: { x: number; y: number }) {
		this.x = x;
		this.y = y;
		this.width = constants.shipSize;
		this.height = constants.shipSize;
		this.frames = [
			explosionFrame1,
			explosionFrame2,
			explosionFrame3,
			explosionFrame4,
			explosionFrame5,
			explosionFrame6,
			explosionFrame7
		];
		this.currentAnimationFrame = 0;
		this.explosionImage = new Image();
		this.explosionImage.src = this.frames[this.currentAnimationFrame];
		this.animationTimer = null;
		this.played = false;
		this.startAnimation();
	}

	startAnimation = () => {
		if (!this.played && !this.animationTimer) {
			this.animationTimer = setInterval(this.nextFrame, constants.animationFrameDuration);
		}
	};

	stopAnimation = () => {
		if (this.animationTimer) {
			clearInterval(this.animationTimer);
			this.animationTimer = null;
		}
	};

	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.drawImage(
			this.explosionImage,
			this.x - this.width / 2,
			this.y - this.height / 2,
			this.width,
			this.height
		);
	};

	nextFrame = () => {
		this.currentAnimationFrame = (this.currentAnimationFrame + 1) % this.frames.length;
		this.explosionImage.src = this.frames[this.currentAnimationFrame];

		if (this.currentAnimationFrame === this.frames.length - 1) {
			this.played = true;
			this.stopAnimation();
		}
	};
}

export default Explosion;
