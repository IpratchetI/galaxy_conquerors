import Enemy from './Enemy';
import 'jest-canvas-mock';

const BLACK_COLOR_HASH = '#000000';
const MOVE_DOWN_DISTANCE = 50;

describe('Game Engine: Enemy', () => {
	const enemiesAmount = 2;
	let allEnemies: Enemy[] = [];
	let canvasWidth: number;

	beforeEach(() => {
		for (let i = 0; i < enemiesAmount; i++) {
			allEnemies.push(
				new Enemy({
					x: 100 + i * 100,
					y: 100,
					width: 50,
					height: 50,
					speed: 60
				})
			);
		}

		canvasWidth = 800;
	});

	afterEach(() => {
		allEnemies = [];
		canvasWidth = 800;
	});

	test('should move all enemies to the right by 10 pixels', () => {
		for (let i = 0; i < 10; i++) {
			Enemy.moveAllEnemies(allEnemies, canvasWidth);
		}

		// Формула расчета: enemy.x += (enemy.speed / 60) * 10.
		// Где 60 - кол-во фпс, а 10 - число итераций
		expect(allEnemies[0].x).toBe(110);
		expect(allEnemies[1].x).toBe(210);
	});

	test('should move all enemies down', () => {
		const targetEnemy = allEnemies[0];
		const startEnemyYPosition = targetEnemy.y;

		allEnemies.map(enemy => (enemy.speed = 600));
		canvasWidth = 400;

		for (let i = 0; i < 10; i++) {
			Enemy.moveAllEnemies(allEnemies, canvasWidth);
		}

		expect(targetEnemy.y).toBe(startEnemyYPosition + MOVE_DOWN_DISTANCE);
	});

	test('should draw an enemy rectangle on the canvas', () => {
		const context = document.createElement('canvas')?.getContext('2d');

		if (context) {
			const fillRectMock = jest.fn();
			context.fillRect = fillRectMock;

			allEnemies[0].draw(context);

			expect(fillRectMock).toBeCalledWith(100, 100, 50, 50);
			expect(context.fillStyle).toBe(BLACK_COLOR_HASH);
		}
	});
});
