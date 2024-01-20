import { UserModel } from '@models/User';
import { FormField } from '@pages/Registration/types';

const NAME_PATTERN = /^[А-ЯЁA-Z][а-яёa-z-]{1,}$/;
const LOGIN_PATTERN = /^[A-Za-z0-9_-]{3,20}$/;
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/;
const PHONE_PATTERN = /^\+?\d{10,15}$/;

export const regInputsConfig: FormField[] = [
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

export const regInputsDefaults: UserModel = {
	first_name: '',
	second_name: '',
	login: '',
	email: '',
	password: '',
	phone: ''
};
