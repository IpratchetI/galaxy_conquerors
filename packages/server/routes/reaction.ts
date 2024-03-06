import { REACTION_ROUTE } from './constants';

import type { Router, Request, Response } from 'express';

import { Reaction } from '../db-models/reaction';

export const reactionRoutes = (router: Router) => {
	router.post(REACTION_ROUTE + '/add', async (req: Request, res: Response) => {
		try {
			const body = req.body;
			const { reaction, commentId } = body ?? {};

			if (!reaction) {
				res.status(400);
				res.send('Bad request');
				return;
			}

			await Reaction.create({
				comment_id: commentId,
				reaction
			});

			//TODO возвращать реакции сообщения и обновлять ими стейт
			// const response = await Reaction.findAll({
			// 	attributes: ['reaction'],
			// 	where: {
			// 		comment_id: commentId
			// 	},
			// 	group: 'reaction'
			// });

			const response = 'OK';

			res.status(200);
			res.json(response);
		} catch (err) {
			console.error(err);
		}
	});
	return router;
};
