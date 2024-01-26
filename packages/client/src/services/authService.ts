import { UserLoginModel, UserModel } from '@models/models/user';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseApi } from './baseApi';

class AuthService {
	private _controllerName = 'auth/';

	signIn(data: UserLoginModel) {
		return baseApi.post(this._controllerName + 'signin', data, {
			withCredentials: true
		});
	}

	signUp(user: UserLoginModel) {
		return baseApi.post(this._controllerName + 'signup', user, {
			withCredentials: true
		});
	}

	getUser() {
		return baseApi.get<UserModel>(this._controllerName + 'user', {
			withCredentials: true
		});
	}

	logout() {
		return baseApi.post(
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
