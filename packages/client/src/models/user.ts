import { Theme } from '@providers/ThemeProvider/constants';

export interface UserModel {
	id: number;
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	phone: string;
	avatar?: string;
	theme?: Theme;
}

export type UserLoginModel = {
	password: string;
} & Pick<UserModel, 'login'>;

export type UserRegistrationModel = {
	password: string;
} & Omit<UserModel, 'avatar' | 'id'>;

export type ProfileData = Omit<UserModel, 'id' | 'avatar'>;

export type PostgresUserModel = {
	id: number;
	first_name: string;
	theme: Theme;
};
