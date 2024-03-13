import { Router } from 'express';

import CommentController from './controller';

export const commentsRouter = Router();

commentsRouter.get('/:topicId/:offset/:limit', CommentController.getComments);

commentsRouter.post('/', CommentController.createComment);

commentsRouter.put('/:commentId', CommentController.updateComment);

commentsRouter.delete('/:commentId', CommentController.deleteComment);
