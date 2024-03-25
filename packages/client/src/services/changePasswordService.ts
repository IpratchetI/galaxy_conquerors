import axios, { AxiosError } from 'axios';

import { yandexBaseApi } from './baseApi';

class ChangePasswordService {
	async changePassword(oldPassword: string, newPassword: string): Promise<void> {
		try {
			const formData = new FormData();
			formData.append('oldPassword', oldPassword);
			formData.append('newPassword', newPassword);

			await yandexBaseApi.put('user/password', formData, {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
				throw new Error(`Error changing password: ${axiosError.message}`);
			} else {
				throw new Error('Unexpected error changing password');
			}
		}
	}
}

export default ChangePasswordService;
