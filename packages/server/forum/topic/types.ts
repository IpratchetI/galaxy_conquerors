export interface TopicDto {
	id?: number;
	title?: string;
	createdAt?: Date;
	commentsId?: number;
}

export interface TopicCreateRequest {
	title: string;
	body: string;
}

export interface TopicsRequest {
	offset: number;
	limit: number;
}
