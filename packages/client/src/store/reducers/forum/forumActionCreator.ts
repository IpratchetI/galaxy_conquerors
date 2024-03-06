import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ForumService } from '@services/forumService';

import { DEFAULT_ERROR } from '@/store/constants/error';

export const getTopicsList = createAsyncThunk(
	'forum/getTopicsList',
	async (_, { rejectWithValue }) => {
		try {
			return await ForumService.getTopicsList();
		} catch (e) {
			const response = rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
			return response;
		}
	}
);
