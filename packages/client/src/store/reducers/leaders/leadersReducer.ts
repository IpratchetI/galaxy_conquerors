import { LoadingMeta } from '@models/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse } from '@models/api/errorResponse';
import { LeaderboardData } from '@models/models/leaders';

import { getLeaders } from './leadersActionCreator';
import { leadersReducersFactory } from './leadersReducersFactory';

export type LeadersState = {
	leaders: LeaderboardData;
	error?: ErrorResponse;
	isLoading: LoadingMeta;
};

const initialState: LeadersState = {
	leaders: [],
	isLoading: LoadingMeta.Idle
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
