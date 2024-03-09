import { Router, type Request, type Response } from 'express';

import { USER_ROUTE } from './constants';

import { DEFAULT_APP_THEME, ERROR_MESSAGE_INVALID_BODY } from '../constants';
import User from '../db-models/user';

export const userRoutes = (router: Router) => {
	const userRouter: Router = Router()
		.get(USER_ROUTE, async (req: Request, res: Response) => {
			try {
				const { id } = req.query;

				if (!id) {
					res.status(400);
					res.json(ERROR_MESSAGE_INVALID_BODY);
					return;
				}

				const user = await User.findOne({
					where: { id }
				});

				if (!user) {
					res.status(404);
					res.json('Пользователь не найден');
					return;
				}

				res.status(200);
				res.json(user);
			} catch (err) {
				console.error(err);
				res.status(500).json('Внутренняя ошибка сервера');
			}
		})

		.post(USER_ROUTE, async (req: Request, res: Response) => {
			try {
				const body = req.body;
				const { id, first_name, theme } = body || {};

				if (!id || !first_name) {
					res.status(400).json(ERROR_MESSAGE_INVALID_BODY);
					return;
				}

				const [userFromDb, created] = await User.findOrCreate({
					where: { id },
					defaults: {
						...body,
						theme: theme || DEFAULT_APP_THEME
					}
				});

				if (!created) {
					// Если пользователь уже существует, обновляем его данные
					userFromDb.set(body);
					await userFromDb.save();
				}

				res.status(200).send('Данные о пользователе успешно изменены');
			} catch (err) {
				console.error(err);
				res.status(500).json('Внутренняя ошибка сервера');
			}
		});

	router.use('/', userRouter);
};
