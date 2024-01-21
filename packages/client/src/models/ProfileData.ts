export interface ProfileData {
	first_name: string;
	second_name: string;
	email: string;
	phone: string;
	login: string;
}

export type ProfileResponse = ProfileData;
export type ProfileUpdateData = ProfileData;
