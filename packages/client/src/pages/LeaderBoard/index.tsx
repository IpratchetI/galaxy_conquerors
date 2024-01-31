import React from 'react';
import { Button } from '@components/Button';
import { useNavigate } from 'react-router-dom';

import { Spacer } from '@/components';

import s from './index.module.scss';
import { HighscoreList } from './components/HighscoreList/highscoreList';

export const LeaderBoard = () => {
	const navigate = useNavigate();

	return (
		<Spacer gap="30" direction="column" align="start" className={s.leaderboardPage}>
			<h2 className={s.leaderboardTitle}>Highscore</h2>
			<HighscoreList />
			<Button className={s.button} onClick={() => navigate(-1)}>
				Back
			</Button>
		</Spacer>
	);
};
