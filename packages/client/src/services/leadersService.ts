import { LeaderboardRequest } from '@models/api/leaders';
import { LeaderboardData } from '@models/leaders';

import { TEAM_NAME } from '@/constants/leaderBoard';

import { yandexBaseApi } from './baseApi';

class LeadersService {
	private _controllerName = 'leaderboard/';

	getLeaders(data: LeaderboardRequest) {
		return yandexBaseApi.post<LeaderboardData>(this._controllerName + TEAM_NAME, data, {
			withCredentials: true
		});
	}
}

const instance = new LeadersService();
export { instance as LeadersService };
