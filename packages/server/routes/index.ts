import { Router } from 'express';

import { themesRoutes } from './theme';

const router: Router = Router();

themesRoutes(router);

export default router;
