import { ErrorPage } from '@pages/Error';
import { ForumPage } from '@pages/Forum';
import { LeaderBoard } from '@pages/LeaderBoard';
import { Login } from '@pages/Login';
import { Main } from '@pages/Main';
import { Game } from '@pages/Game';
import { Profile } from '@pages/Profile';
import { Registration } from '@pages/Registration';
import { StartGame } from '@pages/StartGame';
import { TopicPage } from '@pages/Topic';
import { Route, Routes } from 'react-router-dom';
import { GameOver } from '@pages/Gameover';
import { AuthProtection } from '@components/AuthProtection';
import { useAuthorize } from '@hooks/useAuthorize';

import { routerPaths } from '@/constants/routerPaths';

export const AppRouter = () => {
	useAuthorize();

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
					<Route path={routerPaths.leaderBoard} element={<LeaderBoard />} />
					<Route path={routerPaths.forum}>
						<Route index element={<ForumPage />} />
						<Route path={routerPaths.forumTheme} element={<TopicPage />} />
					</Route>
					<Route path={routerPaths.story} element={<StartGame />} />
					<Route path={routerPaths.authors} element={<div>authors</div>} />
					<Route path={routerPaths.game} element={<Game />} />
					<Route path={routerPaths.gameOver} element={<GameOver />} />
				</Route>
			</Route>
			<Route path="*" element={<ErrorPage type="404" />} />
		</Routes>
	);
};
