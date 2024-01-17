import React from 'react';
import s from './index.module.scss';
import { Button } from '@components/Button';
import { HighscoreList } from './components/HighscoreList/highscoreList';

export const LeaderBoard: React.FC = () => {
	const handleHistoryBack = () => {
		// todo: add back
	};

	return (
		<div className={s.leaderboardPage}>
			<h2 className={s.leaderboardTitle}>Highscore</h2>
			<div className={s.highscoreList}>
				<HighscoreList />
			</div>
			<Button className={s.button} onClick={handleHistoryBack}>
				Back
			</Button>
		</div>
	);
};
