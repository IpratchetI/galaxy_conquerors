import { createSlice } from '@reduxjs/toolkit';
import { ErrorResponse } from '@models/api/errorResponse';
import { LeaderboardData } from '@models/leaders';

import { getLeaders } from './leadersActionCreator';
import { leadersReducersFactory } from './leadersReducersFactory';

export type LeadersState = {
	leaders: LeaderboardData;
	error?: ErrorResponse;
	isLoading: boolean;
};

const initialState: LeadersState = {
	leaders: [],
	isLoading: false
};

const leadersSlice = createSlice({
	name: 'leaders',
	initialState,
	reducers: {},
	extraReducers: builder => {
		leadersReducersFactory(builder, [getLeaders]);
	}
});

export default leadersSlice.reducer;
