import { IMessage, TopicModel, Topics, ForumChildrenId } from '@models/topics';

import { NewComment } from '@/store/reducers/forum/forumReducer';

import { serverBaseApi } from './baseApi';

export type AddComment = {
	data: NewComment;
	topicId: ForumChildrenId;
};

export type AddMessage = {
	data: IMessage;
	topicId: ForumChildrenId;
};

export type AddReaction = {
	topicId: ForumChildrenId;
	commentId: ForumChildrenId;
	messageId: ForumChildrenId;
	reaction: string;
};

class ForumService {
	private _controllerName = 'forum/';

	getTopicsList() {
		return serverBaseApi.get<Topics>(this._controllerName + 'topics', {
			withCredentials: true
		});
	}

	addTopic(data: TopicModel) {
		return serverBaseApi.post(this._controllerName + `topic/${data.id}`, data, {
			withCredentials: true
		});
	}

	addComment({ data, topicId }: AddComment) {
		return serverBaseApi.post(this._controllerName + `topic/${topicId}`, data, {
			withCredentials: true
		});
	}

	addMessage({ data, topicId }: AddMessage) {
		return serverBaseApi.post(this._controllerName + `topic/${topicId}/message`, data, {
			withCredentials: true
		});
	}

	addReaction({ topicId, messageId, commentId, reaction }: AddReaction) {
		return serverBaseApi.post(
			this._controllerName + `topic/${topicId}/comments/${commentId}/message/${messageId}/reaction`,
			reaction,
			{
				withCredentials: true
			}
		);
	}
}

const instance = new ForumService();
export { instance as ForumService };
