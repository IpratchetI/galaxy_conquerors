import axios, { type AxiosPromise } from 'axios';
import { ThemeDataApiModel } from '@models/theme';

import { SERVER_API } from '@/constants/server';

export const SET_THEME_ROUTE = '/set/theme';
export const GET_THEME_ROUTE = '/get/theme';

const themeApi = axios.create({
	baseURL: SERVER_API,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
});

class ThemeService {
	getTheme(userId: number): AxiosPromise<ThemeDataApiModel> {
		return themeApi.get(`${GET_THEME_ROUTE}?id=${userId}`);
	}

	setTheme(data: ThemeDataApiModel): AxiosPromise {
		return themeApi.put(`${SET_THEME_ROUTE}`, data);
	}
}

const instance = new ThemeService();
export default instance as ThemeService;
