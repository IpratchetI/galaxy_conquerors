import { type Request, type Response, Router } from 'express';

import { THEME_ROUTE } from './constants';

import { ERROR_MESSAGE_INVALID_BODY } from '../constants';
import User from '../db-models/user';

export const themesRoutes = (router: Router) => {
	const themesRouter: Router = Router().put(THEME_ROUTE, async (req: Request, res: Response) => {
		try {
			const body = req.body;
			const { userId, theme } = body ?? {};

			if (!userId || !theme) {
				res.status(400);
				res.send(ERROR_MESSAGE_INVALID_BODY);
				return;
			}

			const user = await User.findByPk(`${userId}`);

			if (!user) {
				res.status(400);
				res.json('Пользователь не найден');
				return;
			}

			user.theme = theme;

			await user?.save();

			res.status(200);
			res.json('Тема приложения успешно изменена');
		} catch (err) {
			console.error(err);
		}
	});

	router.use('/', themesRouter);
};
