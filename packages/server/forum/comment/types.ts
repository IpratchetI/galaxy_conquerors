import type UserDto from '../../db-models/user';

export interface CommentDto {
	id?: number;
	content?: string;
	topicId?: number;
	author?: UserDto;
	createdAt?: Date;
}

export interface CommentUpdateRequest {
	body: string;
}

export interface CommentCreateRequest {
	body: string;
	topicId: number;
}

export interface CommentsRequest {
	topicId: number;
	offset: number;
	limit: number;
}
