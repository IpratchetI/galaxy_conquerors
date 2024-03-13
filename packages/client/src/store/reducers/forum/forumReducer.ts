import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { ErrorResponse } from '@models/api/errorResponse';
import { TopicModel, Topics } from '@models/topics';
import { UserModel } from '@models/user';

import { CommentModel, IMessage, ForumChildrenId } from './../../../models/topics';

export type ForumState = {
	topics: Topics;
	currentTopicId?: ForumChildrenId;
	error?: ErrorResponse;
	topicError?: ErrorResponse;
	isLoading: boolean;
};

export type NewComment = {
	comment: CommentModel;
	user: Pick<UserModel, 'first_name' | 'id'>;
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
		getTopic: (state: ForumState, action: PayloadAction<ForumChildrenId>) => {
			state.currentTopicId = action.payload;
		},
		addNewTopic: (state: ForumState, action: PayloadAction<TopicModel>) => {
			state.topics.push(action.payload);
		},
		addNewMessage: (state: ForumState, action: PayloadAction<IMessage>) => {
			const currentTopic = state.topics.find(topic => topic.id === state.currentTopicId!)!;
			currentTopic.comments.at(-1)?.messages.push(action.payload);
		},
		addNewComment: (state: ForumState, action: PayloadAction<NewComment>) => {
			const currentTopic = state.topics.find(topic => topic.id === state.currentTopicId!)!;
			currentTopic.comments.push(action.payload.comment);
			currentTopic.users[action.payload.user.id] = action.payload.user.first_name;
			currentTopic.length++;
		},
		updateComment: (
			state: ForumState,
			action: PayloadAction<{ messageId: number; reaction: string }>
		) => {
			const currentTopic = state.topics.find(topic => topic.id === state.currentTopicId)!;

			let message;
			for (let i = 0; i < currentTopic.comments.length; i++) {
				for (let j = 0; j < currentTopic.comments[i].messages.length; j++) {
					if (currentTopic.comments[i].messages[j].id === action.payload.messageId) {
						message = currentTopic.comments[i].messages[j];
						break;
					}
				}
			}

			if (message && message.reactions) {
				message.reactions[action.payload.reaction] =
					(message.reactions[action.payload.reaction] || 0) + 1;
			}
		}
	}
});

export const { getTopic, getTopicsList, addNewTopic, addNewMessage, addNewComment, updateComment } =
	forumSlice.actions;

export default forumSlice.reducer;
