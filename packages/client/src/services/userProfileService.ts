import { AxiosError } from 'axios';
import { ProfileData, UserModel } from '@models/user';
import { baseApi } from '@services/baseApi';

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
}

export default new UserProfileService();
