import { AxiosError } from 'axios';
import { PostgresUserModel, ProfileData, UserModel } from '@models/user';
import { baseApi, serverBaseApi } from '@services/baseApi';
import { AxiosPromise } from 'axios/index';
import { ThemeState } from '@models/theme';

import { THEME_ROUTE, USER_ROUTE } from './contants/routes';

class UserProfileService {
	private profilePath = 'user/profile';

	async getProfileData(): Promise<ProfileData> {
		try {
			const response = await baseApi.get(this.profilePath);
			return {
				first_name: response.data.first_name,
				second_name: response.data.second_name,
				email: response.data.email,
				phone: response.data.phone,
				login: response.data.login
			};
		} catch (error) {
			throw new Error(`Error fetching profile data: ${(error as AxiosError).message}`);
		}
	}

	async saveProfileData(data: ProfileData) {
		try {
			return baseApi.put<UserModel>(this.profilePath, data, {
				withCredentials: true
			});
		} catch (error) {
			throw new Error(`Error saving profile data: ${(error as AxiosError).message}`);
		}
	}

	async saveProfileDataToDataBase(userData: PostgresUserModel) {
		try {
			await serverBaseApi.post<UserModel>(USER_ROUTE, userData);
			return userData;
		} catch (error) {
			throw new Error(
				`Ошибка добавления пользователя в базу данных: ${(error as AxiosError).message}`
			);
		}
	}

	async getProfileDataFromDataBase(userId: PostgresUserModel['id']) {
		try {
			const response = await serverBaseApi.get<PostgresUserModel>(`${USER_ROUTE}?id=${userId}`);

			if (response.status === 200) {
				return response.data;
			}
		} catch (error) {
			throw new Error(`Не удалось найти пользователя в базе: ${(error as AxiosError).message}`);
		}
	}

	async setTheme(data: ThemeState): AxiosPromise {
		return serverBaseApi.put(`${THEME_ROUTE}`, data);
	}
}

export default new UserProfileService();
