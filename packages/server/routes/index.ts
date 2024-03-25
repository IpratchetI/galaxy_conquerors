import { Router } from 'express';

import { themesRoutes } from './theme';
import { userRoutes } from './user';
import { reactionRoutes } from './reaction';

import { forumRoutes } from '../forum';

const router: Router = Router();

userRoutes(router);
themesRoutes(router);
reactionRoutes(router);
forumRoutes(router);

export default router;
