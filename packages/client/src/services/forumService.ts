import { TopicId } from './../models/topics';
import { NewComment } from '@/store/reducers/forum/forumReducer';
import { IMessage, TopicModel, Topics } from '@models/topics';
import { baseBackEndApi } from './baseApi';

class ForumService {
	private _controllerName = 'forum/';

	getTopicsList() {
		return baseBackEndApi.get<Topics>(this._controllerName + 'topics', {
			withCredentials: true
		});
	}

	addTopic(data: TopicModel) {
		return baseBackEndApi.post(this._controllerName + `topic/${data.id}`, data, {
			withCredentials: true
		});
	}

	addComment(data: NewComment, topicId: TopicId) {
		return baseBackEndApi.post(this._controllerName + `topic/${topicId}`, data, {
			withCredentials: true
		});
	}

	addMessage(data: IMessage, topicId: TopicId) {
		return baseBackEndApi.post(this._controllerName + `topic/${topicId}/message`, data, {
			withCredentials: true
		});
	}
}

const instance = new ForumService();
export { instance as ForumService };
