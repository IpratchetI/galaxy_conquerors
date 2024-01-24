import axios, { AxiosError } from 'axios';
import { ProfileData } from '@models/ProfileData';

import { ProfileApiEndpoints } from '@/pages/Profile/types';

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

	async getProfileData(): Promise<ProfileData> {
		try {
			const response = await axios.get(this.baseUrl.profileData);
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

	async saveProfileData(data: ProfileData): Promise<void> {
		try {
			await axios.put(this.baseUrl.saveProfile, {
				first_name: data.first_name,
				second_name: data.second_name,
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
