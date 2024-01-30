// src/gameEngine/GameEngine.tsx
import Ship from './Ship/Ship';
import Bullet from './Bullet/Bullet';
import Enemy from './Enemy/Enemy';
import * as constants from './constants';

interface canvasProps {
	canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
	endGameRef: React.MutableRefObject<() => void>;
}

class GameEngine {
	private canvas: HTMLCanvasElement;
	private endGame: () => void;
	private isBreak = false;
	private breakStartTime = 0;
	private breakEndTime = 0;
	private ctx: CanvasRenderingContext2D;
	private ship: Ship;
	private bullets: Bullet[];
	private enemies: Enemy[];
	private lastShotTime: number;
	private destroyedEnemiesCount = 0;
	private isCountReported = false;
	private initialEnemySpeed = 500;
	private shootInterval = 100;
	private stopEnemyBorder = 150;
	private gameLoopAnimationId: null | number = null;

	constructor(canvasProps: canvasProps) {
		this.canvas = canvasProps.canvasRef.current!;
		this.endGame = canvasProps.endGameRef.current;
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		if (!this.ctx) {
			throw new Error('Unable to get 2D rendering context');
		}

		const initialShipX = this.canvas.width / 2 - constants.initialShipOffsetX; // горизонтальное центрирование корабля
		const initialShipY = this.canvas.height - constants.initialShipOffsetY; // позиция корабля по вертикали
		this.ship = new Ship({ x: initialShipX, y: initialShipY, width: 50, height: 50 }); //отрисовка корабля
		this.bullets = [];
		this.enemies = [];
		this.lastShotTime = 0;
		this.createEnemies();
		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('keyup', this.handleKeyUp);
	}

	public start = () => {
		this.gameLoop();
	};

	public getDestroyedEnemiesCount = (): number => {
		return this.destroyedEnemiesCount;
	};

	public stop = () => {
		this.isCountReported = false;
	};

	public break = () => {
		this.isBreak = !this.isBreak;
		console.log(this.isBreak, 'break');
		if (this.isBreak) {
			this.breakStartTime = Date.now();
		} else {
			this.breakEndTime = Date.now();
		}
	};

	public stopAnimationHandler = () => {
		console.log(this.gameLoopAnimationId);
		this.gameLoopAnimationId !== null && cancelAnimationFrame(this.gameLoopAnimationId);
	};

	private updateGame = () => {
		this.moveShip();
		this.updateBullets();
		this.moveEnemies();
		this.checkShipBounds();
		this.checkBulletEnemyCollisions();
		this.checkStopEnemies();
	};

	private drawGame = () => {
		this.clearCanvas();

		// Счетчик уничтоженных противников
		const counterText = `${this.destroyedEnemiesCount}`;

		// Шрифт и размер
		this.ctx.font = '35px "Press Start 2P", cursive';

		// Цвет обводки и толщина линий
		this.ctx.strokeStyle = 'black';
		this.ctx.lineWidth = 2;

		// Обводка текста
		this.ctx.strokeText(counterText, 10, 50);

		// Текст
		this.ctx.fillStyle = 'white';
		this.ctx.fillText(counterText, 10, 50);

		this.drawShip();
		this.drawBullets();
		this.drawEnemies();
	};

	private handleKeyDown = (event: KeyboardEvent) => {
		if (
			event.code === 'ArrowLeft' ||
			event.code === 'ArrowRight' ||
			event.code === 'ArrowUp' ||
			event.code === 'ArrowDown'
		) {
			event.preventDefault(); // Предотвращаем выполнение действий по умолчанию
		}
		if (!this.isBreak) {
			if (event.code === 'ArrowLeft') {
				this.ship.moveLeft();
			} else if (event.code === 'ArrowRight') {
				this.ship.moveRight();
			} else if (event.code === 'Space') {
				this.shoot();
			}
		}
	};

	private handleKeyUp = (event: KeyboardEvent) => {
		if (
			event.code === 'ArrowLeft' ||
			event.code === 'ArrowRight' ||
			event.code === 'ArrowUp' ||
			event.code === 'ArrowDown'
		) {
			event.preventDefault();
		}

		if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
			this.ship.stopMoving();
		}
	};

	private createEnemies = () => {
		for (let i = 0; i < 9; i++) {
			const enemy = new Enemy({
				x: 100 + i * 100,
				y: 100,
				width: 50,
				height: 50,
				speed: this.initialEnemySpeed
			});
			this.enemies.push(enemy);
		}
		const verticalSpacing = 25;
		const horizontalOffset = 60;
		for (let i = 0; i < 8; i++) {
			const enemy = new Enemy({
				x: 90 + i * 100 + horizontalOffset,
				y: 150 + verticalSpacing,
				width: 50,
				height: 50,
				speed: this.initialEnemySpeed
			});
			this.enemies.push(enemy);
		}
	};

	private moveEnemies = () => {
		Enemy.moveAllEnemies(this.enemies, this.canvas.width);
	};

	private moveShip = () => {
		this.ship.update(this.canvas.width);
	};

	private updateBullets = () => {
		this.bullets.forEach(bullet => bullet.update());
		this.bullets = this.bullets.filter(bullet => !bullet.isOutOfBounds());
	};

	private drawShip = () => {
		this.ship.draw(this.ctx, this.canvas.height);
	};

	private drawBullets = () => {
		this.bullets.forEach(bullet => bullet.draw(this.ctx));
	};

	private drawEnemies = () => {
		this.enemies.forEach(enemy => enemy.draw(this.ctx));
	};

	private clearCanvas = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	private shoot = () => {
		if (
			Date.now() - (this.breakEndTime - this.breakStartTime) - this.lastShotTime >
			this.shootInterval
		) {
			const bullet = new Bullet({
				x: this.ship.x + this.ship.width / 2 - 10,
				y: this.canvas.height - this.stopEnemyBorder,
				width: 20,
				height: 50,
				speed: 10
			});
			this.bullets.push(bullet);
			this.lastShotTime = Date.now();
		}
	};

	private gameLoop = () => {
		//TODO this.isBreak не изменяется внутри
		if (!this.isBreak) {
			this.updateGame();
			console.log('test');
		}

		this.drawGame();
		requestAnimationFrame(this.gameLoop);
	};

	private checkShipBounds = () => {
		if (this.ship.x < constants.enemyBorder) {
			this.ship.x = constants.enemyBorder;
		}

		const rightBorder = this.canvas.width - this.ship.width - constants.enemyBorder;
		if (this.ship.x > rightBorder) {
			this.ship.x = rightBorder;
		}
	};

	private checkStopEnemies = () => {
		const bottomBorder = this.canvas.height - this.stopEnemyBorder; // Граница от нижнего края экрана

		if (this.enemies.some(enemy => enemy.y >= bottomBorder)) {
			// Останавливаем противников
			this.enemies.forEach(enemy => (enemy.speed = 0));

			// Передаем значение счетчика наружу
			if (!this.isCountReported) {
				const destroyedEnemiesCount = this.getDestroyedEnemiesCount();
				console.log(`Destroyed Enemies Count: ${destroyedEnemiesCount}`);
				this.isCountReported = true;
				this.endGame();
			}
		}
	};

	private checkBulletEnemyCollisions = () => {
		// Проверка столкновения пуль с противниками
		this.bullets.forEach(bullet => {
			this.enemies.forEach((enemy, enemyIndex) => {
				if (
					bullet.x < enemy.x + enemy.width &&
					bullet.x + bullet.width > enemy.x &&
					bullet.y < enemy.y + enemy.height &&
					bullet.y + bullet.height > enemy.y
				) {
					// Удаляем пулю и противника из массивов
					this.bullets = this.bullets.filter(b => b !== bullet);
					this.enemies = this.enemies.filter((e, index) => index !== enemyIndex);

					// Увеличиваем счетчик уничтоженных противников
					this.destroyedEnemiesCount++;

					// Проверяем, остались ли еще противники
					if (this.enemies.length === 0) {
						// Увеличиваем скорость противников
						this.initialEnemySpeed += 20;

						// Создаем новых противников
						this.createEnemies();
					}
				}
			});
		});
	};
}

export default GameEngine;
