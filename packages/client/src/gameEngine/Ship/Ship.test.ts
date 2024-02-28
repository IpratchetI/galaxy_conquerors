import * as constants from '@/gameEngine/constants';

import Ship from './Ship';

import 'jest-canvas-mock';

describe('Game Engine: Ship', () => {
	let ship: Ship;
	let setIntervalSpy: jest.SpyInstance;
	let clearIntervalSpy: jest.SpyInstance;

	beforeEach(() => {
		ship = new Ship({ x: 0, y: 0 });
		setIntervalSpy = jest.spyOn(global, 'setInterval');
		clearIntervalSpy = jest.spyOn(global, 'clearInterval');
	});

	afterEach(() => {
		setIntervalSpy.mockReset();
		clearIntervalSpy.mockReset();
	});

	test('initializes with correct default values', () => {
		expect(ship.x).toBe(0);
		expect(ship.y).toBe(0);
		expect(ship.width).toBe(100);
		expect(ship.height).toBe(100);
		expect(ship.speed).toBe(10);
		expect(ship.moveShipDirection).toBe(0);
		expect(ship.frames).toHaveLength(3);
		expect(ship.currentAnimationFrame).toBe(0);
		expect(ship.shipImage).toBeDefined();
		expect(ship.animationTimer).toBeNull();
	});

	test('change moveShipDirection to the left and starts animation', () => {
		ship.moveLeft();

		expect(ship.moveShipDirection).toBe(-1);
		expect(setIntervalSpy).toHaveBeenCalledTimes(1);
	});

	test('change moveShipDirection to the right and starts animation', () => {
		ship.moveRight();

		expect(ship.moveShipDirection).toBe(1);
		expect(setIntervalSpy).toHaveBeenCalledTimes(1);
	});

	test('stop animation and resets shipImage', () => {
		ship.moveLeft();
		ship.stopMoving();

		expect(ship.moveShipDirection).toBe(0);
		ship.shipImage.onload = () => {
			expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
			expect(ship.shipImage.src).toBe(ship.frames[0]);
		};
	});

	test('start the animation timer', () => {
		ship.startAnimation();

		expect(setIntervalSpy).toHaveBeenCalledTimes(1);
	});

	test('stop the animation timer', async () => {
		ship.startAnimation();
		ship.stopAnimation();

		setTimeout(() => {
			expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
			expect(ship.animationTimer).toBeNull();
		}, 0);
	});

	test('update the ship position within canvas width', () => {
		const canvasWidth = 800;

		ship.moveRight();
		ship.update(canvasWidth);

		expect(ship.x).toBe(10);
	});

	test('draw the ship on the canvas at the correct position', () => {
		const context = document.createElement('canvas')?.getContext('2d');

		if (!context) {
			return;
		}

		const canvasHeight = 600;

		ship.draw(context, canvasHeight);

		expect(context.drawImage).toHaveBeenCalledWith(
			ship.shipImage,
			ship.x,
			canvasHeight - ship.height - constants.shipVerticalOffset,
			ship.width,
			ship.height
		);
	});

	test('nextFrame updates currentAnimationFrame and shipImage.src one time', () => {
		ship.nextFrame();

		expect(ship.currentAnimationFrame).toBe(1);
		ship.shipImage.onload = () => {
			expect(ship.shipImage.src).toBe(ship.frames[1]);
		};
	});

	test('nextFrame updates currentAnimationFrame and shipImage.src twice', () => {
		ship.nextFrame();
		ship.nextFrame();

		expect(ship.currentAnimationFrame).toBe(2);
		ship.shipImage.onload = () => {
			expect(ship.shipImage.src).toBe(ship.frames[2]);
		};
	});
});
