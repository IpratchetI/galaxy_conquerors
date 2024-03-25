import { AxiosResponse } from 'axios';

import { yandexBaseApi } from './baseApi';

interface AddNewLeaderServiceRequest {
	data: Record<string, any>;
	ratingFieldName: string;
	teamName: string;
}

export const addNewLeaderService = async (
	requestData: AddNewLeaderServiceRequest
): Promise<AxiosResponse<any>> => {
	try {
		const response = await yandexBaseApi.post('/leaderboard', requestData, {
			withCredentials: true
		});
		console.log('Результат игры успешно отправлен на сервер лидерборда', response.data);
		return response;
	} catch (error) {
		console.error('Ошибка отправки результата игры на сервер лидерборда', error);
		throw error;
	}
};
