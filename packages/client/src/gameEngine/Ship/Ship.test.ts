import Ship from './Ship';
import 'jest-canvas-mock';

const BLACK_COLOR_HASH = '#000000';

describe('Game Engine: Ship', () => {
	let ship: Ship;
	const canvasHeight = 500;
	const canvasWidth = 800;

	beforeEach(() => {
		ship = new Ship({
			x: 100,
			y: 0,
			width: 50,
			height: 50
		});
	});

	test('should draw a hero ship', () => {
		const context = document.createElement('canvas')?.getContext('2d');

		if (context) {
			const fillRectMock = jest.fn();
			context.fillRect = fillRectMock;

			ship.draw(context, canvasHeight);

			expect(fillRectMock).toBeCalledWith(100, 400, 50, 50);
			expect(context.fillStyle).toBe(BLACK_COLOR_HASH);
		}
	});

	test('should move to the right by 30 pixels', () => {
		ship.moveRight();

		for (let i = 0; i < 3; i++) {
			ship.update(canvasWidth);
		}

		expect(ship.x).toBe(130);
	});

	test('should move to the left by 30 pixels', () => {
		ship.moveLeft();

		for (let i = 0; i < 3; i++) {
			ship.update(canvasWidth);
		}

		expect(ship.x).toBe(70);
	});

	test('should stop when reaching max x: canvasWidth - ship.width', () => {
		ship.x = 700;
		ship.moveRight();

		// На каждой итерации двигаемся вправо на 10px.
		// По итогу x должен быть равен 760, но корабль останавливается достигнув максимально-доступной координаты
		for (let i = 0; i < 6; i++) {
			ship.update(canvasWidth);
		}

		expect(ship.x).toBe(canvasWidth - ship.width);
	});

	test('should stop by user', () => {
		ship.x = 100;
		ship.moveRight();

		for (let i = 0; i < 10; i++) {
			if (i === 5) {
				ship.stopMoving();
			}

			ship.update(canvasWidth);
		}

		expect(ship.x).toBe(150);
	});
});
