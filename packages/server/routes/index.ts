import { Router } from 'express';

import { themesRoutes } from './theme';
import { userRoutes } from './user';
import { reactionRoutes } from './reaction';

const router: Router = Router();

userRoutes(router);
themesRoutes(router);
reactionRoutes(router);

export default router;
