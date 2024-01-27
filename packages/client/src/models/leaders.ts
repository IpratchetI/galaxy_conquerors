export type LeadersModel = {
	name: string;
	email: string;
	avatar: string;
	winsAmount: number;
	gamesAmount: number;
};

export type LeaderboardData = Array<{
	data: LeadersModel;
}>;
