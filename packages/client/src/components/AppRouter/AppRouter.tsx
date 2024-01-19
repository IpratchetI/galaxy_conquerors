import { ErrorPage } from '@pages/Error';
import Gameover from '@pages/Gameover';
import { LeaderBoard } from '@pages/LeaderBoard';
import Main from '@pages/Main';
import { Registration } from '@pages/Registration';
import { Route, Routes } from 'react-router-dom';

import { routerPaths } from './constants';

export const AppRouter = () => {
	return (
		<Routes>
			{/* Общие */}
			<Route>
				<Route path={routerPaths.login} element={<div>login</div>} key={routerPaths.login} />
				<Route path={routerPaths.registration} element={<Registration />} key={routerPaths.registration} />
			</Route>
			{/* Приватные */}
			<Route path={routerPaths.main}>
				<Route index element={<Main />} key={routerPaths.main} />
				<Route path={routerPaths.profile} element={<div>profile</div>} key={routerPaths.profile} />
				<Route path={routerPaths.leaderboard} element={<LeaderBoard />} key={routerPaths.leaderboard} />
				<Route path={routerPaths.highScore} element={<div>highScore</div>} key={routerPaths.highScore} />
				<Route path={routerPaths.forum} key={routerPaths.forum}>
					<Route index element={<div>forum</div>} key="index" />
					<Route path={routerPaths.forumTheme} element={<div>forumTheme</div>} key={routerPaths.forumTheme} />
				</Route>
				<Route path={routerPaths.story} element={<div>story</div>} key={routerPaths.story} />
				<Route path={routerPaths.authors} element={<div>authors</div>} key={routerPaths.authors} />
				<Route path={routerPaths.gamePlay} element={<div>gamePlay</div>} key={routerPaths.gamePlay} />
				<Route path={routerPaths.gameOver} element={<Gameover />} key={routerPaths.gameOver} />
			</Route>
			<Route path="*" element={<ErrorPage type="404" />} key="*" />
		</Routes>
	);
};
