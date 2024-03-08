import { Router, type Request, type Response } from 'express';

import {
	ERROR_MESSAGE_INVALID_BODY,
	GET_THEME_ROUTE,
	SERVER_BASE_URL,
	SET_THEME_ROUTE
} from '../constants';
import User from '../db-models/user';
import Theme from '../db-models/theme';

export const themesRoutes = (router: Router) => {
	const themesRouter: Router = Router()
		.put(SET_THEME_ROUTE, async (req: Request, res: Response) => {
			try {
				const body = req.body;
				const { user, theme } = body ?? {};

				if (!user || !theme) {
					res.status(400);
					res.send(ERROR_MESSAGE_INVALID_BODY);
					return;
				}

				const { id } = user;

				const [userFromDb] = await User.findOrCreate({
					where: { id },
					defaults: { ...user, theme }
				});

				await userFromDb.save();

				res.status(200);
				res.send('Тема приложения успешно изменена');
			} catch (err) {
				console.error(err);
			}
		})

		.get(GET_THEME_ROUTE, async (req: Request, res: Response) => {
			const { id } = req.query;

			if (!id) {
				res.status(400);
				res.send('Не указан id пользователя');
			}

			const user = await User.findByPk(`${id}`);
			const theme = await Theme.findByPk(`${user?.theme_id}`);

			res.status(200);
			res.json({ theme: theme || 'app_light_theme' });
		});

	router.use(SERVER_BASE_URL, themesRouter);
};
