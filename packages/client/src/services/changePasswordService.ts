import axios, { AxiosError } from 'axios';

class ChangePasswordService {
	async changePassword(oldPassword: string, newPassword: string): Promise<void> {
		try {
			const formData = new FormData();
			formData.append('oldPassword', oldPassword);
			formData.append('newPassword', newPassword);

			await axios.put(
				'https://ya-praktikum.tech/api/v2/swagger/#/Users/put_user_password',
				formData,
				{
					headers: {
						// Authorization: `Bearer ${ACCESS_TOKEN}`, // todo: добавить токен
						'Content-Type': 'multipart/form-data'
					}
				}
			);
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
