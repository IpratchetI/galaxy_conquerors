import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { LeadersService } from '@services/leadersService';
import { LeaderboardRequest } from '@models/api/leaders';

export const getLeaders = createAsyncThunk(
	'leaders/getLeadersList',
	async (data: LeaderboardRequest, thunkAPI) => {
		try {
			const { data: leaders } = await LeadersService.getLeaders(data);
			return leaders;
		} catch (e) {
			return thunkAPI.rejectWithValue(
				(e as AxiosError).response?.data ?? 'Что-то пошло не так, попробуйте еще раз!'
			);
		}
	}
);
