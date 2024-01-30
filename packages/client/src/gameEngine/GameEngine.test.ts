import 'jest-canvas-mock';
import { KeyboardEvent } from 'react';

import GameEngine from './GameEngine';
import * as constants from './constants';

class TestableGameEngine extends GameEngine {
	public testConstantEnemies = this.enemies;
	public testConstantShip = this.ship;

	public testUpdateGame = this.updateGame;
	public testDrawGame = this.drawGame;
	public testHandleKeyDown = this.handleKeyDown;
	public testHandleKeyUp = this.handleKeyUp;
	public testCreateEnemies = this.createEnemies;
}

document.body.innerHTML = '<canvas id="gameCanvas"></canvas>';
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

describe('GameEngine', () => {
	let gameEngine: TestableGameEngine;
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const event = { preventDefault: () => {} };

	beforeEach(() => {
		gameEngine = new TestableGameEngine(canvas);
		jest.spyOn(event, 'preventDefault');
	});

	afterEach(() => {
		jest.clearAllMocks();
		canvas.width = 800;
	});

	describe('Initialization & Drawing', () => {
		test('start method should initiate game loop', async () => {
			jest.useFakeTimers(); // Используем фейковые таймеры

			// Итерация вызова requestAnimationFrame асинхронно
			jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
				setTimeout(() => {
					// Симуляция одного фрейма анимации gameLoop
					cb(0);
				}, 0);
				return 1;
			});

			canvas.width = 800;
			canvas.height = 800;

			gameEngine.start();
			gameEngine.stop();

			// Ждем, пока все таймеры завершатся
			await jest.runOnlyPendingTimers();

			expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);
		});

		// test('updateGame and drawGame methods should be called in game loop', async () => {
		// 	jest.useFakeTimers();
		//
		// 	jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
		// 		setTimeout(() => {
		// 			cb(0);
		// 		}, 0);
		// 		return 1;
		// 	});
		//
		// 	canvas.width = 800;
		// 	canvas.height = 800;
		//
		// 	gameEngine.start();
		// 	gameEngine.stop();
		//
		// 	await jest.runOnlyPendingTimers();
		//
		// 	expect(gameEngine.testUpdateGame).toHaveBeenCalled();
		// 	expect(gameEngine.testDrawGame).toHaveBeenCalled();
		// });

		test('createEnemies method should create enemies', () => {
			gameEngine.testCreateEnemies();
			expect(gameEngine.testConstantEnemies.length).toBeGreaterThan(0);
		});
	});

	describe('Game Mechanics', () => {
		const preventDefault = jest.fn();

		const makeKeyboardEventMock = (code: KeyboardEvent['code']) =>
			Object.assign(new KeyboardEvent('keydown', { code }), { preventDefault });

		describe('Moving', () => {
			test('ship should move correctly to the left', () => {
				const initialX = gameEngine.testConstantShip.x;

				gameEngine.testHandleKeyDown(makeKeyboardEventMock('ArrowLeft'));
				gameEngine.testUpdateGame();

				expect(gameEngine.testConstantShip.x).toBeLessThan(initialX);
			});

			test('ship should move correctly to the right', () => {
				const initialX = gameEngine.testConstantShip.x;

				gameEngine.testHandleKeyDown(makeKeyboardEventMock('ArrowRight'));
				gameEngine.testUpdateGame();

				expect(gameEngine.testConstantShip.x).toBeGreaterThan(initialX);
			});

			test('ship should not go beyond screen boundaries to the right', () => {
				gameEngine.testHandleKeyDown(makeKeyboardEventMock('ArrowRight'));
				gameEngine.testUpdateGame();

				expect(gameEngine.testConstantShip.x).toBeLessThanOrEqual(
					canvas.width - gameEngine.testConstantShip.width - constants.enemyBorder
				);
			});

			test('ship should not go beyond screen boundaries to the left', () => {
				gameEngine.testHandleKeyDown(makeKeyboardEventMock('ArrowLeft'));
				gameEngine.testUpdateGame();

				expect(gameEngine.testConstantShip.x).toBeGreaterThanOrEqual(constants.enemyBorder);
			});
		});
	});

	test('getDestroyedEnemiesCount method should return the correct count', () => {
		const count = gameEngine.getDestroyedEnemiesCount();

		expect(count).toBe(0);
	});
});
