import React from 'react';
import { Button } from '@components/Button';
import { useNavigate } from 'react-router-dom';

import s from './index.module.scss';
import { HighscoreList } from './components/HighscoreList/highscoreList';

export const LeaderBoard = () => {
	const navigate = useNavigate();

	return (
		<div className={s.leaderboardPage}>
			<h2 className={s.leaderboardTitle}>Highscore</h2>
			<div className={s.highscoreList}>
				<HighscoreList />
			</div>
			<Button text="Back" className={s.button} onClick={() => navigate(-1)} />
		</div>
	);
};
