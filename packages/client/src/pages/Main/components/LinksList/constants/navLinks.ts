import { routerPaths } from '@/constants/routerPaths';

import { NavLink } from '../types';

export const navLinks: NavLink[] = [
	{ id: 0, path: routerPaths.gamePlay, text: 'Play' },
	{ id: 1, path: routerPaths.highScore, text: 'Highscore' },
	{ id: 2, path: routerPaths.authors, text: 'Authors' },
	{ id: 3, path: routerPaths.forum, text: 'Forum' },
	{ id: 4, action: true, path: routerPaths.login, text: 'Exit' }
];
