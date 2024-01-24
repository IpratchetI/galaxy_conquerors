import { ProfileData } from '@models/ProfileData';

import { FormField } from '@/types/forms';
import { LOGIN_PATTERN, EMAIL_PATTERN, NAME_PATTERN, PHONE_PATTERN } from '@/constants/forms';

export const profileApiEndpoints = {
	avatar: 'https://ya-praktikum.tech/api/v2/user/profile/avatar',
	profileData: 'https://ya-praktikum.tech/api/v2/user/profile',
	saveProfile: 'https://ya-praktikum.tech/api/v2/user/profile'
} as const;

export const profileInputsConfig: FormField<ProfileData>[] = [
	{
		data: {
			fieldName: 'first_name',
			label: 'first name',
			type: 'text'
		},
		validateOptions: { required: true, pattern: NAME_PATTERN }
	},
	{
		data: {
			fieldName: 'second_name',
			label: 'second name',
			type: 'text'
		},
		validateOptions: { required: true, pattern: NAME_PATTERN }
	},
	{
		data: {
			fieldName: 'email',
			label: 'email',
			type: 'email'
		},
		validateOptions: { required: true, pattern: EMAIL_PATTERN }
	},
	{
		data: {
			fieldName: 'phone',
			label: 'phone',
			type: 'tel'
		},
		validateOptions: { required: true, pattern: PHONE_PATTERN }
	},
	{
		data: {
			fieldName: 'login',
			label: 'login',
			type: 'tel'
		},
		validateOptions: { required: true, pattern: LOGIN_PATTERN }
	}
];

export const profileInputsDefaults: ProfileData = {
	first_name: '',
	second_name: '',
	email: '',
	phone: '',
	login: ''
};
