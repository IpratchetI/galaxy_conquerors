import axios, { AxiosError } from 'axios';
import { UserModel } from '@models/user';

import { baseApi } from './baseApi';

class AvatarService {
	async uploadAvatar(file: File) {
		try {
			const formData = new FormData();
			formData.append('avatar', file);

			return baseApi.put<UserModel>('user/profile/avatar', formData, {
				withCredentials: true,
				headers: {
					// todo: добавить токен
					'Content-Type': 'multipart/form-data'
				}
			});
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
				throw new Error(`Error during file upload: ${axiosError.message}`);
			} else {
				throw new Error('Unexpected error during file upload');
			}
		}
	}
}

export default new AvatarService();
