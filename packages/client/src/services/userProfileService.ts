import axios, { AxiosError } from 'axios';
import { ProfileUpdateData } from '@models/ProfileData';

import { ProfileApiEndpoints } from '@/pages/Profile/constants';

class UserProfileService {
	private baseUrl: ProfileApiEndpoints;

	constructor(baseUrl: ProfileApiEndpoints) {
		this.baseUrl = baseUrl;
	}

	async getAvatar(): Promise<string> {
		try {
			const response = await axios.get(this.baseUrl.avatar);
			return response.data.avatar;
		} catch (error) {
			throw new Error(`Error fetching avatar: ${(error as AxiosError).message}`);
		}
	}

	async getProfileData(): Promise<ProfileUpdateData> {
		try {
			const response = await axios.get(this.baseUrl.profileData);
			return {
				firstName: response.data.first_name,
				secondName: response.data.second_name,
				email: response.data.email,
				phone: response.data.phone,
				login: response.data.login
			};
		} catch (error) {
			throw new Error(`Error fetching profile data: ${(error as AxiosError).message}`);
		}
	}

	async saveProfileData(data: ProfileUpdateData): Promise<void> {
		try {
			await axios.put(this.baseUrl.saveProfile, {
				first_name: data.firstName,
				second_name: data.secondName,
				email: data.email,
				phone: data.phone,
				login: data.login
			});
		} catch (error) {
			throw new Error(`Error saving profile data: ${(error as AxiosError).message}`);
		}
	}
}

export default UserProfileService;
