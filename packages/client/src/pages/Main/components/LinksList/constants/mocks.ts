import { NavLink } from '../types';

export const navLinks: NavLink[] = [
	{ id: 0, path: '/game', text: 'Play' },
	{ id: 1, path: '/leaderboard', text: 'Highscore' },
	{ id: 2, path: '/authors', text: 'Authors' },
	{ id: 3, path: '/forum', text: 'Forum' },
	{ id: 4, action: true, path: '/sign-in', text: 'Exit' }
];
