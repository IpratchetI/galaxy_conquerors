import { LeaderboardRequest } from '@models/api/leaders';
import { LeaderboardData } from '@models/leaders';

import { baseApi } from './baseApi';

class LeadersService {
	private _controllerName = 'leaderboard/';

	getLeaders(data: LeaderboardRequest) {
		return baseApi.post<LeaderboardData>(this._controllerName + 'all', data, {
			withCredentials: true
		});
	}
}

const instance = new LeadersService();
export { instance as LeadersService };
