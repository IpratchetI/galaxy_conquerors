export interface UserModel {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
}

export type UserLoginModel = Pick<UserModel, 'login' | 'password'>;
