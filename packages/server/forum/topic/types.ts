import type { Comment } from '../comment/model';

export interface TopicDto {
	id?: number;
	createdAt?: Date;
	commentsCount?: number;
	comments?: Comment[];
	title?: string;
}

export interface TopicGetRequest {
	topicId: number;
}

export interface TopicCreateRequest {
	title: string;
}

export interface TopicsRequest {
	offset: number;
	limit: number;
}
