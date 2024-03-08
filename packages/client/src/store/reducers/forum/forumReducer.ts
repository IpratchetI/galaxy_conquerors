import { CommentModel, IMessage, TopicId } from './../../../models/topics';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse } from '@models/api/errorResponse';
import { TopicModel, Topics } from '@models/topics';
import { UserModel } from '@models/user';

export type ForumState = {
	topics: Topics;
	currentTopicId?: TopicId;
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
		getTopic: (state: ForumState, action: PayloadAction<TopicId>) => {
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
		}
	}
});

export const { getTopic, getTopicsList, addNewTopic, addNewMessage, addNewComment } =
	forumSlice.actions;

export default forumSlice.reducer;
