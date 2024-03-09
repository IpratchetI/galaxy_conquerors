import { Topics } from '@models/topics';
import { COMMENTS_LIST, USERS } from '@pages/Topic/lib/mocks';

export const TOPICS_LIST: Topics = [
	{
		id: '0',
		name: 'Interesting projects',
		comments: COMMENTS_LIST,
		length: 60,
		users: USERS
	},
	{
		id: '1',
		name: 'Secret bonuses',
		comments: COMMENTS_LIST,
		length: 100,
		users: USERS
	},
	{
		id: '2',
		name: 'Other theme',
		comments: COMMENTS_LIST,
		length: 2244,
		users: USERS
	},
	{
		id: '3',
		name: 'Topic 1',
		comments: COMMENTS_LIST,
		length: 1,
		users: USERS
	},
	{
		id: '4',
		name: 'Chits',
		comments: COMMENTS_LIST,
		length: 121300842394,
		users: USERS
	}
];
