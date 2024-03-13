import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { ForumService, GetComments } from '@services/forumService';
import { TopicModel, TopicsPagination } from '@models/topics';

import { DEFAULT_ERROR } from '@/store/constants/error';

import { AddComment } from '@services/forumService';

export const getTopicsList = createAsyncThunk(
	'forum/getTopicsList',
	async (data: TopicsPagination, { rejectWithValue }) => {
		try {
			return await ForumService.getTopicsList(data);
		} catch (e) {
			return rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);

export const getCommentsList = createAsyncThunk(
	'forum/getCommentsList',
	async (data: GetComments, { rejectWithValue }) => {
		try {
			return await ForumService.getTopicsList(data);
		} catch (e) {
			return rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);

export const addNewTopic = createAsyncThunk(
	'forum/addNewTopic',
	async (data: TopicModel, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<any> = await ForumService.addTopic(data);
			return response.data;
		} catch (error) {
			if (error instanceof Error) {
				const axiosError = error as AxiosError;
				return rejectWithValue(axiosError.response?.data ?? DEFAULT_ERROR);
			} else {
				return rejectWithValue(DEFAULT_ERROR);
			}
		}
	}
);

export const addNewComment = createAsyncThunk(
	'forum/addNewComment',
	async (data: AddComment, { rejectWithValue, dispatch }) => {
		try {
			const response: AxiosResponse<any> = await ForumService.addComment(data);
			dispatch(addNewComment(response.data));
		} catch (error) {
			if (error instanceof Error) {
				const axiosError = error as AxiosError;
				return rejectWithValue(axiosError.response?.data ?? DEFAULT_ERROR);
			} else {
				return rejectWithValue(DEFAULT_ERROR);
			}
		}
	}
);
