import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse } from '@models/api/errorResponse';
import { TopicModel, Topics, ForumChildrenId } from '@models/topics';

import { CommentDto } from 'server/forum/comment/types';

export type ForumState = {
	topics: Topics;
	currentTopicId?: ForumChildrenId;
	error?: ErrorResponse;
	topicError?: ErrorResponse;
	isLoading: boolean;
};

const initialState: ForumState = {
	topics: [],
	isLoading: false
};

const forumSlice = createSlice({
	name: 'forum',
	initialState,
	reducers: {
		getTopicsList: (state: ForumState, action: PayloadAction<Topics>) => {
			state.topics = action.payload;
		},
		getCommentsList: (state: ForumState, action: PayloadAction<ForumChildrenId>) => {
			state.currentTopicId = action.payload;
		},
		addNewTopic: (state: ForumState, action: PayloadAction<TopicModel>) => {
			state.topics.push(action.payload);
		},
		addNewComment: (state: ForumState, action: PayloadAction<CommentDto>) => {
			const currentTopic = state.topics.find(topic => topic.id === state.currentTopicId!);

			if (currentTopic) {
				currentTopic.comments.push(action.payload);
				currentTopic.length++;
			}
		},
		updateComment: (
			state: ForumState,
			action: PayloadAction<{ messageId: number; reaction: string }>
		) => {
			const currentTopic = state.topics.find(topic => topic.id === state.currentTopicId);

			if (!currentTopic) return;

			const reactedComment = currentTopic.comments.find(
				comment => comment.id === action.payload.messageId
			);

			// if (reactedComment && reactedComment.reactions) {
			// 	reactedComment.reactions[action.payload.reaction] =
			// 		(reactedComment.reactions[action.payload.reaction] || 0) + 1;
			// }
		}
	}
});

export const { getCommentsList, getTopicsList, addNewTopic, addNewComment, updateComment } =
	forumSlice.actions;

export default forumSlice.reducer;
