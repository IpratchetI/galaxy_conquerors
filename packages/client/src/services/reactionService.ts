import { serverBaseApi } from './baseApi';

export type AddReaction = {
	commentId: number;
	reaction: string;
};

class ReactionService {
	private _controllerName = 'reaction/';

	addReaction({ commentId, reaction }: AddReaction) {
		return serverBaseApi.post(
			this._controllerName + 'add',
			{ commentId, reaction },
			{
				withCredentials: true
			}
		);
	}
}

const instance = new ReactionService();
export { instance as ReactionService };
