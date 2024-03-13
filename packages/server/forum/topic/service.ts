import { Topic } from './model';

import type { TopicCreateRequest, TopicDto, TopicsRequest } from './types';

import { EMPTY_RESULTS_ERROR, REQUEST_ERROR } from '../constants/messages';

class TopicService {
	public async getTopics(data: TopicsRequest): Promise<TopicDto[]> {
		return await Topic.findAll({
			offset: data.offset,
			limit: data.limit
		});
	}

	public async createTopic(data: TopicCreateRequest): Promise<TopicDto> {
		return await Topic.create(data);
	}

	public async updateTopic({
		newTopicData,
		topicId
	}: {
		newTopicData: TopicCreateRequest;
		topicId: number;
	}): Promise<void> {
		const topic = await Topic.update(newTopicData, { where: { id: topicId } });

		if (!topic) {
			throw new Error(EMPTY_RESULTS_ERROR);
		}
		if (topic[0] < 1) {
			throw new Error(REQUEST_ERROR);
		}
	}

	public async deleteTopic(topicId: number): Promise<void> {
		const topic = await Topic.destroy({ where: { id: topicId } });

		if (!topic) {
			throw new Error(EMPTY_RESULTS_ERROR);
		}
	}
}

export default new TopicService();
