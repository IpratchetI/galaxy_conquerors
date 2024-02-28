import { UserRegistrationModel } from '@models/user';

import { FormField } from '@/types/forms';
import {
	EMAIL_PATTERN,
	LOGIN_PATTERN,
	NAME_PATTERN,
	PASSWORD_PATTERN,
	PHONE_PATTERN
} from '@/constants/forms';

export const regInputsConfig: FormField<UserRegistrationModel>[] = [
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
			fieldName: 'login',
			label: 'login',
			type: 'text'
		},
		validateOptions: { required: true, pattern: LOGIN_PATTERN }
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
			fieldName: 'password',
			label: 'password',
			type: 'password'
		},
		validateOptions: { required: true, pattern: PASSWORD_PATTERN }
	},
	{
		data: {
			fieldName: 'phone',
			label: 'phone',
			type: 'tel'
		},
		validateOptions: { required: true, pattern: PHONE_PATTERN }
	}
];

export const regInputsDefaults: UserRegistrationModel = {
	first_name: '',
	second_name: '',
	login: '',
	email: '',
	password: '',
	phone: ''
};
