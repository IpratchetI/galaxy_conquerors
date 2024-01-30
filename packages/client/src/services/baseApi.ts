import axios from 'axios';

import { BASE_API } from '@/constants/baseApi';

// todo: Нужно добавить обработчик ошибок на 401, 403 и похожие универсальные
export const baseApi = axios.create({
	baseURL: BASE_API
});
