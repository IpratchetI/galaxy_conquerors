import { IUser } from '@models/types/user';
import { IComment } from '@models/types/topics';

export const USERS: IUser[] = [
	{
		id: 0,
		name: 'user1'
	},
	{
		id: 1,
		name: 'user2'
	},
	{
		id: 2,
		name: 'user3'
	}
];

export const COMMENTS_LIST: IComment[] = [
	{
		id: 0,
		userId: 0,
		messages: [
			{
				id: 0,
				text: 'text'
			}
		]
	},
	{
		id: 1,
		userId: 2,
		messages: [
			{
				id: 0,
				text: 'loooooong very veeeery looooooooooooooon super long text with numbers and some words'
			},
			{
				id: 1,
				text: 'not very long'
			}
		]
	},
	{
		id: 2,
		userId: 0,
		messages: [
			{
				id: 0,
				text: 'simple answer text'
			}
		]
	}
];
