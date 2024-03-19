import { topicsRouter } from './topic/router';
import { commentsRouter } from './comment/router';

import type { Router } from 'express';

import { COMMENTS_ROUTE, TOPIC_ROUTE } from '../routes/constants';

export const forumRoutes = (router: Router) => {
	router.use(TOPIC_ROUTE, topicsRouter);
	router.use(COMMENTS_ROUTE, commentsRouter);
};
