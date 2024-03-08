import axios from 'axios';

import { BASE_API, BASE_BACKEND_API } from '@/constants/baseApi';

// todo: Нужно добавить обработчик ошибок на 401, 403 и похожие универсальные
export const baseApi = axios.create({
	baseURL: BASE_API
});

export const baseBackEndApi = axios.create({
	baseURL: BASE_BACKEND_API
});
