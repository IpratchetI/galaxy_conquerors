import { oAuthSignInRequest } from '@models/oauth';

import { baseApi } from './baseApi';

class oAuthService {
	private _controllerName = 'oauth/';

	getServiceId(redirecrUri: string) {
		return baseApi
			.get<{ service_id: string }>(
				this._controllerName + `yandex/service-id?redirect_uri=${encodeURIComponent(redirecrUri)}`,
				{ withCredentials: true }
			)
			.then(({ data }) => data);
	}

	signIn(data: oAuthSignInRequest) {
		return baseApi.post(this._controllerName + 'yandex', data, { withCredentials: true });
	}
}

const instance = new oAuthService();
export { instance as oAuthService };
