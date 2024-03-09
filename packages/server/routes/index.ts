import { Router } from 'express';

import { themesRoutes } from './theme';
import { userRoutes } from './user';

const router: Router = Router();

userRoutes(router);
themesRoutes(router);

export default router;
