import { CommentModel } from '@models/topics';

export const USERS: Record<number, string> = { 0: 'user0', 1: 'user 1', 2: 'user2' };

export const COMMENTS_LIST: CommentModel[] = [
	{
		id: 0,
		userId: 0,
		messages: [
			{
				id: 10,
				text: 'text',
				reactions: {}
			}
		]
	},
	{
		id: 1,
		userId: 2,
		messages: [
			{
				id: 11,
				text:
					'loooooong very veeeery looooooooooooooon super long text' +
					' with numbers and some words'
			},
			{
				id: 12,
				text: 'not very long',
				reactions: {}
			}
		]
	},
	{
		id: 2,
		userId: 0,
		messages: [
			{
				id: 13,
				text: 'simple answer text',
				reactions: {}
			}
		]
	}
];
