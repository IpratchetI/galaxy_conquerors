import { UserModel } from '@models/user';
import { ActionReducerMapBuilder, AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { ActionErrorResponse } from '@models/api/errorResponse';

import { UserState } from '@/store/reducers/user/userReducer';

export function userReducersFactory<
	T extends UserState['user'] | undefined = undefined,
	K = UserModel
>(builder: ActionReducerMapBuilder<UserState>, methods: AsyncThunk<T, K, AsyncThunkConfig>[]) {
	methods.forEach(method => {
		builder.addCase(method.pending, (state: UserState) => {
			state.isLoading = true;
		});
		builder.addCase(method.fulfilled, (state: UserState, action: PayloadAction<T>) => {
			state.isLoading = false;
			state.error = undefined;

			if (action?.payload !== undefined) {
				state.user = action.payload;
			}
		});
		builder.addCase(method.rejected, (state: UserState, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.error = action.payload as ActionErrorResponse;
		});
	});
}
