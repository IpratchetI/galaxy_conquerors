import Ship from './Ship/Ship';
import Bullet from './Bullet/Bullet';
import Enemy from './Enemy/Enemy';
import Explosion from './Explosion/Explosion';

import * as constants from './constants';

interface canvasProps {
	canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
	endGameRef: React.MutableRefObject<() => void>;
}

class GameEngine {
	private canvas: HTMLCanvasElement;
	private closeCanvas: () => void;
	private isBreak = false;
	private breakStartTime = 0;
	private breakEndTime = 0;
	private ctx: CanvasRenderingContext2D;
	private ship: Ship | null;
	private bullets: Bullet[];
	private enemies: Enemy[];
	private lastShotTime: number;
	private destroyedEnemiesCount = 0;
	private isCountReported = false;
	// private initialEnemySpeed = 100;
	private initialEnemySpeed = 700;
	private shootInterval = 500;
	private stopEnemyBorder = 200;
	private shipExplosion: Explosion | null;
	private enemyExplosion: Explosion | null;

	constructor(canvasProps: canvasProps) {
		this.canvas = canvasProps.canvasRef.current!;
		this.closeCanvas = canvasProps.endGameRef.current;
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		if (!this.ctx) {
			throw new Error('Unable to get 2D rendering context');
		}

		const initialShipX = window.innerWidth / 2 - constants.initialShipOffsetX; // горизонтальное центрирование корабля
		const initialShipY = window.innerHeight - constants.initialShipOffsetY; // позиция корабля по вертикали
		this.ship = new Ship({ x: initialShipX, y: initialShipY }); //отрисовка корабля
		this.bullets = [];
		this.enemies = [];
		this.lastShotTime = 0;
		this.createEnemies();
		this.shipExplosion = null;
		this.enemyExplosion = null;
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
		if (this.isBreak) {
			this.breakStartTime = Date.now();
		} else {
			this.breakEndTime = Date.now();
		}
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

		const counterText = `${this.destroyedEnemiesCount}`;
		this.ctx.font = '35px "Press Start 2P", cursive';
		this.ctx.strokeStyle = 'black';
		this.ctx.lineWidth = 2;
		this.ctx.strokeText(counterText, 10, 50);
		this.ctx.fillStyle = 'white';
		this.ctx.fillText(counterText, 10, 50);

		if (this.ship) {
			this.drawShip();
		} else if (this.shipExplosion && !this.shipExplosion.played) {
			this.shipExplosion.draw(this.ctx);
		}

		this.drawBullets();
		this.drawEnemies();

		if (this.enemyExplosion && !this.enemyExplosion.played) {
			this.enemyExplosion.draw(this.ctx);
		}
	};

	private handleKeyDown = (event: KeyboardEvent) => {
		if (
			event.code === 'ArrowLeft' ||
			event.code === 'ArrowRight' ||
			event.code === 'ArrowUp' ||
			event.code === 'ArrowDown' ||
			event.code === 'Space'
		) {
			event.preventDefault();
		}

		if (!this.isBreak) {
			if (event.code === 'ArrowLeft') {
				if (this.ship) {
					this.ship.moveLeft();
				}
			} else if (event.code === 'ArrowRight') {
				if (this.ship) {
					this.ship.moveRight();
				}
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
			if (this.ship) {
				this.ship.stopMoving();
			}
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
		if (this.ship) {
			this.ship.update(this.canvas.width);
		}
	};

	private updateBullets = () => {
		this.bullets.forEach(bullet => bullet.update());
		this.bullets = this.bullets.filter(bullet => !bullet.isOutOfBounds());
	};

	private drawShip = () => {
		if (this.ship) {
			this.ship.draw(this.ctx, this.canvas.height);
		}
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
			Date.now() -
				(Date.now() - this.breakEndTime > this.shootInterval
					? 0
					: this.breakEndTime - this.breakStartTime) -
				this.lastShotTime >
			this.shootInterval
		) {
			if (this.ship) {
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
		}
	};

	private gameLoop = () => {
		if (!this.isBreak) {
			this.updateGame();
		}
		this.drawGame();
		if (this.ship?.isShipStateCrash) {
			requestAnimationFrame(this.gameLoop);
		}
	};

	private checkShipBounds = () => {
		if (this.ship) {
			if (this.ship.x < constants.enemyBorder) {
				this.ship.x = constants.enemyBorder;
			}

			const rightBorder = this.canvas.width - this.ship.width - constants.enemyBorder;
			if (this.ship.x > rightBorder) {
				this.ship.x = rightBorder;
			}
		}
	};

	private checkStopEnemies = () => {
		const bottomBorder = this.canvas.height - this.stopEnemyBorder;

		if (this.enemies.some(enemy => enemy.y >= bottomBorder)) {
			this.enemies.forEach(enemy => (enemy.speed = 0));

			if (!this.shipExplosion && this.ship) {
				this.shipExplosion = new Explosion({
					x: this.ship.x + this.ship.width / 2,
					y: this.ship.y + this.ship.height / 2 - constants.shipSize
				});
				this.shipExplosion.startAnimation();
			}

			this.ship = null;

			if (!this.isCountReported) {
				const destroyedEnemiesCount = this.getDestroyedEnemiesCount();
				console.log(`Destroyed Enemies Count: ${destroyedEnemiesCount}`);
				this.isCountReported = true;
				this.closeCanvas();
			}
		}
	};

	private checkBulletEnemyCollisions = () => {
		this.bullets.forEach(bullet => {
			this.enemies.forEach((enemy, enemyIndex) => {
				if (
					bullet.x < enemy.x + enemy.width &&
					bullet.x + bullet.width > enemy.x &&
					bullet.y < enemy.y + enemy.height &&
					bullet.y + bullet.height > enemy.y
				) {
					this.bullets = this.bullets.filter(b => b !== bullet);
					this.enemies = this.enemies.filter((e, index) => index !== enemyIndex);

					this.destroyedEnemiesCount++;

					this.enemyExplosion = new Explosion({
						x: enemy.x + enemy.width / 2,
						y: enemy.y + enemy.height / 2
					});
					this.enemyExplosion.startAnimation();

					if (this.enemies.length === 0) {
						this.initialEnemySpeed += 20;

						this.createEnemies();
					}
				}
			});
		});
	};
}

export default GameEngine;
