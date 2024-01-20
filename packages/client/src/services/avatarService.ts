import axios, { AxiosError } from 'axios';

class AvatarService {
	async uploadAvatar(file: File): Promise<void> {
		try {
			const formData = new FormData();
			formData.append('avatar', file);

			await axios.put('https://ya-praktikum.tech/api/v2/user/profile/avatar', formData, {
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

export default AvatarService;
