import { KeyboardEvent, createRef, MutableRefObject } from 'react';
import 'jest-canvas-mock';

import Ship from './Ship/Ship';
import GameEngine from './GameEngine';
import * as constants from './constants';

function createRefWithInitial<T>(initialValue: T): MutableRefObject<T> {
	const refObject = createRef();
	(refObject as any).current = initialValue;
	return refObject as MutableRefObject<T>;
}

class TestableGameEngine extends GameEngine {
	public testConstantEnemies = this.enemies;
	public testConstantShip = this.ship as Ship;
	public testConstantCanvas = this.canvas;
	public testConstantShipExplosion = this.shipExplosion;
	public testConstantStopEnemyBorder = this.stopEnemyBorder;
	public testConstantBullets = this.bullets;
	public testConstantShootInterval = this.shootInterval;

	public testUpdateGame = this.updateGame;
	public testHandleKeyDown = this.handleKeyDown;
	public testCreateEnemies = this.createEnemies;
	public testMoveEnemies = this.moveEnemies;
	public testCheckStopEnemies = this.checkStopEnemies;
}

document.body.innerHTML = '<canvas id="gameCanvas"></canvas>';
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const canvasRef = createRefWithInitial<HTMLCanvasElement>(canvas);
const endGameRef = createRefWithInitial<() => void>(() => {
	//stub
});
const canvasPropsRef = createRefWithInitial({ canvasRef, endGameRef });

describe('GameEngine', () => {
	let gameEngine: TestableGameEngine;
	const event = {
		preventDefault: () => {
			return;
		}
	};

	beforeEach(() => {
		gameEngine = new TestableGameEngine(canvasPropsRef.current);
		jest.spyOn(event, 'preventDefault');
	});

	afterEach(() => {
		jest.clearAllMocks();
		canvas.width = 800;
	});

	describe('Initialization & Drawing', () => {
		test('start method should initiate game loop', async () => {
			jest.useFakeTimers();

			jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
				setTimeout(() => {
					cb(0);
				}, 0);
				return 1;
			});

			canvas.width = 800;
			canvas.height = 800;

			gameEngine.start();
			gameEngine.stop();

			await jest.runOnlyPendingTimers();

			expect(window.requestAnimationFrame).toHaveBeenCalledTimes(2);
		});

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

		test('shipExplosion should be initiated when enemies reach the bottom border', () => {
			const bottomBorder =
				gameEngine.testConstantCanvas.height - gameEngine.testConstantStopEnemyBorder;

			gameEngine.testConstantEnemies.forEach(enemy => (enemy.y = bottomBorder + 10));

			gameEngine.testMoveEnemies();
			gameEngine.testCheckStopEnemies();

			expect(gameEngine.testConstantEnemies[0].speed).toBe(0);
			expect(gameEngine.testConstantShipExplosion).toBeDefined();
		});

		test('getDestroyedEnemiesCount method should return the correct count', () => {
			const count = gameEngine.getDestroyedEnemiesCount();

			expect(count).toBe(0);
		});

		test('ship can shoot with a specific interval', () => {
			jest.useFakeTimers();

			gameEngine.testHandleKeyDown(makeKeyboardEventMock('Space'));
			gameEngine.testHandleKeyDown(makeKeyboardEventMock('Space'));
			gameEngine.testHandleKeyDown(makeKeyboardEventMock('Space'));

			jest.advanceTimersByTime(gameEngine.testConstantShootInterval);

			gameEngine.testHandleKeyDown(makeKeyboardEventMock('Space'));

			jest.advanceTimersByTime(gameEngine.testConstantShootInterval);

			gameEngine.testHandleKeyDown(makeKeyboardEventMock('Space'));

			expect(gameEngine.testConstantBullets.length).toBe(2);
		});
	});
});
