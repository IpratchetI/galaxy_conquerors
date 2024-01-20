import { ProfileData } from '@models/ProfileData';

export const profileApiEndpoints = {
	avatar: 'https://ya-praktikum.tech/api/v2/user/profile/avatar',
	profileData: 'https://ya-praktikum.tech/api/v2/user/profile',
	saveProfile: 'https://ya-praktikum.tech/api/v2/user/profile'
} as const;

export type ProfileApiEndpoints = typeof profileApiEndpoints;
export type AvatarEndpoint = ProfileApiEndpoints['avatar'];
export type ProfileDataEndpoint = ProfileApiEndpoints['profileData'];
export type SaveProfileEndpoint = ProfileApiEndpoints['saveProfile'];

export const profileInputsConfig: Array<{ fieldName: keyof ProfileData; label: string }> = [
	{ fieldName: 'firstName', label: 'First Name' },
	{ fieldName: 'secondName', label: 'Second Name' },
	{ fieldName: 'email', label: 'Email' },
	{ fieldName: 'phone', label: 'Phone' },
	{ fieldName: 'login', label: 'Login' }
];

export const profileInputsDefaults: ProfileData = {
	firstName: '',
	secondName: '',
	email: '',
	phone: '',
	login: ''
};
