import { Topics } from '@models/topics';
import { COMMENTS_LIST } from '@pages/Topic/lib/mocks';

export const TOPICS_LIST: Topics = [
	{
		id: 0,
		name: 'Interesting projects',
		comments: COMMENTS_LIST,
		length: 60
	},
	{
		id: 1,
		name: 'Secret bonuses',
		comments: COMMENTS_LIST,
		length: 100
	},
	{
		id: 2,
		name: 'Other theme',
		comments: COMMENTS_LIST,
		length: 2244
	},
	{
		id: 3,
		name: 'Topic 1',
		comments: COMMENTS_LIST,
		length: 1
	},
	{
		id: 4,
		name: 'Chits',
		comments: COMMENTS_LIST,
		length: 121300842394
	},
	{
		id: 5,
		name: 'Long name for test naming and some more words and phrases and more and more and more',
		comments: COMMENTS_LIST,
		length: 100000
	},
	{
		id: 6,
		name: 'Topic 2',
		comments: COMMENTS_LIST,
		length: 60
	},
	{
		id: 7,
		name: 'Topic 10',
		comments: COMMENTS_LIST,
		length: 60
	},
	{
		id: 8,
		name: 'No name',
		comments: COMMENTS_LIST,
		length: 60
	},
	{
		id: 9,
		name: 'DEFAULT',
		comments: COMMENTS_LIST,
		length: 60
	}
];
