import React from 'react';
import { Button } from '@components/Button';

import s from './index.module.scss';
import { HighscoreList } from './components/HighscoreList/highscoreList';

export const LeaderBoard = () => {
	const handleHistoryBack = () => {
		// todo: add back
	};

	return (
		<div className={s.leaderboardPage}>
			<h2 className={s.leaderboardTitle}>Highscore</h2>
			<div className={s.highscoreList}>
				<HighscoreList />
			</div>
			<Button title="Back" className={s.button} onClick={handleHistoryBack} />
		</div>
	);
};
