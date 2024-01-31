import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '@/constants/routerPaths';

import { BreakGamePopup } from './components/BreakGamePopup';

import GameEngine from '@/gameEngine/GameEngine';

import store, { useAppDispatch } from '@/store';
import { updateScore } from '@/store/reducers/user/userReducer';

import '../../gameEngine/GameEngine.scss';

const redirectTime = 3000;

type BreakGame = { break: () => void; destroyedEnemiesCount: () => number } | null;

const Game: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const breakRef = useRef<BreakGame>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const setScore = (scoreNow: number) => {
		const prevScore = store.getState().userState.score;
		const newMaxScore = scoreNow > prevScore.maxScore ? scoreNow : prevScore.maxScore;
		dispatch(updateScore({ maxScore: newMaxScore, lastGameScore: scoreNow }));
	};

	const endGame = () => {
		const scoreNow = breakRef.current!.destroyedEnemiesCount()!;
		setScore(scoreNow);

		setTimeout(() => {
			navigate(routerPaths.gameOver);
		}, redirectTime);
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
				setScore={setScore}
				destroyedEnemiesCount={breakRef.current?.destroyedEnemiesCount}
			/>
		</>
	);
};

export { Game };
