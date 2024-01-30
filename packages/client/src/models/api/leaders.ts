import { LeadersModel } from '../leaders';

export type LeaderboardRequest = {
	ratingFieldName: keyof LeadersModel; // Which field is used to sort
	cursor: number; // Used to paginate between pages. If limit is 10, then for the 1st page - cursor=0, for the 2nd page - cursor=10.
	limit: number; // Maximum amount of leaders to return
};
