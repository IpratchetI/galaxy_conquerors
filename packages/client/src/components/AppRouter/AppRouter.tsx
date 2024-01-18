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
				<Route path={routerPaths.login} element={<div>login</div>} key="" />
				<Route path={routerPaths.registration} element={<Registration />} />
			</Route>
			{/* Приватные */}
			<Route>
				<Route path={routerPaths.profile} element={<div>profile</div>} />
				<Route path={routerPaths.main} element={<Main />} />
				<Route path={routerPaths.leaderboard} element={<LeaderBoard />} />
				<Route path={routerPaths.highScore} element={<div>highScore</div>} />
				<Route path={routerPaths.forum} element={<div>forum</div>} key={routerPaths.forum} />
				<Route path={routerPaths.forumTheme} element={<div>forumTheme</div>} key={routerPaths.forumTheme} />
				<Route path={routerPaths.story} element={<div>story</div>} />
				<Route path={routerPaths.authors} element={<div>authors</div>} />
				<Route path={routerPaths.gamePlay} element={<div>gamePlay</div>} />
				<Route path={routerPaths.gameOver} element={<Gameover />} />
			</Route>
			<Route path="*" element={<ErrorPage type="404" />} />
		</Routes>
	);
};
