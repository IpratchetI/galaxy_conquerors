import { UserLoginModel, UserModel } from '@models/models/user';
import { LoadingMeta } from '@models/common';
import { createSlice } from '@reduxjs/toolkit';
import { ErrorResponse } from '@models/api/errorResponse';

import { authUser, getUser, updateUser, updateUserAvatar } from './userActionCreator';
import { userReducersFactory } from './userReducersFactory';

export type UserState = {
	user?: UserModel;
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
		deleteUser: (state: UserState) => {
			state.user = undefined;
			state.isLoading = LoadingMeta.Idle;
		}
	},
	extraReducers: builder => {
		userReducersFactory(builder, [updateUser]);
		userReducersFactory<UserModel, void>(builder, [getUser]);
		userReducersFactory<undefined, UserLoginModel>(builder, [authUser]);
		userReducersFactory<UserModel, File>(builder, [updateUserAvatar]);
	}
});

export const { deleteUser } = userSlice.actions;

export default userSlice.reducer;
