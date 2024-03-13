import { TopicModel, Topics, ForumChildrenId, TopicsPagination } from '@models/topics';

import { serverBaseApi } from './baseApi';
import { COMMENTS_ROUTE, TOPIC_ROUTE } from 'server/routes/constants';

export type AddComment = {
	data: string;
	topicId: number;
};

export type GetComments = {
	offset: number;
	limit: number;
	topicId: ForumChildrenId;
};

class ForumService {
	getTopicsList({ offset, limit }: TopicsPagination) {
		return serverBaseApi.get<Topics>(TOPIC_ROUTE + `/${offset}/${limit}`, {
			withCredentials: true
		});
	}

	addTopic(data: TopicModel) {
		return serverBaseApi.post(TOPIC_ROUTE, data, {
			withCredentials: true
		});
	}
	getCommentsList({ offset, limit, topicId }: GetComments) {
		return serverBaseApi.get<Topics>(COMMENTS_ROUTE + `/${topicId}/${offset}/${limit}`, {
			withCredentials: true
		});
	}

	addComment({ data, topicId }: AddComment) {
		return serverBaseApi.post(COMMENTS_ROUTE + `/${topicId}`, data, {
			withCredentials: true
		});
	}
}

const instance = new ForumService();
export { instance as ForumService };
