import { Topics, ForumChildrenId, TopicsPagination, NewTopicModel } from '@models/topics';

import { serverBaseApi } from './baseApi';
import { COMMENTS_ROUTE, TOPIC_ROUTE } from 'server/routes/constants';

export type AddComment = {
	content: string;
	topicId: number;
	userId: number;
};

export type GetComments = {
	offset?: number;
	limit?: number;
	topicId: ForumChildrenId;
};

class ForumService {
	getTopicsList({ offset = 0, limit = 10 }: TopicsPagination) {
		return serverBaseApi.get<Topics>(TOPIC_ROUTE + `/${offset}/${limit}`, {
			withCredentials: true
		});
	}

	addTopic(data: NewTopicModel) {
		return serverBaseApi.post(TOPIC_ROUTE, data, {
			withCredentials: true
		});
	}

	getTopic(topicId: number) {
		return serverBaseApi.post(TOPIC_ROUTE + `/${topicId}`, {
			withCredentials: true
		});
	}

	getCommentsList({ offset = 0, limit = 10, topicId }: GetComments) {
		return serverBaseApi.get<Topics>(COMMENTS_ROUTE + `/${topicId}/${offset}/${limit}`, {
			withCredentials: true
		});
	}

	addComment(body: AddComment) {
		return serverBaseApi.post(COMMENTS_ROUTE, body, {
			withCredentials: true
		});
	}
}

const instance = new ForumService();
export { instance as ForumService };
