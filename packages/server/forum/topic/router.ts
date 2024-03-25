import { Router } from 'express';

import TopicsController from './controller';

export const topicsRouter = Router();

topicsRouter.get('/:offset/:limit', TopicsController.getTopics);

topicsRouter.post('/', TopicsController.createTopic);

topicsRouter.post('/:topicId', TopicsController.getTopic);

topicsRouter.put('/:topicId', TopicsController.updateTopic);

topicsRouter.delete('/:topicId', TopicsController.deleteTopic);
