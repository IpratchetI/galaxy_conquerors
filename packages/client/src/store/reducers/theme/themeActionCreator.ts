import { ThemeDataApiModel } from '@models/theme';
import ThemeService from '@services/themeService';
import { createAsyncThunk, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from '@/store';
import { handleError } from '@/utils/handleError';
import { DEFAULT_ERROR } from '@/store/constants/error';

import { userState } from '../../selectors';

// export const getUserTheme = (userId: number | undefined): ThunkAction<void, RootState, unknown, UnknownAction> => {
// 	return async (dispatch) => {
// 		try {
// 			const { data } = await ThemeService.getTheme(userId);
// 			dispatch(setThemes(data));
// 		} catch (err) {
// 			handleError(err);
// 		}
// 	};
// };

export const getUserTheme = createAsyncThunk(
	'theme/getUserTheme',
	async (userId: number, { rejectWithValue }) => {
		try {
			const { data } = await ThemeService.getTheme(userId);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				const axiosError = error as AxiosError;
				return rejectWithValue(axiosError.response?.data ?? DEFAULT_ERROR);
			} else {
				return rejectWithValue(DEFAULT_ERROR);
			}
		}
	}
);

// export const getUserTheme = (userId: number | undefined): ThunkAction<void, RootState, unknown, UnknownAction> => {
// 	return async (dispatch) => {
// 		try {
// 			const { data } = await ThemeService.getTheme(userId);
// 			dispatch(setThemes(data));
// 		} catch (err) {
// 			handleError(err);
// 		}
// 	};
// };

export const setUserTheme =
	(data: Omit<ThemeDataApiModel, 'user'>): ThunkAction<void, RootState, unknown, UnknownAction> =>
	async (dispatch, getState) => {
		const state = getState();
		const userInfo = userState(state);

		if (userInfo.user?.id) {
			const id = userInfo.user?.id;

			const request = {
				...data,
				user: {
					id
				}
			};

			try {
				await ThemeService.setTheme(request);
				dispatch(getUserTheme(id));
			} catch (err) {
				handleError(err);
			}
		} else {
			console.error('No Logged-in user');
		}
	};
