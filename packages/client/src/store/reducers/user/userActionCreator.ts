import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '@services/authService';
import { AxiosError } from 'axios';
import { UserProfileModel } from '@models/models/user';
import UserProfileService from '@services/userProfileService';
import AvatarService from '@services/avatarService';

import { DEFAULT_ERROR } from '@/store/constants/error';

export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
	try {
		const { data } = await AuthService.getUser();
		return data;
	} catch (e) {
		return thunkAPI.rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
	}
});

export const logOutUser = createAsyncThunk('user/logOutUser', async (_, thunkAPI) => {
	try {
		await AuthService.logout();
		return null;
	} catch (e) {
		return thunkAPI.rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
	}
});

export const updateUser = createAsyncThunk(
	'user/putUser',
	async (data: UserProfileModel, thunkAPI) => {
		try {
			const { data: updatedUserData } = await UserProfileService.saveProfileData(data);
			return updatedUserData;
		} catch (e) {
			return thunkAPI.rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);

export const updateUserAvatar = createAsyncThunk(
	'user/putUserAvatar',
	async (data: File, thunkAPI) => {
		try {
			const { data: updatedUserData } = await AvatarService.uploadAvatar(data);
			return updatedUserData;
		} catch (e) {
			return thunkAPI.rejectWithValue((e as AxiosError).response?.data ?? DEFAULT_ERROR);
		}
	}
);
