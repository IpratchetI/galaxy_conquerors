import { UserModel } from '@models/models/user';
import { LoadingMeta } from '@models/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse } from '@models/api/errorResponse';

import { getUser, logOutUser, updateUser, updateUserAvatar } from './userActionCreator';
import { userReducersFactory } from './userReducersFactory';

export type UserState = {
	isAuth?: boolean;
	user?: UserModel | null;
	error?: ErrorResponse;
	isLoading: LoadingMeta;
};

const initialState: UserState = {
	isLoading: LoadingMeta.Idle
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		catchError: (state: UserState, action: PayloadAction<ErrorResponse | undefined>) => {
			state.isLoading = LoadingMeta.Loaded;
			state.error = action.payload;
		}
	},
	extraReducers: builder => {
		userReducersFactory(builder, [updateUser]);
		userReducersFactory<UserModel, void>(builder, [getUser]);
		userReducersFactory<null, void>(builder, [logOutUser]);
		userReducersFactory<UserModel, File>(builder, [updateUserAvatar]);
	}
});

export const { catchError } = userSlice.actions;

export default userSlice.reducer;
