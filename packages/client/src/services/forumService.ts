import { TOPICS_LIST } from '@pages/Forum/lib/mocks';
import { COMMENTS_LIST } from '@pages/Topic/lib/mocks';

class ForumService {
	getTopicsList() {
		return Promise.resolve(TOPICS_LIST);
	}

	getTopic() {
		return Promise.resolve(COMMENTS_LIST);
	}

	addReaction() {
		//TODO эндпоинт добавления реакции
		return null;
	}
}

const instance = new ForumService();
export { instance as ForumService };
