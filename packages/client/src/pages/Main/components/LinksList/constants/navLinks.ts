import { routerPaths } from '@/constants/routerPaths';

import { NavLink } from '../types';

export const navLinks: NavLink[] = [
	{ id: 0, path: routerPaths.story, text: 'Play' },
	{ id: 1, path: routerPaths.profile, text: 'Profile' },
	{ id: 2, path: routerPaths.leaderBoard, text: 'Highscore' },
	{ id: 3, path: routerPaths.authors, text: 'Authors' },
	{ id: 4, path: routerPaths.forum, text: 'Forum' },
	{ id: 5, path: routerPaths.login, text: 'Exit' }
];
