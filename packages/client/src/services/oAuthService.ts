import { OAuthSignInRequest } from '@models/oauth';

import { yandexBaseApi } from './baseApi';

class OAuthService {
	private _controllerName = 'oauth/';

	getServiceId(redirecrUri: string) {
		return yandexBaseApi
			.get<{ service_id: string }>(
				this._controllerName + `yandex/service-id?redirect_uri=${encodeURIComponent(redirecrUri)}`,
				{ withCredentials: true }
			)
			.then(({ data }) => data);
	}

	signIn(data: OAuthSignInRequest) {
		return yandexBaseApi.post(this._controllerName + 'yandex', data);
	}
}

const instance = new OAuthService();
export { instance as OAuthService };
