export abstract class BaseApiService {
	private _baseUrl = 'https://ya-praktikum.tech/api/v2/';

	restUrl(path: string, controller = '') {
		return this._baseUrl + controller + path;
	}
}
