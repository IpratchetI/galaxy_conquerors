import { UserLoginModel } from '@models/User';

type loginInputsConfigType = Array<{ fieldName: keyof UserLoginModel; label: string }>;

export const loginInputsConfig: loginInputsConfigType = [
	{ fieldName: 'login', label: 'login' },
	{ fieldName: 'password', label: 'password' }
];

export const loginInputsDefaults: UserLoginModel = {
	login: '',
	password: ''
};
