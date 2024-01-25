import { UserLoginModel, UserModel } from '@models/User';
import { BaseApiService } from '@services/BaseApiService';
import axios from 'axios';

class AuthService extends BaseApiService {
	private _controllerName = 'auth/';

	signIn(data: UserLoginModel) {
		return axios.post(this.restUrl('signin', this._controllerName), data, {
			withCredentials: true
		});
	}

	signUp(user: UserModel) {
		return axios.post(this.restUrl('signup', this._controllerName), user, {
			withCredentials: true
		});
	}

	logout() {
		return axios.post(
			this.restUrl('logout', this._controllerName),
			{},
			{
				withCredentials: true
			}
		);
	}
}

const instance = new AuthService();
export { instance as AuthService };
