import * as process from 'process';

export const isDev = () => {
	return process.env.NODE_ENV === 'development';
};
