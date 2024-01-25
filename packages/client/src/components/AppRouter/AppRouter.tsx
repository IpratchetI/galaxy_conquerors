import { ErrorPage } from '@pages/Error';
import { ForumPage } from '@pages/Forum';
import Gameover from '@pages/Gameover';
import { LeaderBoard } from '@pages/LeaderBoard';
import { Login } from '@pages/Login';
import Main from '@pages/Main';
import Game from '@pages/Game';
import Profile from '@pages/Profile';
import { Registration } from '@pages/Registration';
import StartGame from '@pages/StartGame';
import { TopicPage } from '@pages/Topic';
import { Route, Routes } from 'react-router-dom';
import { AuthProtection } from '@components/AuthProtection';

import { routerPaths } from '@/constants/routerPaths';

export const AppRouter = () => {
	return (
		<Routes>
			{/* Общие */}
			<Route>
				<Route path={routerPaths.login} element={<Login />} />
				<Route path={routerPaths.registration} element={<Registration />} />
			</Route>
			<Route element={<AuthProtection />}>
				{/* Приватные */}
				<Route path={routerPaths.main}>
					<Route index element={<Main />} />
					<Route path={routerPaths.profile} element={<Profile />} />
					<Route path={routerPaths.leaderboard} element={<LeaderBoard />} />
					<Route path={routerPaths.highScore} element={<div>highScore</div>} />
					<Route path={routerPaths.forum}>
						<Route index element={<ForumPage />} />
						<Route path={routerPaths.forumTheme} element={<TopicPage />} />
					</Route>
					<Route path={routerPaths.story} element={<StartGame />} />
					<Route path={routerPaths.authors} element={<div>authors</div>} />
					<Route path={routerPaths.gamePlay} element={<div>gamePlay</div>} />
					<Route path={routerPaths.gameOver} element={<Gameover />} />
				</Route>
			</Route>
			<Route path="*" element={<ErrorPage type="404" />} />
		</Routes>
	);
};
