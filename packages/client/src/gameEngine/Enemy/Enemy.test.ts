import Enemy from './Enemy';
import 'jest-canvas-mock';

import * as constants from '../constants';

describe('Game Engine: Enemy', () => {
	test('initializes with correct default values', () => {
		const enemy = new Enemy({ x: 0, y: 0, width: 70, height: 70, speed: 5 });

		expect(enemy.x).toBe(0);
		expect(enemy.y).toBe(0);
		expect(enemy.width).toBe(70);
		expect(enemy.height).toBe(70);
		expect(enemy.speed).toBe(5);
		expect(enemy.enemyImages).toHaveLength(3);
		expect(enemy.currentAnimationFrame).toBe(0);
		expect(enemy.isAnimationStopped).toBe(false);
	});

	describe('enemies moves', () => {
		let allEnemies: Enemy[];
		const canvasWidth = 800;

		beforeEach(() => {
			allEnemies = [new Enemy({ x: 50, y: 0, width: 70, height: 70, speed: 5 })];
		});

		test('enemies move correctly', () => {
			Enemy.moveAllEnemies(allEnemies, canvasWidth);

			expect(allEnemies[0].x).toBe(50 + 5 / 60);
			expect(allEnemies[0].y).toBe(0);
		});

		test('enemies reaching right edge and go down', () => {
			allEnemies[0].x = canvasWidth - constants.enemyBorder - allEnemies[0].width;
			allEnemies[0].speed = 5;

			Enemy.moveAllEnemies(allEnemies, canvasWidth);

			expect(allEnemies[0].x).toBeCloseTo(
				canvasWidth - constants.enemyBorder - allEnemies[0].width + 5 / 60,
				0
			);
			expect(allEnemies[0].y).toBe(50);
		});

		test('enemies reaching left edge go down', () => {
			allEnemies[0].x = constants.enemyBorder;
			allEnemies[0].speed = -5;
			Enemy.moveAllEnemies(allEnemies, canvasWidth);
			expect(allEnemies[0].x).toBeCloseTo(constants.enemyBorder - 5 / 60, 0);
			expect(allEnemies[0].y).toBe(50);
		});
	});
});
