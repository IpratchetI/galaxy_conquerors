import { CommentModel } from '@models/topics';

export const USERS: Record<number, string> = { 0: 'user0', 1: 'user 1', 2: 'user2' };

export const COMMENTS_LIST: CommentModel[] = [
	{
		id: '0',
		userId: 0,
		messages: [
			{
				id: '0',
				text: 'text'
			}
		]
	},
	{
		id: '1',
		userId: 2,
		messages: [
			{
				id: '0',
				text:
					'loooooong very veeeery looooooooooooooon super long text' +
					' with numbers and some words'
			},
			{
				id: '1',
				text: 'not very long'
			}
		]
	},
	{
		id: '2',
		userId: 0,
		messages: [
			{
				id: '0',
				text: 'simple answer text'
			}
		]
	}
];
