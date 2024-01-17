import { UserLoginModel } from '@models/UserLoginModel';

export const loginInputsConfig: Array<{ fieldName: keyof UserLoginModel; label: string }> = [
	{ fieldName: 'login', label: 'login' },
	{ fieldName: 'password', label: 'password' }
];

export const loginInputsDefaults: UserLoginModel = {
	login: '',
	password: ''
};
