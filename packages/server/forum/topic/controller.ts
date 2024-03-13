import TopicService from './service';

import type { Request, Response } from 'express';

import { EMPTY_RESULTS_ERROR, REQUEST_ERROR, SERVER_ERROR } from '../constants/messages';

class TopicController {
	public getTopics = async (request: Request, response: Response) => {
		try {
			const { offset, limit = 0 } = request.params;

			if (!offset || limit < 0) {
				response.status(400).json(REQUEST_ERROR);
			}

			const topics = await TopicService.getTopics({
				offset: Number(offset),
				limit: Number(limit)
			});

			if (topics) {
				response.json(topics).status(200);
			}
		} catch (e) {
			response.status(500).json({
				response: SERVER_ERROR,
				reason: e
			});
		}
	};
	public getTopic = async (request: Request, response: Response) => {
		try {
			const { topicId } = request.params;
			const topic = await TopicService.getTopic({ topicId: Number(topicId) });

			if (topic) {
				response.json(topic).status(200);
			} else {
				response
					.json({
						EMPTY_RESULTS_ERROR
					})
					.status(404);
			}
		} catch (e) {
			response.status(500).json({
				response: SERVER_ERROR,
				reason: e
			});
		}
	};
	public createTopic = async (request: Request, response: Response) => {
		try {
			const { body } = request;
			const topic = await TopicService.createTopic(body);

			if (topic) {
				response.json(topic).status(200);
			}
		} catch (e) {
			response.status(500).json({
				response: SERVER_ERROR,
				reason: e
			});
		}
	};

	public updateTopic = async (request: Request, response: Response) => {
		try {
			const { body } = request;
			const { topicId } = request.params;

			if (!topicId) {
				response.status(400).json(REQUEST_ERROR);
			}

			await TopicService.updateTopic({
				newTopicData: body,
				topicId: Number(topicId)
			});

			response.json('OK').status(200);
		} catch (e) {
			response.status(500).json({
				response: SERVER_ERROR,
				reason: e
			});
		}
	};

	public deleteTopic = async (request: Request, response: Response) => {
		try {
			const { topicId } = request.params;

			if (!topicId) {
				response.status(400).json(REQUEST_ERROR);
			}

			await TopicService.deleteTopic(Number(topicId));

			response.status(204);
		} catch (e) {
			response.status(500).json({
				response: SERVER_ERROR,
				reason: e
			});
		}
	};
}

export default new TopicController();
