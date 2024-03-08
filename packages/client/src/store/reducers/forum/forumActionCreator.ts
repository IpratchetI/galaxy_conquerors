import { AddMessage, AddComment, AddReaction } from './../../../services/forumService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { ForumService } from '@services/forumService';

import { DEFAULT_ERROR } from '@/store/constants/error';
import { TopicModel } from '@models/topics';

export const getTopicsList = createAsyncThunk(
	'forum/getTopicsList',
	async (_, { rejectWithValue }) => {
		try {
			return await ForumService.getTopicsList();
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

export const addNewMessage = createAsyncThunk(
	'forum/addNewMessage',
	async (data: AddMessage, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<any> = await ForumService.addMessage(data);
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
	async (data: AddComment, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<any> = await ForumService.addComment(data);
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
export const addNewReaction = createAsyncThunk(
	'forum/addNewReaction',
	async (data: AddReaction, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<any> = await ForumService.addReaction(data);
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
