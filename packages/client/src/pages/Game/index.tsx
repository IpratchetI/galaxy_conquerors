import { routerPaths } from '@/constants/routerPaths';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GameEngine from '../../gameEngine/GameEngine';

import '../../gameEngine/GameEngine.scss';
import { BreakGamePopup } from './components/BreakGamePopup';

const Game: React.FC = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const breakRef = useRef<{ break: () => void; destroyedEnemiesCount: () => void } | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const endGame = () => {
		//TODO изменить после добавления store
		sessionStorage.setItem('destroyedEnemiesCount', `${breakRef.current?.destroyedEnemiesCount()}`);
		setTimeout(() => {
			navigate(routerPaths.gameOver);
		}, 2000);
	};

	const endGameRef = useRef<() => void>(endGame);
	const canvasPropsRef = useRef({ canvasRef, endGameRef });

	const handleOpenBreakPopup = () => {
		setIsModalOpen(prevState => !prevState);
		breakRef.current?.break();
	};

	useEffect(() => {
		if (canvasPropsRef.current.canvasRef.current) {
			const canvas = canvasPropsRef.current.canvasRef.current;
			const gameEngine = new GameEngine(canvasPropsRef.current);

			// размеры холста
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			// старт движка
			gameEngine.start();
			breakRef.current = {
				break: gameEngine.break,
				destroyedEnemiesCount: gameEngine.getDestroyedEnemiesCount
			};

			const handleResize = () => {
				// обновление размеров холста
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			};

			const handleEscape = (event: KeyboardEvent) => {
				if (event.code === 'Escape') {
					event.preventDefault();
					event.stopPropagation();
					handleOpenBreakPopup();
					gameEngine.stopAnimationHandler();
				}
			};

			//обработчик паузы в игре
			window.addEventListener('keydown', handleEscape);
			// обработчик изменения размера окна
			window.addEventListener('resize', handleResize);

			return () => {
				// Очистка обработчика изменения размера окна при размонтировании компонента
				window.removeEventListener('resize', handleResize);
				window.removeEventListener('keydown', handleEscape);
				gameEngine.stop();
			};
		}
	}, []);

	return (
		<>
			<canvas ref={canvasRef} />
			<BreakGamePopup
				isOpen={isModalOpen}
				onClose={handleOpenBreakPopup}
				/* eslint-disable */
				destroyedEnemiesCount={breakRef.current!.destroyedEnemiesCount}
			/>
		</>
	);
};

export { Game };
