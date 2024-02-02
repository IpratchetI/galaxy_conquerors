import Ship from './Ship/Ship';
import Bullet from './Bullet/Bullet';
import Enemy from './Enemy/Enemy';
import Explosion from './Explosion/Explosion';
import * as constants from './constants';

interface CanvasProps {
	canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
	endGameRef: React.MutableRefObject<() => void>;
}

class GameEngine {
	protected canvas: HTMLCanvasElement;
	private closeCanvas: () => void;
	private stopEngine = false;
	private isBreak = false;
	private breakStartTime = 0;
	private breakEndTime = 0;
	private ctx: CanvasRenderingContext2D;
	protected ship: Ship | null;
	protected bullets: Bullet[];
	protected enemies: Enemy[];
	private lastShotTime: number;
	protected destroyedEnemiesCount = 0;
	private isCountReported = false;
	private initialEnemySpeed = 100;
	protected shootInterval = 500;
	protected stopEnemyBorder = 200;
	protected shipExplosion: Explosion | null;
	private enemyExplosion: Explosion | null;

	constructor(canvasProps: CanvasProps) {
		this.canvas = canvasProps.canvasRef.current!;
		this.closeCanvas = canvasProps.endGameRef.current;
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		if (!this.ctx) {
			throw new Error('Unable to get 2D rendering context');
		}

		const initialShipX = window.innerWidth / 2 - constants.initialShipOffsetX;
		const initialShipY = window.innerHeight - constants.initialShipOffsetY;
		this.ship = new Ship({ x: initialShipX, y: initialShipY });
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

	public stopUpdate = () => {
		this.stopEngine = true;
	};

	public break = () => {
		this.isBreak = !this.isBreak;
		if (this.isBreak) {
			this.breakStartTime = Date.now();
		} else {
			this.breakEndTime = Date.now();
		}
	};

	protected updateGame = () => {
		this.moveShip();
		this.updateBullets();
		this.moveEnemies();
		this.checkShipBounds();
		this.checkBulletEnemyCollisions();
		this.checkStopEnemies();
	};

	protected drawGame = () => {
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

	protected handleKeyDown = (event: KeyboardEvent) => {
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
			if (event.code === 'ArrowLeft' && this.ship) {
				this.ship.moveLeft();
			} else if (event.code === 'ArrowRight' && this.ship) {
				this.ship.moveRight();
			} else if (event.code === 'Space') {
				this.shoot();
			}
		}
	};

	protected handleKeyUp = (event: KeyboardEvent) => {
		if (
			event.code === 'ArrowLeft' ||
			event.code === 'ArrowRight' ||
			event.code === 'ArrowUp' ||
			event.code === 'ArrowDown'
		) {
			event.preventDefault();
		}

		if (this.ship && (event.code === 'ArrowLeft' || event.code === 'ArrowRight')) {
			this.ship.stopMoving();
		}
	};

	protected createEnemies = () => {
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

	protected moveEnemies = () => {
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
		const dateNow = Date.now();
		const breakTime = this.breakEndTime - this.breakStartTime;
		const timeAfterShotWithoutBreak =
			dateNow - this.breakEndTime > this.shootInterval ? 0 : breakTime;
		if (this.ship && dateNow - timeAfterShotWithoutBreak - this.lastShotTime > this.shootInterval) {
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
		if (!this.isBreak) {
			this.updateGame();
		}
		this.drawGame();
		if (!this.stopEngine) {
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

	protected checkStopEnemies = () => {
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

	protected checkBulletEnemyCollisions = () => {
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
