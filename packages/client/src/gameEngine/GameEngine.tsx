// src/gameEngine/GameEngine.tsx
import { useEffect, useRef, KeyboardEvent } from 'react';
import gamePlayBackground from '../assets/img/gamePlayBackground.png';

class GameEngine {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private ship: Ship;
	private bullets: Bullet[];
	private enemies: Enemy[];
	private lastShotTime: number;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d')!;
		this.ship = new Ship(400, 500, 50, 50);
		this.bullets = [];
		this.enemies = [];
		this.lastShotTime = 0;

		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('keyup', this.handleKeyUp);

		this.createEnemies();
	}

	public start = () => {
		this.gameLoop();
	};

	public stop = () => {
		window.removeEventListener('keydown', this.handleKeyDown);
		window.removeEventListener('keyup', this.handleKeyUp);
	};

	private createEnemies = () => {
		for (let i = 0; i < 9; i++) {
			const enemy = new Enemy(100 + i * 120, 50, 100, 100, 10);
			this.enemies.push(enemy);
		}
		for (let i = 0; i < 8; i++) {
			const enemy = new Enemy(90 + i * 120, 150, 100, 100, 10);
			this.enemies.push(enemy);
		}
	};

	private handleKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'ArrowLeft') {
			this.ship.moveLeft();
		} else if (event.code === 'ArrowRight') {
			this.ship.moveRight();
		} else if (event.code === 'Space' && Date.now() - this.lastShotTime > 1000) {
			this.shoot();
			this.lastShotTime = Date.now();
		}
	};

	private handleKeyUp = (event: KeyboardEvent) => {
		if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
			this.ship.stopMoving();
		}
	};

	private moveEnemies = () => {
		this.enemies.forEach(enemy => enemy.move(this.canvas.width, this.enemies));
	};

	private update = () => {
		this.ship.update(this.canvas.width);
		this.bullets.forEach(bullet => bullet.update());
		this.bullets = this.bullets.filter(bullet => !bullet.isOutOfBounds());
		this.moveEnemies();
	};

	private drawBackground = async () => {
		const img = new Image();
		img.src = gamePlayBackground;

		// Используем Promise, чтобы дождаться загрузки изображения
		await new Promise(resolve => {
			img.onload = resolve;
		});

		// console.log('Image loaded:', img.width, img.height); // Добавьте этот лог

		// Очистите холст, сделав его прозрачным
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Отрисовка фонового изображения
		this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

		// Отрисовка корабля, пуль, врагов и т.д.
		this.draw();
	};

	private draw = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Отрисовка фонового изображения
		this.drawBackground();

		// Отрисовка корабля, пуль, врагов и т.д.
		this.ship.draw(this.ctx, this.canvas.height);
		this.bullets.forEach(bullet => bullet.draw(this.ctx));
		this.enemies.forEach(enemy => enemy.draw(this.ctx));
	};

	private shoot = () => {
		const bullet = new Bullet(this.ship.x + this.ship.width / 2 - 10, this.ship.y, 20, 100);
		this.bullets.push(bullet);
	};

	private gameLoop = () => {
		this.update();
		this.draw();
		requestAnimationFrame(this.gameLoop);
	};
}

//todo: навесить изображение
class Ship {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;
	isMovingLeft: boolean;
	isMovingRight: boolean;

	constructor(x: number, y: number, width: number, height: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = 5;
		this.isMovingLeft = false;
		this.isMovingRight = false;
	}

	moveLeft = () => {
		this.isMovingLeft = true;
		this.isMovingRight = false;
	};

	moveRight = () => {
		this.isMovingLeft = false;
		this.isMovingRight = true;
	};

	stopMoving = () => {
		this.isMovingLeft = false;
		this.isMovingRight = false;
	};

	update = (canvasWidth: number) => {
		if (this.isMovingLeft && this.x > 0) {
			this.x -= this.speed;
		} else if (this.isMovingRight && this.x < canvasWidth - this.width) {
			this.x += this.speed;
		}
	};

	// Обновите метод draw, чтобы корабль оставался в нижней части экрана
	draw = (ctx: CanvasRenderingContext2D, canvasHeight: number) => {
		ctx.fillStyle = 'blue';
		ctx.fillRect(this.x, canvasHeight - this.height - 50, this.width, this.height);
	};
}

//todo: навесить изображение
class Bullet {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;

	constructor(x: number, y: number, width: number, height: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = 8;
	}

	update = () => {
		this.y -= this.speed;
	};

	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.fillStyle = 'red';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	isOutOfBounds = () => {
		return this.y + this.height < 0;
	};
}

// todo: доработать противников
class Enemy {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;

	constructor(x: number, y: number, width: number, height: number, speed: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
	}

	private static moveDownDistance = 50;

	move = (canvasWidth: number, allEnemies: Enemy[]) => {
		this.x += this.speed / 60;

		const reachedLeftEdge = allEnemies.some(enemy => enemy.x <= 0);
		const reachedRightEdge = allEnemies.some(enemy => enemy.x + enemy.width >= canvasWidth);

		if (reachedLeftEdge || reachedRightEdge) {
			allEnemies.forEach(enemy => {
				enemy.y += Enemy.moveDownDistance;
				enemy.speed *= -1;
				enemy.x += enemy.speed / 60;
			});
		}
	};

	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.fillStyle = 'black';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
}

export default GameEngine;
