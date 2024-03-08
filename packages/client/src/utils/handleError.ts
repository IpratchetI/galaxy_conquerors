export const handleError = (error: unknown) => {
	if (error instanceof Error) {
		throw new Error(`Error message: ${error.message}`);
	} else {
		throw new Error(`Unexpected request error: ${error}`);
	}
};
