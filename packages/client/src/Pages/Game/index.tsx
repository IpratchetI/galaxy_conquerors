// src/pages/Game/index.tsx
import React, { useEffect, useRef } from 'react';
import GameEngine from '../../gameEngine/GameEngine';
import '../../gameEngine/GameEngine.scss';

const Game: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current!;
		const gameEngine = new GameEngine(canvas);

		//размеры холста на основе размеров окна браузера
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// старт движка
		gameEngine.start();

		const handleResize = () => {
			// Обновление размеры холста при изменении размеров окна
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		//обработчик изменения размера окна
		window.addEventListener('resize', handleResize);

		return () => {
			// Очиститка обработчика изменения размера окна при размонтировании компонента
			window.removeEventListener('resize', handleResize);
			gameEngine.stop();
		};
	}, []);

	return <canvas ref={canvasRef} />;
};

export default Game;
