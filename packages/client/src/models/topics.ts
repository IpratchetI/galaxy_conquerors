import { CommentDto } from 'server/forum/comment/types';

export type TopicModel = {
	id: ForumChildrenId;
	title: string;
	comments: CommentDto[];
	commentsCount: number;
};

export type NewTopicModel = {
	title: string;
};

export type TopicsPagination = {
	limit?: number;
	offset?: number;
};

export type ForumChildrenId = number;

export type ReactionModel = string;
export interface IMessage {
	id: ForumChildrenId;
	text: string;
	reactions?: Record<ReactionModel, number>;
}

export type Topics = TopicModel[];
