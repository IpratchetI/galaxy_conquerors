import { PostgresUserModel, UserLoginModel, UserModel, UserRegistrationModel } from '@models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse } from '@models/api/errorResponse';

import {
	getUser,
	logInUser,
	logOutUser,
	signUpUser,
	updateUser,
	updateUserAvatar
} from './userActionCreator';
import { userReducersFactory } from './userReducersFactory';

type UserScore = { maxScore: number; lastGameScore: number };

export type UserState = {
	isAuth: boolean;
	user?: UserModel | null;
	error?: ErrorResponse;
	isLoading: boolean;
	score: UserScore;
	userDataBase: PostgresUserModel | 'empty';
};

const authInitialValue = () => {
	if (typeof window !== 'undefined') {
		return JSON.parse(localStorage.getItem('isAuthorized') ?? 'false');
	}

	return false;
};

const initialState: UserState = {
	isAuth: authInitialValue(),
	isLoading: false,
	score: { maxScore: 0, lastGameScore: 0 },
	userDataBase: 'empty'
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		catchError: (state: UserState, action: PayloadAction<ErrorResponse | undefined>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		updateAuth: (state: UserState, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
		},
		updateScore: (state: UserState, action: PayloadAction<UserScore>) => {
			state.score = action.payload;
		},
		setUserFromPostgres: (state: UserState, action: PayloadAction<PostgresUserModel | 'empty'>) => {
			state.userDataBase = action.payload;
		}
	},
	extraReducers: builder => {
		userReducersFactory(builder, [updateUser]);
		userReducersFactory<UserModel, void>(builder, [getUser]);
		userReducersFactory<null, void>(builder, [logOutUser]);
		userReducersFactory<undefined, UserLoginModel>(builder, [logInUser]);
		userReducersFactory<undefined, UserRegistrationModel>(builder, [signUpUser]);
		userReducersFactory<UserModel, File>(builder, [updateUserAvatar]);
	}
});

export const { catchError, updateAuth, updateScore, setUserFromPostgres } = userSlice.actions;

export default userSlice.reducer;
