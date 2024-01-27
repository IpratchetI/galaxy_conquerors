export interface UserModel {
	id: number;
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	phone: string;
	avatar?: string;
}

export type UserLoginModel = {
	password: string;
} & Pick<UserModel, 'login'>;

export type UserRegistrationModel = {
	password: string;
} & Omit<UserModel, 'avatar' | 'id'>;

export type ProfileData = Omit<UserModel, 'id' | 'avatar'>;
