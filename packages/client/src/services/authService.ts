import { UserLoginModel, UserModel, UserRegistrationModel } from '@models/user';

import { yandexBaseApi } from './baseApi';

class AuthService {
	private _controllerName = 'auth/';

	signIn(data: UserLoginModel) {
		return yandexBaseApi.post(this._controllerName + 'signin', data, {
			withCredentials: true
		});
	}

	signUp(user: UserRegistrationModel) {
		return yandexBaseApi.post(this._controllerName + 'signup', user, {
			withCredentials: true
		});
	}

	getUser() {
		return yandexBaseApi.get<UserModel>(this._controllerName + 'user', {
			withCredentials: true
		});
	}

	logout() {
		return yandexBaseApi.post(
			this._controllerName + 'logout',
			{},
			{
				withCredentials: true
			}
		);
	}
}

const instance = new AuthService();
export { instance as AuthService };
