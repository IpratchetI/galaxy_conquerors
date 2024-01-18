import { UserModel } from '@models/User';

export const regInputsConfig: Array<{ fieldName: keyof UserModel; label: string }> = [
	{ fieldName: 'first_name', label: 'first name' },
	{ fieldName: 'second_name', label: 'second name' },
	{ fieldName: 'login', label: 'login' },
	{ fieldName: 'email', label: 'email' },
	{ fieldName: 'password', label: 'password' },
	{ fieldName: 'phone', label: 'phone' }
];

export const regInputsDefaults: UserModel = {
	first_name: '',
	second_name: '',
	login: '',
	email: '',
	password: '',
	phone: ''
};
