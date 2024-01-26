import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '@services/authService';
import { AxiosError } from 'axios';
import { UserLoginModel, UserProfileModel } from '@models/models/user';
import UserProfileService from '@services/userProfileService';
import AvatarService from '@services/avatarService';

export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
	try {
		const { data } = await AuthService.getUser();
		return data;
	} catch (e) {
		return thunkAPI.rejectWithValue(
			(e as AxiosError).response?.data ?? 'Что-то пошло не так, попробуйте еще раз!'
		);
	}
});

export const authUser = createAsyncThunk(
	'user/authUser',
	async (data: UserLoginModel, thunkAPI) => {
		try {
			await AuthService.signIn(data);
		} catch (e) {
			return thunkAPI.rejectWithValue(
				(e as AxiosError).response?.data ?? 'Что-то пошло не так, попробуйте еще раз!'
			);
		}
	}
);

export const updateUser = createAsyncThunk(
	'user/putUser',
	async (data: UserProfileModel, thunkAPI) => {
		try {
			const { data: updatedUserData } = await UserProfileService.saveProfileData(data);
			return updatedUserData;
		} catch (e) {
			return thunkAPI.rejectWithValue(
				(e as AxiosError).response?.data ?? 'Что-то пошло не так, попробуйте еще раз!'
			);
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
			return thunkAPI.rejectWithValue(
				(e as AxiosError).response?.data ?? 'Что-то пошло не так, попробуйте еще раз!'
			);
		}
	}
);
