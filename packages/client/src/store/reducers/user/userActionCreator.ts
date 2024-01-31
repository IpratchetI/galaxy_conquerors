import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '@services/authService';
import { AxiosError } from 'axios';
import { ProfileData, UserLoginModel, UserRegistrationModel } from '@models/user';
import UserProfileService from '@services/userProfileService';
import AvatarService from '@services/avatarService';

import { DEFAULT_ERROR } from '@/store/constants/error';
import { updateAuth } from '@/store/reducers/user/userReducer';

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
