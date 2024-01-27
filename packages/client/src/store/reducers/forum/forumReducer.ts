import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse } from '@models/api/errorResponse';
import { TopicModel, Topics } from '@models/topics';

export type ForumState = {
	topics: Topics;
	currentTopic?: TopicModel;
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
		getTopic: (state: ForumState, action: PayloadAction<TopicModel>) => {
			state.currentTopic = action.payload;
		}
	}
});

export const { getTopic, getTopicsList } = forumSlice.actions;

export default forumSlice.reducer;
