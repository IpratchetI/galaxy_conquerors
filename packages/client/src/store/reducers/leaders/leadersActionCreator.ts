import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { LeadersService } from '@services/leadersService';
import { LeaderboardRequest, AddNewLeaderRequest } from '@models/api/leaders';

import { addNewLeaderService } from '@/services/addNewLeaderService';

import { DEFAULT_ERROR } from '@/store/constants/error';

export const getLeaders = createAsyncThunk(
	'leaders/getLeadersList',
	async (data: LeaderboardRequest, { rejectWithValue }) => {
		try {
			const { data: leaders } = await LeadersService.getLeaders(data);
			return leaders;
		} catch (e) {
			return rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);
export const addNewLeader = createAsyncThunk(
	'leaders/addNewLeader',
	async (data: AddNewLeaderRequest) => {
		const requestData = {
			data: data.data,
			ratingFieldName: data.ratingFieldName,
			teamName: data.teamName
		};
		const response: AxiosResponse<any> = await addNewLeaderService(requestData);
		return response.data;
	}
);
