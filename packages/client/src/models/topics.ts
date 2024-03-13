import { CommentDto } from 'server/forum/comment/types';

export type TopicModel = {
	id: ForumChildrenId;
	name: string;
	comments: CommentDto[];
	length: number;
	users: Record<number, string>;
};

export type TopicsPagination = {
	offset: number;
	limit: number;
};

export type ForumChildrenId = number;

export type ReactionModel = string;
export interface IMessage {
	id: ForumChildrenId;
	text: string;
	reactions?: Record<ReactionModel, number>;
}

export type Topics = TopicModel[];
