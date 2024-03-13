import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { ForumService, GetComments } from '@services/forumService';
import { NewTopicModel, TopicsPagination } from '@/models/topics';
import {
	addNewTopic as newTopicAction,
	addNewComment as newCommentAction,
	getTopicsList as topicsListAction,
	getCommentsList as commentsListAction
} from './forumReducer';

import { DEFAULT_ERROR } from '@/store/constants/error';

import { AddComment } from '@services/forumService';

export const getTopicsList = createAsyncThunk(
	'forum/getTopicsList',
	async (data: TopicsPagination, { rejectWithValue, dispatch }) => {
		try {
			const response = await ForumService.getTopicsList(data);
			dispatch(topicsListAction(response.data));
		} catch (e) {
			return rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);

export const getTopic = createAsyncThunk(
	'forum/getTopic',
	async (topicId: number, { rejectWithValue }) => {
		try {
			const { data: topic } = await ForumService.getTopic(topicId);

			return topic;
		} catch (e) {
			return rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);

export const getCommentsList = createAsyncThunk(
	'forum/getCommentsList',
	async (data: GetComments, { rejectWithValue, dispatch }) => {
		try {
			const response = await ForumService.getCommentsList(data);
			dispatch(commentsListAction(response.data));
		} catch (e) {
			return rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);

export const addNewTopic = createAsyncThunk(
	'forum/addNewTopic',
	async (data: NewTopicModel, { rejectWithValue, dispatch }) => {
		try {
			const response: AxiosResponse<any> = await ForumService.addTopic(data);
			dispatch(newTopicAction(response.data));
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
			dispatch(newCommentAction(response.data));
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
