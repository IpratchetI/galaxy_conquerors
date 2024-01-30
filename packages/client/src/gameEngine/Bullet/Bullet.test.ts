import Bullet from './Bullet';
import 'jest-canvas-mock';

const RED_COLOR_HASH = '#ff0000';

describe('Game Engine: Bullet', () => {
	let bullet: Bullet;

	beforeEach(() => {
		bullet = new Bullet({
			x: 100,
			y: 200,
			width: 20,
			height: 50,
			speed: 5
		});
	});

	test('should update the y position correctly', () => {
		bullet.update();

		expect(bullet.y).toBe(195);
	});

	test('should draw a bullet rectangle on the canvas', () => {
		const context = document.createElement('canvas')?.getContext('2d');

		if (context) {
			const fillRectMock = jest.fn();
			context.fillRect = fillRectMock;

			bullet.draw(context);

			expect(fillRectMock).toBeCalledWith(100, 200, 20, 50);
			expect(context.fillStyle).toBe(RED_COLOR_HASH);
		}
	});

	test('should return true if the bullet is out of bounds', () => {
		bullet.y = -(bullet.height + 1);

		expect(bullet.isOutOfBounds()).toBe(true);
	});

	test('should return false if the bullet is not out of bounds', () => {
		bullet.y = 0;

		expect(bullet.isOutOfBounds()).toBe(false);
	});
});
