export type ErrorResponse = {
	reason?: string;
};

export type ActionErrorResponse = {
	error: string;
} & ErrorResponse;
