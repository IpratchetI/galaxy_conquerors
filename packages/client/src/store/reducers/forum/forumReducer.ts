import { LoadingMeta } from '@models/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse } from '@models/api/errorResponse';
import { TopicModel, Topics } from '@models/models/topics';
import { TOPICS_LIST } from '@pages/Forum/lib/mocks';

export type ForumState = {
	topics: Topics;
	currentTopic?: TopicModel;
	error?: ErrorResponse;
	topicError?: ErrorResponse;
	isLoading: LoadingMeta;
};

const initialState: ForumState = {
	topics: TOPICS_LIST,
	isLoading: LoadingMeta.Idle
};

const forumSlice = createSlice({
	name: 'forum',
	initialState,
	reducers: {
		selectTopic: (state: ForumState, action: PayloadAction<TopicModel>) => {
			state.currentTopic = action.payload;
		}
	}
});

export const { selectTopic } = forumSlice.actions;

export default forumSlice.reducer;
