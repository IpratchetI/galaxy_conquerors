import axios from 'axios';

import { BASE_API, SERVER_API } from '@/constants/baseApi';

// todo: Нужно добавить обработчик ошибок на 401, 403 и похожие универсальные
export const yandexBaseApi = axios.create({
	baseURL: BASE_API,
	withCredentials: true
});

export const serverBaseApi = axios.create({
	baseURL: SERVER_API,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
});
