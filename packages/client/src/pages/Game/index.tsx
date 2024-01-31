import React, { useEffect, useRef } from 'react';
import { Button } from '@components/Button';
import { useFullScreen } from '@hooks/useFullscreen';
import FullscreenIcon from '@assets/icons/fullscreenButton.svg';

import styles from './index.module.scss';

import GameEngine from '../../gameEngine/GameEngine';

import '../../gameEngine/GameEngine.scss';

const Game: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const toggleFullscreen = useFullScreen(canvasRef, ['Alt', 'Enter']);

	useEffect(() => {
		if (canvasRef?.current) {
			const canvas = canvasRef.current;
			const gameEngine = new GameEngine(canvas);

			// размеры холста
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			// старт движка
			gameEngine.start();

			const handleResize = () => {
				// обновление размеров холста
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			};

			// обработчик изменения размера окна
			window.addEventListener('resize', handleResize);

			return () => {
				// Очистка обработчика изменения размера окна при размонтировании компонента
				window.removeEventListener('resize', handleResize);
				gameEngine.stop();
			};
		}
	}, []);

	return (
		<>
			<canvas ref={canvasRef} />
			<Button
				text="Fullscreen"
				className={styles.fullscreenButton}
				onClick={() => toggleFullscreen()}>
				<FullscreenIcon />
			</Button>
		</>
	);
};

export { Game };
