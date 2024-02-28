import { OAuthSignInRequest } from '@models/oauth';

import { baseApi } from './baseApi';

class OAuthService {
	private _controllerName = 'oauth/';

	getServiceId(redirecrUri: string) {
		return baseApi
			.get<{ service_id: string }>(
				this._controllerName + `yandex/service-id?redirect_uri=${encodeURIComponent(redirecrUri)}`,
				{ withCredentials: true }
			)
			.then(({ data }) => data);
	}

	signIn(data: OAuthSignInRequest) {
		return baseApi.post(this._controllerName + 'yandex', data, { withCredentials: true });
	}
}

const instance = new OAuthService();
export { instance as OAuthService };
