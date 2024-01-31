import bulletImage from '@assets/gameplay/shoot/shootFrame1.png';

import Bullet from './Bullet';

import * as constants from '../constants';

import 'jest-canvas-mock';

describe('Game Engine: Bullet', () => {
	test('initializes with correct default values', () => {
		const bullet = new Bullet({ x: 0, y: 0 });

		expect(bullet.x).toBe(0);
		expect(bullet.y).toBe(0);
		expect(bullet.width).toBe(constants.bulletWidth);
		expect(bullet.height).toBe(constants.bulletHeight);
		expect(bullet.speed).toBe(constants.bulletSpeed);
		bullet.bulletImage.onload = () => {
			expect(bullet.bulletImage.src).toBe(bulletImage);
		};
	});

	test('update bullet position correctly', () => {
		const bullet = new Bullet({ x: 10, y: 20 });

		bullet.update();

		expect(bullet.y).toBe(20 - constants.bulletSpeed);
	});

	test('draw the bullet on the canvas at the correct position', () => {
		const context = document.createElement('canvas')?.getContext('2d');

		if (!context) {
			return;
		}

		const bullet = new Bullet({ x: 30, y: 40 });

		bullet.draw(context);

		expect(context.drawImage).toHaveBeenCalledWith(
			bullet.bulletImage,
			30,
			40,
			constants.bulletWidth,
			constants.bulletHeight
		);
	});

	test('check if the bullet is out of bounds', () => {
		const bullet = new Bullet({ x: 0, y: -80 });

		expect(bullet.isOutOfBounds()).toBe(true);

		bullet.y = 0;

		expect(bullet.isOutOfBounds()).toBe(false);
	});
});
