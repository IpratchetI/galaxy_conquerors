import { ActionReducerMapBuilder, AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { LoadingMeta } from '@models/common';
import { ActionErrorResponse } from '@models/api/errorResponse';
import { LeaderboardData } from '@models/models/leaders';
import { LeaderboardRequest } from '@models/api/leaders';

import { LeadersState } from '@/store/reducers/leaders/leadersReducer';

export function leadersReducersFactory<
	T extends LeaderboardData | undefined = undefined,
	K = LeaderboardRequest
>(builder: ActionReducerMapBuilder<LeadersState>, methods: AsyncThunk<T, K, AsyncThunkConfig>[]) {
	methods.forEach(method => {
		builder.addCase(method.pending, (state: LeadersState) => {
			state.isLoading = LoadingMeta.Loading;
		});
		builder.addCase(method.fulfilled, (state: LeadersState, action: PayloadAction<T>) => {
			state.isLoading = LoadingMeta.Loaded;
			state.error = undefined;

			if (action?.payload) {
				state.leaders = action.payload;
			}
		});
		builder.addCase(method.rejected, (state: LeadersState, action: PayloadAction<any>) => {
			state.isLoading = LoadingMeta.Error;
			state.error = action.payload as ActionErrorResponse;
		});
	});
}
