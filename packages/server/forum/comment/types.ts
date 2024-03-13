export interface CommentDto {
	id?: number;
	content?: string;
	topicId?: number;
	// TODO: https://linear.app/galaxyconquerors/issue/GAL-60/dorabotki-po-api-foruma
	// author?: UserDto;
	userId?: number;
	createdAt?: Date;
}

export interface CommentUpdateRequest {
	body: string;
}

export interface CommentCreateRequest {
	content: string;
	topicId: number;
	userId: number;
}

export interface CommentsRequest {
	topicId: number;
	offset?: number;
	limit?: number;
}
