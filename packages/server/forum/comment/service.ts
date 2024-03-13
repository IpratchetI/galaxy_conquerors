import { Comment } from './model';

import type { CommentCreateRequest, CommentsRequest, CommentUpdateRequest } from './types';

import { Topic } from '../topic/model';
import { EMPTY_RESULTS_ERROR } from '../constants/messages';

class CommentService {
	public async getComments({ data }: { data: CommentsRequest }): Promise<Comment[]> {
		return await Comment.findAll({
			where: { topicId: data.topicId },
			offset: data.offset,
			limit: data.limit
		});
	}

	public async createComment(data: CommentCreateRequest): Promise<Comment> {
		const topic = await Topic.findByPk(data?.topicId);

		if (!topic) {
			throw new Error(EMPTY_RESULTS_ERROR);
		}

		return await Comment.create(data);
	}

	public async updateComment({
		data,
		commentId
	}: {
		data: CommentUpdateRequest;
		commentId: number;
	}): Promise<void> {
		const comment = await Comment.update(
			// @ts-ignore
			data,
			{ where: { id: commentId } }
		);
		if (!comment) {
			throw new Error(EMPTY_RESULTS_ERROR);
		}
		if (comment[0] < 1) {
			throw new Error('Неверный запрос');
		}
	}

	public async deleteComment(commentId: number): Promise<void> {
		const comment = await Comment.destroy({ where: { id: commentId } });
		if (!comment) {
			throw new Error(EMPTY_RESULTS_ERROR);
		}
	}
}

export default new CommentService();
