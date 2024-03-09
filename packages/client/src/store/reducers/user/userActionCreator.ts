import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '@services/authService';
import { AxiosError } from 'axios';
import {
	PostgresUserModel,
	ProfileData,
	UserLoginModel,
	UserRegistrationModel
} from '@models/user';
import UserProfileService from '@services/userProfileService';
import AvatarService from '@services/avatarService';
import { Theme } from '@providers/ThemeProvider/constants';

import { DEFAULT_ERROR } from '@/store/constants/error';
import { setUserFromPostgres, updateAuth } from '@/store/reducers/user/userReducer';
import { userState } from '@/store/selectors';
import { RootState } from '@/store';

export const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
	try {
		const { data } = await AuthService.getUser();
		return data;
	} catch (e) {
		return rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
	}
});

export const logOutUser = createAsyncThunk(
	'user/logOutUser',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			await AuthService.logout();
			dispatch(updateAuth(false));
			return null;
		} catch (e) {
			return rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);

export const logInUser = createAsyncThunk(
	'user/logInUser',
	async (data: UserLoginModel, { rejectWithValue, dispatch }) => {
		try {
			await AuthService.signIn(data);
			dispatch(updateAuth(true));
			dispatch(getUser());
		} catch (e) {
			return rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);

export const signUpUser = createAsyncThunk(
	'user/signUpUser',
	async (data: UserRegistrationModel, { rejectWithValue, dispatch }) => {
		try {
			await AuthService.signUp(data);
			dispatch(updateAuth(true));
			dispatch(getUser());
		} catch (e) {
			return rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);

export const updateUser = createAsyncThunk(
	'user/putUser',
	async (data: ProfileData, { rejectWithValue }) => {
		try {
			const { data: updatedUserData } = await UserProfileService.saveProfileData(data);
			return updatedUserData;
		} catch (e) {
			return rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);

export const updateUserAvatar = createAsyncThunk(
	'user/putUserAvatar',
	async (data: File, { rejectWithValue }) => {
		try {
			const { data: updatedUserData } = await AvatarService.uploadAvatar(data);
			return updatedUserData;
		} catch (e) {
			return rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);

export const postUserToDataBase = createAsyncThunk(
	'user/postUserToDataBase',
	async (userData: PostgresUserModel, { rejectWithValue }) => {
		try {
			await UserProfileService.saveProfileDataToDataBase(userData);
		} catch (e) {
			return rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);

export const getUserFromDataBase = createAsyncThunk(
	'user/getUserFromDataBase',
	async (userId: PostgresUserModel['id'], { rejectWithValue, dispatch }) => {
		try {
			const response = await UserProfileService.getProfileDataFromDataBase(userId);

			if (response) {
				dispatch(setUserFromPostgres(response));
			}
		} catch (e) {
			dispatch(setUserFromPostgres('empty'));
			return rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);

export const setUserTheme = createAsyncThunk(
	'theme/setUserTheme',
	async (theme: Theme, { getState, rejectWithValue }) => {
		const state = getState();
		const userInfo = userState(state as RootState);

		if (userInfo.user?.id) {
			const id = userInfo.user?.id;

			const request = {
				theme,
				userId: id
			};

			try {
				await UserProfileService.setTheme(request);
			} catch (error) {
				if (error instanceof Error) {
					const axiosError = error as AxiosError;
					return rejectWithValue(axiosError.response?.data ?? DEFAULT_ERROR);
				} else {
					return rejectWithValue(DEFAULT_ERROR);
				}
			}
		}
	}
);
