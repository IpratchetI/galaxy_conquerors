import explosionFrame1 from '@assets/gameplay/explosion/explosionFrame1.png';

import 'jest-canvas-mock';

import Explosion from './Explosion';

import * as constants from '../constants';

describe('Game Engine: Explosion', () => {
	let explosion: Explosion;

	beforeEach(() => {
		explosion = new Explosion({ x: 100, y: 100 });
	});

	test('initializes with correct default values', () => {
		expect(explosion.x).toBe(100);
		expect(explosion.y).toBe(100);
		expect(explosion.width).toBe(constants.shipSize);
		expect(explosion.height).toBe(constants.shipSize);
		expect(explosion.frames).toHaveLength(7);
		expect(explosion.currentAnimationFrame).toBe(0);
		explosion.explosionImage.onload = () => {
			expect(explosion.explosionImage.src).toBe(explosionFrame1);
			expect(explosion.animationTimer).toBeNull();
		};
		expect(explosion.played).toBe(false);
	});

	test('start the animation timer', () => {
		explosion.startAnimation();

		expect(explosion.animationTimer).not.toBeNull();
	});

	test('stop the animation timer', () => {
		explosion.startAnimation();
		explosion.stopAnimation();

		expect(explosion.animationTimer).toBeNull();
	});

	test('draw the explosion on the canvas at the correct position', () => {
		const context = document.createElement('canvas')?.getContext('2d');

		if (!context) {
			return;
		}

		explosion.draw(context);

		expect(context.drawImage).toHaveBeenCalledWith(
			explosion.explosionImage,
			explosion.x - explosion.width / 2,
			explosion.y - explosion.height / 2,
			explosion.width,
			explosion.height
		);
	});
});
