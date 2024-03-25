import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionErrorResponse, ErrorResponse } from '@models/api/errorResponse';
import { TopicModel, Topics, ForumChildrenId } from '@models/topics';

import { CommentDto } from 'server/forum/comment/types';
import { getTopic } from '@/store/reducers/forum/forumActionCreator';

export type ForumState = {
	topics: Topics;
	currentTopicId?: ForumChildrenId;
	error?: ErrorResponse;
	topicError?: ErrorResponse;
	isLoading: boolean;
	currentTopic?: TopicModel;
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
		getCommentsList: (state: ForumState, action: PayloadAction<CommentDto[]>) => {
			if (state.currentTopic) {
				state.currentTopic.comments = action.payload.concat(state.currentTopic.comments ?? []);
				state.currentTopic.commentsCount += action.payload.length;
			}
		},
		addNewTopic: (state: ForumState, action: PayloadAction<TopicModel>) => {
			state.topics.push(action.payload);
		},
		addNewComment: (state: ForumState, action: PayloadAction<CommentDto>) => {
			const currentTopic = state.topics.find(topic => topic.id === state.currentTopicId!);

			if (currentTopic) {
				currentTopic.comments.push(action.payload);
				currentTopic.commentsCount++;
			}
		},
		// TODO: https://linear.app/galaxyconquerors/issue/GAL-60/dorabotki-po-api-foruma
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
	},
	extraReducers: builder => {
		builder.addCase(getTopic.pending, (state: ForumState) => {
			state.isLoading = true;
		});
		builder.addCase(getTopic.fulfilled, (state: ForumState, action: PayloadAction<TopicModel>) => {
			state.isLoading = false;
			state.error = undefined;

			if (action?.payload) {
				state.currentTopicId = action.payload?.id;
				state.currentTopic = action?.payload;
			}
		});
		builder.addCase(getTopic.rejected, (state: ForumState, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.error = action.payload as ActionErrorResponse;
		});
	}
});

export const { getCommentsList, getTopicsList, addNewTopic, addNewComment, updateComment } =
	forumSlice.actions;

export default forumSlice.reducer;
